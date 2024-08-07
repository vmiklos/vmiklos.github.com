Title: Improved font fallback in the DOCX import of Writer
Slug: sw-improved-font-falback
Category: libreoffice
Tags: en
Date: 2024-08-07T09:05:24+02:00

Writer now has improved support for font fallback when you open a DOCX file that refers to fonts
which are not available currently.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Writer as well.

## Motivation

Font embedding is meant to solve the problems around missing fonts, but you can also find documents
with stub embedded fonts that are to be ignored and our code didn't have any sanity check on such
fonts, leading to unexpected glyph-level fallbacks. Additionally, once font-level fallback happened,
we didn't take the font style (e.g. sans vs serif) into account, which is expected to work when
finding a good replacement for the missing font.

## Results so far

Here is how to the original rendering looked like:

[![Bugdoc, before: ugly glyph-level fallback](https://share.vmiklos.hu/blog/sw-improved-font-falback/old.png)](https://share.vmiklos.hu/blog/sw-improved-font-falback/old.png)

Once the handler for the embedded fonts in ODT/DOCX was improved to ignore stub fonts where even
basic glyphs were not available, the result was a bit more consistent, but still bad. Here is a
different document to show the problem:

[![Bugdoc, first improvement: no glyph fallback but the result is sans](https://share.vmiklos.hu/blog/sw-improved-font-falback/first.png)](https://share.vmiklos.hu/blog/sw-improved-font-falback/first.png)

Note how now we used the same font, but the glyphs are always sans, not serif. So the final step was
to import the font type from DOCX and consider that while deciding font fallback:

[![Bugdoc, second improvement: no glyph fallback and the result is sans / serif](https://share.vmiklos.hu/blog/sw-improved-font-falback/second.png)](https://share.vmiklos.hu/blog/sw-improved-font-falback/second.png)

With this, we ignore stub embedded fonts from DOCX, we import the font type and in general font
fallback on Linux takes the font type into account while deciding font fallback.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [tdf#162002 DOCX import: ignore subsetted embedded fonts for editing](https://git.libreoffice.org/core/commit/a9f3c11375525a7708378dd3648febc40db1ad20)
- [tdf#162002 DOCX import, font embed: only discard subset fonts with few glyphs](https://git.libreoffice.org/core/commit/09da7fd9cec9b36f2e09c1105a9263b83e2c66e4)
- [tdf#162072 vcl, fontconfig: consider font-family-generic for substitute](https://git.libreoffice.org/core/commit/6dfac38bacd449c64a13363797b56aff49cf8f52)
- [Related: tdf#162072 DOCX import: handle font family for characters](https://git.libreoffice.org/core/commit/d06de2e049761b7b9e8a95f17557d309812f7acc)
- [tdf#162280 vcl: consider font family type for glyph caching](https://git.libreoffice.org/core/commit/ef1870810ec8c069e26538fd7626ad0656bed276)

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraoffice.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (24.8).
