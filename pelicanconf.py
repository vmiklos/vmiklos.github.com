#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

# This config is for pelican-4.0.1.

AUTHOR = 'Miklos Vajna'
SITENAME = 'What is Miklos hacking'
SITEURL = 'http://localhost:8000/blog'

PATH = '.'
# Clone this from <https://github.com/vmiklos/vmiklos.github.com>.
OUTPUT_PATH = '../htdocs/blog'

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

# Asciidoc is not in core, clone this from <https://github.com/getpelican/pelican-plugins>, check
# out commit 000fc5acbce7328fcd94a5d9395465fadc3d544d (master as of 2019-03-02).
PLUGIN_PATHS = ['/home/vmiklos/git/pelican-plugins']
PLUGINS = ['asciidoc_reader', 'readtime']

# I don't like the default theme, clone this from <https://github.com/vmiklos/pelican-svbhack>.
THEME = '/home/vmiklos/git/pelican-svbhack'
HIDE_USER_LOGO = True
DISPLAY_CATEGORIES_ON_MENU = False
AVOID_GOOGLE_FONTS = True

# Setting to None will cause the summary to be a copy of the original content.
SUMMARY_MAX_LENGTH = None

# Feed item quantity is unrestricted by default.
FEED_MAX_ITEMS = 10

# This can be useful in preventing older, unnecessary files from persisting in your output.
DELETE_OUTPUT_DIRECTORY = True

# To speed up the build process.
CACHE_CONTENT = True
CACHE_PATH = '../cache'
LOAD_CONTENT_CACHE = True
