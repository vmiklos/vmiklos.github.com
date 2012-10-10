all: index.html index.hu.html resume.pdf

index.html: index.txt Makefile
	asciidoc index.txt

index.hu.html: index.hu.txt Makefile
	asciidoc index.hu.txt

resume.pdf: index.txt Makefile
	a2x -f pdf --dblatex-opts "-Pdoc.publisher.show=0 -Platex.output.revhistory=0 -Pdoc.layout=\"mainmatter\"" index.txt
	mv -f index.pdf resume.pdf
