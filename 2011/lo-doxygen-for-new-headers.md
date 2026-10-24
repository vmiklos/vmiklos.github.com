Title: LibreOffice's git-hooks now warn about undocumented classes
Slug: lo-doxygen-for-new-headers
Category: libreoffice
Tags: en
Date: 2011-01-21T18:35:17Z

There was a thread about this topic already, but just refusing to commit
new files without documentation sounded too aggressive. So the
[current code](http://cgit.freedesktop.org/libreoffice/bootstrap/commit/?id=5e7d47da56c9b35331756bcb915b23e2f14a62d6) just prints a warning.

It was also requested to show some good/bad examples. Lubos
[volunteered](http://thread.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/2938/focus=5389)
to add detailed instructions in the wiki, so I'm just describing in
short what did I test so far.

A good example:

```cpp
/// Handles export of foos using RTF markup
class RtfFoo
{
};
```

A bad example:

```cpp
class RtfBarBuggy
{
};
```

Example output when a warning is emitted:

```
~/git/libreoffice/master/sw$ git commit -a -m foo
sw/source/filter/ww8/bar.hxx:30: warning: Compound RtfBarBuggy is not documented.
[master 1b11571] foo
 3 files changed, 68 insertions(+), 0 deletions(-)
 create mode 100644 sw/source/filter/ww8/bar.hxx
 create mode 100644 sw/source/filter/ww8/foo.hxx
```
