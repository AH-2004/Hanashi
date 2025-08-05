#!/usr/bin/bash

echo -n "Please enter template name: "
read name
name="${name%% *}"

mkdir -p "./_components/$name"
cp "./_components/_template/template.html" "./_components/$name/$name.html"
cp "./_components/_template/template.css" "./_components/$name/$name.css"
cp "./_components/_template/template.ts" "./_components/$name/$name.ts"
sed -i "s/{name}/foobar/g" "./_components/$name/$name.ts"

echo "Component ${name} created."
echo "Don't forget to add ${name} to build.sh"
