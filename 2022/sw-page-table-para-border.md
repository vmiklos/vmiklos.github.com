Title: Word-style border fixes in Writer: pages, tables and paragraphs
Slug: sw-page-table-para-border
Category: libreoffice
Tags: en
Date: 2022-03-08T12:11:27+01:00

Writer now has a set of improvements to better render Word-style borders around pages, tables and
paragaphs. This required adjusting how we perform automatic mirroring and also to make sure that
clipping is done the Word way.

First, thanks [Docmosis](https://www.docmosis.com/) and [TUBITAK](https://www.tubitak.gov.tr/en) who
made this work by [Collabora](https://www.collaboraoffice.com/) possible.

## Motivation

Word users expect to able to import their documents to Writer and experience high fidelity
rendering: this means Writer has to support the way page / table / paragraph borders are painted
according to the OOXML model as well. This is all done conditionally, so existing ODF documents are
left unchanged.

This is a set of 5 bugfixes, requested by multiple of our customers.

## Results

First let's look at the new render result for page borders:

![Word-style page borders, new result](https://share.vmiklos.hu/blog/sw-page-table-para-border/page-border-new.png)

And this is how it used to look like:

![Word-style page borders, old result](https://share.vmiklos.hu/blog/sw-page-table-para-border/page-border-old.png)

Finally you can compare that with the reference:

![Word-style page borders, reference](https://share.vmiklos.hu/blog/sw-page-table-para-border/page-border-ref.png)

What you can see here is that the page has a double border: the outer line is thick and the inner
line is thin. The right and bottom border was incorrect as our result was the opposite of the
reference.

Second, let's look at the new render result for table borders:

![Word-style table borders, new result](https://share.vmiklos.hu/blog/sw-page-table-para-border/table-border-new.png)

And this is how it used to look like:

![Word-style table borders, old result](https://share.vmiklos.hu/blog/sw-page-table-para-border/table-border-old.png)

Finally you can compare that with the reference:

![Word-style table borders, reference](https://share.vmiklos.hu/blog/sw-page-table-para-border/table-border-ref.png)

You can notice a number of problems here:

- the inner horizontal line at the top table was overrunning, it was even painted between the two
  lines of the outer double border

- the middle table shows how the vertical thick and thin lines of the outer double border was
  reversed

- the bottom table shows how the horizontal tick inner border was not consistent

The new render result properly clips the inner border lines, so they don't intersect outer borders,
and the border mirroring (similar to the page borders) is now correct for table borders as well.

Third, let's look at the new render result for paragraph borders:

![Word-style paragraph borders, new result](https://share.vmiklos.hu/blog/sw-page-table-para-border/para-border-new.png)

And this is how it used to look like:

![Word-style paragraph borders, old result](https://share.vmiklos.hu/blog/sw-page-table-para-border/para-border-old.png)

Finally you can compare that with the reference:

![Word-style paragraph borders, reference](https://share.vmiklos.hu/blog/sw-page-table-para-border/para-border-ref.png)

What's visible here is that some paragraph inside the table cell had borders defined, but due to how
the reference clips these borders, this border was not visible. That unexpected border is now also
omitted in Writer.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of bugfix changes.

For the page border:

- [sw: fix swapped inner vs outer border for Word-style right/bottom page borders](https://gerrit.libreoffice.org/c/core/+/129281)

For the table border:

- [sw: fix too long inner borders intersecting with outer borders for Word cells](https://gerrit.libreoffice.org/c/core/+/128053)
- [sw: fix swapped inner vs outer border for Word-style left table borders](https://gerrit.libreoffice.org/c/core/+/128289)
- [sw: fix swapped inner vs outer border for Word-style bottom table borders](https://gerrit.libreoffice.org/c/core/+/128383)

For the paragraph border:

- [sw: fix unexpected paragraph border inside table cells](https://gerrit.libreoffice.org/c/core/+/128569)

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora intends to
continue supporting and contributing to LibreOffice, the code is merged so we expect all of this
work will be available in TDF's next release too (7.4).