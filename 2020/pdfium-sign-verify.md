Title: Better PDF signature verification in Draw
Slug: pdfium-sign-verify
Category: libreoffice
Tags: en
Date: 2020-12-11T09:31:26+01:00

Draw now has much better support for detecting unsigned incremental updates between signatures at
the end of PDF documents. We now also make sure that incremental updates introduced for adding
signatures really just add annotations and don't change the actual content.

## Motivation

There has been a recent
[evaluation](https://pdf-insecurity.org/signature-shadow/evaluation_2020.html) of PDF signature
verification, which included Draw. While we got a checkmark on their Shadow Hide test, their Shadow
Replace test found conditional problems and their Shadow Hide-and-Replace test was not happy, either.

So time to look at what are those corner-cases and how the situation can be improved, so people keep
trusting that if Draw says a signature is valid, it's indeed valid.

## Results so far

There were 4 incremental improvements in this area:

- [detect unsigned incremental update between signatures](https://gerrit.libreoffice.org/c/core/+/99361)
- [fix infobar vs signature dialog inconsistency](https://gerrit.libreoffice.org/c/core/+/101712)
- [avoid saying OK when the signature is partial](https://gerrit.libreoffice.org/c/core/+/101926)
- [pdf incremental updates that are non-commenting are invalid](https://gerrit.libreoffice.org/c/core/+/102057)

These were enough so that talking to the authors of that evaluation now confirmed that these
problems are all gone.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

PDF signature verification works by using a custom PDF tokenizer. You can read about that code in
the PDF tokenizer section of [this post]({filename}/2016/pdf-sign.adoc). The bottom line is that
we now have both PDFium and this custom tokenizer, somewhat duplicating the functionality.

After talking to the PDFium developers (see the relevant [mailing list
thread](https://groups.google.com/g/pdfium/c/Z0fC8Fg3yek/m/IE6yD066AAAJ)), there were open regarding
adding all the high level API to allow PDF signature verification based on PDFium, and not via our
own tokenizer. See [this header
file](https://pdfium.googlesource.com/pdfium/+/refs/heads/master/public/fpdf_signature.h) for the
set of relevant APIs added. A combinations of those allowed to
[adapt](https://gerrit.libreoffice.org/c/core/+/105766) the code on our side and use PDFium for
signature verification, not the own tokanizer.

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora intends to
continue supporting and contributing to LibreOffice, the code is merged so we expect all of this
work will be available in TDF's next release too (7.1).