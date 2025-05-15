import assert from 'node:assert';
import { log } from 'node:console';
// equal method acts, like strictEqual
// import assert from 'node:assert/strict';
import {
	describe,
	it,
} from 'node:test';

assert.ok(1 === 1);
assert.equal(1, 1);
assert.notEqual(1, 0, 'error message (available for all assert methods');

// pass
// assert.equal('', false);
// fail
// assert.strictEqual('', false);

// testing regex
// assert.match();
// assert.doesNotMatch();

// testing objects
// assert.deepEqual(actual, expected);
// assert.deepStrictEqual(actual, expected);
// assert.notDeepEqual(actual, expected);
// assert.notDeepStrictEqual(actual, expected);

// describe (alias for suite) is a group for it (alias for test) methods
describe('message for description:', () => {
	// it is a group for assertions
	it('first ever', () => {
		assert.ok(1 === 1);
	});
	it('second ever');
	it('deep equal object', (t) => {
		assert.deepEqual({ name: 'Bob', age: 27 }, { name: 'Bob', age: '27' });
	});
	it('strict deep equal object', (t) => {
		assert.deepStrictEqual(
			{ name: 'Bob', age: 27 },
			// { name: 'Bob', age: '27' },
			{ name: 'Bob', age: 27 },
		);
	});
});
