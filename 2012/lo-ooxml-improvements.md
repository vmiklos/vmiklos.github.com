Title: LibreOffice OOXML improvements in Writer
Slug: lo-ooxml-improvements
Category: libreoffice
Tags: en
Date: 2012-11-16T11:36:23Z

It's possible you noticed that in each LibreOffice release notes, we have a
line saying something like "improved DOCX support", but is rarely explained in
detail. I'm posting here a few screenshots to correct this. The first series is
a list of import fixes which are already available in our shipping 3.6 release.
In each case I provide a test document, and a screenshot how it looked like
with LibreOffice 3.3 and how it looks like with LibreOffice 3.6 today. Click on
the images to get a larger image:

- document with a checked checkbox ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/checkbox.docx)):

[![checkbox-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/checkbox-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/checkbox-lo33.png)

[![checkbox-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/checkbox-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/checkbox-lo36.png)

- document with contextual spacing enabled for the numbering ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/contextual-spacing.docx)):

[![contextual-spacing-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/contextual-spacing-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/contextual-spacing-lo33.png)

[![contextual-spacing-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/contextual-spacing-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/contextual-spacing-lo36.png)

- document with a field that has a custom font size ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/field-fsize.docx)):

[![field-fsize-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/field-fsize-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/field-fsize-lo33.png)

[![field-fsize-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/field-fsize-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/field-fsize-lo36.png)

- document with a SmartArt inside ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/smartart.docx)):

[![smartart-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/smartart-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/smartart-lo33.png)

[![smartart-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/smartart-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/smartart-lo36.png)

- document with lots of VML shapes ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/vml.docx)):

[![vml-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/vml-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/vml-lo33.png)

[![vml-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/vml-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/vml-lo36.png)

- document produced by Microsoft Office 2010 ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/mso-2010.docx), thanks Fridrich!):

[![mso-2010-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/mso-2010-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/mso-2010-lo33.png)

[![mso-2010-lo36](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/mso-2010-lo36.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/3.6/mso-2010-lo36.png)

Now let's also have a look at some OOXML features which will be imported
correctly in our upcoming 4.0 release:

- document with commented text ranges ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/comment-textrange.docx)):

[![comment-textrange-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/comment-textrange-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/comment-textrange-lo33.png)

[![comment-textrange-lo4](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/comment-textrange-lo4.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/comment-textrange-lo4.png)

- document with a floating table ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/floating-table.docx)):

[![floating-table-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/floating-table-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/floating-table-lo33.png)

[![floating-table-lo4](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/floating-table-lo4.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/floating-table-lo4.png)

- document with ink annotations ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ink.docx), thanks Eilidh!):

[![ink-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ink-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ink-lo33.png)

[![ink-lo4](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ink-lo4.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ink-lo4.png)

- document with an OLE object inside a rectangle ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ole-in-rectangle.docx)):

[![ole-in-rectangle-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ole-in-rectangle-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ole-in-rectangle-lo33.png)

[![ole-in-rectangle-lo4](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ole-in-rectangle-lo4.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/ole-in-rectangle-lo4.png)

- document with an inline image with custom margins ([test doc](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/wp-inline-margins.docx)):

[![wp-inline-margins-lo33](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/wp-inline-margins-lo33.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/wp-inline-margins-lo33.png)

[![wp-inline-margins-lo4](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/wp-inline-margins-lo4.t.png)](http://people.freedesktop.org/~vmiklos/2012/docx-demo/4.0/wp-inline-margins-lo4.png)

If you want to try these out yourself, get a
[daily build](http://dev-builds.libreoffice.org/daily/) and play with it! :) If
something goes wrong, report it to us in the
[Bugzilla](https://www.libreoffice.org/get-help/bug/), so we can try fix it
before 4.0 is released. And remember, there are lots more improvements
[coming](http://wiki.documentfoundation.org/ReleaseNotes/4.0) in LibreOffice 4.0,
stay tuned!
