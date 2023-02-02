Title: Citation handling: plumbing in Writer for e.g. Zotero
Slug: sw-zotero-plumbing
Category: libreoffice
Tags: en
Date: 2023-01-31T16:39:26+01:00
Status: draft

Writer now had a set of new automation commands and APIs that allow clients to build user interface
for citation handling that's more advanced than the default in-Writer bibliography support.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), see [the CODE
release notes](https://www.collaboraoffice.com/code-22-05-release-notes/) for one possible way to
use this.

## Motivation

![Citations and bibliography in Writer, using fieldmarks](https://share.vmiklos.hu/blog/sw-zotero-plumbing/zotero.png)

Users frequently using scientific citations are probably familiar with the limits of Writer's
built-in bibliography support, and solutions like [Zotero](https://www.zotero.org/) appeared (with a
LibreOffice extension included) to improve that situation.

This means that instead of storing all your scientific notes and date locally, you can store them on
a Zotero server, then work with that from anywhere, once you provide your credentials.

The trouble comes when you want to combine this with collaborative editing, which is provided by
Online, but you can't use the extension made for the desktop.

The above CODE release notes explains how an end user can use this feature, this post is meant to
document what new UNO commands and LOK APIs I added that serve as a backend for this. Especially the
UNO commands are also useful in other contexts, like in macros or other extensions.

## Results so far

Zotero can store citations using 3 markups in documents: fields (DOCX only), bookmarks (DOCX and
ODT) and finally reference marks / sections (ODT only). The added plumbing allows several operations
for all 3 cases, to work with existing documents using any of these markups.

The citation and the bibliography is handled the same way for fields (Writer's fieldmarks) and
bookmarks. The last case uses reference marks for citations, but sections for the bibliography.

The following operations are supported:

- create the citation / bibliography

- read the object under the cursor

- read all objects of a given type in the document

- update the object under the cursor

- update all objects of a given type in the document

- delete all objects of a given type in the document

Reading is only available to LOK clients, you need to call the
[getCommandValues()](https://github.com/libreoffice/core/blob/1e92059fe95cc1ba31aab4a66926d55bc00d0684/include/LibreOfficeKit/LibreOfficeKit.hxx#L483-L492)
API. The rest is normal [UNO
commands](https://wiki.documentfoundation.org/Development/DispatchCommands) that you can invoke from
document macros or extensions as well.

The added plumbing is the following:

| Operation  | Fieldmark                               | Bookmark                           | Refmark                         | Section                           |
| ---------- | --------------------------------------- | ---                                | ---                             | ---                               |
| Create     | .uno:TextFormField                      | .uno:InsertBookmark                | .uno:InsertField                | .uno:InsertSection                |
| Read       | getCommandValues(".uno:TextFormField")  | getCommandValues(".uno:Bookmark")  | getCommandValues(".uno:Field")  | None                              |
| Read all   | getCommandValues(".uno:TextFormFields") | getCommandValues(".uno:Bookmarks") | getCommandValues(".uno:Fields") | getCommandValues(".uno:Sections") |
| Update     | .uno:UpdateTextFormField                | .uno:UpdateBookmark                | .uno:UpdateField                | None                              |
| Update all | .uno:TextFormFields                     | .uno:UpdateBookmarks               | .uno:UpdateFields               | .uno:UpdateSections               |
| Delete all | .uno:DeleteTextFormFields               | .uno:DeleteBookmarks               | .uno:DeleteFields               | .uno:DeleteSections               |

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw: add new FieldType parameter for the .uno:TextFormField command](https://git.libreoffice.org/core/commit/1ff360c29c99a570bfe59c69d8f589d4f2b59135)
- [sw: add new FieldCode parameter for the .uno:TextFormField command](https://git.libreoffice.org/core/commit/6870c0c3385bf5d19e9c80bf973fca255ae38c08)
- [sw, .uno:TextFormField command: accept HTML in the FieldResult parameter](https://git.libreoffice.org/core/commit/1c2ef850db29beb369dcc89a58fc73416ecd9c5c)
- [sw lok, .uno:TextFormFields: expose field code of fieldmarks](https://git.libreoffice.org/core/commit/24219cc1e9829f82a533667aef0f51b6a7df6fc2)
- [comphelper: support property values arrays in JsonToPropertyValues()](https://git.libreoffice.org/core/commit/1e83197fdd4263ca4817a6ac16f274aaee3e66fd)
- [sw: add a new .uno:TextFormFields UNO command](https://git.libreoffice.org/core/commit/7765b442e13048f857fd7ee49ced1731caee297e)
- [sw: hide TextFormFields from the customization dialog like](https://git.libreoffice.org/core/commit/12f434277bc424f01597be83020a569c84bbee5a)
- [sw lok, .uno:SetDocumentProperties: expose value of custom document properties](https://git.libreoffice.org/core/commit/5e8f6dcb8ce00d2d5e35b3cf5654187b3068276c)
- [libreofficekit: add a way to invoke getCommandValues()](https://git.libreoffice.org/core/commit/2c149dc9983317bce9116649270c3513adc35514)
- [sfx2: extend .uno:SetDocumentProperties to update custom doc props](https://git.libreoffice.org/core/commit/afb362c60a18243621834dcf2b30672be6eed76f)
- [sw, .uno:InsertBookmark: add a new BookmarkText parameter and accept HTML there](https://git.libreoffice.org/core/commit/fa82e151d80d15eeb6dfae434f1dbb3b68907188)
- [sw: split out some of the LOK parts of SwXTextDocument into a separate file](https://git.libreoffice.org/core/commit/c2bcbd36d1913dc1d5ca4bb64fa30740f17bf326)
- [sw, lok: implement a getCommandValues(Bookmarks)](https://git.libreoffice.org/core/commit/e0bf2712aa9e240748534e3a7498d41c8eeeb9d7)
- [sw: add a new .uno:UpdateBookmarks UNO command](https://git.libreoffice.org/core/commit/724180ec495a696c79332653cb6fb52ecfbccc29)
- [sw, field insert: handle the Content param for refmarks and accept HTML there](https://git.libreoffice.org/core/commit/16075474819696f920979969474aa8300f4af530)
- [sw UI: fix crash on inserting a fieldmark inside a fieldmark](https://git.libreoffice.org/core/commit/a178a2ac6df8dc63a7ab8d4a19b90ae8a17baca4)
- [sw, lok: implement a getCommandValues(Fields)](https://git.libreoffice.org/core/commit/3585d0414ffe08890856e5c09f453b9f566323df)
- [sw, UpdateFields: add new TypeName, NamePrefix and Fields parameters](https://git.libreoffice.org/core/commit/babba472391d26aed68d7ac31c7a918c08e65256)
- [sw lok: expose field type & command of fieldmark under cursor](https://git.libreoffice.org/core/commit/bb20dee2ef1b0804065e1cda2c834d257fdd90ed)
- [sw update of refmarks: fix handling of ignored refmarks](https://git.libreoffice.org/core/commit/471804e251b4e15b37a10920bd4b88b40f97b227)
- [sw: UpdateFieldContents: fix typos](https://git.libreoffice.org/core/commit/f83c1353b94fc7dec79d05ac45c11f40f497261d)
- [sw: add a new .uno:UpdateTextFormField UNO command](https://git.libreoffice.org/core/commit/337416dafb66ed8f930d2d69e83fae438fc85f3c)
- [sw lok: get all refmarks: sort the refmarks array](https://git.libreoffice.org/core/commit/5a2ee5ba893b6b8f4e7fd6623b7f10faf0bda509)
- [sw, .uno:InsertSection: add a new Content parameter and accept HTML there](https://git.libreoffice.org/core/commit/dd775cd630c907bc7d8bcd6f57ffd3f66115a5ba)
- [sw: document FN\_UPDATE\_TEXT\_FORMFIELD and FN\_UPDATE\_TEXT\_FORMFIELDS](https://git.libreoffice.org/core/commit/8336c61ba059551cb74df5ec53d2b45a3cf41814)
- [sw, lok: implement a getCommandValues(Sections)](https://git.libreoffice.org/core/commit/2ddd41b420cea7f1b988f0b8acbca564b2811382)
- [vcl ITiledRenderable: rename supportsCommandValues() to supportsCommand()](https://git.libreoffice.org/core/commit/913b399a73c4d6dfd2c9f5983f56f612f3262fa7)
- [sw, UpdateBookmarks: support renaming bookmarks](https://git.libreoffice.org/core/commit/d2318503d559c3797965da777627e4ee45143043)
- [sw: add a new .uno:UpdateSections command](https://git.libreoffice.org/core/commit/71a479afb7e9762de930361e6089e23ab8d4af74)
- [sw: add a new .uno:DeleteTextFormFields UNO command](https://git.libreoffice.org/core/commit/c68d06dfa1498f862923eaddf3e5d247650a53d5)
- [sw: fix FN\_UPDATE\_TEXT\_FORMFIELD typo](https://git.libreoffice.org/core/commit/30f6793baa5529b0594407cd0caaf3a3cde3289c)
- [sw lok: expose name of bookmark under cursor](https://git.libreoffice.org/core/commit/4bcb66ec7b417fbe113267f2615e78fe47eb55ca)
- [sw: add a new .uno:UpdateBookmark UNO command](https://git.libreoffice.org/core/commit/ea208f6004770eb4b81d28e6930cd0c7bd5d8f12)
- [sw, UpdateSections: remove not needed StateMethod](https://git.libreoffice.org/core/commit/200e2a3c28bdeec785ac389473f5fca6576071a0)
- [sw lok: expose name of refmark under cursor](https://git.libreoffice.org/core/commit/81f690ec0cb2a6dc0d6ca0f6de3adcc07eb7bc12)
- [sw, FN\_DELETE\_TEXT\_FORMFIELDS: allow deleting all fieldmarks](https://git.libreoffice.org/core/commit/60be9811555b935d6860157ebf26fac6b48327ac)
- [sw: rename getBookmarkFor() to getInnerBookmarkFor()](https://git.libreoffice.org/core/commit/04d50fa627faabb9211bd9fa9eb134599fb01982)
- [sw: add a new .uno:UpdateField UNO command](https://git.libreoffice.org/core/commit/402ab3d145a1e8e123caabf4567aef7b6631fc3c)
- [sw: add a new .uno:DeleteBookmarks UNO command](https://git.libreoffice.org/core/commit/40753de837b9776dd8b33e830be0cceef83f024a)
- [sw: add a new .uno:DeleteFields UNO command](https://git.libreoffice.org/core/commit/1d6593dd799ff4eb931ffbb5338e4856fb87f77f)
- [sw, UpdateBookmark: address some minor performance nits](https://git.libreoffice.org/core/commit/2cf59dee9637dcb741806ce61e50b6be427dd7b8)
- [sw, UpdateFieldContent: address a minor performance nit](https://git.libreoffice.org/core/commit/0250d6c643f2866c4de7e3c943248ffda9205d05)
- [sw: disable AutoUpdate for many new recent field/book/refmark UNO commands](https://git.libreoffice.org/core/commit/f41d42491528905594b9a36a3bf16998f309c702)
- [sw: .uno:TextFormField: add new Wrapper parameter](https://git.libreoffice.org/core/commit/ceea8f3924f26d5f10adc41b9ea587c77c2fda74)
- [sw: .uno:TextFormField: handle Endnote as a value for the Wrapper parameter](https://git.libreoffice.org/core/commit/43d80906c8693ca27c5b3077fbaa259df4004924)
- [sw: rename getBookmarkFor() further to getOneInnermostBookmarkFor()](https://git.libreoffice.org/core/commit/91c0e64c2f4d67c6a1073a73b1e467a3b28f0e85)
- [sw, .uno:InsertField: add a new Wrapper parameter](https://git.libreoffice.org/core/commit/e9d5ccd5a0822969412dbddf0191e28703e72e82)
- [sw, .uno:InsertField: handle Endnote as a value for the Wrapper parameter](https://git.libreoffice.org/core/commit/04d988d3c368fe07ae3c44c536a4513e424f104e)
- [sw: add a new .uno:DeleteSections UNO command](https://git.libreoffice.org/core/commit/a5a1ea2f7d784c5c6c33f332ba61aceb7af3eca4)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).
