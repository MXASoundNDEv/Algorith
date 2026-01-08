const assert = require('assert');
const fisherYatesShuffle = require('../algorithms/fisherYatesShuffle');

describe('Fisher-Yates Shuffle', () => {
  it('should return a new array without mutating the original', () => {
    const original = [1, 2, 3, 4];
    const shuffled = fisherYatesShuffle(original, () => 0);

    assert.deepStrictEqual(original, [1, 2, 3, 4]);
    assert.notStrictEqual(shuffled, original);
  });

  it('should keep the same elements', () => {
    const original = [1, 2, 3, 4, 5];
    const shuffled = fisherYatesShuffle(original, () => 0.5);

    assert.deepStrictEqual(shuffled.slice().sort((a, b) => a - b), original);
  });

  it('should produce deterministic output with a custom RNG', () => {
    const values = [0.1, 0.7, 0.3];
    let index = 0;
    const rng = () => values[index++];

    const result = fisherYatesShuffle([1, 2, 3, 4], rng);
    assert.deepStrictEqual(result, [2, 4, 3, 1]);
  });

  it('should handle empty arrays', () => {
    assert.deepStrictEqual(fisherYatesShuffle([], () => 0.5), []);
  });
});
