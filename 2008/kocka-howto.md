Title: Kocka howto
Slog: kocka-howto
Category: geek
Tags: hu
Date: 2008-01-14T00:36:44Z

Hogyan készült a [kocka](http://vmiklos.hu/file/kocka.avi)?

Először is kell 8 db fakocka. A méret tetszőleges, én 25 mm nagyságút használtam. Ezt fogom
beborítani kívül-belül képekkel. Egész pontosan 3 db nagy kép és 6 db kis kép kell. A nagy képet úgy
kell elképzelni, hogy 4 x 2 kocka (ill. kockának egy lapja) nagyságú, a kicsi meg 2 x 2. Ez azért
praktikus így, mert 1 kockára való képet össze lehet tenni pont egy A4-es lapra amit ki lehet
nyomtatni fóliára. A módszer nem tökéletes, mivel erről a fóliáról könnyen kopik a festék, így
papír-írószer boltban kapható szeles celluxszal (az a nagy, 5 cm szeles) le kell ragasztani a fóliát
felülről is. A Copy General 500 DPI-s nyomtatót használ, tehát egy kockalapra való képet 1100 px
szélesre érdemes készíteni.

Az A4-es képet kézzel is el lehet készíteni, meg egy scripttel is -- de ez utóbbiról később. Ha
kézzel akarjuk akkor így érdemes elrendezni:

![1](https://share.vmiklos.hu/blog/kocka-howto/kocka1.jpg)

Ha scripttel, akkor egy `enkockam` könyvtárban lesz `4es` meg `8as` nevű alkönyvtár és abba kerül a
3 db 8-as és 6 db 4-es kép. ezután kell a [kocka.py](https://share.vmiklos.hu/blog/kocka-howto/kocka.py):

```
$ ./kocka.py enkockam
```

Ez elkészíti az `enkockam.jpg` file-t.

A következő kérdés, hogy ezeket a nagy és kis képeket hogyan érdemes felvágni. Ha túl sok vagy kevés
vágás lesz, akkor vagy nem lehet körbeforgatni a kockát, vagy szétesik a kocka. Színezem a képeket,
hogy ne kavarodjanak össze.

Nézzük először a nagyobb képeket, sötétkék, világossárga és sötétzöld:

![2](https://share.vmiklos.hu/blog/kocka-howto/kocka2.jpg)

A kis képek vágása: piros, narancs, sárga, világoszöld, világoskék, krémsárga:

![3](https://share.vmiklos.hu/blog/kocka-howto/kocka3.jpg)

A kocka 6 lépésben körbeforog. Felragasztás: A 8 db kis kockát négyzetekbe rendezzük, és egymásra
helyezzük. Tegyük fel a tetejére a narancsot, úgy felvágva, ahogy a rajzon látható. Húzzuk le a
hátáról a fóliának a külső rétegét és ragasszuk is rá. Előttünk lesz a krémsárga oldal (szintén a
rajzon látható módon, tehát a vágás vízszintesen van), balra a piros, jobbra a sárga (a vágás
függőlegesen legyen, a rajzhoz képest 90 fok forgatással),  hátul a kék (a vágás vízszintesen
legyen), alul pedig a világoszöld (rajzhoz képest 180 fok forgatás, ugyanúgy jobbra lesz a kis rövid
vágás mint a tetején a narancsnál).

Ha idáig eljutottunk, akkor (felülnézetből) a jobb alsó és a jobb felső hasábját ki lehet hajtogatni
a kockának. (felülnézetből egy 4 kocka magas narancssárga csíkot kapunk). Jobboldalt az egész nagy
felületet elfoglalja a sötétkék. Már csak a sötétzöld és a krémsarga maradt. Forgassuk el balra
hossztengely szerint a nagy kockát, Tehát felfele fog nézni a nagy kék felület. Most nyissuk szét a
nagy kockát úgy, hogy hosszába a bal felét balra, jobb felét jobbra forgatjuk 90 fokkal. Továbbra is
téglatest lesz előttünk, de most már a kék rész jobb és baloldalon függőlegesen lesz, és nem
borított rész tárul elénk. Ide kell a világossárga.

Már csak a sötétzöld maradt. A cél, hogy ez kívülre kerüljön. Menjünk vissza két lépést, amikor a
kocka még egyben volt: összecsuk, újra kék lesz felül, forgat jobbra 90 fokot, narancs csík lesz
felül, alul-felül összeforgat úgy, hogy kocka legyen újra. Most áthajtjuk a kocka felső felét jobbra
úgy, hogy újra téglatestet kapjunk. A világossárgát fogjuk látni megint, és bal- meg jobboldalt a
szélén pedig a kettészedett pirosat. Elforgatjuk az asztallapon a kockát 90 fokkal. Ugyanúgy ki
fogjuk nyitni, mint mikor kékből sárgába mentünk át, csak most a sárgából csupasz lap lesz, és erre
a 8 kockalapra fog kerülni a sötétzöld.

Frissítés: 2025-ben ezt a leírást követve úgy tűnik, hogy az utolsó kettő sorrendje fordított kell,
hogy legyen, tehát sötétzöld az utolsó előtti és a világossárga az utolsó.
