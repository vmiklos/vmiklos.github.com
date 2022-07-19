#!/usr/bin/env bash
#
# Copyright 2022 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

rsync -avP ~/git/turtle-cpm/guide/book/ .
git add .
git commit -m "turtle-cpm: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
