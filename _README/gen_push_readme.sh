#!/bin/bash
commit_message="$1"

python3 './_README/gen_readme.py' -f 'pdf,html,md' -l "M0"

git add _README 
git add _README.pdf
git add _README.md

git commit -m "$commit_message"
git push origin master