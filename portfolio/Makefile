index.html: index.txt Makefile
	asciidoc -a numbered -a sectids -a toc index.txt

index.txt: Makefile ohdump
	./ohdump index.txt

check:
	pep8 ohdump
