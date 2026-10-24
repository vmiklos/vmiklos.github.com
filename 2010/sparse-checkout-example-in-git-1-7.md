Title: Sparse checkout example in git 1.7.0
Slug: sparse-checkout-example-in-git-1-7
Category: hacking
Tags: en
Date: 2010-02-14T01:00:23Z

Sparse checkout is now part of git-1.7.0. See [here](http://www.kernel.org/pub/software/scm/git/docs/git-read-tree.html#_sparse_checkout) on what it is in general. Basically something what svn already knew for years and git did not. And of course git now does it better, since this way it's possible to checkout multiple sub-directories, not just a single one, what svn allows.

Here is a short example:

```
$ git clone ~/git/git
$ cd git
$ ls|wc -l
361
$ git config core.sparsecheckout true
$ echo ppc/ > .git/info/sparse-checkout
$ echo perl/ >> .git/info/sparse-checkout
$ git read-tree -m -u HEAD
$ ls
perl/  ppc/
```

Enjoy! :)

Update: see the comments, as it has been pointed out the "And of course git now does it better, since this way it's possible to checkout multiple sub-directories, not just a single one, what svn allows." sentence is incorrect; but of course having a similar feature in a distributed VCS is still an improvement. ;)
