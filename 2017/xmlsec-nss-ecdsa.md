Title: ECDSA support in xmlsec-nss, bundled by LibreOffice
Slug: xmlsec-nss-ecdsa
Category: xmlsec
Tags: en, libreoffice
Date: 2017-03-13T09:57:17Z

Last month a [LibreOffice bugreport](https://bugs.documentfoundation.org/show_bug.cgi?id=105983) was
filed, as the ODF signature created with Hungarian citizen eID cards is not something LibreOffice
can verify. After a bit of research it seemed that LibreOffice and NSS (what we use for crypto work
on Linux/macOS) is not a problem, but xmlsec's NSS backend does not recognize ECDSA keys (RSA or DSA
keys work fine).

The xmlsec improvements happened in these pull requests:

- [prepare the xmlsec ECDSA tests](https://github.com/lsh123/xmlsec/pull/81), so that they can test
  not only openssl, but NSS as well
- [add initial ECDSA support](https://github.com/lsh123/xmlsec/pull/83) (SHA256 hashing only)
- [SHA1 support](https://github.com/lsh123/xmlsec/pull/88)
- [SHA512 support](https://github.com/lsh123/xmlsec/pull/89)
- [fix read of uninitialized memory](https://github.com/lsh123/xmlsec/pull/91)

After this the xmlsec code looked good enough. I had to request an update of the bugdoc in the TDF
bug twice, as the signature itself looked also incorrect initially:

- an attribute type in the signature that had no official abbreviation was described as "UNDEF"
  instead of the dotted decimal form
- [RFC3279](https://tools.ietf.org/html/rfc3279#section-2.2.3) specifies that an ECDSA signature
  value in general should be ASN1-encoded in general, but
  [RFC4050](https://tools.ietf.org/html/rfc4050#section-3.3) is specific to XML digital signatures
  and that one says it should **not** be ASN1-encoded. The bugdoc was initially ASN1-encoded.

Finally a warning still remains: while trying to parse the text of the `<X509IssuerName>` element,
the dotted decimal form is still not parsed (see this
[NSS bugreport](https://bugzilla.mozilla.org/show_bug.cgi?id=1342137)). The bug is confirmed on the
mailing list, but no other progress have been made so far.

Oh, and of course: Windows is still untouched, there a bigger problem remains: we use CryptoAPI (not
CNG) there, and that does not support ECDSA at all. Hooray for open-source libs where you can add
such support yourself. ;-)