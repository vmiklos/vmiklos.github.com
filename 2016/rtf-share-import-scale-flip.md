Title: RTF shape import: group scaling and flip in LibreOffice Writer
Slug: rtf-share-import-scale-flip
Category: libreoffice
Tags: en
Date: 2016-06-27T09:41:34Z

Some kind of simple logo was
[reported](https://bugs.documentfoundation.org/show_bug.cgi?id=91684) to be
mis-imported in the RTF filter, it looked like this:

![Old result](https://farm8.staticflickr.com/7451/27320164444_f437d0418e_o.png)

which is interesting, but the reference output is different:

![Reference result](https://farm8.staticflickr.com/7317/27898228066_f5918e59bf_o.png)

With a bit of investigation, it turns out this was a flipped group shape with
a few rectangles, so the mis-rendering of the logo was due to two independent
problems. The first is that the child shapes inside a group shape were scaled
incorrectly. See the
[commit](https://cgit.freedesktop.org/libreoffice/core/commit/?id=c3acc06230169f141930945ebbff43b1a88dfdee)
for the exact details, after fixing scaling, it looked closer to the original:

![Closer to the original](https://farm8.staticflickr.com/7301/27320164424_4ce2ced16c_o.png)

The second problem was that the group itself was flipped, and this was again
ignored on import. After
[fixing](https://cgit.freedesktop.org/libreoffice/core/commit/?id=63965d7dc571c7dce999980737f9d57a7c5151da)
that problem:

![New result](https://farm8.staticflickr.com/7228/27898228076_f89fabeb00_o.png)

the result is basically the same as the reference. Both fixes are not only on
master (towards LibreOffice 5.3) but also backported to LibreOffice 5.2. :-)
