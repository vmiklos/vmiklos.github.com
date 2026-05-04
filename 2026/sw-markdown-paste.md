Title: Better pasting of markdown into Collabora Online Writer
Slug: sw-markdown-paste
Category: collabora-online
Tags: en
Date: 2026-05-04T15:29:42+02:00

Writer has a markdown import/export filter in [Collabora Online](https://www.collaboraonline.com/),
see [the post from December]({filename}/2025/sw-markdown-templating.md) for more info about the
filter in general.

This post is meant to detail a recent improvement when a markdown snippet is on the clipboard and
it's pasted into an existing Writer document.

## Motivation

Writer import filters operate in two modes: normally an empty model gets populated by reading user
input from a file, in a certain format. You can also paste similar data from the clipboard, in which
case the target model is not empty and this introduces some complexity.

The markdown import was missing some tweaks which were there already in the ODT and RTF paste code.
Additionally, given that markdown only allows limited formatting, it makes sense to inherit more
formatting from the paste position, so the pasted content's formatting is consistent with the
formatting of the surrounding content.

## Results so far

The document from [the issue](https://github.com/CollaboraOnline/online/issues/15535) had bullets
with text "A" and "B", the first problem was that pasting before "A" resulted in a mix of existing
vs pasted content:

[![Collabora Online Writer markdown paste: before fixing paragraph splits](https://share.vmiklos.hu/blog/sw-markdown-paste/bad1.png)](https://share.vmiklos.hu/blog/sw-markdown-paste/bad1.png)

After fixing that, the problem was that the bullet format from markdown and in the existing document
was different:

[![Collabora Online Writer markdown paste: paragraph splits are fixed, bullet formats are not](https://share.vmiklos.hu/blog/sw-markdown-paste/bad2.png)](https://share.vmiklos.hu/blog/sw-markdown-paste/bad2.png)

Once that got fixed, the paragraph style was still bad:

[![Collabora Online Writer markdown paste: bullet formats are fixed, paragraph style is not](https://share.vmiklos.hu/blog/sw-markdown-paste/bad3.png)](https://share.vmiklos.hu/blog/sw-markdown-paste/bad3.png)

Which lead to the correct paste result:

[![Collabora Online Writer markdown paste: paragraph style is fixed](https://share.vmiklos.hu/blog/sw-markdown-paste/good.png)](https://share.vmiklos.hu/blog/sw-markdown-paste/good.png)

As a bonus point, undo for the paste now works correctly, too.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#15535 sw markdown import: handle pasting into an existing paragraph](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/f97a7bf0efbe1abb9fbecb58449b2845632839fd)
- [Related: cool#15535 sw markdown import: use matching num rule if possible](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/f16394d42af604fcaf4a28938a317f15d1732fc9)
- [Related: cool#15535 sw markdown import: use matching paragraph formatting](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/840bd79a47fad50a80b9720176ad53dd50649091)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
