### **Templates / Structure**

It is important to maintain a couple of things in order to be able to use IncluDoc.


#### Hierarchy:

The interactive user interface uses the H3 wrapped category titles, in combination with the contents hierarchy, for navigation. That is why you should match what you have in your contents file (that will end up as the sidebar) and your content header titles.

e.g.:

Assuming this is in your **contents.md**:

```
1.  **Introduction**
    1.  **Profile**
    	1.  **Contributors**
    1.  **Project Overview**
```

Your **document.md** should have these headers:


```plaintext
**Introduction**

**Introduction / Profile**

**Introduction / Profile / Contributors**

**Introduction / Project Overview**
```

#### Priority:

The files in each language directory within ```/lang```, and no deeper. Are included in order of enumeration.

```
000_preface
001_contents
002_document
003_footer
```

#### Alternatives:

During generation, you can input the alternative you prefer to be included, using the parameter ```--a``` or ```--alter```. This will allow for alternative versions of files to be selected for compilation. The selection priority is to select the file requested with the ```--alter``` parameter, if that file does not exist, then select the default version of that file.

e.g.:

Assuming your ```--alter``` parameter is ```M1```, here is the result on your files:

```
000_M1_preface:
	> would be selected because it is a requested alternative.

000_preface:
	> would be ignored because it is the default and there is an alternative found.

001_M0_contents:
	> would be ignored because it is a different alternative.

001_contents:
	> would be selected because it is the default and the alternative requested was not found.
```