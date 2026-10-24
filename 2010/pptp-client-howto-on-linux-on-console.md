Title: pptp client howto on linux on console
Slug: pptp-client-howto-on-linux-on-console
Category: hacking
Tags: en
Date: 2010-02-09T17:39:00Z

So I saw a few howtos on how to set up ms pptp client on linux, but they're mostly about how to click on networkmanager or other guis, so basically they hide the real detail, IOW what config files are actually used.

First install the necessary packages:

```
# pacman-g2 -S ppp pptp
```

Here is what I have under /etc/ppp:

```
# cat chap-secrets
# Secrets for authentication using CHAP
# client        server  secret                  IP addresses
$user           PPTP    $secret                 *
```

```
# cat options
lock
```

```
# cat options.pptp
lock
noauth
nobsdcomp
nodeflate
```

```
# cat peers/$network
pty "/usr/sbin/pptp $server --nolaunchpppd"
name "$user"
file /etc/ppp/options.pptp
remotename PPTP
require-mppe-128
refuse-eap
ipparam $network
```

And to bring up ppp0:

```
# pon $network debug dump logfd 2 nodetach
```

If it works fine, you can just use:

```
# pon $network
```

(Obviously replace $user, $secret, $server and $network with real values.)

One thing I did not figure out is how to configure it to set the default gateway as well. Right now I use the debug mode, then in the output I see the remote address, finally:

```
# route add default gw $remoteaddr
```

Other than that, it works fine - without any damn gui! :)
