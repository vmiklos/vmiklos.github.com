Title: Markdown import/export in Writer
Slug: sw-markdown-filter
Category: libreoffice
Tags: en
Date: 2025-10-07T08:13:55+02:00

Writer recently got a Markdown import & export filter and there were a number of improvements to
that.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

Ujjawal Kumar contributed a markdown import to Writer, as part of Google Summer of Code (GSoC) this
summer. Mike Kaganski of Collabora also created a minimal markdown export in Writer. I looked at the
feature differences between the two, and filled in various gaps in the markdown export. I also added
a few general markdown import/export improvements relevant for normal Writer documents, like
embedded image support.

## Results so far

Here is a sample case of a document using inline code spans:

[![Code span: baseline](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-baseline.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-baseline.png)

Exporting this to markdown & loading back to Writer, the code span was lost:

[![Code span: old result](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-old.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-old.png)

And now it's preserved:

[![Code span: new result](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-new.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/1-code-new.png)

This also works with code blocks.

Second, here is a document with lists:

[![Lists: baseline](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-baseline.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-baseline.png)

Exporting this to markdown & loading back to Writer, the lists were lost:

[![Lists: old result](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-old.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-old.png)

And now they are preserved:

[![Lists: new result](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-new.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/2-list-new.png)

This also works with nested lists.

Third, here is a document with an image:

[![Image: baseline](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-baseline.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-baseline.png)

Exporting this to markdown & loading back to Writer, the image was lost:

[![Image: old result](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-old.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-old.png)

And now it's preserved:

[![Image: new result](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-new.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/3-image-new.png)

This also works with embedded and anchored images.

Fourth, here is a document with a table:

[![Table: baseline](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-baseline.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-baseline.png)

Exporting this to markdown & loading back to Writer, the table was lost:

[![Table: old result](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-old.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-old.png)

And now it's preserved:

[![Table: new result](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-new.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/4-table-new.png)

This also works with table alignments and nested tables (to the extent the markdown markup allows
that).

Fifth, here is a document with a quote block:

[![Quote: baseline](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-baseline.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-baseline.png)

Exporting this to markdown & loading back to Writer, the quote's paragraph indentation was lost:

[![Quote: old result](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-old.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-old.png)

And now it's preserved:

[![Quote: new result](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-new.png)](https://share.vmiklos.hu/blog/sw-markdown-filter/5-quote-new.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [desktop lok, doc save: register .md for Markdown](https://git.libreoffice.org/core/commit/55393d9cc42b0402362022594b04ab4888257fb7)
- [sw markdown export: handle code](https://git.libreoffice.org/core/commit/959c448e9531a53e068e4cec3a56b0caf0e0d3d1)
- [tdf#168152 sw markdown export: handle lists](https://git.libreoffice.org/core/commit/bcef97f29a7126cb3469066de4bacafaae30f86a)
- [tdf#168172 sw markdown export: handle images](https://git.libreoffice.org/core/commit/fefd59b58c7d87e034fbf1c45cefa6a87ed09976)
- [tdf#167564 sw markdown export: handle tables](https://git.libreoffice.org/core/commit/f073d733568d3b635ac8b2c3a5081afd679b4915)
- [sw markdown export: handle block quote](https://git.libreoffice.org/core/commit/c94b0c7ace10f5913aa53b593aa0ccd544df3cc3)
- [tdf#168317 sw markdown export: handle code block](https://git.libreoffice.org/core/commit/85aa1402c670e8c85949c5aaf01f529a0a59c05b)
- [sw markdown export: handle table cell adjustment](https://git.libreoffice.org/core/commit/5d0022c28b149dcc1db22176e442d130ff8d0279)
- [tdf#168341 sw markdown filter: handle links on images](https://git.libreoffice.org/core/commit/b7bc0e5f3999950d6b5f0d2bdcda2c6cc2f04e61)
- [sw markdown export: handle line breaks](https://git.libreoffice.org/core/commit/f63c14c9e45d795c6d5927103181c8d0ede8a34b)
- [tdf#168446 sw markdown export: improve image name/description/title handling](https://git.libreoffice.org/core/commit/3a294f97a9b37cc8ff38f76200b5b58879a3a72f)
- [tdf#167564 sw markdown export: handle multi-para table cells](https://git.libreoffice.org/core/commit/852d8b06bcecc5c68194fced94e4c7af02086c52)
- [tdf#167564 sw markdown export: handle nested table cells](https://git.libreoffice.org/core/commit/c830c9ab824c8086b2124fec44f834a1d0ae4fa5)
- [tdf#168617 sw markdown filter: map tasks to checkbox content controls and back](https://git.libreoffice.org/core/commit/7608d96302652eb48863da441e121e0c61350412)
- [sw markdown filter: import images with 'data:' URLs](https://git.libreoffice.org/core/commit/169e1f3b914ac590b3719b8129b4f0913d4da228)
- [sw markdown filter: export non-linked inline images](https://git.libreoffice.org/core/commit/8d60fcdac9bc79c7b8956ed3cd9e9f518b28c119)
- [tdf#168662 sw markdown export: extract inline image export functions](https://git.libreoffice.org/core/commit/3c29e1277bda566b4455123a7a53c8f0fc6eda98)
- [tdf#168662 sw markdown export: handle anchored images](https://git.libreoffice.org/core/commit/e0601a598977265c5b05ba397bce04d9689fca4b)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (26.2).
