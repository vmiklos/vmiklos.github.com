Title: Editeng RTF export: fixing a lost paragraph style
Slug: editeng-rtf-export-lost-para-style
Category: libreoffice
Tags: en
Date: 2024-12-04T11:34:30+01:00

Impress shape text doesn't have much support for styles, e.g. the default UI in Writer gives you a
paragraph style dropdown, and you don't get the same in Impress. Still, a paragraph style is
attached to bullets based on their outline level, and Impress has a View → Outline menu item to give
you that styled text you can copy. Pasting that to Writer started to lose styles recently and it's
now fixed to work again.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Impress as well.

## Motivation

As described in a [previous
commit](https://git.libreoffice.org/core/commit/70d1bd6ee0eba9d6661cd6280566f77a87f2d068), I had a
case where lots of not needed paragraph styles were exported to RTF in case an Impress document had
enough master pages. The idea was to only export actually used paragraph styles, to avoid wasting
CPU power.

Turns out filtering out paragraph styles has to happen at two locations:

- in the style table to assign an index to a paragraph style
- when referring to those styles

The problem was that unused styles were removed from the style table, but not from the style → index
mapping, so as soon as you had both used and unused paragraph styles, the declared and the referred
style indexes didn't match anymore.

## Results so far

Here is a sample paste result in Writer, where you can see that the text doesn't have a custom
paragraph style:

[![Bugdoc: old Writer paste](https://share.vmiklos.hu/blog/editeng-rtf-export-lost-para-style/old.png)](https://share.vmiklos.hu/blog/editeng-rtf-export-lost-para-style/old.png)

And here is the same paste, now with paragraph styles restored:

[![Bugdoc: new Writer paste](https://share.vmiklos.hu/blog/editeng-rtf-export-lost-para-style/new.png)](https://share.vmiklos.hu/blog/editeng-rtf-export-lost-para-style/new.png)

As you can see, now the pasted text has paragraph styles.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

The bugfix commit was [editeng RTF export: fix broken offsets into the para style table](https://git.libreoffice.org/core/commit/c8b607b7c0096c58dc5187262bf0133dee728d50).

The tracking bug was [tdf#163883](https://bugs.documentfoundation.org/show_bug.cgi?id=163883).

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.2).
