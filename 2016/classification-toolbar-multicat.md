Title: Classification toolbar in LibreOffice: Multiple Categories
Slug: classification-toolbar-multicat
Category: libreoffice
Tags: en
Date: 2016-06-02T08:27:53Z

[![Multiple categories in the classification toolbar](https://farm8.staticflickr.com/7073/26791252053_46f2c7d4ae_z.jpg)](https://farm8.staticflickr.com/7073/26791252053_5cd37892f2_o.png)

I explained the concept of the classification toolbar appearing in LibreOffice
5.2 in a [previous post]({filename}/2016/classification-toolbar.md).
One incremental update on top of that is support for multiple categories,
which I'm describing here.

[TSCP](https://www.tscp.org/) in its
[BAILSv1](http://www.tscp.org/wp-content/uploads/2013/08/TSCP_BAILSv1.pdf) spec
defines 3 different policy types (IntellectualProperty, NationalSecurity and
ExportControl), and you can set different classification categories for
different policy types. Giving a practical example, if you're communicating
with someone, then you can declare what policy type will you be using for that
communication, and tag a single document multiple times, once for all used
policy types.

This multiple-categories feature wasn't supported by LibreOffice previously,
we simply read the IntellectualProperty type from the document, and also only
wrote that. Now the user interface still reacts to the IntellectualProperty
policy type (since in case there are multiple policies and each of them wants
a different e.g. watermark, the UI has to pick one in some way), but other
than that we read all types from the document, all values are shown on the
toolbar and of course you can also set all of them.

All internal APIs and the `.uno` command that can be used from macros take a
type parameter to get/set a given type of category, if wanted.  As usual, you
can try this right now with a 5.2 or
[5.3 daily build](http://dev-builds.libreoffice.org/daily/master/). :-)
