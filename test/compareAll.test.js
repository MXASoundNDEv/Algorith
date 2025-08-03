const assert = require('assert');
const algorithms = require('../index');

describe('Compare All Algorithms', () => {
    it('should export all expected functions', () => {
        assert(typeof algorithms.levenshtein === 'function');
        assert(typeof algorithms.jaroWinkler === 'function');
        assert(typeof algorithms.hamming === 'function');
        assert(typeof algorithms.trigramScore === 'function');
        assert(typeof algorithms.jaccardSimilarity === 'function');
        assert(typeof algorithms.diceCoefficient === 'function');
        assert(typeof algorithms.jaro === 'function');
        assert(typeof algorithms.cosineSimilarity === 'function');
        assert(typeof algorithms.RandomEngine === 'function'); // Constructor
        assert(typeof algorithms.compareAll === 'function');
    });

    it('should return all similarity scores in compareAll', () => {
        const result = algorithms.compareAll('hello', 'hello');
        
        assert(typeof result === 'object');
        assert(typeof result.levenshtein === 'number');
        assert(typeof result.jaroWinkler === 'number');
        assert(typeof result.hamming === 'number');
        assert(typeof result.trigram === 'number');
        assert(typeof result.jaccard === 'number');
        assert(typeof result.dice === 'number');
        assert(typeof result.cosine === 'number');
        
        // Pour des chaînes identiques, la plupart devraient retourner 1
        assert.strictEqual(result.levenshtein, 1);
        assert.strictEqual(result.jaroWinkler, 1);
        assert.strictEqual(result.hamming, 1);
        assert.strictEqual(result.jaccard, 1);
        assert.strictEqual(result.cosine, 1);
    });

    it('should handle different strings in compareAll', () => {
        const result = algorithms.compareAll('hello', 'world');
        
        assert(typeof result === 'object');
        
        // Tous les scores devraient être entre 0 et 1
        Object.values(result).forEach(score => {
            if (!isNaN(score)) {
                assert(score >= 0 && score <= 1, `Score ${score} should be between 0 and 1`);
            }
        });
    });

    it('should handle empty strings in compareAll', () => {
        const result = algorithms.compareAll('', 'hello');
        
        assert(typeof result === 'object');
        
        // La plupart des algorithmes devraient retourner 0 pour des chaînes vides vs non-vides
        assert.strictEqual(result.levenshtein, 0);
        assert.strictEqual(result.hamming, 0);
        assert.strictEqual(result.jaccard, 0);
    });

    it('should be consistent with individual algorithm calls', () => {
        const str1 = 'testing';
        const str2 = 'test';
        
        const compareAllResult = algorithms.compareAll(str1, str2);
        
        // Vérifier que compareAll donne les mêmes résultats que les appels individuels
        assert.strictEqual(compareAllResult.levenshtein, algorithms.levenshtein(str1, str2));
        assert.strictEqual(compareAllResult.jaroWinkler, algorithms.jaroWinkler(str1, str2));
        assert.strictEqual(compareAllResult.hamming, algorithms.hamming(str1, str2));
        assert.strictEqual(compareAllResult.trigram, algorithms.trigramScore(str1, str2));
        assert.strictEqual(compareAllResult.jaccard, algorithms.jaccardSimilarity(str1, str2));
        assert.strictEqual(compareAllResult.dice, algorithms.diceCoefficient(str1, str2));
        assert.strictEqual(compareAllResult.cosine, algorithms.cosineSimilarity(str1, str2));
    });

    it('should handle edge cases consistently', () => {
        const testCases = [
            ['', ''],
            ['a', 'a'],
            ['abc', 'xyz'],
            ['hello', 'help'],
            ['testing', 'testing123']
        ];

        testCases.forEach(([str1, str2]) => {
            const result = algorithms.compareAll(str1, str2);
            
            // Vérifier que tous les résultats sont des nombres ou NaN
            Object.values(result).forEach(score => {
                assert(typeof score === 'number', `Score should be a number, got ${typeof score}`);
            });
        });
    });

    it('should provide access to RandomEngine class', () => {
        const rng = new algorithms.RandomEngine(12345);
        assert(typeof rng.uniform === 'function', 'RandomEngine should have uniform method');
        assert(typeof rng.int === 'function', 'RandomEngine should have int method');
        assert(typeof rng.pick === 'function', 'RandomEngine should have pick method');
        
        // Test basic functionality
        const value = rng.uniform(0, 1);
        assert(typeof value === 'number', 'uniform should return number');
        assert(value >= 0 && value <= 1, 'uniform should return value in range');
    });
});
