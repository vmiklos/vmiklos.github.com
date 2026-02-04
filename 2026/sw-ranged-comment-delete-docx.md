Title: Improving deleted commented text ranges in Writer's DOCX filter
Slug: sw-ranged-comment-delete-docx
Category: libreoffice
Tags: en
Date: 2026-02-04T08:42:44+01:00

If you have a commented text range, which gets deleted while track changes is on and you later save
and load this with Writer's DOCX filter, that works now correctly.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

It was already possible to comment on text ranges. Comments were also supported inside deletes when
track changes is enabled. These could be already exported to and imported from DOCX in Writer. But
you could not combine these.

With the increasing popularity of commenting text ranges (rather than just inserting a comment with
an anchor), not being able to combine these was annoying.

## Results so far

Here is how a commented text range inside a delete from DOCX now looks like, note the
semi-transparent comment hinting it's deleted:

[![Commented text range, inside a tracked delete, in DOCX, Collabora Online](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/cool-good.png)](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/cool-good.png)

As a side effect, this also fixes the behavior in desktop Writer, which crosses out deleted
comments:

[![Commented text range, inside a tracked delete, in DOCX, desktop](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/desktop-good.png)](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/desktop-good.png)

In the past, the "is this deleted" property was not visible in the render result:

[![Commented text range, inside a tracked delete, in DOCX, Collabora Online, old bad state](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/cool-bad.png)](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/cool-bad.png)

And it was also bad in desktop Writer:

[![Commented text range, inside a tracked delete, in DOCX, desktop, old bad state](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/desktop-bad.png)](https://share.vmiklos.hu/blog/sw-ranged-comment-delete-docx/desktop-bad.png)

This required changes to both DOCX import and export: a comment could be deleted or could have an
anchor which is a text range, but you couldn't have both.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [cool#13988 DOCX import: fix missing delete flag on deleted comments with ranges](https://git.libreoffice.org/core/commit/5d101c9919c7c0798df092bd31b828d0a144abba)
- [cool#13988 DOCX export: fix missing delete flag on deleted comments with ranges](https://git.libreoffice.org/core/commit/a72506da82d2e0334e23a8c3c1cd07282fdd7ca3)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (26.8).
