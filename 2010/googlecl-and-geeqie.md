Title: googlecl and geeqie
Slug: googlecl-and-geeqie
Category: frugalware
Tags: en, hacking
Date: 2010-08-02T12:50:45Z

I recently tested two new Frugalware packages.

googlecl is a commandline utility, I wanted to try it out as it has browser-based authentication, which is supposed to be compatible with Google Apps, while the API-based method used by picu is not. To make it short, in case you are in a directory containing photos for an album and you just want to upload all of them to an album named after the directory name, you need:

```
google picasa create --title $(basename $(pwd)) *.jpg
```

The other package I recently tested is geeqie, it's a replacement (see history [here](http://geeqie.sourceforge.net/)) for gqview I usually use to watch a lot of photos in a directory. And yes, they seem not to break any of the nice feature of the old gqview project, good work! ;)

Update: there is a [patch](http://code.google.com/p/googlecl/issues/detail?id=170) to add sync support, it's usage:

```
google picasa post --title $(basename $(pwd)) --sync *.jpg
```
