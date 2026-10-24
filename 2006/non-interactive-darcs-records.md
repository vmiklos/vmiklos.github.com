Title: non-interactive darcs records
Slug: non-interactive-darcs-records
Category: hacking
Tags: en
Date: 2006-10-26T00:26:16Z

i've just figured out how to append long comments to darcs patches from a script:
<code>$ echo "`date +"%a %b %d %H:%M:%S %Z %Y"`
> VMiklos <vmiklos@frugalware.org>
> name
> long
> comment" | dr rec -a --pipe</code>
