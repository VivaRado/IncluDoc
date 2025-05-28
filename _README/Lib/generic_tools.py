from .html_template import *
from lxml import etree

def replace_all(text, dic, ignore):
	for i, j in dic.items():
		if i in ignore:
			text = text.replace(i, '')
		else:
			text = text.replace(i, j)

	return text

def combine_header(text, title, langs, version, project_name):
	return template.replace("%%%TITLE%%%", title).replace("%%%CONTENT%%%", text).replace("%%%LANGS%%%", str(langs)).replace("%%%VERS%%%", version).replace("%%%PNAM%%%", project_name)

def get_element_by_id(_id, html):
	parser = etree.HTMLParser()
	html_root = etree.fromstring(html, parser)
	language_articles = html_root.xpath("//article[@id='{data_id}']".format(data_id=_id))
	return language_articles