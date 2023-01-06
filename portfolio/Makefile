index.html: index.md Makefile
	pandoc -s --toc --number-sections -o index.html index.md

index.md: Makefile ohdump
	./ohdump index.md

check:
	pep8 ohdump
