Title: LibreOffice on Android FOSDEM talk
Slug: fosdem2015
Category: libreoffice
Tags: en
Date: 2015-02-04T10:44:00Z

![(via LOfCollabora)](https://lh4.googleusercontent.com/-3Z-6BCCwldk/VNEQnkMAl8I/AAAAAAAAFO8/m-5535Gu_IM/s400/)

Today is my last day in Brussels where I
gave a [TextBoxes: complex shapes with complex content](https://fosdem.org/2015/schedule/event/editors_texboxes_writer/) and a [LibreOffice on Android](https://fosdem.org/2015/schedule/event/editors_libreoffice_android/) talk
at FOSDEM 2015, in the
[Open document
editors devroom](https://fosdem.org/2015/schedule/track/open_document_editors/). The devroom was well-crowded, with about 100 users in the
rows of the audience -- proof pictures above and below. ;-)

![(via deneb_alpha)](https://lh3.googleusercontent.com/-sR6rLYO-TWA/VNEQngonBHI/AAAAAAAAFPE/b6wHnfcQ49s/s400/)

We also had a
[Hackfest](https://wiki.documentfoundation.org/Hackfest/FOSDEM2015) with about
20 hackers attending, (again) kindly hosted by
[Betacowork](http://www.betacowork.com/) on Monday and Tuesday:

![(via floeff)](https://lh5.googleusercontent.com/-yjkNg7omYrI/VNEQnjxF4JI/AAAAAAAAFPA/rO_EtimqYMg/s800/)

There were a few topics I hacked on:

- [tdf#88583](https://bugs.documentfoundation.org/show_bug.cgi?id=88583): a fallout from the Writer fillattributes work introduced in
  LibreOffice 4.4
- [tdf#68183](https://bugs.documentfoundation.org/show_bug.cgi?id=68183): a small new feature missing since the RSID GSoC project ended
- build on HiDPI screens should now
  [no longer fail](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=1ade66e7e70ce13c419f1ffff5222dcedec281bd)
- [tdf#88811](https://bugs.documentfoundation.org/show_bug.cgi?id=88811): an RTF regression fix, so that now the
  [counter](https://bugs.documentfoundation.org/buglist.cgi?keywords=regression&keywords_type=allwords&status_whiteboard_type=allwordssubstr&query_format=advanced&status_whiteboard=rtf_filter&resolution=---) is down to zero again
- we no longer produce invalid ODF output when writing
  [character borders](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commitdiff;h=f1f6b6db730ae67a427c7974b59a5e19ab571984)

A full list of achievements is
[available](https://wiki.documentfoundation.org/Hackfest/FOSDEM2015#Achievements), if
you were at the hackfest and you did not contribute to that section, please
write a line about what did you hack on. :-)

Quite some other slides are now available on
[Planet](http://planet.documentfoundation.org/), don't miss them. Mines are
[also](https://speakerdeck.com/vmiklos/textboxes-in-libreoffice-writer)
[uploaded](https://speakerdeck.com/vmiklos/libreoffice-on-android).