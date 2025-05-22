.PHONY: test, only, coverage

test:
	node --test
only:
	node --test-only --test
coverage:
	node --test --experimental-test-coverage