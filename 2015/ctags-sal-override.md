Title: ctags vs override/SAL_OVERRIDE
Slug: ctags-sal-override
Category: libreoffice
Tags: en
Date: 2015-06-29T09:29:56Z

![ctags search result in vim](https://lh3.googleusercontent.com/-9Hd40EVT8aw/VZBhBTZQdTI/AAAAAAAAFyM/AfymfTqKDFw/s0/)

If you use [ctags](http://ctags.sourceforge.net/) to help your LibreOffice
development, there are already good descriptions for that -- e.g. for vim
there is one [on the
TDF wiki](https://wiki.documentfoundation.org/Development/Vim#ctags).

What was problematic is that since `C++11`, `override` is a valid keyword
after a member function declaration, and we have our `SAL_OVERRIDE` macro that
I
[added](http://cgit.freedesktop.org/libreoffice/core/commit/?id=3891d323cdc3c03154f5682baaeaa4b2ef015a63)
to be able to use it before all our supported compilers recognize it.
Unsupported parsers include ctags, so if a member function have SAL_OVERRIDE,
ctags only indexed the definition, not the declaration.

I created patches to fix these problems in ctags, the
[override one](https://sourceforge.net/p/ctags/bugs/367/) is probably
interesting for all `C++` projects, the
[SAL_OVERRIDE
one](https://github.com/vmiklos/ctags-svn/commit/ef53a231db5b428585324f266072b884e17bae52) is LibreOffice-specific.

The hope is that the later will go away in the long run, so it won't really be
a problem that ctags do not recognize that macro out of the box. :-)
