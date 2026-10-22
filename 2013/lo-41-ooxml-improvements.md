Title: OOXML improvements in LibreOffice Writer 4.1
Slug: lo-41-ooxml-improvements
Category: libreoffice
Tags: en
Date: 2013-07-22T11:31:57Z

See [here]({filename}/2012/lo-ooxml-improvements.adoc) for a 3.6/4.0
version of this post.

I'm posting here a few screenshots showing improvements in our DOCX filter,
done in the 4.1 development cycle. In each case I'm providing a link to the
test document, a screenshot showing how it looked before and how it now looks
on 4.1. Click on the images to get a larger image:

- document with a complex groupshape: multiple shapes had text ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/n792778.docx)):

[![groupshape-lo40](https://lh4.googleusercontent.com/-sYXxjhypoQ8/Uez38Xv2tmI/AAAAAAAADPI/u5Dzu0pTTXc/s400/groupshape-lo40.png)](https://lh4.googleusercontent.com/-sYXxjhypoQ8/Uez38Xv2tmI/AAAAAAAADPI/u5Dzu0pTTXc/s912/groupshape-lo40.png)

[![groupshape-lo41](https://lh3.googleusercontent.com/-SOZjbpmdvXw/Uez38brF6bI/AAAAAAAADOM/KSsbMkgSQlg/s400/groupshape-lo41.png)](https://lh3.googleusercontent.com/-SOZjbpmdvXw/Uez38brF6bI/AAAAAAAADOM/KSsbMkgSQlg/s912/groupshape-lo41.png)

- document with tabs over the margin ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/n793998.docx)):

[![tabovermargin-lo40](https://lh6.googleusercontent.com/-56Vj5pUGX-I/Uez38_AGTRI/AAAAAAAADOs/aVKQ_qPbMdg/s400/tabovermargin-lo40.png)](https://lh6.googleusercontent.com/-56Vj5pUGX-I/Uez38_AGTRI/AAAAAAAADOs/aVKQ_qPbMdg/s800/tabovermargin-lo40.png)

[![tabovermargin-lo41](https://lh5.googleusercontent.com/-vLbiQ55TWtQ/Uez39MNwS2I/AAAAAAAADOY/AtIVReP1_LI/s400/tabovermargin-lo41.png)](https://lh5.googleusercontent.com/-vLbiQ55TWtQ/Uez39MNwS2I/AAAAAAAADOY/AtIVReP1_LI/s800/tabovermargin-lo41.png)

- document with rotated text: content should not fit the cell size ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/tblr-height.docx)):

[![tblr-cell-overflow-lo40](https://lh6.googleusercontent.com/-QfKy9rLa1oU/Uez39sijDtI/AAAAAAAADOk/ptcg831fH34/s400/tblr-cell-overflow-lo40.png)](https://lh6.googleusercontent.com/-QfKy9rLa1oU/Uez39sijDtI/AAAAAAAADOk/ptcg831fH34/s700/tblr-cell-overflow-lo40.png)

[![/tblr-cell-overflow-lo41](https://lh4.googleusercontent.com/-zsjH1yutGBU/Uez39yHwi8I/AAAAAAAADOw/FtXf_8CUeRg/s400/tblr-cell-overflow-lo41.png)](https://lh4.googleusercontent.com/-zsjH1yutGBU/Uez39yHwi8I/AAAAAAAADOw/FtXf_8CUeRg/s700/tblr-cell-overflow-lo41.png)

- document with numbering, where bullets are pictures ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlexport/data/i120928.docx)):

[![numpic-lo40](https://lh3.googleusercontent.com/-fuMz-_o3h9Y/Uez38WN94YI/AAAAAAAADOE/4m2KvenRodM/s200/numpic-lo40.png)](https://lh3.googleusercontent.com/-fuMz-_o3h9Y/Uez38WN94YI/AAAAAAAADOE/4m2KvenRodM/s200/numpic-lo40.png)

[![numpic-lo41](https://lh6.googleusercontent.com/-MG9E8l0FVWI/Uez382lWcHI/AAAAAAAADOU/aLNZI8GoEBI/s200/numpic-lo41.png)](https://lh6.googleusercontent.com/-MG9E8l0FVWI/Uez382lWcHI/AAAAAAAADOU/aLNZI8GoEBI/s200/numpic-lo41.png)

- document with watermark ([test doc](http://cgit.freedesktop.org/libreoffice/core/tree/sw/qa/extras/ooxmlimport/data/watermark.docx)):

[![watermark-lo40](https://lh5.googleusercontent.com/-mM-RGgEX2M8/Uez3-Gh8CMI/AAAAAAAADPA/1QqJeg4atiM/s400/watermark-lo40.png)](https://lh5.googleusercontent.com/-mM-RGgEX2M8/Uez3-Gh8CMI/AAAAAAAADPA/1QqJeg4atiM/s600/watermark-lo40.png)

[![watermark-lo41](https://lh3.googleusercontent.com/-zaW8P_cvMQM/Uez3-el1Z8I/AAAAAAAADO8/yz-boOrYMLo/s400/watermark-lo41.png)](https://lh3.googleusercontent.com/-zaW8P_cvMQM/Uez3-el1Z8I/AAAAAAAADO8/yz-boOrYMLo/s600/watermark-lo41.png)

If you want to try these out yourself, get a
[daily build](http://dev-builds.libreoffice.org/daily/) and play with it! :) If
something goes wrong, report it to us in the
[Bugzilla](https://www.libreoffice.org/get-help/bug/), so we can try fix it in
the next 4.1 bugfix release. And remember, there are lots more improvements
[coming](http://wiki.documentfoundation.org/ReleaseNotes/4.1) in LibreOffice 4.1,
stay tuned!
