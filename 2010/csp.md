Title: CSP
Slug: csp
Category: hacking
Tags: en
Date: 2010-12-28T03:58:43Z

CSP, as in Constraint satisfaction problem. A while back I wrote a custom sudoku solver [in Erlang](http://vmiklos.hu/file/sudoku.erl), and now I hit something similar. Of course, since then I learned that there are nice CSP engines, so this time I did not try to write my own. :)

First, I checked out [python-constraint](http://codespeak.net/svn/user/niemeyer/constraint/trunk/), and then I sticked with it, as it fulfilled my needs.

So, the problem. Here is a Christmas tree:

![csp](/pic/csp.t.png)

The tree has 4 chains, each one contains 7 items. A few ones already has a number. The exercise: number the empty items with numbers between 1 and 7 so that:

- Each chain contains the numbers 1..7 exactly once.
- All the horizontal and diagonal lines cannot contain the same number twice.

A possible solution is [here](http://vmiklos.hu/file/csp.py). If you get less or more than one solution, you did something wrong. :) (I'm not pasting here the output of the script to leave some exercise for the readers. ;) )

**NOTE:** As an experiment this time I draw the image using TikZ. Based on [these ideas](http://stackoverflow.com/questions/2701902/standalone-diagrams-with-tikz) I converted [the source](http://vmiklos.hu/pic/csp.tex) to PNG using [tikz2png](https://github.com/vmiklos/vmexam/blob/master/convert/tikz2png).
