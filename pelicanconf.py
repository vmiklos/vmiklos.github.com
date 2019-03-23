#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Miklos Vajna'
SITENAME = 'What is Miklos hacking'
SITEURL = 'http://localhost:8000/blog2'

PATH = '.'
OUTPUT_PATH = '../htdocs/blog2'

TIMEZONE = 'Europe/Budapest'
DEFAULT_LANG = 'en'
LOCALE = 'en_US'

# Feed generation: RSS is good enough.
FEED_ALL_ATOM = None
FEED_ALL_RSS = 'feeds/all.rss.xml'
CATEGORY_FEED_ATOM = None
CATEGORY_FEED_RSS = 'feeds/{slug}.rss.xml'
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll.
LINKS = (('Root', '/'),
         ('LibreOffice Blogs', 'https://planet.documentfoundation.org/'),)

# Default is to disable pagination.
DEFAULT_PAGINATION = 10

# Asciidoc is not in core.
PLUGIN_PATHS = ['/home/vmiklos/git/pelican-plugins']
PLUGINS = ['asciidoc_reader']

# I don't link the default theme.
THEME = '/home/vmiklos/git/pelican-svbhack'

# Setting to None will cause the summary to be a copy of the original content.
SUMMARY_MAX_LENGTH = None

# Feed item quantity is unrestricted by default.
FEED_MAX_ITEMS = 10
