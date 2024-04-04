Title: Improve copy&paste in Calc and elsewhere
Slug: sc-clipboard-paste
Category: libreoffice
Tags: en
Date: 2024-04-04T09:50:39+02:00

Calc now supports much better copy&paste when you transfer data between Google Sheets and Calc.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Calc as well.

## Motivation

First, Collabora Online was using the
[deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
`document.execCommand()` API to paste text, which is problematic, as the "paste" button on the
toolbar can't behave the same way as pressing Ctrl-V on the keyboard.

Second, it turns out Google Sheets came up with some additional HTML attributes to represent
spreadsheet data in HTML in a much better way, and Calc HTML import/export had no support for this,
while this is all fixable.

## Results so far

In short, Collabora Online now uses the [Clipboard
API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/read) to read from the system
clipboard -- this has to be supported by the
[integration](https://sdk.collaboraonline.com/docs/advanced_integration.html#allow-the-clipboard-permission-query),
and Calc's HTML filter now support the subset of the Google Sheets markup I figured out so far. This
subset is also
[documented](https://sdk.collaboraonline.com/docs/advanced_integration.html#spreadsheet-html-extensions).

Note that the default behavior is that the new Clipboard API is available in Chrome/Safari, but not
in Firefox.

For the longer version, here are some screenshots:

[![We used to show a popup when you clicked on the paste button on the notebookbar](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-15-cool-clipboard-popup.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-15-cool-clipboard-popup.png)

[![The new paste code in action, handling an image](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-18-cool-clipboard-image-paste.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-18-cool-clipboard-image-paste.png)

[![Import from Google Sheets to Calc: text is auto-converted to a number, bad](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-31-sc-html-import-text-bad.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-01-31-sc-html-import-text-bad.png)

[![Import from Google Sheets to Calc: text is no longer auto-converted to a number, good](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-01-sc-html-import-text-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-01-sc-html-import-text-good.png)

[![HTML import into an active cell edit, only RTF was working there previously](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-02-sc-html-import-celledit-fix.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-02-sc-html-import-celledit-fix.png)

[![Paste from Google Sheets to Calc: text is no longer auto-converted to a number, good](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-07-sc-html-paste-text-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-07-sc-html-paste-text-good.png)

[![Paste from Google Sheets to Calc: booleans are now also preserved](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-08-sc-html-paste-boolean-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-08-sc-html-paste-boolean-good.png)

[![Paste from Google Sheets to Calc: number formats are now also preserved](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-09-sc-html-paste-numfmt-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-09-sc-html-paste-numfmt-good.png)

[![Paste from Google Sheets to Calc: formulas are now also preserved](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-12-sc-html-paste-formula-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-12-sc-html-paste-formula-good.png)

[![Paste from Google Sheets to Calc: also handling a single cell](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-13-sc-html-paste-singlecell-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-13-sc-html-paste-singlecell-good.png)

[![Copy from Calc to Google Sheets: text is now handled, no longer auto-converted to a number](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-14-sc-html-copy-text-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-14-sc-html-copy-text-good.png)

[![Copy from Calc to Google Sheets: booleans are now handled](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-15-sc-html-copy-bool-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-15-sc-html-copy-bool-good.png)

[![Cross-origin iframes also block clipboard access, now fixed](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-20-cool-cross-origin-iframe-clipboard-bad.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-02-20-cool-cross-origin-iframe-clipboard-bad.png)

[![Copy from Calc to Google Sheets: number formats are now also preserved](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-01-sc-html-copy-formatted-number-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-01-sc-html-copy-formatted-number-good.png)

[![Copy from Calc to Google Sheets: formulas are now also preserved](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-04-sc-html-copy-formula-good.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-04-sc-html-copy-formula-good.png)

[![Copy from COOL Writer to a text editor: much better result, new one on the right hand side](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-08-cool-plain-text-copy.png)](https://share.vmiklos.hu/blog/sc-clipboard-paste/2024-03-08-cool-plain-text-copy.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#159483 sc HTML import: handle data-sheets-value attribute for the text case](https://git.libreoffice.org/core/commit/e6e5660b726ecf3b0c39b277568568973b43c9f0)
- [tdf#159483 sc HTML paste: handle data-sheets-value here, too](https://git.libreoffice.org/core/commit/543e52481e764b8e0eea6cf0123a77cf492bdf8e)
- [tdf#159483 sc HTML import: handle data-sheets-value attribute for the bool case](https://git.libreoffice.org/core/commit/f8c95cf93ce9ab8b9b78f3af03411d0cc2e195ba)
- [tdf#159483 sc HTML import: handle data-sheets-value attribute for the num case](https://git.libreoffice.org/core/commit/789964785a61daab5f8065f006dd7aaf843c7236)
- [tdf#159483 sc HTML paste: handle data-sheets-formula attribute](https://git.libreoffice.org/core/commit/7812adb2ed11a3e08be24d3f2f94d14bfd740c55)
- [tdf#159483 sc HTML paste: handle data-sheets- attributes on a span](https://git.libreoffice.org/core/commit/c0da56cb3e9f9678cae7142dee03fb706a2aebd9)
- [tdf#159483 sc HTML export: handle data-sheets-value attribute for the text case](https://git.libreoffice.org/core/commit/4e2a4fbeb7c44cc47b3cf803cbcc6cba63b3d481)
- [tdf#159483 sc HTML copy: handle data-sheets-value attribute for the bool case](https://git.libreoffice.org/core/commit/411158832462b1077a8f5dc6379f2056f2338249)
- [tdf#159483 sc HTML copy: handle data-sheets-value attribute for the num case](https://git.libreoffice.org/core/commit/17581e684ca701bfd96ed2bf16aa14c3903b74d4)
- [tdf#159483 sc HTML copy: handle data-sheets-formula attribute](https://git.libreoffice.org/core/commit/2efe362c99a9fa6e9a71b9b675b025c64b6c7f9d)

The tracking issue on the Online side was [cool#8023](https://github.com/CollaboraOnline/online/issues/8023).

## Want to start using this?

You can get a snapshot / demo of Collabora Office 24.04 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.8).
