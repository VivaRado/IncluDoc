import os
import re
import time
import datetime
import operator
from argparse import ArgumentParser
from lxml import etree
from Lib.md_common import *
from Lib.generic_tools import *

dir_path = os.path.dirname(os.path.realpath(__file__))
up_dir = os.path.abspath(os.path.join(dir_path, '..'))

company_name = "VRD"
project_name = up_dir.rsplit('/', 1)[1]
gen_date = datetime.datetime.today().strftime('%Y/%m/%d')
version = open(os.path.join(dir_path,'version'),'r').read()

parser = ArgumentParser()
parser.add_argument("-f", "--format", dest="format",
                    help="Export Format: comma separated")
parser.add_argument("-a", "--alter", dest="alter",
                    help="Export Alternative .e.g.: M0 or M1")
args = parser.parse_args()
default_lang = "en"
langs = os.listdir(os.path.join(dir_path,'lang'))
def make_multilingual_html(langs, title):
	lang_contents = []
	lang_comb_path = os.path.join(dir_path,"README.html")
	for z in langs:
		lang_path = os.path.join(dir_path,"README_"+z+".html")
		HTMLFile = open(lang_path, "r")
		data = get_element_by_id('body', HTMLFile.read() )[0].getchildren();
		contents_x = ''
		for x in data:
			contents_x += etree.tostring(x, encoding=str, method='html')
		lang_contents.append('<div data-language="'+z+'">'+contents_x+'</div>')
	lang_str = ''
	for x in lang_contents:
		lang_str = lang_str + x
	new_data_ml = combine_header(lang_str, title, langs, '"%s"' % (version), '"%s"' % (project_name) )
	newfile_ml = open(lang_comb_path, "w")
	newfile_ml.write(new_data_ml)
	newfile_ml.close()

def formats(_f, _err):
	gen_formats = []
	supported_f = [ "md","html"]
	if ',' in _f:
		gen_formats = _f.split(',')
	else:
		gen_formats = [_f]
	for x in gen_formats:
		if x not in supported_f:
			_err = True
			print('=\n=> Please Provide Supported Formats: '+x+' is not Supported. Supported Formats: '+','.join(supported_f)+'\n=')	
	return [gen_formats, _err]
faults = False
if  args.format is None:
	faults = True
	print('=\n=> Please Provide Export Format: -f "'+','.join(supported_f)+'"\n=')	
if faults == False:
	check_formats = formats(args.format, faults)
	gen_formats = check_formats[0]
	format_faults = check_formats[1]
	gen_alter = args.alter
	bookpaths = []
	if format_faults:
		print('=\n=> Please Provide Valid Export Format: -f "'+','.join(supported_f)+'"\n=')	
	else:
		for x in gen_formats:
			title_full = company_name+' | '+project_name+' | '+version+' | '+gen_date
			for _y in langs:
				if x == 'html':
					md_name = "README_collected_"+_y+".md"
					md_path = os.path.join(dir_path,"lang",_y)
					md_path_b = os.path.join(dir_path,"lang",_y)
					up_dir = os.path.abspath(os.path.join(md_path, '../../..'))
				elif x == 'md':
					md_name = "README_"+_y+".md"
					md_path = os.path.join(dir_path,"lang",_y)
					up_dir = os.path.abspath(os.path.join(md_path, '../../..'))
					md_path_b = os.path.join(dir_path,"lang",_y)
				collect_mds(md_path, md_path_b, md_name, gen_alter)
				if default_lang in md_name and 'README_collected' not in md_name:
					make_default_github_md(md_path, md_path_b, 'README_collected_%s.md' % (default_lang), 'README.md')
				if x == 'html':
					md_to_html(os.path.join(dir_path,"lang",_y), md_name)
					book_path = os.path.join(dir_path,"lang",_y,"md_temp.html")
					book_path_new = os.path.join(dir_path,"README_"+_y+".html")
					temp_html = open(book_path, "r")
					html_data = temp_html.read()
					temp_html.close()

					title = title_full
					new_data_nr = combine_header(html_data, title_full, langs, '"%s"' % (version), '"%s"' % (project_name))
					newfile_nr = open(book_path_new, "w")
					newfile_nr.write(new_data_nr)
					newfile_nr.close()
					try:
						os.remove(book_path)
					except Exception as e:
						pass

			for _y in langs:
				if x == 'html':
					if len(langs) > 0:
						make_multilingual_html(langs, title_full)
				try:
					os.remove(os.path.join(os.path.join(dir_path,"lang",_y), "README_"+_y+".md"))
				except Exception as e:
					pass