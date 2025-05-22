// @ts-nocheck
import assert from 'node:assert';
import { log } from 'node:console';
// equal method acts, like strictEqual
// import assert from 'node:assert/strict';
import {
	after,
	afterEach,
	before,
	beforeEach,
	suite,
	describe,
	it,
	test,
	mock,
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
			{ name: 'Bob', age: 27 }
		);
	});
});

// only method works with cli command: node --test-only --test,
// so other describe/suite methods will be ignored;
// skip, todo, only works for describe and it
// describe.only('usage of the only', () => {
// 	// skip method uses to ignore current it group
// 	it.skip('skipping something', () => {
// 		assert.ok(0 === 1);
// 	});
// 	// todo method uses as a draft for testing
// 	it.todo('something doing');
// });

// to run specific describe or it method,
// use cli command flag with pattern (based on regex):
// node --test-name-pattern="skipping" --test
// (will run it with the word "skipping" in the name argument)
// to exclude describe or it method from running:
// node --test-skip-pattern="skipping" --test

describe('usage of the only', () => {
	it('skipping something', async (t) => {
		// t doesn't have it method, but have test
		await t.test('subtest1', () => {
			assert.ok(1 === 1);
		});
		// subtest is a way to test on logic with several steps or variants
		await t.test('subtest2', () => {
			assert.ok(0 == false);
		});
	});
});

describe('before and after', () => {
	before(() => {
		log('runs cb before all tests');
	});
	beforeEach(() => {
		// doesn't run for subtests
		log('runs cb before each test');
	});
	after(() => {
		log('runs cb after all tests');
	});
	afterEach(() => {
		// doesn't run for subtests
		log('runs cb before each test');
	});
	test('is it falsy', () => {
		assert.ok(0 == false);
	});
	test('is it truth', () => {
		assert.ok(1 == true);
	});
});

const person = {
	name: 'Bob',
	education: ['hight', 'middle'],
	canSpeak(str) {
		return [true, str];
	},
	doesErr() {
		throw new TypeError();
	},
};
suite('checking mocks', () => {
	let calls;
	test('mock works well', (t) => {
		// checks if method (doesErr) throws an error with specific type (Error)
		assert.throws(() => person.doesErr(), TypeError);
		// mock object patch and spy the target (person)
		// to see and store globally all changes of a method usage
		mock.method(person, 'canSpeak');
		// TestContext (t) does the same, but locally in the current test
		// and has priority over mock object (overrides a patched data)
		// t.mock.method(person, 'canSpeak');
		calls = person.canSpeak.mock.calls;
		log(calls.length, '------1-----');
		person.canSpeak();
		calls = person.canSpeak.mock.calls;
		log(calls.length, '------2-----');
	});
	test('try the context', (t) => {
		t.mock.method(person, 'canSpeak');
		person.canSpeak('hey');
		calls = person.canSpeak.mock.calls;
		log(calls[0].arguments, '------3-----');
	});
});

// command runs test coverage for a project
// node --test --experimental-test-coverage

// provides different report styles:
// default
// node --test --test-reporter=spec
// represents report, using dots and x
// node --test --test-reporter=dot
// another human readable format
// node --test --test-reporter=tap
// machine readable format
// node --test --test-reporter=junit
// can save report as a file
// node --test --test-reporter-destination=test.info
