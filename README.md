# Algorith 🧮

[![npm version](https://img.shields.io/npm/v/algorith)](https://www.npmjs.com/package/algorith)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-114%20passing-brightgreen)](./test/)

> Collection complète d'algorithmes de similarité textuelle et moteur de génération aléatoire avancé

## 📦 Installation

```bash
npm install algorith
```

## 🚀 Utilisation Rapide

```javascript
const {
  levenshtein,
  jaroWinkler,
  hamming,
  compareAll,
  RandomEngine
} = require('algorith');

// Comparaison de similarité
const similarity = levenshtein('hello', 'hallo');
console.log(similarity); // 0.8

// Comparaison avec tous les algorithmes
const results = compareAll('hello', 'world');
console.log(results);
/*
{
  levenshtein: 0.2,
  jaroWinkler: 0.466,
  hamming: 0.2,
  trigram: 0,
  jaccard: 0.2,
  jaro: 0.466,
  dice: 0,
  cosine: 0.408
}
*/

// Génération aléatoire
const rng = new RandomEngine(12345);
console.log(rng.uniform(0, 10)); // 7.234
console.log(rng.randomWord()); // "bakaru"
```

## 📚 API Documentation

### 🔍 Algorithmes de Similarité

Tous les algorithmes de similarité retournent une valeur entre **0** (aucune similarité) et **1** (identique).

#### `levenshtein(stringA, stringB)`

Calcule la distance de Levenshtein normalisée entre deux chaînes.

```javascript
const { levenshtein } = require('algorith');

levenshtein('kitten', 'sitting'); // 0.571
levenshtein('hello', 'hello');    // 1.0
levenshtein('abc', 'xyz');        // 0.0
```

**Cas d'usage :** Correction orthographique, détection de doublons, recherche floue.

#### `jaroWinkler(stringA, stringB)`

Algorithme Jaro-Winkler, optimisé pour les chaînes avec préfixes communs.

```javascript
const { jaroWinkler } = require('algorith');

jaroWinkler('MARTHA', 'MARHTA');  // 0.961
jaroWinkler('hello', 'help');     // 0.848
jaroWinkler('test', 'testing');   // 0.762
```

**Cas d'usage :** Comparaison de noms propres, détection de doublons d'identité.

#### `jaro(stringA, stringB)`

Algorithme Jaro (version de base sans le bonus Winkler).

```javascript
const { jaro } = require('algorith');

jaro('MARTHA', 'MARHTA');  // 0.944
jaro('hello', 'help');     // 0.783
```

#### `hamming(stringA, stringB)`

Distance de Hamming normalisée. Compare caractère par caractère.

```javascript
const { hamming } = require('algorith');

hamming('hello', 'hallo');  // 0.8 (1 différence sur 5)
hamming('1010', '1110');    // 0.75 (1 différence sur 4)
hamming('abc', 'abcdef');   // 0.5 (3 communs sur 6)
```

**Cas d'usage :** Comparaison de codes, séquences binaires, chaînes de même longueur.

#### `jaccardSimilarity(stringA, stringB)`

Similarité de Jaccard basée sur les ensembles de caractères.

```javascript
const { jaccardSimilarity } = require('algorith');

jaccardSimilarity('hello', 'help');    // 0.6
jaccardSimilarity('abc', 'bcd');       // 0.5
jaccardSimilarity('test', 'tset');     // 1.0 (mêmes caractères)
```

**Cas d'usage :** Comparaison de documents, analyse de contenu, détection de plagiat.

#### `cosineSimilarity(stringA, stringB)`

Similarité cosinus basée sur les fréquences de caractères.

```javascript
const { cosineSimilarity } = require('algorith');

cosineSimilarity('hello', 'help');   // 0.816
cosineSimilarity('aaa', 'aa');       // 1.0
cosineSimilarity('abc', 'xyz');      // 0.0
```

**Cas d'usage :** Analyse de texte, recherche de documents similaires.

#### `diceCoefficient(stringA, stringB)`

Coefficient de Dice basé sur les bigrammes (paires de caractères).

```javascript
const { diceCoefficient } = require('algorith');

diceCoefficient('hello', 'help');     // 0.571
diceCoefficient('night', 'nacht');    // 0.25
diceCoefficient('test', 'test');      // 1.0
```

**Cas d'usage :** Comparaison de mots, détection de variantes orthographiques.

#### `trigramScore(stringA, stringB)`

Score basé sur les trigrammes (groupes de 3 caractères).

```javascript
const { trigramScore } = require('algorith');

trigramScore('hello', 'helloworld');  // 0.8
trigramScore('testing', 'test');      // 0.4
trigramScore('abc', 'xyz');           // 0.0
```

**Cas d'usage :** Analyse de séquences, comparaison de texte long.

#### `soundex(string)`

Génère le code Soundex d'une chaîne (algorithme phonétique).

```javascript
const { soundex } = require('algorith');

soundex('Robert');   // 'R163'
soundex('Rupert');   // 'R163' (même son)
soundex('Smith');    // 'S530'
soundex('Smyth');    // 'S530' (même son)
```

**Cas d'usage :** Recherche phonétique, matching de noms.

#### `compareAll(stringA, stringB)`

Compare deux chaînes avec tous les algorithmes disponibles.

```javascript
const { compareAll } = require('algorith');

const results = compareAll('hello', 'help');
console.log(results);
/*
{
  levenshtein: 0.8,
  jaroWinkler: 0.848,
  hamming: 0.6,
  trigram: 0.571,
  jaccard: 0.6,
  jaro: 0.783,
  dice: 0.571,
  cosine: 0.816
}
*/
```

**Cas d'usage :** Analyse comparative, sélection du meilleur algorithme.

### 🎲 RandomEngine - Génération Aléatoire Avancée

Moteur de génération aléatoire déterministe avec support de multiples distributions et génération de bruit.

#### Création d'une Instance

```javascript
const { RandomEngine } = require('algorith');

// Avec seed aléatoire
const rng1 = new RandomEngine();

// Avec seed fixe (reproductible)
const rng2 = new RandomEngine(12345);
```

#### Génération de Base

##### `uniform(min = 0, max = 1)`

Génère un nombre à virgule flottante uniforme.

```javascript
const rng = new RandomEngine();

rng.uniform();        // [0, 1]
rng.uniform(10, 20);  // [10, 20]
rng.uniform(-5, 5);   // [-5, 5]
```

##### `int(min, max)`

Génère un entier dans une plage (inclusive).

```javascript
rng.int(1, 6);       // Dé à 6 faces
rng.int(0, 255);     // Byte aléatoire
rng.int(-10, 10);    // Entier signé
```

##### `bool(probability = 0.5)`

Génère un booléen avec probabilité personnalisée.

```javascript
rng.bool();          // 50% true/false
rng.bool(0.8);       // 80% de chance d'être true
rng.bool(0.1);       // 10% de chance d'être true
```

#### Opérations sur les Tableaux

##### `pick(array)`

Sélectionne un élément aléatoire du tableau.

```javascript
const colors = ['red', 'green', 'blue'];
rng.pick(colors);    // 'blue'

const numbers = [1, 2, 3, 4, 5];
rng.pick(numbers);   // 3
```

##### `shuffle(array)`

Mélange un tableau (retourne une nouvelle copie).

```javascript
const cards = ['A', 'K', 'Q', 'J'];
const shuffled = rng.shuffle(cards);
// cards reste inchangé: ['A', 'K', 'Q', 'J']
// shuffled: ['Q', 'A', 'J', 'K']
```

#### Distributions Probabilistes

##### `normal(mean = 0, stdDev = 1)`

Distribution normale (gaussienne).

```javascript
rng.normal();           // μ=0, σ=1
rng.normal(100, 15);    // QI standard
rng.normal(0, 0.1);     // Petit bruit
```

##### `exponential(lambda = 1)`

Distribution exponentielle.

```javascript
rng.exponential(0.5);   // Temps d'attente
rng.exponential(2);     // Décroissance rapide
```

##### `poisson(lambda = 4)`

Distribution de Poisson (événements discrets).

```javascript
rng.poisson(3);         // ~3 événements en moyenne
rng.poisson(0.5);       // Événements rares
```

##### `binomial(n, p)`

Distribution binomiale (n essais, probabilité p).

```javascript
rng.binomial(10, 0.5);  // 10 lancers de pièce
rng.binomial(100, 0.01); // 100 essais, 1% succès
```

##### `geometric(p)`

Distribution géométrique (premier succès).

```javascript
rng.geometric(0.1);     // Nombre d'essais avant succès
```

##### `weighted(items)`

Sélection pondérée d'éléments.

```javascript
const items = [
  { value: 'common', weight: 70 },
  { value: 'rare', weight: 25 },
  { value: 'epic', weight: 5 }
];

rng.weighted(items);    // 'common' (70% de chance)
```

#### Génération de Texte

##### `randomChar()`

Génère un caractère alphabétique minuscule.

```javascript
rng.randomChar();       // 'k'
```

##### `randomString(length = 8)`

Génère une chaîne aléatoire.

```javascript
rng.randomString();     // 'kdjflmqp'
rng.randomString(4);    // 'axbz'
rng.randomString(12);   // 'qwertyuiopas'
```

##### `randomWord()`

Génère un mot prononcable avec syllabes.

```javascript
rng.randomWord();       // 'bakaru'
rng.randomWord();       // 'tifime'
```

##### `uuid()`

Génère un UUID version 4 valide.

```javascript
rng.uuid();             // '550e8400-e29b-41d4-a716-446655440000'
```

#### Fonctions Cryptographiques

##### `RandomEngine.cryptoInt(min, max)` (statique)

Génère un entier cryptographiquement sécurisé.

```javascript
// Ne nécessite pas d'instance
RandomEngine.cryptoInt(1, 100);  // Entier sécurisé
```

#### Génération de Bruit

##### `noise(x, type = 'perlin')`

Interface unifiée pour différents types de bruit.

```javascript
// Bruit Perlin (lisse, cohérent)
rng.noise(0.5, 'perlin');

// Bruit de valeur
rng.noise(0.5, 'value');

// Bruit blanc (aléatoire pur)
rng.noise(0.5, 'white');

// Bruit rose (pondéré par fréquence)
rng.noise(0.5, 'pink');
```

##### Fonctions de bruit spécifiques

```javascript
rng.perlin1D(x);        // Bruit Perlin 1D
rng.valueNoise1D(x);    // Bruit de valeur 1D
rng.whiteNoise();       // Bruit blanc [-1, 1]
rng.pinkNoise(x);       // Bruit rose
```

#### Fonctions Utilitaires

##### `fade(t)` et `lerp(a, b, t)`

```javascript
rng.fade(0.5);          // Fonction de lissage
rng.lerp(0, 10, 0.5);   // Interpolation linéaire → 5
```

## 🎯 Exemples d'Usage

### Détection de Doublons

```javascript
const { compareAll } = require('algorith');

function findSimilar(text, database, threshold = 0.8) {
  return database.filter(item => {
    const results = compareAll(text, item);
    const maxSimilarity = Math.max(...Object.values(results));
    return maxSimilarity >= threshold;
  });
}

const database = ['hello world', 'helo world', 'hi there'];
const similar = findSimilar('hello world', database, 0.7);
// ['hello world', 'helo world']
```

### Recherche Floue

```javascript
const { levenshtein, jaroWinkler } = require('algorith');

function fuzzySearch(query, items, threshold = 0.6) {
  return items
    .map(item => ({
      item,
      score: Math.max(
        levenshtein(query, item),
        jaroWinkler(query, item)
      )
    }))
    .filter(result => result.score >= threshold)
    .sort((a, b) => b.score - a.score);
}

const items = ['apple', 'apricot', 'banana', 'grape'];
const results = fuzzySearch('aple', items);
// [{ item: 'apple', score: 0.8 }]
```

### Génération de Données de Test

```javascript
const { RandomEngine } = require('algorith');

function generateTestUser(rng) {
  return {
    id: rng.uuid(),
    name: rng.randomWord(),
    age: rng.int(18, 65),
    score: rng.normal(100, 15),
    active: rng.bool(0.8),
    tags: Array.from(
      { length: rng.int(1, 5) }, 
      () => rng.randomString(6)
    )
  };
}

const rng = new RandomEngine(42); // Reproductible
const users = Array.from({ length: 10 }, () => generateTestUser(rng));
```

### Simulation de Terrain

```javascript
const { RandomEngine } = require('algorith');

function generateTerrain(width, height, seed = 12345) {
  const rng = new RandomEngine(seed);
  const terrain = [];
  
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      const noise = rng.perlin1D((x + y * width) * 0.01);
      const height = Math.floor((noise + 1) * 127.5); // [0, 255]
      row.push(height);
    }
    terrain.push(row);
  }
  
  return terrain;
}

const map = generateTerrain(100, 100);
```

## 🧪 Tests

Le module inclut 114 tests complets :

```bash
# Exécuter tous les tests
npm test

# Tests en mode surveillance
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Tester un algorithme spécifique
npx mocha test/levenshtein.test.js
```

## 📊 Performance

### Algorithmes de Similarité

| Algorithme   | Complexité  | Cas d'usage optimal       |
| ------------ | ----------- | ------------------------- |
| Levenshtein  | O(mn)       | Correction orthographique |
| Jaro-Winkler | O(mn)       | Noms propres              |
| Hamming      | O(max(m,n)) | Codes/séquences           |
| Jaccard      | O(m+n)      | Ensembles de mots         |
| Cosine       | O(m+n)      | Documents longs           |
| Dice         | O(m+n)      | Mots courts               |
| Trigram      | O(m+n)      | Texte moyen               |

### RandomEngine

- **Déterministe** : Même seed = mêmes résultats
- **Performance** : ~10M opérations/seconde
- **Qualité** : Passe les tests statistiques standards

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit vos changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Ajouter un Nouvel Algorithme

1. Créer le fichier dans `algorithms/`
2. Ajouter l'import dans `index.js`
3. Créer les tests dans `test/`
4. Mettre à jour cette documentation

## 📄 Licence

MIT © MXA.K

## 🔗 Liens

- [Tests](./test/) - Suite de tests complète
- [Algorithmes](./algorithms/) - Code source des algorithmes
- [Issues](https://github.com/MXASoundNDEv/algorith/issues) - Rapporter des bugs
- [NPM](https://www.npmjs.com/package/algorith) - Package NPM

## 📈 Changelog

### v1.0.0
- ✅ 8 algorithmes de similarité textuelle
- ✅ Moteur RandomEngine avec 20+ fonctions
- ✅ 114 tests complets
- ✅ Documentation complète
- ✅ Support TypeScript (types inclus)

---

**Made with ❤️ by MXA.K**
