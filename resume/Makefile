all: index.html index.hu.html resume.pdf resume.hu.pdf

index.html: index.adoc Makefile
	asciidoctor index.adoc

index.hu.html: index.hu.adoc Makefile
	asciidoctor index.hu.adoc

# asciidoc's ODF backend is from <https://github.com/dagwieers/asciidoc-odf>.
resume.pdf: index.adoc Makefile
	asciidoc -b odt --theme cv index.adoc
	libreoffice --convert-to pdf index.fodt
	mv -f index.pdf resume.pdf
	rm -f index.fodt

resume.hu.pdf: index.hu.adoc Makefile
	asciidoc -b odt --theme cv index.hu.adoc
	libreoffice --convert-to pdf index.hu.fodt
	mv -f index.hu.pdf resume.hu.pdf
	rm -f index.hu.fodt
