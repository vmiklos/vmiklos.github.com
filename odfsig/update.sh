#!/usr/bin/env bash
#
# Copyright 2020 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

cat ~/git/odfsig/README.adoc > index.adoc
echo >> index.adoc
echo "include::../matomo.adoc[]" >> index.adoc
make
git add .
git commit -m "odfsig: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
