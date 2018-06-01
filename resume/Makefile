all: index.html index.hu.html resume.pdf resume.hu.pdf

index.html: index.txt Makefile
	asciidoc index.txt

index.hu.html: index.hu.txt Makefile
	asciidoc index.hu.txt

# asciidoc's ODF backend is from <https://github.com/dagwieers/asciidoc-odf>.
resume.pdf: index.txt Makefile
	asciidoc -b odt --theme cv index.txt
	libreoffice --convert-to pdf index.fodt
	mv -f index.pdf resume.pdf
	rm -f index.fodt

resume.hu.pdf: index.hu.txt Makefile
	asciidoc -b odt --theme cv index.hu.txt
	libreoffice --convert-to pdf index.hu.fodt
	mv -f index.hu.pdf resume.hu.pdf
	rm -f index.hu.fodt
