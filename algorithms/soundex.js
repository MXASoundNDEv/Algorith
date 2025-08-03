module.exports = function soundex(s) {
    if (!s || s.length === 0) return 'Z000';
    
    const map = {
        a: '',
        e: '',
        i: '',
        o: '',
        u: '',
        b: 1,
        f: 1,
        p: 1,
        v: 1,
        c: 2,
        g: 2,
        j: 2,
        k: 2,
        q: 2,
        s: 2,
        x: 2,
        z: 2,
        d: 3,
        t: 3,
        l: 4,
        m: 5,
        n: 5,
        r: 6
    };

    s = s.toLowerCase();
    let first = s[0].toUpperCase();
    let code = first;

    let prev = map[s[0]] || '';
    for (let i = 1; i < s.length; i++) {
        const digit = map[s[i]] || '';
        if (digit !== prev) code += digit;
        if (code.length === 4) break;
        if (digit !== '') prev = digit;
    }

    return code.padEnd(4, '0');
};