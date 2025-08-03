function getMatchingCharacters(s1, s2) {
    const matchDistance = Math.floor(Math.max(s1.length, s2.length) / 2) - 1;
    const s1Matches = Array(s1.length).fill(false);
    const s2Matches = Array(s2.length).fill(false);

    let matches = 0;

    for (let i = 0; i < s1.length; i++) {
        const start = Math.max(0, i - matchDistance);
        const end = Math.min(i + matchDistance + 1, s2.length);

        for (let j = start; j < end; j++) {
            if (!s2Matches[j] && s1[i] === s2[j]) {
                s1Matches[i] = true;
                s2Matches[j] = true;
                matches++;
                break;
            }
        }
    }

    return {
        matches,
        s1Matches,
        s2Matches
    };
}

function getTranspositions(s1, s2, s1Matches, s2Matches) {
    const matchedS1 = [];
    const matchedS2 = [];

    for (let i = 0; i < s1.length; i++) {
        if (s1Matches[i]) matchedS1.push(s1[i]);
    }

    for (let j = 0; j < s2.length; j++) {
        if (s2Matches[j]) matchedS2.push(s2[j]);
    }

    let transpositions = 0;
    for (let i = 0; i < matchedS1.length; i++) {
        if (matchedS1[i] !== matchedS2[i]) transpositions++;
    }

    return transpositions;
}

function jaro(a, b) {
    if (a === b) return 1;
    if (a.length === 0 || b.length === 0) return 0;

    const {
        matches,
        s1Matches,
        s2Matches
    } = getMatchingCharacters(a, b);

    if (matches === 0) return 0;

    const transpositions = getTranspositions(a, b, s1Matches, s2Matches) / 2;

    return (
        (matches / a.length +
            matches / b.length +
            (matches - transpositions) / matches) / 3
    );
}

module.exports = jaro;