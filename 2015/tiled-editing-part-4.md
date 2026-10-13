Title: Android editing: from selections to graphic handling
Slug: tiled-editing-part-4
Category: libreoffice
Tags: en
Date: 2015-03-19T12:26:34Z

In [from input handling to
selections]({filename}/2015/tiled-editing-part-3.md), I wrote about how we let LibreOffice Android app draw the
selections around text content natively. A next step in this
[TDF-funded
project](http://blog.documentfoundation.org/2015/01/27/the-document-foundation-announces-the-results-of-the-android-tender/) is to provide selections around more UI elements: images and shapes.

Here are a number of challenges we ([Tomaž Vajngerl](http://tomazvajngerl.blogspot.com/) and me) faced while we implemented this:

- On Linux (the desktop), the move and resize operations are really similar:
  if you click near a resize handle (you "hit it"), then it'll be a resize,
  otherwise it'll be a move. Defining "near" means that you don't have to
  click exactly at the center of the handle, but we allow some tolerance. Turns
  out that the tolerance depended on the pixel size of the handle drawn on the
  desktop: and because we don't package the bitmaps of the desktop UI, that
  tolerance was 0.
- Writer normally requires a click and a double-click to start editing shape
  text. One to select the shape and another to actually start the text
  editing. Instead of literally translating this to a tap and a long push, we
  wanted to start text editing right away if the user tapped on shape text.
- Shape text doesn't use the normal Writer text, but editeng -- used by
  Impress and Calc, too. So we had to instrument the editeng module as well to
  expose the blinking cursor, so that if you tap inside the editeng text, you
  have some feedback where you are. Same is true for the cursor handle: once we
  knew where the cursor is, we could draw the cursor handle, but dragging it did
  nothing: now the `setTextSelection()` LOK API handles the case when the cursor
  is inside editeng text and can adjust the cursor position there, too.
- On Linux, users got used to the following resize behavior: when images are
  resized, the aspect ratio is kept, but this is not the case for shapes. We
  wanted to keep this behavior on Android, too.

If you are interested how this looks like, here is a demo (click on the image to see the video):

[![Graphic selections on Android](https://lh5.googleusercontent.com/-JEuiW789JEM/VQqrR8zDHjI/AAAAAAAAFVo/ORgDKNBIIJA/s800/)](http://youtu.be/bTWLz_4YQtA)

Notice how the word selection in a table turns into a table selection, or how
a long push inside an empty cell creates a selection containing only the empty
cell.

An other direction we're working towards is to show / hide the soft keyboard
of Android as you would expect it. On Linux, it's easy: the keyboard is always
available. However on Android you should track when it makes sense to use the
keyboard and when not -- and show/hide automatically according to the context.
Examples:

- When you tap inside text, we show the keyboard.
- When you finish editing, we hide it.
- When you start scrolling, we hide it.
- When you select an image, we hide it.

Additionally, we need to handle the situation when this automagic goes wrong.
The Android soft keyboard has a button to hide itself, but we added a toolbar
button to force-show it, too (click on the image to see the video):

[![Force-show of the Android clipboard](https://lh6.googleusercontent.com/-rUxX9gC9z4M/VQqrR0rIyMI/AAAAAAAAFVk/y5GluM-u5eg/s800/)](http://youtu.be/36MsGe-7Mpo)

Finally, [Siqi Liu](https://siqi43.wordpress.com/) added a new callback type,
allowing to tap on hyperlinks and handle them according to how you
configured URL handling on your Android device. Here is a demo to show this in
action:

[![Opening hyperlinks](https://lh6.googleusercontent.com/-tNnSAiN3p-o/VQqrR5UslSI/AAAAAAAAFVg/xCbkq7-Vark/s800/)](http://youtu.be/dBcGVu5pcSk)

That's it for now -- as usual the commits are in master (a few of them is only
in feature/tiled-editing for now), so you can try this right now, or wait till
the next Tuesday and get the
[Android
daily build](http://dev-builds.libreoffice.org/daily/master/Android-ARM@24-Bytemark-Hosting/current/). :-)
