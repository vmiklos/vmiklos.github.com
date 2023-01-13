#!/usr/bin/env bash
#
# Copyright 2022 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

rsync --exclude '*.swp' -avP ~/git/osm-gimmisn/guide/book/ .
git add .
git commit -m "osm-gimmisn: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
