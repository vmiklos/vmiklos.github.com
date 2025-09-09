Title: Interdependent tracked changes improvements in Writer, part 3
Slug: sw-interdependent-redline-improvements3
Category: libreoffice
Tags: en
Date: 2025-09-09T08:23:48+02:00

Writer has some support for interdependent (or hierarchical) tracked changes: e.g. the case when you
have a delete on top of an insert. See the [second
post]({filename}/2025/sw-interdependent-redline-improvements2.md) for background.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

With the already mentioned improvements in place, the area of format redlines with character style
or direct formatting changes were still lacking: Writer's original model here was just marking a
text range as "formatted" and then either accept the format redline as-is, or reject reverting back
to the paragraph style (default formatting), losing the old character style or old direct
formatting.

## Results so far

Here is a sample case of a document where the old character style is Strong (~bold) and the font
size is 24pt, while the new character style is Quote (~italic) and the font size is 36pt. The rest
of the document uses no specific character styles and has the font size of 12pt:

[![Interdependent tracked change: improved format, after document load](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/1-baseline.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/1-baseline.png)

Rejecting that format redline resulted in just the defaults, i.e. no character style and 12pt font
size:

[![Interdependent tracked change: old reject, lost character style / direct format](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/2-edit-old.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/2-edit-old.png)

But now we track the old character style & direct format:

[![Interdependent tracked change: new reject, handled character style / direct format](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/3-edit-new.png)](https://share.vmiklos.hu/blog/sw-interdependent-redline-improvements3/3-edit-new.png)

This required changes in the DOCX import, ODF import and ODF export, too.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [sw: document DocumentRedlineManager](https://git.libreoffice.org/core/commit/7aa34659e2b49bf02a95a17f51e78f3ab9683235)
- [sw: document IDocumentRedlineAccess](https://git.libreoffice.org/core/commit/da3da0635a30f9b61a913bd7553b5e1278bf260e)
- [sw doc model xml dump: show the item set of a format redline](https://git.libreoffice.org/core/commit/b2919d5b5ee4e057c99219f5541efc388b2d19b7)
- [tdf#166319 sw interdependent redlines: fix redo of accept of ins-then-fmt's fmt](https://git.libreoffice.org/core/commit/d7bf3a17cb27da1a58163e9db657f0a8d8344901)
- [tdf#166319 sw interdependent redlines: handle deleting a self ins-then-fmt](https://git.libreoffice.org/core/commit/f66d63da05dbe2f254ffaf428257684a38523f66)
- [tdf#166319 sw interdependent redlines: fix redo of reject of del-then-fmt's fmt](https://git.libreoffice.org/core/commit/1ba53f5ebbd57b7baf72240784d18954688a09b9)
- [tdf#167194 sw redline reinstate: fix handling of self-inserts](https://git.libreoffice.org/core/commit/e545ada3501780ee6552bbfa19954794e0440d46)
- [tdf#167761 sw format redline: register the item set in the autostyle pool](https://git.libreoffice.org/core/commit/2db0a779944f9496371b3ba68f7494c635ad431d)
- [tdf#167761 sw format redline: implement ODF export](https://git.libreoffice.org/core/commit/b78bdc9eb15fedd22ece76aeb1b43df40caf3b82)
- [tdf#167761 sw format redline, char props: implement ODF import](https://git.libreoffice.org/core/commit/0e21f3b36cbd12787021c3b8ef439aab9a09efdd)
- [tdf#167761 sw format redline, char style: implement DOCX import](https://git.libreoffice.org/core/commit/a6d8608595fd1ecfdff35c2003a28589ea1214ad)
- [tdf#167761 sw format redline, char style: implement ODF import](https://git.libreoffice.org/core/commit/0ba6dd9eb3f342345663b12527a29425675d2078)
- [tdf#167761 sw format redline, char style: fix missing encode in ODF filter](https://git.libreoffice.org/core/commit/43104ad996bc9b292b66d9e605632407cb59c4c6)
- [tdf#167761 sw format redline, char style+direct: add ODT export](https://git.libreoffice.org/core/commit/c625247680cd5737723154b9a73c45e786611b44)
- [tdf#167761 sw format redline, char style+direct: add ODT import](https://git.libreoffice.org/core/commit/bbebb3908ff9a9c384a475737ead537906517387)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (26.2).
