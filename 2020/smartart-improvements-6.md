Title: SmartArt improvements in Impress, part 6
Slug: smartart-improvements-6
Category: libreoffice
Tags: en
Date: 2020-10-02T14:21:37+02:00

Impress now has support for an improved auto-fit-of-text layout across multiple shapes, also the
snake algorithm now handles width requests from constraints much better for SmartArt graphics from
PPTX files. This builds on top of the [previous
improvements]({filename}/2020/smartart-improvements-5.md) around SmartArt support.

First, thanks to our partner [SUSE](https://www.suse.com/) for working with
[Collabora](https://www.collaboraoffice.com/) to make this possible.

## Motivation

SmartArt allows declaring your content and requirements for a graphic, then the layout will take
care of arranging that in a suitable way. It is allowed to ask for an automatic font size, which is
small enough so that all the content fits into the shape. At the same time, you can ask that the
font size is the same in multiple shapes. Impress lacked the ability to do the latter, leading to
different font sizes in different shapes, all automatic inside a single shape.

## Results so far

Here is how the automatic text scaling across multiple shapes works in practice:

![Autofit synchronization, new output](https://lh3.googleusercontent.com/5f-rH0nKGed-6GhBn3bAOMH6sVUeZUeqt2TsFydVSFlL_185Hj6BjNkchKn7DVKpAQmRsg6bGNwKyBIN9bR1sRYacqcKnLYOeqasGZB2IWRohN8mtgFG9aNN_k5ofC_ZqunSeHqIYTc=w640)

![Autofit synchronization, old output](https://lh3.googleusercontent.com/lncpRp13-vUBJH5Kt4ccYHMULGQ8U1Qw8v5z7LmRSE9bv6yjukFMfuiJolCKbVOpjT-85zw_BQMj72dKJLVnMI242CQlIxR7tDUbhBuVaYDuGPRVnAqhCsGbDmGLmyu-7ueA39kNXIg=w640)

![Autofit synchronization, reference output](https://lh3.googleusercontent.com/Go9LGPftmbtFnQXgzxITJVLhEVJF1B13Ge3PGbyKPNEzCJ2zi2DfYBMak92v127PJGYyzjL8V9fTh8Fb_vZXpAdBrBRQizd2onXM8dBka38BkBEi2FE8UP3JCPecKN1m9u8fR591GMM=w640)

You can see how the old output used to have unexpected large text in shape A, but now has the same
text size as shape B. This is not applied unconditionally, shape C can request to have an
independent, fixed font size.

![Snake rows, new output](https://lh3.googleusercontent.com/7IBC-z9NfhP0mjutFPQLPN312AH5Jch6Gss-75kROjLksQ3MnSZnhTodrPDJBm3MmkcQ-rHKvzozgB1O8j8rDBJEkzCf9vgmgrSYa3kH7GqnDS0BgBnlSOWC0GQxVBCIMYX0-Blf_F8=w640)

![Snake rows, old output](https://lh3.googleusercontent.com/4y0pEF3utBcpXMcCsrvrkvnNCdKKyhVlwejiwsI6cMUrA1nV4u1VuE4l1Xhuw60jQYrkeQD54Y0JuB4NR571kwtluUGceclQPZPcYITEyqf0GF1Y7fr_GXNnSRCtnXO1jjtcO_nSLS0=w640)

![Snake rows, reference output](https://lh3.googleusercontent.com/JqIugvyKapfY6Hw0bs7OtWMJ2sj5mdFOv8ebJwZac_BgmuJXKyHxDUdzCj0xZl9zcksXDjdqthce1xrHJzZdGG_024CLbVBSoCmR-X_qFxdWupFwXBa281LId18qezAU80vuT69kGl0=w640)

You can see that the old output laid shapes all over the place, while the new output puts them to a
3 by 2 matrix. The reason this works is because now we parse width requests from constraints
correctly. This means we give spacings a smaller width, real shapes a larger width, so the content
fits in less rows and the layout looks like a grid, matching the reference rendering.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As for the autofit synchronization:

- [svx UNO API for shapes: expose what scaling factor is used for autofit scaling](https://gerrit.libreoffice.org/c/core/+/102266) made it possible to know what is a good scaling factor for one shape

- [svx UNO API for shapes: allow setting a max factor for autofit text scale](https://gerrit.libreoffice.org/c/core/+/102324) made it possible to set the scaling factor, overriding what it would
  calculate by itself. This is a trade-off: setting the scaling factor on the shape inside the
  document model has the benefit that the importer doesn't duplicate any text measuring code. The cost
  is that now there is an UNO property that you can set, but the value of that won't be retained if
  you save to ODF and load the document back. At least not currently

- [oox smartart: add support for syncing font heights of multiple shapes](https://gerrit.libreoffice.org/c/core/+/102490) is the SmartArt code to use the above mentioned building blocks

- [oox smartart: handle `<dgm:prSet ... custT="1"/>`](https://gerrit.libreoffice.org/c/core/+/102689) made it possible to not perform auto-scaling for certain shapes, if they request so

Beyond that, for the snake rows:

- [oox smartart: snake algo: consider child's aspect ratio request for cols/rows](https://gerrit.libreoffice.org/c/core/+/103411) started to improve the grid calculation, so less vertical space is
  needed

- [oox smartart: snake algo: start parsing relative width constraints](https://gerrit.libreoffice.org/c/core/+/103594) allows differentiating between space items on a snake path (small width) and
  shape items, which typically have a larger width

- [oox smartart: snake algo: apply constraints on child shape widths](https://gerrit.libreoffice.org/c/core/+/103629) uses the information collected in the previous step, so the sample document is
  requesting the expected 3 by 2 grid

- [oox smartart: snake algo: make sure child shape height stays within parent](https://gerrit.libreoffice.org/c/core/+/103680) finally makes sure that the content is not falling off the slide,
  which would make it impossible to read when projecting

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora intends to
continue supporting and contributing to LibreOffice, the code is merged so we expect all of this
work will be available in TDF's next release too (7.1).