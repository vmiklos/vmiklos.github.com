Title: Markdown copy&paste on the Collabora Online UI
Slug: cool-markdown-copy
Category: collabora-online
Tags: en
Date: 2026-09-08T16:42:37+02:00

Markdown import and export in [Collabora Online](https://www.collaboraonline.com/) was an existing
filter already, see [the post from last year]({filename}/2025/sw-markdown-filter.md) for more
details.

This post is meant to show how this is now available on the end-user UI, while previously this was
mostly available for batch conversion and SDK clients only.

## Motivation

A computer's clipboard can contain data in multiple formats, so it would be logical to read and
write Markdown with the `text/markdown` MIME type. Unfortunately most applications just read from
the `text/plain` MIME type when non-formatted text is expected. This means writing the dedicated
markdown slot is not read by anyone and in turn reading from that slot usually returns with no data.

The idea is to make "copy as markdown" an explicit action on the UI: when the user opts in, then we
put markdown to the plain text slot on the clipboard, where other software can read it easily. And
similarly, when you paste special, then you can opt in to interpret the plain text data as markdown.
This means that data like `aaa _bbb_ ccc` won't be interpreted as markdown by accident, but if you
ask for it, you can get your markdown data into Writer easily.

## Results so far

The [the issue](https://github.com/CollaboraOnline/online/issues/16060) shows that first the copy as
markdown UI was added:

[![Collabora Online: copy as markdown UI](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-copy.png)](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-copy.png)

Then the paste spcial dialog needed work in each component. First in Writer:

[![Collabora Online Writer: paste as markdown UI](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-writer.png)](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-writer.png)

Then the same in Impress, where we need to work with editengine's model, instead of Writer text:

[![Collabora Online Impress: paste as markdown UI](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-impress.png)](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-impress.png)

Finally also in Calc, sill working with editengine's model:

[![Collabora Online Calc: paste as markdown UI](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-calc.png)](https://share.vmiklos.hu/blog/cool-markdown-copy/markdown-paste-calc.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#16060 browser, wsd: add a copy-as-markdown UI to Writer](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/865a5bf3604a9a96c753efd0117ccc66c8447dcc)
- [cool#16060 engine kit: add a paste-as-markdown UI to Writer](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/82c2e2f37eaba64d71ca30862279ecd30b889b80)
- [cool#16060 engine kit: add a paste-as-markdown UI to Impress](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/07ca16bd0032777d8837c6ba577132e060858489)
- [cool#16060 engine kit: add a paste-as-markdown UI to Calc (cell text edit)](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/db032d245409506992105a46be2a11fcecfbcbab)
- [cool#16060 engine sd: keep plain text as default, paste special can opt in for markdown](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/b9adeeeeb51f42fb283c48617b508df3ac8160bd)

## Want to start using this?

You can get a development edition of Collabora Online 26.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
