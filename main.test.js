import assert from 'node:assert';

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
