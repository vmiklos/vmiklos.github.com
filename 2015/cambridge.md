Title: LibreOffice Cambridge Hackfest
Slug: cambridge
Category: libreoffice
Tags: en
Date: 2015-05-26T09:07:03Z

![Cambridge Hackfest](https://lh3.googleusercontent.com/-dGY38VD7z0M/VWNqvkXDLwI/AAAAAAAAFlE/8yurKsu0NcA/s400/)

The first ever UK LibreOffice Hackfest took place in the city of Cambridge on
May 21st to 23rd (Thursday -> Saturday), kindly hosted by
[Collabora](https://libreoffice-from-collabora.com/).

My starter idea was to fix
[tdf#90315](https://bugs.documentfoundation.org/show_bug.cgi?id=90315), i.e. to
support both nested tables and multiple columns with the proper spacing in
between them in the RTF import. For comparison, here is how this looked in
LibreOffice 3.4:

![Old rendering](https://lh3.googleusercontent.com/-KX9Z8y1ojYc/VWNzgg1gQeI/AAAAAAAAFlk/TRwfvnklEOI/s400/)

The table borders looked OK due to correct column spacing, but the nested
table is missing. Then here is the LibreOffice 4.4 state:

![New rendering, first try](https://lh3.googleusercontent.com/-wz4OZdsYf5I/VWNzgu5OhUI/AAAAAAAAFlg/CG37pRlGggY/s400/)

Nested table is OK, but the table borders are strange due to incorrect column
spacing. Finally here is how it looks like now, when the import result is
correct:

![New rendering, final](https://lh3.googleusercontent.com/-Zul_8xTSOkA/VWNzguGZf-I/AAAAAAAAFlY/L88WkfCpL1E/s400/)

Other than this, here is a list of other topics I hacked on:

- [clang
  libtooling-based compiler tools](https://gerrit.libreoffice.org/gitweb?p=dev-tools.git;a=commit;h=9107601036fc9af9e67b37f0fc26296dddfd6eb1) (so far an example analizer and a rewriter)
- some
  [gtktiledviewer](https://gerrit.libreoffice.org/gitweb?p=core.git;a=tree;f=libreofficekit;hb=HEAD)
  tweaks like handling of the "Search key not found" or the "Page count changed"
  callback event
- [o3tl::make_unique](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=821b72886f1e407a492f881a2efb27ead2c22b5c),
  till we can't use C++ 14 std::make_unique

After fixing two more less interesting regressions, now it seems we're down to
0 for the
[regressions
having RTF in their summary](https://bugs.documentfoundation.org/buglist.cgi?keywords=regression&keywords_type=allwords&product=LibreOffice&query_format=advanced&resolution=---&short_desc=RTF&short_desc_type=allwordssubstr), which is promising. :-)

I few
[pictures](https://www.flickr.com/photos/vmiklos/albums/72157673531303691)
I took while punting and a
[panorama](/panoramas/cambridge.html) is available, too.
