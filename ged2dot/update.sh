#!/usr/bin/env bash
#
# Copyright 2022 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

cp ~/git/ged2dot/libreoffice/screenshot.png libreoffice/
cp ~/git/ged2dot/tests/screenshot.png tests/
rsync --exclude '*.swp' -avP ~/git/ged2dot/guide/book/ .
git add .
git commit -m "ged2dot: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
