Title: Positions in RTF font tables
Slug: rtf-font-table
Category: gsoc2011
Tags: en, libreoffice
Date: 2011-08-26T02:22:31Z

Tonight I worked on
[fdo#39337](https://bugs.freedesktop.org/show_bug.cgi?id=39337), and while
the writerfilter-based RTF import filter almost handled the document in
question correctly, the fonts were not correct.

It turned out that this was caused by the fact that RTF's font table (a
table where each row has an ID and it contains the font name, charset
and other properties) does not require continuous ID's (for example
positions 0, 2, 3 are allowed, even if 1 is not set), but dmapper (the
glue layer between the RTF tokenizer and the Writer UNO API) does.

I already sent the position of the entry to dmapper, but the position
turned out to be
[ignored](http://opengrok.libreoffice.org/xref/core/writerfilter/source/dmapper/FontTable.cxx#157),
so now I fixed the RTF tokenizer to send continuous ID's.

A related improvement is that I just discovered the
`writerfilter::TagLogger::unoPropertySet()` method, which can dump the
properties of an UNO object, and now I've
[enabled](http://cgit.freedesktop.org/libreoffice/core/commit/?id=120003152826b7450bbf384a9633c83dda4782c7)
dumping of shape properties, which can help a lot when something goes
wrong there.
