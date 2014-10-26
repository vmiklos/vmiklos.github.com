LIST_POSTS = git ls-files|grep /.*txt$ |sed 's|.*/||'
check:
	test $(shell $(LIST_POSTS) |wc -l) = $(shell $(LIST_POSTS) |sort -u |wc -l)
