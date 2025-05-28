### **Usage**

Prepare and organise your files into directories within ```/lang``` and compile with parameters bellow.

---

### **Usage / Parameters**


Pass the parameters during python file execution.

```
python3 './_README/gen_readme.py' --format 'html,md' --alter 'M0'
```

---

#### Parameter Overview

A description of each parameter:

<br>

**--format** [ String ]
> 
> Provide the generated format string, supported formats: ```'html'``` ```'md'``` 

<br>

**--alter** [ String ]
> 
> Provide the alternative files to look for inclusion, suggested structure is a letter and a number like ```A0, A1 ...```

---

### **Usage / Includes**


You can include MD files from within MD files by providing an **inline** MarkDown **code block** with special parameters. Grave accents ` are enclosed (```) in the examples bellow, we need them disclosed in the actual markdown.

```
(```){include=partials/profile_project.md}(```)
```

To provide an alternative for the include:

```
(```){include=partials/profile_project.md,M0}(```)
```

The alternative priority is described here: ```Templates / Structure```.

---

### **Usage / Ignores**

You can create .gitignore and .npmignore to avoid publishing any uncompiled markdown files. For example:

```
# .gitignore
_README/__pycache__/
_README/addons/
_README/lang/
_README/Lib/
_README/*.py
_README/*.txt
_README/version
_README/*.html
_README/*.sh
_README/assets/css/
_README/assets/js/
_README/assets/vendor/
```