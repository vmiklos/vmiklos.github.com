Title: title 27
Slug: title-27
Category: hacking
Tags: en
Date: 2005-10-31T23:17:16Z

bmh rewrote the checkpkgs script in python and added some new features. for example i wanted to know which pkgs are not available on i686 (excluding the emulation pkgs):
<pre>$fst_root/tools/checkpkgs -b -n|grep -v "\[X\] i686"|grep -v emul-</pre>
nice ;)
