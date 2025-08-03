const assert = require('assert');
const diceCoefficient = require('../algorithms/diceCoefficient');

describe('Dice Coefficient', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(diceCoefficient('hello', 'hello'), 1);
        assert.strictEqual(diceCoefficient('test', 'test'), 1);
    });

    it('should return 0 for strings with no common bigrams', () => {
        const result = diceCoefficient('ab', 'cd');
        assert.strictEqual(result, 0);
    });

    it('should handle strings shorter than 2 characters', () => {
        const result = diceCoefficient('a', 'b');
        assert(isNaN(result) || result === 0, 'Should handle single character strings gracefully');
    });

    it('should handle empty strings', () => {
        const result = diceCoefficient('', 'hello');
        assert(isNaN(result) || result === 0, 'Should handle empty strings gracefully');
    });

    it('should calculate similarity for overlapping strings', () => {
        const result = diceCoefficient('hello', 'help');
        // 'hello' bigrams: he, el, ll, lo
        // 'help' bigrams: he, el, lp
        // Common bigrams: he, el = 2
        // Dice = (2 * 2) / (4 + 3) = 4/7 ≈ 0.571
        const expected = 4/7;
        assert(Math.abs(result - expected) < 0.001, `Expected ${expected}, got ${result}`);
    });

    it('should work with completely different strings', () => {
        const result = diceCoefficient('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should be symmetric', () => {
        const str1 = 'hello';
        const str2 = 'world';
        assert.strictEqual(diceCoefficient(str1, str2), diceCoefficient(str2, str1));
    });

    it('should handle repeated bigrams', () => {
        const result = diceCoefficient('aaa', 'aaa');
        assert.strictEqual(result, 1);
    });

    it('should work with minimum length strings for bigrams', () => {
        const result = diceCoefficient('ab', 'ac');
        // 'ab' bigrams: ab
        // 'ac' bigrams: ac
        // No common bigrams
        assert.strictEqual(result, 0);
    });
});
