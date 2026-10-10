Title: SmartArt improvements in Impress, part 5
Slug: smartart-improvements-5
Category: libreoffice
Tags: en
Date: 2020-08-19T09:24:04+02:00

Impress now has support for considering rules next to constraints when it comes to lay out
SmartArt graphics from PPTX files. This builds on top of the
[previous improvements]({filename}/2019/smartart-improvements-4.adoc) around SmartArt support.

First, thanks to our partner [SUSE](https://www.suse.com/) for working with
[Collabora](https://www.collaboraoffice.com/) to make this possible.

## Motivation

SmartArt allows declaring your content and requirements for a graphic, then the layout will take
care of arranging that in a suitable way. It is allowed to declare conflicting requirements, and
rules can specify how to resolve those conflicts. The below example document has shape widths
defined in a way that multiple child shapes wants to have a width of 100%, but simply scaling down
all child shapes does not give a correct result. Rules define what to scale down and what to leave
unchanged.

## Results so far

Here is how this works in practice:

![Linear layout with multiple 100% width shapes, new output](https://lh3.googleusercontent.com/_AL6ARVsbgdaovqKPxr0n0I1kSn2zX_5xGg5y_4M8whkT6K0-mXIsGXeYI2Uo6u2YQAVwfLtbfy8XeYHggaPWpIHV4yaA4CaaIFUK4LQLRbV-JIbhy9A-Xz5JEEbcXp3TRWK4CzVcl0=w640)

![Linear layout with multiple 100% width shapes, old output](https://lh3.googleusercontent.com/UmK7-j0WxUHamDA-g3FepAOYYgbD5LJJhssleqv2jLnfXX-62fP82uA_5t__9HOQWIZfJUl6hoZVVQX5-LuIdOxz2M0HS90zcaoov_SbxQHuv4DN48be8dZkvySb_QtAbmNOTcMpJ5c=w640)

![Linear layout with multiple 100% width shapes, reference output](https://lh3.googleusercontent.com/i2ScJOwjQfQeeFrw-yu6EQt67nt5Xx7o325WnaOeprXH4jc_CPLuXt0Mwb2iiT9rBamjooEA271HY48P6v8ieuWMUcoSq5HTjMsJkJnUOcrCrF_7uutebYGfO2WOZzAJRh6k-ibbglc=w640)

## How is this implemented?

If you would like to know a bit more about how this works, continue reading... :-)

- The initial heavy-lifting is done in
  [this commit](https://git.libreoffice.org/core/commit/6ca5412bac9e3da5cd20f315fc853c7733f10858),
  which parses the rules from the XML input.

- Then once we had rule info around, the linear algorithm was improved to scale down child shapes
  based on rules (and not just all of them, equally).

- Then it was necessary to scale spacings (between child shapes) based on rules as well.

- It was also needed to limit the height request of a shape, since they should not leave the canvas
  of the SmartArt.

- Finally it was necessary to support the "top" child order. This can be declared using the
  following markup:

```xml
<dgm:layoutNode ... chOrder="t">
```

This declares that an earlier shape in a linear layout is on top of a later shapes, not the
opposite. The default is that newer shapes are on top of older shapes. This is not a visible
problem usually, but once you start using negative widths in a linear layout, you can have
overlapping shapes. The above example has 3 text shapes, which are overlapping with the "background"
arrow shape. This is expressed by having 100% width for child shapes (OK to scale down), then a
-100% width for a dummy shape (not scaling) and finally a 100% width for the background arrow (not
scaling).

All in all, now the background arrow shape has a good position and size, and the text on the arrow
is readable.

## Want to start using this?

You can get a snapshot / demo of Collabora Office and try it out yourself right now: [try unstable
snapshot](https://www.collaboraoffice.com/collabora-office-latest-snapshot/).  Collabora is a major
contributor to LibreOffice and all of this work will be available in TDF's next release too (7.1).