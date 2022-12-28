index.html: index.adoc Makefile
	asciidoctor -a encoding=utf-8 index.adoc

index.adoc: foo.py
	python foo.py > index.adoc

check:
	pep8 --ignore=E501 foo.py
