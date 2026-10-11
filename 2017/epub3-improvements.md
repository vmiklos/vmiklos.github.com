Title: EPUB3 export improvements in Libreoffice Writer
Slug: epub3-improvements
Category: libreoffice
Tags: en
Date: 2017-12-05T11:11:56Z

I worked on improving the EPUB3 export filter in LibreOffice recently. First, thanks to
[Nou&Off](http://nouenoff.nl/) in cooperation with a customer who made this work possible. Since the
[previous blog entry]({filename}/2017/basic-epub3-export.md) there have been a number of
improvements around 4 topics.

## Improved links

![Red link text coming from a character style](https://farm5.staticflickr.com/4540/38847800651_d5271ced3a_o.png)

The character properties of link text is now handled correctly, in the above example you can see
that the text is red, and this comes from a character style.

## Improved table support

Previously the support for tables was there just to not loose content, now all kinds cell, row and
table properties are handled correctly. A few samples

- custom cell width:

![Custom cell width](https://farm5.staticflickr.com/4566/38847800611_38b8483d7f_o.png)

- custom row height:

![Custom row height](https://farm5.staticflickr.com/4580/38847800521_26285a9152_o.png)

- row span:

![Row span](https://farm5.staticflickr.com/4540/38847800461_359651bc3d_o.png)

So the table support should be now decent, covering row and column spanning and various cell border
properties.

## Improved image support

Previously only the simplest as-character anchoring was supported. Now much more cases are handled.
Two examples:

- image borders:

![Image borders](https://farm5.staticflickr.com/4541/24975193838_94818bd1ed_o.png)

- image with a caption:

![Image with a caption](https://farm5.staticflickr.com/4568/24975193608_83239bf287_o.png)

This includes various wrap types (to the extent HTML5 allows representing ODF wrap types).

## Font embedding

If the user chooses to embed fonts (via File -> Properties -> Font -> Embed), then the EPUB export
now handles this. Here is a custom font that is typically not available:

![Custom font in the Calibre ebook reader](https://farm5.staticflickr.com/4561/38847800811_613d6fbbd2_o.png)

(The screenshot is from the Calibre ebook reader.)

All this is available in master (towards LibreOffice 6.1), or you can grab a [daily
build](http://dev-builds.libreoffice.org/daily/master/) and try it out right now. :-)