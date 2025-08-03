const levenshtein = require('./algorithms/levenshtein');
const jaroWinkler = require('./algorithms/jaro-winkler');
const hamming = require('./algorithms/hamming');
const trigramScore = require('./algorithms/trigramScore');
const jaccardSimilarity = require('./algorithms/jaccardSimilarity');
const diceCoefficient = require('./algorithms/diceCoefficient');
const jaro = require('./algorithms/jaro');
const cosineSimilarity = require('./algorithms/cosineSimilarity');
const RandomEngine = require('./algorithms/RandomEngine');

function compareAll(a, b) {
    return {
        levenshtein: levenshtein(a, b),
        jaroWinkler: jaroWinkler(a, b),
        hamming: hamming(a, b),
        trigram: trigramScore(a, b),
        jaccard: jaccardSimilarity(a, b),
        jaro: jaro(a, b),
        dice: diceCoefficient(a, b),
        cosine: cosineSimilarity(a, b)
    };
}

module.exports = {
    levenshtein,
    jaroWinkler,
    hamming,
    trigramScore,
    jaccardSimilarity,
    diceCoefficient,
    jaro,
    cosineSimilarity,
    RandomEngine,
    compareAll
};