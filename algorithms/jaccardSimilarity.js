module.exports = function jaccardSimilarity(a, b) {
    if (a.length === 0 && b.length === 0) return 1;
    
    const sa = new Set(a);
    const sb = new Set(b);
    const inter = [...sa].filter(x => sb.has(x)).length;
    const union = new Set([...a, ...b]).size;
    
    if (union === 0) return 1;
    return inter / union;
};