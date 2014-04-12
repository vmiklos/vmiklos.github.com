from sgmllib import SGMLParser
import urllib
import sys
import os

class myurlopener(urllib.FancyURLopener):
	version = "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.8.1.2) Gecko/20070225 Firefox/2.0.0.2"

class HTMLParser(SGMLParser):
	def reset(self):
		SGMLParser.reset(self)
		self.rows = []
		self.coloumns = []
		self.intable = False
		self.intr = False
		self.intd = False
		self.cell = []
		self.link = None

	def start_table(self, attrs):
		for k, v in attrs:
			# There are two tables on the page, the interesting one has the chart class.
			if k == "class" and v == "chart":
				self.intable = True
				self.rows.append(['Rank & Title', 'IMDb Rating'])

	def start_tr(self, attrs):
		if self.intable:
			self.intr = True
	
	def start_td(self, attrs):
		# We only want the picture, Rank & Title and Rating
		if self.intr and len(self.coloumns) < 3:
			self.intd = True

	def start_a(self, attrs):
		if self.intd:
			for k, v in attrs:
				if k == "href":
					# Drop /?ref_= suffix.
					self.link = "http://www.imdb.com" + v.split('?ref')[0]

	def end_td(self):
		if self.intd:
			self.intd = False
			# Get rid of whitespace we added ourselves to have spaces within tokens.
			s = "".join(self.cell).strip()
			if self.link:
				s = '%s[%s]' % (self.link, s)
			self.coloumns.append(s)
			self.cell = []
			self.link = None
	
	def end_tr(self):
		if self.intr:
			self.intr = False
			if len(self.coloumns) > 1:
				# Picture is not interesting
				self.coloumns = self.coloumns[1:]
				self.rows.append(self.coloumns)
				self.coloumns = []

	def end_table(self):
		if self.intable:
			self.intable = False
	
	def handle_data(self, text):
		if self.intd:
			# Drop whitespace around the token, just keep a single trailing space.
			self.cell.append("%s " % text.strip())

urllib._urlopener = myurlopener()
sock = urllib.urlopen("http://www.imdb.com/chart/top")
page = sock.read()
sock.close()

parser = HTMLParser()
parser.reset()
parser.feed(page)
parser.close()

posts = {}

def get_title(id):
	cwd = os.getcwd()
	os.chdir('/home/vmiklos/git/staging.vmiklos.hu/rejourn/in')
	sock = os.popen('git grep -l %s' % id)
	buf = sock.read()
	sock.close()
	ret = None
	if len(buf.strip()):
		ret = os.path.split(buf.split('\n')[0])[1].replace('.txt', '')
	os.chdir(cwd)
	return ret

for i in parser.rows:
	# The first column contains the link.
	l = i[0].split('[')[0].split('/')
	if len(l) < 2:
		continue
	id = l[-2]
	title = get_title(id)
	if title:
		# Handle when foo -> foo.html redirection doesn't work.
		posts[id] = "http://vmiklos.hu/blog/%s.html" % title

c = 0
for i in parser.rows:
	# The first column contains the title and the link.
	title = i[0].split('[')[-1].split(']')[0]
	items = i[0].split('[')[0].split('/')
	if len(items) > 1:
		id = items[-2]
	else:
		id = None
	if id in posts.keys():
		s = posts[id]
		# Make the URL a bit more human-readable.
		i.append("%s[%s]" % (s, s.split('/')[-1].replace('-', ' ').replace('_', ' ').replace('.html', '')))
		c += 1
	# This is the last original column, add our own one.
	elif title == "IMDb Rating":
		i.append("Post")
	else:
		i.append("")

print "Coverage: %s%% (%s/%s)" % (round(float(c) / (len(parser.rows)-1), 4)*100, c, len(parser.rows)-1)
print "|===="
for i in parser.rows:
	print "| %s" % "| ".join(i)
print "|===="
