Title: Free Software Conference and Exhibition 2013
Slug: szszk-2013
Category: libreoffice
Tags: en
Date: 2013-06-09T12:31:35Z

[![konf2013 logo web](https://lh6.googleusercontent.com/-uoQeGkRqjrA/UbRVYVbk25I/AAAAAAAACzE/sOVvcUNZpc4/s400/konf2013_logo_web.png)](http://konf.fsf.hu/cgis/ossc/2013/)

The Free Software Conference and Exhibition 2013 -- organized by FSF.hu -- was held yesterday @
Budapest. I gave a talk about hacking on Writer file format problems
([slides](https://speakerdeck.com/vmiklos/libreoffice-writer-fajlformatum-problemak-es-megoldasuk)), this time in Hungarian.

After the talk I also held a one-hour workshop, showing how to start hacking on LO in practice:

- first we did a build (using package manager to install dependencies, git clone, autogen, make, make dev-install)
- then we did the [vcl Menu::SetItemText() hack](http://wiki.openoffice.org/wiki/Hacking#My_first_hack) -- actually using `comphelper::string::reverseString()`
- finally I spent some time explaining a few bugfixes from the recent past: I explained a [VML import problem](http://cgit.freedesktop.org/libreoffice/core/commit/?id=a22ef599bd3fdcf0bd5c3616aa566a5922624ff3), an [RTF import problem](http://cgit.freedesktop.org/libreoffice/core/commit/?id=3d4fef85d05269e613316a7af6245f05d207d76e), a [WW8 export mismerge](http://cgit.freedesktop.org/libreoffice/core/commit/?id=4144cd5a851466778004af9de98dbcfb019067bb), finally a [WW8 import issue](http://cgit.freedesktop.org/libreoffice/core/commit/?id=f06cc552a0699f7c2c34db981e77d4c8efe5e9e7)

We (with Andras Timar and Tamas Zolnai) also ran the LibreOffice booth. This
year speakers got a free t-shirt and lunch, thanks for the organizers! :)
