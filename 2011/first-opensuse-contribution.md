Title: First openSUSE contribution
Slug: first-opensuse-contribution
Category: opensuse
Tags: en
Date: 2011-11-04T20:13:44Z

More than 3 years ago I
[gave](http://video.google.com/videoplay?docid=-8129703727993942585) a
talk on Frugalware, and part of that was a comparison to various other
distributions, including SUSE. My argument against SUSE was its
closed development process.

Times change, earlier this year they even
[renamed](http://news.opensuse.org/2011/05/26/opensuse-renames-obs/) their
build system to signal its open nature.

I wanted to try it out how open they are so I made an experiment.

First, I created a
[cpm](https://build.opensuse.org/package/show?package=cpm&project=home%3Avmiklos)
package in OBS to get familiar with the packaging process a bit. (Note
that anyone can just register and use the build system to share their
binaries-- sadly we don't have resources in Frugalware to provide
something similar.) Then I happily noticed that their mutt package
already contains my favorite sidebar patch, though the edge of the
sidebar looked [awful](http://vmiklos.hu/pic/mutt-old.png). So on Monday I
mailed the maintainer of the mutt pkg if he would take a patch,
[fixing](http://vmiklos.hu/pic/mutt-new.png) this issue.  I got a positive
reply today, submitted a
[patch](https://build.opensuse.org/request/show/90126) and in minutes it
got accepted.

So it looks like they are really open, which is just cool. :)
