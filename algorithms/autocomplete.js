const fs = require("fs");
const path = require("path");

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isWord = true;
  }

  getWordsFrom(node, prefix, result, maxSuggestions) {
    if (result.length >= maxSuggestions) return;
    if (node.isWord) result.push(prefix);
    for (const [char, child] of node.children) {
      if (result.length >= maxSuggestions) break;
      this.getWordsFrom(child, prefix + char, result, maxSuggestions);
    }
  }

  autocomplete(prefix, maxSuggestions = 20) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children.has(char)) return [];
      node = node.children.get(char);
    }
    const result = [];
    this.getWordsFrom(node, prefix, result, maxSuggestions);
    return result;
  }
}

/**
 * Moteur d'autocomplétion basé sur la structure Trie
 * Intégré dans l'API Algorith
 */
class AutocompleteEngine {
  constructor(options = {}) {
    const {
      language = "fr",
      dictionary = null,
      maxSuggestions = 20,
    } = options;

    this.language = language;
    this.maxSuggestions = maxSuggestions;
    this.trie = new Trie();
    this.seen = new Set();

    this._loadInitialDictionary(dictionary);
  }

  _loadInitialDictionary(dictionary) {
    if (Array.isArray(dictionary)) {
      dictionary.forEach(word => this.addWord(word));
    } else if (dictionary || this._getDefaultDictionaryPath(this.language)) {
      const dictPath = dictionary || this._getDefaultDictionaryPath(this.language);
      try {
        if (fs.existsSync(dictPath)) {
          const content = fs.readFileSync(dictPath, "utf-8");
          let words;
          
          // Support JSON et texte
          try {
            words = JSON.parse(content);
            if (Array.isArray(words)) {
              words.forEach(word => this.addWord(word));
            }
          } catch {
            words = content.split("\n")
              .map(w => w.trim().toLowerCase())
              .filter(w => w.length > 0);
            words.forEach(word => this.addWord(word));
          }
        }
      } catch (error) {
        // Ignore les erreurs de chargement du dictionnaire
      }
    }
  }

  _getDefaultDictionaryPath(lang) {
    const langMap = {
      fr: path.join(__dirname, "dictionaries", "fr.json"),
      en: path.join(__dirname, "dictionaries", "en.json"),
    };
    return langMap[lang] || null;
  }

  /**
   * Ajoute un mot au dictionnaire
   */
  addWord(word) {
    if (!word || typeof word !== 'string') return;
    word = word.toLowerCase().trim();
    if (word.length > 0 && !this.seen.has(word)) {
      this.trie.insert(word);
      this.seen.add(word);
    }
  }

  /**
   * Autocomplète à partir d'un préfixe
   */
  autocomplete(prefix) {
    if (!prefix || typeof prefix !== 'string') return [];
    return this.trie.autocomplete(prefix.toLowerCase(), this.maxSuggestions);
  }

  /**
   * Alias pour la méthode autocomplete (compatibilité)
   */
  search(prefix) {
    return this.autocomplete(prefix);
  }

  /**
   * Ajoute plusieurs mots d'un coup
   */
  addWords(words) {
    if (Array.isArray(words)) {
      words.forEach(word => this.addWord(word));
    }
  }

  /**
   * Retourne le nombre de mots dans le dictionnaire
   */
  getWordCount() {
    return this.seen.size;
  }
}

module.exports = AutocompleteEngine;
