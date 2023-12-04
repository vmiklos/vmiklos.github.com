Title: Multi-page floating tables in Writer: UI improvements
Slug: sw-floattable10
Category: libreoffice
Tags: en
Date: 2023-12-04T16:26:07+01:00

This post is part of a series to describe how Writer now gets a feature to handle tables that are
both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [9th post]({filename}/2023/sw-floattable9.md) for the previous part.

## Motivation

Previous posts described the hardest part of multi-page floating tables: reading them from
documents, so we layout and render them. In this part, you can read about UI improvements when it
comes to creating, updating and deleting them in Writer.

## Results so far

Regarding testing of the floating table feature in general, the core.git repository has 89 files now which are focusing on correct
handling of floating tables (filenames matching `floattable-|floating-table-`). This doesn't count
cases where the document model is built using C++ code in the memory and then we assert the result
of some operation.

Here are some screenshots from the improvements this month:

[![Improved insertion of floating tables](https://share.vmiklos.hu/blog/sw-floattable10/2023-11-13-floattable-lok-insert-ui.png)](https://share.vmiklos.hu/blog/sw-floattable10/2023-11-13-floattable-lok-insert-ui.png)

The first screenshot shows that the underlying LibreOffice Insert Frame dialog is now async
(compatible with collaborative editing) and is now exposed in the Collabora Online notebookbar.

There were other improvements as well, so in case you select a whole table and insert a new frame,
the result is close to what the DOCX import creates to floating tables. This includes a default
frame width that matches the table width, and also disabling frame borders, since the table can
already have one.

[![Unfloating a floating table](https://share.vmiklos.hu/blog/sw-floattable10/2023-11-21-floattable-lok-edit-delete-ui.png)](https://share.vmiklos.hu/blog/sw-floattable10/2023-11-21-floattable-lok-edit-delete-ui.png)

The next screenshot shows an inserted floating table, where the context menu allows updating the
properties of an already inserted floating table, and also allows to delete ("unfloat") it.

Several of these changes are shared improvements between LibreOffice and Collabora Online, so
everyone benefits. For example, inserting a frame when a whole table was selected also cleared the
undo stack, which is now fixed. Or unfloating table was only possible if some part of the table was
clipped, but now this is always possible to do.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable: make Insert Frame dialog async and mark it as a jsdialog](https://git.libreoffice.org/core/commit/35925357f86e01612df28a092d71b6e216195636)
- [tdf#99822 sw floattable: testcase for objects from different cells](https://git.libreoffice.org/core/commit/0bf60e32c0ac2bf79fad6c29c39c6f6a3f9ce8e8)
- [sw floattable, insert UI: fix default frame width when inserting a new one](https://git.libreoffice.org/core/commit/4f1121255ebac035a439d242b47c2f81124418c3)
- [sw floattable, insert UI: inherit fly width from selected table width](https://git.libreoffice.org/core/commit/0ecb69d53864b582eb59533729ada01d85d383e6)
- [sw floattable, insert UI: allow direct creation of floating tables](https://git.libreoffice.org/core/commit/e306352b9ddd8bddfc37f0cfaac078d9260650d6)
- [sw floattable, insert UI: default to at-char for non-split flys](https://git.libreoffice.org/core/commit/8d973c5b9405bfa6964d3dfebd0017fd60ec3eca)
- [sw floattable, insert UI: fix missing undo/redo](https://git.libreoffice.org/core/commit/6c761fa3b40d296444681d8d2f991e5a6b7e5b71)
- [sw floattable, insert UI: fix unexpected border and spacing](https://git.libreoffice.org/core/commit/c1a535ee2db757b2e40683dc918cbad8b7429cfa)
- [sw floattable: link ODF proposal](https://git.libreoffice.org/core/commit/bda066a77f4167bf83c0167afb6998c2890e60e0)
- [tdf#157911 sw floattable: fix inconsistent inferred bottom border on split](https://git.libreoffice.org/core/commit/47d824dd167eb34b08e5aec7141d2d9e6e996b34)
- [sw floattable, delete UI: fix unfloat button for cant-split frames](https://git.libreoffice.org/core/commit/2f42d8acd2d06f848c9e680c42a0f7834a9a641f)
- [sw floattable, delete UI: add an uno command to unfloat frame from context menu](https://git.libreoffice.org/core/commit/871ca5dd73b34086fad1e57d4697f43a6739a11d)
- [sw floattable, delete UI: fix undo/redo](https://git.libreoffice.org/core/commit/45a4ed02281a7a8ca52fccf626c792e417c8ef1c)
- [sw floattable: fix crash by trying harder to split tables](https://git.libreoffice.org/core/commit/223d2fac61e061478721a7a4a89b1362f5037d8f)
- [sw floattable: add per-frame wrap-on-all-pages mode](https://git.libreoffice.org/core/commit/b1b0cc1b0bb473155b5b089199ca99bb1dc40e42)
- [sw floattable, per-frame wrap-on-all-pages mode: add UNO API](https://git.libreoffice.org/core/commit/a596070f8ac11ed0cd22baf55704037a6b8d9c4d)
- [sw floattable, per-frame wrap-on-all-pages mode: add layout](https://git.libreoffice.org/core/commit/272c3548c4d2362eb737947c8cbb017e2d55aae1)
- [sw floattable, per-frame wrap-on-all-pages mode: add ODT filter](https://git.libreoffice.org/core/commit/7f58b57b47e6642cb9a7aeac48915b30148042d2)
- [tdf#158341 sw floattable: fix layout loop when fly is below the body frame](https://git.libreoffice.org/core/commit/ce2fc5eb29b4e252993b549dee002fa8948c8386)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.2).
