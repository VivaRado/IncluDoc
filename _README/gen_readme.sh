#!/bin/bash
commit_message="$1"

python3 './_README/gen_readme.py' --format 'html,md' --volume "M1"
