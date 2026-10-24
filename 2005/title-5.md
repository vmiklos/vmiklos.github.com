Title: title 5
Slug: title-5
Category: hacking
Tags: en
Date: 2005-09-23T01:00:53Z

ok, let's write here something usefull. imho you know the problem with sudo + */sbin:
<code>$ sudo modprobe
sudo: modprobe: command not found</code>
the workaround is trivial:
<code>alias sudo="PATH=$PATH:/sbin:/usr/sbin sudo"</code>
:)
