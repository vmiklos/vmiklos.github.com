index.html: index.txt Makefile
	asciidoctor -a numbered -a sectids -a toc index.txt

count:
	grep -c ^- index.txt
