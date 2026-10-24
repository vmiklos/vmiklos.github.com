Title: Globalsat BT-338X GPS
Slug: globalsat-bt-338x-gps
Category: frugalware
Tags: en, hacking
Date: 2010-08-27T02:46:00Z

Yesterday I bought a cheap GPS data logger / receiver, and given that the attached install CD did not support Linux, I'm collecting some hopefully useful links here.

- The [OpenStreetMap](http://wiki.openstreetmap.org/wiki/GPS_Reviews#Globalsat_BT-338) wiki had an incorrect statement about the device has no memory - it has.
- [Vendor homepage](http://www.globalsat.com.tw/products-page.php?menu=2&gs_en_product_id=6&gs_en_product_cnt_id=56). ([Hungarian one](http://speedshop.hu/main.php?page=termek&iid=44261).)
- A [blog post](http://blog.pjvenda.net/2007/09/my-new-toy-globalsat-dg-100-gps-data.html) about [gpsbabel](http://frugalware.org/packages/23237) usage.
- More gpsbabel docs: the [dg-100](http://www.gpsbabel.org/htmldoc-development/fmt_dg-100.html) and the [skytraq](http://www.gpsbabel.org/htmldoc-development/fmt_skytraq.html) formats.

Putting everything together, to get the log from the device using bluetooth I first had to create an rfcomm interface, as gpsbabel does not support bluetooth natively:

```
# rfcomm bind 0 00:0D:B5:38:BA:C6
```

Then to download and erase the log from the device:

```
$ gpsbabel -i dg-100,erase=1 -f /dev/rfcomm0 -o gpx \
        -F $(date +%Y-%m-%d).gpx
```

The gpx format is fine in case you want to later reuse log with digikam's gpssync plugin (available from [kipi-plugins](http://frugalware.org/packages/9654)).

Now in case you want to convert it to kml to show on Google Maps:

```
$ gpsbabel -i gpx -f $(date +%Y-%m-%d).gpx -o kml -F $(date +%Y-%m-%d).kml
```

Finally release the rfcomm interface in case you don't need it anymore:

```
# rfcomm release 0
```

Update: there is also a [gui](http://code.google.com/p/globdog-dg100/) which can be used to enable logging of altitude info, etc - just [trivial patching](http://frugalware.org/~vmiklos/patches/globdog-dg100-enable-rtcomm.patch) is needed and it works with BT-338X as well.
