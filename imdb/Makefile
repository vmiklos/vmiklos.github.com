index.html: index.txt
	asciidoc -a encoding=ISO-8859-1 index.txt

index.txt: foo.py FORCE
	python foo.py > index.txt

FORCE:
