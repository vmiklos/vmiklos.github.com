Title: Start of document themes in Impress: shape text
Slug: sd-theme-shape-text
Category: libreoffice
Tags: en
Date: 2022-01-06T09:07:43+01:00

Impress now has the start of document theme support: it is possible to define a document theme on
master pages and you can refer to the theme colors from shape text (including effects).

First, thanks to our partner [SUSE](https://www.suse.com/) for working with
[Collabora](https://www.collaboraoffice.com/) to make this possible.

## Motivation

PowerPoint users can attach a set of colors (and fonts, formattings) to master pages, and then refer
to these in shape text, shape fill, shape geometry. You can even make the original color lighter and
darker. These effects are preserved when you change the theme colors.

This is a larger feature, this blog post shows how theme colors can be defined and how to refer to
those colors from Impress shape text. The rest of the feature is to be done in follow-up steps.

## Results so far

Here is a demo that shows how it works:

[![Demo of theme support in Impress shape text](https://share.vmiklos.hu/blog/sd-theme-shape-text/sd-theme-shape-text.png)](https://youtu.be/4QeN58AkuxE)

In other words, it consists of 2 parts on the UI:

- You can define theme colors once you click on "Master View" in Impress, and then select the Slide
  -> Slide properties menu item, and there choosing the new Theme tab. You can e.g. make "accent1"
  blue, "accent2" orange, and so on.

- Then you can refer to these theme colors. Select some shape text, and then either use Format ->
  Character -> Font effects -> Font color -> Theme colors or use the sidebar to set the font color.

This later shows a grid of colors: each column is one theme color and then the column offers various
lighter and darker variants of the color.

And the important bit: if you later change theme colors, then the color of shape text (using theme
colors) is updated, even the effects (lighter or darker variants) are preserved.

To set expectations, this only works for shape text for now, and only in Impress, as a start.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. The first step was to
upstream work by [Tomaž Vajngerl](https://tomazvajngerl.blogspot.com/) and [Sarper
Akdemir](https://quwex.com/) from the `feature/themesupport2` feature branch:

- [Theme color and tint/shade attribute for SvxColorItem](https://gerrit.libreoffice.org/c/core/+/125296)
- [Support reading back theme color from an ooxml document](https://gerrit.libreoffice.org/c/core/+/125304)
- [make colorsets work outside of styles and with direct formatting](https://gerrit.libreoffice.org/c/core/+/125313)
- [expose the SvxColorItem theme related uno for draw/impress](https://gerrit.libreoffice.org/c/core/+/125394)
- [implement initial pptx theme color import](https://gerrit.libreoffice.org/c/core/+/125404)
- [rename getSchemeName getSchemeIndex to remove ambiguity](https://gerrit.libreoffice.org/c/core/+/125414)
- [implement color tint or shade import for pptx](https://gerrit.libreoffice.org/c/core/+/125426)
- [introduce XColorSetsManager interface](https://gerrit.libreoffice.org/c/core/+/125436)
- [import pptx color schemes as color sets](https://gerrit.libreoffice.org/c/core/+/125477)

The rest of the work was to go through the usual stages of document model, UNO API, rendering,
ODP/PPTX filter and UI work to complete the work started on the branch:

- [PPTX import: handle <a:clrScheme name="...">](https://gerrit.libreoffice.org/c/core/+/125532)
- [PPTX: implement native handling of <a:clrScheme> children](https://gerrit.libreoffice.org/c/core/+/125651)
- [PPTX import: implement native handling of a color's luminance modulation](https://gerrit.libreoffice.org/c/core/+/125684)
- [PPTX import: implement native handling of a color's luminance offset](https://gerrit.libreoffice.org/c/core/+/125749)
- [tools Color: implement MSO-style luminance modulation/offset filter](https://gerrit.libreoffice.org/c/core/+/126011)
- [svx: update objects of pages of a master page when the theme changes](https://gerrit.libreoffice.org/c/core/+/126082)
- [PPTX export: write the theme for the master pages from the doc model](https://gerrit.libreoffice.org/c/core/+/126164)
- [PPTX export: handle theme colors from the doc model for shape text](https://gerrit.libreoffice.org/c/core/+/126215)
- [svx: consider color effects when updating objects for theme changes](https://gerrit.libreoffice.org/c/core/+/126270)
- [PPTX export: handle theme color of shape text with effects](https://gerrit.libreoffice.org/c/core/+/126400)
- [ODP export: write the theme of a master page](https://gerrit.libreoffice.org/c/core/+/126466)
- [ODP import: handle theme of master pages](https://gerrit.libreoffice.org/c/core/+/126502)
- [ODP import/export: refer to theme from shape text color](https://gerrit.libreoffice.org/c/core/+/126566)
- [ODP import/export: refer to theme from shape text color with effects](https://gerrit.libreoffice.org/c/core/+/126722)
- [sd: add initial theme UI for master slides](https://gerrit.libreoffice.org/c/core/+/126798)
- [sd theme: add UI to set/get the name of a color set](https://gerrit.libreoffice.org/c/core/+/126850)
- [sd theme: add UI to set individual colors of a color set](https://gerrit.libreoffice.org/c/core/+/126905)
- [sd theme: add a "theme" palette to the color picker](https://gerrit.libreoffice.org/c/core/+/126994)
- [sd theme: allow setting the color's theme index in the chardlg](https://gerrit.libreoffice.org/c/core/+/127135)
- [sd theme: allow setting color effects in the chardlg](https://gerrit.libreoffice.org/c/core/+/127211)
- [sd theme: allow setting color effects in the sidebar](https://gerrit.libreoffice.org/c/core/+/127304)

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora intends to
continue supporting and contributing to LibreOffice, the code is merged so we expect all of this
work will be available in TDF's next release too (7.4).