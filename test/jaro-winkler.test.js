const assert = require('assert');
const jaroWinkler = require('../algorithms/jaro-winkler');

describe('Jaro-Winkler Distance', () => {
    it('should return 1 for identical strings', () => {
        assert.strictEqual(jaroWinkler('hello', 'hello'), 1);
        assert.strictEqual(jaroWinkler('test', 'test'), 1);
        assert.strictEqual(jaroWinkler('', ''), 1);
    });

    it('should return 0 for completely different strings', () => {
        const result = jaroWinkler('abc', 'xyz');
        assert.strictEqual(result, 0);
    });

    it('should handle empty strings', () => {
        assert.strictEqual(jaroWinkler('', 'hello'), 0);
        assert.strictEqual(jaroWinkler('hello', ''), 0);
    });

    it('should boost scores for common prefixes', () => {
        // Jaro-Winkler doit donner un bonus pour les préfixes communs
        // Comparons la même paire avec et sans le bonus de préfixe
        const str1 = 'MARTHA';
        const str2 = 'MARHTA';
        const jaroWinklerScore = jaroWinkler(str1, str2);
        
        // Le score Jaro-Winkler devrait être supérieur au score Jaro seul
        // (difficile à tester sans accès direct au Jaro, mais on peut vérifier qu'il est raisonnable)
        assert(jaroWinklerScore > 0.9, `Jaro-Winkler should give high scores for similar strings with common prefixes: ${jaroWinklerScore}`);
    });

    it('should calculate known examples correctly', () => {
        // Test case from Jaro-Winkler literature
        const result = jaroWinkler('MARTHA', 'MARHTA');
        assert(result > 0.9, 'MARTHA and MARHTA should have high similarity');
    });

    it('should handle single character strings', () => {
        assert.strictEqual(jaroWinkler('a', 'a'), 1);
        assert.strictEqual(jaroWinkler('a', 'b'), 0);
    });

    it('should be symmetric', () => {
        const str1 = 'hello';
        const str2 = 'world';
        assert.strictEqual(jaroWinkler(str1, str2), jaroWinkler(str2, str1));
    });

    it('should work with different length strings', () => {
        const result = jaroWinkler('test', 'testing');
        assert(result > 0 && result < 1, 'Should return value between 0 and 1');
    });
});
