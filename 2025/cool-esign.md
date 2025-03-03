Title: Electronic signing in Collabora Online
Slug: cool-esign
Category: collabora-online
Tags: en
Date: 2025-03-03T15:12:54+01:00

LibreOffice Technology had the concept of digital signing, but this was not available in [Collabora
Online](https://www.collaboraonline.com/), so it was not possible to combine this with collaborative
editing. Also, once Collabora Online started to expose digital signing with software certificates
for ODF files, that also allowed taking a further step and start supporting electronic signing for PDF
files. Partnering with [eID Easy](https://eideasy.com/), you can create strongest of the electronic
signatures – [the mighty QES](https://en.wikipedia.org/wiki/Qualified_electronic_signature). This
means signing with Collabora Online allows you to:

- create proper electronic signatures
- not share your document with a 3rd-party, only the
  [hash](https://docs.eideasy.com/electronic-signatures/api-flow-with-file-hashes-pdf.html) of your
  PDF will be sent to the external service
- integrate with e.g. Nextcloud, use the feature without installing anything other than the
  [Nextcloud AIO](https://hub.docker.com/r/nextcloud/all-in-one) image
- potentially combine signing with other security features like [Secure
  View](https://www.collaboraonline.com/blog/collabora-secure-view/) and
- work with visual signing in a [WYSIWYG](https://en.wikipedia.org/wiki/WYSIWYG) way, which allows
  placing a visible signature widget at the specified page, then dragging it to the preferred
  position.

The sample integration presented here is for Nextcloud, but the feature can be made available in
other integrations as well.

## Motivation

Digital and electronic signing of documents is meant to be based on cryptographic security, and
traditionally this has been exposed to users in a very complex way. You need to know that first you
have to sign your macros and only then your document, you need to somehow get PEM files to have a
signing certificate, you need to somehow get your certificate trusted by some certificate authority
that is commonly trusted by other people who will verify your signature, and so on.

This lead to the need to first support digital signatures in COOL using a single signatures dialog
for ODF files and then later to provide electronic visual signing for PDF files, while continuing to
respect your privacy by not sharing your document with a 3rd-party service.

## Results so far

### A read-write signatures dialog

First the signature viewer dialog was turned into a read-write digital signatures dialog in COOL
that is still async (compatible with collaborative editing), first for ODF files & using PEM files.

Related to this, we automatically sign macros (if the document has macros) when signing the
document, so you can’t forget about this or get the order wrong (sign macros first, then the
document).

At this stage implementing signature removal was possible, which again needs an async conversion so
the user can confirm they really want to remove a signature. This also means the signature status of
the document can change, the COOL UI now supports this.

You can now associate a signing certificate / key / CA chain with a COOL editor, so you can sign the
document, but not an other editor working on the same document.

Finally adding a digital signature is now possible, where the certificate chooser just shows your
signing certificates and hides it from other editors.

Here is a screenshot of the early digital signatures dialog at this stage:

[![Initial async digital signatures dialog in COOL with sign and remove buttons](https://share.vmiklos.hu/blog/cool-esig/01.png)](https://share.vmiklos.hu/blog/cool-esig/01.png)

### Automatically signed documents

The second half of digital signing support in COOL started with WOPI extensions, so an integrator of
COOL can specify the signature settings on their user settings page and pass that to COOL when a
document is edited. We then send this to the document editor process only when needed, i.e. not on
file open, but when the actual signing process would start.

UI is also added on the notebookbar in the form of a new button that allows adding signatures to a
previously unsigned document – before you could only trigger the signatures dialog if the status bar
said something about existing signatures, and only then you could add a signature. This button is
hidden if you don’t have signature settings configured. It looks like this:

[![New sign button on the notebookbar](https://share.vmiklos.hu/blog/cool-esig/02.png)](https://share.vmiklos.hu/blog/cool-esig/02.png)

When was still missing here is automated Cypress tests to make sure signing e.g. an ODT file keeps
working and the [SDK
documentation](https://sdk.collaboraonline.com/docs/advanced_integration.html#document-signing) now
also describes what does it take to support digital signatures in your COOL integration. For example
you can create a Nextcloud integration like this:

[![Nextcloud integration for digital signing](https://share.vmiklos.hu/blog/cool-esig/03.png)](https://share.vmiklos.hu/blog/cool-esig/03.png)

Finally, COOL’s convert-to endpoint is hooked up with signature support, so you can export to a
signed PDF. Example curl invocation:

```
curl -k -F "data=@in.odt" -F "format=pdf" -F 'options={"SignPDF":{"type":"boolean","value":"true"},"SignCertificateCaPem":{"type":"string","value":"..."},"SignCertificateCertPem":{"type":"string","value":"..."},"SignCertificateKeyPem":{"type":"string","value":"..."}}' https://localhost:9980/cool/convert-to > out.pdf
```

### Plumbing for electronic signing

Once digital signing of ODF files is handled, let’s switch to PDF signing, which is much more
interesting: you typically want to sign something final, and we see PDF as a final output of your
documents. So first support for digital signing of PDFs was added.

The next part is to integrate with eID Easy, which can do privacy-friendly electronic signing for
us. This is a 5 step process:

1. Extract the hash of the to-be-signed document. This is similar to signing, you start the process
   but once you have the hash that you would sign locally, you just take that hash and abort the
   actual signing.
2. Send this hash to the electronic signing service.
3. Open a popup and let the user authenticate with their credentials (passport, personal ID, etc)
   using one of the providers (different providers support different countries) and sign the hash.
4. Download the signed hash from the service.
5. Serialize this signed hash into the local document. This requires producing the local PDF
   signature once more, but this time using the previous timestamp (instead of the system clock, so
   the hash is table) and using the downloaded PKCS#7 signature instead of locally signing something.

At the end we got something that looks like a signature produced externally, but there was no UI for
this. An initial popup for step 3 looked like this in the test environment (that doesn’t work with
real passport numbers or anything sensitive):


[![COOL popup to sign a document hash](https://share.vmiklos.hu/blog/cool-esig/04.png)](https://share.vmiklos.hu/blog/cool-esig/04.png)

### UI for electronic signing

The next step was to create a user interface for electronic signing. The Insert menu had a new menu
item to insert electronic signatures and to specify your country, finally choose one of the
providers available in your country.

Also support for two types of providers is added: the first is the “in context” one, the other is a
“redirect based” one. We now support both: all the redirect (should be familiar to you if you ever
did e.g. online payments) happens in the popup, so the original COOL editor is never closed.

eID also has the concept of multiple tokens for signing: initiating the signing costs money, so is
done using a “secret”, which is never sent to the COOL JS code. Then the “client ID” identifies the
client, but can’t be used to start signing. Finally any single signing transaction has a specific
“document ID”. We took care to follow the guidelines here, so the sensitive “secret” for signing is
always kept on the server.

Similar to the initial document signing, electronic signing settings are also possible to specify
from an integration, we [documented this in the
SDK](https://sdk.collaboraonline.com/docs/advanced_integration.html#electronic-signature-handling)
and also created a sample Nextcloud integration for this.

The Nextcloud integration looks like this:

[![Nextcloud integration for electronic signing](https://share.vmiklos.hu/blog/cool-esig/05.png)](https://share.vmiklos.hu/blog/cool-esig/05.png)

Note that later the API URL was changed to be a [hidden
setting](https://github.com/nextcloud/richdocuments/blob/main/docs/app_settings.md#electronic-signature),
as real signing never needs a custom value there, this is just for testing.

### Visual signing

The last part of this electronic signing effort was to expose visual singing in COOL, something that
was added to LibreOffice Draw back in 2020, see this [earlier blog
post]({filename}/2020/sd-visible-pdf-sign.adoc).

First this was exposed in COOL with digital signing, in a way that the current page gets a signature
widget inserted at the page center and then the user can move that signature widget to the desired
location.

Combining this with electronic signing is a bit more tricky, since we don’t want to select a
certificate when the signature widget is inserted, we’ll deal with that in the external service, as
usual.

Also, there was no real reason to not use visual signing unconditionally, so now the way to initiate
a signing process is to open your PDF in COOL, use the Insert → Signature line menu item to insert a
signature widget, move it to the wanted position, click “finish” on the snackbar and that completes
the process with the usual electronic signing popup.

The final problem was that our multi-page PDF viewer was not really prepared to deal with changed
PDF content (assuming your PDF rendering will not change is reasonable), so some last minute work
had to be done to make sure the signature widget’s graphical selection indicator, its dragging and
its rendering works fine even on non-first pages of a PDF document.

At the end, a test signature using the d-trust signature provider’s test environment looks like
this:

[![Electronic signature with a signature widget / visual signature on page 2 of a PDF file, using the test environment of the d-trust provider.](https://share.vmiklos.hu/blog/cool-esig/06.png)](https://share.vmiklos.hu/blog/cool-esig/06.png)

Or if you prefer watching a demo, a typical electronic signing process session looks like this:

[![Demo of electronic signing with Collabora Online, part of a tea-time training](https://share.vmiklos.hu/blog/cool-esig/07.png)](https://www.youtube.com/watch?v=tWS546R3fwE?&t=1022)

At the end you get an electronic signature that is trusted by the EU trust list and thus e.g.
Acrobat Reader.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)
As usual, the high-level problem was addressed by a series of small changes.

LibreOffice core commits:

- [cool#9992 lok doc sign: add SfxObjectShell::AfterSignContent()](https://git.libreoffice.org/core/commit/0255283974894f5ad9ba92c3a52912657ed4bdf6)
- [cool#9992 lok doc sign: make `SfxMedium::SignContents_Impl()` async](https://git.libreoffice.org/core/commit/de0bc0a2c30a76144b47e9abb17770043813133c)
- [cool#9992 lok doc sign: async DocumentDigitalSignatures::signDocumentContent()](https://git.libreoffice.org/core/commit/caff013bee53216efeb49db4bcda44b55c223b58)
- [cool#9992 lok doc sign: async DocumentDigitalSignatures::ImplViewSignatures()](https://git.libreoffice.org/core/commit/07df95e75a728fbbce03f6d6efdf9dbceab6c581)
- [cool#9992 lok doc sign: async read-write DigitalSignaturesDialog](https://git.libreoffice.org/core/commit/482c7c585160681b263c6245a745c21df70e7507)
- [cool#9992 lok doc sign: allow sign of macros & the document itself in one step](https://git.libreoffice.org/core/commit/e5a0209d4b1e1f09191a442e04d626b21c49b9df)
- [cool#9992 lok doc sign: implement signature removal](https://git.libreoffice.org/core/commit/40ba7a5c25f0d2ea90a976d4e7d56b9e61dbedd1)
- [cool#9992 lok doc sign: fix signature status after load](https://git.libreoffice.org/core/commit/a95b90bc0cf0f8a58fc20684acc23bb89b827cd1)
- [cool#9992 lok doc sign: add password-less mode to create-certs.sh](https://git.libreoffice.org/core/commit/a7830e04f2c33fb8d684d48d00ffc752f7207dea)
- [cool#9992 lok doc sign: extract duplicated code to SfxLokHelper](https://git.libreoffice.org/core/commit/7bad76c3a5b319f8ede74be8f78e5645f9ffd050)
- [cool#9992 lok doc sign: handle .uno:SignatureCert/Key/Ca view options](https://git.libreoffice.org/core/commit/90beea9a9a9ab1a5d4a154704acabadfc83870c9)
- [cool#9992 lok doc sign: store signing cert in the view](https://git.libreoffice.org/core/commit/4787fd4fc86230893a6da309f45964116b3a67df)
- [cool#9992 lok doc sign: fix import of the private key](https://git.libreoffice.org/core/commit/d95ab8d3a3a102c00b69f0b0b49d7eb49e34051e)
- [cool#9992 lok doc sign: conditionally show the add button in the sign dialog](https://git.libreoffice.org/core/commit/c57434559cf5ffd82c3c72e8a0884d4874885dca)
- [cool#9992 lok doc sign: only take sign cert from the view in the cert chooser](https://git.libreoffice.org/core/commit/a581dbf9829d8407a611907c35c8af632b1397b5)
- [cool#9992 lok doc sign: convert the certificate chooser dialog to async](https://git.libreoffice.org/core/commit/ced420ca708eb8df5b20c7d537166bd9ec29a0e5)
- [cool#9992 lok doc sign: update sign status after modify the list of trusted CAs](https://git.libreoffice.org/core/commit/298c2d5c8a6791aa6e5846b698d521079aaa445d)
- [cool#9992 lok doc sign: avoid storing the sign cert in the model after sign](https://git.libreoffice.org/core/commit/1c7f6188eb5b2a2bbf0cf589843d644306e40d6d)
- [cool#9992 lok doc sign: allow late-init of the sign cert](https://git.libreoffice.org/core/commit/47fd29a318513d26b86eb0cfa891969ce6c85879)
- [cool#9992 lok doc sign: never remember previous .uno:Signature params](https://git.libreoffice.org/core/commit/4aa8d30c095e08825bc983c699e11f2e88182124)
- [cool#9992 lok doc sign: allow injecting sign cert/key during pdf export](https://git.libreoffice.org/core/commit/1e75155c6995e4f1534e2062c64fab35d49ea60b)
- [cool#9992 lok doc sign, create-certs.sh password-less mode: still create a .p12](https://git.libreoffice.org/core/commit/27753561a1899949c5cbd5cc6b72a238769e1eeb)
- [cool#9992 lok doc sign, hash extract: initial getCommandValues('Signature')](https://git.libreoffice.org/core/commit/12e50825370dae276d44bea84b3eb2941b401220)
- [cool#9992 lok doc sign, hash extract: time for getCommandValues('Signature')](https://git.libreoffice.org/core/commit/0de900cec7b04d75cf9ab0779d7a1ca3c730ae32)
- [cool#9992 lok doc sign, hash extract: digest for getCommandValues('Signature')](https://git.libreoffice.org/core/commit/eabda77c9735040dd5bdb1d2ebe0b96ce316561a)
- [cool#9992 lok doc sign, hash extract: add signatureTime parameter](https://git.libreoffice.org/core/commit/39bf87f943cce9a0b5a784bc7426b5b98bbc6992)
- [cool#9992 lok doc sign: add initial serialization of external signatures](https://git.libreoffice.org/core/commit/60261557e5311a7b445fb2455aa534697697a9ec)
- [cool#9992 doc electronic sign: make return type for .uno:Signature consistent](https://git.libreoffice.org/core/commit/0a535147f9bed7856e7ab3513fe3f6c38549a099)
- [cool#10630 lok doc sign: fix Impress sign line when creating directly](https://git.libreoffice.org/core/commit/70111311f39b52858f7de8b5adb764db9d28a46e)
- [cool#10630 lok doc sign: fix Impress sign line when picking a certificate](https://git.libreoffice.org/core/commit/0cc0896b212b0d1fded8d999b980f18f0379e6e0)
- [cool#10630 doc sign: fix Impress sign line, to be able to finish signing again](https://git.libreoffice.org/core/commit/fa5be641bc0ad23ed51fb1702a157878cc3ecb04)
- [cool#10630 lok doc sign: allow setting the pos of the Impress sign line](https://git.libreoffice.org/core/commit/a10d5191b62822b96b247e0c95d8be735cc4feed)
- [cool#10630 lok doc sign: allow setting the size of the Impress sign line](https://git.libreoffice.org/core/commit/d925b64ac552348e3862a6b8b61ecd751a8f3a9e)
- [cool#10630 doc electronic sign: fix insertion of the signature line](https://git.libreoffice.org/core/commit/7d4222d0088f22a68941d2e910fe50bd10e8bdfe)
- [cool#10630 doc electronic sign: fix no graphic selection for the signature line](https://git.libreoffice.org/core/commit/9dd225ee8c45d6c944b9ce5578780d89612e9ffb)
- [cool#10630 doc electronic sign: move signature line tracking to the view](https://git.libreoffice.org/core/commit/62dd6274c71bc840f5c5abcd4b1fa536238aa25d)
- [cool#10630 doc electronic sign: unselect & reject reselect](https://git.libreoffice.org/core/commit/76e0a520d6beb118dd6437889fbe16d2a94c941c)
- [cool#10630 lok doc sign: reduce the default size of the signature line](https://git.libreoffice.org/core/commit/819941bf1422f40e9346eba61d75e0fda3d24275)

Collabora Online commits:

- [cool#9992 doc sign: fix update of the signature widget in the status bar](https://github.com/collaboraonline/online/commit/95716823f5a66c18476dd7032a1a1f5fc681f23c)
- [cool#9992 doc sign: fix missing enable on the cert chooser description entry](https://github.com/collaboraonline/online/commit/d5a589e118618e5acaf5a6f381d0f0096da50a39)
- [cool#9992 doc sign: better fix for the cert chooser dialog's disabled description widget](https://github.com/collaboraonline/online/commit/2a118ab34d57f5e2e4e0bc4d15f9f01c03794943)
- [cool#9992 doc sign: add sign button to the home tab of the notebookbar](https://github.com/collaboraonline/online/commit/e54f2b81158be998f076bdaf310dba826470edf7)
- [cool#9992 doc sign: local file wopi provider: allow setting the sign cert/key/ca](https://github.com/collaboraonline/online/commit/497981cd6c7356fc680087997b3217a76a455ac6)
- [cool#9992 doc sign: set the view's sign cert from the WOPI UserPrivateInfo](https://github.com/collaboraonline/online/commit/0c1cd8c00f88b6cedd8fdb4c4ee15abf16103cd6)
- [cool#9992 doc sign: add a setting to be able to disable this](https://github.com/collaboraonline/online/commit/6cdbbe044565b708ef654efc547edd4db5f3b24a)
- [cool#10220 doc sign: don't assume that user private data is a dict json](https://github.com/collaboraonline/online/commit/6de210972ae756a3dad1dbe71ec3a87d5533adf8)
- [cool#9992 doc sign: hide sign button when user pref doesn't provide cert or key](https://github.com/collaboraonline/online/commit/89213ce16272579a138c098314b7a96123ffc6c0)
- [cool#9992 doc sign: add signature creation cypress test](https://github.com/collaboraonline/online/commit/925fcd837d0c371f513d70a56ac6c8817b13b271)
- [cool#9992 doc sign: move sign key/cert init from doc init to sign dispatch](https://github.com/collaboraonline/online/commit/542560f38d09d6d3a03b94822cefba269361eac7)
- [cool#9992 doc sign: fix handling of saveas options containing spaces](https://github.com/collaboraonline/online/commit/ebc753b7e6d50a861481d0658aeea0fb79c048c5)
- [cool#9992 doc sign: add menu item for the compact UI](https://github.com/collaboraonline/online/commit/d2be47df5fa3593b49057c7a7a2daa8b269d9977)
- [cool#9992 doc sign: add UI to sign PDF files](https://github.com/collaboraonline/online/commit/d3806b06157a0de5fa62ad3e292993a3c8590ea7)
- [cool#9992 doc electronic sign: allow passing sign params from JS](https://github.com/collaboraonline/online/commit/ab694a028929bad69f2b0761fb291b7acdc34f3d)
- [cool#9992 doc electronic sign: allow more user private info settings with make run](https://github.com/collaboraonline/online/commit/f6f339088344d2f43facee613ee5c1421a763edc)
- [cool#9992 doc electronic sign: add menu item to trigger hash extract](https://github.com/collaboraonline/online/commit/da54d2273b82db9664ac7945fd8846b77ad0d3a2)
- [cool#9992 doc electronic sign: send the hash to be signed](https://github.com/collaboraonline/online/commit/b09b20489d9666c107bc0bd332f158d2a9734a77)
- [cool#9992 doc electronic sign: actually sign the hash in a popup](https://github.com/collaboraonline/online/commit/a1d81fdd06aa9b313b19e5719ee509270f39de4f)
- [cool#9992 doc electronic sign: fetch the created signature](https://github.com/collaboraonline/online/commit/fb784187b1bc1952c6e0b5f25b208c2439a2e1f3)
- [cool#9992 doc electronic sign: serialize the fetched signature](https://github.com/collaboraonline/online/commit/690fb0413ec4a77a551eba00fbc3d77371a61983)
- [cool#9992 doc electronic sign: add cypress test](https://github.com/collaboraonline/online/commit/cab22ef2cad3727e7731b3e7e7ec8270fd0c07f1)
- [cool#9992 doc electronic sign: add a provider selector dialog](https://github.com/collaboraonline/online/commit/653107b76e84c7e716a8c3aa71d776c196efca21)
- [cool#9992 doc electronic sign: select the provider interactively](https://github.com/collaboraonline/online/commit/44ff2a3687dde5a8a9b967be4bc0a50d41612268)
- [cool#10630 doc electronic sign: improve error handling on bad client ID](https://github.com/collaboraonline/online/commit/63a0d574d523536cd1a51e9847d74972c455fd47)
- [cool#10630 doc electronic sign: more human-readable names for providers](https://github.com/collaboraonline/online/commit/5e75272cfae784a46dbc068629a30c813ca4e3e3)
- [cool#10630 doc electronic sign: add /cool/signature endpoint](https://github.com/collaboraonline/online/commit/ce7b5bf22f25f4a460ab550bf1d767ed914934fb)
- [cool#10630 doc electronic sign: implement support for redirect-based providers](https://github.com/collaboraonline/online/commit/1ffb473e71fa88b882c66c1d7224fe0ffe8969dc)
- [cool#10630 doc electronic sign: expose the name of the document](https://github.com/collaboraonline/online/commit/4a8206bf14d80262c3adf505a14bf51910b5a402)
- [cool#10630 doc electronic sign: send the hash on the server](https://github.com/collaboraonline/online/commit/1da7603e641d20fc7ce095ee02d0f34cb4393ed2)
- [cool#10630 doc electronic sign: get the signature on the server](https://github.com/collaboraonline/online/commit/8b7fc83546b03b74675077e7999969590f001966)
- [cool#10630 doc electronic sign: stop sending the secret to the client](https://github.com/collaboraonline/online/commit/20ac4c2c3c362bb996ad25609be1c8f652254b1d)
- [cool#10630 doc electronic sign: remove CSP rules](https://github.com/collaboraonline/online/commit/73ee6c85443eb551b69f4f6f59cd7efd24dfe794)
- [cool#10630 doc electronic sign: configure the language of the popup](https://github.com/collaboraonline/online/commit/aa6295f3acfad9401769a995807cafc57de2d025)
- [cool#10630 doc electronic sign: add a country selector to the dialog](https://github.com/collaboraonline/online/commit/0e09d9950324997561fcb4e60be5acedcd34592e)
- [cool#10630 doc electronic sign: add ISO country names](https://github.com/collaboraonline/online/commit/bbde01500b559cb402bd19489e3201b582c7f26b)
- [cool#10630 doc electronic sign: send selected country to the server](https://github.com/collaboraonline/online/commit/830e4608a08050a7593431554ab6113e6283ec20)
- [cool#10630 doc electronic sign: moved esign settings out of UserPrivateInfo](https://github.com/collaboraonline/online/commit/e1e6a08b15d5a39174c82fa0a4f776d1e7543d2f)
- [cool#10630 doc electronic sign: support per-server private info during 'make run'](https://github.com/collaboraonline/online/commit/8d043c31b25cd3ab4d8f715650f0610863e3801d)
- [cool#10630 doc electronic sign: default to a redirect-based provider](https://github.com/collaboraonline/online/commit/5a79a28e5c1952b62ae1e876beb721e11b56d0bf)
- [cool#10630 doc electronic sign: set defaults without an index](https://github.com/collaboraonline/online/commit/c8b7cb63fdbb6bb33bb3eebff30eb2bdd65422b6)
- [cool#10630 doc electronic sign: return dialog result without an index](https://github.com/collaboraonline/online/commit/4d42b1e3e47ad0183649678d2aa931b44c5ffe10)
- [cool#10630 doc electronic sign: limit the offered providers based on the selected country](https://github.com/collaboraonline/online/commit/62aa4d53914421fb4e1cb24ff3787d3d8ad0e038)
- [cool#10630 doc electronic sign: sort the country & provider lists](https://github.com/collaboraonline/online/commit/cb100b9c4a5a8ab93e0edbcbb624b0b68cf2fb23)
- [cool#10630 doc sign: expose visual signing](https://github.com/collaboraonline/online/commit/dfa52148c3d0637dc212d69f1f5f42f044dd276a)
- [cool#10630 doc sign: add visual signing testcase](https://github.com/collaboraonline/online/commit/03f9cf4f5749cce8ffeff9ccf44bda5a6fc8f0c4)
- [cool#10630 doc sign: allow setting the position / size of a visual signature](https://github.com/collaboraonline/online/commit/bbaa9548a542930747841be0c8cdc3089e6a05d5)
- [cool#10630 doc electronic sign: handle visual signatures](https://github.com/collaboraonline/online/commit/c474a775468b20d7ba31be0d30bd443971276f6b)
- [cool#10630 doc electronic sign: add a snackbar](https://github.com/collaboraonline/online/commit/4c6ce3ad510e98772af6da862ecf7e08c162680a)
- [cool#10630 doc electronic sign: show the sign view dialog after esign](https://github.com/collaboraonline/online/commit/fbb710dd4dc990cb0f5003e78c95b7db008b5cde)
- [cool#10630 doc electronic sign: remember the provider in localstorage](https://github.com/collaboraonline/online/commit/7fbd76027f157b8816af6b5f5643b8d7f747d203)
- [cool#10630 doc electronic sign: show busy overlay while the popup is open](https://github.com/collaboraonline/online/commit/36b509877931c8a0a005f9ed50ada3e7f7d402e2)
- [cool#10630 doc electronic sign: close the popup on tab close](https://github.com/collaboraonline/online/commit/bba469ef8a7a1c6ad5225d554279f3f30c319e31)
- [cool#10630 doc electronic sign: avoid unwanted postmessage during sign](https://github.com/collaboraonline/online/commit/2ec5568ef900e309a371758987640eb18f6c52e8)
- [cool#10630 doc electronic sign: fix no graphic selection on 2nd page](https://github.com/collaboraonline/online/commit/bbe7badae6bfdc80c8193aa940a78f1af8fc48a9)
- [cool#11002 kit: fix memory corruption in Document::handleSaveMessage()](https://github.com/collaboraonline/online/commit/e20c1838b3e65900f61ddb2c5f0bb72385577275)
- [cool#10630 doc electronic sign: fix no SVG in graphic selection on 2nd page](https://github.com/collaboraonline/online/commit/0ee465340c7a01af4ab2f77930feb642bb0a3558)
- [cool#10630 doc electronic sign: fix outgoing mouse messages on 2nd page](https://github.com/collaboraonline/online/commit/3cf8a2f1f161270fb0a85863bea1d5277e92eed3)
- [cool#10630 doc electronic sign: fix outgoing transform pos on 2nd page](https://github.com/collaboraonline/online/commit/df5c0a672bad3a3e9b1a5a3f792c94a47753ac61)
- [cool#10630 doc electronic sign: fix outdated tile for shape move on 2nd page](https://github.com/collaboraonline/online/commit/97d166457afeba3654a7c22acc41230a6d13c7c9)

Nextcloud richdocuments commits:

- [feat: add personal setting to specify the CA chain for document signing](https://github.com/nextcloud/richdocuments/commit/20ca5fd77d0753b58c997ad6a7889153d8b2469e)
- [feat: expose the documentSigningCa personal setting in the WOPI CheckFileInfo](https://github.com/nextcloud/richdocuments/commit/6ca8071c495ebf4cd7797dd44a0700f9970abc31)
- [feat: document signing, add setting for the signing certificate & key, too (fixes #4123)](https://github.com/nextcloud/richdocuments/commit/adfb9056d40af3a861463753f47e72ab5f2f905c)
- [feat: electronic signing, add settings for eIDEasy (fixes #4311)](https://github.com/nextcloud/richdocuments/commit/a9fa62cc5232a20021f206d34f4d295129c72e2c)

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraoffice.com/code/).
