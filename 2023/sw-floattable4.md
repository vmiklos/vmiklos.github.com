Title: Multi-page floating tables in Writer: part 4
Slug: sw-floattable4
Category: libreoffice
Tags: en
Date: 2023-06-01T08:44:46+02:00

Writer now has continued steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [third post]({filename}/2023/sw-floattable3.md) for background.

## Motivation

The previous post finished with crash testing: the interesting subset of that testing tool is to take
hundreds of thousands of documents and in the Writer case import them into a document model and
layout them. If any of this crashes, mark that for future investigation. In this post, we'll see
what else started to work during the past month.

## Results so far

The feature is enabled by default and now the DOCX/DOC/RTF import makes use of it if. This allows
stress-testing the layout code with complex user documents, hopefully with the found breakage fixed
before it would be released in a stable version.

On the positive side, core.git repository has has 37 files now which are focusing on correct
handling of floating tables (abbreviated as "floattables").  Also, there are additional tests that
quickly build a specific multi-page floating table in the memory and do some operation on it, e.g.
delete the last row and assert what happens.

Here are some screenshots from the effort so far:

![Floating table inside a multi-column section](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-03-floattable-multicol-good-nosplit.png)

The first case is about multi-column sections: in this case Word doesn't try to split them between
pages. What you can see on the screenshot is that Writer lays out content on the previous page so
that remaining space is left, but we don't try to split the table between the first and the second
page, even if there would be space on the first page and even if this means the table overlaps with
the second column, matching what Word does.

![UI to disable split of a floating table](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-04-floattable-ui-disable-good.png)

UI to enable split of floating tables were added quite early: this is a new checkbox on the frame
properties dialog. However, *disabling* the split of floating tables was broken, the already
created layout was not updated to properly move back "follow" fly frames from later pages to the
current page, which is now fixed.

![Chaining enabled, so no split frames](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-15-floattable-ui-disable-chain-good.png)

Writer already had a feature to split content in a frame into multiple frames, but that one required
creating those frames in the model explicitly, such chaining is a feature that is useful in other
use-cases and is parallel to multi-page floating tables. The UI now ensures that the user can split
frames only in case chaining is not used, to avoid confusion.

![Split enabled, so no chaining](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-16-floattable-chain-ui-disable-good.png)

This is now also true in the other way around: if split of a floating table is allowed, then we
disable the frame chaining UI to avoid trouble later.

![The latest crashing document](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-23-floattable-crash-good-writer.png)

At this point I went back to crashtesting & crash bugreports, and the latest reported crash was for
a document that is visible on the above screenshot. This was a bit tricky: it required 3 fixes to
make it not crash and also a layout loop fix.

![Disabling split of frames at a layout level](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-24-floattable-nosplit-compat-good-writer-odt.png)

Next was a mini-feature: even if floating tables normally split across pages by default, Word has a
document-level compatibility switch to turn this split on or off by default, at a layout level.
Floating tables from RTF are not split by default, DOC and DOCX split them by default.

What you can see on this screenshot is that a DOCX document may have this flag enabled, and then you
allow splitting on the UI / at a document model level, but Writer may still decide to not split
them, to provide the correct layout.

![Overlapping floating tables](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-26-floattable-overlap-bad.png)

The previous post already mentioned the problem area of overlapping tables. A first step in this
direction is to fix this bug document with Arabic text and 2 overlapping tables, making them
unreadable.

![Fixed overlap of floating tables](https://share.vmiklos.hu/blog/sw-floattable4/2023-05-30-floattable-overlap-good.png)

And in this case here is the fixed version, where reading the table now depends on your language
skills. :-)

In this case, the problem was a lost section break of type next page, when a section started with a
floating table, which is a corner-case.

And that's where we stand. Certainly more work is needed to fix more unwanted overlapping of
floating tables, but we get there step by step.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable, crashtesting: fix PDF export of forum-mso-en3-26783.docx](https://git.libreoffice.org/core/commit/1c99616f86f7d5b83b91edc225fc95fec227d710)
- [sw floattable: don't try to set various character properties as table property](https://git.libreoffice.org/core/commit/8c78361b05ba3cefe5b0f31f35113f7890fd2296)
- [sw floattable, crashtesting: fix PDF export of ooo9470-1.doc](https://git.libreoffice.org/core/commit/8c34ed6e8d62c5fe558b11bb91c5405e5bf2798e)
- [sw floattable: fix UI for turning fly split off](https://git.libreoffice.org/core/commit/f7e1cdf951f7f9cbb5822c49b86ba8a77a2fa878)
- [sw floattable: fix UI / property dialog for shape containing table](https://git.libreoffice.org/core/commit/61f3c796702f725f2c65b53b79ab7e190d39b6b8)
- [sw floattable: disable UI if the frame is chained already](https://git.libreoffice.org/core/commit/d9cd177b9b08d454882dd77ffeb825a184a1b540)
- [sw floattable: disable chain UI if the frame is allowed to split already](https://git.libreoffice.org/core/commit/a13264fc7578cbd3267065f4992ded9f7558ec7a)
- [sw floattable: fix missing table join when moving master fly to next page](https://git.libreoffice.org/core/commit/4cb6e54a3dcdd771ef76bd98b58f0bf1c4be4c45)
- [sw floattable: fix legacy max height of split flys with negative vert offset](https://git.libreoffice.org/core/commit/632f36cc972116cd8da8245590f74014c22532db)
- [sw floattable: fix assert fail when object formatter gets the wrong anchor](https://git.libreoffice.org/core/commit/b47401e12d9c45386899df0aa26653bd26c9abd4)
- [tdf#155002 sw floattable, split but not yet moved follow: fix GetNextFlyLeaf()](https://git.libreoffice.org/core/commit/807ad65661c122a33fccb4fd3453ef92c0e9129d)
- [sw floattable: add a DoNotBreakWrappedTables compat flag](https://git.libreoffice.org/core/commit/08fa2903df1a7cf9a1647fcf967e4c8b57dad793)
- [sw floattable: handle `<w:doNotBreakWrappedTables>` in the DOCX filter](https://git.libreoffice.org/core/commit/f5dc52dc9a068fec3323c3089929a81675b0d1ba)
- [sw floattable: handle fDontBreakWrappedTables in the DOC filter](https://git.libreoffice.org/core/commit/63de1ea465ef72ecb8d4a7dcdaf5e92ea875eb00)
- [sw floattable: handle \nobrkwrptbl in the RTF filter](https://git.libreoffice.org/core/commit/d785d26a5599d3d546b96958b0f1c6d5ed777a0d)
- [tdf#150769 sw floattable: fix lost PageDescName if section starts with a table](https://git.libreoffice.org/core/commit/2a380dba73d57f825128fbada91c7a9fe79e8a06)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
