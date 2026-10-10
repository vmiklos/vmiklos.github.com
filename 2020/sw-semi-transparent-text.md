Title: Semi-transparent text in Writer
Slug: sw-semi-transparent-text
Category: libreoffice
Tags: en
Date: 2020-02-26T11:25:31+01:00

## The problem

Last year I [posted]({filename}/2019/sd-semi-transparent-text.adoc) about work to have
semi-transparent rendering of not only shape fill and shape borders, but also shape text in Draw.
Now the same semi-transparent text feature is available in Writer as well. This improves
compatibility with Word, which supports the same feature in its DOCX format. You can access the new
option in the Format -> Character dialog.

## Result

Here is how the new, old and reference rendering looks like:

![Semi-transparent text in Writer, new rendering](https://lh3.googleusercontent.com/oifzSVcdmKhomkQQKy4CNnPmamHtoo9CwRsbg9_ekbeK9Ov_4dFrzrJrYmDLHZNm-IvsoYNy8YfSs5kp4yEA42jybRO-8P-YKI8fYRu5ColRbzFHQBotP4MvkjanZG7JX9vP8Mcnnw=w640)

![Semi-transparent text in Writer, old rendering](https://lh3.googleusercontent.com/RxtyxxIdrW14TtN30cf37e7RNHwnQpxlX-zhjhpWrggjStEERXvUnH7eDv8acM_8DcySNpnvpz5yWdwO12_cmQ6ZyCo4-fpIOdd3x9Q8SAXxAwuyMhfmjzhvS9VDBps8tQX-xB70RA=w640)

![Semi-transparent text in Writer, reference rendering](https://lh3.googleusercontent.com/6rkCyXnzfiVN96D1h8PiKSIva1ydRFQXzUbXbbLC-9plXOUJnMRHZT2ba4eKt7W1wqfL3vscVgE1-QB5ztbp2uqSmguOALV8wyZDnCF4LPlyHSbVEm5atwZvf29w3PzRmjy11aQahA=w640)

## Want to start using this?

<!-- git log --grep 'sw.*semi-transparent text' -->

You can get a snapshot / demo of Collabora Office and try it out yourself right now:
[try unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
is a major contributor to LibreOffice and all of this work will be available in TDF's next release
too (7.0).