Title: Markdown import in Writer: the new template option
Slug: sw-markdown-templating
Category: libreoffice
Tags: en
Date: 2025-12-03T09:35:36+01:00

Writer recently got a new markdown import option to take styles from a template, leading to much
prettier output when converting markdown to PDF, DOCX or ODT.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the templating
feature is available in desktop Writer as well.

## Motivation

A [previous post]({filename}/2025/sw-markdown-filter.md) mentioned recent improvements to the
markdown import/export in Writer.

But if you convert some markdown to e.g. PDF, all the headings just have the default look, wouldn't
it be nice to take your organization template and add colors and other formatting there,
automatically?

Also, wouldn't it be nice if you could paste as markdown in COOL or copy the current selection as
markdown? Which would enable all sorts of interesting use-cases, like using an external API to turn
the selection into a summary or translating it to a different language.

## Results so far

Here is a sample input markdown:

```markdown
# heading 1

body text
```

Here is how it looks like if you template it using the core.git `sw/qa/filter/md/data/template.docx`
sample:

[![PDF result: templated](https://share.vmiklos.hu/blog/sw-markdown-templating/templated.png)](https://share.vmiklos.hu/blog/sw-markdown-templating/templated.png)

curl invocation for this:

```bash
curl -k -F "data=@/path/to/test.md" -F "template=@/path/to/template.docx" -F "format=pdf" -o out.pdf https://localhost:9980/cool/convert-to
```

Or example desktop command-line:

```bash
soffice --infilter='Markdown:{"TemplateURL":{"type":"string","value":"./template.ott"}}' test.md
```

While it would look like this by default:

[![PDF result: default](https://share.vmiklos.hu/blog/sw-markdown-templating/default.png)](https://share.vmiklos.hu/blog/sw-markdown-templating/default.png)

The other part is the PostMessage API of COOL, if you want to copy and paste as markdown. What's
newly possible:

- Copy the current selection: set MessageId to `Action_Copy` and the value to `{"Mimetype": "text/markdown;charset=utf-8"}`
- Paste at the current cursor position: set MessageId to `Action_Paste` and the value to
  something like `{"Mimetype": "text/markdown;charset=utf-8", "Data": "foo _bar_ baz"}`

You can read more about the PostMessage API in the [COOL
SDK](https://sdk.collaboraonline.com/docs/postmessage_api.html).

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes. Core side:

- [tdf#169316 sw markdown import: add a TemplateURL parameter](https://git.libreoffice.org/core/commit/7462639341c043bf72560e0ddfff06e1e8879859)
- [tdf#169316 sw markdown import, template: handle non-ODF formats as well](https://git.libreoffice.org/core/commit/6d1312e160ee8c2c0f65b6e0a86333bf3c9c60ce)
- [cool#13468 sw markdown paste: add UNO command parameter to skip the detection](https://git.libreoffice.org/core/commit/64cf69926b7cb6fc94efd792b173ac12aa93cb8f)
- [Related: tdf#169251 sw markdown export: fix crash on OLE with no graphic](https://git.libreoffice.org/core/commit/5ae32bee8dfe5b3264debc02276a3eeac7f51021)

Online side:

- [cool#13419 convert-to template option: handle multiple streams in ConvertToPartHandler](https://github.com/collaboraonline/online/commit/5741a8fe91f9fe2969926cf70c8c51f1dd144ad5)
- [cool#13419 convert-to template option: pass it to doc broker](https://github.com/collaboraonline/online/commit/31109066f2ea2b935cd9d2bc06b5debc6206b41a)
- [cool#13419 convert-to template option: pass it to the kit process](https://github.com/collaboraonline/online/commit/3916a7f82fd6454409b86b9915d33f9f2491a348)
- [cool#13419 convert-to template option: more strict param name, generalize filenames](https://github.com/collaboraonline/online/commit/b993c314e1b50aea382a1dac7391a3949e65045b)
- [cool#13419 convert-to template option: add testcase](https://github.com/collaboraonline/online/commit/852479accd67880934393f14c4101ad72e9ba806)
- [cool#13468 PostMessage API: allow copying the current text selection](https://github.com/collaboraonline/online/commit/81881d58fd537924091a5e2e41d033e91c98c8be)

## Want to start using this?

You can get a development edition of Collabora Online 25.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect the core of this work
will be available in TDF's next release too (26.2).
