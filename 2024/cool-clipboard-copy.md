Title: Improved copy & paste in Collabora Online: the copy side
Slug: cool-clipboard-copy
Category: collabora-online
Tags: en
Date: 2024-05-03T08:19:04+02:00

[Collabora Online](https://www.collaboraoffice.com/) now uses the [Clipboard
API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) if it's available in the used
browser, getting rid of many annoying dialogs.

## Motivation

The [paste side]({filename}/2024/sc-clipboard-paste.md) was covered by an earlier post, but in
short, if you're on Chrome (or Safari), you won't see the "can't paste" dialog:

[!["Can't paste" dialog in COOL 23.05](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-paste-bad.png)](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-paste-bad.png)

Also you won't see a "Can't paste special" dialog:

[!["Can't paste special" dialog in COOL 23.05](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-pastespecial-bad.png)](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-pastespecial-bad.png)

Wouldn't it be nice to improve the copy side in a similar way?

## Results so far

The primary reason why we needed similar, annoying dialogs for copy in the past is that the
clipboard API was synchronous but the network API is async. This means that writing to the clipboard
("copy") is only possible with data that we have in the browser when the copy is executed. This is a
problem, since in general we don't have data for your selection in the browser.

With the Clipboard API, the copy side can be improved as well. Instead of always fetching the HTML
for a simple selection (even if you don't copy) and having a three step copy for complex selections,
async clipboard write is now possible. This gets us rid of the "You need to download" dialog:

[!["You need to download" dialog in COOL 23.05](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-copy-bad1.png)](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-copy-bad1.png)

Also it eliminates the "Download completed dialog:

[!["Download completed" dialog in COOL 23.05](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-copy-bad2.png)](https://share.vmiklos.hu/blog/cool-clipboard-copy/2024-05-02-copy-bad2.png)

Instead, we still need to nominally write to the clipboard in the special keyboard or click context
initiating the copy (Chrome doesn't require this, Safari does), but the written object can be a
callback that will do the network operation for us.

Unfortunately it's hard to screenshot the new code, since part of the result is that all these
dialogs are now eliminated, copy & paste just works. :-)

Note that this can be used also in Firefox, but first you need to set
`dom.events.asyncClipboard.clipboardItem` to `true` in `about:config`.

The last part was to adapt tests to this new world, because previously it was handy to just create a
selection and assert what would be copied to the clipboard as HTML, but now we don't download the
HTML anymore every time you create a selection.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [Related: cool#8648 clipboard: extract parseClipboard() from Control.DownloadProgress.js](https://github.com/CollaboraOnline/online/commit/25342ed3172d3689309ed0833bdd2d3248818c56)
- [Related: cool#8648 clipboard: use JSON when requesting HTML only](https://github.com/CollaboraOnline/online/commit/ea8202268ce4aa772a6e89cb58508d862b5e82d7)
- [cool#8648 clipboard: try to use navigator.clipboard.write()](https://github.com/CollaboraOnline/online/commit/75251f9496f44f8678e43c1525719e5e4cc3b6ee)
- [cool#8648 clipboard: fix `desktop/writer/copy_paste_spec.js`](https://github.com/CollaboraOnline/online/commit/286cd1ccf7f354e212bef4f02f4b51c50e37800c)
- [cool#8648 clipboard: fix `desktop/calc/clipboard_spec.js`](https://github.com/CollaboraOnline/online/commit/803df018daf8575674ad4483d181f9c65fddd842)
- [cool#8648 clipboard: fix `desktop/writer/undo_redo_spec.js`](https://github.com/CollaboraOnline/online/commit/635a45aac07c58a14d4dce38145fd28eea3ae04d)
- [cool#8648 clipboard: fix `desktop/writer/track_changes_spec.js`](https://github.com/CollaboraOnline/online/commit/b3f2c690d8c610bffd2584b8d02b095bb144ed16)
- [cool#8648 clipboard: fix `most of desktop/writer/top_toolbar_spec.js`](https://github.com/CollaboraOnline/online/commit/91c702e42012b59f7747a0cfb1a1394cbcc180ff)
- [cool#8648 clipboard: fix insert hyperlink dialog](https://github.com/CollaboraOnline/online/commit/1f0aec8f19ddb6053f48625fabdf19d8e59049bb)
- [cool#8648 clipboard: fix `desktop/writer/table_operation_spec.js`](https://github.com/CollaboraOnline/online/commit/56adf9983e60ad6259b28e2a24fa2c1b67209c56)
- [cool#8648 clipboard: fix `desktop/writer/searchbar_spec.js`](https://github.com/CollaboraOnline/online/commit/1e4afce8a193de2d307737f029f5a9096582ec7b)
- [cool#8648 clipboard: fix `desktop/writer/notebookbar_spec.js`](https://github.com/CollaboraOnline/online/commit/406dad2128a2a5daa8f24e4728560bbdccbcd1e7)
- [cool#8648 clipboard: fix `desktop/writer/editable_area_spec.js`](https://github.com/CollaboraOnline/online/commit/359e7eca6772dd0daf6b7dcfb5bc6e9b628510fc)
- [cool#8648 clipboard: fix `desktop/impress/undo_redo_spec.js`](https://github.com/CollaboraOnline/online/commit/770feebf1318d8f4ab4bd68d13957cfaf6aee74d)
- [cool#8648 clipboard: fix `desktop/impress/delete_objects_spec.js`](https://github.com/CollaboraOnline/online/commit/c10cc6d8b8b6fb60a3a1248d0f8d73ce37af5a17)
- [cool#8648 clipboard: fix `desktop/calc/undo_redo_spec.js`](https://github.com/CollaboraOnline/online/commit/7f9c80988153b88c3ffb4a490c1f9d2d3da2ed39)
- [cool#8648 clipboard: fix `desktop/calc/top_toolbar_spec.js`](https://github.com/CollaboraOnline/online/commit/e396df494cab6f88dfa0d51b91d44a35db8dd7f1)
- [cool#8648 clipboard: fix `desktop/calc/searchbar_spec.js`](https://github.com/CollaboraOnline/online/commit/5bf298243f5c1b6621cbb237d40358d5c411ec67)
- [cool#8648 clipboard: fix `desktop/calc/searchbar_spec.js`](https://github.com/CollaboraOnline/online/commit/a8d4a3e8592d3fcdd8a9007b49613a3fa5f58bf3)
- [cool#8648 clipboard: fix `desktop/calc/focus_spec.js`](https://github.com/CollaboraOnline/online/commit/67d38b64a4af4fc949ea19388a996f3818a4b03d)
- [cool#8648 clipboard: fix `desktop/calc/delete_objects_spec.js`](https://github.com/CollaboraOnline/online/commit/25b377efb44bcde58df160edabc486eecfc73144)
- [cool#8648 clipboard: fix `desktop/calc/autofilter_spec.js`](https://github.com/CollaboraOnline/online/commit/3c9272c1bf3b2f6cf14edb8a590d8f3fb7ab7d02)
- [cool#8648 clipboard: fix `desktop/calc/cell_appearance_spec.js`](https://github.com/CollaboraOnline/online/commit/fdb1f8c7fc101a75a7a90ad6b06cfb3a417ffab4)
- [cool#8648 clipboard: fix `mobile/calc/apply_font_spec.js`](https://github.com/CollaboraOnline/online/commit/4c5adb70e6946d8d9e01bf8d7b45744b02f1310b)
- [cool#8648 clipboard: fix `mobile/calc/autofilter_spec.js`](https://github.com/CollaboraOnline/online/commit/0c21b6e833de9aa257313ad3b514564c6209139f)
- [cool#8648 clipboard: fix `mobile/calc/bottom_toolbar_spec.js`](https://github.com/CollaboraOnline/online/commit/a5d05f23647df8987f053dd7e7b7d42e9bc15a0c)
- [cool#8648 clipboard: fix `mobile/calc/cell_appearance_spec.js`](https://github.com/CollaboraOnline/online/commit/2b37f2113f71d13d8c3bbd29f248713cb88e865d)
- [cool#8648 clipboard: fix `mobile/calc/delete_objects_spec.js`](https://github.com/CollaboraOnline/online/commit/a12bcd3fb0b990566a8f2be0a4de2c2bff5236a1)
- [cool#8648 clipboard: fix `mobile/calc/insertion_wizard_spec.js`](https://github.com/CollaboraOnline/online/commit/3a1dd02dd15a184d4a54b28a84bf9079b6934029)
- [cool#8648 clipboard: fix `mobile/calc/searchbar_spec.js`](https://github.com/CollaboraOnline/online/commit/9ea5add21752c234145e6d78c4ceb56c06e1b4e5)
- [cool#8648 clipboard: fix `mobile/calc/spellchecking_spec.js`](https://github.com/CollaboraOnline/online/commit/283b5a1637121d00f5d41d2067f2221fde1d14ff)
- [cool#8648 clipboard: fix `mobile/impress/delete_objects_spec.js`](https://github.com/CollaboraOnline/online/commit/027a87157bd723d79ef2329d1cd7e41ade2e01e9)
- [cool#8648 clipboard: fix `mobile/impress/impress_focus_spec.js`](https://github.com/CollaboraOnline/online/commit/ad737657c6c3fe37e703587b869aba100a9228e6)
- [cool#8648 clipboard: fix `mobile/impress/insertion_wizard_spec.js`](https://github.com/CollaboraOnline/online/commit/1dc4bae0c96462c18a14ce634675b6f898926c8b)
- [cool#8648 clipboard: fix `mobile/impress/spellchecking_spec.js`](https://github.com/CollaboraOnline/online/commit/04a6af39cfb6949eab23c041656c05f7dfc026ef)
- [cool#8648 clipboard: fix `mobile/writer/apply_font_spec.js`](https://github.com/CollaboraOnline/online/commit/a2db31f4378f5561b19afb53150e9ef0871f2e74)
- [cool#8648 clipboard: fix `mobile/writer/delete_objects_spec.js`](https://github.com/CollaboraOnline/online/commit/9cca40deda7df20d72d6f96e5b91fa71ced89312)
- [cool#8648 clipboard: fix `mobile/writer/insert_formatting_mark_spec.js`](https://github.com/CollaboraOnline/online/commit/ad22a9f017b15658d90a50c011e5bcf8c2c64b87)
- [cool#8648 clipboard: fix `mobile/impress/insertion_wizard_spec.js`](https://github.com/CollaboraOnline/online/commit/a91036247b79403a6d8af9fec559de4cbc76045b)
- [cool#8648 clipboard: fix `mobile/writer/track_changes_spec.js`](https://github.com/CollaboraOnline/online/commit/82dc3e1a46908c1306360cd335243d4345e842b0)
- [cool#8648 clipboard: fix `mobile/writer/table_properties_spec.js`](https://github.com/CollaboraOnline/online/commit/9b95bf829fefba288ff296c57e4323356e673ded)
- [cool#8648 clipboard: stop fetching the clipboard on text selection create in tests](https://github.com/CollaboraOnline/online/commit/28e51d58f446bb081a9630672f0b410b1e385886)
- [cool#8648 clipboard: fix idle tests](https://github.com/CollaboraOnline/online/commit/24109be2e3889a45cfa90f0fa0cfce827a17f53b)

The tracking issue was [cool#8648](https://github.com/CollaboraOnline/online/issues/8648).

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraoffice.com/code/).
