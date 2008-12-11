index.html: index.txt
	asciidoc -a encoding=ISO-8859-1 index.txt

index.txt: foo.py config.py
	python foo.py > index.txt

