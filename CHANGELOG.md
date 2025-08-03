# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-08-03

### Added
#### Algorithmes de Similarité Textuelle
- **Levenshtein Distance** - Distance d'édition normalisée
- **Jaro-Winkler Similarity** - Algorithme optimisé pour les préfixes communs
- **Jaro Similarity** - Version de base de l'algorithme Jaro
- **Hamming Distance** - Distance caractère par caractère normalisée
- **Jaccard Similarity** - Similarité basée sur les ensembles de caractères
- **Cosine Similarity** - Similarité cosinus des vecteurs de fréquence
- **Dice Coefficient** - Coefficient de Dice basé sur les bigrammes
- **Trigram Score** - Score basé sur les trigrammes
- **Soundex Algorithm** - Algorithme phonétique pour codes Soundex

#### Fonction Combinée
- **compareAll()** - Compare avec tous les algorithmes en une fois

#### RandomEngine - Moteur de Génération Aléatoire
- **Générateur déterministe** avec seed configurable
- **Fonctions de base** : `uniform()`, `int()`, `bool()`, `pick()`, `shuffle()`
- **Distributions probabilistes** :
  - Distribution normale (`normal()`)
  - Distribution exponentielle (`exponential()`)
  - Distribution de Poisson (`poisson()`)
  - Distribution binomiale (`binomial()`)
  - Distribution géométrique (`geometric()`)
  - Sélection pondérée (`weighted()`)
- **Génération de texte** :
  - Caractères aléatoires (`randomChar()`)
  - Chaînes aléatoires (`randomString()`)
  - Mots prononçables (`randomWord()`)
  - UUIDs valides (`uuid()`)
- **Fonctions cryptographiques** : `cryptoInt()` pour entiers sécurisés
- **Génération de bruit** :
  - Bruit Perlin 1D (`perlin1D()`)
  - Bruit de valeur (`valueNoise1D()`)
  - Bruit blanc (`whiteNoise()`)
  - Bruit rose (`pinkNoise()`)
  - Interface unifiée (`noise()`)
- **Fonctions utilitaires** : `fade()`, `lerp()`, gradient tables

#### Documentation et Tests
- **114 tests unitaires** avec 100% de réussite
- **Documentation complète** avec exemples d'usage
- **Support TypeScript** avec fichier de définitions `.d.ts`
- **8 exemples pratiques** dans EXAMPLES.md
- **README détaillé** avec API documentation
- **Changelog** pour suivi des versions

#### Qualité et Performance
- **Gestion robuste** des cas limites (chaînes vides, etc.)
- **Validation des plages** et types de données
- **Déterminisme parfait** avec seeds
- **Performance optimisée** (< 200ms pour tous les tests)
- **Support Node.js** >= 14.0.0

#### Métadonnées NPM
- **Mots-clés complets** pour découvrabilité
- **Licence MIT** pour usage libre
- **Scripts de test** avec couverture
- **Structure de fichiers** optimisée pour npm

### Testing
- Tests de similarité pour tous les algorithmes
- Tests de déterminisme et reproductibilité
- Tests de distributions statistiques
- Tests de génération de texte et validation de format
- Tests de fonctions cryptographiques
- Tests de bruit procédural
- Tests d'intégration et de cohérence

### Documentation
- README principal avec guide complet
- Exemples pratiques pour 8 cas d'usage
- Définitions TypeScript pour IntelliSense
- Documentation des tests avec guides d'usage
- Rapport final de développement

## [Unreleased]

### Planned
- Support pour bruit 2D/3D
- Algorithmes de similarité supplémentaires (Metaphone, Double Metaphone)
- Optimisations de performance
- Support pour streams de données
- Algorithmes de clustering basés sur la similarité
- Interface web pour démonstration

---

## Format des Entrées

### Added
Nouvelles fonctionnalités ajoutées.

### Changed
Modifications de fonctionnalités existantes.

### Deprecated
Fonctionnalités qui seront supprimées dans les prochaines versions.

### Removed
Fonctionnalités supprimées dans cette version.

### Fixed
Corrections de bugs.

### Security
Améliorations de sécurité.
