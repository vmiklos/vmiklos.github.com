Title: tgt is now available as a package
Slug: iscsi-target
Category: frugalware
Tags: en, hacking
Date: 2010-11-04T00:17:00Z

Today I packaged [tgt](http://frugalware.org/packages/103291) an iSCSI target (server). The upstream package provides a large number of examples, though I thought it's a good idea to note what I used for testing:

```
# egrep -v '#|^$' /etc/tgt/targets.conf 
default-driver iscsi
<target iqn.2010-11.local.test:storage>
    backing-store /dev/sdb
</target>
```

Something offtopic: a [rejourn](https://github.com/artagnon/rejourn/commit/3b87aab385647ea8e5dd8844aec913ab3c02252f) patch accepted and a [LibreOffice](https://bugs.freedesktop.org/show_bug.cgi?id=31362) bug fixed today.
