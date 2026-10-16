Title: Improved support for text frames with relative sizes in LibreOffice Writer
Slug: improved-relative-sized-textframes-in-libreoffice
Category: libreoffice
Tags: en
Date: 2014-04-02T20:13:29Z

[![The new UI](https://lh6.googleusercontent.com/-YDWSLjQcV1U/UzxP5AJhnyI/AAAAAAAAEIo/8uurEY7s90k/s400/)](https://lh6.googleusercontent.com/-YDWSLjQcV1U/UzxP5AJhnyI/AAAAAAAAEIo/8uurEY7s90k/s0/)

When using text frames in Writer, you can always choose if you set an absolute
size for it or you set a relative one. Oddly enough, in case of relative
sizes, it wasn't entirely clear what 100% percent means. With a bit of
[searching](https://help.libreoffice.org/Writer/Type#Relative), the help says
"it's the page text area", which in practice means the page size, excluding
the margins.

And that's where the problem lies: in many cases (importing foreign formats,
cover page of a document, etc.) you want to have a textframe which is 100%
wide, compared to the full page size, including margins. It was already
possible previously to work this around by manually specifying the same size
what was used for page size, but that's ugly, you duplicate the setting at two
places.

As you can see on the above screenshot, in LibreOffice 4.3, I now implemented
this as a new option, you can choose what 100% means for both width and
height. File filters are also updated accordingly: in case of ODF an
[extension](https://wiki.documentfoundation.org/Development/ODF_Implementer_Notes#LibreOffice_ODF_extensions)
is proposed, and also DOCX and RTF filters are updated, where the file format
already supported this feature.

For the curious ones, the feature is in `master` for almost two months now,
but I only implemented my favorite part -- RTF filter -- only last week,
that's the "news" here. ;-)

If you want to try these out yourself, get a
[daily build](http://dev-builds.libreoffice.org/daily/) and play with it! If
something goes wrong, report it to us in the
[Bugzilla](https://www.libreoffice.org/get-help/bug/), so we can try fix it
before 4.3 gets branched off. Last, but not at least, thanks for
[CloudOn](http://www.cloudon.com/) for funding this improvement! :-)
