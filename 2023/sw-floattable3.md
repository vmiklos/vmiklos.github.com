Title: Multi-page floating tables in Writer: from row deletion to page breaks
Slug: sw-floattable3
Category: libreoffice
Tags: en
Date: 2023-05-03T08:40:28+02:00

Writer now has continued steps to handle tables that are both floating and span over multiple pages.

This work is primarily for [Collabora Online](https://www.collaboraoffice.com/), but is useful on
the desktop as well. See the [second post]({filename}/2023/sw-floattable2.md) for background.

## Motivation

The previous post finished with cursor traversal: if a floating table is on both page 1 and page 2,
then you expect Writer to be able to move between the rows of the table, even if those are not on
the same page. In this post, we'll see what else started to work during the past month.

## Results so far

The feature is enabled by default and now the DOCX/DOC/RTF import makes use of it if. This allows
stress-testing the layout code with complex user documents, hopefully with the found breakage fixed
before it would be released in a stable version.

On the positive side, core.git repository has has 19 files now which are focusing on correct
handling of floating tables.  Also, there are additional tests that quickly build a specific
multi-page floating table in the memory and do some operation on it, e.g. delete the last row and
assert what happens.

Here are some screenshots from the effort so far:

![Editing of floating tables: delete the last row of a table with 3 rows](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-03-floattable-edit-3rd-row-delete-good.png)

The first case is about editing: if a floating table had a first, middle and last page, then
deleting the last row of a table lead to incorrect layout, which is now fixed.

![Selection & dragging of split floating tables](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-04-floattable-follow-select-good.png)

An odd problem is that the vertical position of tables on non-first pages is generated by the
layout, which means that normal drag&move to position them won't work, leading to annoying jumps.
This is now fixed by selecting the first (master) fly frame on click, and you can always reposition
that table (even vertically.)

![Bad binary DOC import](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-12-floattable-ww8-bad.png)

Once DOCX import/export was there, the next step is binary DOC import, which gives us access to a
larger corpus of test documents, to stress-test the layout code. This shows how the binary DOC
import looked before the work.

![Good binary DOC import](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-13-floattable-ww8-good.png)

And this one shows how it works now.

![Good binary DOC export](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-14-floattable-ww8-export-good.png)

DOC import is not enough, e.g. Collabora Online will save your documents automatically, so we
really want to export everything that is possible to import. Here is how good DOC export looks like
in Word.

![In-footer floating table](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-17-floattable-in-footer.png)

At this point the first crashtest results arrived (we try to import about 280 thousand documents
and see what crashes). The first problem was floating tables in footers. Well, we should not try to
split such tables (even if they don't fit): adding one more page does not give us more footer space.

![Bad RTF import](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-18-floattable-rtf-bad.png)

Similar to the DOC filter, RTF can express floating tables. Here is how we did a bad rendering of an
RTF document before.

![Good RTF import](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-19-floattable-rtf-good.png)

And here is how we import it currently. The RTF control words are quite close to the binary DOC
markup semantically, just the syntax is different.

![Bad RTF export](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-20-floattable-rtf-export-bad.png)

The RTF export side was also missing, as visible in Word, before the work.

![Good RTF export](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-21-floattable-rtf-export-good.png)

And this is how the good RTF export result looks like in Word.

![Floating table in a section](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-24-floattable-in-section.png)

Another crashtest find was that sometimes we map Word's continuous section breaks to Writer
sections, so we can't assume that tables are anchored directly in body frames. This is now fixed.

![Correct handling of the TableRowKeep flag in floating tables](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-25-floattable-table-row-keep.png)

A related problem was that non-floating tables have a trick, that we call the TableRowKeep mode. If
this is on (which is the default for documents imported form Word), a table row will stick to the
next table row (we try to keep them on the same page) if the first cell's first paragraph in that
row has the "keep with next" paragraph property specified. It turns out, this should be ignored when
the table is floating.

![Page break before a floating table](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-26-floattable-break-before.png)

A next problem was that some page breaks simply disappeared. It turns out that we need to transfer
the "break before" property from the table to the table anchor (paragraph) to get the desired
layout, since page breaks are generally ignored inside text frames.

![Handling of 2 times nested tables, middle one is floating](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-27-floattable-nested-nocrash.png)

All combinations of nesting with floating tables is not yet handled, but at least we should not
crash when the user tries to do that. Here is 3 tables, nested in each other, the second table is
marked to be floating.

![Handling of a floating table, immediately followed by an other table](https://share.vmiklos.hu/blog/sw-floattable3/2023-04-28-floattable-then-table.png)

The last fixed problem is when a floating table is immediately followed by an other, non-floating
table. Given that we try to anchor the floating table in the next paragraph, the layout could not
handle this previously, but now we ensure that each floating table is followed by a paragraph.

And that's where we stand. Hope to address all problems reported by crashtesting soon. Once that
happens, it may be possible to switch from bugfixing mode to feature mode again, e.g. better
handling of overlapping or nested tables could be done.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [sw floattable: fix removal of empty master flys on master table removal](https://git.libreoffice.org/core/commit/1006fd848ba7c67927472e53df7f3b6f682fadfb)
- [sw floattable: fix removal of last follow fly with a start/middle one](https://git.libreoffice.org/core/commit/96df0ad0da6e8972a828721dac6b4ba7c69eba85)
- [tdf#61594 sw floattable: import floating tables as split flys by default](https://git.libreoffice.org/core/commit/ce3308a926f036b87515b8cd97d2b197063dc77a)
- [sw floattable: remove no longer needed DOCX import heuristics](https://git.libreoffice.org/core/commit/c50bf5a5daaae3d40f89ea0784a75a8a571c208d)
- [sw floattable: don't try to set left margin as cell property](https://git.libreoffice.org/core/commit/8f9523b3ef464731afed61a253c958644fca6335)
- [sw floattable: restrict selection of follow flys](https://git.libreoffice.org/core/commit/17367a67cd39109006060176b04bc2b174a17e48)
- [sw floattable: limit the unfloat button to legacy ODF files](https://git.libreoffice.org/core/commit/ab639ae344704cd22318938cfeafbe954abcd2c0)
- [sw floattable: unconditionally map DOC table pos props to SwFormatFlySplit](https://git.libreoffice.org/core/commit/69fe424e426957545a30e1b912c933e1e7693100)
- [sw floattable, layout: don't split inside headers/footers](https://git.libreoffice.org/core/commit/16b59cee44c7f728b2fe6d7b624c494f649ee79f)
- [sw floattable: fix CppunitTest\_sw\_ww8export's testTdf112346](https://git.libreoffice.org/core/commit/2424fa9c601003a9778bbc3a9cf0f55d33ead6f1)
- [sw floattable: fix CppunitTest\_sw\_ww8export2's testTdf80635\_marginLeft](https://git.libreoffice.org/core/commit/1ee5ae0eec2d1c673af6b8f18a2c36b4d1e7fb70)
- [sw floattable: fix CppunitTest\_sw\_ww8export2's testTdf80635\_marginRTL](https://git.libreoffice.org/core/commit/eb65f881da9c63636bc07eca735fd2bc01854fd6)
- [sw floattable: fix CppunitTest\_sw\_ww8export2's testTdf80635\_pageLeft](https://git.libreoffice.org/core/commit/115a4eb944f6a49def1ba8e826c3258389aeab10)
- [sw floattable: fix CppunitTest\_sw\_ww8export2's testTdf80635\_pageRightRTL](https://git.libreoffice.org/core/commit/cfa463cc5446e72a06db5a457bf4d50d4173f31e)
- [sw floattable: import floating tables from DOC as split flys by default](https://git.libreoffice.org/core/commit/61be351ac83acec75788d2f79a9038486163160f)
- [sw floattable: remove no longer needed DOC import heuristics](https://git.libreoffice.org/core/commit/6e8a89b762d625adc10227402de506c7a632e073)
- [sw floattable, crashtesting: fix PDF export of forum-mso-de-117064.docx](https://git.libreoffice.org/core/commit/a1c5f77d3ee7c9907c8247aa0e896e07fe9427b6)
- [sw floattable: remove no longer needed ImportFloatingTableAsSplitFly setting](https://git.libreoffice.org/core/commit/5c59d6f51f837639f1f0f24e154814136bbdfda9)
- [sw floattable, crashtesting: fix PDF export of fdo80989-1.docx](https://git.libreoffice.org/core/commit/e0017ad2a5b008111b716c0814c5a0c5b0f1e05b)
- [sw floattable, crashtesting: fix PDF export of fdo72790-1.docx, part 1](https://git.libreoffice.org/core/commit/3c2e4d454aaabcd61593e670a90638a185046539)
- [sw floattable, crashtesting: fix PDF export of fdo72790-1.docx, part 2](https://git.libreoffice.org/core/commit/9c23f533d6749e94971f04e18f1537472cac6b86)
- [sw floattable, crashtesting: fix PDF export of fdo72790-1.docx, part 3](https://git.libreoffice.org/core/commit/73bada774ef37efd5a4498ccc083b1358314557d)
- [sw floattable: DOCX import: m\_bConvertedTable is now unused](https://git.libreoffice.org/core/commit/400d970f27078a93eab97ead8a6934a32272f549)
- [sw floattable, crashtesting: fix PDF export of fdo72790-1.docx, part 4](https://git.libreoffice.org/core/commit/4b6b9411e4ac912817dd804782ad2054bc0d1660)
- [sw floattable, crashtesting: fix PDF export of tdf114111-3.docx](https://git.libreoffice.org/core/commit/1795d5183d5371a24e8dcb15f8671c78b2c94665)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 23.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.6).