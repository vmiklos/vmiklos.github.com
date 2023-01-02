Title: Improved number portion formatting in Writer
Slug: sw-number-portion
Category: libreoffice
Tags: en
Date: 2023-01-02T16:01:41+01:00

Text portions generated when using lists/numberings/bullets in Writer now can have formatting which
is preserved in ODT files as well.

First, thanks [Docmosis](https://www.docmosis.com/) for funding this work by
[Collabora](https://www.collaboraoffice.com/).

## Motivation

Word and DOCX files support explicit character properties for the paragraph marker, and these are
also used for the formatting of a number portion if the paragraph has one. This was already loaded
from / saved to DOCX, but it was lost when saving to ODT.

## Results so far

First, we got a bug document, where the reference rendering and our rendering differed:

![Reference (on the left) and our (on the right) rendering, due to bookmarks](https://share.vmiklos.hu/blog/sw-number-portion/sw-number-portion-1.png)

In this case, what happened was that part of the heading text was covered by a bookmark, so we first
created multiple character ranges (outside the bookmark, inside the bookmark), then as an
optimization we even unified them to be a single formatted character range, covering the entire
paragraph. This was a document model that is different from the bookmark-free version, where the
character formatting was set on the paragraph itself.

This was fixed at render time and at DOCX export time to consider both full-paragraph character
ranges and in-paragraph character properties. For a while, this looked like the entire story.

A bit later another, related bug was discovered. Given a reference document:

![Reference rendering of a second document](https://share.vmiklos.hu/blog/sw-number-portion/sw-number-portion-2-ref.png)

Just opening this DOCX file in Writer, it looked like this:

![Old rendering in Writer](https://share.vmiklos.hu/blog/sw-number-portion/sw-number-portion-3-import.png)

Note how the first number portion turned into bold! This was expected after the above layout change
to consider full-paragraph formatted character ranges, but it also meant that Word can have one
set of character formatting for the entire character range of a paragraph, and another for the
paragraph marker.

To make the problem worse, this second document was showing that even the ODT export/export feature
had problems, still:

![Old rendering in Writer after ODT save + load](https://share.vmiklos.hu/blog/sw-number-portion/sw-number-portion-4-odf.png)

The fix to solve all of the above was to undo the previous render / DOCX export change, then teach
the ODT export to explicitly save the paragraph marker formatting (as an empty span at the end of
the text node) to ODT, and also to load it back.

This means that now Writer can render the second document correctly, without breaking the first
document:

![New rendering in Writer](https://share.vmiklos.hu/blog/sw-number-portion/sw-number-portion-5-good.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

<!-- s/\([^ ]\+\) \(.*\)/- [\2](https:\/\/git.libreoffice.org\/core\/commit\/\1)/g -->

- [sw, numbering portion format: consider full-para char formats as well](https://git.libreoffice.org/core/commit/e6907bc15cfa3c561d4aafbcc92eff291dc68cdd)
- [DOCX export, numbering portion format: consider full-para char formats as well](https://git.libreoffice.org/core/commit/dfba56830288b381eaaaf6b8f9454834301497db)
- [sw, numbering portion format: ignore char formats covering the entire paragraph](https://git.libreoffice.org/core/commit/585d440df98ff3b967c191908ac2d4b2f7e29326)
- [sw: ODT import/export of DOCX's paragraph marker formatting](https://git.libreoffice.org/core/commit/3998b98749739b2c499ffc4d83188e1034b66750)
- [sw: fix ODT import of paragraph marker formatting](https://git.libreoffice.org/core/commit/4634a27dd6f762168b3d7820326611b20b7d385c)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.5).
