Title: Multi-page floating tables in Writer: nested tables
Slug: sw-floattable8
Category: libreoffice
Tags: en
Date: 2023-10-03T08:26:55+02:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [seventh post]({filename}/2023/sw-floattable7.md) for the previous part.

## Motivation

Multi-page floating tables and nested tables could not be combined so far. Instead we tried to lay
out the outer table on multiple pages and all inner tables were still limited to a single page. In
this part, you can read about removing this limitation.

## Results so far

Regarding testing, the core.git repository has 73 files now which are focusing on correct
handling of floating tables (filenames matching `floattable-|floating-table-`). This doesn't count
cases where the document model is built using C++ code in the memory and then we assert the result
of some operation.

Here are some screenshots from the fixes this month:

[![Old, new and reference rendering of a floating inner table in a floating outer table from DOCX.](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-08-floattable-nested.png)](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-08-floattable-nested.png)

The first screenshot shows a case where not only a single floating table is split across pages, but
also the table's only cell hosts an inner multi-page floating table. This is more complicated at a
layout level, because we can't just move part of the table to a next page, which has no parts of the
outer table yet.

[![Old, new and reference rendering of nested, multi-page floating table at cell start.](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-15-floattable-nested-cellstart.png)](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-15-floattable-nested-cellstart.png)

The next screenshot shows a case where the inner floating table starts at the cell start of the
outer table. The DOCX import case needed addition effort to get working, because as soon as the
inner floating table's content is moved to the floating frame from the body text, the reference to
the cell start at the outer table level was invalidated and the whole table conversion failed.

[![Old, new and reference rendering of multiple inner floating tables starting at cell start of an outer floating table.](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-18-floattable-nested-cellstarts.png)](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-18-floattable-nested-cellstarts.png)

This screenshot shows a bug where multiple inner floating tables started at the cell start of the
outer table. Handling this correctly on our end had to ensure that each (potentially multi-page)
floating table gets its own unique anchor point, and this can be combined with nesting, with the "at
cell start" special case on top of it. Once all three can be combined, a real-world documents
gets its table instead of just having the content the of the table in the body text.

[![Old, new and reference rendering of moving the table start to a new page.](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-21-floattable-move-master.png)](https://share.vmiklos.hu/blog/sw-floattable8/2023-09-21-floattable-move-master.png)

The last screenshot shows an editing session where we keep inserting new paragraphs at the start of
the document, so new items are created at the end of the fly chain as needed, and old items are
deleted at the start of the fly chain as needed. We had a bug here so that the content we wanted to
move forward was inserted at the end of the document, leading to a weird selection that started at the
document end and continued on a previous page. Now this works correctly: once the first page is full
of empty paragraphs, the second page hosts the first row and half of the second row. The third page then
can host the second half of the second row and the third row.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [Related: tdf#156318 sw floattable: fix handling of vert orient == top](https://git.libreoffice.org/core/commit/7d4213b9f0253b323750acceca8f4edb9d1a7fc5)
- [tdf#156318 sw floattable: fix follow text flow handling on interactive edit](https://git.libreoffice.org/core/commit/401c175d1bbe3c64e5dd96e3b23779999271cfb1)
- [sw floattable, nesting: fix layout crash](https://git.libreoffice.org/core/commit/d29c1a90ae77dde7c87c51f21e859fa254f23e01)
- [sw floattable, nesting: fix position of the inner follow table](https://git.libreoffice.org/core/commit/3aa3f0a1638a8d8006955b62bb647526768be3d8)
- [sw floattable, nesting: fix PDF export](https://git.libreoffice.org/core/commit/facdac2443d50339f81415d09c1869d19dded7bf)
- [sw floattable, nesting: fix overlap support](https://git.libreoffice.org/core/commit/e20bacc209a8e8483209cb4ec51c9e0b55423cdb)
- [sw floattable, nesting: fix DOCX export](https://git.libreoffice.org/core/commit/2887e6b8edbb4fdb093515a3a68269ed40e42116)
- [sw floattable, nesting: add DOCX import](https://git.libreoffice.org/core/commit/5127b1961b762643d47a26704556fd9b8664c6fc)
- [Related: tdf#55160 sw floattable, nested DOCX exp: fix inner tbl at cell start](https://git.libreoffice.org/core/commit/d50e5d6d53c94124f825758a74e186b934fc2a4e)
- [Related: tdf#55160 sw floattable, nested DOCX imp: fix inner tbl at cell start](https://git.libreoffice.org/core/commit/2d43c34333076fad092f0cdc0f60f81580acdbee)
- [tdf#55160 sw floattable, nested DOCX imp: fix inner tables at cell start](https://git.libreoffice.org/core/commit/a33316afa4a20499159b8c900e56658512deb74a)
- [tdf#157005 sw floattable: fix missing format of next row in follow fly](https://git.libreoffice.org/core/commit/cf2be3754b4c48382a61e044209c077bf59c72f2)
- [tdf#157119 sw floattable: fix moving master of split fly to next page](https://git.libreoffice.org/core/commit/cfe9c68a7a19dd77d1fcbde3a7dd75730634becc)
- [tdf#157263 sw floattable: prefer join over split after moving fwd](https://git.libreoffice.org/core/commit/b8521d969ab5be4fc947e467d4afe969f9d3b563)
- [Related: tdf#126449 sw floattable: fix bad join of inline tbl with inner fly](https://git.libreoffice.org/core/commit/c86d6111525f09e895483c7c4919a4b9a5dbd9b9)
- [sw floattable: maintain the invariant that fly height is at least MINFLY](https://git.libreoffice.org/core/commit/25b8fdd3b939a221ba00ca37fbf89adaf893aab7)
- [Related: tdf#126449 sw floattable: fix bad position of in-table follow fly](https://git.libreoffice.org/core/commit/83abd141bf41c1c8a1d4e5a894b235c842da2a07)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.2).
