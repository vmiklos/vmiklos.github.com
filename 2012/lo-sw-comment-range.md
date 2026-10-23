Title: LibreOffice Writer can now attach comments to text ranges
Slug: lo-sw-comment-range
Category: libreoffice
Tags: en
Date: 2012-08-10T10:08:49Z

More than 10 years ago, a [bug](https://issues.apache.org/ooo/show_bug.cgi?id=5487) was
opened in the OpenOffice.org bugzilla to support this feature. Later this got
[imported](https://bugs.freedesktop.org/show_bug.cgi?id=38244) to LibreOffice's
bugtracker. Now that LibreOffice 3.6 is out, time to talk more about what
features will show up in 3.7, and this will be one of them:

[![Comment-text-range](https://wiki.documentfoundation.org/images/thumb/5/5e/Comment-text-range.png/400px-Comment-text-range.png)](https://wiki.documentfoundation.org/File:Comment-text-range.png)

Now that it's there, let's have a look at the details:

- ODF 1.2 already
  [supports](http://docs.oasis-open.org/office/v1.2/cs01/OpenDocument-v1.2-cs01-part1.html#__RefHeading__1416196_253892949)
  commenting text ranges, but LibreOffice support was missing.
- Word already supported it as well, and now LibreOffice RTF/DOCX import/export filters are updated to take care of the new feature.
- If I was already messing with comments, I also implemented roundtrip of
  [comment author initials](http://msdn.microsoft.com/en-us/library/documentformat.openxml.wordprocessing.comment.initials) to ODF (see
  [proposal](https://tools.oasis-open.org/issues/browse/OFFICE-3776)), so now if
  you open a DOCX/RTF file in LibreOffice, save it as ODF, and later save it back
  to DOCX/RTF, this information won't be lost.

Finally, one known limitation is that the text range currently can't include
multiple paragraphs -- something to improve later if necessary.
