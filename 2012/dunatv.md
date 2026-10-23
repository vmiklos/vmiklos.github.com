Title: Duna TV stream lementés
Slug: dunatv
Category: hu
Date: 2012-09-29T17:53:49Z

Pl. itt [egy műsor](http://www.dunatv.hu/musor/videotar?vid=738656), a cél ezt
valahogy offline nézhetővé varázsolni. Alapból a Firefox valami plugint
igényelne a lejátszáshoz, persze ez a legtöbb felhasználónak nincs telepítve,
nálam se. De firebuggal megnézve az iframe címe
[kideríthető](http://www.dunatv.hu/video/videoplayer?vid=738656). Annak a
forrását megnézve megkaphatjuk a
[stream címét](http://80.249.172.27/video/2012_35/10010028614509.wmv). Sajnos úgy
tűnik az MPlayer ezt képtelen lejátszani, de a VLC viszi. Az utolsó trükk, hogy
ezt hogyan mentsük le, pl. így:

```
vlc http://80.249.172.27/video/2012_35/10010028614509.wmv --sout=file/wmv:test.wmv
```

Egyébként konkrétan ezt a műsort érdemes is megnézni, de az már csak hab a
tortán. :-)
