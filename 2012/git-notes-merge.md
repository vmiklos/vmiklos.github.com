Title: Merging git notes
Slug: git-notes-merge
Category: git
Tags: en
Date: 2012-06-07T19:31:30Z

The `git notes` command is really about local annotation of commits -- nothing
to share. If you decide to still do so, for example the
[git-scm.com](http://git-scm.com/2010/08/25/notes.html) HOWTO can show you how to
pull and push them. But what about merging?  There is no UI for that, but --
given that with git, everything is possible -- you can still do so manually.

So the problem comes when Alice fetches notes, Bob does so, Alice pushes her
notes back, Bob annotates a different commit and when Bob wants to push, he
gets `rejected, non-fast-forward`. Normally you would merge or rebase in this
situation, but given that `git notes` by default updates the
`refs/notes/commits` ref and you typically have a different branch checked out,
you can't use `git merge` or `git rebase` directly.

What works is:

```
git checkout refs/notes/commits
git fetch origin refs/notes/commits
git merge FETCH_HEAD
git update-ref refs/notes/commits HEAD
git checkout master
```
- Check out the notes, so if you have conflicts, you can resolve them.
- Fetch remote notes to FETCH_HEAD.
- Do the merge.
- Necessary, as `git merge` won't update the ref automatically, since we're not on a branch.
- Or whereever you were before.

And now you can push your notes, as detailed in the above referred blog post.
Yes, rebasing would be possible as well, that's left as an exercise for the
reader. ;-)
