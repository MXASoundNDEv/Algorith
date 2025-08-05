# Exemples Pratiques - Algorith

Collection d'exemples concrets d'utilisation du module `algorith` dans des cas réels.

## 🔍 Recherche et Matching

### 1. Moteur de Recherche Floue

```javascript
const { compareAll, levenshtein } = require('algorith');

class FuzzySearchEngine {
  constructor(items) {
    this.items = items;
  }

  search(query, options = {}) {
    const {
      threshold = 0.6,
      maxResults = 10,
      algorithm = 'auto'
    } = options;

    const results = this.items.map(item => {
      let score;
      
      if (algorithm === 'auto') {
        const allScores = compareAll(query.toLowerCase(), item.toLowerCase());
        score = Math.max(...Object.values(allScores));
      } else {
        score = this[algorithm](query.toLowerCase(), item.toLowerCase());
      }

      return { item, score, query };
    })
    .filter(result => result.score >= threshold)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

    return results;
  }
}

// Usage
const products = [
  'iPhone 15 Pro Max',
  'Samsung Galaxy S24',
  'Google Pixel 8',
  'iPad Pro',
  'MacBook Air'
];

const searchEngine = new FuzzySearchEngine(products);
const results = searchEngine.search('iphone', { threshold: 0.3 });
console.log(results);
// [{ item: 'iPhone 15 Pro Max', score: 0.73, query: 'iphone' }]
```

### 2. Détecteur de Doublons Intelligent

```javascript
const { jaroWinkler, levenshtein } = require('algorith');

class DuplicateDetector {
  constructor(threshold = 0.85) {
    this.threshold = threshold;
    this.records = new Map();
  }

  addRecord(id, text) {
    // Vérifier les doublons avant d'ajouter
    const duplicates = this.findDuplicates(text);
    
    if (duplicates.length > 0) {
      console.warn(`Duplicate detected for "${text}":`, duplicates);
      return false;
    }

    this.records.set(id, text.toLowerCase());
    return true;
  }

  findDuplicates(text) {
    const normalized = text.toLowerCase();
    const duplicates = [];

    for (const [id, record] of this.records) {
      const similarity = Math.max(
        jaroWinkler(normalized, record),
        levenshtein(normalized, record)
      );

      if (similarity >= this.threshold) {
        duplicates.push({ id, text: record, similarity });
      }
    }

    return duplicates;
  }
}

// Usage
const detector = new DuplicateDetector(0.8);

detector.addRecord(1, "John Smith");
detector.addRecord(2, "Jane Doe");
detector.addRecord(3, "Jon Smith");  // Détecté comme doublon
```

### 3. Correcteur Orthographique

```javascript
const { levenshtein, jaroWinkler } = require('algorith');

class SpellChecker {
  constructor(dictionary) {
    this.dictionary = dictionary.map(word => word.toLowerCase());
  }

  suggest(word, maxSuggestions = 5) {
    const normalized = word.toLowerCase();
    
    const suggestions = this.dictionary
      .map(dictWord => ({
        word: dictWord,
        levenshtein: levenshtein(normalized, dictWord),
        jaroWinkler: jaroWinkler(normalized, dictWord),
        combined: (levenshtein(normalized, dictWord) + jaroWinkler(normalized, dictWord)) / 2
      }))
      .filter(suggestion => suggestion.combined > 0.5)
      .sort((a, b) => b.combined - a.combined)
      .slice(0, maxSuggestions);

    return suggestions;
  }

  checkText(text) {
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const corrections = {};

    words.forEach(word => {
      if (!this.dictionary.includes(word)) {
        const suggestions = this.suggest(word, 3);
        if (suggestions.length > 0) {
          corrections[word] = suggestions;
        }
      }
    });

    return corrections;
  }
}

// Usage
const dictionary = ['hello', 'world', 'javascript', 'programming', 'algorithm'];
const checker = new SpellChecker(dictionary);

const corrections = checker.checkText("helo wrold programing");
console.log(corrections);
/*
{
  helo: [{ word: 'hello', combined: 0.9 }],
  wrold: [{ word: 'world', combined: 0.8 }],
  programing: [{ word: 'programming', combined: 0.95 }]
}
*/
```

## 🎲 Génération de Données

### 4. Générateur de Données de Test

```javascript
const { RandomEngine } = require('algorith');

class TestDataGenerator {
  constructor(seed = null) {
    this.rng = new RandomEngine(seed);
  }

  generateUser() {
    const genders = ['M', 'F', 'O'];
    const roles = [
      { value: 'user', weight: 70 },
      { value: 'admin', weight: 20 },
      { value: 'moderator', weight: 10 }
    ];

    return {
      id: this.rng.uuid(),
      username: this.rng.randomWord() + this.rng.int(100, 999),
      email: `${this.rng.randomWord()}@${this.rng.pick(['gmail.com', 'yahoo.com', 'outlook.com'])}`,
      age: Math.max(18, Math.round(this.rng.normal(35, 12))),
      gender: this.rng.pick(genders),
      role: this.rng.weighted(roles),
      score: Math.max(0, Math.round(this.rng.normal(100, 15))),
      active: this.rng.bool(0.8),
      lastLogin: new Date(Date.now() - this.rng.exponential(0.1) * 86400000),
      friends: this.rng.poisson(5)
    };
  }

  generateBatch(count) {
    return Array.from({ length: count }, () => this.generateUser());
  }

  generateSalesData(days = 30) {
    const baseValue = 1000;
    const data = [];

    for (let i = 0; i < days; i++) {
      const trend = 1 + (i / days) * 0.1; // Croissance de 10% sur la période
      const seasonal = 1 + 0.3 * Math.sin((i / 7) * 2 * Math.PI); // Cycle hebdomadaire
      const noise = this.rng.normal(1, 0.1);
      
      const value = Math.max(0, Math.round(baseValue * trend * seasonal * noise));
      
      data.push({
        date: new Date(Date.now() - (days - i) * 86400000),
        sales: value,
        customers: this.rng.poisson(value / 50),
        conversion: this.rng.normal(0.03, 0.01)
      });
    }

    return data;
  }
}

// Usage
const generator = new TestDataGenerator(42); // Reproductible

// Générer des utilisateurs
const users = generator.generateBatch(10);
console.log(users[0]);

// Générer des données de vente
const salesData = generator.generateSalesData(30);
console.log(salesData.slice(0, 3));
```

### 5. Générateur de Terrain Procédural

```javascript
const { RandomEngine } = require('algorith');

class TerrainGenerator {
  constructor(seed = 12345) {
    this.rng = new RandomEngine(seed);
  }

  generateHeightMap(width, height, scale = 0.01) {
    const heightMap = [];
    
    for (let y = 0; y < height; y++) {
      const row = [];
      for (let x = 0; x < width; x++) {
        // Combine multiple octaves of noise
        let elevation = 0;
        let amplitude = 1;
        let frequency = scale;
        
        for (let octave = 0; octave < 6; octave++) {
          elevation += this.rng.perlin1D((x + y * width) * frequency) * amplitude;
          amplitude *= 0.5;
          frequency *= 2;
        }
        
        // Normalize to [0, 255]
        const normalized = Math.floor((elevation + 1) * 127.5);
        row.push(Math.max(0, Math.min(255, normalized)));
      }
      heightMap.push(row);
    }
    
    return heightMap;
  }

  generateBiomes(heightMap) {
    const biomes = [];
    
    for (let y = 0; y < heightMap.length; y++) {
      const row = [];
      for (let x = 0; x < heightMap[y].length; x++) {
        const elevation = heightMap[y][x];
        const moisture = this.rng.perlin1D((x * 0.005) + (y * 0.005) + 1000);
        
        let biome;
        if (elevation < 60) biome = 'water';
        else if (elevation < 80) biome = 'beach';
        else if (elevation < 120) {
          biome = moisture > 0 ? 'forest' : 'plains';
        } else if (elevation < 180) {
          biome = moisture > 0.3 ? 'forest' : 'hills';
        } else {
          biome = 'mountains';
        }
        
        row.push(biome);
      }
      biomes.push(row);
    }
    
    return biomes;
  }

  generateWorld(width, height) {
    const heightMap = this.generateHeightMap(width, height);
    const biomes = this.generateBiomes(heightMap);
    
    return {
      width,
      height,
      heightMap,
      biomes,
      seed: this.rng.seed
    };
  }
}

// Usage
const terrain = new TerrainGenerator(42);
const world = terrain.generateWorld(100, 100);

console.log(`Generated world: ${world.width}x${world.height}`);
console.log(`Sample elevation at (50,50): ${world.heightMap[50][50]}`);
console.log(`Sample biome at (50,50): ${world.biomes[50][50]}`);
```

## 📊 Analyse de Données

### 6. Analyseur de Similarité de Texte

```javascript
const { compareAll, soundex } = require('algorith');

class TextSimilarityAnalyzer {
  analyzeDocuments(documents) {
    const results = [];
    
    for (let i = 0; i < documents.length; i++) {
      for (let j = i + 1; j < documents.length; j++) {
        const doc1 = documents[i];
        const doc2 = documents[j];
        
        // Analyse au niveau des mots
        const words1 = this.extractWords(doc1.content);
        const words2 = this.extractWords(doc2.content);
        
        const wordSimilarity = compareAll(words1.join(' '), words2.join(' '));
        
        // Analyse phonétique
        const soundex1 = words1.map(w => soundex(w)).join('');
        const soundex2 = words2.map(w => soundex(w)).join('');
        const phoneticSimilarity = compareAll(soundex1, soundex2);
        
        results.push({
          doc1: doc1.id,
          doc2: doc2.id,
          textSimilarity: wordSimilarity,
          phoneticSimilarity: phoneticSimilarity,
          overallScore: this.calculateOverallScore(wordSimilarity, phoneticSimilarity)
        });
      }
    }
    
    return results.sort((a, b) => b.overallScore - a.overallScore);
  }

  extractWords(text) {
    return text.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2);
  }

  calculateOverallScore(textSim, phoneticSim) {
    const textAvg = Object.values(textSim).reduce((a, b) => a + b) / Object.keys(textSim).length;
    const phoneticAvg = Object.values(phoneticSim).reduce((a, b) => a + b) / Object.keys(phoneticSim).length;
    
    return (textAvg * 0.7) + (phoneticAvg * 0.3); // Pondération
  }

  findSimilarDocuments(targetDoc, corpus, threshold = 0.5) {
    const allDocs = [targetDoc, ...corpus];
    const results = this.analyzeDocuments(allDocs);
    
    return results
      .filter(result => 
        (result.doc1 === targetDoc.id || result.doc2 === targetDoc.id) &&
        result.overallScore >= threshold
      )
      .map(result => ({
        similarDoc: result.doc1 === targetDoc.id ? result.doc2 : result.doc1,
        similarity: result.overallScore,
        details: result
      }));
  }
}

// Usage
const documents = [
  { id: 'doc1', content: 'The quick brown fox jumps over the lazy dog' },
  { id: 'doc2', content: 'A fast brown fox leaps over a sleepy dog' },
  { id: 'doc3', content: 'Python is a programming language' },
  { id: 'doc4', content: 'JavaScript is also a programming language' }
];

const analyzer = new TextSimilarityAnalyzer();
const similarities = analyzer.analyzeDocuments(documents);

console.log('Top similarities:', similarities.slice(0, 3));
```

### 7. Générateur de Tests A/B

```javascript
const { RandomEngine } = require('algorith');

class ABTestGenerator {
  constructor(seed = null) {
    this.rng = new RandomEngine(seed);
  }

  generateTestScenario(name, variants, userCount = 1000) {
    const users = this.generateUsers(userCount);
    const assignments = this.assignUsersToVariants(users, variants);
    const results = this.simulateResults(assignments, variants);
    
    return {
      testName: name,
      variants,
      totalUsers: userCount,
      assignments,
      results,
      analysis: this.analyzeResults(results)
    };
  }

  generateUsers(count) {
    return Array.from({ length: count }, (_, i) => ({
      id: `user_${i}`,
      segment: this.rng.weighted([
        { value: 'new', weight: 30 },
        { value: 'returning', weight: 50 },
        { value: 'premium', weight: 20 }
      ]),
      device: this.rng.pick(['mobile', 'desktop', 'tablet']),
      joinDate: new Date(Date.now() - this.rng.exponential(0.01) * 86400000)
    }));
  }

  assignUsersToVariants(users, variants) {
    const assignments = {};
    
    variants.forEach(variant => {
      assignments[variant.name] = [];
    });

    users.forEach(user => {
      const variant = this.rng.weighted(
        variants.map(v => ({ value: v.name, weight: v.traffic }))
      );
      assignments[variant].push(user);
    });

    return assignments;
  }

  simulateResults(assignments, variants) {
    const results = {};

    variants.forEach(variant => {
      const users = assignments[variant.name];
      const baseConversion = variant.expectedConversion || 0.05;
      
      const conversions = users.filter(user => {
        // Facteurs influençant la conversion
        let conversionRate = baseConversion;
        
        if (user.segment === 'premium') conversionRate *= 1.5;
        else if (user.segment === 'new') conversionRate *= 0.8;
        
        if (user.device === 'mobile') conversionRate *= 0.9;
        else if (user.device === 'desktop') conversionRate *= 1.1;
        
        return this.rng.bool(conversionRate);
      });

      results[variant.name] = {
        users: users.length,
        conversions: conversions.length,
        conversionRate: conversions.length / users.length,
        revenue: conversions.length * this.rng.normal(25, 5) // Revenue per conversion
      };
    });

    return results;
  }

  analyzeResults(results) {
    const variantNames = Object.keys(results);
    const analysis = {
      winner: null,
      confidence: 0,
      insights: []
    };

    // Trouver le variant avec le meilleur taux de conversion
    let bestVariant = variantNames[0];
    let bestRate = results[bestVariant].conversionRate;

    variantNames.forEach(variant => {
      if (results[variant].conversionRate > bestRate) {
        bestVariant = variant;
        bestRate = results[variant].conversionRate;
      }
    });

    analysis.winner = bestVariant;
    
    // Calculer la confiance (simplifiée)
    const controlRate = results['control'] ? results['control'].conversionRate : bestRate;
    const improvement = (bestRate - controlRate) / controlRate;
    analysis.confidence = Math.min(95, Math.abs(improvement) * 100);

    // Générer des insights
    variantNames.forEach(variant => {
      const data = results[variant];
      if (data.conversionRate > 0.08) {
        analysis.insights.push(`${variant} shows strong performance (${(data.conversionRate * 100).toFixed(1)}%)`);
      }
      if (data.revenue > 500) {
        analysis.insights.push(`${variant} generates high revenue ($${data.revenue.toFixed(0)})`);
      }
    });

    return analysis;
  }
}

// Usage
const testGenerator = new ABTestGenerator(123);

const test = testGenerator.generateTestScenario('Button Color Test', [
  { name: 'control', traffic: 50, expectedConversion: 0.05 },
  { name: 'red_button', traffic: 25, expectedConversion: 0.06 },
  { name: 'green_button', traffic: 25, expectedConversion: 0.055 }
], 2000);

console.log('Test Results:');
console.log(`Winner: ${test.analysis.winner}`);
console.log(`Confidence: ${test.analysis.confidence.toFixed(1)}%`);
console.log('Insights:', test.analysis.insights);
```

## 🎮 Applications Créatives

### 8. Générateur de Noms et Histoire

```javascript
const { RandomEngine } = require('algorith');

class NameStoryGenerator {
  constructor(seed = null) {
    this.rng = new RandomEngine(seed);
    this.initializeData();
  }

  initializeData() {
    this.prefixes = ['Ae', 'El', 'Ga', 'Th', 'Za', 'Mor', 'Sil', 'Val'];
    this.middles = ['lan', 'dar', 'wen', 'dor', 'rin', 'gal', 'thi'];
    this.suffixes = ['ion', 'ael', 'oth', 'ien', 'ara', 'eth', 'uin'];
    
    this.titles = ['the Brave', 'the Wise', 'Dragonslayer', 'the Ancient', 'Stormcaller'];
    this.professions = ['Wizard', 'Knight', 'Rogue', 'Archer', 'Cleric'];
    this.locations = ['Rivendell', 'Ironforge', 'Shadowmere', 'Goldleaf', 'Stormwind'];
  }

  generateFantasyName(includeTitle = false) {
    const prefix = this.rng.pick(this.prefixes);
    const middle = this.rng.bool(0.7) ? this.rng.pick(this.middles) : '';
    const suffix = this.rng.pick(this.suffixes);
    
    let name = prefix + middle + suffix;
    
    if (includeTitle && this.rng.bool(0.3)) {
      name += ' ' + this.rng.pick(this.titles);
    }
    
    return name;
  }

  generateCharacter() {
    return {
      name: this.generateFantasyName(true),
      profession: this.rng.pick(this.professions),
      level: this.rng.int(1, 100),
      stats: {
        strength: this.rng.int(8, 18),
        intelligence: this.rng.int(8, 18),
        agility: this.rng.int(8, 18),
        health: this.rng.int(50, 200)
      },
      origin: this.rng.pick(this.locations),
      background: this.generateBackground()
    };
  }

  generateBackground() {
    const templates = [
      "Born in {origin}, {name} discovered their calling as a {profession} after {event}.",
      "Once a simple {profession} from {origin}, {name} became legendary for {achievement}.",
      "{name} the {profession} seeks {goal} to restore honor to {origin}."
    ];

    const events = [
      'a dragon attacked their village',
      'finding an ancient artifact',
      'a prophetic dream',
      'meeting a mysterious stranger'
    ];

    const achievements = [
      'defeating an ancient evil',
      'saving the realm from darkness',
      'uniting the warring tribes',
      'discovering lost magic'
    ];

    const goals = [
      'the lost crown',
      'ancient wisdom',
      'a powerful artifact',
      'the source of corruption'
    ];

    const template = this.rng.pick(templates);
    
    return template
      .replace('{event}', this.rng.pick(events))
      .replace('{achievement}', this.rng.pick(achievements))
      .replace('{goal}', this.rng.pick(goals));
  }

  generateParty(size = 4) {
    const party = [];
    const usedProfessions = new Set();

    for (let i = 0; i < size; i++) {
      let character;
      let attempts = 0;
      
      do {
        character = this.generateCharacter();
        attempts++;
      } while (usedProfessions.has(character.profession) && attempts < 10);
      
      usedProfessions.add(character.profession);
      party.push(character);
    }

    return {
      name: `The ${this.rng.pick(['Fellowship', 'Company', 'Order', 'Guild'])} of ${this.generateFantasyName()}`,
      members: party,
      formed: new Date(Date.now() - this.rng.int(1, 365) * 86400000)
    };
  }
}

// Usage
const generator = new NameStoryGenerator(42);

// Générer un personnage
const character = generator.generateCharacter();
console.log('Character:', character);

// Générer un groupe
const party = generator.generateParty(5);
console.log('Party:', party.name);
party.members.forEach(member => {
  console.log(`- ${member.name} (${member.profession}, Level ${member.level})`);
});
```

## 🔍 Autocomplétion et Recherche Prédictive

### 1. Moteur d'Autocomplétion Simple

```javascript
const { AutocompleteEngine } = require('algorith');

// Création avec dictionnaire personnalisé
const languages = [
  'javascript', 'java', 'python', 'php', 'ruby', 'go', 'rust',
  'typescript', 'swift', 'kotlin', 'dart', 'scala', 'clojure'
];

const autocomplete = new AutocompleteEngine({
  dictionary: languages,
  maxSuggestions: 5
});

// Recherche d'autocomplétion
function search(query) {
  const suggestions = autocomplete.autocomplete(query);
  return suggestions;
}

console.log(search('java')); // ['java', 'javascript']
console.log(search('py'));   // ['python']
console.log(search('type')); // ['typescript']
```

### 2. Système d'Autocomplétion avec Apprentissage

```javascript
const { AutocompleteEngine } = require('algorith');

class LearningAutocomplete {
  constructor() {
    this.autocomplete = new AutocompleteEngine({
      language: 'fr',
      maxSuggestions: 10
    });
    this.searchHistory = new Map();
  }

  search(query) {
    const suggestions = this.autocomplete.autocomplete(query);
    
    // Enregistrer la recherche
    this.searchHistory.set(query, (this.searchHistory.get(query) || 0) + 1);
    
    return suggestions;
  }

  addUserTerm(term) {
    // Ajouter des termes spécifiques utilisateur
    this.autocomplete.addWord(term);
    console.log(`Terme "${term}" ajouté au dictionnaire`);
  }

  getPopularSearches(limit = 5) {
    return Array.from(this.searchHistory.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(entry => ({ query: entry[0], count: entry[1] }));
  }
}

// Usage
const smartAutocomplete = new LearningAutocomplete();

// Ajout de termes métier
smartAutocomplete.addUserTerm('algorithmique');
smartAutocomplete.addUserTerm('heuristique');

// Recherches
console.log(smartAutocomplete.search('algo'));
console.log(smartAutocomplete.search('heur'));

// Statistiques
console.log('Recherches populaires:', smartAutocomplete.getPopularSearches());
```

### 3. Barre de Recherche avec Autocomplétion

```javascript
const { AutocompleteEngine } = require('algorith');

class SearchBar {
  constructor(items) {
    // Extraire tous les mots des items pour l'autocomplétion
    const words = items.flatMap(item => 
      item.toLowerCase().split(/\s+/)
    );
    
    this.autocomplete = new AutocompleteEngine({
      dictionary: [...new Set(words)], // Supprimer les doublons
      maxSuggestions: 8
    });
    
    this.items = items;
  }

  getSuggestions(query) {
    if (!query || query.length < 2) return [];
    
    return this.autocomplete.autocomplete(query.toLowerCase());
  }

  search(query) {
    const normalizedQuery = query.toLowerCase();
    
    return this.items.filter(item => 
      item.toLowerCase().includes(normalizedQuery)
    );
  }

  hybridSearch(query) {
    const suggestions = this.getSuggestions(query);
    const results = this.search(query);
    
    return {
      suggestions,
      results,
      hasResults: results.length > 0,
      hasSuggestions: suggestions.length > 0
    };
  }
}

// Usage avec une base de produits
const products = [
  'iPhone 15 Pro Max', 'Samsung Galaxy S24', 'Google Pixel 8',
  'MacBook Air M3', 'Dell XPS 13', 'Surface Laptop 5',
  'iPad Pro 12.9', 'Microsoft Surface Pro', 'Lenovo ThinkPad'
];

const searchBar = new SearchBar(products);

console.log('Suggestions pour "iph":', searchBar.getSuggestions('iph'));
console.log('Recherche hybride pour "mac":', searchBar.hybridSearch('mac'));
```

### 4. Autocomplétion Multi-langues

```javascript
const { AutocompleteEngine } = require('algorith');

class MultiLanguageAutocomplete {
  constructor() {
    this.engines = {
      fr: new AutocompleteEngine({ language: 'fr', maxSuggestions: 5 }),
      en: new AutocompleteEngine({ language: 'en', maxSuggestions: 5 })
    };
    this.currentLanguage = 'fr';
  }

  setLanguage(lang) {
    if (this.engines[lang]) {
      this.currentLanguage = lang;
      return true;
    }
    return false;
  }

  addCustomTerms(terms, language = null) {
    const lang = language || this.currentLanguage;
    if (this.engines[lang]) {
      this.engines[lang].addWords(terms);
    }
  }

  search(query, language = null) {
    const lang = language || this.currentLanguage;
    if (!this.engines[lang]) return [];
    
    return this.engines[lang].autocomplete(query);
  }

  searchAllLanguages(query) {
    const results = {};
    
    Object.keys(this.engines).forEach(lang => {
      const suggestions = this.engines[lang].autocomplete(query);
      if (suggestions.length > 0) {
        results[lang] = suggestions;
      }
    });
    
    return results;
  }
}

// Usage
const multiAutocomplete = new MultiLanguageAutocomplete();

// Ajouter des termes techniques en français
multiAutocomplete.addCustomTerms([
  'algorithme', 'programmation', 'développement'
], 'fr');

// Ajouter des termes techniques en anglais
multiAutocomplete.addCustomTerms([
  'algorithm', 'programming', 'development'
], 'en');

console.log('FR - "algo":', multiAutocomplete.search('algo', 'fr'));
console.log('EN - "algo":', multiAutocomplete.search('algo', 'en'));
console.log('Tous - "prog":', multiAutocomplete.searchAllLanguages('prog'));
```

### 5. Autocomplétion pour IDE/Éditeur de Code

```javascript
const { AutocompleteEngine } = require('algorith');

class CodeAutocomplete {
  constructor() {
    // Mots-clés JavaScript
    const jsKeywords = [
      'function', 'const', 'let', 'var', 'class', 'extends',
      'import', 'export', 'default', 'async', 'await',
      'return', 'if', 'else', 'for', 'while', 'try', 'catch'
    ];

    // APIs Web communes
    const webApis = [
      'document', 'window', 'console', 'fetch', 'setTimeout',
      'getElementById', 'querySelector', 'addEventListener',
      'createElement', 'appendChild', 'innerHTML', 'textContent'
    ];

    // Méthodes Array
    const arrayMethods = [
      'map', 'filter', 'reduce', 'forEach', 'find', 'findIndex',
      'includes', 'indexOf', 'push', 'pop', 'slice', 'splice'
    ];

    this.autocomplete = new AutocompleteEngine({
      dictionary: [...jsKeywords, ...webApis, ...arrayMethods],
      maxSuggestions: 10
    });

    this.userDefinedSymbols = new Set();
  }

  addSymbol(symbol) {
    if (!this.userDefinedSymbols.has(symbol)) {
      this.autocomplete.addWord(symbol);
      this.userDefinedSymbols.add(symbol);
    }
  }

  addSymbols(symbols) {
    symbols.forEach(symbol => this.addSymbol(symbol));
  }

  getSuggestions(partialCode) {
    // Extraire le dernier mot/token
    const matches = partialCode.match(/\w+$/);
    if (!matches) return [];

    const currentToken = matches[0];
    return this.autocomplete.autocomplete(currentToken);
  }

  // Analyser le code pour extraire les symboles définis
  analyzeCode(code) {
    const patterns = [
      /function\s+(\w+)/g,           // Fonctions
      /const\s+(\w+)/g,             // Constantes
      /let\s+(\w+)/g,               // Variables let
      /var\s+(\w+)/g,               // Variables var
      /class\s+(\w+)/g,             // Classes
      /(\w+):\s*function/g,         // Méthodes d'objet
    ];

    const symbols = new Set();
    
    patterns.forEach(pattern => {
      let match;
      while ((match = pattern.exec(code)) !== null) {
        symbols.add(match[1]);
      }
    });

    this.addSymbols(Array.from(symbols));
    return Array.from(symbols);
  }
}

// Usage
const codeAutocomplete = new CodeAutocomplete();

// Analyser du code pour extraire les symboles
const sampleCode = `
function calculateTotal(items) {
  const taxRate = 0.1;
  let subtotal = 0;
  
  for (const item of items) {
    subtotal += item.price;
  }
  
  return subtotal * (1 + taxRate);
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
}
`;

console.log('Symboles extraits:', codeAutocomplete.analyzeCode(sampleCode));
console.log('Suggestions pour "calc":', codeAutocomplete.getSuggestions('calc'));
console.log('Suggestions pour "console.":', codeAutocomplete.getSuggestions('console.'));
```

Ces exemples montrent la polyvalence du module `algorith` dans différents domaines : recherche, analyse de données, génération procédurale, tests, autocomplétion intelligente, et applications créatives. Chaque exemple peut être adapté et étendu selon vos besoins spécifiques.
