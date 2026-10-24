Title: Anyremote
Slug: anyremote
Category: frugalware
Tags: en, hacking
Date: 2010-10-02T01:41:00Z

I've been testing [anyremote](http://frugalware.org/packages/103074) during the last week. I'm aware that there is kanyremote and ganyremote available, but I wasn't really interested in those, since they would hide the glory details. :) 

So I decided to give the server mode mode a try and I choosed okular as a test application. My commandline is:

`anyremote -s bluetooth:19 -f /usr/share/anyremote/cfg-data/Server-mode/okular.cfg`

Once I started the server on my notebook I could choose it in the midlet on my phone in the j2me client and it worked as expected.
