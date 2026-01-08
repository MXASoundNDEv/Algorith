# Algorith 🧮

[![npm version](https://img.shields.io/npm/v/algorith)](https://www.npmjs.com/package/algorith)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-115%20passing-brightgreen)](./test/)

> Collection complète d'algorithmes de similarité textuelle et moteur de génération aléatoire avancé

## ✨ Fonctionnalités

### 🔍 Algorithmes de Similarité Textuelle
- **Levenshtein** - Distance d'édition avec insertions, suppressions et substitutions
- **Jaro-Winkler** - Optimisé pour les préfixes communs (noms propres)
- **Jaro** - Version de base sans bonus de préfixe
- **Hamming** - Comparaison caractère par caractère (même longueur)
- **Jaccard** - Similarité basée sur les ensembles de caractères
- **Cosine** - Similarité cosinus des vecteurs de fréquence
- **Dice Coefficient** - Basé sur les bigrammes communs
- **Trigram Score** - Score de similarité par trigrammes
- **Soundex** - Encodage phonétique (support multilingue: EN, FR)

### 🎲 Génération Aléatoire (RandomEngine)
#### Fonctions de Base
- `uniform()` - Nombres aléatoires uniformes
- `int()` - Entiers aléatoires dans un intervalle
- `bool()` - Booléens aléatoires avec probabilité configurable
- `pick()` - Sélection aléatoire d'un élément dans un tableau
- `shuffle()` - Mélange Fisher-Yates d'un tableau

#### Distributions Probabilistes
- `normal()` - Distribution normale (Gaussienne)
- `exponential()` - Distribution exponentielle
- `poisson()` - Distribution de Poisson
- `binomial()` - Distribution binomiale
- `geometric()` - Distribution géométrique
- `weighted()` - Sélection pondérée

#### Génération de Texte
- `randomChar()` - Caractères aléatoires (avec jeux de caractères personnalisés)
- `randomString()` - Chaînes aléatoires de longueur donnée
- `randomWord()` - Mots aléatoires basés sur des syllabes
- `uuid()` - Génération d'UUID v4

#### Fonctions de Bruit
- `perlin1D()`, `perlin2D()`, `perlin3D()` - Bruit de Perlin (1D, 2D, 3D)
- `valueNoise()` - Bruit de valeur
- `whiteNoise()` - Bruit blanc
- `pinkNoise()` - Bruit rose (1/f)

#### Crypto Sécurisé
- `cryptoInt()` - Entiers cryptographiquement sécurisés

### 🔤 Autocomplétion Intelligente
- **Recherche rapide** - Structure Trie pour recherches O(m)
- **Support multilingue** - Dictionnaires français et anglais intégrés
- **Extensible** - Ajout facile de dictionnaires personnalisés
- **API simple** - `autocomplete()`, `addWord()`, `addWords()`

### 🔧 Utilitaires
- **fisherYatesShuffle** - Mélange aléatoire déterministe de tableaux
- **compareAll** - Compare deux chaînes avec tous les algorithmes simultanément

## ⚡ Performance des Algorithmes

Benchmarks effectués sur Node.js v24.5.0 (Linux x64)

### Algorithmes de Similarité

| Algorithme       | Petites chaînes<br>(3-5 car.) | Chaînes moyennes<br>(20-30 car.) | Grandes chaînes<br>(100-200 car.) |
| ---------------- | ----------------------------- | -------------------------------- | --------------------------------- |
| **Hamming**      | **720,599 ops/s**             | **535,742 ops/s**                | **1,230,436 ops/s**               |
| **Jaro-Winkler** | **334,056 ops/s**             | **492,129 ops/s**                | **126,682 ops/s**                 |
| **Jaro**         | 159,534 ops/s                 | 300,080 ops/s                    | 119,637 ops/s                     |
| **Trigram**      | 171,536 ops/s                 | 337,487 ops/s                    | 170,423 ops/s                     |
| **Dice**         | 157,987 ops/s                 | 163,419 ops/s                    | 36,190 ops/s                      |
| **Jaccard**      | 119,827 ops/s                 | 121,730 ops/s                    | 73,290 ops/s                      |
| **Cosine**       | 95,908 ops/s                  | 120,913 ops/s                    | 59,148 ops/s                      |
| **Levenshtein**  | 33,657 ops/s                  | 42,996 ops/s                     | 12,548 ops/s                      |

**compareAll()** : 13,316 ops/s (compare avec tous les algorithmes simultanément)

### RandomEngine

| Fonction           | Performance      |
| ------------------ | ---------------- |
| `uniform()`        | 12,330,231 ops/s |
| `perlin1D()`       | 22,104,201 ops/s |
| `bool()`           | 16,819,989 ops/s |
| `whiteNoise()`     | 16,051,877 ops/s |
| `int(1, 100)`      | 14,266,552 ops/s |
| `exponential(1)`   | 6,782,895 ops/s  |
| `normal(0, 1)`     | 4,002,269 ops/s  |
| `randomWord(5)`    | 559,416 ops/s    |
| `randomString(10)` | 287,464 ops/s    |

> **Note** : Les performances peuvent varier selon votre environnement d'exécution.

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
  RandomEngine,
  AutocompleteEngine,
  fisherYatesShuffle
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

// Autocomplétion intelligente
const autocomplete = new AutocompleteEngine({ language: 'fr' });
autocomplete.addWords(['javascript', 'java', 'python']);
console.log(autocomplete.autocomplete('java')); // ['java', 'javascript']

// Mélange Fisher-Yates
const numbers = [1, 2, 3, 4, 5];
const shuffled = fisherYatesShuffle(numbers);
console.log(shuffled); // [3, 1, 5, 2, 4]
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

#### `soundex(string, language = 'en', customMap = null)`

Génère le code Soundex d'une chaîne (algorithme phonétique) avec support multilingue.

**Paramètres :**
- `string` : La chaîne à encoder
- `language` : Langue pour les règles spécifiques ('en' ou 'fr', défaut: 'en')
- `customMap` : Carte de correspondance personnalisée (optionnel)

```javascript
const { soundex } = require('algorith');

// Usage basique (anglais par défaut)
soundex('Robert');   // 'R163'
soundex('Rupert');   // 'R163' (même son)
soundex('Smith');    // 'S530'
soundex('Smyth');    // 'S530' (même son)

// Support français avec normalisation des accents
soundex('François', 'fr');  // 'F652'
soundex('Pierre', 'fr');    // 'P600' 
soundex('Céline', 'fr');    // 'C450'

// Les accents sont automatiquement normalisés en français
soundex('François', 'fr') === soundex('Francois', 'fr'); // true

// Carte personnalisée
const customMap = {
    a: '', e: '', i: '', o: '', u: '',
    b: 9, p: 9, f: 9, v: 9,  // Groupement personnalisé
    c: 8, k: 8, g: 8
};
soundex('Boat', 'en', customMap); // 'B900'
```

**Fonctionnalités :**
- **Support multilingue** : Règles spécifiques pour l'anglais et le français
- **Normalisation française** : Gestion automatique des accents (é→e, ç→s, œ→e)
- **Cartes personnalisées** : Définition de vos propres règles de correspondance
- **Compatibilité** : Fonctionne avec l'algorithme Soundex standard

**Cas d'usage :** Recherche phonétique, matching de noms, détection de doublons phonétiques, indexation par similarité sonore.

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

### 🔤 AutocompleteEngine - Autocomplétion Intelligente

Moteur d'autocomplétion basé sur une structure de données Trie, optimisé pour des suggestions rapides et pertinentes.

#### Création d'une Instance

```javascript
const { AutocompleteEngine } = require('algorith');

// Avec dictionnaire par défaut (français)
const autocomplete = new AutocompleteEngine({ language: 'fr' });

// Avec dictionnaire personnalisé
const customAutocomplete = new AutocompleteEngine({
  dictionary: ['javascript', 'java', 'python', 'php'],
  maxSuggestions: 10
});

// Avec dictionnaire anglais
const englishAutocomplete = new AutocompleteEngine({ language: 'en' });
```

#### Ajout de Mots

```javascript
// Ajouter un mot unique
autocomplete.addWord('algorithme');

// Ajouter plusieurs mots
autocomplete.addWords(['programmation', 'développement', 'informatique']);

console.log(`Dictionnaire contient ${autocomplete.getWordCount()} mots`);
```

#### Autocomplétion

```javascript
// Recherche basique
const suggestions = autocomplete.autocomplete('algo');
console.log(suggestions); // ['algorithme', 'algorithmique', ...]

// Utilisation de l'alias search()
const results = autocomplete.search('prog');
console.log(results); // ['programmation', 'programme', ...]
```

#### Options de Configuration

- `language` : `'fr'` | `'en'` - Langue du dictionnaire par défaut
- `dictionary` : `string[]` | `string` - Tableau de mots ou chemin vers fichier
- `maxSuggestions` : `number` - Nombre maximum de suggestions (défaut: 20)

**Cas d'usage :** Barres de recherche, IDE, assistants de saisie, interfaces utilisateur.

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

### 🔀 Mélange Fisher-Yates

Mélange un tableau en utilisant l'algorithme de Fisher-Yates.

```javascript
const { fisherYatesShuffle } = require('algorith');

const items = ['a', 'b', 'c', 'd'];
const shuffled = fisherYatesShuffle(items);

console.log(items);   // ['a', 'b', 'c', 'd'] (non modifié)
console.log(shuffled); // Mélange aléatoire
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

Le module inclut 115 tests complets :

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
- ✅ Moteur AutocompleteEngine avec dictionnaires FR/EN
- ✅ Moteur RandomEngine avec 20+ fonctions
- ✅ 134 tests complets
- ✅ Documentation complète avec exemples
- ✅ Support TypeScript (types inclus)

---

**Made with ❤️ by MXA.K**
