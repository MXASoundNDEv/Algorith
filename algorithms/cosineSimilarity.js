module.exports = function cosineSimilarity(a, b) {
    if (a.length === 0 && b.length === 0) return 1;
    if (a.length === 0 || b.length === 0) return 0;
    
    const vector = str => {
        const vec = {};
        for (let char of str) vec[char] = (vec[char] || 0) + 1;
        return vec;
    };

    const va = vector(a);
    const vb = vector(b);
    const allKeys = new Set([...Object.keys(va), ...Object.keys(vb)]);

    let dot = 0,
        magA = 0,
        magB = 0;
    allKeys.forEach(k => {
        const x = va[k] || 0;
        const y = vb[k] || 0;
        dot += x * y;
        magA += x * x;
        magB += y * y;
    });

    const result = dot / (Math.sqrt(magA) * Math.sqrt(magB));
    return Math.round(result * 1e15) / 1e15; // Fix floating point precision
};