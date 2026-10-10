Title: Start of list level support in Writer paragraph styles
Slug: sw-parastyle-listlevel
Category: libreoffice
Tags: en
Date: 2021-09-29T16:29:56+02:00

Writer now has the start of list level support in Writer paragraph styles. This improves ODT and
DOCX compatibility, and it'll improve the style previews and the UI in the future.

First, thanks [Docmosis](https://www.docmosis.com/) who made this work by
[Collabora](https://www.collaboraoffice.com/) possible.

## Motivation

A paragraph might have an associated list in Writer and that list can have multiple levels. This is
direct formatting. When it comes to paragraph styles, referring to a list was already possible, but
defining a custom list level was not.

Loosing this information in Word documents was quite annoying, and it turned out that ODF also has
markup for this, just LibreOffice didn't implement it.

This work is currently done for the document model, scripting API and file filters: style previews &
UI still needs finishing.

## Results so far

Writer can at the moment preserve list level info from ODT and DOCX files. Here is how a file written
by Writer looks like in Word:

![Writer exporting a paragraph style with list level info](https://share.vmiklos.hu/blog/sw-parastyle-listlevel/parastyle-listlevel.png)

You can see that the style preview in Word takes the list level into account. Doing the same and
applying the list level as part of applying the paragraph style on the Writer UI is still future work.

Thanks to Justin Luth who did the follow-up work to adapt the DOC filter accordingly, and also doing
other related fixes.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

- [tdf#137363 DOCX filter: don't loose <w:ilvl w:val="..."> of paragraph styles](https://gerrit.libreoffice.org/c/core/+/121141) added document model, API and DOCX import/export support

- [Related: tdf#137363 ODT import: handle style:list-level="..." for para styles](https://gerrit.libreoffice.org/c/core/+/121515) added ODT import/export support

## Want to start using this?

Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's
[next release](http://dev-builds.libreoffice.org/daily/master/) (7.3).