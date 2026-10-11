Title: LibreOffice now uses pdfium to render inserted PDF images
Slug: pdfium
Category: libreoffice
Tags: en
Date: 2017-03-20T10:00:22Z

pdfium is the rendering library used in Chromium's pdf viewer. It's based on the foxit pdf renderer
and its rendering quality is much better compared to the pre-existing "convert PDF to ODG, then to
an image" code when it comes to just viewing a PDF file.  First, thanks to [PMG](http://www.pmg.be/)
who made this work possible.

Let's look at a few samples that compare the old pdfimport rendering result and the new pdfium-based
one. One important feature is that embedded fonts are handled. This is how this inserted PDF looked
like previously:

![Old pdfimport rendering result](https://farm4.staticflickr.com/3727/33163219940_3a2a3278a0_o.png)

Compare it with the new result:

![New pdfium-based rendering result](https://farm3.staticflickr.com/2927/33547029855_92c1a5150d_o.png)

Now let's see the front page of a magazine, you can see 4 unexpected artifacts:

![Magazine front page, old rendering](https://farm4.staticflickr.com/3948/33563793222_8a6b8e8a6b_z.jpg)

New result:

![Magazine front page, new rendering](https://farm3.staticflickr.com/2809/33547029645_de7cbcd800_z.jpg)

Finally a problem with pdfium was that LibreOffice got bitmaps from it, so in case you re-exported
to PDF, the quality of these PDF images were worse than in the original PDF file. The PDF
specification has a 'reference XObject' feature that helps in this case: it allows the PDF export to
still write the bitmap to the exported PDF, but in case the reader supports this feature, the
vector-based original file will be shown, not the bitmap.

Here is a simple hand-crafted star in a PDF file, as it looked initially:

![Hand-crafted star, initial look](https://farm3.staticflickr.com/2915/33163219680_30f63b4a82_z.jpg)

This is how it looks after LibreOffice's PDF export learned to emit reference XObjects:

![Hand-crafted star, after PDF export](https://farm4.staticflickr.com/3933/33547029485_4f487bb26c_z.jpg)

All this is available in LibreOffice master, towards 5.4.