module.exports = function diceCoefficient(a, b) {
    const bigrams = s => {
        const result = [];
        for (let i = 0; i < s.length - 1; i++) result.push(s.slice(i, i + 2));
        return result;
    };

    const aGrams = bigrams(a);
    const bGrams = bigrams(b);
    const intersection = aGrams.filter(g => bGrams.includes(g)).length;

    return (2 * intersection) / (aGrams.length + bGrams.length);
};