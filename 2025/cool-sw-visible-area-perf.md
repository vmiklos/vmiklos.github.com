Title: Improving interactivity: the Writer visible area in Collabora Online
Slug: cool-sw-visible-area-perf
Category: collabora-online
Tags: en
Date: 2025-02-21T08:21:45+01:00

[Collabora Online](https://www.collaboraoffice.com/) now takes the visible area (viewport) of large
Writer documents into account in more cases, leading to better performance & interactivity.

## Motivation

Collabora Online has two kinds of "visible areas" for a document: on one hand, the entire document
is visible, so in case any part of the document changes, the browser client gets notified; on the
other hand, there is a viewport in the web browser, and keeping that up to date is a priority,
compared to the rest of the document.

There were some cases in the past where we handled the entire document with the same priority,
leading to slower than ideal update times on the UI.

Wouldn't it be nice to always update the visible part first, and only then deal with the rest, on
idle?

## Results so far

When looking at this topic, we noticed a cluster of problems:

First, consider the case of a long (~300 pages) document, where you insert a page break at the start
and wait for the update of the visible area. The entire document layout (now 301 pages) were
calculated, and now we do this for the visible area synchronously (and the rest on idle).  This
operation is now about 19 times faster.

Second, loading a long document calculated the entire layout before showing the first page. This is
now improved, the document loading time itself at a LOK API level for such a long document is now
about 5 times faster.

[![Faster render of the first page in COOL 24.05](https://share.vmiklos.hu/blog/cool-sw-visible-area-perf/faster-load.png)](https://www.youtube.com/watch?v=0vnEgwBaqt8)

Third, COOL didn't consider the priority of core tasks when interrupting to do its own work (COOL's
document editing process and LibreOffice core shares the same main loop). Now we do this,
categorizing the core tasks into "high priority" and "low priority" buckets and we only interrupt
when core doesn't have high priority tasks any more (this is only in 25.04).

Fourth, there was no easy access to a large Writer document during development. Now `make run
COOL_WRITER_LARGE=y` allows opening a long document in your local browser for development / testing
purposes.

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

As usual, the high-level problem was addressed by a series of small changes:

- [cool#11064 kit: send the client's visible area during file load](https://github.com/collaboraonline/online/commit/dec9a0d135bad35c958d1eee8f76048189a5601e)
- [cool#11064 kit: check for callbacks & wsd socket in the anyInput callback](https://github.com/collaboraonline/online/commit/500df64292e53fe07c92d492511ed82bfcb8b546)
- [cool#11064 any input: conditionally consider priority of core tasks](https://github.com/collaboraonline/online/commit/31dae7872b914e15bf81ab49fd731383808b3a01)
- [cool#11064 any input: add page insert testcase](https://github.com/collaboraonline/online/commit/92573acd1bd45b643ab361484cdbfac7dc262dc6)
- [cool#11064 test: support creating a large Writer document with many pages](https://github.com/collaboraonline/online/commit/73793c24c7b77f2026e3af2673c4513278dd27c6)

The tracking issue was [cool#11064](https://github.com/CollaboraOnline/online/issues/11064).

## Want to start using this?

You can get a development edition of Collabora Online 24.04 and try it out yourself right now: [try
the development edition](https://www.collaboraoffice.com/code/).
