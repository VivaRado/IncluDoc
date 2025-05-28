import os
import glob
import re
from markdown2 import *
from markdown2 import Markdown
from .generic_tools import *
def get_includes(dir_path, data, alters):
	dic = {}
	new_data = ''
	def itter(_dat, new_data):
		includes = re.findall('```{include=(.+?)}```', _dat)
		in_includes = []
		added = []
		ignore = []
		for inc in includes:
			inc_alt = ''
			if ',' in inc :
				inc_split = inc.split(',')
				inc_alt = inc_split[1]

				if (inc_alt == alters):
					inc_path = '/'.join(inc_split[0].split('/')[:-1])+'/'+inc_alt+'_'+inc_split[0].split('/')[-1]
					in_p_dir = os.path.join(dir_path,inc_path)
				else:
					in_p_dir = os.path.join(dir_path,inc_split[0])
			else:
				in_p_dir = os.path.join(dir_path,inc)

			in_p_f = open(in_p_dir,"r")
			in_content = in_p_f.read()
			in_includes = re.findall('```{include=(.+?)}```', in_content)
			dic['```{include='+inc+'}```'] = in_content
			if len(list(in_includes)):
				new_data += itter(in_content, new_data)

		new_data = replace_all(_dat,dic, ignore)
		return new_data
	new_data += itter(data, new_data)
	return new_data
def collect_mds(dir_path, up_dir, name, volumes):
	outfile = open(os.path.join(up_dir, name), "w")
	added = []
	for file in sorted(glob.glob(os.path.join(dir_path,"*.md"))):
		if name == 'README.md':
			check_name = 'IGNORE'
		else:
			check_name = name
		if "README.md" not in file and check_name not in file:
			f_name_ = file.split('/')[-1]
			f_name = f_name_.split('_')[-1].split('.')[0]
			if f_name not in added:
				added.append(f_name)
				do_open = True
				fnv = f_name_.split('_')[1]

				if '.md' not in fnv:
					if fnv != volumes:
						added.remove(f_name)
						do_open = False
				
				if do_open:
					with open(file,"r") as infile:
						data = infile.read()
						new_data = get_includes(dir_path, data, volumes)
						write_data = new_data
						outfile.write(write_data)
						infile.close()
	outfile.close()

def make_default_github_md(dir_path, up_dir, name, volumes):
	new_README = os.path.join( up_dir.rsplit('/', 3)[0], "README.md" )
	data_b = ""
	with open(new_README,"w") as outfile:
		infile = open(os.path.join(up_dir, name),"r")
		data = infile.read()
		data_b = re.sub('''<div markdown='1' class="sidebar[\s\S]+?</div>''', '', data) # remove contents list
		matched_lines = [line for line in data_b.split('\n') if "### **" in line]
		for x in matched_lines:
			if "/" in x:
				new_ = "### **"+x.split(' / ')[-1]
				sub_ = "<sub>"+x.split("### **")[1].split("**")[0]+"</sub>\n\n<br>\n"
			else:
				new_ = x
				sub_ = ""
			data_b = data_b.replace(x,new_+"\n"+sub_)
		data_c = data_b.replace("(assets/", "(_README/assets/").replace("(./assets/", "(./_README/assets/")
		outfile.write(data_c)

def md_to_html(dir_path, md_name):
	with open(os.path.join(dir_path,md_name), 'r') as in_file: 
		col_html = markdown(in_file.read(), extras=["svgobject", "fenced-code-blocks","markdown-in-html", "tables", "strike","target-blank-links"])
		with open(os.path.join(dir_path,"md_temp.html"), 'w') as output_file: 
			output_file.write( col_html )
			output_file.close()
		in_file.close()

def _code_block_sub(self, match, is_fenced_code_block=False):
		lexer_name = None
		if is_fenced_code_block:
			lexer_name = match.group(1)
			codeblock = match.group(2)
			if '```' in lexer_name:
				lexer_name = match.group(2)
				codeblock = match.group(3)
			if lexer_name:
				formatter_opts = self.extras['fenced-code-blocks'] or {}
			codeblock = codeblock[:-1]
		else:
			codeblock = match.group(1)
			codeblock = self._outdent(codeblock)
			codeblock = self._detab(codeblock)
			codeblock = codeblock.lstrip('\n')
			codeblock = codeblock.rstrip()
			lexer_name, rest = codeblock.split('\n', 1)
			lexer_name = lexer_name[3:].strip()
		if(lexer_name == None):
			lexer_name = 'plaintext'

		codeblock = self._encode_code(codeblock)
		pre_class_str = self._html_class_str_from_tag("pre")
		code_class_str = ' class="lang-%s"' % (lexer_name)
		return "\n\n<pre%s><code%s>%s</code></pre>\n\n" % ( pre_class_str, code_class_str, codeblock )

Markdown._code_block_sub = _code_block_sub #markdown2 override