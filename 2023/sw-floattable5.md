Title: Multi-page floating tables in Writer: part 5
Slug: sw-floattable5
Category: libreoffice
Tags: en
Date: 2023-07-03T14:23:10+02:00

Writer now has continued steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [fourth post]({filename}/2023/sw-floattable4.md) for background.

## Motivation

The previous post finished with a first fix for overlapping tables: this is a cluster of problems
where tables are allowed to overlap, but various other formatting make them not overlap in practice
in Word, but they do overlap in Writer. In this post, we'll see what started to work during the past
month.

## Results so far

The feature is enabled by default and the DOCX/DOC/RTF import makes use of it. This allows
stress-testing the layout code with complex user documents. The next target is to actively search
for documents that rendered reasonably in the past but are now unreadable and fix them.

On the positive side, core.git repository has has 40 files now which are focusing on correct
handling of floating tables (filename matching `floattable-|floating-table-`).  Also, there are
additional tests that quickly build a specific multi-page floating table in the memory and do some
operation on it, e.g.  delete the last row and assert what happens.

Here are some screenshots from the fixes this month:

![Section break directly between floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-01-floattable-lost-good.png)

The first problem was that in case two floating tables were directly after each other, a section
break between them was lost. What you can see above is a successful transfer of the break
properties to the first paragraph on the next page, so the tables don't overlap but are laid out on
separate pages.

![Incorrect split of a multi-page floating table](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-02-floattable-split-1-bad.png)

Looking through internal documents, a sample was found where a table with 2 rows was not split, even
if the previous page would have enough space for the first row. This is the old, bad layout.

![Correct split of a multi-page floating table](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-02-floattable-split-2-good.png)

And this is how it looks after the fix.

![2 floating tables are lost](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-05-floattable-lost-2-tables-bad.png)

The rest of the screenshots are from a complex internal document, which has 4 pages, but in total
contains 11 floating tables. First I focused on getting correct rendering of this in Writer for
DOCX. All the problems were not visible previously, as non-floating tables can't overlap, so bad
formatting problems did not cause problems in practice. The first subset (public reproducer) had 3
tables in it, but Writer only rendered one of them.

![Normal table and 2 floating tables are fixed](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-05-floattable-lost-2-tables-good.png)

After fixing the problem, both lost tables are now there.

![Unwanted overlap of two floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-07-floattable-overlap-bad.png)

The next case is about overlapping tables: the table is there, but the anchor positions are so
close that the content overlaps and it's hard or impossible to read the text.

![Fixed overlap of two floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-08-floattable-overlap-good.png)

And this is how it looks after the fix.

![Bad handling of nested floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-09-floattable-nested-bad.png)

The next trouble is with nested floating tables: in case all inner tables are inline, then the table
above the images will require more space then requested and that will lead to overlapping text
later.

![Better handling of nested floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-12-floattable-nested-better.png)

The first fix is to make these inner tables also float if requested in the file format (but not
split for now, to develop incrementally). This helps, but the position of the inner table's anchor
is still incorrect.

![Good handling of nested floating tables](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-13-floattable-nested-good.png)

Finally the anchor position of the table is also correct: no intersecting borders, no overlapping
text, no unexpected need for lots of vertical space.

![Layout-loop for a floating table](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-15-floattable-loop-bad.png)

The next problem was a layout loop, which was terminated by the built-in loop control in a way that
rendered text outside the table to show up inside the table.

![Fixed layout-loop for a floating table](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-16-floattable-loop-good.png)

And here is the correct rendering. Note that in case a floating table's anchor is positioned with a
negative vertical offset, then it can happen that text before the table will be rendered below the
table. But this is intentional and also happens in Word.

![Bad handling of negative vertical offsets](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-19-floattable-negative-vert-offset-bad.png)

The last problem for this blog post is the case when a large floating table is anchored in a
single-line paragraph. Now Writer insists that the anchored object and the anchor text is on the
same page, so even if there is space for the last table on a previous page, it moves the table to
the next page.

![Good handling of negative vertical offsets](https://share.vmiklos.hu/blog/sw-floattable5/2023-06-20-floattable-negative-vert-offset-good.png)

And here is the correct rendering: all tables fitting the first page. Also note that the last table
is moved up, so while the document model order is "after-table-2-second table-3 after-table-3", the
rendered / layout order will be "table-3 after-table-2-second after-table-3" -- again,
intentionally.

And that's where we stand. Certainly more work is needed to fix some remaining unwanted overlapping
of floating tables, but we get there step by step.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#103869 sw floattable: fix lost table right before a section break from DOCX](https://git.libreoffice.org/core/commit/e2f90d1d0e51c68dd01c9968cdb7a3bbb5658613)
- [sw floattable: ignore keep-with-next for anchors of non-last split flys](https://git.libreoffice.org/core/commit/920e76f15b78398de62002e30002f4f8e0fee7c1)
- [sw floattable: fix lost tables around a floating table from DOCX](https://git.libreoffice.org/core/commit/01ad8ec4bb5425446e95dbada81de435646824b4)
- [sw floattable, DOCX import: clean up not needed dmapper-level anchor insert](https://git.libreoffice.org/core/commit/4c5438b2c447403194420b69311a81ea7d36e157)
- [sw floattable, compat mode: handle lower margin of anchor for fly intersect](https://git.libreoffice.org/core/commit/81a108770233825557c2dae5776d7417be017fb8)
- [sw floattable: import non-split inner floating tables from DOCX](https://git.libreoffice.org/core/commit/b71a9bcc2e1b4541c14e8197b5b888ee92297a6e)
- [sw floattable: fix anchor position of inner floating table](https://git.libreoffice.org/core/commit/c374628126ad222be48d5d06857b7dc6b879f783)
- [sw floattable: fix handling of upper margin of anchor for fly intersect](https://git.libreoffice.org/core/commit/737d90b7b7cb03bb6128b74a32906b0391868830)
- [sw floattable: avoid layout loop for negative vert offset in MakePos()](https://git.libreoffice.org/core/commit/01eff4a68b05dd4eeee94bc4b3b018059efa60d4)
- [sw floattable: fix negative vertical offset handling on page boundary](https://git.libreoffice.org/core/commit/2d0a4ef1d83b8de6cb133970c2c35ae706fb058e)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
