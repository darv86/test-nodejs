.PHONY: test, only

test:
	node --test
only:
	node --test-only --test
