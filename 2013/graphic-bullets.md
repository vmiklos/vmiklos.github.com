Title: LibreOffice Writer now supports graphic bullets in its DOCX/RTF filters
Slug: graphic-bullets
Category: libreoffice
Tags: en
Date: 2013-04-07T20:46:36Z

[![ooxml-graphic-bullet](https://lh5.googleusercontent.com/-fhN5_7nf5A8/UWG83Z5qLqI/AAAAAAAAChY/cehOqHVomas/s400/ooxml-graphic-bullet.png)](https://lh5.googleusercontent.com/-fhN5_7nf5A8/UWG83Z5qLqI/AAAAAAAAChY/cehOqHVomas/s628/ooxml-graphic-bullet.png)

If you ever tried to use graphical bullets in Writer (Format -> Bullets and
Numbering -> Graphics), you may have noticed that only the ODF filter can load
and save such a numbering. This is now improved a lot. Motivated by seeing this
is now handled in the binary DOC filter, I now added support for this also to
the DOCX and RTF import and export filters. If you want to play with this
feature, core.git also contains a
[DOCX](http://cgit.freedesktop.org/libreoffice/core/plain/sw/qa/extras/ooxmlexport/data/i120928.docx)
and an
[RTF](http://cgit.freedesktop.org/libreoffice/core/plain/sw/qa/extras/rtfexport/data/i120928.rtf)
sample as well.
