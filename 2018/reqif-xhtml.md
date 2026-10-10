Title: Editing ReqIF-XHTML fragments in LibreOffice Writer
Slug: reqif-xhtml
Category: libreoffice
Tags: en
Date: 2018-06-05T10:43:47Z

[![Demo of editing ReqIF-XHTML fragments in Writer](https://farm2.staticflickr.com/1752/28703474708_bde744fb13_o.png)](https://youtu.be/hesL0TWZ5JQ)

I worked on a small feature to use Writer as an editor for the XHTML fragments inside [Requirements
Interchange Format](https://en.wikipedia.org/wiki/Requirements_Interchange_Format) (ReqIF) files.
First, thanks to [Vector](https://vector.com/) for funding
[Collabora](https://www.collaboraoffice.com/) to make this possible.

Writer already supported XHTML import and export before (see my [previous
post](http://vmiklos.hu/blog/odt-xhtml-performance.html)) as a special mode of the HTML filter, this
work builds on top of that. The main speciality around XHTML as used for fragments inside a ReqIF
file is embedded objects.

The special mode to opt-in for ReqIF-XHTML behavior can actived like this:

- during import: `--infilter="HTML (StarWriter):xhtmlns=reqif-xhtml"`
- during export: `-convert-to "xhtml:HTML (StarWriter):xhtmlns=reqif-xhtml"`

Three different cases are handled:

1. Image with native data we don't understand and just preserve.

2. Image with OLE2 data, which we hand out to external applications (at least on Windows). On the
   above video this is an embedded PPSX file, handled by PowerPoint.

3. Image with ODF data, which we handle internally. This is a Draw document on the above video.

Regarding how it works, the import is a series of unwrapping containers till you get to the real
data and the export is the opposite of this. Here are the layers:

- Larger ReqIF files have the `.reqifz` extension, and are ZIP files containing an XML file, having
  the XHTML fragments. This is not relevant for this post, as Writer assumes that extracting the
  XHTML fragment from ReqIF is done before you load the content into Writer.
- XHTML always has a PNG image for the object, and optionally it has RTF as native data for the
  object.
- The RTF file is a fragment, containing just an embedded OLE1 container.
- The OLE1 container is just a wrapper around the real OLE2 container.
- The OLE2 container either has the data directly or MSO has a convention on how to include OOXML
  files in it (see the PPSX example above), and we handle that.

On export we do the opposite: save the file, put it into OLE2, then into OLE1, then into RTF,
finally into XHTML.

There is no specification on how to put ODF files into OLE2, so I extracted the relevant code from
LibreOffice's binary MSO filters and now the Writer HTML filter uses that as well. This avoids code
duplication and also could avoid inventing some new markup this way.

All this is available in master (towards LibreOffice 6.2), or you can grab a [daily
build](http://dev-builds.libreoffice.org/daily/master/) and try it out right now. :-)