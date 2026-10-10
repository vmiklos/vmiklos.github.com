Title: SmartArt improvements in LibreOffice, part 4
Slug: smartart-improvements-4
Category: libreoffice
Tags: en
Date: 2019-03-22T09:24:07Z

I recently [dived into]({filename}/2019/smartart-improvements-3.md) the SmartArt support of
LibreOffice, which is the component responsible for displaying complex diagrams from PPTX. I focus
on the case when only the document model and the layout constraints are given, not a pre-rendered
result.

First, thanks to our partner [SUSE](https://www.suse.com/) for working with
[Collabora](https://www.collaboraoffice.com/) to make this possible.

## Organization Chart, Cycle Matrix and Picture Strip

In this post I would like to present the progress done earlier this year regarding the above
mentioned diagram types -- these are used in many documents.

The improvement (as always) come in small incremental steps:

- Organization Chart is the most complex type I dealt with so far. I fixed several issues (font
  color, vertical ordering, multiple paragraphs in a data node, size of layout nodes, better support
  for `hierBranch` conditions, the type of connector shapes). This allows giving readable result for
  diagrams which are more complex than the simple 3-node one presented in the previous post.

- Cycle Matrix: there were missing child nodes here, the composite algorithm needed improved
  handling of position / size from constraints and the ordering / fill / line properties of actual
  content also needed fixing.

- Picture Strip: the biggest problem here was the lack of pictures, but also the existing snake
  algorithm needed improvements (size, positioning, spacing and margins of the child shapes were not
  great).

With all these fixed, we reach a much better state for the mentioned diagram types.

## Results so far

The SmartArt test documents from
[sd/qa/unit/data/pptx/](https://cgit.freedesktop.org/libreoffice/core/tree/sd/qa/unit/data/pptx/)
is what I used for testing this work.

Here is how the baseline, the current and the reference rendering of Organization Chart looks like:

![smartart-org-chart.pptx, baseline](https://lh3.googleusercontent.com/IFMh0QgOGTrqjFa9Hn0clhOg5tnLZDt-TZ4kTOT8lF3vPfqTiOu1GmnL0rKLS2MD0XKQ6dJAMm-T4h3BYY6Q4K7C6yVpQo5AQPZCAL4LI4q6Poo-J0bkZ3xM2Iq8WthdmTWxlinlRw=w640)

![smartart-org-chart.pptx, current](https://lh3.googleusercontent.com/m_01y4wA6IclexE7OD92JJnKf_jzC5j2VDXHlVr5BJ7qxzCk4QMdJkhcgiJbzVYp4i1KBsXdHdYS-EAj8-TlUpsSq4m1TZv6SWkTyVl_A4mMRjwOcX_IYFF3QXG7es_fK2RYWbbMYA=w640)

![smartart-org-chart.pptx, reference](https://lh3.googleusercontent.com/PtXv5C_8nxo1uQb9CQe4tCgZbCga2CfFHMV-Xf6l_VQpRhf2psk_9mFFhC0sLjo-EjDS7-hUA7nu83OpaUQt8AOliX_1U0tuT83n0MdzbviySaLcBEiv7QvhHP4UC1P-ieGA7lTDcg=w640)

And here is how the baseline, the current and the reference rendering of Cycle Matrix looks like:

![smartart-cycle-matrix.pptx, baseline](https://lh3.googleusercontent.com/OLqkm14usMrgSbfvujD_xjcclNR5doYpIrTFWipe6bh7Sqa5JiklMpM2pf2LRJq_FH_noojtO5O1jwOdCDEr3ds0PLy370j4oe2vAqyOgTjZUlhoZDqKq1n6_ebYw-wbVyV_MzhLAA=w640)

![smartart-cycle-matrix.pptx, current](https://lh3.googleusercontent.com/dP3etlvuwYC7Gsz02eI2czJ7_2A7bwPjtCtvBnoVAGOZE1X-P8ePru1qntUFEGs8RicDx9vPgaS0M3n1-J1JsyxfdQhR1THqzLr4J6MEa2Dnvigb4jflVL9auckmgf1PobtjGnGInA=w640)

![smartart-cycle-matrix.pptx, reference](https://lh3.googleusercontent.com/vT-wucpcp2sjK6DgYdcYGPx0LlucGb58N06pKczbjBepyS1dokrbs9LUMy6uLrN-AfW4xeXRTONB8asX7u2N7NN3ePag3qrqNtMKW6DOfQeTnRtA3E2n1U1B_-GyGJNP49_HOxBInQ=w640)

And finally here is how the baseline, the current and the reference rendering of Picture Strip looks
like:

![smartart-picture-strip.pptx, baseline](https://lh3.googleusercontent.com/pqGHTyFD78IDwCdHN6qOVH0MXYAouGmuUQ8GGBYEDeDN_bVV_74zJFcwXr1899NsOuqsEERiddYRdyTZurRh6JQXgvMyJSzlsyWI55cURmN6eod-sYxDbfZU9JxOBYH15kukUDB2cw=w640)

![smartart-picture-strip.pptx, current](https://lh3.googleusercontent.com/DeDJLYZkV3_GwcIATCNkurGNUyIVufbM8Q2OWw3uTQzK1BmIB8y_lWa1Zk_SG5RTYtts8SVjvJOD201p7Hf0MbzhMRrdleHAvUewXzQ7mxmtLfp_AP7hCKfSYAsXDExn-pW81268ng=w640)

![smartart-picture-strip.pptx, reference](https://lh3.googleusercontent.com/BhTkpbMpIyFOwFTQUiKtA_g86yRjFKtMeP-lxMos5E4KHg7p7_YEAeJECD_6tuaBlSmU80M6I8HvOgIBMmNFkeXEyVxLp--RmEHTwtNw3ae3QK0Lju5fnD-TrUhVK39TVVwNL4BWZw=w640)

This is not not perfect yet, but it's clearly a large improvement, all text is now readable from the
diagrams and pictures are no longer missing!

All this is available in master (towards LibreOffice 6.3), so you can grab a [daily
build](http://dev-builds.libreoffice.org/daily/master/) and try it out right now. :-)