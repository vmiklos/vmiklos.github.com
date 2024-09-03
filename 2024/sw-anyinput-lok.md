Title: Improved interactivity for LOK clients in Writer's layout
Slug: sw-anyinput-lok
Category: libreoffice
Tags: en
Date: 2024-09-03T08:08:13+02:00

Writer now has support for doing partial layout passes when LOK clients have pending events, which
sometimes improves interactivity a lot.

This work is primarily for [Collabora Online](https://www.collaboraonline.com/), but the feature is
useful for any LOK clients.

## Motivation

I recently worked with a document that has relatively simple structure, but it has 300 pages, and
most of the content is part of a numbered list. Pasting a simple string (like an URL) into the end
of a paragraph resulted in a short, but annoying hang. It turns out we updated Writer's layout for
all the 300 pages before the content was repainted on the single visible page. In theory, you
could reorder events, so you first calculate the first page, you paint the first page, then you
calculate the remaining 299 pages. Is this possible in practice? Let's try!

## Results so far

The relevant part of the test document is simple: just an empty numbered paragraph, so we can paste
somewhere:

[![Bugdoc: empty paragraph, part of a numbered list and then pasting an URL there](https://share.vmiklos.hu/blog/sw-anyinput-lok/paste.png)](https://share.vmiklos.hu/blog/sw-anyinput-lok/paste.png)

This is a good sample, because pasting into a numbered list requires invalidating all list items in that
list, since possibly the paste operation created a new list item, and then the number portion has to
be updated for all items in the rest of the list. So if you paste into a numbered list, you need to
re-calculate the entire document if all the document is just a numbered list.

The first problem was that Writer tracks its visible area, but LOK needs two kinds of visible areas.
The first kind decides if invalidations are interesting for part of the document area. LOK wants to
get all invalidations, so in case we cache some document content in the client that is near the
visible area, we need to know when to throw away that cache.  On the other hand, we want to still
track the actually visible viewport of the client, so we can prioritize visible vs hidden parts of
the document. Writer in LOK mode thought that all parts of the document are a priority, but this
could improved by taking the client's viewport into account.

The second problem was that even if Writer had two layout passes (first is synchronous, for the
visible area; second is async, for the rest of the document), both passes were performed before
allowing a LOK client to request tiles for the issued invalidations.

This is now solved by a new `registerAnyInputCallback()` API, which allows the LOK client to signal if
it has pending events (e.g. unprocessed callbacks, tiles to be painted) or it's OK for Writer layout
to finish its idle job first.

The end result for pasting a URL into this 300 pages document, when measuring end-to-end (from
sending the paste command to getting the first updated tile) is a decrease in response time, from
963 ms to 14 ms.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#9735 sw lok: take LOK vis area into account when deciding idle layout](https://git.libreoffice.org/core/commit/e1e77b313c9fe0fff814384a67de415e33c8b27f)
- [Related: cool#9735 vcl lok: add an AnyInput() callback](https://git.libreoffice.org/core/commit/a22fe103e7a26270b7213448c570400a563c18ba)
- [Related: cool#9735 sw lok: handle the AnyInput() callback during idle layout](https://git.libreoffice.org/core/commit/41aec3e9a088ad4e99e43e033c7653e2c25a85ba)
- [sfx2: fix crash in SfxObjectShell::IsHelpDocument()](https://git.libreoffice.org/core/commit/3974af7dca82f887dfdfe88f087583508c19e7ab)

The tracking issue for this problem was
[cool#9735](https://github.com/CollaboraOnline/online/issues/9735).

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraonline.com/code/).  Collabora intends to continue
supporting and contributing to LibreOffice, the code is merged so we expect all of this work will be
available in TDF's next release too (24.8).
