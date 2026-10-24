Title: git-cvsimport mini howto
Slug: git-cvsimport-mini-howto
Category: hacking
Tags: en
Date: 2007-11-23T21:26:23Z

<p>recently i needed to convert a cvs repo to git, in fact i'm providing a git mirror, so i need incremental updates.</p><p>here is the command i needed:</p><p><code>$ git cvsimport -d :pserver:anonymous@tcpflow.cvs.sourceforge.net:/cvsroot/tcpflow -C tcpflow tcpflow</code></p><p>yes, this will do the initial conversion and the incremental one, too. :)</p>
