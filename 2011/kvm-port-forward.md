Title: KVM port forwarding
Slug: kvm-port-forward
Category: en
Date: 2011-08-24T17:28:35Z

This is going to be like my [mysql password set]({filename}/2005/mysql.adoc) post, I
got tired of looking up the docs all the time, so here it is.

If you have a host running kvm instances and you want to forward the
TCP port `$hostport` of the host machine `$host` to a port `$guestport` of the
guest machine `$guest`, then you need:

```
iptables -t nat -A PREROUTING -p tcp -d $host --dport $hostport -j DNAT --to-destination $guest:$guestport
```
