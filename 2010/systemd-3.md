Title: Systemd: kernel, bluetooth, bitlbee
Slug: systemd-3
Category: frugalware
Tags: en
Date: 2010-12-27T20:34:11Z

- Finally I can run systemd on my desktop, and not in a virtual machine only, since there is [a patch](http://thread.gmane.org/gmane.linux.kernel/1080727) for the sched/cgroup issue I had. It was not a systemd bug, but systemd triggered a kernel issue, which was hidden so far.
- I just [updated our bluez package](http://frugalware.org/pipermail/frugalware-git/2010-December/055098.html), and bus activation works fine. This means bluetoothd is not started till somebody connects to it. Given that I sometimes do not log in to KDE to use kbluetooth, but just want to do something on the console, where having bluetoothd running is totally unnecessary, I consider this really nice.
- It came up on `#bitlbee` that there is a [Fedora bug](https://bugzilla.redhat.com/show_bug.cgi?id=662289) where they ask for systemd unit files for BitlBee. So I [created a patch](http://bugs.bitlbee.org/bitlbee/ticket/738), and the nice thing is that the second iteration now seems to be fine for Frugalware/Fedora/Debian, so we managed to build something cross-distro here. (I think I mentioned that's the #1 feature I like in systemd.)
