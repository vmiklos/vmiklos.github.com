Title: Multi-page floating tables in Writer: hidden anchors and more
Slug: sw-floattable6
Category: libreoffice
Tags: en
Date: 2023-08-01T09:29:19+02:00

Writer now has continued steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [fifth post]({filename}/2023/sw-floattable5.md) for background.

## Motivation

The previous post finished with an "almost done" state for overlapping tables: this is a cluster of
problems where tables are allowed to overlap, but various other formatting make them not overlap in
practice in Word, but they do overlap in Writer. In this post, we'll see what was necessary so an
initial set of old documents now render perfectly, which started to work during the past month.

## Results so far

The feature is enabled by default and the DOCX/DOC/RTF import makes use of it.

On the positive side, core.git repository has has 49 files now which are focusing on correct
handling of floating tables (filename matching `floattable-|floating-table-`).  Also, there are
additional tests that quickly build a specific multi-page floating table in the memory and do some
operation on it, e.g.  delete the last row and assert what happens.

Here are some screenshots from the fixes this month (right click, open image in new tab for larger size):

![Old, new and reference rendering of a floating table with negative vertical position, relative to an empty anchor.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-03-floattable-negative-vert-offset-emptyanchor.png)

The first case is about a document where the bottom of the page had a floating table, where the
position (relative to the anchor) was a negative vertical offset. In this case Writer used to move
the floating table to the next page, but now matches Word: the space in the previous page is used
for the floating table. This fixed overlapping text on the next page.

![Old, new and reference rendering of a floating table with a large bottom margin in the anchor paragraph. Notice how the old rendering had a larger spacing between footnotes, which resulted in a 2 page document. The new and reference renderings have smaller spacing between footnotes and are of 1 page.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-05-floattable-anchor-bottom-margin.png)

The next case is about floating tables in footnotes, the anchor needs to have no visible margins to
provide the correct layout.

![Old, new and reference rendering of a floating table with an overlap due to vertical offsets. The old rendering had a big second table, it completely covered the first table. The new and reference renderings shift the second table to a next page to avoid overlap.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-06-floattable-overlap-vert-offset.png)

This case was about an unwanted overlap of floating tables. Incorrect handling of the vertical
offsets meant that the second floating table was rendered on top of the first one, making the text
in the first floating table unreadable. Now we shift down the second floating table, so no overlap
happens.

![New rendering of a floating table with anchor text that starts with a newline.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-12-floattable-newline-loop.png)

This document had a layout loop on load. The problem was specific to the case when the anchor text
of a floating table started with a newline character, which has its own position in the document
model, but doesn't really have a width at a layout level, so needs special handling. This is now
fixed, the document loads and renders fine.

![Old, new and reference rendering of a document with lots of floating tables.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-13-floattable-suse.png)

This document had only 4 pages, but lots of floating tables, carefully positioned to not overlap in
Word. You can see how the old Writer rendering result was hard to read and it now looks correct.

![Old, new and reference rendering of a floating table with a hidden anchor.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-14-floattable-suse-hidden.png)

Writer used to hide floating tables anchored inside hidden paragraphs, but Word shows them all the
time, now we match this behavior.

![Old, new and reference rendering of a floating table with an overlap.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-17-floattable-overlap-table.png)

The next document first had all of its tables in the first page, now fixed.

![Old, new and reference rendering of a floating table with an overlap between the table and the footer area.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-18-floattable-overlap-footer.png)

A remaining problem was that the second table and the footer area could still overlap. This is now
fixed: Word sometimes does allow such an overlap, but it depends on the baseline of the anchor
position, so in the current case we can detect that such an overlap is not wanted.

![Old, new and reference rendering of a floating table with a half row on the first page.](https://share.vmiklos.hu/blog/sw-floattable6/2023-07-19-floattable-halfrow.png)

The last problem with this document was a poor split of the floating table, the first half row of
the second table still went to the first page. Now we correctly detect that such a split is not
wanted and simply start the second floating table on the second page, which results in a pretty good
rendering of this document.

And that's where we stand. Certainly more work is needed to fix rough edges, but we get there step
by step -- the theme is slowly transitioning from overlap problems right after load to unexpected
rendering problems during editing.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable: fix negative vert offset with on page boundary without anch text](https://git.libreoffice.org/core/commit/16b5b21d36da87be9b50235acbbb8008ed23b8bb)
- [sw floattable: fix lost floating table right before a table from DOC](https://git.libreoffice.org/core/commit/79ddca4def81198e3eee42eca8aca42fef964c80)
- [tdf#156059 sw floattable: fix lost 0 bottom margin of anchor in ftn from DOCX](https://git.libreoffice.org/core/commit/9ac864159b241d2093e86f664ab6f4b76c69196d)
- [sw floattable: enable AddVerticalFrameOffsets compat flag for DOC](https://git.libreoffice.org/core/commit/1f2d523aeeafd241c71a468c970054120fb23b3d)
- [sw floattable: make sure floattable after floattable gets own anch pos from DOC](https://git.libreoffice.org/core/commit/663db89378aa1f0425e795ef5d471f134e658dc4)
- [cool#6857 sw floattable: try harder to keep anchor text in the last follow](https://git.libreoffice.org/core/commit/d59704b6b8c7e5395c0606fa01f37392afc4b2cd)
- [sw floattable: fix lost floating table right before a hidden para from DOCX](https://git.libreoffice.org/core/commit/52d265c0d2f2638c386475e58c3ee489ccd3f06c)
- [tdf#120262 sw floattable: don't wrap text around fly when no content would fit](https://git.libreoffice.org/core/commit/8bd30999098567b3bdb84a6ca65c071952192932)
- [tdf#120262 sw floattable, legacy: fix text wrap around fly when no content fits](https://git.libreoffice.org/core/commit/a4af5432753408c4eea8a8d56c2f48202160c5fe)
- [tdf#120262 sw floattable, legacy: go outside body only for page frame vert pos](https://git.libreoffice.org/core/commit/9a5d1c250cbaac855b3e63d8c5fa0882ba7d14a2)
- [tdf#120262 sw floattable: no split when none of first row fits the vert space](https://git.libreoffice.org/core/commit/45574624ff05673d44f11cdbbbb49e1af599133e)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
