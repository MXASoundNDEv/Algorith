# Guide de Contribution

Merci de votre intérêt à contribuer au projet **algorith** ! Ce guide vous aidera à comprendre comment participer efficacement au développement.

## Table des Matières
1. [Comment Contribuer](#comment-contribuer)
2. [Configuration de l'Environnement](#configuration-de-lenvironnement)
3. [Standards de Code](#standards-de-code)
4. [Tests](#tests)
5. [Documentation](#documentation)
6. [Processus de Pull Request](#processus-de-pull-request)

## Comment Contribuer

### Types de Contributions Bienvenues
- 🐛 **Corrections de bugs**
- ✨ **Nouvelles fonctionnalités**
- 📚 **Améliorations de documentation**
- 🔍 **Tests supplémentaires**
- 🚀 **Optimisations de performance**
- 💡 **Suggestions d'améliorations**

### Proposer une Nouvelle Fonctionnalité
1. **Créez une issue** décrivant la fonctionnalité
2. **Discutez l'approche** avec les mainteneurs
3. **Attendez l'approbation** avant de commencer le développement
4. **Suivez les standards** établis

## Configuration de l'Environnement

### Prérequis
- Node.js >= 14.0.0
- npm >= 6.0.0
- Git

### Installation
```bash
# Cloner le repository
git clone https://github.com/username/algorith.git
cd algorith

# Installer les dépendances
npm install

# Lancer les tests pour vérifier l'installation
npm test
```

### Structure du Projet
```
algorith/
├── algorithms/          # Algorithmes de similarité
├── test/               # Tests unitaires
├── index.js           # Point d'entrée principal
├── index.d.ts         # Définitions TypeScript
├── README.md          # Documentation principale
├── EXAMPLES.md        # Exemples d'usage
└── CHANGELOG.md       # Historique des versions
```

## Standards de Code

### Style de Code
- **Indentation** : 2 espaces
- **Quotes** : Simple quotes (')
- **Semicolons** : Requis
- **Nommage** : camelCase pour variables et fonctions
- **JSDoc** : Documentez toutes les fonctions publiques

### Exemple de Function
```javascript
/**
 * Calcule la similarité entre deux chaînes
 * @param {string} str1 - Première chaîne
 * @param {string} str2 - Seconde chaîne
 * @param {Object} options - Options de configuration
 * @returns {number} Score de similarité entre 0 et 1
 */
function calculateSimilarity(str1, str2, options = {}) {
  // Validation des entrées
  if (typeof str1 !== 'string' || typeof str2 !== 'string') {
    throw new Error('Both parameters must be strings');
  }
  
  // Logique de l'algorithme
  // ...
  
  return similarity;
}
```

### Conventions de Nommage
- **Algorithmes** : descriptifs et précis (ex: `levenshteinDistance`)
- **Variables** : claires et explicites (ex: `normalizedScore`)
- **Constants** : UPPER_SNAKE_CASE (ex: `MAX_ITERATIONS`)
- **Classes** : PascalCase (ex: `RandomEngine`)

## Tests

### Framework de Test
Nous utilisons **Mocha** pour les tests unitaires.

### Écriture de Tests
```javascript
const { expect } = require('chai');
const { yourFunction } = require('../index');

describe('YourFunction', () => {
  it('should handle basic case correctly', () => {
    const result = yourFunction('input1', 'input2');
    expect(result).to.be.a('number');
    expect(result).to.be.within(0, 1);
  });
  
  it('should handle edge cases', () => {
    expect(yourFunction('', '')).to.equal(1);
    expect(yourFunction('a', '')).to.equal(0);
  });
  
  it('should be deterministic', () => {
    const result1 = yourFunction('test', 'test');
    const result2 = yourFunction('test', 'test');
    expect(result1).to.equal(result2);
  });
});
```

### Exécution des Tests
```bash
# Lancer tous les tests
npm test

# Tests en mode watch
npm run test:watch

# Coverage (si configuré)
npm run test:coverage
```

### Standards pour les Tests
- **Couverture** : Minimum 90%
- **Cas limites** : Toujours tester les edge cases
- **Performance** : Tests ne dépassant pas 100ms chacun
- **Déterminisme** : Tests reproductibles avec seeds fixes
- **Clarté** : Descriptions explicites des cas testés

## Documentation

### JSDoc Standard
Toutes les fonctions publiques doivent être documentées :

```javascript
/**
 * Description courte de la fonction
 * 
 * Description détaillée si nécessaire, expliquant
 * l'algorithme ou les cas d'usage particuliers.
 * 
 * @param {string} param1 - Description du paramètre
 * @param {Object} [options] - Options facultatives
 * @param {boolean} [options.caseSensitive=false] - Sensibilité à la casse
 * @returns {number} Description du retour
 * @throws {Error} Conditions qui déclenchent une erreur
 * 
 * @example
 * // Exemple d'usage
 * const result = myFunction('hello', 'world', { caseSensitive: true });
 * console.log(result); // 0.2
 */
```

### Mise à Jour de la Documentation
- **README.md** : Pour changements d'API
- **EXAMPLES.md** : Pour nouveaux cas d'usage
- **CHANGELOG.md** : Pour toutes les modifications
- **TypeScript** : Mettre à jour `index.d.ts`

## Processus de Pull Request

### Avant de Soumettre
1. ✅ **Tests passent** : `npm test` sans erreur
2. ✅ **Code formaté** selon les standards
3. ✅ **Documentation mise à jour**
4. ✅ **CHANGELOG.md mis à jour**
5. ✅ **Commits atomiques** et bien décrits

### Description de PR
```markdown
## Type de Changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Description
Décrivez clairement ce que fait ce PR.

## Tests
- [ ] Tests existants passent
- [ ] Nouveaux tests ajoutés
- [ ] Edge cases couverts

## Checklist
- [ ] Code suit les standards du projet
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Tests ajoutés/mis à jour
```

### Processus de Review
1. **Automated checks** : Tests et linting
2. **Code review** : Au moins 1 approbation
3. **Manual testing** : Si nécessaire
4. **Merge** : Squash and merge préféré

## Types de Commits

Utilisez le format [Conventional Commits](https://www.conventionalcommits.org/) :

```
type(scope): description

feat(similarity): add new metaphone algorithm
fix(random): correct seed initialization bug
docs(readme): update API documentation
test(trigram): add edge case tests
perf(levenshtein): optimize distance calculation
refactor(random): simplify noise generation
```

### Types Valides
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Documentation
- `test`: Tests
- `refactor`: Refactoring
- `perf`: Optimisation
- `chore`: Maintenance

## Questions et Aide

### Contact
- **Issues GitHub** : Pour bugs et fonctionnalités
- **Discussions** : Pour questions générales
- **Email** : Pour contact direct

### Ressources
- [Node.js Documentation](https://nodejs.org/docs/)
- [Mocha Testing Framework](https://mochajs.org/)
- [JSDoc Documentation](https://jsdoc.app/)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

**Merci de contribuer à algorith !** 🚀

Votre participation aide à créer de meilleurs outils pour la communauté des développeurs.
