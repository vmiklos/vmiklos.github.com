Title: Comparing text documents in Collabora Online: improved UI
Slug: cool-doc-compare2
Category: collabora-online
Tags: en
Date: 2026-03-31T16:12:53+02:00

The document compare view in [Collabora Online](https://www.collaboraonline.com/) allows comparing
documents side by side, see [the first post]({filename}/2026/cool-doc-compare.md) for more info
about the feature in general.

This second post is meant to give you an update on what happened in this area in the last month.

## Motivation

Collabora Online core supports showing or hiding tracked changes in document tiles, we have a UI
button for that, see the notebookbar's Review tab, the Tracking section's Show button.

Entering doc compare mode or leaving it works by clicking on the View Changes button, in the same
section.

But this means that you can show/hide changes and also view them, and they do quite different
things. :-)

## Results so far

The new has a button with a drop-down: the button is toggle that reflects if tracked changes are
shown or hidden in the document layout. And if you click the drop-down next to the button, it's clear
that show/hide is for inline rendering while the other option is to render changes side-by-side:

[![Collabora Online: view changes inline or side-by-side](https://share.vmiklos.hu/blog/cool-doc-compare2/new.png)](https://share.vmiklos.hu/blog/cool-doc-compare2/new.png)

While this used to look like this:

[![Old UI: show or view changes?](https://share.vmiklos.hu/blog/cool-doc-compare2/old.png)](https://share.vmiklos.hu/blog/cool-doc-compare2/old.png)

There were also a number of other smaller improvements: now side-by-side rendering works nicely if
you use IME to type characters, a missing invalidation is sorted out and side-by-side rendering is
better with comments.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [tdf#171191 sw redline render mode: fix crash on IME input](https://git.libreoffice.org/core/commit/ba91aae53989dcbc447a53b6350a6bb1208c808b)

COOL side:

- [browser, document compare: annotate overriding functions with 'override'](https://github.com/collaboraonline/online/commit/207880a8965e169966cdc206c54e0183e85ad65a)
- [cool#14940 document compare: merge Show and View Changes buttons into a single menu button](https://github.com/collaboraonline/online/commit/d8972a97ae438600046f1f11e71308643e97eefe)
- [cool#14990 document compare: fix lost mode=2 full invalidations](https://github.com/collaboraonline/online/commit/ad2cd0e13aca91ebc02031f27ff9567c297e511c)
- [cool#15195 document compare: fix bad vertical position of comments on scrolling](https://github.com/collaboraonline/online/commit/5c2c98a28858454e1e306bc25499cd3286bb71eb)
- [cool#15195 document compare: fix bad horizontal position of comments](https://github.com/collaboraonline/online/commit/ce52a2c0c1d2022be42f4a21cebab07a5fb86887)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
