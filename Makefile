DO_RECURSIVE = @ for i in $(SUBDIRS); do $(MAKE) -C $$i || exit 1; done

SUBDIRS = gpg projects resume

all:
	+$(DO_RECURSIVE)

sync:
	git add -A
	git commit -m "Autogenerated blog for v$(shell cd ../rejourn/in/; git describe --tags)"
	cd ../rejourn/in; git push
	git push

server:
	@echo "http://$(shell ip addr show |grep 'inet ' |grep -v 127.0.0.1 |sed 's|.*inet \([^ /]*\)/.*|\1|;q'):8000/"
	python -m SimpleHTTPServer 8000
