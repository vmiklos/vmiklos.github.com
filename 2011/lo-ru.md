Title: Russian characters in RTF export
Slug: lo-ru
Category: libreoffice
Tags: en
Date: 2011-01-27T01:47:22Z

I got [a report](https://bugs.freedesktop.org/show_bug.cgi?id=33478) about
two problems which got fixed in master now.

The first error is triggered, if you have special (in RTF terms, so for
example `{` or `}`) characters in style names. The result was not so
friendly when you opened such a document:

![loru1](http://vmiklos.hu/pic/loru1.png)

After applying the
[first fix](http://cgit.freedesktop.org/libreoffice/writer/commit/?id=1482475880c2902d8e041bdc211fc52afd4a7efb), the document was imported but the original
&#1058;&#1077;&#1089;&#1090; text was replaced by something
non-unicode:

![loru2](http://vmiklos.hu/pic/loru2.png)

The
[second fix](http://cgit.freedesktop.org/libreoffice/writer/commit/?id=a37fae128b4badc8f9f2201e28dca3e08948ddec) addresses this, and now the result is the expected one:

![loru3](http://vmiklos.hu/pic/loru3.png)
