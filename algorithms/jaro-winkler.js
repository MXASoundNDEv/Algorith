module.exports = function jaroWinkler(a, b) {
    if (a.length === 0 && b.length === 0) return 1;
    if (a.length === 0 || b.length === 0) return 0;
    
    const jaroDistance = (a, b) => {
        const maxDist = Math.max(0, Math.floor(Math.max(a.length, b.length) / 2) - 1);
        let matches = 0;
        let transpositions = 0;
        const aMatches = Array(a.length).fill(false);
        const bMatches = Array(b.length).fill(false);

        for (let i = 0; i < a.length; i++) {
            for (let j = Math.max(0, i - maxDist); j <= Math.min(b.length - 1, i + maxDist); j++) {
                if (a[i] === b[j] && !bMatches[j]) {
                    aMatches[i] = true;
                    bMatches[j] = true;
                    matches++;
                    break;
                }
            }
        }

        if (matches === 0) return 0;

        let k = 0;
        for (let i = 0; i < a.length; i++) {
            if (aMatches[i]) {
                while (!bMatches[k]) k++;
                if (a[i] !== b[k]) transpositions++;
                k++;
            }
        }

        const jaro = (matches / a.length + matches / b.length + (matches - transpositions / 2) / matches) / 3;
        return jaro;
    };

    const prefixLength = (a, b) => {
        let i = 0;
        while (i < Math.min(a.length, b.length, 4) && a[i] === b[i]) i++;
        return i;
    };

    const jaro = jaroDistance(a, b);
    const prefix = prefixLength(a, b);
    const scalingFactor = 0.1;

    return jaro + prefix * scalingFactor * (1 - jaro);
};
