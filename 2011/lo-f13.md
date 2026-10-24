Title: LibreOffice vs. F13
Slug: lo-f13
Category: libreoffice
Tags: en
Date: 2011-01-08T17:16:44Z

![lof13](http://vmiklos.hu/pic/lof13.png)

About four days ago it has been asked on `#libreoffice` if it's possible
to bind functions to F13..F16 in Calc. The short answer is no, but it
turned out it's pretty trivial to allow that (and of course not only in
Calc).

[Cedric's great post](http://cedric.bosdonnat.free.fr/wordpress/?p=657) is
helpful here to find the relevant code. It also truned out that VCL
already supports those keys, so only the user interface has to be
improvied to export that feature.

The patch is
[here](http://article.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/4793).
