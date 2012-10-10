DO_RECURSIVE = @ for i in $(SUBDIRS); do $(MAKE) -C $$i || exit 1; done

SUBDIRS = gpg projects resume

all:
	+$(DO_RECURSIVE)
