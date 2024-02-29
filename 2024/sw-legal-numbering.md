Title: Legal numbering in Writer: DOC and RTF support
Slug: sw-legal-numbering
Category: libreoffice
Tags: en
Date: 2024-02-29T14:32:36+01:00

Writer now support legal numbering for two more formats: DOC and RTF (ODT and DOCX was working
already.)

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), done as a
[HackWeek]({filename}/2022/sw-content-controls3.md) project, but the feature is fully available in
desktop Writer as well.

## Motivation

Legal numbering is a way to influence the number format of values inherited in a multi-level
numbering. Say, the outer numbering uses Roman number and the inner numbering uses X.Y as the number
format, but the inner level wants to display the outer values as Arabic numbers. If this is wanted
(and guessing from the name, sometimes lawyers do want this), then the inner number portion will
expand to values like "1.2" instead of "I.2", while the outer number portions will remain values
like "I".

Mike did [80% of the work](https://bugs.documentfoundation.org/show_bug.cgi?id=150408), what you can
see here is just the RTF/DOC filters.

Picking a smaller feature task like this looked like a good idea, since I wanted to spend some of
the time on regression fixing from last year's multi-page floating table project.

## Results so far

For (binary) DOC, the relevant detail is the `fLegal` bit in the `LVLF` structure. Here is the
result:

[![Improved handling of legal numbering from DOC: old, new and reference rendering](https://share.vmiklos.hu/blog/sw-legal-numbering/2024-02-29-writer-legal-numbering-doc.png)](https://share.vmiklos.hu/blog/sw-legal-numbering/2024-02-29-writer-legal-numbering-doc.png)

It shows how the outer "I" gets turned into "1", while it remained "I" in the past. This works for
both loading and saving.

The same feture is now handled in the RTF filter as well. There the relevant detail is the
`\levellegal` control word, which has an odd 1 default value (the default is usually 0). Here is the
result:

[![Improved handling of legal numbering from RTF: old, new and reference rendering](https://share.vmiklos.hu/blog/sw-legal-numbering/2024-02-29-writer-legal-numbering-rtf.png)](https://share.vmiklos.hu/blog/sw-legal-numbering/2024-02-29-writer-legal-numbering-rtf.png)

It shows that the RTF filter is up to speed with the DOC one by now.

As for the multi-page floating tables, I looked at
[tdf#158986](https://bugs.documentfoundation.org/show_bug.cgi?id=158986) and
[tdf#158801](https://bugs.documentfoundation.org/show_bug.cgi?id=158801).

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [Related: tdf#158986 sw floattable: fix unexpected page break with sections](https://git.libreoffice.org/core/commit/397d72e582c725d162c7e0b819dc6c0bb62e42b0)
- [tdf#158986 sw floattable: fix RTF import of table followed by \sect](https://git.libreoffice.org/core/commit/b7c4c4d45f44a26283678f3dc32982b3a728c614)
- [Related: tdf#150408 DOC filter: handle legal numbering](https://git.libreoffice.org/core/commit/a73b3994fb6a2cc10b2d65cbaad201762610cecc)
- [Related: tdf#150408 RTF filter: handle legal numbering](https://git.libreoffice.org/core/commit/e8487bedb20a429565b4a0e4bd2d6806cc603b7f)
- [Related: tdf#158986 sw floattable, RTF import: use more setNeedPar()](https://git.libreoffice.org/core/commit/c98ff922831f56253af2a050b8e07cfc89b7a387)
- [tdf#158801 sw floattable: fix crash with headers and interactive editing](https://git.libreoffice.org/core/commit/186de7178c6065e1de13fd216b46ac9b716e44c5)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 24.04 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (24.8).
