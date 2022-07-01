Title: Document themes in Impress: shape fill
Slug: sd-theme-shape-fill
Category: libreoffice
Tags: en
Date: 2022-07-01T16:05:21+02:00

Impress now has the next step of document theme support: it is possible to refer to the theme colors
from shape fill colors (including effects).

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but the feature is
fully available in desktop Impress as well.

## Motivation

![PowerPoint-style themed shape fill, user interface](https://share.vmiklos.hu/blog/sd-theme-shape-fill/ui.png)

PowerPoint users can attach a set of colors (and fonts, etc.) to master pages, and then refer to
these in many areas, like shape text or shape fill. It was already possible to define theme colors
and refer to them from shape text (see [Start of document themes in Impress: shape
text]({filename}/2022/sd-theme-shape-text.adoc) for details).

The next step in this journey is shape fill: if your shape is filled with some color, it can be a
theme color, as visible on the above screenshot. One interesting aspect of this is that the default
shape fill color can now depend on the master page, and it may not be the same for all slides (this
is what would happen with styles, when not using theming).

## Results so far

Here is a demo that shows how it works:

If one opens the `svx/qa/unit/data/theme.pptx` test file from core.git, it looks like this:

![PowerPoint-style themed shape fill, after opening](https://share.vmiklos.hu/blog/sd-theme-shape-fill/old.png)

The middle row has 3 rounded rectangles: the first is filled with the 'Accent 1' color, the second is
the same, but 60% lighter and finally the last one is the same, but 25% darker.

Here is how you can change what the 'Accent 1' color is:

- Click 'Master View' on the sidebar to go to the master of the current slide.
- Right click -> 'Slide Properties' opens the 'Slide Properties' dialog.
- The 'Theme' page has an 'Accent 1' row, with a blue color.
- Change that to an orange color: click on the 'Accent 1' drop-down, then select 'Theme colors',
  finally the 6th choice is orange in the first row -- this comes from the document's theme.
- Click 'OK' to close the dialog, followed by 'Close Master View' on the sidebar.

Here is how your shapes now look like:

![PowerPoint-style themed shape fill, after changing the theme](https://share.vmiklos.hu/blog/sd-theme-shape-fill/new.png)

What you can see here is that the color effect (darker, lighter, default) of the rounded rectangles'
fill color was preserved, but all the blue colors are replaced with orange.

As a cherry on the cake, now if you insert a new shape, that will also have an orange fill color by
default as well.

You can see how this is useful when designing templates: a designer can create something
good-looking, and all you have to do is to set the theme to the colors of your organization, and
you're done.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sd theme: fix applying new colors after theme change for group shapes](https://gerrit.libreoffice.org/c/core/+/128248)
- [sd theme: add doc model for shape fill color](https://gerrit.libreoffice.org/c/core/+/130050)
- [sd theme: add UNO API for shape fill color](https://gerrit.libreoffice.org/c/core/+/130467)
- [sd theme: add rendering for shape fill color](https://gerrit.libreoffice.org/c/core/+/130894)
- [sd theme: add PPTX import for shape fill color](https://gerrit.libreoffice.org/c/core/+/131268)
- [sd theme: add ODP import/export for shape fill color](https://gerrit.libreoffice.org/c/core/+/131717)
- [sd theme: add PPTX export for shape fill color](https://gerrit.libreoffice.org/c/core/+/131984)
- [sd theme: add UI (area dialog) for shape fill color](https://gerrit.libreoffice.org/c/core/+/132327)
- [sd theme: add UI (sidebar) for shape fill color](https://gerrit.libreoffice.org/c/core/+/132646)
- [sd theme: add UNO API for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/132933)
- [sd theme: add rendering for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/133297)
- [sd theme: add PPTX import for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/133525)
- [sd theme: add ODP import/export for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/133843)
- [tdf#148929 sd theme: limit PPTX import for shape fill effects to lum mod/off](https://gerrit.libreoffice.org/c/core/+/133908)
- [tdf#148961 sd theme: add PPTX export for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/134208)
- [sd theme: add UI (area dialog) for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/134552)
- [tdf#149205 sd theme: fix PPTX export loosing dk1 and lt1 colors](https://gerrit.libreoffice.org/c/core/+/134883)
- [sd theme: add UI (sidebar) for shape fill color effects](https://gerrit.libreoffice.org/c/core/+/134952)
- [sd theme: consider accent1 color when inserting shape with solid fill](https://gerrit.libreoffice.org/c/core/+/136138)
- [tdf#149748 sd theme: fix crash on selecting none from color bar](https://gerrit.libreoffice.org/c/core/+/136599)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.4).
