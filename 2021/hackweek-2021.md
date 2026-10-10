Title: My hack week at Collabora: improvements to gutter margin in Writer
Slug: hackweek-2021
Category: libreoffice
Tags: en
Date: 2021-04-09T14:48:14+02:00

As mentioned in a [previous]({filename}/2020/hackweek-2020.adoc) such report, a hack week is when
we are allowed to hack on anything we want in LibreOffice / Collabora Office / Collabora Online for
a few days at [Collabora](https://www.collaboraoffice.com/). I used this time to implement core
support for RTL gutter margin in Writer.

## Motivation

I posted about Writer gutter margin in general [back in
February]({filename}/2021/sw-gutter-margin.md), and two follow-up requests accumulated around this
new feature since then.

First, the gutter margin could be on the left or at the top for non-mirrored documents, which
initially sounded like a complete solution, but later it turned out that right-to-left (RTL)
documents [want it on the
right](https://bugs.documentfoundation.org/show_bug.cgi?id=140343).

Second, there was a [request from the OASIS TC
to](https://issues.oasis-open.org/browse/OFFICE-4105) to implement the ODF filter differently for
gutter margin.

Neither of these is simple to do, so this hackweek was a good opportunity to address these problems.

## Results so far

Here is the layout and user interface for RTL gutter looks like:

![RTL gutter margin in Writer, layout and UI](https://share.vmiklos.hu/blog/hackweek-2021/layout-ui.png)

You can see how the gutter is on the right (not the left) and you can alter this behavior with a
dedicated checkbox on the UI.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

<!-- git log --author=vmiklos --since=2021-03-28 --pretty=oneline --reverse --grep gutter -->

- [sw page rtl gutter margin: add doc model](https://git.libreoffice.org/core/commit/67e53dfeadbbc4f4ab207af0d2cd4e8f556b73d4) introduced a new RES_RTL_GUTTER page style property

- [sw page rtl gutter margin: add UNO API](https://git.libreoffice.org/core/commit/bcbf1c245fa13cfbae2059a996006179c7f4b747) added a new public RtlGutter UNO API property

- [sw page rtl gutter margin: add layout](https://git.libreoffice.org/core/commit/c088d26578d1be352efa49bd164a8217627648de) was the tricky layout piece, extending `SwBorderAttrs`

- [sw page rtl gutter margin: add DOCX filter](https://git.libreoffice.org/core/commit/3db477fd0e6cfc4ff77b3c911ca4ab14fd980932) mapped this to DOCX's `<w:rtlGutter>`

- [sw page rtl gutter margin: add ODF import](https://git.libreoffice.org/core/commit/fac65bb9d831a854298d6cba09ad6159d15b8323) mapped this to `<style:page-layout-properties
  style:writing-mode="...">` in case the attribute value is RTL

- [sw page rtl gutter margin: add DOC filter](https://git.libreoffice.org/core/commit/8b7ff52ac87795881a4d86395885778f1da3d18b) mapped this to DOC's SFRTLGutter, amusingly that handling of that
  was somewhat there, but more or less broken since 2002-02-04

- [sw page rtl gutter margin: add RTF filter](https://git.libreoffice.org/core/commit/f15c6c5d2947a61e6521471b6b7541812953efc3) mapped this to RTF's `\rtlgutter` section flag

- [sw page rtl gutter margin: add UI](https://git.libreoffice.org/core/commit/d48a4174708ce0850577dba76dccaf85c4f6ffa1) introduced a new checkbox on the UI to set/get this, and fixed up
  notifications, so that the incremental layout repaints the necessary page frames when this setting
  changes

Finally I had a little bit of remaining time, so I addressed a request from the OASIS ODF TC:

- [sw page gutter margin: reimplement ODF filter](https://git.libreoffice.org/core/commit/f3cf833f7079ce8d2f53681cae1b430a875cc320) changed the ODF markup to be more compatible with readers ignoring
  `<style:page-layout-properties loext:margin-gutter="...">`

## Want to start using this?

Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's
[next release](http://dev-builds.libreoffice.org/daily/master/) (7.2).