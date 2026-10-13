Title: Rich RTF comment export in LibreOffice Writer
Slug: rtf-rich-comment-export
Category: libreoffice
Tags: en
Date: 2015-12-11T08:40:09Z

[![A Writer comment with rich text](https://lh3.googleusercontent.com/-cPX4gcKiTxI/VmnrtwdnTXI/AAAAAAAAGTE/cYj_XZONoRg/s400-Ic42/)](https://lh3.googleusercontent.com/-cPX4gcKiTxI/VmnrtwdnTXI/AAAAAAAAGTE/cYj_XZONoRg/s0-Ic42/)

As it has been reported in
[tdf#94377](https://bugs.documentfoundation.org/show_bug.cgi?id=94377), the
state of Writer comment contents in the RTF export filter wasn't great.

With two recent changes, however, the situation is now much better:

- I've added support for multiple paragraphs
- I've added support for both paragraph and text portion formatting

It wasn't necessary to implement this from scratch, because comment contents
uses the same editeng store as the shape text, and there formatting was already
handled. A benefit of this code sharing is that shape text also handles
multiple paragraphs without a problem now. :-)

The commits are backported to `libreoffice-5-1`, so users will see them
already in the upcoming 5.1.0 release.
