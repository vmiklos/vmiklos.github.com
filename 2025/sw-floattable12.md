Title: Multi-page floating tables in Writer: keep together or not
Slug: sw-floattable12
Category: libreoffice
Tags: en
Date: 2025-08-15T08:14:19+02:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [11th post]({filename}/2024/sw-floattable11.md) for the previous part.

## Motivation

Previous posts described the hardest part of multi-page floating tables: making sure that text can
wrap around them and they can split across pages. In this part, we'll look at a conflicting
requirement. On one hand, headings want their text to not split across pages (and shapes anchored
into paragraphs are considered part of the paragraph, too). On the other hand, it should be OK to
have a floating table at the bottom of a page and the following heading to go to the next page.

It turns out, Writer gave "keep together" a priority, while Word gave "floating tables are OK to
split to a previous page" a priority.

Note that if you have a shape (e.g. a triangle) and not a floating table, then both Word and Writer
prevents the move of that shape to a previous page (if the shape is anchored in a heading); this
difference was there just for floating tables.

## Results so far

Here is how the [tdf#167222](https://bugs.documentfoundation.org/show_bug.cgi?id=167222) bugdoc
looks like now in Writer:

[![Floating table, followed by heading: new Writer render](https://share.vmiklos.hu/blog/sw-floattable12/new.png)](https://share.vmiklos.hu/blog/sw-floattable12/new.png)

And here is how it used to look like:

[![Floating table, followed by heading: old Writer render](https://share.vmiklos.hu/blog/sw-floattable12/old.png)](https://share.vmiklos.hu/blog/sw-floattable12/old.png)

And here is the reference rendering:

[![Floating table, followed by heading: reference render](https://share.vmiklos.hu/blog/sw-floattable12/ref.png)](https://share.vmiklos.hu/blog/sw-floattable12/ref.png)

This means that we leave layout for shapes unchanged in general: shapes anchored in headings are
still considered to be part of headings and don't split. But for floating tables, we now allow them
to split and use space at a previous page if they fit there.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#167222 sw floattable: allow split of fly and its keep-together anchor text](https://git.libreoffice.org/core/commit/77f0dc4347b8802c56121ca1c5ef59209970214a)
- [Related: tdf#167222 sw floattable: fix split of fly and its 'keep' anchor text](https://git.libreoffice.org/core/commit/44c0872bf5f1b658b126d8d928c795e74c0e8ecd)
- [Related: tdf#167222 sw floattable: fix split of fly and its heading text w/ ftn](https://git.libreoffice.org/core/commit/e1522e2b1985f6ebdbf442bdbd55cbc5f2b85dd6)
- [sw: fix assertion failure in SwFrameShell::Execute()](https://git.libreoffice.org/core/commit/a5154c0de7679e2abc78b33b351025ea5e54a479)
- [Related: tdf#167222 sw floattable: fix split of fly and heading text fit check](https://git.libreoffice.org/core/commit/e03da71738c72bbaecb824b4ba356a0a9923a0ff)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (26.2).
