const assert = require('assert');
const RandomEngine = require('../algorithms/RandomEngine');

describe('RandomEngine', () => {
    let rng;
    const SEED = 12345;

    beforeEach(() => {
        rng = new RandomEngine(SEED);
    });

    describe('Constructor and Basic Setup', () => {
        it('should create instance with default seed', () => {
            const rng1 = new RandomEngine();
            const rng2 = new RandomEngine();
            assert(rng1.seed !== rng2.seed, 'Different instances should have different default seeds');
        });

        it('should create reproducible results with same seed', () => {
            const rng1 = new RandomEngine(SEED);
            const rng2 = new RandomEngine(SEED);
            
            const values1 = Array.from({length: 10}, () => rng1.uniform());
            const values2 = Array.from({length: 10}, () => rng2.uniform());
            
            assert.deepStrictEqual(values1, values2, 'Same seed should produce identical sequences');
        });

        it('should generate gradient table on construction', () => {
            assert(Array.isArray(rng.gradients), 'Should have gradients array');
            assert(Array.isArray(rng.permutation), 'Should have permutation array');
            assert.strictEqual(rng.gradients.length, 256, 'Gradients should have 256 elements');
            assert.strictEqual(rng.permutation.length, 256, 'Permutation should have 256 elements');
        });
    });

    describe('Basic Random Functions', () => {
        it('should generate uniform values between 0 and 1 by default', () => {
            for (let i = 0; i < 100; i++) {
                const value = rng.uniform();
                assert(value >= 0 && value <= 1, `Value ${value} should be between 0 and 1`);
            }
        });

        it('should generate uniform values in custom range', () => {
            const min = 10, max = 20;
            for (let i = 0; i < 100; i++) {
                const value = rng.uniform(min, max);
                assert(value >= min && value <= max, `Value ${value} should be between ${min} and ${max}`);
            }
        });

        it('should generate integers in range', () => {
            const min = 1, max = 10;
            for (let i = 0; i < 100; i++) {
                const value = rng.int(min, max);
                assert(Number.isInteger(value), 'Should return integer');
                assert(value >= min && value <= max, `Value ${value} should be between ${min} and ${max}`);
            }
        });

        it('should generate boolean values', () => {
            const results = Array.from({length: 1000}, () => rng.bool());
            const trueCount = results.filter(x => x === true).length;
            const falseCount = results.filter(x => x === false).length;
            
            assert.strictEqual(trueCount + falseCount, 1000, 'Should only generate true/false');
            // Avec une probabilité de 0.5, on s'attend à ~50% de chaque
            assert(trueCount > 300 && trueCount < 700, 'Should have roughly balanced true/false with default probability');
        });

        it('should generate boolean with custom probability', () => {
            const results = Array.from({length: 1000}, () => rng.bool(0.8));
            const trueCount = results.filter(x => x === true).length;
            
            // Avec une probabilité de 0.8, on s'attend à ~80% de true
            assert(trueCount > 700 && trueCount < 900, 'Should have ~80% true values with 0.8 probability');
        });
    });

    describe('Array Operations', () => {
        it('should pick random element from array', () => {
            const array = [1, 2, 3, 4, 5];
            for (let i = 0; i < 50; i++) {
                const picked = rng.pick(array);
                assert(array.includes(picked), 'Picked element should be from the array');
            }
        });

        it('should shuffle array without modifying original', () => {
            const original = [1, 2, 3, 4, 5];
            const shuffled = rng.shuffle(original);
            
            assert.deepStrictEqual(original, [1, 2, 3, 4, 5], 'Original array should not be modified');
            assert.strictEqual(shuffled.length, original.length, 'Shuffled array should have same length');
            
            // Vérifier que tous les éléments sont présents
            const sortedOriginal = [...original].sort();
            const sortedShuffled = [...shuffled].sort();
            assert.deepStrictEqual(sortedShuffled, sortedOriginal, 'Shuffled array should contain same elements');
        });

        it('should produce different shuffles', () => {
            const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            const shuffle1 = rng.shuffle(array);
            const shuffle2 = rng.shuffle(array);
            
            // Il est très improbable que deux mélanges soient identiques
            assert.notDeepStrictEqual(shuffle1, shuffle2, 'Different shuffles should be different');
        });
    });

    describe('Probability Distributions', () => {
        it('should generate normal distribution values', () => {
            const values = Array.from({length: 1000}, () => rng.normal(0, 1));
            const mean = values.reduce((a, b) => a + b) / values.length;
            
            // La moyenne devrait être proche de 0
            assert(Math.abs(mean) < 0.2, `Mean ${mean} should be close to 0`);
            
            // La plupart des valeurs devraient être dans 3 écarts-types
            const withinThreeSigma = values.filter(v => Math.abs(v) <= 3).length;
            assert(withinThreeSigma > 990, 'Most values should be within 3 standard deviations');
        });

        it('should generate exponential distribution values', () => {
            const lambda = 2;
            const values = Array.from({length: 1000}, () => rng.exponential(lambda));
            
            // Toutes les valeurs devraient être positives
            assert(values.every(v => v >= 0), 'Exponential values should be non-negative');
            
            const mean = values.reduce((a, b) => a + b) / values.length;
            const expectedMean = 1 / lambda;
            
            // La moyenne devrait être proche de 1/lambda
            assert(Math.abs(mean - expectedMean) < 0.2, `Mean ${mean} should be close to ${expectedMean}`);
        });

        it('should generate poisson distribution values', () => {
            const lambda = 4;
            const values = Array.from({length: 1000}, () => rng.poisson(lambda));
            
            // Toutes les valeurs devraient être des entiers non-négatifs
            assert(values.every(v => Number.isInteger(v) && v >= 0), 'Poisson values should be non-negative integers');
            
            const mean = values.reduce((a, b) => a + b) / values.length;
            
            // La moyenne devrait être proche de lambda
            assert(Math.abs(mean - lambda) < 0.5, `Mean ${mean} should be close to ${lambda}`);
        });

        it('should generate binomial distribution values', () => {
            const n = 10, p = 0.3;
            const values = Array.from({length: 1000}, () => rng.binomial(n, p));
            
            // Toutes les valeurs devraient être entre 0 et n
            assert(values.every(v => Number.isInteger(v) && v >= 0 && v <= n), 
                   `Binomial values should be integers between 0 and ${n}`);
            
            const mean = values.reduce((a, b) => a + b) / values.length;
            const expectedMean = n * p;
            
            // La moyenne devrait être proche de n*p
            assert(Math.abs(mean - expectedMean) < 0.5, `Mean ${mean} should be close to ${expectedMean}`);
        });

        it('should generate geometric distribution values', () => {
            const p = 0.3;
            const values = Array.from({length: 1000}, () => rng.geometric(p));
            
            // Toutes les valeurs devraient être des entiers positifs
            assert(values.every(v => Number.isInteger(v) && v > 0), 'Geometric values should be positive integers');
        });

        it('should handle weighted selection', () => {
            const items = [
                { value: 'A', weight: 1 },
                { value: 'B', weight: 2 },
                { value: 'C', weight: 7 }  // 70% de chance
            ];
            
            const results = Array.from({length: 1000}, () => rng.weighted(items));
            const counts = { A: 0, B: 0, C: 0 };
            results.forEach(r => counts[r]++);
            
            // C devrait être sélectionné le plus souvent (70%)
            assert(counts.C > counts.A && counts.C > counts.B, 'C should be selected most often');
            assert(counts.C > 600, 'C should be selected ~70% of the time');
        });
    });

    describe('Text and Character Generation', () => {
        it('should generate random characters', () => {
            const chars = Array.from({length: 100}, () => rng.randomChar());
            const alphabet = "abcdefghijklmnopqrstuvwxyz";
            
            assert(chars.every(c => alphabet.includes(c)), 'All characters should be lowercase letters');
            
            // Vérifier qu'on a une variété de caractères
            const uniqueChars = new Set(chars);
            assert(uniqueChars.size > 5, 'Should generate variety of characters');
        });

        it('should generate random strings of specified length', () => {
            const length = 12;
            const str = rng.randomString(length);
            
            assert.strictEqual(str.length, length, `String should have length ${length}`);
            assert(typeof str === 'string', 'Should return a string');
            assert(/^[a-z]+$/.test(str), 'String should contain only lowercase letters');
        });

        it('should generate random words', () => {
            const words = Array.from({length: 50}, () => rng.randomWord());
            
            words.forEach(word => {
                assert(typeof word === 'string', 'Should return string');
                assert(word.length >= 4 && word.length <= 8, 'Word length should be between 4-8 characters');
                assert(/^[a-z]+$/.test(word), 'Word should contain only lowercase letters');
            });
        });

        it('should generate valid UUIDs', () => {
            const uuids = Array.from({length: 10}, () => rng.uuid());
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
            
            uuids.forEach(uuid => {
                assert(uuidRegex.test(uuid), `UUID ${uuid} should match UUID v4 format`);
            });
            
            // Vérifier que les UUIDs sont uniques
            const uniqueUuids = new Set(uuids);
            assert.strictEqual(uniqueUuids.size, uuids.length, 'All UUIDs should be unique');
        });
    });

    describe('Crypto Secure Functions', () => {
        it('should generate crypto secure integers', () => {
            const min = 1, max = 10;
            const values = Array.from({length: 100}, () => RandomEngine.cryptoInt(min, max));
            
            values.forEach(value => {
                assert(Number.isInteger(value), 'Should return integer');
                assert(value >= min && value <= max, `Value ${value} should be between ${min} and ${max}`);
            });
            
            // Vérifier qu'on a une variété de valeurs
            const uniqueValues = new Set(values);
            assert(uniqueValues.size > 1, 'Should generate variety of values');
        });
    });

    describe('Noise Functions', () => {
        it('should generate Perlin noise', () => {
            const values = Array.from({length: 100}, (_, i) => rng.perlin1D(i * 0.1));
            
            // Les valeurs de bruit Perlin devraient généralement être entre -1 et 1
            values.forEach(value => {
                assert(typeof value === 'number', 'Should return number');
                assert(!isNaN(value), 'Should not return NaN');
            });
        });

        it('should generate value noise', () => {
            const values = Array.from({length: 100}, (_, i) => rng.valueNoise1D(i * 0.1));
            
            values.forEach(value => {
                assert(typeof value === 'number', 'Should return number');
                assert(!isNaN(value), 'Should not return NaN');
            });
        });

        it('should generate white noise', () => {
            const values = Array.from({length: 100}, () => rng.whiteNoise());
            
            values.forEach(value => {
                assert(typeof value === 'number', 'Should return number');
                assert(value >= -1 && value <= 1, 'White noise should be between -1 and 1');
            });
        });

        it('should generate pink noise', () => {
            const values = Array.from({length: 100}, (_, i) => rng.pinkNoise((i + 1) * 0.1));
            
            values.forEach(value => {
                assert(typeof value === 'number', 'Should return number');
                assert(!isNaN(value), 'Should not return NaN');
            });
        });

        it('should handle noise function with different types', () => {
            const types = ['perlin', 'value', 'white', 'pink'];
            
            types.forEach(type => {
                const value = rng.noise(0.5, type);
                assert(typeof value === 'number', `${type} noise should return number`);
                assert(!isNaN(value), `${type} noise should not return NaN`);
            });
        });

        it('should throw error for unknown noise type', () => {
            assert.throws(() => {
                rng.noise(0.5, 'unknown');
            }, /Unknown noise type/, 'Should throw error for unknown noise type');
        });
    });

    describe('Helper Functions', () => {
        it('should apply fade function correctly', () => {
            assert.strictEqual(rng.fade(0), 0, 'fade(0) should be 0');
            assert.strictEqual(rng.fade(1), 1, 'fade(1) should be 1');
            
            const midValue = rng.fade(0.5);
            assert(midValue > 0 && midValue < 1, 'fade(0.5) should be between 0 and 1');
        });

        it('should interpolate correctly', () => {
            assert.strictEqual(rng.lerp(0, 10, 0), 0, 'lerp at t=0 should return first value');
            assert.strictEqual(rng.lerp(0, 10, 1), 10, 'lerp at t=1 should return second value');
            assert.strictEqual(rng.lerp(0, 10, 0.5), 5, 'lerp at t=0.5 should return midpoint');
        });
    });

    describe('Deterministic Behavior', () => {
        it('should be deterministic with same seed', () => {
            const rng1 = new RandomEngine(42);
            const rng2 = new RandomEngine(42);
            
            // Test plusieurs fonctions
            assert.strictEqual(rng1.uniform(), rng2.uniform(), 'uniform() should be deterministic');
            assert.strictEqual(rng1.int(1, 10), rng2.int(1, 10), 'int() should be deterministic');
            assert.strictEqual(rng1.bool(), rng2.bool(), 'bool() should be deterministic');
            assert.strictEqual(rng1.normal(), rng2.normal(), 'normal() should be deterministic');
        });

        it('should maintain state correctly across multiple calls', () => {
            const rng1 = new RandomEngine(123);
            const rng2 = new RandomEngine(123);
            
            // Générer quelques valeurs avec rng1
            rng1.uniform();
            rng1.int(1, 5);
            const value1 = rng1.uniform();
            
            // Générer les mêmes avec rng2
            rng2.uniform();
            rng2.int(1, 5);
            const value2 = rng2.uniform();
            
            assert.strictEqual(value1, value2, 'Should maintain same sequence with same operations');
        });
    });
});
