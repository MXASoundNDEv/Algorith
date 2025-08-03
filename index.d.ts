// Type definitions for algorith
// Project: algorith
// Definitions by: MXA.K

export interface SimilarityResult {
    levenshtein: number;
    jaroWinkler: number;
    hamming: number;
    trigram: number;
    jaccard: number;
    jaro: number;
    dice: number;
    cosine: number;
}

export interface WeightedItem<T = any> {
    value: T;
    weight: number;
}

/**
 * Calculates the normalized Levenshtein distance between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function levenshtein(a: string, b: string): number;

/**
 * Calculates the Jaro-Winkler similarity between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function jaroWinkler(a: string, b: string): number;

/**
 * Calculates the Jaro similarity between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function jaro(a: string, b: string): number;

/**
 * Calculates the normalized Hamming distance between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function hamming(a: string, b: string): number;

/**
 * Calculates the Jaccard similarity between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function jaccardSimilarity(a: string, b: string): number;

/**
 * Calculates the cosine similarity between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function cosineSimilarity(a: string, b: string): number;

/**
 * Calculates the Dice coefficient between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function diceCoefficient(a: string, b: string): number;

/**
 * Calculates the trigram score between two strings
 * @param a First string
 * @param b Second string
 * @returns Similarity score between 0 and 1
 */
export function trigramScore(a: string, b: string): number;

/**
 * Generates the Soundex code for a string
 * @param s Input string
 * @returns 4-character Soundex code
 */
export function soundex(s: string): string;

/**
 * Compares two strings using all available similarity algorithms
 * @param a First string
 * @param b Second string
 * @returns Object containing all similarity scores
 */
export function compareAll(a: string, b: string): SimilarityResult;

/**
 * Advanced random number generator with multiple distributions and noise functions
 */
export class RandomEngine {
    /**
     * Current seed value
     */
    public seed: number;

    /**
     * Gradient table for noise generation
     */
    public gradients: number[];

    /**
     * Permutation table for noise generation
     */
    public permutation: number[];

    /**
     * Creates a new RandomEngine instance
     * @param seed Optional seed for deterministic generation
     */
    constructor(seed?: number);

    // Basic random functions

    /**
     * Generates a uniform random number
     * @param min Minimum value (default: 0)
     * @param max Maximum value (default: 1)
     * @returns Random number between min and max
     */
    uniform(min?: number, max?: number): number;

    /**
     * Generates a random integer
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Random integer between min and max
     */
    int(min: number, max: number): number;

    /**
     * Generates a random boolean
     * @param prob Probability of returning true (default: 0.5)
     * @returns Random boolean value
     */
    bool(prob?: number): boolean;

    /**
     * Picks a random element from an array
     * @param array Input array
     * @returns Random element from the array
     */
    pick<T>(array: T[]): T;

    /**
     * Shuffles an array (returns a new array)
     * @param array Input array
     * @returns New shuffled array
     */
    shuffle<T>(array: T[]): T[];

    // Probability distributions

    /**
     * Generates a normally distributed random number
     * @param mean Mean value (default: 0)
     * @param stdDev Standard deviation (default: 1)
     * @returns Normally distributed random number
     */
    normal(mean?: number, stdDev?: number): number;

    /**
     * Generates an exponentially distributed random number
     * @param lambda Rate parameter (default: 1)
     * @returns Exponentially distributed random number
     */
    exponential(lambda?: number): number;

    /**
     * Generates a Poisson distributed random number
     * @param lambda Rate parameter (default: 4)
     * @returns Poisson distributed random integer
     */
    poisson(lambda?: number): number;

    /**
     * Generates a binomially distributed random number
     * @param n Number of trials
     * @param p Probability of success
     * @returns Binomially distributed random integer
     */
    binomial(n: number, p: number): number;

    /**
     * Generates a geometrically distributed random number
     * @param p Probability of success
     * @returns Geometrically distributed random integer
     */
    geometric(p: number): number;

    /**
     * Selects a random value based on weights
     * @param items Array of weighted items
     * @returns Selected value
     */
    weighted<T>(items: WeightedItem<T>[]): T;

    // Text generation

    /**
     * Generates a random lowercase character
     * @returns Random character a-z
     */
    randomChar(): string;

    /**
     * Generates a random string
     * @param length Length of the string (default: 8)
     * @returns Random string
     */
    randomString(length?: number): string;

    /**
     * Generates a random pronounceable word
     * @returns Random word made of syllables
     */
    randomWord(): string;

    /**
     * Generates a UUID v4
     * @returns Valid UUID string
     */
    uuid(): string;

    // Crypto functions

    /**
     * Generates a cryptographically secure random integer
     * @param min Minimum value (inclusive)
     * @param max Maximum value (inclusive)
     * @returns Cryptographically secure random integer
     */
    static cryptoInt(min: number, max: number): number;

    // Noise functions

    /**
     * Generates noise using the specified type
     * @param x Input coordinate
     * @param type Noise type: 'perlin', 'value', 'white', or 'pink'
     * @returns Noise value
     */
    noise(x: number, type?: 'perlin' | 'value' | 'white' | 'pink'): number;

    /**
     * Generates 1D Perlin noise
     * @param x Input coordinate
     * @returns Perlin noise value
     */
    perlin1D(x: number): number;

    /**
     * Generates 1D value noise
     * @param x Input coordinate
     * @returns Value noise value
     */
    valueNoise1D(x: number): number;

    /**
     * Generates white noise
     * @returns White noise value between -1 and 1
     */
    whiteNoise(): number;

    /**
     * Generates pink noise
     * @param x Input frequency
     * @returns Pink noise value
     */
    pinkNoise(x: number): number;

    // Utility functions

    /**
     * Applies fade function for smooth interpolation
     * @param t Input value between 0 and 1
     * @returns Smoothed value
     */
    fade(t: number): number;

    /**
     * Linear interpolation between two values
     * @param a First value
     * @param b Second value
     * @param t Interpolation factor (0-1)
     * @returns Interpolated value
     */
    lerp(a: number, b: number, t: number): number;

    /**
     * Generates gradient table for noise functions
     * @param size Size of the gradient table (default: 256)
     */
    generateGradientTable(size?: number): void;

    /**
     * Mulberry32 PRNG implementation
     * @param seed Seed value
     * @returns Random number generator function
     */
    mulberry32(seed: number): () => number;
}
