Title: A LibreOffice Draw GEDCOM import filter
Slug: libreoffice-draw-gedcom-import-filter
Category: libreoffice
Tags: en
Date: 2013-12-28T22:27:05Z

[![GEDCOM import result](https://lh4.googleusercontent.com/-4110I0vkRE4/Ur8-uJ6YcII/AAAAAAAAD44/u1pNo4z1y-M/s400/screenshot.png)](https://lh4.googleusercontent.com/-4110I0vkRE4/Ur8-uJ6YcII/AAAAAAAAD44/u1pNo4z1y-M/s1440/screenshot.png)

You may remember that I wrote about my little
[ged2dot project]({filename}/2013/ged2dot.md) about two months ago.
It's a Python script that can be used from commandline with quite some
options. I'm happy to announce that there is a GUI for it now, in the form of
a LibreOffice Draw import filter. If you open
[this GEDCOM
file](https://github.com/vmiklos/ged2dot/blob/master/test/screenshot.ged), you'll see something similar to the above image.  You can simply build
the `.oxt` from the [Git repo](https://github.com/vmiklos/ged2dot), or just get
it from the
[LibreOffice
Extensions site](http://extensions.libreoffice.org/extension-center/gedcom).

Technical details for the interested readers: the import filter just glues
together existing pieces. First it runs `ged2dot`, then `dot` to generate an
SVG. To keep things simple, then the filter "inlineizes" all the included
images, finally the already existing SVG import filter does the real work. I
find it elegant that each step works from and to the memory, and not ugly
temporary files. :-) It works on Linux and Windows, feedback on if it works on
Mac is appreciated.

Also, if you ask why this is an extension, not part of LibreOffice core: I
guess most users are not interested in building family trees; also being
someone who works on the core most of the time, I wanted to try out how
implementing an import filter as an extension (filter detection, import
options dialog, etc.) works. ;-)
