Title: Content controls in Writer: titles and tags
Slug: sw-content-controls5
Category: libreoffice
Tags: en
Date: 2022-11-03T13:37:09+01:00

Writer now supports titles and tags for content controls, which helps providing context for the
filled in text even if the placeholder text is replaced already.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), see [the previous
post]({filename}/2022/sw-content-controls4.md) for background.

## Motivation

![Rendering of a title for a content control](https://share.vmiklos.hu/blog/sw-content-controls5/content-control-alias.png)

Once several content controls are added to a document, it's easy to forget what was the exact
purpose of what content control. Think of a press release for example -- those regularly start with
a location and a date, but once this information is provided, one no longer knows which content
control was for which content.

Titles solve this problem for the user: similar to Writer's header/footer buttons, this button
appears when you enter the content control and reminds you what content is expected there, even if
the placeholder is already replaced.

Tags serve a similar purpose, but they are unique, machine-readable keys or identifiers, so once the
form is filled in, an external consumer can easily extract the information from the document, given
a specific tag.

## Results so far

Titles (also known as aliases) and tags are now not only preserved, but also we have a UI to create,
show, edit and delete them. This is available in the desktop rendering and also on the LOK API.

Somewhat related, in case a content control breaks into multiple lines or has formatting to break
into multiple text portions, we now only emit one PDF widget for it, taking the description of the
widget from the content control's title.

The last related improvement is that now we handle data binding for date content controls, which
means that you can specify a timestamp, a language and a date format, and we'll format that
timestamp and update the content control's string value at import time from DOCX.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

<!-- s/\([^ ]\+\) \(.*\)/- [\2](https:\/\/git.libreoffice.org\/core\/commit\/\1)/g -->

- [sw content controls: preserve alias](https://git.libreoffice.org/core/commit/481a082469802ffce08cd8c110e715260015eb97)
- [sw content controls: preserve tag](https://git.libreoffice.org/core/commit/5262aab9d220675f616579720b4bb43ee03cccfb)
- [sw content controls: emit only one PDF widget for multiple text portions](https://git.libreoffice.org/core/commit/a70f5f141c1e6013abb4c1b3219e017b2eea40a8)
- [tdf#151190 sw content controls: make them read-write in protected sections](https://git.libreoffice.org/core/commit/b138d6c12aaeb0b87dce15ea52dd134cf1abf6ac)
- [sw content controls: add rendering for the alias](https://git.libreoffice.org/core/commit/1a94cd8257ef4c462eaaa6d49bf4f26c9ac56a5e)
- [sw content controls, alias and tag: add ODT filter](https://git.libreoffice.org/core/commit/888a8c3ca70ed19309c15ff7b9f0968ece337cb5)
- [sw content controls, alias and tag: add UI](https://git.libreoffice.org/core/commit/add110bad816fadeb96e7af0d4689389c04c263e)
- [sw content controls, alias: add LOK API](https://git.libreoffice.org/core/commit/e368d26a7f24dc25f3d855511baabc128bc151e6)
- [sw content controls, alias: add PDF export](https://git.libreoffice.org/core/commit/122419be4f7bf576f7db5456b8b6b1f6f700487f)
- [sw content controls: enable data binding for date](https://git.libreoffice.org/core/commit/58002ab85d992c7ac44d8bb4d135246b67aa5cc7)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.5).
