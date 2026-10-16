Title: The yellow border around the pig
Slug: yellow-pig
Category: libreoffice
Tags: en
Date: 2014-10-25T15:10:38Z

[![Border around a Writer image](https://lh3.googleusercontent.com/-IhaYMXbDVyo/VEufBghNiHI/AAAAAAAAE4g/8n2DuQ_Edeo/s400/)](https://lh3.googleusercontent.com/-IhaYMXbDVyo/VEufBghNiHI/AAAAAAAAE4g/8n2DuQ_Edeo/s0/)

It turns out LibreOffice's RTF and DOCX import filter ignored borders around Writer
pictures. Given that this
[worked](https://bugs.freedesktop.org/show_bug.cgi?id=85179) in the RTF case in
the past, it's a bit amusing that now the very same commit implements a new
feature for the DOCX case and at the same time fixes a regression in the RTF
filter. Code sharing FTW! :-)
