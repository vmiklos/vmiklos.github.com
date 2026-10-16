Title: Improved handling of track changes in groupshape text
Slug: groupshape-changetracking
Category: libreoffice
Tags: en
Date: 2014-06-08T14:47:42Z

Shapes in Writer are provided by LibreOffice's drawing layer -- they are
independent from the normal Writer paragraphs. Given that the drawing layer
does not support tracking changes, just Writer's "native" paragraphs, fully
featured tracked changes in real shape text would be quite some work. In case
of ODF, the markup describes tracked changes in a way, so that in case the
reader does not support tracking changes, it can at least read the normal and
inserted text, i.e. the current version.

This is exactly what I
[implemented](http://cgit.freedesktop.org/libreoffice/core/commit/?id=e6300f83d08fd959596551dcd660eb0fbfb248a6)
in the DOCX import filter now:

[![New render](https://lh5.googleusercontent.com/-8q4PA4ru1KE/U5RZB7SxKdI/AAAAAAAAETs/6_avZ3q04T0/s400/)](https://lh5.googleusercontent.com/-8q4PA4ru1KE/U5RZB7SxKdI/AAAAAAAAETs/6_avZ3q04T0/s0/)

Previously we just ignored both inserted and deleted text, so if you had
content which was all either deleted or inserted, you ended up having no shape
text at all (can be tested using e.g.
[this
test document](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/groupshape-trackedchanges.docx)):

[![Old render](https://lh4.googleusercontent.com/-NQOH4joafZA/U5RZBjGVO5I/AAAAAAAAETo/3WGNKc3j80c/s400/)](https://lh4.googleusercontent.com/-NQOH4joafZA/U5RZBjGVO5I/AAAAAAAAETo/3WGNKc3j80c/s0/)

To be fair, the reference layout looks like this:

[![Reference render](https://lh6.googleusercontent.com/-hyCX0lGuEck/U5RZBn27CbI/AAAAAAAAET0/91WKFnyEhQ0/s400/)](https://lh6.googleusercontent.com/-hyCX0lGuEck/U5RZBn27CbI/AAAAAAAAET0/91WKFnyEhQ0/s0/)

I still hope to fix that as well one day, but the above fix is something we'll already provide in 4.3. :-)
