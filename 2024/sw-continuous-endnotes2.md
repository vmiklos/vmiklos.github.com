Title: Section-based continuous endnotes in Writer
Slug: sw-continuous-endnotes2
Category: libreoffice
Tags: en
Date: 2024-06-03T16:26:52+02:00

Writer now has much better support for continuous / inline endnotes (not on a separate page) in
Writer, enabled by default for DOCX files.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Writer as well.

## Motivation

As described in a [previous post]({filename}/2019/sw-continuous-endnotes.adoc), Writer already had
minimal support for not rendering endnotes on a separate endnote page, but it was not mature enough
to enable is by default for DOCX files.

## Results so far

What changed from the previous "continuous endnotes" approach is that instead of trying to map
endnotes to footnotes, we now create a special endnotes section, which only exists at a layout level
(no section node is backing this one), and this hosts all endnotes at the end of the document. It
turns out this is a much more scalable technique, for example a stress-test with 72 endnotes over
several pages is now handled just fine.

Here are some screenshots:

[![Before: reference is red, Writer result is painted on top of it](https://share.vmiklos.hu/blog/sw-continuous-endnotes2/old.png)](https://share.vmiklos.hu/blog/sw-continuous-endnotes2/old.png)

[![After: reference is red, Writer result is rendered on top of it](https://share.vmiklos.hu/blog/sw-continuous-endnotes2/new.png)](https://share.vmiklos.hu/blog/sw-continuous-endnotes2/new.png)

As you can see, there were various differences for this document, but the most problematic one was
that the entire endnote was missing from the (originally) last page, as it was rendered on a
separate page.

Now it's not only on the correct page, but also its position is correct: the endnote is after the
body text, while the footnote is at the bottom of the page, as expected. The second screenshot shows
~no red, which means there is ~no reference output, where the Writer output would be missing.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#160984 sw continuous endnotes: introduce an endnote section](https://git.libreoffice.org/core/commit/90f19126fa405a0632eae4ee8525b66bbce12625)
- [tdf#160984 sw continuous endnotes: add a way to find the endnote section start](https://git.libreoffice.org/core/commit/8bae684c93bd23bbe98707ba9cf75d1a39427131)
- [tdf#160984 sw continuous endnotes: fix testContinuousEndnotesMoveBackwards](https://git.libreoffice.org/core/commit/ab3416cad1dd4e706432f9b1a3592cec823c76b0)
- [tdf#160984 sw continuous endnotes: fix `CppunitTest_sw_layoutwriter3`](https://git.libreoffice.org/core/commit/9c7acbc937b3b341c10187b837e09cc20399f04e)
- [tdf#160984 sw continuous endnotes: switch to a section-based layout](https://git.libreoffice.org/core/commit/6885dcd7ec7b82a946d8344bfc27a3e88eecc44a)
- [tdf#161083 sw continuous endnotes: fix layout with a section at doc end](https://git.libreoffice.org/core/commit/82dd81a9d2049ac95535880fc67c1867f90e1427)
- [tdf#160984 sw continuous endnotes, DOC import: enable this unconditionally](https://git.libreoffice.org/core/commit/d74fb6b571304b41c13b7a6dcdd2b853bfca7210)
- [tdf#160984 sw continuous endnotes: enable DOCX import](https://git.libreoffice.org/core/commit/1ae5ea3f78cca11ba18f2dd1a06f875263336a3b)
- [tdf#160984 sw continuous endnotes: fix the endnote container's top margin](https://git.libreoffice.org/core/commit/d1ddd136a1b0e452492464d58715eaec144fd811)
- [tdf#160984 sw continuous endnotes: fix the endnote separator position](https://git.libreoffice.org/core/commit/f1d0b4e34a1f467e9f54baa7ac31ca28fdae3efb)
- [tdf#160984 sw continuous endnotes: fix the endnote separator length](https://git.libreoffice.org/core/commit/755f3bebd96ec7ae43b1dcf247f907b9c15c1995)
- [tdf#160984 sw continuous endnotes: fix crash on loading forum-mso-en-7731.docx](https://git.libreoffice.org/core/commit/3f2d0414686a8f9a042413c47c4c8ffa5d61f436)
- [tdf#160984 sw continuous endnotes: DOCX: import `<w:endnotePr>` pos == sectEnd](https://git.libreoffice.org/core/commit/2d2dd56e0b2dc708f1f758d7fc9a1263ff09b83c)
- [tdf#160984 sw continuous endnotes: DOCX: export of `<w:endnotePr>` pos == sectEnd](https://git.libreoffice.org/core/commit/566c7017a84e3d573de85a6d986b81d3f59de0fa)
- [tdf#160984 sw continuous endnotes: fix the endnote continuation separator len](https://git.libreoffice.org/core/commit/6450159e0e7c5fac9c998087e99f3fec602ff84d)
- [tdf#160984 sw continuous endnotes: hide not functional UI in this mode](https://git.libreoffice.org/core/commit/8f3e11dc9a4b3fd9ad1985d88b241df7bcb66fec)

The tracking bug was [tdf#160984](https://bugs.documentfoundation.org/show_bug.cgi?id=160984).

## Want to start using this?

You can get a snapshot / demo of Collabora Office 24.04 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.8).
