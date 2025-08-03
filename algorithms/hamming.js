module.exports = function hamming(a, b) {
    if (a.length === 0 && b.length === 0) return 1;
    
    const length = Math.max(a.length, b.length);
    if (length === 0) return 1;
    
    let distance = 0;

    for (let i = 0; i < length; i++) {
        if (a[i] !== b[i]) distance++;
    }

    return 1 - distance / length;
};
