index.html: index.adoc Makefile
	asciidoctor -a numbered -a sectids -a toc index.adoc

index.adoc: Makefile ohdump
	./ohdump index.adoc

check:
	pep8 ohdump
