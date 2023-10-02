Title: Multi-page floating tables in Writer: from split rows to cursor traversal
Slug: sw-floattable2
Category: libreoffice
Tags: en
Date: 2023-04-03T08:54:19+02:00

Writer now has the early steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [first post]({filename}/2023/sw-floattable.md) for background.

## Motivation

The previous post finished with split rows are now in a reasonable shape towards our journey to fix
[tdf#61594](https://bugs.documentfoundation.org/show_bug.cgi?id=61594). In this post, we'll see what
else is needed to get perfect rendering for that single document.

The plan is to iterate on that later, adding more and more incremental improvements & fixes for this
feature.

## Results so far

The feature is still enabled by default, but the DOCX import only makes use of it if you set the
`SW_FORCE_FLY_SPLIT=1` environment variable. This allows playing with the feature even if there are
lots of known problems still.

On the positive side, core.git `sw/qa/core/layout/data/` has 12 files now which are rendered exactly
the way Word does. Also, there are additional tests that quickly build a specific multi-page
floating table in the memory and do some operation on it, e.g. delete the last row and assert what
happens.

Here are some screenshots from the effort so far:

![Split row and an additional one on 2 pages](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-01-floattable-split-row-and-last-2pages-not-3pages-good.png)

Here the problem was that a normal row went to a next page after a split row. Now the document is
correctly of 2 pages, instead of the previous unwanted 3 pages.

![Floating table with multiple columns](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-02-floattable-2cols-good.png)

Here the additional complexity was to have multiple columns on a table, since previously we always
had 1 column and 2 or more rows. Now these are also split correctly across pages.

![Incorrect widow control inside split floating tables](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-03-floattable-widow-orphan-bad.png)

This is an incorrect table row split, because widow control is broken.

![Fixed widow control inside split floating tables](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-07-floattable-widow-fixed.png)

And here is how it looks when it's working. That little line on page 2 is no longer alone.

![Working minimal height](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-08-floattable-minimal-height-fixed.png)

Even better when the minimal height for non-first ("follow") table frames is working, as you can
notice that space between the last line and the table bottom border on page 2.

At this point, the bug document from the motivation section worked fine, apart from the workaround
that one has to re-save it in non-legacy mode in Word. So what's next? We need to instantly add a
legacy mode for the brand new (not even fully enabled) multi-page floating table feature, since
otherwise whatever we do, some DOCX files will be handled incorrectly.

![Legacy mode: bad margin](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-09-floattable-legacy-margin-bad.png)

As it turns out, the core of the legacy mode is that the floating table is sometimes allowed to flow
into the footer / bottom margin area of the page, but not always. It's quite inconsistent, so one
can understand why this is no longer the default behavior. The above is the naive rendering, which
is logical, but incorrect.

![Legacy mode: good margin](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-10-floattable-legacy-margin-good.png)

And this is the correct result in legacy mode. After a bit of experimenting, it seems one can flow into
the bottom margin area if the height of the table frame would fit the body frame, but some vertical
offset causes it to be pushed down.

![Legacy mode: minimal row height causes no row split](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-13-floattable-legacy-min-row-height-no-split-good.png)

The final trick with legacy mode is to make sure that all tables (first one, middle ones, last one)
have the required minimal height, which can result in not splitting the row in case a part of that
would be less than the minimal height. E.g. a 3 cm minimal height means that a total height of 4 cm
(2cm + 2cm) is not enough for a split row.

With this, we reached the goal to render that given bug document perfectly (when compared to Word),
and the next step is to fix up breakage that would be caused by enabling by default.

![Tracked changes in floating tables](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-14-floattable-redline.png)

The first problem was tracked changes support, which needs special care: as the importer
converts body text to table cells, we need to keep the tracked insert/delete text ranges correctly. This is
now working fine.

![Nested tables: the outer is floating](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-16-floattable-inner-normal.png)

The next problem is around nested tables: a normal inner table inside a floating table was lost on
DOCX file open, now fixed.

![Nested tables: broken inner floating table](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-17-floattable-nested-bad.png)

The other version is when a normal table has an inner floating table. This broke badly, the outer
table was not imported at all.

![Nested tables: better inner floating table](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-20-floattable-nested-innerfloat-better.png)

And it's now better. The inner table is still not actually floating, but turns out that was never
working for DOCX files, so it's not a regression. Fine to revisit that only later.

![Follow table: bad horizontal positioning](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-21-floattable-follow-pos-bad.png)

So far all the previous tables were aligned to the left. It turns out that the horizontal
positioning was bad in every other case for non-first tables, e.g. when you wanted to center them.

![Follow table: good horizontal positioning](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-22-floattable-follow-pos-fixed.png)

And it's now fixed.

As a last fix for this post, let's look at traveling with the cursor:

![Good cursor traversal](https://share.vmiklos.hu/blog/sw-floattable2/2023-03-23-floattable-cursor-traversal-good.png)

After fixing this, now you can use the up/down arrows to go from the A1 cell to A2 and back. The
cursor traversal code wasn't aware that the master/follow table frame was connected.

And that's where we stand. Hope to enable even the DOCX import bit by default soon.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable: update layout when enabling fly split via UNO](https://git.libreoffice.org/core/commit/25a01778f998618d9a4d0de9da5784e0e60e3259)
- [sw floattable: teach the UI about SwFormatFlySplit](https://git.libreoffice.org/core/commit/e32dfaf15563372ffae6e0da53998e20068ebf81)
- [sw floattable: don't leave body in SwFrame::GetNextFlyLeaf()](https://git.libreoffice.org/core/commit/34794e122fb4570376e712a7a356fc41620a46c7)
- [sw floattable: fix vertical position of follow flys with rel orient = page](https://git.libreoffice.org/core/commit/b9bf9bf9d1d1e0fb9eb765cd5060d611af7176df)
- [sw floattable: undefined behavior in SwFlyFrame::UpdateAttr_()](https://git.libreoffice.org/core/commit/edaf6155496d452c67aa191c1d45a0328ef079e0)
- [sw floattable: try to grow fly parent when trying section/table](https://git.libreoffice.org/core/commit/e66632b023ee1cf25a381536f53458f631964bb8)
- [sw floattable: clean up not needed scope in SwTextFormatter::FormatLine()](https://git.libreoffice.org/core/commit/aac624d1e3cd6fc023e25fedbfe48ed330a308ec)
- [sw floattable: grow the print area as well in SwFlyFrame::Grow_()](https://git.libreoffice.org/core/commit/5d5dca66e17c90e20197d0d76113254b13ff0bb7)
- [sw floattable: partially re-enable widow / orphan control in tables](https://git.libreoffice.org/core/commit/65dd1525e826006f78f86688032459dbd7ab4bb4)
- [sw floattable: enable widow / orphan control in split rows](https://git.libreoffice.org/core/commit/78b1631e9649402e29c906c7023f55ed2cbe84f9)
- [sw floattable: ignore height of masters in lcl\_CalcMinRowHeight()](https://git.libreoffice.org/core/commit/913b71dbe06c33773c4d779e00c6ec4b6a4af59f)
- [sw floattable: handle Word 2010 legacy mode in SwFlyFrame](https://git.libreoffice.org/core/commit/da2707a83f13cba98b22aba1ca6568dbbc4c5fd8)
- [sw floattable: reject small(er than min height) row master at page bottom](https://git.libreoffice.org/core/commit/baebe41647e4522a2d58f7a4eb392ceab66fc2c9)
- [sw floattable, legacy: restrict height when using bottom margin area](https://git.libreoffice.org/core/commit/ee8e9b993595e728f827a5fe6ab1ae5fb1f6aaae)
- [sw floattable, legacy: also consier fly position when deciding the bottom](https://git.libreoffice.org/core/commit/90523e10ec053347719309403a4d8566da1dfc4a)
- [sw floattable: unconditionally map <w:tblpPr> to SwFormatFlySplit](https://git.libreoffice.org/core/commit/d477fa8ac1b0d3ee81427217bbb5950278ab16db)
- [sw floattable: fix redline import from DOCX](https://git.libreoffice.org/core/commit/9a9ee21ec237eda5df6ea70bfa3bec07b44b4d21)
- [sw floattable: fix CppunitTest\_sw\_ooxmlexport10's testTdf8255](https://git.libreoffice.org/core/commit/28325983db2f7613b94bc70ef920ba13ebe6d817)
- [sw floattable: fix CppunitTest\_sw\_ooxmlexport10's testTdf99140](https://git.libreoffice.org/core/commit/75249d502e83c10ec38ef8cc8ee58c6c877c6ee9)
- [sw floattable: fix handling of nested non-floating tables at cell start](https://git.libreoffice.org/core/commit/48818dd359fbf0f37e1b318de89ab2ea7d735f58)
- [sw floattable, CppunitTest\_sw\_ooxmlexport9: assert the layout in testTdf107889](https://git.libreoffice.org/core/commit/8bc607225e6bc9ba343e2292f9185b6491108e44)
- [sw floattable, CppunitTest\_sw\_ooxmlexport9: assert can-split in testTdf109063](https://git.libreoffice.org/core/commit/3911b23c89da02eca92a0069bf1035155b7fddae)
- [sw floattable, CppunitTest\_sw\_ooxmlimport2: assert the layout in testTdf114217](https://git.libreoffice.org/core/commit/28b16870553f436b8dd0f74894896136057402a3)
- [sw floattable: fix inner floating table inside normal outer table from DOCX](https://git.libreoffice.org/core/commit/a1b935ca1bb6d48241e73e7206a367fe2b51f948)
- [sw floattable: limit the unfloat button to non-DOCX files](https://git.libreoffice.org/core/commit/2b7b272e28bf95c4ed85cb118eacf065fb6dca3c)
- [sw floattable: fix current page number when editing document with a split fly](https://git.libreoffice.org/core/commit/015da04a8f3e1368c6b9668ca22d7e320e1ecae6)
- [sw floattable: fix bad position of follow fly if anchor is positioned late](https://git.libreoffice.org/core/commit/12a9009a1c19ee26c65fb44fc90f3432c88ab6a5)
- [sw floattable: fix up/down cursor travel at fly boundary](https://git.libreoffice.org/core/commit/3c3a47e911a7ee4d199fe96bd3003c7d9afa9deb)
- [sw floattable: remove empty follow flys on follow table removal](https://git.libreoffice.org/core/commit/f6fbd9d5ff5b049112e6ca7a8943c156b3e4f411)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
