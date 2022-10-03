Title: Content controls in Writer: PDF export and combo box type
Slug: sw-content-controls4
Category: libreoffice
Tags: en
Date: 2022-10-03T08:25:28+02:00

Writer now supports exporting content controls to PDF and a 7th content control type: it is possible
to differentiate between drop-downs and combo boxes.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), see [the previous
post]({filename}/2022/sw-content-controls3.md) for background.

## Motivation

![PDF export of Writer content controls into PDF](https://share.vmiklos.hu/blog/sw-content-controls4/adobe-writer.png)

Writer users can create fillable forms using content controls, but the PDF export only contained the
plain text representation of them. PDF can also have fillable widgets for form filling, so it's
logical to map content controls to PDF widgets.

A perfect mapping is not possible, since PDF widgets are always a single rectangle and Writer
content controls is a list of rectangles (text portions), but this doesn't cause a problem in most
cases. The size of the PDF rectangle is determined based on the placeholder's size from Writer.

Benefits includes not having to insert a control shape, manually positioned to look like it's in
line with the surrounding text. An other benefit is that this way the widget's style (font name,
size, etc) can be specified using Writer styles, not with shape properties. It's also interesting
that Word itself doesn't seem to support content controls in its PDF export at the time of writing.

## Results so far

PDF export now automatically turns Writer content controls into fillable widgets for the rich text,
plain text, checkbox, drop-down, combo box and date types.

Combo box itself is a new type: now combo box content can be either free-form or one of its list
items, while drop-down can only be one of its list items.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw content controls, rich text: add initial PDF export](https://git.libreoffice.org/core/commit/82d90529dc2b3cb8359dec78852cbd910a66d275)
- [sw content controls, checkbox: add PDF export](https://git.libreoffice.org/core/commit/9bad5be0ffdcdee92d40162b598ed2ab2815e5d5)
- [sw content controls, dropdown: add PDF export](https://git.libreoffice.org/core/commit/6b2433f3b66c1f118dabcd40924122deb2d4f204)
- [sw content controls, date: add PDF export](https://git.libreoffice.org/core/commit/f7408cf0e472be91bdb7a4d2a4b8da3eb9a049a9)
- [sw content controls: add PDF export of font properties](https://git.libreoffice.org/core/commit/493b10997053882d06803156a98ae8924bf7660d)
- [sw content controls: fix getString() and setString() on SwXContentControl](https://git.libreoffice.org/core/commit/08bce8eeb2e18c7cea4108dbfc2519ada56e8b61)
- [sw content controls, plain text: enable DOCX filter with data binding](https://git.libreoffice.org/core/commit/de90c192cb8f1f03a4028493d8bfe9a127a76b2a)
- [sw content controls: add a11y description for PDF export](https://git.libreoffice.org/core/commit/addfb3cce0f7ce8fbd0b169d467b6956ed95dbb5)
- [sw content controls, combo box: add doc model & UNO API](https://git.libreoffice.org/core/commit/276f3a3ce52ca422bf5ebccfa2c926d3e87d5eab)
- [sw content controls, combo box: make the dropdown case read-only](https://git.libreoffice.org/core/commit/37656a47d8797d45d706a17ab8843dcb8db90bbc)
- [sw content controls, combo box: add ODT filter](https://git.libreoffice.org/core/commit/21d93d8d2ffd9c5d5cfe9064590b35e0727295c9)
- [sw content controls, combo box: add DOCX filter](https://git.libreoffice.org/core/commit/01b1f57a90172a76faa1489b3b72250ee76169a6)
- [sw content controls, combo box: add insert UI](https://git.libreoffice.org/core/commit/49f1bf56ebfa3c96aa90835c1121eb827d713b9d)
- [sw content controls, combo box: add PDF export](https://git.libreoffice.org/core/commit/82b9ff35649cd67ca16296676d2ad1e4eff15493)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.5).
