Title: d2x, darcs-fast-import and the asciidoc repo
Slug: d2x-darcs-fast-import-and-the-asciidoc-repo
Category: hacking
Tags: en
Date: 2009-09-09T03:28:09Z

![mercurial logo](https://lh3.googleusercontent.com/NcAERI7ce8wxCIZ8XhvTZguymMVdpDTlpS1FjU-3AoGji204BO5Ig5I624XpRXZEWRmhpnEx77nJtFvjqqY_1XKVL5cjHjIgfZGwEOVHbomN_UiWwS57M1KC2qkW0GH3GsHqyq-DKA=w640)

I proposed a [new merge](https://code.launchpad.net/~vmiklos/bzr-fastimport/darcs/+merge/11406) for bzr-fastimport with the following hilights:

- darcs-fast-import can now import the asciidoc hg repo
- d2x -f hg (which converts a darcs repo to a hg one) now works with hg 1.3, and without my hg
  fastimport fork. The later is something I'm really happy about, because I hated recommending my hg
  fastimport patches, not being a hg person. :)
