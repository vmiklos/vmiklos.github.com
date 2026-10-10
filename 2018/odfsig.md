Title: odfsig: an Open Document Format (ODF) digital signatures tool
Slug: odfsig
Category: appveyor
Tags: en, cmake, googletest, xmlsec, libreoffice, libzip
Date: 2018-09-23T23:58:46Z

I created a toy project to experiment with a few technologies I wanted to try out
([cmake](https://cmake.org/), [googletest](https://github.com/google/googletest),
[xmlsec](https://www.aleksey.com/xmlsec/) outside LibreOffice,
[libzip](https://libzip.org/) and [AppVeyor](https://www.appveyor.com/)). The result is a tool with
a similar interface as pdfsig from poppler (for PDF files), just for ODF: a cmdline executable to
verify the digital signature(s) in an ODF document.

The [source code](https://github.com/vmiklos/odfsig) now has CI on Linux and Windows, so perhaps in
a shape that is interesting for others to have a look as well. And if not, then no problem, it was
interesting to put together these building blocks and see them working as expected. :-)