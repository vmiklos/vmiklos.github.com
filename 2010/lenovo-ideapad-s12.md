Title: Lenovo Ideapad S12
Slug: lenovo-ideapad-s12
Category: hacking
Tags: en
Date: 2010-01-17T20:09:44Z

I bought [this netbook](http://shop.lenovo.com/us/notebooks/ideapad/s-series/s12) about a week ago (the one with the Via card).

Actually it costed 106 kHUF (~$550) instead of the advertised $400, but that probably due shipment costs, etc.

Here are what requirements I had:

- I wanted a simple video card, it's much more important for me that I don't have to use external kernel modules than the actualy 3D performance. So NVidia is clearly an overkill for me. I wanted Intel or similar.
- 12"-sized LCD - my iBook had it and I loved it. I agree that it's too small when we're watching films with 5 other friends or playing games, but I don't do either regularly.
- Touchpad. I don't like trackpoint.

Here is what I got:

- The Via card is so far OK, the openchrome driver has a nice community and at least 2D acceleration works fine, and they are working on the 3D one as well. (Other card types have 3D support, too - This type is just too new ATM.)
- The LCD size is what I want - looks like you can't easily buy a 12" notebook, but a 12" netbook counts as a high-end one.
- Of course it has touchpad.

Let's see what extra does it have:

- VGA output (iBook had some custom output and I never got a VGA converter cable.)
- Bluetooth
- SD-Card reader
- Webcam
- KVM support
- HW mpeg2/4 and dm-crypt support

What's wrong with it:

- The cover is shiny, the mark of the fingers are left there when you grab it.
- No optical driver, but hey, it's a netbook!

Let's see Linux support: First, the machine is shipped with Windows XP. The bios updater is windows-only, so I updated the bios before I rm -rfed the whole preinstalled contents.

What works:

- Via Nano CPU: works fine.
- Via card: after installing the opencrome driver a simple 'xconfig' from frugalwareutils did its job, no other tricks were necessary.
- SATA controller works fine.
- Wired ethernet works fine.
- Wireless: the in-tree b43 works for WPA APs [but not with unsecure ones](http://www.mail-archive.com/bcm43xx-dev@lists.berlios.de/msg09481.html). The binary bcmwl driver works in the later case as well.
- SD-Card reader works out of the box.
- Sound is fine.
- The webcam works with mplayer using the "mplayer -tv driver=v4l2:device=/dev/video0 tv://" command.
- Bluetooth is fine.
- KVM support (vmx flag) is there in the CPU.
- dm-crypt has HW support, so copying to a truecrypt volue isn't slower (~40mb/s) than copying to an unencrypted one.

What does not work with Linux:

- There is no [ideapad-acpi](http://forums.lenovo.com/t5/IdeaPad-Y-and-U-series-Laptops/How-to-turn-on-bluetooth-on-ubuntu-08-10/m-p/179414) module to turn on or off wifi/bluetooth in the Embedded Controller (EC) of the ideapad. In my case I enabled wifi only when I updated the settings of the EC back in Windows, so Bluetooth is disabled. Feel free to post in commends if you have ideas how to set the EC from Linux. ;)
- The 3d and mpeg2/4 decoding HW support of the graphics card doesn't work.
- Hibernation is broken due to the weakness of the openchrome driver.

I think that's all. As always, it's possible that these limitations can be avoided in the future, who knows. ;)

Ah and the battery works for 5 hours with wifi enabled, I think that's nice. (And probably it's due to the LED-powered LCD.)

In case of questions, please post them in the comments and I'll try to reply.

PS: It doesn't really belong here, but if I was at it, I also switched (compared to iBook):

- to x86_64 from ppc
- to ext4 from ext3
- to kde4 from kde3

Update: I did a backup about the config files, reinstalled Windows XP, enabled the bluetooth in EC, and installed i686 for now. So the changes are:

- Bluetooth is now working perfectly
- 2D acceleration is stable (ie. if you start mplayer -vo xv the second time, it won't freeze)
- Suspend to disk works fine, [as it was expected](http://openchrome.org/trac/ticket/321#comment:25).

\o/
