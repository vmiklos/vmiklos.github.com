#!/usr/bin/env bash
#
# Copyright 2022 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

cp ~/git/plees-tracker/app/src/main/play/listings/en-US/graphics/phone-screenshots/1.png app/
rsync --exclude '*.swp' -avP ~/git/plees-tracker/guide/book/ .
git add .
git commit -m "plees-tracker: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
