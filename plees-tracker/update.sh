#!/usr/bin/env bash
#
# Copyright 2020 Miklos Vajna. All rights reserved.
# Use of this source code is governed by a BSD-style license that can be
# found in the LICENSE file.
#

cat ~/git/plees-tracker/README.adoc > index.adoc
sed -i 's|app/src/main/play/listings/en-US/graphics/phone-screenshots/|app/|g' index.adoc
echo >> index.adoc
echo "include::../matomo.adoc[]" >> index.adoc
make
cp ~/git/plees-tracker/app/src/main/play/listings/en-US/graphics/phone-screenshots/1.png app/
cp ~/git/plees-tracker/doc/fdroid.png doc/
git add .
git commit -m "plees-tracker: update from git"

# vim:set shiftwidth=4 softtabstop=4 expandtab:
