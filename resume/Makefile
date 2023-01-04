all: index.html resume.pdf

index.html: index.md Makefile
	pandoc -s -o index.html index.md

resume.pdf: index.md Makefile
	pandoc -s -o resume.pdf index.md
