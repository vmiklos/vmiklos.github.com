Title: LibreOffice comment finder
Slug: libreoffice-comment-finder
Category: hacking
Tags: en
Date: 2010-12-02T00:39:51Z

So I wrote a [short script](http://article.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/2938) to find undocumented classes in the LibreOffice source code - I don't mean when some of the public methods are not documented, but the case when the class itself doesn't even have a one-liner mission statement.

Of course it should be used with care - if someone starts adding bullshit or misleading documentation using this script, that just makes the situation even worse.

The patch generated a nice [thread](http://thread.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/2938) where basically they argue if it makes sense to have a KDE-like API documentation for LibreOffice or it's just better to refactor code to have self-documenting function names, etc.

At the end of the they, looks like there are people who find it [great](http://article.gmane.org/gmane.comp.documentfoundation.libreoffice.devel/3032). :) (In the meantime that patch has been pushed, of course.)
