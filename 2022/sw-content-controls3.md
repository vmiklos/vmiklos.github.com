Title: Content controls in Writer: the plain text type
Slug: sw-content-controls3
Category: libreoffice
Tags: en
Date: 2022-08-01T09:57:43+02:00

Writer now supports a 6th content control type: it is possible to insert a plain text content
control.

This work is primarily for [Collabora
Online](https://www.collaboraoffice.com/), done as a
[HackWeek]({filename}/2021/hackweek-2021.adoc) project, but the feature is
fully available in desktop Writer as well.

## Motivation

![Word-style plain text content control, user interface](https://share.vmiklos.hu/blog/sw-content-controls3/sw-content-control-plain-text.png)

Writer users can put a content control around a piece of rich text, see
[Content controls in Writer: dropdown, picture and date
types]({filename}/2022/sw-content-controls2.adoc) for the first five types.

The next step in this journey is plain text: even if one of the big advantages of content controls
over input fields is that they allow rich formatting, sometimes you want to restrict this. For
example, if one has to fill in their name, then it makes no sense to mark the family name as bold
while leaving the given name as non-bold. This would just lead to inconsistent look.

## Results so far

There is now a new Form → Content Controls → Insert Plain Text Content Control
menu item to create a plain text content control. If you try to make a
selection that is a subset of the text inside the content control and you try
to format it, the whole text in the content control is formatted to maintain
the invariant that plain text has no formatting itself, just the formatting of
the whole content control.

As usual, you can delete this content control later. You can also load/save it
to ODT/DOCX and it's preserved.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw content controls, plain text: add doc model & UNO API](https://gerrit.libreoffice.org/c/core/+/137263)
- [sw content controls, plain text: apply formatting to the entire contents](https://gerrit.libreoffice.org/c/core/+/137280)
- [sw content controls, plain text: add ODT filter](https://gerrit.libreoffice.org/c/core/+/137340)
- [sw: fix heap-use-after-free in SwTextNode::InsertHint()](https://gerrit.libreoffice.org/c/core/+/137349)
- [sw content controls, plain text: add DOCX export](https://gerrit.libreoffice.org/c/core/+/137398)
- [sw content controls, plain text: add DOCX import](https://gerrit.libreoffice.org/c/core/+/137399)
- [sw content controls, plain text: add insert UI](https://gerrit.libreoffice.org/c/core/+/137447)


## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.5).
