Title: Recent hacks, upgrade
Slug: recent-hacks-upgrade
Category: hacking
Tags: en
Date: 2010-04-01T00:57:28Z

- ooo-build: [two](http://cgit.freedesktop.org/ooo-build/ooo-build/commit/?id=5692b89ec72d22e43580c54a01131c7b4cc5c5c6) [fixes](http://cgit.freedesktop.org/ooo-build/ooo-build/commit/?id=d29f754f0dd89399c1e885071c3712ea6fe500fa) for the configure script (perl, rsync)
- the irssi script that renames facebook "u$bigint" nicks to real names based on whois info stripped chars with accents. a [oneliner patch](http://frugalware.org/~vmiklos/patches/bitlbee-facebook-accents.patch) makes it possible not to drop chars with accents, just convert them to ascii.
- The dazuko m8r [merged](http://www.mail-archive.com/dazuko-devel@nongnu.org/msg00469.html) my Linux-2.6.33 patch. \o/

The rest of this entry is not about programming in fact - I upgraded a machine at work from Frugalware-1.1 to 1.2 and I though it may worth noting a few interesting facts:

- The attitude of [this bug](https://bugs.kde.org/show_bug.cgi?id=167558) is like the famous [glibc one](http://sourceware.org/bugzilla/show_bug.cgi?id=4980). In short: kde3 supported having the same wallpaper on two screens by automatically splitting it up - now looks like kde4 does not. I ended up splitting the wall up using GIMP as well. :P
- kookaa is [not really ported](http://techbase.kde.org/Projects/Kooka#KDE4_Porting) yet to kde4 so I needed to switch to kolourpaint.
- While upgrading cups, I hit [this bug](https://answers.launchpad.net/hplip/+question/89196) as well. (Notice how Ubuntu calls bugs "answers". ;) )
