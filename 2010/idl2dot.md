Title: idl2dot
Slug: idl2dot
Category: hacking
Tags: en
Date: 2010-12-23T02:29:22Z

I needed a tiny tool to generate something classdiagram-like from CORBA
IDL files. Given that I did not find such a tool, I wrote it.

You can find it
[here](http://vmiklos.hu/gitweb/?p=swar.git;a=blob;f=doc/idl2dot;hb=HEAD).

An example: [idl](http://vmiklos.hu/file/swar.idl) ->
[scalable output](http://vmiklos.hu/file/swar-classdiagram.pdf).

**NOTE:** Right now it does not support typedefs, enums and exceptions. If
you need such a feature, patches are welcome. :)
