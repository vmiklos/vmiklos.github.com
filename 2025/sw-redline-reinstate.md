Title: Reinstate for tracked changes in Writer
Slug: sw-redline-reinstate
Category: libreoffice
Tags: en
Date: 2025-05-08T08:44:48+02:00

Writer has the concept of rejecting tracked changes: if a proposed insertion or deletion is not
wanted, then one can reject it to push back on the proposal. So far such an action left no trace in
the document, which is sometimes not wanted. Calling reinstate on a change behaves like reject, but
with history: it reinstates the original state, with the rejected change preserved in the document.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

When Alice works on a document to insert e.g. new conditions for a contract, then perhaps Bob is not
happy with the proposal. But just rejecting the change "silently" would not be polite: the tracked
change then disappears, so possibly Alice thinks it was accepted and Bob didn't communicate the
pushback explicitly in the resulting document, either.

Reinstate is meant to improve this interaction: if an insert is reinstated, then an explicit delete
is created on top of the insert, so Alice can see that Bob was not happy with the proposal. Or in
case Alice proposed a delete, Bob can reinstate that by adding the same content again to the
document, without typing the text manually after the delete.

This is a UI feature: the resulting model still only contains inserts and deletes, so it works even with
DOCX files.

## Results so far

Given an insert:

[![Reinstate: an insert](https://share.vmiklos.hu/blog/sw-redline-reinstate/insert.png)](https://share.vmiklos.hu/blog/sw-redline-reinstate/insert.png)

Now you can easily create a delete on top of the insert:

[![Reinstate: a reinstated insert](https://share.vmiklos.hu/blog/sw-redline-reinstate/insert-after.png)](https://share.vmiklos.hu/blog/sw-redline-reinstate/insert-after.png)

And given a delete:

[![Reinstate: a delete](https://share.vmiklos.hu/blog/sw-redline-reinstate/delete.png)](https://share.vmiklos.hu/blog/sw-redline-reinstate/delete.png)

Now you can easily create an insert right after the delete, preserving complex content:

[![Reinstate: a reinstated delete](https://share.vmiklos.hu/blog/sw-redline-reinstate/delete-after.png)](https://share.vmiklos.hu/blog/sw-redline-reinstate/delete-after.png)

As you can see, this creates the opposite of the original change as a new tracked change, so it will
in the end still reject the change, but without deleting the original change.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [cool#11357 sw redline reinstate: implement this for a single insert](https://git.libreoffice.org/core/commit/7af8b3d3305fe8344cb9339269c5dc3f1cd44650)
- [cool#11357 sw redline reinstate: handle inserts in selection](https://git.libreoffice.org/core/commit/1df71464588d4cfcba708cf00ef7b6ac94574c8f)
- [cool#11357 sw redline reinstate: handle a single delete](https://git.libreoffice.org/core/commit/e312cf46fe840f04b729600db9efe89d5f58d6fe)
- [cool#11357 sw redline reinstate: handle a single rich delete](https://git.libreoffice.org/core/commit/db541619cb1ca83598ec479eb9f52e559a8fe72d)
- [cool#11357 sw redline reinstate: handle deletes in selection](https://git.libreoffice.org/core/commit/157c00922959adc8fd2e0203ed94dfd847479c54)
- [cool#11357 sw redline reinstate: simplify ReinstateRedlinesInSelection()](https://git.libreoffice.org/core/commit/447935fba57f1b0f88c0b56cccf5bf971fb1e819)
- [cool#11357 sw redline reinstate: add command state](https://git.libreoffice.org/core/commit/9c2c98ac7668e4a3a2e3a70cc54b632de5f79621)
- [cool#11357 sw redline reinstate: add a reinstate-and-next command](https://git.libreoffice.org/core/commit/1926105b47df7b15dd34a8c1135f83b936bf9926)
- [cool#11357 sw redline reinstate: add a reinstate-all command](https://git.libreoffice.org/core/commit/4535698e0b16bf003e8a3705e28f7347f509eb12)
- [cool#11357 sw redline reinstate: avoid unwanted multi- or table selection](https://git.libreoffice.org/core/commit/01311bb1e4c2404354cce8934d36991d91d527b2)
- [cool#11357 sw redline reinstate: fix undo string for a single redline](https://git.libreoffice.org/core/commit/fbf9465e2bc9f878723674d1eff13e0c69656057)
- [cool#11357 sw redline reinstate: fix undo count & string for multiple redlines](https://git.libreoffice.org/core/commit/7d702ebbfcda41ce2972e30b2a1e493c320df67c)
- [cool#11357 sw redline reinstate: add to the context menu for text](https://git.libreoffice.org/core/commit/dcd3427149c33852428b4198c22f6f858125c294)

Online side:

- [cool#11357 sw redline reinstate: add UI for this](https://github.com/collaboraonline/online/commit/3d7933974241fe5d015a9d80f2cc8bde1c1d352e)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.8).
