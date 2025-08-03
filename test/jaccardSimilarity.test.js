const assert = require('assert');
const jaccardSimilarity = require('../algorithms/jaccardSimilarity');

describe('Jaccard Similarity', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(jaccardSimilarity('hello', 'hello'), 1);
        assert.strictEqual(jaccardSimilarity('test', 'test'), 1);
        assert.strictEqual(jaccardSimilarity('', ''), 1);
    });

    it('should return 0 for completely different strings', () => {
        const result = jaccardSimilarity('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle empty strings', () => {
        assert.strictEqual(jaccardSimilarity('', 'hello'), 0);
        assert.strictEqual(jaccardSimilarity('hello', ''), 0);
    });

    it('should calculate similarity based on character sets', () => {
        const result = jaccardSimilarity('abc', 'bcd');
        // Sets: {a,b,c} and {b,c,d}
        // Intersection: {b,c} = 2
        // Union: {a,b,c,d} = 4
        // Jaccard = 2/4 = 0.5
        assert.strictEqual(result, 0.5);
    });

    it('should handle repeated characters correctly', () => {
        const result = jaccardSimilarity('aaa', 'aa');
        // Both have only character 'a', so similarity should be 1
        assert.strictEqual(result, 1);
    });

    it('should be symmetric', () => {
        const str1 = 'hello';
        const str2 = 'world';
        assert.strictEqual(jaccardSimilarity(str1, str2), jaccardSimilarity(str2, str1));
    });

    it('should work with partial overlap', () => {
        const result = jaccardSimilarity('hello', 'help');
        // Sets: {h,e,l,o} and {h,e,l,p}
        // Intersection: {h,e,l} = 3
        // Union: {h,e,l,o,p} = 5
        // Jaccard = 3/5 = 0.6
        assert.strictEqual(result, 0.6);
    });

    it('should handle single character strings', () => {
        assert.strictEqual(jaccardSimilarity('a', 'a'), 1);
        assert.strictEqual(jaccardSimilarity('a', 'b'), 0);
    });
});
