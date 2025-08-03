// randomEngine.js - moteur d'aléatoire avancé + bruit

class RandomEngine {
  constructor(seed = Date.now()) {
    this.seed = seed;
    this.rand = this.mulberry32(seed);
    this.generateGradientTable();
  }

  // --- Générateur déterministe
  mulberry32(seed) {
    return function () {
      let t = (seed += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // --- Fonctions de base
  uniform(min = 0, max = 1) {
    return this.rand() * (max - min) + min;
  }

  int(min, max) {
    return Math.floor(this.uniform(min, max + 1));
  }

  bool(prob = 0.5) {
    return this.rand() < prob;
  }

  pick(array) {
    return array[this.int(0, array.length - 1)];
  }

  shuffle(array) {
    const a = array.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = this.int(0, i);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // --- Distributions
  normal(mean = 0, stdDev = 1) {
    const u = this.rand(), v = this.rand();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    return z * stdDev + mean;
  }

  exponential(lambda = 1) {
    return -Math.log(1 - this.rand()) / lambda;
  }

  poisson(lambda = 4) {
    let L = Math.exp(-lambda), k = 0, p = 1;
    do {
      k++;
      p *= this.rand();
    } while (p > L);
    return k - 1;
  }

  binomial(n, p) {
    let x = 0;
    for (let i = 0; i < n; i++) if (this.rand() < p) x++;
    return x;
  }

  geometric(p) {
    return Math.ceil(Math.log(1 - this.rand()) / Math.log(1 - p));
  }

  weighted(items) {
    const total = items.reduce((sum, o) => sum + o.weight, 0);
    let r = this.rand() * total;
    for (let o of items) {
      if ((r -= o.weight) < 0) return o.value;
    }
  }

  // --- Texte et caractères
  randomChar() {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    return chars.charAt(this.int(0, chars.length - 1));
  }

  randomString(length = 8) {
    return Array.from({ length }, () => this.randomChar()).join('');
  }

  randomWord() {
    const syllables = ["ba", "do", "ka", "me", "la", "ru", "zo", "ni", "fi", "ti"];
    const count = this.int(2, 4);
    return Array.from({ length: count }, () => this.pick(syllables)).join('');
  }

  uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = this.int(0, 15);
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // --- Crypto secure
  static cryptoInt(min, max) {
    const range = max - min + 1;
    const rand = new Uint32Array(1);
    crypto.getRandomValues(rand);
    return min + (rand[0] % range);
  }

  // --- Bruit
  generateGradientTable(size = 256) {
    this.gradients = Array.from({ length: size }, () => this.uniform(-1, 1));
    this.permutation = Array.from({ length: size }, (_, i) => i);
    this.shuffle(this.permutation);
  }

  fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  perlin1D(x) {
    const xi = Math.floor(x) % 256;
    const xf = x - Math.floor(x);
    const g1 = this.gradients[this.permutation[xi]];
    const g2 = this.gradients[this.permutation[(xi + 1) % 256]];
    const u = this.fade(xf);
    return this.lerp(g1 * xf, g2 * (xf - 1), u);
  }

  valueNoise1D(x) {
    const xi = Math.floor(x);
    const xf = x - xi;
    const v1 = this.uniform(-1, 1);
    const v2 = this.uniform(-1, 1);
    return this.lerp(v1, v2, this.fade(xf));
  }

  whiteNoise() {
    return this.uniform(-1, 1);
  }

  pinkNoise(x) {
    return this.perlin1D(x) / (x || 1); // éviter division par 0
  }

  noise(x, type = "perlin") {
    switch (type) {
      case "perlin": return this.perlin1D(x);
      case "value": return this.valueNoise1D(x);
      case "white": return this.whiteNoise();
      case "pink": return this.pinkNoise(x);
      default: throw new Error("Unknown noise type: " + type);
    }
  }
}

module.exports = RandomEngine;
