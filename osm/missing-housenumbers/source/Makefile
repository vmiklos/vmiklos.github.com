-include config.mak

ifneq ($(DEBUG),)
BROWSERIFY_OPTIONS = --debug
else
BROWSERIFY_OPTIONS = --plugin tinyify
endif

bundle.js: main.js package-lock.json Makefile config.mak
	node_modules/.bin/browserify -o bundle.js -g [ babelify --presets [ "@babel/preset-env" ] ] $(BROWSERIFY_OPTIONS) --entry main.js

package-lock.json: package.json
	npm install
	touch package-lock.json

install: bundle.js
	cp index.html ..
	cp node_modules/ol/ol.css ..
	cp bundle.js ..
