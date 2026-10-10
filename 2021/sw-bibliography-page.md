Title: Bibliography improvements in LibreOffice Writer: refer to a specific page
Slug: sw-bibliography-page
Category: libreoffice
Tags: en
Date: 2021-05-05T11:25:20+02:00

The bibliography feature in Writer allows authors of e.g. scientific papers to track sources: first
you can insert bibliography entry fields, then at the end you can generate a bibliography table
automatically.

Writer recently gained [two improvements in this area]({filename}/2021/sw-bibliography.md), and
now there is one more: the ability to refer to a specific page of a (potentially long) source.

First, thanks [TUBITAK ULAKBIM](https://ulakbim.tubitak.gov.tr/en) who made this work by
[Collabora](https://www.collaboraoffice.com/) possible.

## Motivation

The same feature in normal HTML linking / citation is well-known: you can place anchors in your
document and then links can refer to not only to your page, but also can set the fragment part of
the URL to jump to a specific section directly. E.g.
[this link]({filename}/2021/sw-bibliography.md#_motivation) will jump to the "Motivation"
section of the above referred previous post.

Wouldn't it be nice if you could also jump to a specific page of a scientific PDF?

## Results so far

You can add such references by choosing the Insert -> Table of Contents and Index -> Bibliography
Entry menu item.  Set Bibliography Source to Document Content and press the New button. The
appearing dialog now has widgets to set a specific page number:

![Refer to a specic page of a bibliography source, user interface](https://share.vmiklos.hu/blog/sw-bibliography-page/page.png)

This is then stored in the URL by setting its fragment to `page=...`, and typically PDF readers
understand this syntax, so when you click on the URL, the PDF will open exactly on the cited page.

This also works the other way around: URLs with such syntax are presented to the user with the
dedicated widget to see, edit or delete the page number of the URL.

Finally, if you refer to different pages of the same source, the bibliography text generator detects
this and lists the source in the bibliography only once.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of incremental development steps:

<!-- git log --author=vmiklos --since=2021-01-01 --grep 'bibliography' --pretty=oneline --reverse -->

- [sw bibliography, refer to a page: strip URLs in the bibliography table](https://gerrit.libreoffice.org/c/core/+/111653) improved the bibliography table generator to not show page fragments
- [sw bibliography, refer to a page: de-duplicate bibliography table URLs](https://gerrit.libreoffice.org/c/core/+/111761) merged the idendical sources to a single entry in the bibliography
- [sw bibliography, refer to a page: make the biblio field clickable](https://gerrit.libreoffice.org/c/core/+/112400) allows opening the URL-with-page by clicking on the bibliography entry field
- [sw bibliography, refer to a page: add open hyperlink context menu](https://gerrit.libreoffice.org/c/core/+/112981) implemented the context menu, in case you prefer to avoid ctrl-click for hyperlink opening
- [sw bibliography, refer to a page: add PDF export links](https://gerrit.libreoffice.org/c/core/+/113035) improved the PDF export to have clickable bibliography entry fields
- [sw bibliography, refer to a page: fix biblio field relative URLs](https://gerrit.libreoffice.org/c/core/+/114059) added support for relative URLs, in case the edited document and
  referred PDFs are in the same directory, next to each other
- [sw bibliography, refer to a page: also de-duplicate relative URLs](https://gerrit.libreoffice.org/c/core/+/114104) made the relative URL and bibliography table row merging work together
- [sw bibliography, refer to a page: edit the page number of individual entries](https://gerrit.libreoffice.org/c/core/+/114380) allows editing just a single bibliography entry field for page
  number purposes, since in other cases it makes sense to update all fields of the same source (e.g.
  correcting a spelling mistake in an author name)
- [sw bibliography, refer to a page: add dedicate widget to show the page number](https://gerrit.libreoffice.org/c/core/+/114443), [sw bibliography, refer to a page: save edited page number](https://gerrit.libreoffice.org/c/core/+/114664) and [sw bibliography, refer to a page: add insert/delete UI](https://gerrit.libreoffice.org/c/core/+/114750) add support for creating, showing, editing and deleting page
  numbers of such URLs on the user interface

## Want to start using this?

Collabora intends to continue supporting and contributing to LibreOffice, the code is merged so we
expect all of this work will be available in TDF's
[next release](http://dev-builds.libreoffice.org/daily/master/) (7.2).