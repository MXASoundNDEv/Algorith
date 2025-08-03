const assert = require('assert');
const hamming = require('../algorithms/hamming');

describe('Hamming Distance', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(hamming('hello', 'hello'), 1);
        assert.strictEqual(hamming('test', 'test'), 1);
        assert.strictEqual(hamming('', ''), 1);
    });

    it('should return 0 for completely different strings of same length', () => {
        const result = hamming('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle empty strings', () => {
        assert.strictEqual(hamming('', 'hello'), 0);
        assert.strictEqual(hamming('hello', ''), 0);
    });

    it('should calculate correct similarity for single character difference', () => {
        const result = hamming('hello', 'hallo');
        const expected = 1 - 1/5; // 1 difference out of 5 characters
        assert.strictEqual(result, expected);
    });

    it('should handle different length strings by padding', () => {
        const result = hamming('cat', 'cats');
        const expected = 1 - 1/4; // 1 difference (missing 's'), max length 4
        assert.strictEqual(result, expected);
    });

    it('should handle case sensitivity', () => {
        const result = hamming('Hello', 'hello');
        const expected = 1 - 1/5; // 1 difference for case
        assert.strictEqual(result, expected);
    });

    it('should work with binary strings', () => {
        const result = hamming('1010', '1110');
        const expected = 1 - 1/4; // 1 bit difference
        assert.strictEqual(result, expected);
    });

    it('should handle single character strings', () => {
        assert.strictEqual(hamming('a', 'a'), 1);
        assert.strictEqual(hamming('a', 'b'), 0);
    });

    it('should be symmetric', () => {
        const str1 = 'hello';
        const str2 = 'world';
        assert.strictEqual(hamming(str1, str2), hamming(str2, str1));
    });
});
