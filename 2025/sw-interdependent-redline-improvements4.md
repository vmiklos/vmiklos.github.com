Title: Interdependent tracked changes improvements in Writer, part 4: direct accept/reject
Slug: sw-interdependent-redline-improvements4
Category: libreoffice
Tags: en
Date: 2025-11-04T08:11:48+01:00

Writer has some support for interdependent (or hierarchical) tracked changes: e.g. the case when you
have a delete on top of an insert. See the [third
post]({filename}/2025/sw-interdependent-redline-improvements3.md) for background.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

Interdependent changes mean that the UI shows one type of change on top of an other change, e.g.
formatting on top of insert. Writer knows the priority of each type, so in case you have an insert
or delete change and on top of that you have a formatting, then the UI will look "through" the
formatting and work on the underlying insert or delete when you navigate with your cursor to a
position with multiple changes and you press Accept on the Review tab of the notebookbar.

Usually this is what you mean, but what if you want to work on the formatting at the top, directly?
You can now open the Manage Changes dialog using the Manage button on the Review tab of the
notebookbar and if you go to the formatting change row of the dialog, then pressing Accept there
will accept the formatting change, not the insert or delete change. This is possible, because the dialog
gives you a way to precisely select which tracked change you want to work with, even if a specific
cursor position has multiple tracked changes.

## Results so far

Here is a sample `ins-then-format.docx` document from the core.git testcases, the baseline has an
insertion, and part of that is covered by an additional formatting change on top:

[![Interdependent tracked change: baseline](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/baseline.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/baseline.png)

If you just go in the middle of the document and press Accept, that will work with the more
important insert change, so the result looks like this:

[![Interdependent tracked change: default accept result](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/default-accept-result.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/default-accept-result.png)

But now you can also open the Manage Changes dialog, to be more specific by directly selecting the
formatting change:

[![Interdependent tracked change: direct accept via the dialog](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/direct-accept.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/direct-accept.png)

And when you accept the formatting change directly, the result will be just the insert change:

[![Interdependent tracked change: direct accept result](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/direct-accept-result.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements4/direct-accept-result.png)

You can save and load the results in both DOCX and ODT, as usual.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [tdf#166319 sw interdependent redlines: allow accept/reject for fmt on ins/del](https://git.libreoffice.org/core/commit/55640f9f0a4741f8e4b5b98096af822cee71da2c)
- [tdf#166319 sw interdependent redlines: fix redo of accept for fmt on ins/del](https://git.libreoffice.org/core/commit/d04ab0febcf660e87d19574adc08f9f2af75509f)
- [tdf#166319 sw interdependent redlines: fix redo of direct reject for format](https://git.libreoffice.org/core/commit/1e3b8177aef8cc3a242cd9fd41d492f2fd89d21e)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (26.2).
