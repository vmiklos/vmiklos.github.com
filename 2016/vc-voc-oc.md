Title: On LibreOffice's ViewContact/ViewObjectContact/ObjectContact
Slug: vc-voc-oc
Category: libreoffice
Tags: en
Date: 2016-07-18T10:17:03Z

[![Figure from the old presentation](https://farm9.staticflickr.com/8833/28305552801_21343667ff_z.jpg)](https://farm9.staticflickr.com/8833/28305552801_1d518e31ae_o.png)

I've recently
[fixed](https://gerrit.libreoffice.org/gitweb?p=core.git;a=commit;h=ac0b3b05ab52d0ac06137cf93d71187c7957ec99)
a missing-repaint problem in LibreOffice's headless backend, but the root
cause wasn't close to the symptom I saw first. Part of the debugging process
was to understand what's the relation between `sdr::contact::ViewContact`,
`sdr::contact::ViewObjectContact` and `sdr::contact::ObjectContact`.

See
[this
old presentation](http://www.openoffice.org/marketing/ooocon2006/presentations/wednesday_g11.odp) and the [review of my
documentation update](https://gerrit.libreoffice.org/27190) for the details, but the short version is that:

- somewhat confusingly, `sdr::contact::ViewContact` is part of the *model*, and
  there is one `sdr::contact::ViewContact` object per shape
- `sdr::contact::ViewObjectContact` is part of a view, and there is one
  `sdr::contact::ViewObjectContact` per shape, per view
- finally `sdr::contact::ObjectContact` is part of a *view*, and there is one
  `sdr::contact::ObjectContact` per view

So the answer to my original 'Is it normal that I have two object contacts and
a single view contact for a shape and two views?' question is: yes, that's
expected. ;-) Hopefully the updated documentation is now more clear, the
incorrect 1:N relation in the original class diagram first confused me.
