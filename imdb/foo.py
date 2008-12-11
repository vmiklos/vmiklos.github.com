from sgmllib import SGMLParser
import urllib
from config import posts

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
			if k == "border" and v == "1":
				self.intable = True

	def start_tr(self, attrs):
		if self.intable:
			self.intr = True
	
	def start_td(self, attrs):
		if self.intr:
			self.intd = True

	def start_a(self, attrs):
		if self.intd:
			for k, v in attrs:
				if k == "href":
					self.link = "http://www.imdb.com" + v

	def end_td(self):
		if self.intd:
			self.intd = False
			s = "".join(self.cell)
			if self.link:
				s = '%s[%s]' % (self.link, s)
			self.coloumns.append(s)
			self.cell = []
			self.link = None
	
	def end_tr(self):
		if self.intr:
			self.intr = False
			self.rows.append(self.coloumns)
			self.coloumns = []

	def end_table(self):
		if self.intable:
			self.intable = False
	
	def handle_data(self, text):
		if self.intd:
			self.cell.append(text)

urllib._urlopener = myurlopener()
sock = urllib.urlopen("http://www.imdb.com/chart/top")
page = sock.read()
sock.close()

parser = HTMLParser()
parser.reset()
parser.feed(page)
parser.close()

c = 0
for i in parser.rows:
	title = i[2].split('[')[-1].split(']')[0]
	if title in posts.keys():
		s = posts[title]
		i.append("%s[%s]" % (s, s.split('/')[-1]))
		c += 1
	elif title == "Title":
		i.append("Post")
	else:
		i.append("")

print "Coverage: %s%% (%s/%s)" % (round(float(c) / (len(parser.rows)-1), 2), c, len(parser.rows)-1)
print "|===="
for i in parser.rows:
	print "| %s" % "| ".join(i)
print "|===="
