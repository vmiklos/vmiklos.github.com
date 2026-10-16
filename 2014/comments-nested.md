Title: LibreOffice Writer now supports nested comments in its DOC/RTF filters
Slug: comments-nested
Category: libreoffice
Tags: en
Date: 2014-02-28T08:15:46Z

[![Nested comments](https://lh3.googleusercontent.com/-FdnXBOBQWjc/UxA1LD0-fyI/AAAAAAAAEDk/2hYmN8ASkxA/s400/comments-nested.png)](https://lh3.googleusercontent.com/-FdnXBOBQWjc/UxA1LD0-fyI/AAAAAAAAEDk/2hYmN8ASkxA/s1024/comments-nested.png)

If you ever tried to use nested comments in Writer (make a selection, Insert
-> Comment, then make an overlapping selection, and do it again), you may have
noticed that only the ODF filter can load and save such a document properly.
Recently I have improved this situation a lot. Motivated by seeing this is now
supported in the DOCX import filter, I now added support for this also to the
DOCX export, RTF import/export and binary DOC import/export filters.

If you want to try this out, core.git has a
[ODT](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlexport/data/comments-nested.odt)
and
[DOC](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ww8export/data/comments-nested.doc)
samples to play with.
