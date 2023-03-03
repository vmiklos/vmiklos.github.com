---
title: Browser Startup Page
...

# LibreOffice bugs

should be zero:

- [Adding Cc: to](https://bugs.documentfoundation.org/buglist.cgi?keywords=regression%2C%20&keywords_type=allwords&longdesc=Adding%20Cc%3A%20to%20Miklos%20Vajna&longdesc_type=substring&query_format=advanced&resolution=---)
  | [Regression By:](https://bugs.documentfoundation.org/buglist.cgi?f1=cf_regressionby&o1=equals&query_format=advanced&resolution=---&v1=Miklos%20Vajna)

misc:

- [
  [my tdf bugs](https://bugs.documentfoundation.org/buglist.cgi?query_format=advanced&emailtype2=substring&resolution=---&email2=vmiklos%40collabora.com&emailassigned_to2=1&order=bug_id) |
  [tdf bugs where I'm in CC](https://bugs.documentfoundation.org/buglist.cgi?emailcc2=1&query_format=advanced&emailtype2=substring&resolution=---&email2=vmiklos%40collabora.com) |
  [reported tdf bugs](https://bugs.documentfoundation.org/buglist.cgi?emailreporter2=1&query_format=advanced&emailtype2=substring&resolution=---&email2=vmiklos%40collabora.com) |
  [tdf bugs I fixed](https://bugs.documentfoundation.org/buglist.cgi?f1=assigned_to&o1=equals&resolution=FIXED&query_format=advanced&v1=vmiklos%40collabora.com&product=LibreOffice)
  ]
- [
  [tagged RTF bugs](https://bugs.documentfoundation.org/buglist.cgi?keywords=filter%3Artf&query_format=advanced&resolution=---) |
  [all RTF bugs](https://bugs.documentfoundation.org/buglist.cgi?short_desc=RTF&query_format=advanced&resolution=---&short_desc_type=allwordssubstr&product=LibreOffice)
  ]

Phab bugs:

- [
  [my phab bugs](https://phabricator.collabora.com/maniphest/query/YyncZ248uXkR/#R) |
  [phab bugs where I'm in CC](https://phabricator.collabora.com/search/query/oflUoqPHdta0/#R) |
  [reported phab bugs](https://phabricator.collabora.com/search/query/H.Q.Ls2nxEAI/#R)
  ]

# English style bookmarks
  
- past tense in status reports
- [third-person singular for interface comments](https://reviews.llvm.org/D34913)
- [imperative present tense in commit messages](https://git-scm.com/book/en/v2/Distributed-Git-Contributing-to-a-Project)
- future tense in offers

A good commit message, from [the git list](https://public-inbox.org/git/xmqqmtgm9c01.fsf@gitster.g/):

- Title (single line, short and to the point, imperative present)
- Intro (observation of the current state)
- Problem description (pros and cons of the current state)
- Solution (give orders to the codebase)
- Other comments (caveats, etc.)

Code review steps, from [drmaciver.com](https://consulting.drmaciver.com/code-review-quick-fixes/):

- First, read the diff from start to finish, without writing any comments.
- Now, starting again from the beginning, go through and comment with anything
  you don’t understand.
- Finally, do a third pass and add any comments of things you’d do
  differently, or make any requests for changes.
