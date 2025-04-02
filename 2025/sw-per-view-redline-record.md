Title: Per-user track changes recording in Writer
Slug: sw-per-view-redline-record
Category: libreoffice
Tags: en
Date: 2025-04-02T13:33:03+02:00

Writer has the concept of recording tracked changes or not: if recording, typing into a document or
deleting content will create tracked changes of type insertion or deletion. So far this was a
per-document setting, but now individual users can enable or disable this as they wish.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Writer as well.

## Motivation

When Alice keeps typing and Bob enables change tracking, then surprisingly the typed characters of
Alice will form a tracked insertion, which is surprising, since that was not the case a second ago
and Alice didn't do anything other than typing.

Giving users a choice if they enable recording for just this user or for all users fixes this
problem.

## Results so far

Here is how the per-user (technically per-view) tracked changes recording looks like:

[![Per-view tracked changes recording](https://share.vmiklos.hu/blog/sw-per-view-redline/sw-per-view-redline.png)](https://share.vmiklos.hu/blog/sw-per-view-redline/sw-per-view-redline.png)

As you can see, the user on the left has recording turned on and this doesn't influence the user on
the right, while this was not possible before.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [cool#11226 sw per-view redline on: support this-view <-> all-views transition](https://git.libreoffice.org/core/commit/ab91358566ccf31f7a9ac57f1c32a9c62840f5d5)
- [cool#11226 sw per-view redline on: state for the per-view and per-doc commands](https://git.libreoffice.org/core/commit/85fc28a4e55bb8dafd69a19dc5d21a76501446cb)
- [cool#11226 sw per-view redline on: allow both per-view and per-doc](https://git.libreoffice.org/core/commit/368e2e445c1941d37697cee05a50a34150d18015)
- [Related: cool#11226 sw per-view redline on: fix ratio buttons of is-show](https://git.libreoffice.org/core/commit/745256f37973d89ea068acd831eba8054a81b93b)
- [cool#11226 sw per-view redline on: add view-aware getter](https://git.libreoffice.org/core/commit/ae6d396552cd3cebd7fba4942e6ca2fd5de579af)
- [cool#11226 sw per-view redline on: move the setter to the model](https://git.libreoffice.org/core/commit/e36643877e5ddf57a34481f1c46f87cf250caf19)
- [cool#11226 sw per-view redline on: add new flag in SwViewOption](https://git.libreoffice.org/core/commit/025a1e4612fecf59f38910fbf52fc63db054ae5f)
- [cool#11226 sw layout xml dump: show some more view options](https://git.libreoffice.org/core/commit/88e12a83aec0ffda82195c8a1e34a255d3cfdfd5)

Online side:

- [cool#11226 sw per-view redline on: add tri-state UI in the notebookbar](https://github.com/collaboraonline/online/commit/c37904149498658c3fd25f043fc5f34be89fb120)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (25.8).
