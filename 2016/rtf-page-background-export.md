Title: RTF page background export in LibreOffice Writer
Slug: rtf-page-background-export
Category: libreoffice
Tags: en
Date: 2016-01-12T10:11:16Z

While I added support for page background colors in the RTF import
[back
in 2013](http://cgit.freedesktop.org/libreoffice/core/commit/?id=14e163b0caf97addf340aefc5760a9031ec98390), the export part was missing up to now.

If you set a solid color fill for a page style, and you export it to RTF, here
is how the reference rendering output looks like:

[![Reference rendering](https://lh3.googleusercontent.com/-JI384fzDsng/VpEkSeMEgfI/AAAAAAAAGYY/GXhT1tzi4WQ/s900-Ic42/reference.png)](https://lh3.googleusercontent.com/-JI384fzDsng/VpEkSeMEgfI/AAAAAAAAGYY/GXhT1tzi4WQ/s900-Ic42/reference.png)

However, in Libreoffice only the background of the paragraph reflected the
color set by the user:

[![Old rendering](https://lh3.googleusercontent.com/-YZDNx5H0qYQ/VpEkSWxf2II/AAAAAAAAGYU/o4Q06VeBK-I/s900-Ic42/bad.png)](https://lh3.googleusercontent.com/-YZDNx5H0qYQ/VpEkSWxf2II/AAAAAAAAGYU/o4Q06VeBK-I/s900-Ic42/bad.png)

After implementing this feature in the RTF export filter, it now looks much
closer to the reference:

[![New rendering](https://lh3.googleusercontent.com/--6VbXTzbA_k/VpEkSWJB7tI/AAAAAAAAGYc/D7KEn0lLvXw/s900-Ic42/good.png)](https://lh3.googleusercontent.com/--6VbXTzbA_k/VpEkSWJB7tI/AAAAAAAAGYc/D7KEn0lLvXw/s900-Ic42/good.png)

At the moment only solid fill is implemented, so other advanced fill types
like graphics or gradients are still missing.
