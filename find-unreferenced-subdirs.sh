#!/bin/bash
#
# Copyright 2024 Miklos Vajna
#
# SPDX-License-Identifier: MIT

for i in *
do
    if [ ! -d $i ]; then
        continue
    fi

    if grep -q 'href="/'$i index.html; then
        continue
    fi

    echo "WARN: unreferenced subdir: $i"
done

# vim:set shiftwidth=4 softtabstop=4 expandtab:
