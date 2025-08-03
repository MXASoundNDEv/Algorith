const assert = require('assert');
const trigramScore = require('../algorithms/trigramScore');

describe('Trigram Score', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(trigramScore('hello', 'hello'), 1);
        assert.strictEqual(trigramScore('test', 'test'), 1);
    });

    it('should return 0 for strings with no common trigrams', () => {
        const result = trigramScore('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle strings shorter than 3 characters', () => {
        const result = trigramScore('ab', 'cd');
        // Les chaînes de moins de 3 caractères ne peuvent pas former de trigrammes
        // Donc la similarité est basée sur l'absence commune de trigrammes
        assert.strictEqual(result, 1); // Notre implémentation retourne 1 pour des absences communes
    });

    it('should handle empty strings', () => {
        const result = trigramScore('', 'hello');
        assert(isNaN(result) || result === 0, 'Should handle empty strings gracefully');
    });

    it('should calculate similarity for overlapping strings', () => {
        const result = trigramScore('hello', 'helloworld');
        assert(result > 0 && result <= 1, 'Should return value between 0 and 1');
    });

    it('should work with similar strings', () => {
        const result = trigramScore('testing', 'testing123');
        assert(result > 0.5, 'Similar strings should have high trigram score');
    });

    it('should handle strings with repeated characters', () => {
        const result = trigramScore('aaa', 'aaa');
        assert.strictEqual(result, 1);
    });

    it('should be case sensitive', () => {
        const result1 = trigramScore('Hello', 'hello');
        const result2 = trigramScore('hello', 'hello');
        assert(result1 < result2, 'Should be case sensitive');
    });

    it('should work with minimum length strings for trigrams', () => {
        const result = trigramScore('abc', 'abd');
        assert(result >= 0 && result <= 1, 'Should handle 3-character strings');
    });
});
