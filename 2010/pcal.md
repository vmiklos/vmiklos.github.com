Title: pcal
Slug: pcal
Category: hacking
Tags: en
Date: 2010-12-26T23:41:22Z

I wanted to create some calendar present for Christmas in the family with pictures and Hungarian year / month order, national holidays, etc.

After looking at a few solutions, [pcal](http://pcal.sourceforge.net/pcal-help.html) seemed to be the best choice.

There are 3 key points here:

- The order of the year / month can be changed only in build-time. If your locale has "year month" and not "month year" order, then you need [this patch](https://github.com/vmiklos/vmexam/blob/master/pcal/pcal-4.11.0-order.patch).
- You need some config for each locale, [here is mine](https://github.com/vmiklos/vmexam/blob/master/pcal/calendar_hu.txt), containing the Hungarian national holidays.
- Finally you need a script [like this](https://github.com/vmiklos/vmexam/blob/master/pcal/build-from-scratch.sh) to put in the pictures.

The result fully localized, free software, contains my custom images and support custom marks for days using a quite flexible syntax.

(Let me know if you know some other project where you can set the year/month order runtime and the result can be still generated from a script, ie. it's not some LibreOffice or similar template. ;) )
