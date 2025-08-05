module.exports = function soundex(s, lang = 'en', customMap = null) {
    if (!s || s.length === 0) return 'Z000';

    // Normalisation pour les lettres accentuées (français)
    const normalize = (str) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ç/g, "s").replace(/œ/g, "e");

    // Tables intégrées
    const maps = {
        en: {
            a: '', e: '', i: '', o: '', u: '', y: '', h: '', w: '',
            b: 1, f: 1, p: 1, v: 1,
            c: 2, g: 2, j: 2, k: 2, q: 2, s: 2, x: 2, z: 2,
            d: 3, t: 3,
            l: 4,
            m: 5, n: 5,
            r: 6
        },
        fr: {
            a: '', e: '', i: '', o: '', u: '', y: '', h: '', w: '',
            b: 1, p: 1,
            c: 2, k: 2, q: 2, g: 2, j: 2, s: 2, x: 2, z: 2, ç: 2,
            d: 3, t: 3,
            l: 4,
            m: 5, n: 5,
            r: 6,
            f: 7, v: 7
        }
    };

    // Prétraitement
    s = s.toLowerCase();
    if (lang === 'fr') s = normalize(s);

    // Sélection de la map
    const map = customMap || maps[lang] || maps['en'];

    // Initialisation
    const first = s[0].toUpperCase();
    let code = first;

    let prev = map[s[0]] ?? '';
    for (let i = 1; i < s.length; i++) {
        const digit = map[s[i]] ?? '';
        if (digit !== prev) code += digit;
        if (code.length === 4) break;
        if (digit !== '') prev = digit;
    }

    return code.padEnd(4, '0');
};
