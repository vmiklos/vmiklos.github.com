Title: Commenting on images and charts in Writer
Slug: writer-image-comments
Category: libreoffice
Tags: en
Date: 2019-07-16T12:11:23+02:00

## The problem

Years ago I [posted]({filename}/2012/lo-sw-comment-range.adoc) about work to attach comments to text
ranges. This improved compatibility with Word greatly, but it was always a piece of text that was
commented, never frames. If you just selected a frame and tried to comment by selecting the menu
entry or the `Ctrl-Alt-C` shortcut, nothing happened, because frame selection did not interpret
comment insertion.

## Result

![Comment on an at-char anchored image in Writer](https://lh3.googleusercontent.com/PvlDM6Ox1UBEXj57F4SyBN5hlv1sjJHjI4VjmwIoM-3btxSR1Uh5HAwch_tw95vDOhdSZnEbDPkuYYAU2iiHvSeHafFtToGQzntEqO8wGgkDgmIOxGBXWw6vdTPQlgPPF3lFd0ES8Q=w640)

Examples for frames are images or charts. This needs explicit handling, so at the moment the at-char
and as-char anchor types are supported, and you can simply insert the comment to a frame once the
frame is selected. This works in both desktop Writer and Online.

## Want to start using this?

<!-- Commit prefix: 'sw comments on frames: ' -->

You can get a snapshot / demo of Collabora Office and try it out yourself right now:
[try unstable snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora
is a major contributor to LibreOffice and all of this work will be available in TDF's next release
too (6.4).