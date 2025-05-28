### **Installation**

Prerequisites:

* The compilation of the **Markdown** files relies on **Python** and libraries **Markdown2** and **lxml**. 
* The HTML user interface uses **emphase** to highlight code elements, already included in the ```assets/vendors```, you might need to include some language files a the footer of ```Lib/html_template.py``` in case you need to render more languages.


#### Install Python Requirements:

To install python requirements from the ```requirements.txt```, run this command:

```pip install -r Lib/requirements.txt```

or install each dependency package manually:

* lxml
* Markdown2
