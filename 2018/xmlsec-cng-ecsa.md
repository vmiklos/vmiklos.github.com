Title: Improved ECDSA handling in LibreOffice
Slug: xmlsec-cng-ecsa
Category: xmlsec
Tags: en, libreoffice
Date: 2018-07-05T09:08:20Z

I wrote about ECDSA handling in LibreOffice
[last year](https://vmiklos.hu/blog/xmlsec-nss-ecdsa.html), back then the target was to be able to
verify signatures using the ECDSA algorithm on Linux.

Lots of things happened since then, this post is meant to summarize those improvements. My personal
motivation is that Hungarian eID cards come with a gov-trusted ECDSA (x509) cert, so handling those
in LibreOffice would be nice. My goals were:

- platforms: handling Windows as well, not only Linux/macOS
- operations: handling signing as well, not only verification
- formats: cover all of ODF, OOXML and PDF

Let's see what has happened:

- Linux, ODF, sign: we had hardcoded RSA algorithm when generating a signature, now we infer the
  sign algorithm from the signing cert algorithm
  ([commit](http://cgit.freedesktop.org/libreoffice/core/commit/?id=fd1bc178b02e05cd12ec784ff87f5c97069bc5f5))

- Linux, OOXML, sign: same problem with hardcoded RSA
  ([commit](http://cgit.freedesktop.org/libreoffice/core/commit/?id=6b1b8ef51b752f9711d6581283d6c515d3c50d9b))

- Windows, PDF, sign: the certificate chooser had to be ported to from CryptoAPI to
  [CNG](https://docs.microsoft.com/en-us/windows/desktop/SecCNG/cng-portal)
  ([commit](http://cgit.freedesktop.org/libreoffice/core/commit/?id=93e33ba279e837356e157745177d7f6061d442b7))

- Windows, ODF, verify / sign: this was the largest problem, this required a whole new libxmlsec
  backend
  ([interface](https://github.com/lsh123/xmlsec/tree/master/include/xmlsec/mscng),
  [implementation](https://github.com/lsh123/xmlsec/tree/master/src/mscng), all in C90) and also
  required conditionally using that new backend in LibreOffice
  ([commit](http://cgit.freedesktop.org/libreoffice/core/commit/?id=71d02f5b6ca78935df3d09ec0a5817f5870b056e))

- Windows, OOXML, sign: this was almost functional, except that the UI recently regressed, now fixed
  ([commit](http://cgit.freedesktop.org/libreoffice/core/commit/?id=02119ce226ef7c1fcf419aa0933aa95381ee309b))

- Finally now that everything is ported on Windows to use CNG, I could enable it by default yesterday.

I could test hardware-based signing after this, which was fine out of the box on both platforms.
Some screenshots:

- Linux:

![Linux, hardwared-based signing](https://farm2.staticflickr.com/1784/29321634078_8818b2d7ba_o.png)

- Windows:

![Windows, hardwared-based signing](https://farm1.staticflickr.com/927/42288765505_db72ee48f2_o.png)

(There is no reason why this would not work on macOS, but I did not test that.)

Thanks Gabor Kelemen who helped me to get a sane card reader that has reasonable driver support on
Linux.

All this is available in master (towards LibreOffice 6.2), or you can grab a [daily
build](http://dev-builds.libreoffice.org/daily/master/) and try it out right now. :-)