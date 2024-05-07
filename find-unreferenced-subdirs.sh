#!/bin/bash
#
# Copyright 2024 Miklos Vajna
#
# SPDX-License-Identifier: MIT

for i in *
do
    if [ ! -d $i -o $i = go -o $i = odp ]; then
        continue
    fi

    if grep -q 'href="/'$i index.html; then
        continue
    fi

    if grep -q 'href="/'$i github/index.html; then
        continue
    fi

    echo "WARN: unreferenced subdir: $i"
done

# vim:set shiftwidth=4 softtabstop=4 expandtab:
