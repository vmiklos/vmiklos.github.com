Title: Improved watermark in the PDF export
Slug: pdf-watermark
Category: libreoffice
Tags: en
Date: 2022-12-05T17:07:21+01:00

The PDF export now supports various additional properties for the optional PDF watermark.

First, thanks [Docmosis](https://www.docmosis.com/) for funding this work by
[Collabora](https://www.collaboraoffice.com/).

## Motivation

![Rendering of a PDF watermark with custom rotation and color](https://share.vmiklos.hu/blog/pdf-watermark/rotate-and-color.png)

When you hear the word "watermark", you probably have something like the above picture in mind.

Instead, what the PDF export had is more like a proof of concept:

![Rendering of a PDF watermark with default settings](https://share.vmiklos.hu/blog/pdf-watermark/default.png)

The request was to add new options to control the font size, font name, rotation angle and color of
the watermark, so in case an organization already has a given style of watermarks they prefer, our
PDF export can be adapted accordingly.

## Results so far

First, now you can specify a custom color, e.g. gray (#7f7f7f), using:

```
soffice --convert-to pdf:writer_pdf_Export:'{"Watermark":{"type":"string","value":"draft"}, "WatermarkColor":{"type":"long","value":"8355711"}}' test.odt
```

![Rendering of a PDF watermark with custom color](https://share.vmiklos.hu/blog/pdf-watermark/color.png)

Then you can also customize the font size, in case the automatic size would not fit your needs,
using:

```
soffice --convert-to pdf:writer_pdf_Export:'{"Watermark":{"type":"string","value":"draft"}, "WatermarkFontHeight":{"type":"long","value":"100"}}' test.odt
```

![Rendering of a PDF watermark with custom font size](https://share.vmiklos.hu/blog/pdf-watermark/font-size.png)

Or perhaps you want a serif font, not a sans one:

```
soffice --convert-to pdf:writer_pdf_Export:'{"Watermark":{"type":"string","value":"draft"}, "WatermarkFontName":{"type":"string","value":"Times"}}' test.odt
```

![Rendering of a PDF watermark with custom font name](https://share.vmiklos.hu/blog/pdf-watermark/font-name.png)

Finally you can have a custom rotate angle:

```
soffice --convert-to pdf:writer_pdf_Export:'{"Watermark":{"type":"string","value":"draft"}, "WatermarkRotateAngle":{"type":"long","value":"450"}}' test.odt
```

![Rendering of a PDF watermark with custom rotation](https://share.vmiklos.hu/blog/pdf-watermark/rotate.png)

Using these building blocks, you can also build combinations, the first screenshot above was created
using:

```
soffice --convert-to pdf:writer_pdf_Export:'{"Watermark":{"type":"string","value":"draft"}, "WatermarkRotateAngle":{"type":"long","value":"450"}, "WatermarkColor":{"type":"long","value":"8355711"}}' test.odt
```

i.e. the configuration JSON is:

```json
{
    "Watermark": {
        "type": "string",
        "value": "draft"
    },
    "WatermarkRotateAngle": {
        "type": "long",
        "value": "450"
    },
    "WatermarkColor": {
        "type": "long",
        "value": "8355711"
    }
}
```

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

<!-- s/\([^ ]\+\) \(.*\)/- [\2](https:\/\/git.libreoffice.org\/core\/commit\/\1)/g -->

- [Related: tdf#54053 PDF export: add UNO API to customize the watermark color](https://git.libreoffice.org/core/commit/21c4749d0205d1ba90494edc2527ff9d11f86f87)
- [Related: tdf#54053 PDF export: add UNO API to customize the watermark font size](https://git.libreoffice.org/core/commit/175e514c93b3696faa8c331c8b8f56e832ceb4c1)
- [Related: tdf#54053 PDF export: add UNO API to customize the watermark font name](https://git.libreoffice.org/core/commit/d1dd9b9733511ff451e264169537c08fa14c574f)
- [Related: tdf#54053 PDF export: add UNO API to customize the watermark rotation](https://git.libreoffice.org/core/commit/574db5efa9a2ab6d70faedf538be77a1eb8c597b)

## Want to start using this?

You can get a snapshot / demo of Collabora Office 22.05 and try it out yourself right now: [try the
unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
intends to continue supporting and contributing to LibreOffice, the code is merged so we expect all
of this work will be available in TDF's next release too (7.5).
