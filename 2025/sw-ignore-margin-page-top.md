Title: Ignoring the paragraph margin at the top of pages in Writer
Slug: sw-ignore-margin-page-top
Category: libreoffice
Tags: en
Date: 2025-01-07T15:01:40+01:00

Writer has the concept of paragraph margins and page margins, but what happens when you combine the
two? It turns out the expectation is that sometimes the top paragraph margin is ignored in this
case. We'll see two cases where the behavior of Writer is now improved to better match Word in this
regard.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

As described in a [previous bugreport](https://bugs.documentfoundation.org/show_bug.cgi?id=160952),
there was a first problem where Word ignored the top paragraph margin of a document, but Writer did
not. A [recent bugreport](https://bugs.documentfoundation.org/show_bug.cgi?id=164095) then pointed
out that the first implementation went too far and now a wanted top margin was ignored. This lead to
a set of conditions which now does a decent emulation of Word's rules in this regard.

## Results so far

Here is the old Writer render result for a document where the top margin should be ignored:

[![Bugdoc: old Writer render](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/old.png)](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/old.png)

And here is the new Writer render result for a document where the top margin is ignored:

[![Bugdoc: new Writer render](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/new.png)](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/new.png)

Finally, the reference render result, showing the ignored top paragraph margin:

[![Bugdoc: reference render](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/ref.png)](https://share.vmiklos.hu/blog/sw-ignore-margin-page-top/ref.png)

As you can see, now the unwanted top paragraph margin is omitted at page top.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#160952 sw: ignore top margin of para on non-first pages with newer DOCX](https://git.libreoffice.org/core/commit/abd90828cf101581a07b9d1c371a8c3156521e9f)
- [tdf#164095 sw: fix missing top margin on paragraph after changing page style](https://git.libreoffice.org/core/commit/ae7900dd42a65aaf60df6b21b9ad511496b209d9)

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.2).
