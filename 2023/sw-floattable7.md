Title: Multi-page floating tables in Writer: overlap control, border and footnotes
Slug: sw-floattable7
Category: libreoffice
Tags: en
Date: 2023-09-01T13:33:39+02:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [sixth post]({filename}/2023/sw-floattable6.md) for the previous part.

## Motivation

The current post features sub-tasks for the multi-page floating table work that is around an
explicit table overlap control that Word has (and Writer lacked so far), compatible border rendering
of split tables and having footnotes in floating tables, which was not working previously.

## Results so far

Regarding testing, the core.git repository has 60 files now which are focusing on correct
handling of floating tables (filename matching `floattable-|floating-table-`). This doesn't count
cases where the document model is built using C++ code in the memory and then we assert the result
of some operation.

Here are some screenshots from the fixes this month:

[![Old, new and reference rendering after expanding an autotext.](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-02-floattable-edit-dummy-text.png)](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-02-floattable-edit-dummy-text.png)

The first screenshot shows a case where the anchor paragraph of a floating table had some autotext
(e.g. "dt", which stands for dummy text), and pressing the relevant shortcut (F3) expands that
autotext with the actual content. This includes changing the anchor position of the floating table,
which lead to overlapping text. (A multi-page floating table has multiple anchors, we have to make
sure we don't set all of them to the new value as-is.)

[![Old, new and reference rendering of tables with the overlap=never markup.](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-10-floattable-overlap-never.png)](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-10-floattable-overlap-never.png)

The next screenshot shows a case where two tables are positioned in a way that they would overlap.
Word has a flag that asks the layout to still re-position the second table so the overlap doesn't
happen, and now Writer supports this as well.

[![Old, new and reference rendering of duplicated anchor text.](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-16-floattable-duplicated.png)](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-16-floattable-duplicated.png)

This screenshot shows a bug where the anchor text on the first page was also duplicated on the
second page. Now we properly start the anchor text on the last page of the floating table, like Word
does.

[![Old, new and reference rendering of a multi-page floating table with borders.](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-21-floattable-split-border.png)](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-21-floattable-split-border.png)

What you can see is a floating table that has 2 pages, but simply a split of the table would result
in no bottom border on the first page and no top border for the second, like perhaps you would
expect it, matching Word. This is now fixed, the layout infers the border style in those cases
correctly.

[![Old, new and reference rendering of a footnote in a floating table.](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-24-floattable-footnote.png)](https://share.vmiklos.hu/blog/sw-floattable7/2023-08-24-floattable-footnote.png)

The last screenshot shows a mini-feature: it was possible to float tables and to have footnotes in
tables, but not both at the same time. The screenshot shows a case where a floating table is
needed, so a specific paragraph is *above* the table. But we couldn't float the table, because
it had a footnote and that would be lost as-is. Now you can have a correct position for that
paragraph and the footnote is there as well, at the same time.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#156350 sw floattable: fix bad additional draw:frame in ODT with layout](https://git.libreoffice.org/core/commit/2b401b7c0322d9ff972d252208ebe9a77913778d)
- [tdf#156260 sw floattable: avoid overlapping flys on anchor change](https://git.libreoffice.org/core/commit/073072f0a3abacfe4f9cc920b8138d7abc84db70)
- [tdf#156260 sw floattable: avoid moving text from the last anchor to its precede](https://git.libreoffice.org/core/commit/b6a22e2be79cd874c7526107a6793fae692620dc)
- [sw floattable: simplify collecting frames at node with layout](https://git.libreoffice.org/core/commit/f151ba5ebc8662d5459eacb1c5d6f01a4c826f26)
- [tdf#156349 sw floattable: fix caption insert for tables inside split fly frames](https://git.libreoffice.org/core/commit/107de1a2c6882213cf0ef6783417302f43cdada0)
- [sw floattable, crashtesting: fix PDF export of tdf73201-1.docx](https://git.libreoffice.org/core/commit/c545a0729e89ee2e8f14534b77422cc9eb4eb7cf)
- [tdf#156589 sw floattable: fix follow fly moving inside a table on the next page](https://git.libreoffice.org/core/commit/0d571ff8079f858a5650bf6cbb38296d22cc58e1)
- [sw floattable: import w:tblOverlap w:val="never" from DOCX](https://git.libreoffice.org/core/commit/d3a0ff741f5a7ff0dcec301e5b34ee9d638acf98)
- [sw floattable: handle AllowOverlap==false in the layout](https://git.libreoffice.org/core/commit/905962db870e9d1cf1dcf3bd1be44c347cddafe1)
- [sw floattable: export w:tblOverlap w:val=never to DOCX](https://git.libreoffice.org/core/commit/5af44a176d2a738dd7523713202aeee27c5578b6)
- [sw floattable: handle AllowOverlap==false in the DOC filter](https://git.libreoffice.org/core/commit/d44af60677740b151305799a4325d0f0699fce66)
- [sw floattable: handle AllowOverlap==false in the RTF filter](https://git.libreoffice.org/core/commit/68c8466dd80e7a964e1377ee3e0308dc449fbf2d)
- [tdf#156682 sw floattable: fix missing del of master anchor para por on split](https://git.libreoffice.org/core/commit/1cf29168840f84c2e946e2678b99988e83503c96)
- [Related: tdf#156351 sw floattable: fix missing top border in follow table](https://git.libreoffice.org/core/commit/53798fef2cc0b5b0b9706081a4af5ceca964a41b)
- [tdf#156351 sw floattable: fix missing bottom border in master table](https://git.libreoffice.org/core/commit/08aea5526c75ff4c5385e960bd940f10ffa19cd5)
- [tdf#77760 sw floattable: add support for footnotes, doc model](https://git.libreoffice.org/core/commit/56da1d30afe48cc4acd79567052a575e81f8c7a0)
- [tdf#77760 sw floattable: add support for footnotes, layout](https://git.libreoffice.org/core/commit/f8e1a62f944e5358fe498008b4ff8701f1e190a0)
- [tdf#77760 sw floattable: add support for footnotes, DOCX import](https://git.libreoffice.org/core/commit/178421a6c719dac9c16f220b76292fec16a53f60)
- [sw floattable: don't split if anchored inside a footnote](https://git.libreoffice.org/core/commit/2e1ddc8aeb0a92cc43ef4b7dc4762cd50a6b7fbc)
- [tdf#77760 sw floattable: add support for footnotes, DOC import](https://git.libreoffice.org/core/commit/c7b59c9484ae6ff88cd8d7017aeb83b02e212c9c)
- [tdf#77760 sw floattable: add support for footnotes, UI](https://git.libreoffice.org/core/commit/739597df38dcaab0460482e3bc3f18f2471d43ab)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.2).
