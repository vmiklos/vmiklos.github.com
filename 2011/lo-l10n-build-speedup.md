Title: Speeding up build with a lot languages enabled
Slug: lo-l10n-build-speedup
Category: libreoffice
Tags: en
Date: 2011-09-18T00:13:59Z

When we got back from Munich, Andras had an idea what is the current
bottleneck with the build when there are a lot of languages enabled, and
it was the `po2oo` script, which is part of `translate-toolkit`.

First I tried to optimize that script, but then I tried to do the same
gettext-to-SDF conversion from scratch, without using that framework at
all, and it seems that caused a
[drastic speedup](http://article.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/16491).

There were a few iterations, but now the
[two](http://cgit.freedesktop.org/libreoffice/core/commit/?id=1fff8f2576faf3faa141471790ff5d18e0740b0d)
[patches](http://cgit.freedesktop.org/libreoffice/translations/commit/?id=7e0aa0d881f50c9d8fa5c94249e5f892f3725b22)
are in master, along with a fix in
[fast_merge.pl](http://cgit.freedesktop.org/libreoffice/core/commit/?id=47a8454f5f76030203ce6458cf63d4348bdacffe),
which was there since at least commit 654810b (2009-06-17). ;)
