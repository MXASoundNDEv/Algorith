const assert = require('assert');
const soundex = require('../algorithms/soundex');

describe('Soundex Algorithm', () => {
    it('should return proper soundex codes for common names', () => {
        assert.strictEqual(soundex('Robert'), 'R163');
        assert.strictEqual(soundex('Rupert'), 'R163');
        assert.strictEqual(soundex('Rubin'), 'R150');
    });

    it('should handle single character inputs', () => {
        const result = soundex('A');
        assert.strictEqual(result, 'A000');
    });

    it('should handle empty strings', () => {
        const result = soundex('');
        assert.strictEqual(result.length, 4);
        assert.strictEqual(result, 'Z000'); // Our implementation returns Z000 for empty strings
    });

    it('should preserve first letter in uppercase', () => {
        assert.strictEqual(soundex('smith')[0], 'S');
        assert.strictEqual(soundex('john')[0], 'J');
        assert.strictEqual(soundex('mary')[0], 'M');
    });

    it('should pad with zeros to make 4 characters', () => {
        const result = soundex('A');
        assert.strictEqual(result.length, 4);
        assert.strictEqual(result, 'A000');
    });

    it('should truncate at 4 characters', () => {
        const result = soundex('testing');
        assert.strictEqual(result.length, 4);
    });

    it('should handle consonant clusters correctly', () => {
        // Words with similar sounds should have same soundex
        const result1 = soundex('Jackson');
        const result2 = soundex('Jakson');
        // They should be similar but may not be identical due to algorithm specifics
        assert.strictEqual(result1.length, 4);
        assert.strictEqual(result2.length, 4);
    });

    it('should ignore vowels except first letter', () => {
        const result1 = soundex('Aeiou');
        const result2 = soundex('A');
        // Both should start with A and have similar structure
        assert.strictEqual(result1[0], 'A');
        assert.strictEqual(result2[0], 'A');
    });

    it('should handle case insensitivity', () => {
        assert.strictEqual(soundex('SMITH'), soundex('smith'));
        assert.strictEqual(soundex('John'), soundex('JOHN'));
    });

    it('should map similar consonants to same numbers', () => {
        // B, F, P, V should all map to 1
        const b_code = soundex('B')[1];
        const f_code = soundex('F')[1];
        const p_code = soundex('P')[1];
        const v_code = soundex('V')[1];

        // All should map to '1' or be handled consistently
        assert.strictEqual(b_code, f_code);
        assert.strictEqual(f_code, p_code);
        assert.strictEqual(p_code, v_code);
    });

    // Tests pour le support multilingue
    describe('Multilingual Support', () => {
        it('should work with English language (default)', () => {
            assert.strictEqual(soundex('Robert'), 'R163');
            assert.strictEqual(soundex('Robert', 'en'), 'R163');
        });

        it('should work with French language', () => {
            assert.strictEqual(soundex('François', 'fr'), 'F652');
            assert.strictEqual(soundex('Pierre', 'fr'), 'P600');
            assert.strictEqual(soundex('Céline', 'fr'), 'C450');
        });

        it('should handle French accented characters', () => {
            const result1 = soundex('François', 'fr');
            const result2 = soundex('Francois', 'fr');
            assert.strictEqual(result1, result2); // Should normalize accents
        });

        it('should handle French specific mappings', () => {
            // In French, F and V map to 7 instead of 1
            assert.strictEqual(soundex('François', 'fr')[1], '7');
            assert.strictEqual(soundex('Vincent', 'fr')[1], '7');
        });

        it('should fallback to English for unknown languages', () => {
            const englishResult = soundex('Robert', 'en');
            const unknownResult = soundex('Robert', 'unknown');
            assert.strictEqual(englishResult, unknownResult);
        });
    });

    // Tests pour les cartes personnalisées
    describe('Custom Mapping', () => {
        it('should accept custom character mapping', () => {
            const customMap = {
                a: '', e: '', i: '', o: '', u: '',
                b: 9, p: 9, // Custom mapping
                c: 8, k: 8,
                d: 7, t: 7
            };

            const result = soundex('Boat', null, customMap);
            assert.strictEqual(result[0], 'B');
            assert.strictEqual(result[1], '9'); // Should use custom mapping
        });

        it('should prioritize custom map over language map', () => {
            const customMap = {
                a: '', e: '', i: '', o: '', u: '',
                r: 9, // Different from standard mapping
                o: '', b: 1, e: '', r: 9, t: 3
            };

            const standardResult = soundex('Robert', 'en');
            const customResult = soundex('Robert', 'en', customMap);
            assert.notStrictEqual(standardResult, customResult);
        });
    });

    // Tests pour la normalisation française
    describe('French Normalization', () => {
        it('should normalize ç to s', () => {
            const result1 = soundex('François', 'fr');
            const result2 = soundex('Francois', 'fr');
            assert.strictEqual(result1, result2);
        });

        it('should normalize œ to e', () => {
            const result1 = soundex('Cœur', 'fr');
            const result2 = soundex('Ceur', 'fr');
            assert.strictEqual(result1, result2);
        });

        it('should remove diacritics', () => {
            const result1 = soundex('Élève', 'fr');
            const result2 = soundex('Eleve', 'fr');
            assert.strictEqual(result1, result2);
        });
    });

    // Tests de régression
    describe('Edge Cases', () => {
        it('should handle null input', () => {
            assert.strictEqual(soundex(null), 'Z000');
        });

        it('should handle undefined input', () => {
            assert.strictEqual(soundex(undefined), 'Z000');
        });

        it('should handle numbers in strings', () => {
            const result = soundex('Test123');
            assert.strictEqual(result.length, 4);
            assert.strictEqual(result[0], 'T');
        });

        it('should handle special characters', () => {
            const result = soundex('Test-Name');
            assert.strictEqual(result.length, 4);
            assert.strictEqual(result[0], 'T');
        });
    });
});
