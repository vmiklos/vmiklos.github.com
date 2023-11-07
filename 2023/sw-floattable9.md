Title: Multi-page floating tables in Writer: wrap on all pages
Slug: sw-floattable9
Category: libreoffice
Tags: en
Date: 2023-11-07T14:35:34+01:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [8th post]({filename}/2023/sw-floattable8.md) for the previous part.

## Motivation

Multi-page floating tables always wrapped their anchor text only on the last page, to be compatible
with Word's default behavior. There is a special flag in DOCX files to wrap on all pages, though. In
this part, you can read about handling of this flag in Writer.

## Results so far

Regarding testing of the floating table feature in general, the core.git repository has 84 files now which are focusing on correct
handling of floating tables (filenames matching `floattable-|floating-table-`). This doesn't count
cases where the document model is built using C++ code in the memory and then we assert the result
of some operation.

Here are some screenshots from the fixes this month:

[![Old, new and reference rendering of a 3 nested, multi-page floating tables](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-03-floattable-nested3.png)](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-03-floattable-nested3.png)

The first screenshot shows a case where multi-page floating tables are nested. For this document, we
not only have an inner and an out table, but we also have a middle one, giving us 3 nesting tables.
Some of the inner table frames had a bad position, leading to overlapping text, now fixed.

[![Old, new and reference rendering of wrapping on all pages](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-16-floattable-wraponallpages.png)](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-16-floattable-wraponallpages.png)

The next screenshot shows the case where the magic `allowTextAfterFloatingTableBreak` flag is set.
We used to wrap content of the anchor only on the last page, unconditionally. Now we either wrap on
the last page (default) or on all pages (when this flag is present).

[![Old, new and reference rendering of overlapping floating tables.](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-24-floattable-overlap.png)](https://share.vmiklos.hu/blog/sw-floattable9/2023-10-24-floattable-overlap.png)

The last screenshot shows a document full of floating tables. These used to be inline ones, and then
they could not overlap by definition, but now extra effort was needed to position them in a way that
no overlap happens between the tables. Now our render result matches Word.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#126449 sw floattable: fix too small height of non-last anchors](https://git.libreoffice.org/core/commit/695390b08799af34b393c81c834d615bea330d89)
- [tdf#126449 sw floattable: DOC import: handle inner floating table](https://git.libreoffice.org/core/commit/89a75cd194371002247d0138e759835bc673f7b0)
- [sw floattable, crashtesting: fix PDF export of fdo56210-3.docx](https://git.libreoffice.org/core/commit/2d6f48d53674ee85179ec8cee8648830207200a2)
- [crashtesting: fix PDF export of fdo45193-1.docx](https://git.libreoffice.org/core/commit/d530651e4e70febb1046727e85a8edcda610d722)
- [tdf#157571 sw floattable: fix incorrect blank space after table-in-shape](https://git.libreoffice.org/core/commit/4a5fb05d5e2448453477ce14862a8cf9846ecb49)
- [sw floattable, crashtesting: fix PDF export of ooo91654-1.doc](https://git.libreoffice.org/core/commit/6b9378154f9b504b9e924fe4565df444786e7d73)
- [sw floattable: add an AllowTextAfterFloatingTableBreak compat flag](https://git.libreoffice.org/core/commit/5b9249e950165015ba57cc2c0503381df9751bf6)
- [sw floattable, wrap on all pages: add layout](https://git.libreoffice.org/core/commit/7d7ca347fafa7a06094b00e8fb0d0452c4c81366)
- [sw floattable, wrap on all pages: add DOCX filter](https://git.libreoffice.org/core/commit/33ade4171a1a443fd24e6463a9eaa279f7d778bb)
- [tdf#157573 sw floattable: fix incorrect lack of left margin after table](https://git.libreoffice.org/core/commit/626fe9ab5ebebc4ef36e35f4aa597c03a3564d22)
- [tdf#157573 sw floattable: add missing testcase](https://git.libreoffice.org/core/commit/65f508b44ecbc20c8bd5172d1656639f686730ff)
- [tdf#157590 sw floattable: avoid hang in the nested + row span case](https://git.libreoffice.org/core/commit/8e03dfd6a4bff4eabf779ace9b758b49cf80f8ba)
- [sw floattable: remove now unused FloattableNomargins compat flag](https://git.libreoffice.org/core/commit/5e7f7917fd589f661982d481a45bf84337e4c03c)
- [tdf#155040 sw floattable, RTF: fix table is overlapped by subsequent inline one](https://git.libreoffice.org/core/commit/612629f4a81acd7b851b7eccc97aba9a5915d13c)
- [tdf#155682 sw floattable: fix DOCX with big pictures causes endless loop](https://git.libreoffice.org/core/commit/9704f61982360ce35983a61cca3fd00bbdf51ab6)
- [Related: tdf#157590 sw floattable: avoid a bit of not needed work](https://git.libreoffice.org/core/commit/d6527f127622f23ac529ce667fac5ff69ea33ea4)
- [sw floattable: fix nullptr deref in TableManager::endLevel()](https://git.libreoffice.org/core/commit/8ad82fc115a337604c064d37adfffcc81440248e)
- [tdf#99822 sw floattable: allow nomimal overlap of objects from different cells](https://git.libreoffice.org/core/commit/435f1aadf7dd8087a8997924bedfccff0f496ba2)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.2).
