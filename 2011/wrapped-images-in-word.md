Title: Wrapped images in Word (LibreOffice RTF export)
Slug: wrapped-images-in-word
Category: libreoffice
Tags: en
Date: 2011-01-13T13:20:31Z

I've got a [report](https://bugs.freedesktop.org/show_bug.cgi?id=32613)
which turned out to be two separate issues. One is a regression from
Go-OO 3.2.x, this post is about this part. The other part is about the
improvement of both the import/export RTF filter, the bug has some
detail on that part as well.

So the problem was that wrapped images (when the image is a frame and
not a character) had some extremely small height. I did not notice this
bug in LO as an LO-specific extension hides that value, but in Word you
can see it:

![fdo32613-before](http://vmiklos.hu/pic/fdo32613-before.png)

The
[fix](http://cgit.freedesktop.org/libreoffice/writer/commit/?id=c27e4668b18248322be699fc9fc6bf01e4d6a7ea)
is to use the height of the containing frame instead of the height of
the picture itself, then it'll look fine:

![fdo32613-after](http://vmiklos.hu/pic/fdo32613-after.png)
