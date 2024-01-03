Title: Multi-page floating tables in Writer: tables wrapping tables
Slug: sw-floattable11
Category: libreoffice
Tags: en
Date: 2024-01-03T15:15:21+01:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [10th post]({filename}/2023/sw-floattable10.md) for the previous part.

## Motivation

Previous posts described the hardest part of multi-page floating tables: making sure that text can
wrap around them and they can split across pages. In this part, we'll look at a case where that
content is not just text, but the wrapping content itself is also a table.

## Results so far

Regarding testing of the floating table feature in general, the core.git repository has 92 files now
which are focusing on correct handling of floating tables (filenames matching
`floattable-|floating-table-`). This doesn't count cases where the document model is built using C++
code in the memory and then we assert the result of some operation.

Here are some screenshots from the improvements this month:

[![Improved click handling near the first page of a floating table](https://share.vmiklos.hu/blog/sw-floattable11/2023-12-01-floattable-click-correct.png)](https://share.vmiklos.hu/blog/sw-floattable11/2023-12-01-floattable-click-correct.png)

The first screenshot shows a situation where the mouse cursor is near the right edge of the first
page of a floating table. What used to happen is we found this position close to the invisible
anchor of the floating table on that page, then corrected this position to be at the real anchor on
the last page. In short, the user clicked on one page and we jumped to the last page. This is now
fixed, we notice that part of the floating table is close to the click position and we correct the
cursor to be at the closest position inside the table's content.

[![A floating table, wrapped by an inline table: old, new and reference rendering](https://share.vmiklos.hu/blog/sw-floattable11/2023-12-05-floattable-tablewrap.png)](https://share.vmiklos.hu/blog/sw-floattable11/2023-12-05-floattable-tablewrap.png)

The next screenshot shows a floating table where the content wrapping around the table happens to be
an inline table. You can see how such wrapping didn't happen in the past, and the new rendering is
close to the reference now.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable: fix finding the nearest text in split flys on mouse click](https://git.libreoffice.org/core/commit/f461853b11439c4e485a79174d34735395e5bf52)
- [tdf#60558 sw floattable: allow wrap of table on the right of a floattable](https://git.libreoffice.org/core/commit/868140fcc1311259b9d5f666637b33d226511a53)
- [sw floattable: fix split of anchor text in 2nd half of the paragraph](https://git.libreoffice.org/core/commit/0746d13365139c356eb9d297a358c486bf47d6fb)
- [sw floattable: fix split of anchor text at para start](https://git.libreoffice.org/core/commit/d852e27ed205c1a60de0979b80f3861bf93c44ae)
- [sw floattable: fix outdated text frame portions after split](https://git.libreoffice.org/core/commit/5fec60b4732bdbdb681be08e43a9be47c3bfb320)
- [sw floattable: disable UI to enable this when anchored inside TextBox](https://git.libreoffice.org/core/commit/4e8895d3d86db3776c56070c395cd727fd4b9101)
- [tdf#158686 sw floattable: fix print preview crash](https://git.libreoffice.org/core/commit/164fb25f7b2db7d833d6d0f28e49c5cac68426b3)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.8).
