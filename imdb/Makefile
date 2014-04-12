# Great, the IMDb page is no longer latin1-encoded.

index.html: index.txt
	asciidoc -a encoding=utf-8 index.txt

index.txt: foo.py FORCE
	python foo.py > index.txt

FORCE:

check:
	pep8 --ignore=E501 foo.py
