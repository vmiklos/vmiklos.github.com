DO_RECURSIVE = @ for i in $(SUBDIRS); do $(MAKE) -C $$i || exit 1; done

SUBDIRS = gpg projects resume

all:
	+$(DO_RECURSIVE)

sync:
	cd ../pelican && make remote && git push
	git add -A
	git commit -m "Autogenerated blog for v$(shell cd ../pelican/; git describe --tags)"
	git push

run:
	python3 -m http.server

404.html: 404.md Makefile
	pandoc -s -o 404.html 404.md
