Title: Impress bugfixes, in time for FOSDEM 2017
Slug: fosdem-2017
Category: libreoffice
Tags: en
Date: 2017-01-31T09:17:26Z

![font size change in a table shape](https://farm1.staticflickr.com/334/32605456735_ac88121be8_o.png)

[FOSDEM 2017](https://fosdem.org/2017/) is here this weekend, and as Michael Stahl pointed out,
this (together with the LibreOffice annual conference) are two time periods each year when lots of
Impress bugfixes are made, as people start [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food).
;-) So below you can read about a pair of Impress bugs I fixed recently.

## Changing font size now takes table selection into account

[tdf#105502](https://bugs.documentfoundation.org/show_bug.cgi?id=105502) is a situation where you
have an Impress table shape, and you select part of the cells, then you click on the sidebar to
change the font size. Previously this affected all cells of the table shape, now only the selected
cells are updated.

## Background fill for shapes

![Unexpected red rectangle before the PPT(X) fix](https://farm1.staticflickr.com/277/31761747774_4b1e6b8d38_o.png)

[tdf#105150](https://bugs.documentfoundation.org/show_bug.cgi?id=105150) is a PPT(X) filter bug where
a shape was previously imported as transparent, but it actually has to have the same fill type as
the slide background. In case of PPTX this was already handled in general, but not in case the slide
had no explicit background. The result was that in case the shape was used to cover other shapes,
they were visible, leading to e.g. this unexpected red rectangle on the screenshot.

The same bug was present in the PPT import, though there existing support was even more limited:
just the "background colored objects" were collected, but nothing was done to them. Now the above
use-case should be as good for PPT as it is for PPTX.