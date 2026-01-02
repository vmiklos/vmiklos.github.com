Title: Bullet improvements in Impress
Slug: sd-bullet-improvements
Category: libreoffice
Tags: en
Date: 2026-01-02T15:21:39+01:00

The bullet support in Impress got a couple of improvements recently, some of this is PPTX support
and others are general UI improvements.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
available in desktop Impress as well.

## Motivation

Probably the most simple presentations are just a couple of slides, each slide having a title shape
and an outliner shape, containing some bullets, perhaps with some additional images. Images are just
bitmaps, so let's focus on outliner shapes and their outliner / bullet styles.

What happens if you save these to PPTX and load it back? Can you toggle between a numbering and a
bullet? Can you return to an outliner style after you had direct formatting for your bullet?

## Results so far

The first case was about bullet editing of this document:

[![Outliner shape with 3 outliner styles](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-1.png)](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-1.png)

If you pressed enter at the end of 'First level', then pressed `<tab>` to promote the current
paragraph to the second level, nothing happened. The reason for this was that our PPTX export was
missing the list styles of shapes, except for the very first list style. And the same was missing on
the import side, too. With this, not only the rendering of the bullets are OK, but also adding new
paragraphs and using promoting / demoting to change levels work as expected.

The second case was about this document, where the second level had a numbering, not a bullet:

[![Outliner shape with a numbering on the second level](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-2.png)](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-2.png)

We only had UI to first toggle off a numbering to no numbering, then you could toggle on bullets.
Now it's possible to do this change in one step.

The last case was about styles. Imagine that you had a master page with an outline shape and some
reasonably looking configuration for the first and second levels as outline styles:

[![Outliner shape with two outline styles](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-3.png)](https://share.vmiklos.hu/blog/sd-bullet-improvements/sd-bullet-improvements-3.png)

And now you go to the start of the first bullet, which is currently connected to the first outline
style, toggle bullets off and then toggle it on again. We used to create direct formatting in this
case, which disconnects it from outline style and your content will look inconsistent if you change
those outline styles later. Now we clear direct formatting when we turn off the bullet, so next time
you turn bullets on, it'll be again connected to the outline style's bullet configuration and the
content will look better on style updates.

Note how this even improves consistency: Writer was behaving the same way already, when toggling
bullets off and then toggle on again resulted in getting rid of previously applied unwanted direct
formatting.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [PPTX export: fix missing non-first level list style for outline shapes](https://git.libreoffice.org/core/commit/6a8b96ddd47af2be3f06e299ee7058438083ba5b)
- [sd doc model dump: allow invoking this from outside sd/ in a debugger](https://git.libreoffice.org/core/commit/ccb9e9ef70c4fae3f69b63083cab838794a3d46d)
- [sd doc model xml dump: show styles](https://git.libreoffice.org/core/commit/e96f2ef1a299c95d83c6a7945fcc92f8f1833112)
- [tdf#168559 PPTX imp: fix missing custom level list style for outline shapes](https://git.libreoffice.org/core/commit/cb108a10479e72b63d32cae020a4ac178e763d14)
- [tdf#168559 PPTX imp: fix missing list style for outline shapes on master pages](https://git.libreoffice.org/core/commit/b2c5d52f733cca2656daa0a2cfdd85a1108635f4)
- [tdf#89365 sd UI: fix transitioning from a numbered list to a bulleted list](https://git.libreoffice.org/core/commit/f60ee00edcc5b0fdee5227bb695448119cddb013)
- [tdf#169275 sd UI: clear direct format when turning off bullet/num](https://git.libreoffice.org/core/commit/0856eee636f512ae2cffc141b7ab3b5065d8beda)
- [sd: extract `FN_TRANSFORM_DOCUMENT_STRUCTURE` handling to a new function](https://git.libreoffice.org/core/commit/122ff49f6ee6b88386cd30a542a92b04c508e47a)
- [sd, FuBulletAndPosition: avoid magic number for bullet toggle](https://git.libreoffice.org/core/commit/1dc25f541784b5e50210af1d5ffb619ec55220f1)
- [Related: tdf#89365 sd UI, from numbering to bullet: fix defaults](https://git.libreoffice.org/core/commit/a26e176abcd40438d19e2a9012db1342bdcaba12)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect the core of this work
will be available in TDF's next release too (26.2).
