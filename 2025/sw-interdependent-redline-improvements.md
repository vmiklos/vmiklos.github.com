Title: Interdependent tracked changes improvements in Writer
Slug: sw-interdependent-redline-improvements
Category: libreoffice
Tags: en
Date: 2025-06-02T13:54:44+02:00

Writer has some support for interdependent (or hierarchical) tracked changes: e.g. the case when you
have a delete on top of an insert. While there were some working cases, handling of many
combinations were missing. I started to make systematic improvements in this area in the recent
past, this post gives you an overview what's done so far.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

DOCX files in Word can often have overlapping tracked changes: Writer tries to split these up to
make sure there is only one tracked change under the cursor at the same time. Still, it's possible
that you have a tracked change with multiple types: e.g. a delete on top of an insert.

The focus in on 3 combinations which appear in DOCX files a lot: "insert, then delete", "insert,
then format" and "delete, then format".

This mostly affects the UI and import/export filters of ODT and DOCX.

## Results so far

Given an insert, then delete:

[![Interdependent tracked change: insert, then delete](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/ins-then-del.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/ins-then-del.png)

Most operations worked nicely here, but in case your cursor was in the middle of AAA and you did a
reject, followed by an undo, proper handling of that was missing, now implemented.

But then given an insert, then a format:

[![Interdependent tracked change: insert, then format](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/ins-then-fmt.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/ins-then-fmt.png)

Then a handling of more actions were missing:

1. DOCX import is now implemented.
2. ODT import is now implemented.
3. Accepting when you're inside AAA is now implemented: the insert is accepted for BBB but the
   format stays unchanged.
4. Rejecting when you're inside AAA is now implemented: the insert is rejected and BBB is also
   removed, together with the format on top of it.
5. Accepting the BBB now correctly operates on the insert type, so the format type remains after
   accept.
6. If you accept BBB, now the surrounding AAA and CCC also get accepted as well, as expected.
7. Now if you reject BBB, then it gets removed from the document, since you rejected an insert.
8. When you reject BBB, the surrounding AAA and CCC also get rejected.

The combined implementation of these should give you a smooth feeling in case you're used to how
Word works: if there is a format redline combined with an insert, then the operations act on the
insert type, and format is only accepted/rejected when there is no insert "under" the format.

Similarly: it's a bit of an implementation detail that Writer splits redlines on DOCX import: so if
you e.g. accept AAA then we combine that with BBB and CCC when it makes sense, so you need to click
a lot less.

Finally, given a delete, then a format:

[![Interdependent tracked change: delete, then format](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/del-then-fmt.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements/del-then-fmt.png)

Then again handling of some actions were missing:

1. DOCX import is now implemented.
2. ODT import is now implemented.
3. ODT export is now implemented.
4. Accepting AAA now correctly operates on the delete type of BBB.
5. Rejecting AAA now correctly operates on the delete type of BBB.
6. Accepting BBB now correctly works with the delete type.
7. Accepting BBB now correctly tries to also accept AAA and CCC, too.

The current state is not yet complete, but it's a big improvement over what we had in the past,
which was mostly focusing on just "insert, then delete".

You may wonder what about some other cases: if you insert some content with change tracking, that
always creates a new tracked change, so "insert" is never on top of something else. Similarly,
format is always on top of something. Finally the same type is never on top of itself.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [tdf#166319 sw interdependent redlines: fix undo of del on top of ins](https://git.libreoffice.org/core/commit/096a40b27d07603880bbf120440ac169a87fe115)
- [tdf#166319 sw interdependent redlines: handle format on top of insert](https://git.libreoffice.org/core/commit/ca7a6a57ad1e8d7aadffbbf3fe28d9aabed31286)
- [tdf#166319 sw interdependent redlines: handle accept of insert under format](https://git.libreoffice.org/core/commit/8e85d559a68f980d99af4ded6a91b7f0458048b9)
- [tdf#166319 sw interdependent redlines: handle reject of insert under format](https://git.libreoffice.org/core/commit/3c039cb31239ba01e3d3b56c526bdb7ba6446032)
- [tdf#166319 sw interdependent redlines: handle accept of delete under format](https://git.libreoffice.org/core/commit/96faaaf83a1c8b897ce675d175b4d8756d0ea0df)
- [tdf#166319 sw interdependent redlines: fix DOCX export of delete under format](https://git.libreoffice.org/core/commit/97066d4f5a89ad89d81a45c0b20ce404f9712fc7)
- [tdf#166319 sw interdependent redlines: handle reject of delete under format](https://git.libreoffice.org/core/commit/d659f4b12a24e275e38ec5aa7406c32c9fa08c48)
- [tdf#166319 sw interdependent redlines: handle ODF import of insert under format](https://git.libreoffice.org/core/commit/ff110bb17b7e003bd205438af94badabeca007c6)
- [tdf#166319 sw interdependent redlines: handle ODF export of delete under format](https://git.libreoffice.org/core/commit/1a340196237ed075b337e6a0ac9f8a45132053bb)
- [tdf#166319 sw interdependent redlines: handle ODF import of delete under format](https://git.libreoffice.org/core/commit/08acfb815745e7f43ca43557feefcb68607d26c1)
- [tdf#166319 sw interdependent redlines: handle accept of ins-then-fmt's fmt](https://git.libreoffice.org/core/commit/8cabdef0b34210d026ea7a8229f321e272a49109)
- [tdf#166319 sw interdependent redlines: combine on accept of ins-then-fmt's fmt](https://git.libreoffice.org/core/commit/2292bda37378d7f782abbda42c026affd3fa59e5)
- [tdf#166319 sw interdependent redlines: handle reject of ins-then-fmt's fmt](https://git.libreoffice.org/core/commit/b6cba0119f8028b426f5eee55be9761971dbfdee)
- [tdf#166319 sw interdependent redlines: combine on reject of ins-then-fmt's fmt](https://git.libreoffice.org/core/commit/15bd73a093f1f944d504cf555918ca9e60d75c03)
- [tdf#166319 sw interdependent redlines: handle accept of del-then-fmt's fmt](https://git.libreoffice.org/core/commit/5fedce78c8d79a3e86307523c3d74c7df98668f7)
- [tdf#166319 sw interdependent redlines: combine on accept of del-then-fmt's fmt](https://git.libreoffice.org/core/commit/98f0b23a48246507ced6de5b54d327d95f1725f9)
- [tdf#166319 sw interdependent redlines: handle reject of del-then-fmt's fmt](https://git.libreoffice.org/core/commit/569eb476bbdf83aab0f377da5cb7d2e8c77192b8)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.8).
