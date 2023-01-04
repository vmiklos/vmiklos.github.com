---
title: Gpg
...

Checking if Miklos' tarballs are from trusted source

# How to verify

- Import my public keyring with the

```
$ gpg --recv-keys 03915096
```

command.

- Verify the tarball. Here is an example:

```
$ gpg --verify bitlbee-skype-0.6.0.tar.gz.asc bitlbee-skype-0.6.0.tar.gz
gpg: Signature made Sat 28 Jun 2008 02:15:16 AM CEST using DSA key ID 03915096
gpg: Good signature from "Miklos Vajna <vmiklos@vmiklos.hu>"
```

# The meaning of this signature

This signature does not guarantee that the my machine itself has not
been compromised. However, if I suffer an intrusion I will revoke the
key and post information here as quickly as possible.
