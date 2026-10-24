Title: Upgrading to Haven
Slug: upgrading-to-haven
Category: frugalware
Tags: en, hacking
Date: 2010-08-26T17:31:27Z

I just upgraded my box at work to Haven, here is a short post to mention two links:

- ATM you need to [manually upgrade](http://www.nvnews.net/vbulletin/showthread.php?p=2288105) nvidia-173xx if you have it installed (after -Syu) due to lack of xorg-server-1.8 support.
- I needed [this xorg config tweak](http://bugs.gentoo.org/show_bug.cgi?id=153115#c8) to get my up arrow working again.

Other than that, I removed my xorg.conf and instead I put [this](http://frugalware.org/~vmiklos/docs/config/xorg.conf.d/30-nvidia173.conf) to the xorg.conf.d dir. I also added "nouveau.modeset=0" to /boot/grub/menu.lst.

What else.. ah yes, I needed to change the keyboard model to evdev in the KDE System Settings.

Other than that, it went fine. :)

Update: the nvidia-173xx part is now fixed in both [current](http://frugalware.org/pipermail/frugalware-git/2010-August/047941.html) and [stable](http://frugalware.org/pipermail/frugalware-git/2010-August/047942.html).
