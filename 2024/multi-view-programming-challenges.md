Title: Fixing multi-view programming challenges in Calc and elsewhere
Slug: multi-view-programming-challenges
Category: libreoffice
Tags: en
Date: 2024-02-06T09:49:18+01:00

This post describes some challenges around having multiple views of one opened document in
LibreOffice core, when those views belong to LOK views, representing different users, with their
own language, locale and other view settings.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful for
all clients of the LOK API.

## Motivation

LOK views are meant to represent separate users, so we need to make sure that when a user sets their
preferences and trigger an action, then the response to that action goes to the correct view, with
the correct view settings.

This is different from the desktop LibreOffice use-case, where multiple windows are still meant to
share the same user name, language, undo stack and so on.

## Results so far

In this post, I would like to present 4 small improvements that recently happened to the LOK API to
provide this wanted separation of views.

The first was an [issue](https://github.com/CollaboraOnline/online/issues/7853) where two users were
editing the same document, one busily typing and the other clicked on a link in Calc. What could
happen sometimes is the link popup appeared for the user who typed, not for the user who clicked on
the link:

[![Link popup is actually on the left, should be on the right, now fixed](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2023-12-18-cool-calc-hyprelink-bad-view.png)](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2023-12-18-cool-calc-hyprelink-bad-view.png)

This specific problem can be fixed by making sure that link click callbacks are invoked
synchronously (while the clicking view is still active) and not later, when the current view may or
may not be the correct one.

It turns out the same problem (async command dispatch) affects not only hyperlinks, but many other
cases as well, where we want to stay async, for example, when one dialog would invoke another
dialog, like the Calc conditional format -> add dialog:

[![Calc conditional format add dialog appearing on the left, should be on the right, now fixed](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-02-cool-calc-condformat-wrong-view.png)](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-02-cool-calc-condformat-wrong-view.png)

There you don't want to change async commands into sync commands, because that may mean spinning the
main loop inside a dialog, resulting in nested main loops. This can be fixed by making sure that
async commands to be dispatched (sfx2 hints in general) are processed in a way that the current view
at dispatch & processing is the same, which is now the case.

The third problem was around wrong language & locale in the status bar:

[![Unexpected English strings in localized statubar UI, now fixed](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-04-cool-calc-statusbar-wrong-lang.png)](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-04-cool-calc-statusbar-wrong-lang.png)

This is not simply a problem of missing translation, the trouble was that the status bar update is
also async and by the time the update happened, the locale of the view on the left was used, for a
string that appears on the right.

The way to fix this is to perform the update of toolbars/statusbar/etc (in general: SfxBindings) in
a way that the language at job schedule time and at UI string creation time is the same.

The last problem was quite similar, still about bad language on the UI, but this time on the
sidebar:

[![Unexpected English strings in localized sidebar UI, now fixed](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-09-cool-calc-sidebar-wrong-lang.png)](https://share.vmiklos.hu/blog/multi-view-programming-challenges/2024-01-09-cool-calc-sidebar-wrong-lang.png)

This is similar to the statusbar case, but the sidebar has its own executor for its async jobs, so
that needed a fix similar to what the statusbar already had, now done.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#7853 sc lok: fix bad view id on hyperlink click](https://git.libreoffice.org/core/commit/e83309d97d0bbad131a7fdfd365fb6122d6f415b)
- [cool#7865 sfx2 lok: fix bad view id on async command dispatch](https://git.libreoffice.org/core/commit/ee7ca8e4ea8ed93655f99e77a9e77032ac830c46)
- [cool#7492 sfx2 lok: fix bad view id / statusbar string on async binding update](https://git.libreoffice.org/core/commit/51d8a2ef54751403fa707816e27ddb4e7faa8231)
- [cool#7492 sfx2 lok: just set language/locale on async binding update](https://git.libreoffice.org/core/commit/fb7b0b944741e4efae8d92a6e305036aff906c7a)
- [cool#7492 sfx2 lok: set language/locale on async sidebar update](https://git.libreoffice.org/core/commit/aaf6ce108e91b1504befe19afcee471e3316ae7a)

## Want to start using this?

You can get the latest Collabora Online Development Edition 23.05 and try it out yourself right now:
[try the development edition](https://www.collaboraoffice.com/code/quick-tryout-nextcloud-docker/).
Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's next release too (24.8).
