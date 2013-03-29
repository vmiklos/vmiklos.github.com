all: index.html index.hu.html resume.pdf

index.html: index.txt Makefile
	asciidoc index.txt

index.hu.html: index.hu.txt Makefile
	asciidoc index.hu.txt

resume.pdf: index.txt Makefile
	cat /usr/share/asciidoc/dblatex/asciidoc-dblatex.sty dblatex.sty > asciidoc-dblatex.sty
	a2x -f pdf --dblatex-opts "-s asciidoc-dblatex.sty -Pdoc.publisher.show=0 -Platex.output.revhistory=0 -Pdoc.layout=\"mainmatter\"" index.txt
	mv -f index.pdf resume.pdf
	rm -f asciidoc-dblatex.sty

resume.hu.pdf: index.hu.txt Makefile
	cat /usr/share/asciidoc/dblatex/asciidoc-dblatex.sty dblatex.sty > asciidoc-dblatex.sty
	a2x -f pdf -a lang=hu --dblatex-opts "-s asciidoc-dblatex.sty -Pdoc.publisher.show=0 -Platex.output.revhistory=0 -Pdoc.layout=\"mainmatter\"" index.hu.txt
	mv -f index.hu.pdf resume.hu.pdf
	rm -f asciidoc-dblatex.sty
