Title: LibreOffice 3.4 Packaging
Slug: libreoffice-3.4-packaging
Category: libreoffice
Tags: en
Date: 2011-05-04T16:05:54Z

The next major LibreOffice version, 3.4, means some work for (Linux
distribution, and other) packagers, as the `build` repo is now
deprecated and packagers are suggested to use the `bootstrap` repo
directly, which is a different build system.

On one hand, this is a nice cleanup - there is now a single configure
script. OTOH this needs major rework of distro build scripts.

The interesting part here is that the official binary installers are not
using the `make DESTDIR=/some/path install` method to install the
compiled binaries, so it was discovered quite late that it wasn't
working properly. First Hanno and Petr
[worked on this](http://cgit.freedesktop.org/libreoffice/bootstrap/commit/?id=c612724331a3d66d2ee488d91161a54f4d3576bd), then I
[fixed](http://cgit.freedesktop.org/libreoffice/bootstrap/commit/?id=b9dd2241c60635ba15929ffad9962928460bd3ec)
a minor, but blocking glitch.

As a result 3.4 beta4 will be something packagers (even the ones not
using the split build) can offer to distro users for testing without
patching. Binaries for Frugalware users
[here](http://ftp.frugalware.org/pub/other/people/vmiklos/lotesting/frugalware-i686/)
(i686-only at the moment).
