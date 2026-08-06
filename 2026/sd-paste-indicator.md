Title: Better slide paste progress indicator in Collabora Online Impress
Slug: sd-paste-indicator
Category: collabora-online
Tags: en
Date: 2026-08-06T14:29:42+02:00

Copying slides between Impress documents in [Collabora Online](https://www.collaboraonline.com/) was
reasonably fast already, see [the previous post]({filename}/2026/sd-faster-slide-copy.md) for more
details.

This post is meant to show how the progress indicator you see while pasting is improved, better
showing and hiding when the paste is actually in progress.

## Motivation

Impress copies slides using 3 steps. Our testcase was a 85 slides long slidedeck, pasting that to an
other presentation took 3 steps: downloading the remote slides data, uploading the slides data to
the current document and finally executing the paste UI action, which interprets the ODP slide data.
With enough slides, each step took a bit of visible time:

[![Collabora Online Impress: bad progress indicator](https://share.vmiklos.hu/blog/sd-paste-indicator/steps.svg)](https://share.vmiklos.hu/blog/sd-paste-indicator/steps.svg)

As you can see, the progress indicator stopped after task 2, which was confusing.

## Results so far

The [the issue](https://github.com/CollaboraOnline/online/issues/16013) shows that the problem was
we had no idea when the paste UI command finished its work. This looked like this visually:

[![Collabora Online Impress: bad progress indicator in action](https://share.vmiklos.hu/blog/sd-paste-indicator/bad.png)](https://youtu.be/HNOVbHw4Pt0)

Note how the progress indicator finishes and only a little later the pasted slides show up.

In contrast to that, after the fix, the slides show up as soon as the progress indicator hides:

[![Collabora Online Impress: good progress indicator](https://share.vmiklos.hu/blog/sd-paste-indicator/good.png)](https://youtu.be/N1I1JXDzwWM)

## One more thing

This post is about pasting, but we had the opposite problem around Markdown in Writer: you could
paste (using the SDK) into Writer, you could also convert to and from Markdown (again, using the
SDK), but you could not actually open Markdown files. This now also works:

[![Collabora Online Writer: editing a Markdown file](https://share.vmiklos.hu/blog/sd-paste-indicator/markdown.png)](https://share.vmiklos.hu/blog/sd-paste-indicator/markdown.png)

To not break compatibility, a single click in Nextcloud still opens the Markdown file in their JS
editor, but similar to PDF files, you can use the "..." menu to access additional actions and there
you can now open the file for editing in Collabora Online as well.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#16013 slide copy: don't terminate paste progress indicator too early](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/9a671594ce19a19dd358b0e27cfc6373d770f799)
- [Related: cool#16013 engine sc: make ScInsertContentsDlg async](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/0f56d692d1fa68f4d7d43c6bd275ad9d5356c617)
- [cool#16018 discovery: add entries for markdown](https://gerrit.collaboraoffice.com/plugins/gitiles/online/+/b0ba3eadd40b73cb4054802db8da468b315e94a6)

Nextcloud richdocuments commits:

- [feat: Add text/markdown as an optionally supported mime type](https://github.com/nextcloud/richdocuments/commit/7ec1f6c6c0479fcb8c7639e4cdce6418327847cc)

## Want to start using this?

You can get a development edition of Collabora Online 26.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
