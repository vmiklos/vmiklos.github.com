Title: OOXML floating table improvements in LibreOffice Writer 4.2
Slug: lo-floattable-ooxml-improvements
Category: libreoffice
Tags: en
Date: 2013-09-01T21:38:42Z

I'm posting here a few screenshots showing improvements I've recently
implemented in our DOCX import and export filter, done in the 4.2 development
cycle. Note that final 4.2 is still far from being released, so this is not a
complete list. :-) In each case I'm providing a screenshot showing how it looks
_now_ on 4.2, how it looked _before_ and the _reference_ layout. Click on the
images to get a larger image:

- document with paragraph shadow ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlexport/data/para-shadow.docx)):

[![para-shadow-new](https://lh3.googleusercontent.com/-RhO6JT8FoJA/UiOTmbPGDpI/AAAAAAAADWk/QV86bPIGdqU/s400/para-shadow-new.png)](https://lh3.googleusercontent.com/-RhO6JT8FoJA/UiOTmbPGDpI/AAAAAAAADWk/QV86bPIGdqU/s890/para-shadow-new.png)

[![para-shadow-old](https://lh4.googleusercontent.com/-VwBuUQ2NPfY/UiOTmjHm8fI/AAAAAAAADWw/vuGNooOT3NA/s400/para-shadow-old.png)](https://lh4.googleusercontent.com/-VwBuUQ2NPfY/UiOTmjHm8fI/AAAAAAAADWw/vuGNooOT3NA/s890/para-shadow-old.png)

[![para-shadow-reference](https://lh5.googleusercontent.com/-_2HFes-of6Q/UiOTmh_3OAI/AAAAAAAADWo/Idou9CvREPM/s400/para-shadow-reference.png)](https://lh5.googleusercontent.com/-_2HFes-of6Q/UiOTmh_3OAI/AAAAAAAADWo/Idou9CvREPM/s646/para-shadow-reference.png)

OK, this has nothing to do with floating tables. But I promise the rest is all related to that. ;-)

- document with floating table ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlexport/data/table-floating.docx)):

[![table-floating-new](https://lh4.googleusercontent.com/-vqwNUVppu1U/UiOTolPyUhI/AAAAAAAADX0/OqKonLHsBTE/s400/table-floating-new.png)](https://lh4.googleusercontent.com/-vqwNUVppu1U/UiOTolPyUhI/AAAAAAAADX0/OqKonLHsBTE/s890/table-floating-new.png)

[![table-floating-old](https://lh4.googleusercontent.com/-VWKnAf98KUI/UiOTo3ptPoI/AAAAAAAADXs/w71fqHxDdt4/s400/table-floating-old.png)](https://lh4.googleusercontent.com/-VWKnAf98KUI/UiOTo3ptPoI/AAAAAAAADXs/w71fqHxDdt4/s890/table-floating-old.png)

[![table-floating-reference](https://lh6.googleusercontent.com/-nIjJh5m5aoM/UiOTpCHWqZI/AAAAAAAADXw/11JLrKyu2AA/s400/table-floating-reference.png)](https://lh6.googleusercontent.com/-nIjJh5m5aoM/UiOTpCHWqZI/AAAAAAAADXw/11JLrKyu2AA/s646/table-floating-reference.png)

- document with floating table and special margins ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlexport/data/table-floating-margins.docx)):

[![table-floating-margins-new](https://lh5.googleusercontent.com/-cQrbF3idIGw/UiOTmy5CwRI/AAAAAAAADXg/t8aOc7-EFH4/s400/table-floating-margins-new.png)](https://lh5.googleusercontent.com/-cQrbF3idIGw/UiOTmy5CwRI/AAAAAAAADXg/t8aOc7-EFH4/s890/table-floating-margins-new.png)

[![table-floating-margins-old](https://lh6.googleusercontent.com/-Oj5zi3rL4y4/UiOTnJnSn7I/AAAAAAAADW4/p22Zn5aFDYg/s400/table-floating-margins-old.png)](https://lh6.googleusercontent.com/-Oj5zi3rL4y4/UiOTnJnSn7I/AAAAAAAADW4/p22Zn5aFDYg/s890/table-floating-margins-old.png)

[![table-floating-margins-reference](https://lh4.googleusercontent.com/-fD_jwONtFdA/UiOTnM-0EpI/AAAAAAAADXA/rIQdIUOWwxo/s400/table-floating-margins-reference.png)](https://lh4.googleusercontent.com/-fD_jwONtFdA/UiOTnM-0EpI/AAAAAAAADXA/rIQdIUOWwxo/s646/table-floating-margins-reference.png)

- the same document after roundtrip (load, save and load again):

[![table-floating-margins-roundtrip-new](https://lh6.googleusercontent.com/-lLKfUNXLDgU/UiOTnpr4vRI/AAAAAAAADXM/q3Fcd5AiDTU/s400/table-floating-margins-roundtrip-new.png)](https://lh6.googleusercontent.com/-lLKfUNXLDgU/UiOTnpr4vRI/AAAAAAAADXM/q3Fcd5AiDTU/s890/table-floating-margins-roundtrip-new.png)

[![table-floating-margins-roundtrip-old](https://lh6.googleusercontent.com/-EigIZsr3WqE/UiOTn78PmEI/AAAAAAAADXU/eaeWSEij59E/s400/table-floating-margins-roundtrip-old.png)](https://lh6.googleusercontent.com/-EigIZsr3WqE/UiOTn78PmEI/AAAAAAAADXU/eaeWSEij59E/s890/table-floating-margins-roundtrip-old.png)

[![table-floating-margins-roundtrip-reference](https://lh6.googleusercontent.com/-neGqO1p_Cyw/UiOToZQt7hI/AAAAAAAADXY/_PJbf3WoCwI/s400/table-floating-margins-roundtrip-reference.png)](https://lh6.googleusercontent.com/-neGqO1p_Cyw/UiOToZQt7hI/AAAAAAAADXY/_PJbf3WoCwI/s646/table-floating-margins-roundtrip-reference.png)

If you want to try these out yourself, get a
[daily build](http://dev-builds.libreoffice.org/daily/) and play with it! :-) If
something goes wrong, report it to us in the
[Bugzilla](https://www.libreoffice.org/get-help/bug/), so we can try fix it
before 4.2 gets branched off. And remember, there are lots more improvements
[coming](http://wiki.documentfoundation.org/ReleaseNotes/4.2) in LibreOffice 4.2
(even if some of them is not yet documented), stay tuned! ;-)
