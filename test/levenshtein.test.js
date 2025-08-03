const assert = require('assert');
const levenshtein = require('../algorithms/levenshtein');

describe('Levenshtein Distance', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(levenshtein('hello', 'hello'), 1);
        assert.strictEqual(levenshtein('test', 'test'), 1);
        assert.strictEqual(levenshtein('', ''), 1);
    });

    it('should return 0 for completely different strings of same length', () => {
        const result = levenshtein('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle empty strings', () => {
        assert.strictEqual(levenshtein('', 'hello'), 0);
        assert.strictEqual(levenshtein('hello', ''), 0);
    });

    it('should calculate correct similarity for single character difference', () => {
        const result = levenshtein('hello', 'hallo');
        const expected = 1 - 1/5; // 1 substitution, max length 5
        assert.strictEqual(result, expected);
    });

    it('should calculate correct similarity for insertion', () => {
        const result = levenshtein('cat', 'cats');
        const expected = 1 - 1/4; // 1 insertion, max length 4
        assert.strictEqual(result, expected);
    });

    it('should calculate correct similarity for deletion', () => {
        const result = levenshtein('cats', 'cat');
        const expected = 1 - 1/4; // 1 deletion, max length 4
        assert.strictEqual(result, expected);
    });

    it('should handle case sensitivity', () => {
        const result = levenshtein('Hello', 'hello');
        const expected = 1 - 1/5; // 1 substitution
        assert.strictEqual(result, expected);
    });

    it('should work with longer strings', () => {
        const str1 = 'kitten';
        const str2 = 'sitting';
        const result = levenshtein(str1, str2);
        // 3 operations needed: k->s, e->i, insert g
        const expected = 1 - 3/7;
        assert.strictEqual(result, expected);
    });
});
