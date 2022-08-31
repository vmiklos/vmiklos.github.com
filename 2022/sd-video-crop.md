Title: Cropped video for media shapes in Impress
Slug: sd-video-crop
Category: libreoffice
Tags: en
Date: 2022-08-31T14:46:37+02:00

Impress now supports cropped videos in slide edit mode and during slideshow for documents imported
from PowerPoint.

First, thanks to our partner [SUSE](https://www.suse.com/) for working with
[Collabora](https://www.collaboraoffice.com/) to make this possible.

## Motivation

![PowerPoint-style cropped video in Impress](https://share.vmiklos.hu/blog/sd-video-crop/new.png)

PowerPoint handles videos by taking a preview bitmap from the video, and then it allows users to
apply various effects on that bitmap, like cropping. The complex aspect of this is that such filters
are also respected while playing the video as well.

Impress didn't store such properties on the media shape, which lead to distorted aspect ratio when
playing some cropped videos from PPTX files. This lead to this preview in Impress before the work:

![Video with lost cropping in Impress](https://share.vmiklos.hu/blog/sd-video-crop/bad.png)

## Results so far

The first problem was that the Impress preview was picked from the 3rd second of the video
(presumably to avoid a black preview in many videos that start with a short black fade-in), while
PowerPoint can store an explicit preview from the video (seems to be the first frame), so no matter
what effects you apply, the previews were just different as the source bitmap was different. This
could be fixed by looking for an explicitly provided bitmap for the video first, and only then
asking the various `avmedia/` backends to produce a preview.

Once the preview's initial bitmap was OK, it was necessary to take cropping into account. This was
first done for the preview bitmap, and then also for the gstreamer backend (the relevant one for
Linux, as a start) of `avmedia/`, which is responsible for the actual video playback. The gstreamer
bits were done by first creating a
[videocrop](https://gstreamer.freedesktop.org/documentation/videocrop/videocrop.html) element and
then connecting that to the existing
[playbin](https://gstreamer.freedesktop.org/documentation/playback/playbin.html#playbin:video-filter).

With these sorted out, we get rendering which matches the reference:

![Cropped video in PowerPoint](https://share.vmiklos.hu/blog/sd-video-crop/ref.png)

The last step was to load/save the explicit preview and the crop from/to ODF as well, not only PPTX.
We use a markup like this to store the information:

```xml
<style:style style:name="gr1">
  <style:graphic-properties fo:clip="rect(0cm, 1.356cm, 0cm, 1.356cm)"/>
</style:style>
```

And now that the `gr1` automatic style is defined, we can refer to it from a media shape:

```xml
<draw:frame draw:name="test" draw:style-name="gr1">
  <draw:plugin xlink:href="..." xlink:type="simple" xlink:show="embed" xlink:actuate="onLoad" draw:mime-type="application/vnd.sun.star.media">
    ...
  </draw:plugin>
  <draw:image xlink:href="Pictures/MediaPreview1.png"/>
</draw:frame>
```

The nice property of this markup is that automatic styles are already used for other shapes and
image previews are also used for e.g. table shapes, so this is just using existing markup in a new
context, but the ODF spec already allows this markup.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [Related: tdf#149971 svx: support explicitly provided snapshots for media shapes](https://gerrit.libreoffice.org/c/core/+/138763)
- [Related: tdf#149971 avmedia: add doc model and render for crop of media objects](https://gerrit.libreoffice.org/c/core/+/138808)
- [tdf#149971 avmedia: implement video crop support in the gsteamer backend](https://gerrit.libreoffice.org/c/core/+/138867)
- [avmedia: implement video crop support in the ODP filter](https://gerrit.libreoffice.org/c/core/+/138959)
- [xmloff: extract ExportGraphicPreview() from XMLShapeExport::ImpExportTableShape()](https://gerrit.libreoffice.org/c/core/+/138971)

User interface to create such a crop, support for other video effects (e.g. black-and-white) and
other backends (Windows, macOS) could be done, but is future work currently.

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora intends to
continue supporting and contributing to LibreOffice, the code is merged so we expect all of this
work will be available in TDF's next release too (7.5).
