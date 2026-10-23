Title: LibreOffice can now import/export native RTF math expressions in Writer
Slug: lo-rtf-math-native
Category: libreoffice
Tags: en
Date: 2012-08-01T11:38:24Z

You may remember that LibreOffice 3.5 learned to
[import
RTF OLE objects](http://wiki.documentfoundation.org/ReleaseNotes/3.5#Filters) (including math expressions) in Writer. In LibreOffice 3.7, the same is now true for math expressions expressed using [native RTF math markup](http://blogs.msdn.com/b/murrays/archive/2006/10/25/mathematical-rtf.aspx):

[![Rtf-math-native](https://wiki.documentfoundation.org/images/thumb/1/1e/Rtf-math-native.png/400px-Rtf-math-native.png)](https://wiki.documentfoundation.org/File:Rtf-math-native.png)

If you are interested in the details, then the nice thing about this
implementation is that:

- The importer internally turns RTF markup to OOXML tokens, and that does the hard job.
- The non-XML-specific part of the existing OOXML export was abstracted to a
  base class, and that's the driver of the RTF exporter.

So if you like this new feature, don't forget to thank Luboš Luňák, who is the
author of the OOXML math import/export. :-) In case you way to play with this
feature, test documents are
[available](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/rtfexport/data).
