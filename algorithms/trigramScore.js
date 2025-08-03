module.exports = function trigramScore(a, b) {
    const trigrams = s => {
        const result = [];
        for (let i = 0; i < s.length - 2; i++) result.push(s.slice(i, i + 3));
        return result;
    };

    const aGrams = trigrams(a);
    const bGrams = trigrams(b);
    
    if (aGrams.length === 0 && bGrams.length === 0) return 1;
    if (aGrams.length === 0 || bGrams.length === 0) return 0;
    
    const intersection = aGrams.filter(g => bGrams.includes(g)).length;
    const total = aGrams.length + bGrams.length;
    
    if (total === 0) return 1;
    return (2 * intersection) / total;
};