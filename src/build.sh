#!/usr/bin/bash

components=("button" "input" "passwordInput")

for component in "${components[@]}"; do
    entry="./_components/${component}/${component}.ts"
    out="./_components/${component}/${component}.component"
    esbuild "$entry" --bundle --minify --loader:.html=text --loader:.css=text --format=esm --outfile="$out"
done
