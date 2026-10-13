Title: Mail merge embedding
Slug: mail-merge-embedding
Category: libreoffice
Tags: en
Date: 2015-07-28T09:34:09Z

If you ever used the
[mail merge wizard](https://help.libreoffice.org/Writer/Mail_Merge_Wizard) with
a Calc data source, then you know how it worked in the past: you've got 3
files: the .odt mail template, the .ods data source and a .odb data source
definition that defines how to access the .ods.

The target of this [LHM-funded project](http://www.muenchen.de/) was to get rid
of the .odb file and just embed it into the .odt mail template. Why?

Here is the problem description from a user's point of view: "When a mail
merge document is being saved a separate database file is being automatically
created. It links the Writer file to the spreadsheet (ODS, XLS, XLSX etc.) as
data source. This additional 2kB ODB file confuses users, they might delete it
without knowing to break the connection to the data source." An additional
problem is that because the non-embedded data source definition is part of the
user profile, you can't just move the three files to an other machine, as .odb
registration will be missing there.

If you are interested how this looks like, here is a demo (click on the image
to see the video):

[![Calc data source selected directly in Writer mail merge](https://lh3.googleusercontent.com/-XDcWgOWKr2k/Vbc4blHURTI/AAAAAAAAF4E/VXFBglt-YmU/s800-Ic42/)](https://youtu.be/5iQFZBOz8rM)

That's it for now -- as usual the commits are in master, so you can try this
right now with a 5.1 [daily
build](http://dev-builds.libreoffice.org/daily/master/). :-)
