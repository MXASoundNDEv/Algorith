const assert = require('assert');
const AutocompleteEngine = require('../algorithms/autocomplete');

describe('AutocompleteEngine', () => {

  describe('Création et initialisation', () => {
    it('devrait créer une instance avec des options par défaut', () => {
      const autocomplete = new AutocompleteEngine();
      assert.strictEqual(autocomplete.language, 'fr');
      assert.strictEqual(autocomplete.maxSuggestions, 20);
      assert.strictEqual(typeof autocomplete.getWordCount(), 'number');
    });

    it('devrait accepter des options personnalisées', () => {
      const autocomplete = new AutocompleteEngine({
        language: 'en',
        maxSuggestions: 10
      });
      assert.strictEqual(autocomplete.language, 'en');
      assert.strictEqual(autocomplete.maxSuggestions, 10);
    });

    it('devrait initialiser avec un dictionnaire personnalisé', () => {
      const words = ['javascript', 'java', 'python'];
      const autocomplete = new AutocompleteEngine({
        dictionary: words
      });
      assert.strictEqual(autocomplete.getWordCount(), words.length);
    });
  });

  describe('Gestion des mots', () => {
    let autocomplete;

    beforeEach(() => {
      autocomplete = new AutocompleteEngine({ dictionary: [] });
    });

    it('devrait ajouter un mot correctement', () => {
      autocomplete.addWord('test');
      assert.strictEqual(autocomplete.getWordCount(), 1);
    });

    it('devrait normaliser les mots en minuscules', () => {
      autocomplete.addWord('TEST');
      const suggestions = autocomplete.autocomplete('test');
      assert(suggestions.includes('test'));
    });

    it('ne devrait pas ajouter de doublons', () => {
      autocomplete.addWord('test');
      autocomplete.addWord('test');
      assert.strictEqual(autocomplete.getWordCount(), 1);
    });

    it('devrait ignorer les mots invalides', () => {
      const initialCount = autocomplete.getWordCount();
      autocomplete.addWord('');
      autocomplete.addWord(null);
      autocomplete.addWord(undefined);
      autocomplete.addWord(123);
      assert.strictEqual(autocomplete.getWordCount(), initialCount);
    });

    it('devrait ajouter plusieurs mots avec addWords', () => {
      const words = ['test1', 'test2', 'test3'];
      autocomplete.addWords(words);
      assert.strictEqual(autocomplete.getWordCount(), 3);
    });
  });

  describe('Autocomplétion', () => {
    let autocomplete;

    beforeEach(() => {
      const words = [
        'javascript', 'java', 'javac', 'python', 'php', 'perl',
        'react', 'redux', 'node', 'nodejs', 'npm'
      ];
      autocomplete = new AutocompleteEngine({
        dictionary: words,
        maxSuggestions: 5
      });
    });

    it('devrait retourner des suggestions pour un préfixe valide', () => {
      const suggestions = autocomplete.autocomplete('java');
      assert(Array.isArray(suggestions));
      assert(suggestions.length > 0);
      assert(suggestions.every(word => word.startsWith('java')));
    });

    it('devrait retourner un tableau vide pour un préfixe inexistant', () => {
      const suggestions = autocomplete.autocomplete('xyz');
      assert(Array.isArray(suggestions));
      assert.strictEqual(suggestions.length, 0);
    });

    it('devrait respecter la limite maxSuggestions', () => {
      const suggestions = autocomplete.autocomplete('j');
      assert(suggestions.length <= 5);
    });

    it('devrait être insensible à la casse', () => {
      const suggestions1 = autocomplete.autocomplete('JAVA');
      const suggestions2 = autocomplete.autocomplete('java');
      assert.deepStrictEqual(suggestions1, suggestions2);
    });

    it('devrait gérer les préfixes invalides', () => {
      assert.deepStrictEqual(autocomplete.autocomplete(''), []);
      assert.deepStrictEqual(autocomplete.autocomplete(null), []);
      assert.deepStrictEqual(autocomplete.autocomplete(undefined), []);
    });

    it('devrait fonctionner avec l\'alias search()', () => {
      const suggestions1 = autocomplete.autocomplete('node');
      const suggestions2 = autocomplete.search('node');
      assert.deepStrictEqual(suggestions1, suggestions2);
    });
  });

  describe('Performance et edge cases', () => {
    it('devrait gérer un grand nombre de mots', () => {
      const words = [];
      for (let i = 0; i < 1000; i++) {
        words.push(`word${i}`);
      }

      const autocomplete = new AutocompleteEngine({ dictionary: words });
      assert.strictEqual(autocomplete.getWordCount(), 1000);

      const suggestions = autocomplete.autocomplete('word1');
      assert(suggestions.length > 0);
    });

    it('devrait gérer les caractères spéciaux', () => {
      const words = ['café', 'naïve', 'résumé', 'façade'];
      const autocomplete = new AutocompleteEngine({ dictionary: words });

      const suggestions = autocomplete.autocomplete('caf');
      assert(suggestions.includes('café'));
    });

    it('devrait gérer les mots très longs', () => {
      const longWord = 'a'.repeat(100);
      const autocomplete = new AutocompleteEngine({ dictionary: [longWord] });

      const suggestions = autocomplete.autocomplete('a');
      assert(suggestions.includes(longWord));
    });
  });

  describe('Intégration avec dictionnaires par défaut', () => {
    it('devrait charger le dictionnaire français par défaut', () => {
      const autocomplete = new AutocompleteEngine({ language: 'fr' });
      // Le dictionnaire français devrait contenir beaucoup de mots
      assert(autocomplete.getWordCount() > 1000);
    });

    it('devrait charger le dictionnaire anglais', () => {
      const autocomplete = new AutocompleteEngine({ language: 'en' });
      // Le dictionnaire anglais devrait contenir beaucoup de mots
      assert(autocomplete.getWordCount() > 1000);
    });

    it('devrait fonctionner sans dictionnaire par défaut pour une langue non supportée', () => {
      const autocomplete = new AutocompleteEngine({ language: 'es' });
      // Devrait créer une instance vide sans erreur
      assert.strictEqual(autocomplete.getWordCount(), 0);
    });
  });
});
