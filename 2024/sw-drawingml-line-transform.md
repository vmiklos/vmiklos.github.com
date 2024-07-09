Title: Fixing handling of line object transformations in the DOCX import of Writer
Slug: sw-drawingml-line-transform
Category: libreoffice
Tags: en
Date: 2024-07-09T14:46:01+02:00

Writer now has improved support for toplevel line shapes when you import those from DOCX.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Writer as well.

## Motivation

As described in a [post from 2014]({filename}/2014/lo-writer-drawingml-shape-improvements.adoc),
Writer reads the drawingML markup for shapes in DOCX files, including line shapes. While
investigating a simple-looking problem around a horizontal vs vertical line, it turns out that there
is a deeper issue here, and it looks like now have proper fix for this bug.

## Results so far

Imagine that your company template has a nice footer in two columns, and the content in the columns
are separated by a vertical line shape, but when you open your DOCX in Writer, it crosses the text
of that footer instead:

[![Bugdoc, before: reference is red, Writer result is painted on top of it](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/diff-old.png)](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/diff-old.png)

While researching how line shapes are represented in our document model and how ODT import works, it
turned out that the proper way to create a line shape is to only consider size / scaling when it
comes to the individual points of the line, everything else (e.g. position / translation) should go
to the transform matrix of the shape, then the render result will be as expected:

[![Bugdoc, after: reference is red, Writer result is painted on top of it](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/diff-new.png)](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/diff-new.png)

It was also interesting to see that this also improved other, existing test documents, e.g. core.git
`sw/qa/extras/ooxmlimport/data/line-rotation.docx` looked like this before:

[![3 rotated lines, before: reference is red, Writer result is painted on top of it](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/line-rotation-diff-old.png)](https://share.vmiklos.hu/blog/line-rotation-diff-old.png)

And the same fix makes it perfect:

[![3 rotated lines, after: reference is red, Writer result is painted on top of it](https://share.vmiklos.hu/blog/sw-drawingml-line-transform/line-rotation-diff-new.png)](https://share.vmiklos.hu/blog/line-rotation-diff-new.png)

Just stick to the rule: scaling goes to the points -- translation, rotation and horizontal shear
goes to the shape.

For now, this is only there for toplevel Writer lines, but in-groupshape and Calc/Impress lines
could also follow this technique if there is a practical need.

The "after" screenshots show ~no red, which means there is ~no reference output, where the Writer
output would be missing.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

The bugfix commit was [tdf#161779 DOCX import, drawingML: fix handling of translation for
lines](https://git.libreoffice.org/core/commit/6c09c85ec384e88c89bff0817e7fe9889d7ed68e).

The tracking bug was [tdf#161779](https://bugs.documentfoundation.org/show_bug.cgi?id=161779).

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraoffice.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (24.8).
