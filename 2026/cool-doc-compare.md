Title: Comparing text document in Collabora Online
Slug: cool-doc-compare
Category: collabora-online
Tags: en
Date: 2026-03-03T14:21:25+01:00

If you have two documents or two versions of a document to compare, then traditional tracked changes
is too late, the untracked changes are already in the document.

This work for [Collabora Online](https://www.collaboraonline.com/) adds interactive a
non-interactive document compare to create tracked changes after the fact, finally introduces a
document compare view, to better understand these changes.

## Motivation

Collabora Online's core already contained a document compare feature, but this was never integrated
with the SDK (REST API) or with the browser UI.

Additionally, while some users took a training in understanding track changes (or: redlines), the
usage of underlyines for inserts and strike-throughs for deletions may not be obvious. An
alternative of this is a side-by-side view, which is now available in Collabora Online for text
documents.

## Results so far

### Non-interactive document compare

See the [SDK](https://sdk.collaboraonline.com/docs/conversion_api.html#compare-compare-option), now
you can convert e.g. an editable (new) docx file to PDF in a way that your request references your
old docx file as a parameter, and the resulting PDF shows the differences:

```bash
curl -k -F "data=@new.docx" -F "compare=@old.docx" -F "format=pdf" -o out.pdf https://localhost:9980/cool/convert-to
```

### Interactive document compare

Technically this is a bit similar to image insertion: once you open your new document, you can
compare its content with an old local or remote document:

[![Collabora Online: interactive document compare for text documents](https://share.vmiklos.hu/blog/cool-doc-compare/interactive.png)](https://share.vmiklos.hu/blog/cool-doc-compare/interactive.png)

Just use the Compare button on the Review tab on the notebookbar.

### Document compare view

We worked with Gokay to build this. The LOK API now provides "tile modes" for text documents,
similar to how presentations already have tile modes for slide content, master pages and notes. The
default tile mode is unchanged for text documents, but the Review tab of the notebookbar has a View
Changes button and then the new left hand side, right hand side tile modes allow you to show the
changes side by side:


[![Collabora Online: the new document compare view](https://share.vmiklos.hu/blog/cool-doc-compare/doc-compare-view.png)](https://share.vmiklos.hu/blog/cool-doc-compare/doc-compare-view.png)

Removed content is colored with a red-like color, added content is colored with a green-like color.
The matching content on the other side is gray. This is not only for text, e.g. images have a frame
with a similar color.

Now that the LOK API could provide tiles either left or right hand side mode, Gokay built a whole
new tile layout on the browser side, so these are shown nicely side by side.

To better understand what you see on your screen, now there are also labels at the top of the first
pages:

[![Collabora Online: the new document compare labels](https://share.vmiklos.hu/blog/cool-doc-compare/doc-compare-labels.png)](https://share.vmiklos.hu/blog/cool-doc-compare/doc-compare-labels.png)

This describes the purposes of the two sides, and in case you're right after a document compare
action, also shows you the file names, modification dates and author names.

For integrators, it's possible to start in this mode by default, if you append `&comparechanges=1`
to COOL's iframe URL.

Finally if you hover over a tracked change with your mouse, now you get a highlight for that piece
of text on both sides, to match the same parts of the old and new version better. A deletion looks
like this:

[![Collabora Online: document compare view, highlight of a delete](https://share.vmiklos.hu/blog/cool-doc-compare/highlight-delete.png)](https://share.vmiklos.hu/blog/cool-doc-compare/highlight-delete.png)

This also works for inserts:

[![Collabora Online: document compare view, highlight of an insert](https://share.vmiklos.hu/blog/cool-doc-compare/highlight-insert.png)](https://share.vmiklos.hu/blog/cool-doc-compare/highlight-insert.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [cool#13574 sw lok: introduce a redline render mode view option](https://git.libreoffice.org/core/commit/bb8086aea02d867c6de4ef298808c47ba2bfe356)
- [cool#13574 sw lok: improve non-standard redline render mode colors](https://git.libreoffice.org/core/commit/b3656a81b40bd5012d6e9a52527e241cd6586571)
- [cool#13574 sw lok: increase saturation of non-standard redline render mode](https://git.libreoffice.org/core/commit/4b3eb51d4e2fb19c3c05a83b6890de070aa58ab7)
- [cool#13574 sw redline render mode: add uno command to switch from standard](https://git.libreoffice.org/core/commit/3c4da8d9fc1245b2b48d3b73ee88c29d2c1198ad)
- [cool#13574 sw redline render mode: send LOK status](https://git.libreoffice.org/core/commit/5ba4c652fab709d5d8182b4ad99bf1e676e7e6ca)
- [cool#13574 sw redline render mode: invalidate both omit modes together](https://git.libreoffice.org/core/commit/3b2ab404e21b648ddc9761c175dadb32b6459364)
- [cool#13574 sw redline render mode: avoid coloring, set lightness](https://git.libreoffice.org/core/commit/a24dd7b1d742ccd59768db8b6b6a522588952108)
- [cool#13574 sw redline render mode: extract SwTextPaintOmitter from text painter](https://git.libreoffice.org/core/commit/95c924760a9923b507a9d44a64edda851ff7567c)
- [cool#13988 sw redline render mode: handle anchored images](https://git.libreoffice.org/core/commit/58d677055d9f6da976bf4fe34c1d89dd6871050d)
- [cool#13574 sw redline render mode: somewhat color ins/del as green/red](https://git.libreoffice.org/core/commit/c2527991e86edb9f27efc93f6a5e66c078ecc0cf)
- [cool#13988 sw redline render mode: handle inline images](https://git.libreoffice.org/core/commit/8314046a4fdb706cf9bb4d65c97792ed7410fb0f)
- [cool#13988 sw redline render mode: add colored border for anchored images](https://git.libreoffice.org/core/commit/9b47b7914242811fe69815485840f20bc7bd7887)
- [cool#13988 sw redline render mode: add colored border for inline images](https://git.libreoffice.org/core/commit/36a6ca3e6de7106bdd0497386d29a05337c5a90c)
- [cool#13988 sw redline render mode: handle moves](https://git.libreoffice.org/core/commit/ef623651aa63097810461c10e0f8d41ff48d1f21)
- [cool#13988 sw redline render mode: table row redlines](https://git.libreoffice.org/core/commit/cef7b1ac8c26fd33c56d4a0aebdd81e2050c814d)
- [cool#13988 sw redline render mode: handle number portions](https://git.libreoffice.org/core/commit/e609c44293ca7ba5658459aec15b6b084cb1bfd1)
- [cool#13988 sw redline render mode: handle tab portions](https://git.libreoffice.org/core/commit/edef9fffa00bddb8f03ef00e6b693c967a15b28f)
- [cool#13988 sw redline render mode: expose old/new author/date when comparing](https://git.libreoffice.org/core/commit/c71d2bdb298639573fa5a93cdd5f211dabcf61c7)
- [cool#13988 sw redline tooltip LOK API: expose anchor range](https://git.libreoffice.org/core/commit/8dcecf717b5cd231adbc49e27ccf1b7aa0230a3a)

COOL side:

- [cool#4535 convert-to compare option: introduce 'additional files'](https://github.com/collaboraonline/online/commit/ac74dffe035f2a05131ff787267d9a69db5590d1)
- [cool#4535 convert-to compare option: insert old reference doc before save](https://github.com/collaboraonline/online/commit/9f45bb834e14d5cc02d4bad29a32208becb911e8)
- [cool#4535 convert-to compare option: add testcase](https://github.com/collaboraonline/online/commit/17e450a4de0cd6291e1e05763f16e54db13ada6f)
- [cool#13574 redline render mode: send statusupdate with mode=2 when entering doc compare mode](https://github.com/collaboraonline/online/commit/7bf48566de9324f653fc2e2ca17358c8d24d3563)
- [cool#13574 redline render mode: fix missing invalidate after the 2nd enter](https://github.com/collaboraonline/online/commit/464c494bb824af210e9e11399395e3cd768ef04b)
- [cool#13574 redline render mode: extract sendTileCombineMessage() from sendTileCombineRequest()](https://github.com/collaboraonline/online/commit/829a32986b7d813a0fb13766353152006d6c1414)
- [cool#13574 redline render mode: request mode=1 tiles on requesting mode=2 tiles](https://github.com/collaboraonline/online/commit/4d422ea7aaf29a5f8256925e9f1937b866e5ea7d)
- [cool#13988 browser: fire comparedocuments event on selecting a file for doc compare purposes](https://github.com/collaboraonline/online/commit/6094763d13ecca51d8f69edab48598766b12383e)
- [cool#13988 browser, on comparedocuments: send insertfile websocket message](https://github.com/collaboraonline/online/commit/a8bcdbd8e373b617136e53bd76a472fbe17c4a41)
- [cool#13988 kit, insert file: handle the comparedocuments type](https://github.com/collaboraonline/online/commit/6faaa5387b23388bf162a8767aca3ae6b16f6e3e)
- [cool#13988 doc compare: add testcase](https://github.com/collaboraonline/online/commit/9d18df799850256c9995b4a7f275504eae44b50b)
- [cool#13988 doc compare, browser: add a new Action_CompareDocuments PostMessage](https://github.com/collaboraonline/online/commit/8a068c12f2e0b565431012a7a1653770cdf99e18)
- [cool#13988 doc compare, kit: handle comparedocumentsurl file insertion](https://github.com/collaboraonline/online/commit/5dea1513c5701fd178b129ff653295e4690b8f11)
- [cool#14093 browser: show the user name of other text cursors on mouse hover](https://github.com/collaboraonline/online/commit/1e58b2211c120bc3ba4864cc7dda5696fb957aad)
- [cool#14093 add testcase](https://github.com/collaboraonline/online/commit/addd98ec5e4ba3cf7c54149ac82708a2a944c369)
- [cypress, cursor header section: improve testability](https://github.com/collaboraonline/online/commit/7fd64cdc17c0185f0b06146b8c967e32e1af506a)
- [cool#14299 redline render mode: change notebookbar button type to bigcustomtoolitem](https://github.com/collaboraonline/online/commit/97b43daf258d497222b8fa0ae7db3ffcf9fd26c6)
- [cool#13988 redline render mode: add a HTTP parameter to activate this mode on load](https://github.com/collaboraonline/online/commit/289bc381b468fa08ce5129e36f45ef41a6d76d68)
- [cool#13988 redline render mode: fix TilesMiddleware.getMissingTiles()](https://github.com/collaboraonline/online/commit/4e2fe9d2b4c0f907e4ec259c5b841aa60d892a73)
- [cool#13988 redline render mode: improve TilesMiddleware.updateTileDistance()](https://github.com/collaboraonline/online/commit/55572c07b963f46b3184d7f7245c4a720348d31b)
- [cool#13988 redline render mode: fix the HTTP GET parameter](https://github.com/collaboraonline/online/commit/9d3d2654bf20c29e7c4b5d7cb55be0a3279406e6)
- [cool#13988 redline render mode: add missing tiles testcase](https://github.com/collaboraonline/online/commit/1f450e4bab850750d140d8edc37a64d70665301b)
- [cool#13988 redline render mode: add a new CompareChangesLabelSection](https://github.com/collaboraonline/online/commit/4cbbefe0de61e988cf91156b1345b666e38dbcdc)
- [cool#13988 redline render mode: scroll CompareChangesLabelSection](https://github.com/collaboraonline/online/commit/3c975ab0164d9779f3c713ca86d5a4e155f4b5e7)
- [cool#13988 redline render mode: labels can be now multiline](https://github.com/collaboraonline/online/commit/75faeb062b19f2c725f6759c078f60b411fb0505)
- [cool#13988 redline render mode: display author / modification date for both sides](https://github.com/collaboraonline/online/commit/0ef4c6695a3062e5d201cf8ab1e455a46198fe8e)
- [cool#13988 redline render mode: deduplicate the label setup code for the two sides](https://github.com/collaboraonline/online/commit/fc1aa2f72341fb471147b84e45bd47978f25e3e5)
- [cool#13988 redline render mode: center the title vertically when we have no subtitle](https://github.com/collaboraonline/online/commit/e5e9253df85f44ecb4e83b8ddd3a334075d5dffc)
- [cool#13988 redline render mode: avoid doc name when just viewing tracked changes](https://github.com/collaboraonline/online/commit/4e7b90f138a911c2a8390ccc71bcd0e8332666cf)
- [cool#13988 redline render mode: switch to gray/blue backgrounds for the labels](https://github.com/collaboraonline/online/commit/d445f6b207ec5da627d369e45d2612b9b40ddd42)
- [cool#13988 redline render mode: show the old file name in the old label after local compare](https://github.com/collaboraonline/online/commit/6681c51c768c5d0fdda7185a5933a4ec73eff807)
- [cool#13988 redline render mode: try to avoid DOM node touch while drawing](https://github.com/collaboraonline/online/commit/75e80afa5244fcec77bb0712132988b1825fe6e6)
- [cool#13988 redline render mode: show the old file name also with a remote compare](https://github.com/collaboraonline/online/commit/9552891901060d9e8190a196db503c583ed7affc)
- [cool#13988 redline render mode: fix insert/delete tooltip](https://github.com/collaboraonline/online/commit/ee73a3fffff956ef8b220278c0d8db81aa134aea)
- [cool#13988 redline render mode: extract common code from ContentControlSection to CanvasSectionObject](https://github.com/collaboraonline/online/commit/9377a6aafe17e3390fdd23a273881227b5ff727a)
- [cool#13988 redline render mode: add a new TooltipAnchorSection](https://github.com/collaboraonline/online/commit/fd82271030e1b43044dc2ff80c0a064e63c81388)
- [cool#13988 redline render mode: add dynamic color for the tooltip anchor section](https://github.com/collaboraonline/online/commit/5c0d4fa0717f42616edc9e8dc4eb9b46d243173b)
- [cool#13988 redline render mode: don't highlight redline ranges by default](https://github.com/collaboraonline/online/commit/c3d8efdecac38f7cfce04013517e9906dccfdb5c)
- [cool#13770 windows: use LOK's new registerFileSaveDialogCallback()](https://github.com/collaboraonline/online/commit/e75a456b37d5a082354f68b71ec34e0bcdbd8318)
- [cool#13988 redline render mode: highlight both sides](https://github.com/collaboraonline/online/commit/23e5b49f1f46a3160ee8d56549d56a06b8179814)
- [cool#13988 redline render mode: adjust highlight color to text color](https://github.com/collaboraonline/online/commit/63d8119d329b3e09f1b97d0aa8a9b66b43fbcd60)
- [cool#13988 redline render mode: work with last used tile mode when showing tooltip](https://github.com/collaboraonline/online/commit/dc519e8018e63b842eafd84b3b14612f44611a10)
- [cool#13988 redline render mode: add tooltip anchor section cypress test](https://github.com/collaboraonline/online/commit/1f1dca27cc74ae81fc7c0eab0438bffe55583b69)
- [Related: cool#14716 document compare: fix position of the context toolbar](https://github.com/collaboraonline/online/commit/ba76222c1002d9f4f9ddc6612364ffe09563aa5c)
- [Related: cool#14716 document compare: add context toolbar position test](https://github.com/collaboraonline/online/commit/d1610fe671c09345cd7a78845f9f6281c089b027)
- [cool#14716 document compare: fix bad tile position after zoom change](https://github.com/collaboraonline/online/commit/38c139612967cec17d6ccc95057264bc670833be)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).
