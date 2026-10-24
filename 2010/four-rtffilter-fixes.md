Title: Four RtfFilter fixes
Slug: four-rtffilter-fixes
Category: go-oo
Tags: en, hacking
Date: 2010-09-04T01:39:45Z

During the week I got some feedback from Oliver Specht on my GSoC work. I decided to dedicate a whole day to address those issues (these were all regressions compared to the old RTF exporter). Here are the results:

- Numbering indentations were problematic, this is now [fixed](http://hg.services.openoffice.org/cws/vmiklos01/rev/697e294cb900).
- Outline numbering was missing, [fixed](http://hg.services.openoffice.org/cws/vmiklos01/rev/9f6a7c44c7d8) as well.
- Explicit character style support was missing, I now [implemented](http://hg.services.openoffice.org/cws/vmiklos01/rev/d37003e71907) it.
- Finally (which was the most time-consuming), text frames were now exported, this is now [implemented](http://hg.services.openoffice.org/cws/vmiklos01/rev/b935ac15ff37), too.

One remaining question is that he mentioned something is problematic with the table of contents export, but I could not reproduce the bug so far.
