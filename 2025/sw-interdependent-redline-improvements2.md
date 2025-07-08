Title: Interdependent tracked changes improvements in Writer, part 2
Slug: sw-interdependent-redline-improvements2
Category: libreoffice
Tags: en
Date: 2025-07-08T08:43:10+02:00

Writer has some support for interdependent (or hierarchical) tracked changes: e.g. the case when you
have a delete on top of an insert. See the [first
post]({filename}/2025/sw-interdependent-redline-improvements.md) for background.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

With the already mentioned improvements in place, a few areas were still lacking: we didn't have UI
for all cases where the DOCX import was possible already; combining tracked changes (redlines) were
not complete (so you don't have to reject all parts of a logical redline one by one) and some of the
undo/redo code didn't work as expected.

## Results so far

Here is a sample case where the UI was missing to create something that was possible to import from
DOCX: a format redline on top of an insert redline.

If you had a document with an insert:

[![Interdependent tracked change: just insert](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/1-baseline.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/1-baseline.png)

And you selected BBB to mark those characters as bold, we just updated the existing insert redline
to be bold:

[![Interdependent tracked change: old, format is not tracked separately](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/2-edit-old.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/2-edit-old.png)

But now we track a format change on top of the insert separately:

[![Interdependent tracked change: new, format is tracked separately](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/3-edit-new.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/3-edit-new.png)

This is also visible if you open the track changes dialog, which explains that now you have part of
the insert redline covered by a format redline:

[![Interdependent tracked change: UI dialog now showing multiple redlines ](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/4-dialog.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements2/4-dialog.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [sw interdependent redlines: fix nPamEndtNI -> nPamEndNI typo](https://git.libreoffice.org/core/commit/cc2babfa0a960c7d52ea7997aea19dcf10c12d08)
- [tdf#166319 sw interdependent redlines: combine on reject of del-then-fmt's fmt](https://git.libreoffice.org/core/commit/82b24dd9748c6c0a2990e70bda0960ae26415390)
- [tdf#166319 sw interdependent redlines: fix undo of reject of ins-then-del's del](https://git.libreoffice.org/core/commit/612ba7b2bc5d1d12c10287094263f6d31983a3d8)
- [tdf#166319 sw interdependent redlines: add UI to create format inside insert](https://git.libreoffice.org/core/commit/eef0dfed817e40cd83e8ba8e290f45c224257f97)
- [tdf#166319 sw interdependent redlines: undo of creating an ins-then-fmt redline](https://git.libreoffice.org/core/commit/0566e8e1776921ecb26f0ddd0546ec10afeed8e0)
- [tdf#166319 sw interdependent redlines: redo of creating an ins-then-fmt redline](https://git.libreoffice.org/core/commit/e06eb6b4a6176692d25c758121012473fe638043)
- [tdf#166319 sw interdependent redlines: fix redo of reject of del-then-fmt's del](https://git.libreoffice.org/core/commit/5ed41ca44bee5122a9db4aa946f6e3ecd9432574)
- [tdf#166319 sw interdependent redlines: fix bad accept undo action for reject](https://git.libreoffice.org/core/commit/76c2168a276f0996deeac08ce176525821fb056e)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.8).
