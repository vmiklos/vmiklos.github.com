Title: Bibliography improvements in LibreOffice Writer
Slug: sw-bibliography
Category: libreoffice
Tags: en
Date: 2021-03-24T12:18:17+01:00

The bibliography feature in Writer allows authors of e.g. scientific papers to track sources: first
you can insert bibliography entry fields, then at the end you can generate a bibliography table
automatically.

Writer now has two improvements in this area: more information about these entries in the form of a
mouse tooltip and clickable URLs in the table.

First, thanks [TUBITAK ULAKBIM](https://ulakbim.tubitak.gov.tr/en) who made this work by
[Collabora](https://www.collaboraoffice.com/) possible.

## Motivation

Generating a bibliography (table) for a document is a two-step process: first the user inserts
bibliography entry fields to refer to sources, then later the bibliography can be auto-generated. It
was not great that details of a source was only visible in the Writer edit window after generating
the bibliography table. A somewhat related shortcoming was that URLs of sources were handled as
plain text, while users expect that references are also clickable, similar to e.g. table of
contents.

## Results so far

This is how a tooltip looks like, available even if there is no bibliography table yet:

![Tooltip for bibliography entry fields](https://share.vmiklos.hu/blog/sw-bibliography/tooltip.png)

And URLs in the bibliography table are now clickable:

![Clickable URLs in the bibliography table](https://share.vmiklos.hu/blog/sw-bibliography/url.png)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of incremental development steps:

<!-- git log --author=vmiklos --since=2021-01-01 --grep 'bibliography' --pretty=oneline --reverse -->

- [sw tooltip on bibliography fields: add an SwTOXInternational factory](https://gerrit.libreoffice.org/c/core/+/110705) and [sw tooltip on bibliography fields: add a text factory that gives us a string](https://gerrit.libreoffice.org/c/core/+/110712) were necessary refactors to get a
  string that looks like a row in the bibliography table, without having an empty bibliography table
  at hand
- [sw tooltip on bibliography fields: add the actual tooltip functionality](https://gerrit.libreoffice.org/c/core/+/110765) improved the UI to have a tooltip
- [sw bibliography: make URLs in the bibliography table clickable](https://gerrit.libreoffice.org/c/core/+/111117) implemented the clickable URLs feature

## Want to start using this?

Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's
[next release](http://dev-builds.libreoffice.org/daily/master/) (7.2).