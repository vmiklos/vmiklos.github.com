Title: Small capitals toolbar button in LibreOffice Writer
Slug: sw-smallcaps-toolbar-button
Category: libreoffice
Tags: en
Date: 2016-10-03T08:25:39Z

[![Small capitals toolbar button in LibreOffice Writer](https://farm6.staticflickr.com/5235/29982452081_187d99dece_z.jpg)](https://farm6.staticflickr.com/5235/29982452081_a9ca103f2f_o.png)

It was [requested](https://bugs.documentfoundation.org/show_bug.cgi?id=87914) to
be able to set the small capitals character property via a toolbar button in
Writer, which was indeed not possible. Not only the toolbar button wasn't
there, but the underlying UNO command was also missing (which you can use e.g.
from a macro to format the current selection).

So my
[commit](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commit;h=d378cd2f766eeb1fd1c98f62c9ae6b5b59fd00f1)
added a simple set of icons to the galaxy theme for the new toolbar button,
defined the new UNO command for Writer text and added it to Writer's text
object bar, next to the upper case and lower case buttons (hidden by default).
One difference from those buttons is that those buttons perform a
transliteration, while this one really just sets a character property, you can
easily undo the property later if needed.

Wrt. other icon themes, see
[this mail](http://listarchives.libreoffice.org/global/design/msg07922.html),
hopefully the design team can help there.

As usual, you can try this right now with a 5.3
[daily build](http://dev-builds.libreoffice.org/daily/master/). :-)
