Title: LibreOffice Hamburg Hackfest 2018
Slug: hamburg2018
Category: libreoffice
Tags: en
Date: 2018-04-10T10:35:35Z

![(via Sweet5hark)](https://farm1.staticflickr.com/873/27489617988_4c2ce3fd59_z.jpg)

I arrived home from Hamburg yesterday where I participated in the [LibreOffice
hackfest](https://wiki.documentfoundation.org/Hackfest/Hamburg2018) over the weekend as a mentor.
First, thanks to The Document Foundation -- and all the [donors](https://www.libreoffice.org/donate)
for funding Collabora to make this possible.

There were a few topics I mentored:

- Patrick was interested fixing
  [tdf#116486](https://bugs.documentfoundation.org/show_bug.cgi?id=116486), which required some
  background knowledge on the Writer document model and layout, so we explored the relevant details
  together towards providing an actual patch for the bug.

- Nithin wanted to fix
  [tdf#112384](https://bugs.documentfoundation.org/show_bug.cgi?id=112384), which turned out to be an
  ideal task for a hackfest. On one hand, the scope is limited so that you can implement this
  mini-feature over a weekened. On the other hand, it required touching various parts of Writer (UI,
  document model, UNO API, ODF filter), so it allowed seeing the process of adding a new feature.
  The [patch](https://gerrit.libreoffice.org/52561) is merged to master.

- Linus looked for a task that is relatively easy, still useful, we looked at
  [tdf#42949](https://bugs.documentfoundation.org/show_bug.cgi?id=42949), and he identified and
  removed a number of unused includes himself. This should especially help with slow incremental
  builds. Again, the [patch](https://gerrit.libreoffice.org/52594) is already in master.

- Zdeněk (raal) wanted to write a uitest for
  [tdf#106280](https://bugs.documentfoundation.org/show_bug.cgi?id=106280) so we were figuring out
  together how to select images from pyuno and how to avoid using graphic URLs in uitests in
  general.

The full list of achievements is [on the
wiki](https://wiki.documentfoundation.org/Hackfest/Hamburg2018#Achievements), if you were at the
hackfest and you did not contribute to that section, please write a line about what did you hack on.
:-)

Finally, thanks for the organizers and the sponsors of the hackfest, it was a really great event!