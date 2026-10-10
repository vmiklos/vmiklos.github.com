Title: mutt/vim offline address book with multiple sources
Slug: mutt-address-book
Category: vim
Tags: en, mutt
Date: 2018-09-22T23:17:46Z

I used to have a hackish setup to trigger address book in the form of code completion from vim,
when mutt starts it. I recently migrated the last part of it from python2, so it's now in a
relatively consistent state. On a boring flight trip I finally got around to summarize how it works,
perhaps it's useful to someone else as well. :-)

By multiple sources, I mean Google Contacts for my private account, and LDAP for work-related
accounts. I have one script for each to have a local backup:

- [google/contacts/backup](http://github.com/vmiklos/vmexam/tree/master/google/contacts/backup)
  backs up Google Contacts to `$HOME/.google-contacts/`
- [ldap/contacts/backup](https://github.com/vmiklos/vmexam/blob/master/ldap/contacts/backup)
  backs up from an LDAP source to `$HOME/.ldap-contacts/`

Then comes
[mutt/contacts/search](https://github.com/vmiklos/vmexam/blob/master/mutt/contacts/search), which
can read these backups from `$HOME/.mutt/contacts/` (you can create symlinks to decide which backup
should be included in the search results).

The rest is just a short
[search.vim](https://github.com/vmiklos/vmexam/blob/master/mutt/contacts/search.vim) that
integrates the search script into vim, so when mutt starts it with `ft=mail`, the search script is
invoked when you start typing and you press Ctrl-X Ctrl-O (trigger code completion).

And that's it, I can start typing mails to friends and customers even without network connectivity,
without manually maintaining an own address book just for mutt!