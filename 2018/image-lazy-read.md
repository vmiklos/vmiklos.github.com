Title: Lazy reading images from Microsoft formats in LibreOffice
Slug: image-lazy-read
Category: libreoffice
Tags: en
Date: 2018-05-04T09:59:00Z

I worked on improving document load performance of Microsoft formats in general, and DOC/DOCX in
particular in LibreOffice recently. First, thanks to [TDF](https://www.documentfoundation.org/) and
users that support the foundation by providing donations for funding
[Collabora](https://www.collaboraoffice.com/) to make this possible.

I built on top of the [great work of
Tomaz](https://tomazvajngerl.blogspot.com/2018/04/improving-image-handling-in-libreoffice.html), focusing
on these secondary, but important formats.

The idea is that if you load an Microsoft binary or OOXML file, it should not be necessary to parse
all images at load time, it's enough to lazy read it when we first render e.g. a Writer page
containing that image.

The focus here was documents containing large images. I tested with an [Earth
photo](https://www.theverge.com/2012/1/25/2732264/nasas-64-megapixel-photo-of-earth) of size
8000x8000 pixels from NASA, making little modifications to it, so each picture has a different
checksum, embedding them into a binary DOC file.

![Time to load a binary DOC file with 4 large images](https://farm1.staticflickr.com/980/41838412652_c1cbefcfc1_o.png)

I measured the time from the `soffice` process startup to rendering the first page. We defer the
work of loading most images now, as you can see on the chart. In contrast, we used to decompress all
images on file import in the past. This means the new cost for e.g. 4 images is 37% of the original.

All this is available in master (towards LibreOffice 6.1), or you can grab a [daily
build](http://dev-builds.libreoffice.org/daily/master/) and try it out right now. :-)