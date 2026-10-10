Title: Calc buttons with macros: better XLSX support
Slug: sc-xlsx-button-macro
Category: libreoffice
Tags: en
Date: 2021-07-22T10:55:43+02:00

Embedding macros to Calc documents and invoking them by clicking on buttons is a common use-case.
There was also decent support for importing these from XLSX (XLSM to be precise), but the export
side was not on par with the binary XLS export.

Calc now got a series of incremental improvements to map our form controls (buttons in particular)
to OOXML's form controls, especially when macros are assigned to such buttons.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Calc as well.

## Motivation

Excel has both [form controls and ActiveX
controls](https://support.microsoft.com/en-us/office/assign-a-macro-to-a-form-or-a-control-button-d58edd7d-cb04-4964-bead-9c72c843a283),
and [tdf#106181 XLSX export: output form controls](https://gerrit.libreoffice.org/c/core/+/94161)
last year started adding support for form control export to XLSX.

Hoping that this will be mostly shared drawingML export code fixing (benefiting DOCX and PPTX as
well), it seemed reasonable to assume that we can improve button handling from the "it's lost" state
to "it's good enough" with some effort.

## Results so far

Now Excel shows the button and you can click on it:

![Excel consuming our XLSM output with a button and a macro](https://share.vmiklos.hu/blog/sc-xlsx-button-macro/new.png)

While it used to just refuse our export result:

![Excel refusing bad XLSM output](https://share.vmiklos.hu/blog/sc-xlsx-button-macro/old.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the end goal was reached via a set of incremental commits:

- [sc: don't require ctrl-click when clicking on internal links of shapes](https://gerrit.libreoffice.org/c/core/+/118085) was a UX problem, users don't finding Ctrl-click

- [XLSX export: improve handling of checkbox (form controls)](https://gerrit.libreoffice.org/c/core/+/118168) was an improvement to the existing checkbox export code, probably today's Excel is just more strict in what it accepts

- [XLSX export: handle button form controls](https://gerrit.libreoffice.org/c/core/+/118219) adds the initial button support

- [XLSX import: fix handling of named ranges referring to PathMissing sheets](https://gerrit.libreoffice.org/c/core/+/118401) fixes an import problem around named ranges and external references

- [XLSX export: handle macros on button form controls](https://gerrit.libreoffice.org/c/core/+/118485) adds the macro bits of buttons

- [XSLX export, button form control: fix handling of no macros](https://gerrit.libreoffice.org/c/core/+/118600) is a fixup for non-macro buttons

## Want to start using this?

Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's
[next release](http://dev-builds.libreoffice.org/daily/master/) (7.3).