Title: smartctl &amp;&amp; hdd temperature
Slug: smartctl-aamp-aamp-hdd-temperature
Category: hacking
Tags: en
Date: 2006-09-03T00:59:54Z

here is a small cmdline to query the temperature of a hdd using smartctl:
<code>
smartctl -a /dev/hdc|grep Celsius|sed 's/.* \([0-9]*\)$/\1/'
</code>
