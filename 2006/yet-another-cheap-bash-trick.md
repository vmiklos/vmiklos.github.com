Title: yet another cheap bash trick
Slug: yet-another-cheap-bash-trick
Category: hacking
Tags: en
Date: 2006-08-15T22:05:21Z

<p><pre>#!/bin/bash</p><p>foo()
{
        true
}</p><p>if declare -f foo >/dev/null; then
        echo "foo() declared"
else
        echo "foo() is not declared"
fi</pre></p>
