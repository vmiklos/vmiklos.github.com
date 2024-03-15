---
title: Bookmarks
...

# android

- [lineageos ringtones](https://mattelog.wordpress.com/2017/03/22/download-all-lineageos-alarm-notification-ringtone-and-ui-sounds/)
- [scrcpy](https://github.com/Genymobile/scrcpy): screen sharing for Android
- [wireless adb](https://developer.android.com/about/versions/11/features#wireless-adb)

# asciidoc

- [slide example](https://ostrovsky.org/gerrit/gerrit-change-workflow/gerrit-change-workflows.html) ([source](http://ostrovsky.org/gerrit/gerrit-change-workflow.jar))

# clang

- [The Clang AST - a Tutorial](https://www.youtube.com/watch?v=VqCkCDFLSsc)
- [An update on Clang-based C++ Tooling](https://www.youtube.com/watch?v=1S2A0VWGOws) (clang-tidy tricks: Lexer::getLocForEndOfToken, CharSourceRange::getTokenRange)

# code of conduct

- [c0c](http://repo.hu/projects/c0c/c0c.html)
- [sqlite codeofconduct](https://sqlite.org/codeofconduct.html)

# cpp

- [The Problem with const Data Members](https://www.drdobbs.com/the-problem-with-const-data-members/184403306)

# git

- [find broken branch when git gc fails](https://public-inbox.org/git/3af0f8cc-09f3-bcf2-04c8-f076e0ddcea2@xiplink.com/t/)

# google

- [Setting A Catchall Email For G Suite in 2018](https://robbettis.com/blog/2018/1/4/setting-a-catchall-email-for-g-suite-in-2018)
- [G-Suite Catch-All Address Assignment in 2018](http://perfectfitcomputers.ca/g-suite-catch-all/)
- [google photos direct link generator](https://ctrlq.org/google/photos/)

# guitar

- [csalamade toc](http://www.gitaroktatas.eoldal.hu/cikkek/nyitooldal/a-kozel-900-dal-az-osszes-csalamadebol.html)

# hungary

- [car parking info](https://nmzrt.hu/szolgaltatasok/parkolas/parkolasi-zonak.html)
- [puzzle helper](https://bitepito.hu/rejtveny/)

# imagemagick

- [imagemagick concatenate images](https://www.imagemagick.org/discourse-server/viewtopic.php?t=15523): `convert image1 image2 +append result`
- [thumbnail generation](http://www.imagemagick.org/Usage/resize/): `convert orig.png -resize 640x640 orig.t.png`
- [pdf downscale](https://stackoverflow.com/questions/21147217/add-margin-to-pdf-page) or: `pdfjam --paper a4paper --scale 0.8 input.pdf -o output.pdf`

# katolikus

- [rajzos evangélium](http://rajzosevangelium.hupont.hu/)

# A Layman's Guide to ...

These are tutorials I found very useful before jumping into an actual spec.

- [ASN.1](http://luca.ntop.org/Teaching/Appunti/asn1.html)
- [Assembly](https://blog.stephenmarz.com/2020/05/20/assemblys-perspective/)
- [SmartArt](https://docs.microsoft.com/en-us/archive/msdn-magazine/2007/february/create-custom-smartart-graphics-for-use-in-the-2007-office-system)
- [C++ type traits](https://www.internalpointers.com/post/quick-primer-type-traits-modern-cpp)
- [PDF](https://www.adobe.com/technology/pdfs/presentations/KingPDFTutorial.pdf)
- [PDF signing](https://www.adobe.com/devnet-docs/etk_deprecated/tools/DigSig/Acrobat_DigitalSignatures_in_PDF.pdf)

# lego

- [Find LEGO Sets and MOCs you can Build](https://rebrickable.com/build/)
- ['10696, LEGO® Medium Creative Brick Box, LEGO® Classic' instructions](https://www.lego.com/en-us/service/buildinginstructions/10696) -- some of these are not printed, even if you buy the product

# libreoffice

- [compat flags](https://people.freedesktop.org/~mst/LibreOffice_settings.xml_config-items.ods)

# linux

- [how to mount encrypted lvm in rescue system](https://forums.opensuse.org/showthread.php/494317-How-to-access-encrypted-LVM-filesystem-in-rescue-mode-ext3-filesystem-cannot-mount?p=2615131#post2615131): `cryptsetup luksOpen /dev/sdXY cr_lvm; vgscan; vgchange -a y`
- [Set the system timezone based on IP geolocation](https://github.com/cdown/tzupdate)

# matrix

- [heisenbridge](https://github.com/hifi/heisenbridge) irc bridge
- [mautrix-bridges](https://docs.mau.fi/bridges/)

# mutt

- [why mutt](https://useplaintext.email/)
- [open .eml files with mutt](https://unix.stackexchange.com/questions/38681/opening-eml-files-with-mutt)

# openstreetmap

- [cycle routing with time estimate](https://www.naviki.org/en/naviki/plan-route/)

# opensuse

- [opensuse contriburing howto](https://en.opensuse.org/openSUSE:Build_Service_Collaboration)

# pdf

- [pdfnup](https://github.com/rrthomas/pdfjam-extras/blob/master/bin/pdfnup): `pdfnup --landscape -o out.pdf --nup 2x1 in.pdf`

# python

- [how to debug](https://docs.python.org/3/library/pdb.html): `import pdb; pdb.set_trace()` at the place where you would put a breakpoint

# qemu

- [revert to snapshot](https://linuxhint.com/kvm_snapshots_libvirt/)
- [windows 10](http://bkanuka.com/posts/windows-10-libvirt/) best practices

# rant

- [why no private support messages](http://people.apache.org/~hossman/#private_q)
- [why no rewrites](https://www.joelonsoftware.com/2000/04/06/things-you-should-never-do-part-i/)
- [why rewrites are expensive](https://8thlight.com/blog/doug-bradbury/2018/11/27/true-cost-rewrites.html)
- [use GitHub with care](http://joeyh.name/blog/entry/the_single_most_important_criteria_when_replacing_Github/)
- [should be a one-line change](https://www.simplethread.com/dear-client-heres-why-that-change-took-so-long/)
- [why incremental development](https://llvm.org/docs/DeveloperPolicy.html#incremental-development)
- [why no tablets](https://www.engadget.com/2019/06/20/google-is-giving-up-on-tablets/)
- [why IRC](https://drewdevault.com/2019/07/01/Absence-of-features-in-IRC.html)
- [why no management](https://improvingsoftware.com/2009/05/19/programmers-before-you-turn-40-get-a-plan-b/)
- [why no phone in church](https://me.me/i/by-entering-this-church-it-may-be-possible-that-you-08e32ab5101b46f7859d63b385748005)
- [why no change detector tests](https://testing.googleblog.com/2015/01/testing-on-toilet-change-detector-tests.html)
- [why no GC](https://blog.discordapp.com/why-discord-is-switching-from-go-to-rust-a190bbca2b1f) (if performance is critical)
- [why don't publish depend on google play store](https://blog.pushbullet.com/2022/10/27/how-we-became-the-worlds-foremost-expert-on-google-play-store-policy-violations/)
- [why no Oracle](https://lwn.net/Articles/935092/)

# recipe

- [mulled wine](http://www.mindmegette.hu/forralt-bor-egyszeruen.recept/)

# reddit

- [ELI5](https://www.reddit.com/r/explainlikeimfive/)

# rubik

- [wca notation](https://meep.cubing.net/wcanotation.html)

# rust

- [Matthias Endler - Idiomatic Rust](https://www.youtube.com/watch?v=P2mooqNMxMs) (mentions [clippy](https://github.com/rust-lang/rust-clippy))
- [forcing Rust to tell you an underlying type](https://news.ycombinator.com/item?id=19501546): `let _: () = foo;`

# samba

- [unexpected 755 perms for plain files between 2 linux machines and how to fix](https://askubuntu.com/questions/982266/how-to-mount-cifs-with-unix-extensions)

# screencast

- show pressed keys nicely: [screenkey](https://gitlab.com/wavexx/screenkey)
- record screen: [simplescreenrecorder](http://www.maartenbaert.be/simplescreenrecorder/)
- video editor GUI: [openshot](http://www.openshot.org/), [pitivi](http://www.pitivi.org/) or [kdenlive](https://kdenlive.org/en/) (this last one seem to be the best at the moment)

# sleep

- [antisleepers](http://web.archive.org/web/20090131194011/http://antisleepers.xtrinal.net/archivum/5/summer08/)
- [sleepavg](https://github.com/vmiklos/vmexam/blob/master/python/sleepavg)

# twitter

- [find twitter people on the fediverse](https://fedifinder.glitch.me/)

# vim

- [hex dump](http://vim.wikia.com/wiki/Hex_dump): `xxd -p foo.bin > foo.hex` or
  `xxd -p -r foo.hex > foo.bin`
- [editing binary files](http://vim.wikia.com/wiki/Hex_dump#Editing_binary_files) or to skip a header of N bytes: `dd if=in.bin of=out.bin bs=1 skip=N`
- [macros: repating the same thing in a smart way](https://vim.fandom.com/wiki/Macros)

# xpath

- [interactive playground](https://scrapinghub.github.io/xpath-playground/) ([mirror](https://share.vmiklos.hu/pages/xpath-playground/))
- [xpather: interactive playground with namespace support](http://xpather.com/)

# youtube

- [Budai Szent Imre Plébánia](https://www.youtube.com/channel/UC875fZvRf9SsQPihFtqGy6w)
- [Csíksomlyó Élő](https://www.youtube.com/channel/UChrkbh0y4ut-mELoCTRPR_Q)
- [jezsuitak live](https://www.youtube.com/jezsuitak/live)
- [meetthegermans](https://www.youtube.com/hashtag/meetthegermans)
