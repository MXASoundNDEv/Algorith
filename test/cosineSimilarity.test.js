const assert = require('assert');
const cosineSimilarity = require('../algorithms/cosineSimilarity');

describe('Cosine Similarity', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(cosineSimilarity('hello', 'hello'), 1);
        assert.strictEqual(cosineSimilarity('test', 'test'), 1);
        assert.strictEqual(cosineSimilarity('', ''), 1);
    });

    it('should return 0 for orthogonal vectors (no common characters)', () => {
        const result = cosineSimilarity('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle empty strings', () => {
        const result1 = cosineSimilarity('', 'hello');
        const result2 = cosineSimilarity('hello', '');
        assert(isNaN(result1) || result1 === 0, 'Should handle empty strings gracefully');
        assert(isNaN(result2) || result2 === 0, 'Should handle empty strings gracefully');
    });

    it('should calculate similarity based on character frequency vectors', () => {
        const result = cosineSimilarity('hello', 'help');
        assert(result > 0 && result < 1, 'Should return value between 0 and 1 for partial similarity');
    });

    it('should handle repeated characters correctly', () => {
        const result = cosineSimilarity('aaa', 'aa');
        assert.strictEqual(result, 1); // Same character distribution
    });

    it('should be symmetric', () => {
        const str1 = 'hello';
        const str2 = 'world';
        assert.strictEqual(cosineSimilarity(str1, str2), cosineSimilarity(str2, str1));
    });

    it('should work with case sensitivity', () => {
        const result1 = cosineSimilarity('Hello', 'hello');
        const result2 = cosineSimilarity('hello', 'hello');
        assert(result1 < result2, 'Should be case sensitive');
    });

    it('should handle single character strings', () => {
        assert.strictEqual(cosineSimilarity('a', 'a'), 1);
        assert.strictEqual(cosineSimilarity('a', 'b'), 0);
    });

    it('should work with different character frequencies', () => {
        // 'aab' has vector {a:2, b:1}
        // 'ab' has vector {a:1, b:1}
        const result = cosineSimilarity('aab', 'ab');
        assert(result > 0.8, 'Should have high similarity for similar character distributions');
    });
});
