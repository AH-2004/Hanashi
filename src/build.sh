#!/usr/bin/bash

components=("button" "input" "passwordInput")

help() {
	echo "Scripts: "
	echo "minify-svg: Minifies svgs in assets dir"
	echo "build: Minifies and bundles component html, css, and js"
	echo "clean: Cleans any build files such as .component files"
}

minifySvg() {
	# Minify svgs inplace
	svgo -f "./assets/" --output "./assets/"
}

build() {
	# Minify component
	for component in "${components[@]}"; do
		component="./_components/${component}/${component}"
		
		# Minify css and html separately
		
		# Rename original css and html to temp.*
		mv "${component}.css" "${component}.temp.css"
		mv "${component}.html" "${component}.temp.html"
		
		esbuild "${component}.temp.css" --bundle --minify --outfile="${component}.css"
		minify-html "${component}.temp.html" --output "${component}.html"

		# bundle component
		esbuild "${component}.ts" --bundle --minify \
				--loader:.html=text --loader:.css=text \
				--format=esm --outfile="${component}.component"
		
		# Rename temp css and html back to original
		mv "${component}.temp.css" "${component}.css"
		mv "${component}.temp.html" "${component}.html"
	done
}

clean() {
	for component in "${components[@]}"; do
		component="./_components/${component}/${component}"
		if [ -f "${component}.component" ]; then
			echo "Removing ${component}.component"
			rm -f "${component}.component"
		fi
	done
}

case $1 in
	build ) build;;
	"minify-svg" ) minifySvg;;
	clean ) clean;;
	help ) help;;
	* ) build;;
esac
