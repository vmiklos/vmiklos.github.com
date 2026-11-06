Title: Better rendering of track changes and numbering portions in Collabora Online Writer
Slug: sw-redline-number-portion
Category: collabora-online
Tags: en
Date: 2026-11-06T16:17:41+01:00

Numbering portions are the special creatures that are automatically generated at the start of a
paragraph for Arabic numbering or bullets. They are there before the paragraph even starts, and now
the track changes rendering for them is better.

This post is meant to show how this looked in the past and what we improved recently.

## Motivation

Users expect that if they make a text selection in a Writer document and track changes is on and
they delete the content, then that content will be rendered as crossed out. This wasn't exactly like
this in Writer if you had a multi-paragraph selection and your paragraphs were a bullet list. Given
this selection:

[![Collabora Online Writer: multi-paragraph bullet selection](https://share.vmiklos.hu/blog/sw-redline-number-portion/selection.png)](https://share.vmiklos.hu/blog/sw-redline-number-portion/selection.png)

On pressing delete, we rendered the delete redline like this:

[![Collabora Online Writer: old delete redline rendering](https://share.vmiklos.hu/blog/sw-redline-number-portion/old.png)](https://share.vmiklos.hu/blog/sw-redline-number-portion/old.png)

## Results so far

The [the issue](https://github.com/CollaboraOnline/online/issues/16320) shows that now we render the
delete redline where the old selection was:

[![Collabora Online Impress: new delete redline rendering](https://share.vmiklos.hu/blog/sw-redline-number-portion/new.png)](https://share.vmiklos.hu/blog/sw-redline-number-portion/new.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes, first the code change
and then adjusting tests to expect the new behavior:

- [cool#16320 engine sw redline render of number portions: render on the next paragraph](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/93fe202ce7f6ffec2f88829bf97389af7886e6db)

## Want to start using this?

You can get a development edition of Collabora Online 26.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
