Title: Mail merge embedding in LibreOffice Writer FOSDEM talk
Slug: fosdem2016
Category: libreoffice
Tags: en
Date: 2016-01-31T11:45:26Z

[![Title slide of the presentation](https://lh3.googleusercontent.com/-tY-2qENlPkA/Vq3iZ4wlO9I/AAAAAAAAGbY/o7lbUDAUoHo/s800-Ic42/)](https://speakerd.s3.amazonaws.com/presentations/30e7f96db4a8430cbe7938245b545880/mm-fosdem-brussels-2k16.pdf)

Yesterday I gave a
[Mail merge
embedding in LibreOffice Writer](https://fosdem.org/2016/schedule/event/libreoffice_mail_merging/) talk at FOSDEM 2016, in the
[Open document
editors developer room](https://fosdem.org/2016/schedule/track/open_document_editors/). The room was well-crowded -- seems this year LibreOffice
Online was a hot topic. ;-)

We also had a
[hackfest](https://wiki.documentfoundation.org/Hackfest/FOSDEM2016) with about
20 hackers attending, (again) kindly hosted by
[Betacowork](http://www.betacowork.com/) on Thursday and Friday, before FOSDEM.

There were a few topics I hacked on:

- [.uno:Paste
  AnchorType param](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=552361aaad740e55fcfa7993b4111aba354f863f) for Writer
- [tdf#97371](https://bugs.documentfoundation.org/show_bug.cgi?id=97371) DOCX import regression fix about TextBoxes
- [tdf#96175](https://bugs.documentfoundation.org/show_bug.cgi?id=96175) RTF export feature about 'company' doc property
- [refactoring](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=363aa5dbb2c223b6cc3a109bd654f39772e310fa)
  around Writer's new (in 5.1) hide-whitespace feature, as requested by Ashod
- code coverage: `RtfExport::WriteRevTab()` was completely untested
  previously, now
  [fixed](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=8ff66c71bb4da8d0e4454e250e480eada9fe226c)

A full list of achievements is
[available](https://wiki.documentfoundation.org/Hackfest/FOSDEM2016#Achievements), if
you were at the hackfest and you did not contribute to that section, please
write a line about what did you hack on. :-)

Quite some other slides are now available on
[Planet](http://planet.documentfoundation.org/), don't miss them.
