Title: MathType import in the RTF and DOCX filter
Slug: mathtype-import
Category: libreoffice
Tags: en
Date: 2015-05-03T21:15:59Z

TL;DR: Import of old-style (pre-2010 for RTF, pre-2007 for DOCX) math
equations embedded into text documents should be now imported as editable
embedded math objects.

Longer version: if you want to embed math equations into RTF or DOCX files,
you have two choices. The older approach is to embed a MathType OLE object
into the file, the newer one is a native OOXML markup, which has an RTF markup
equivalent as well. Handling of the later has been implemented by
[Luboš Luňák](http://llunak.blogspot.com/) for DOCX a long time ago, and I
contributed the RTF equivalent almost
[3 years ago]({filename}/2012/lo-rtf-math-native.md).

What remains is the handling of the older version, the embedded OLE object.
Previously only the replacement graphic was imported, so regardless of the
Tools -> Options -> Load / Save -> Microsoft Office -> MathType to Math
checkbox, the result was never editable.

Here is how it looks like now:

![Editing MathType in Writer](https://lh3.googleusercontent.com/-V3SqO3Rz88s/VUZvFcBNMPI/AAAAAAAAFb4/QARDYqQVQGY/s0/)

Given that the RTF and the DOCX importers share lots of code in the
`writerfilter/` module, I implemented the same for the DOCX import at the same
time, too. The interesting challenge was that writerfilter wants an
[XFilter](http://api.libreoffice.org/docs/idl/ref/interfacecom_1_1sun_1_1star_1_1document_1_1XFilter.html)
implementation for the embedded object if it is to be handled internally by
LibreOffice, but the MathType filter (originally created to handle math
objects inside binary DOC files) didn't have one. Once I implemented such a
[filter
wrapper](http://cgit.freedesktop.org/libreoffice/core/commit/?id=add60d233f70ff56472448bd50b3771f38974c52), the
[rest](http://cgit.freedesktop.org/libreoffice/core/commit/?id=2a3e8b470edf2fe76188f9ccf6b0f32dfc817ea4)
wasn't too hard.

Here are
[test](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/rtfimport/data/mathtype.rtf)
[documents](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/mathtype.docx)
if you want to try it yourself. You'll need a 5.0
[daily build](http://dev-builds.libreoffice.org/daily/master/) for that, though.
;-)

If I'm at describing features new in LibreOffice Writer 5.0 file filters, here are a few more:

- [Automatic hyphenation at a document
  level](http://cgit.freedesktop.org/libreoffice/core/commit/?id=830abf307aab9f9611db60b5c734fbafd3b3d8a3) and [exceptions to it](http://cgit.freedesktop.org/libreoffice/core/commit/?id=a3ec386c2283a196f8d9f1edd0ff97c38ddb281a) is now
  imported in RTF. I also adjusted the
  [exporter](http://cgit.freedesktop.org/libreoffice/core/commit/?id=a2fea109e6454b10e8e85148b93bdca89066fe8d), so now Word sort of
  understands our hyphenation rules, replacing the OOo-specific custom
  hyphenation RTF extension that Word just ignored.
- [picture wrap distance properties](http://cgit.freedesktop.org/libreoffice/core/commit/?id=7546a904265cc0d0a0e3795cdb411cbb945a39fe)
  are now handled in the RTF importer -- previously that was only handled for
  shapes.

And a number of bugfixes for the RTF filter:

- [tdf#86182](https://bugs.documentfoundation.org/show_bug.cgi?id=86182) better RTL paragraph handling
- [tdf#80708](https://bugs.documentfoundation.org/show_bug.cgi?id=80708) related to the improved old-style Writer table export handling work
- [tdf#90421](https://bugs.documentfoundation.org/show_bug.cgi?id=90421) hyperlink export tweak

Do these sound interesting? Look at what others did for LibreOffice 5.0 on
[the TDF wiki](https://wiki.documentfoundation.org/ReleaseNotes/5.0), even if
it's far from complete, as the 5.0 branch is not yet created. :-)
