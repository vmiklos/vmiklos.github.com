Title: Start of multi-page floating tables in Writer
Slug: sw-floattable
Category: libreoffice
Tags: en
Date: 2023-02-28T16:05:07+01:00

Writer now has the early steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well.

## Motivation

As requested in [tdf#61594](https://bugs.documentfoundation.org/show_bug.cgi?id=61594) 10 year ago,
the use-case is that you can already have floating tables:

![Table in a Writer text frame](https://share.vmiklos.hu/blog/sw-floattable/fly.png)

And multi-page tables:

![Multi-page table](https://share.vmiklos.hu/blog/sw-floattable/multi-page.png)

And what we want is a combination of them, like this:

![Multi-page floating table](https://share.vmiklos.hu/blog/sw-floattable/floattable-more-wrap.png)

This is a quite complicated feature, since both floating objects and tables are complex, and this
combines them to create even more complexity.

## Results so far

The feature is enabled by default, but the DOCX import only makes use of it if you set the
`SW_FORCE_FLY_SPLIT=1` environment variable. This allows playing with the feature even if there are
lots of known problems still.

On the positive side, core.git `sw/qa/core/layout/data/` has 4 files now which are rendered exactly
the way Word does. Here are some screenshots from the journey so far:

![Not splitting Writer text frame](https://share.vmiklos.hu/blog/sw-floattable/fly-nosplit.png)

This is a fly frame with enough content that it doesn't fit the body frame. It should split, but fly
frames could not be split.

![Writer text frame kept inside the body frame](https://share.vmiklos.hu/blog/sw-floattable/fly-split-wip.png)

First try, just limit the height of the (master) fly frame, so at least it stays inside the body
frame. But now some content is not rendered.

![Incorrect split of a text frame](https://share.vmiklos.hu/blog/sw-floattable/fly-split-2nd-buggy.png)

Next try. Now have have 2 flys, but the second has zero height and the content of the second fly
leaks into the body of the second page.

![Last version with bad anchoring](https://share.vmiklos.hu/blog/sw-floattable/fly-split-bad-anchor-poc.png)

This one is better, but the position of the follow fly frame is bad, no actual wrapping happens.
Also, we assume that there are multiple paragraphs after the table, which will cause problems for
floating tables at the end of the document. So I reworked the anchoring code to split the anchor to
as many pages as necessary...

![Duplicated anchor text](https://share.vmiklos.hu/blog/sw-floattable/fly-anchor-text-bad.png)

Which sounds good, but now the text around the anchor point is duplicated.

![Less duplicated anchor text on the first page](https://share.vmiklos.hu/blog/sw-floattable/fly-anchor-text-better.png)

Better, now the anchor text is gone in the master anchor, but still there is a misleading paragraph
marker.

![Last text frame without a table](https://share.vmiklos.hu/blog/sw-floattable/fly-anchor-text-good.png)

And now this looks reasonable. Fine, we have some minimal split flys, let's try it with tables
instead of just two paragraphs:

![Floating table with duplicated anchor text](https://share.vmiklos.hu/blog/sw-floattable/multi-page-floating-table-dupetext.png)

With a bit of work, the table's two rows can split, but again the text in the anchor is duplicated.

![Bad horizontal position](https://share.vmiklos.hu/blog/sw-floattable/floattable-bad-hori-pos.png)

Next try, now the anchor text is correct, but the horizontal position of the table is still bad, it
bleeds out towards the left margin area.

![Fixed horizontal position](https://share.vmiklos.hu/blog/sw-floattable/floattable-good-hori-pos.png)

And with more work, now this looks correct.

![Fixed vertical position](https://share.vmiklos.hu/blog/sw-floattable/floattable-good-vert-pos.png)

Let's add some vertical offset! That should be only applied on the first page, and now the follow
fly doesn't have that unwanted offset.

Now we have 2 documents that lay out correctly on 2 pages. Let's try 3 pages:

![Wanted 3 pages, have 2 pages](https://share.vmiklos.hu/blog/sw-floattable/floattable-3page-bad.png)

This falls apart, the 2nd and the 3rd row are both on page 2.

![Correctly rendered 3 pages](https://share.vmiklos.hu/blog/sw-floattable/floattable-3page-good.png)

After partitioning the fly frames to 3 categories (master, non-last follows, last follow), more
than 2 pages also work.

![Row split is not performed at all](https://share.vmiklos.hu/blog/sw-floattable/floattable-row-split-writer-bad.png)

This is a sample where the table has a single cell, so we need to split the (only) row, not just
split the table's rows. The first is harder. Currently we don't even try to split it.

![Row split is performed, but the 2nd page's object has a bad position](https://share.vmiklos.hu/blog/sw-floattable/floattable-row-split-writer-bad2.png)

Next try, now we split it, but the position of the follow fly is wrong.

![Row split with correct object positioning on all pages](https://share.vmiklos.hu/blog/sw-floattable/floattable-row-split-writer-good.png)

Finally split of a single row inside multi-page floating tables also work. That's where we are.
Don't try to do anything too custom (like inserting a header or footer), those cases are still
known-broken.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw: add document model for multi-page fly frames](https://git.libreoffice.org/core/commit/0bb90afaeb193181d7b98b79e962549d8a1dd85a)
- [sw: add UNO API for multi-page fly frames ](https://git.libreoffice.org/core/commit/fd3d4d894d96f16a28d5b58c5bcf5a44fb83617f)
- [sw: inherit SwFlyAtContentFrame from SwFlowFrame](https://git.libreoffice.org/core/commit/bef6c5ca4edf55e64284d9dd264ba9a76476adab)
- [sw: add an SwFlyAtContentFrame ctor that creates a follow fly frame](https://git.libreoffice.org/core/commit/a6b64d02843d186485ff5c82106e6f9268a539c7)
- [sw: add an initial SwFrame::GetNextFlyLeaf()](https://git.libreoffice.org/core/commit/66d235012c0c02db3b25f91a0fc981c66ed7388e)
- [sw: if the fly is to be split, then limit its growth in SwFlyFrame::Format()](https://git.libreoffice.org/core/commit/ed9d987e2ad8f6af554a5fc1f858ca48c6970446)
- [sw: introduce SwFlyFrame::IsFlySplitAllowed()](https://git.libreoffice.org/core/commit/b052ec2f2fbe0f3044ba824c064a280a5ee9cd7f)
- [sw: call GetNextFlyLeaf() in SwFrame::GetLeaf()](https://git.libreoffice.org/core/commit/4c6c317e1743166ee772ab03413f0fa59c59f859)
- [sw: avoid unwanted initial content in split/follow fly frames](https://git.libreoffice.org/core/commit/8855813f8147f430348a32703b89dfb7b0793fee)
- [sw: implement SwFrame::GetPrevFlyLeaf()](https://git.libreoffice.org/core/commit/27fbab13557a75b5402c11a1697541edc124116a)
- [sw: handle split flys in SwTextFormatter::FormatLine()](https://git.libreoffice.org/core/commit/6275bd9db475cb984ac153d06ed1ddadfa2fadb7)
- [sw: fix anchoring in SwFrame::GetNextFlyLeaf()](https://git.libreoffice.org/core/commit/ddfb800e60d98340c99c8013f6df3f2060687dd0)
- [sw floattable: fix cid#1520800](https://git.libreoffice.org/core/commit/d6b9529c4f63d1dd5c57db4f4912471cce2507d9)
- [sw floattable: fix cid#1520804](https://git.libreoffice.org/core/commit/25a16e7543965565a4227506003adc916deea500)
- [sw: call FormatEmpty() in SwTextFrame::Format() for split fly masters](https://git.libreoffice.org/core/commit/00b9b33334791079c2dc26b1ed4c123450cabf7d)
- [sw floattable: handle table-in-fly in SwFrame::GetNextFlyLeaf()](https://git.libreoffice.org/core/commit/995198bfff4ae8abaf2129fe99d9f8ef899a4f25)
- [sw floattable: improve handling of split flys in SwTextFrame::FormatEmpty()](https://git.libreoffice.org/core/commit/1cf13b8b11e7c122631394e308b66b46ffaae718)
- [DOCX filter: fix horizontal pos of floattables with compat mode >= 15](https://git.libreoffice.org/core/commit/7fb8b73ad320e32af130ceddec80a9ff08407eab)
- [sw floattable: limit vertical position for the follows of split flys](https://git.libreoffice.org/core/commit/2f0b16a6a9bfff1646b14412e5918b6d483b9cdc)
- [sw floattable: add ImportFloatingTableAsSplitFly expert setting](https://git.libreoffice.org/core/commit/3282508f8deeafd50f5af45ca0adf760efb114a3)
- [sw floattable: it's fine to recalc the table in SwTabFrame::MakeAll()](https://git.libreoffice.org/core/commit/e11e1d48abedf17db40c069d9f37b4edcbcc09c4)
- [sw floattable: fix handling of multiple splits, i.e. table over 3 or more pages](https://git.libreoffice.org/core/commit/7c9acfe5baef275f07c185c6fedf8b6d62d88637)
- [sw floattable: fix locking in SwTextFrame::Prepare()](https://git.libreoffice.org/core/commit/b697ee5dc3c38806fc6f096364590e9e60256aeb)
- [sw floatable: teach the DOCX filter about SwFormatFlySplit](https://git.libreoffice.org/core/commit/e7be3b821cd42fdc9d8e51772b8202030d76497e)
- [DOCX export: move the bulk of the table export code to a new file](https://git.libreoffice.org/core/commit/3a8ecbc70320151cb7dde7d8f89dee67a7c6e3e5)
- [sw floattable: teach the ODT filter about SwFormatFlySplit](https://git.libreoffice.org/core/commit/2da16ff9f018fae68c53a801e5a234dafc2ebcec)
- [sw floattable: don't promise infinite growth in SwFlyFrame::Grow_()](https://git.libreoffice.org/core/commit/6068ae5df9da179e1d187e27117a9d761116f968)
- [sw floattable: allow extra space on top of child content in SwFlyFrame::Grow_()](https://git.libreoffice.org/core/commit/7677e16217349a0a0e94edb6a90b00089432c6ce)
- [sw floattable: fix fly pos invalidation in follow anchor frames](https://git.libreoffice.org/core/commit/f13eb476ea6620bc444d9533959fea78afe720c5)

The design of the layout representation is documented in the [SwFormatFlySplit
constructor](https://github.com/libreoffice/core/blob/d25567e7e2fb96242b9bd4aca44df6f0287c2aa3/sw/source/core/attr/formatflysplit.cxx#L27-L44).

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
