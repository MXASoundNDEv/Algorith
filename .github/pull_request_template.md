# 🚀 Pull Request

## 📝 Description

Décrivez clairement les changements apportés dans cette PR.

### Type de Changement

- [ ] 🐛 Bug fix (changement non-breaking qui corrige un problème)
- [ ] ✨ Nouvelle fonctionnalité (changement non-breaking qui ajoute une fonctionnalité)
- [ ] 💥 Breaking change (fix ou fonctionnalité qui causerait un dysfonctionnement des fonctionnalités existantes)
- [ ] 📚 Documentation (mise à jour de la documentation uniquement)
- [ ] 🎨 Style (formatage, points-virgules manquants, etc; pas de changement de code)
- [ ] ♻️ Refactoring (refactoring du code de production, ex: renommage d'une variable)
- [ ] ⚡ Performance (amélioration des performances)
- [ ] 🧪 Tests (ajout de tests manquants, refactoring de tests)
- [ ] 🔧 Chore (mise à jour des tâches de build, configurations, etc)

## 🎯 Motivation et Contexte

Pourquoi ce changement est-il nécessaire ? Quel problème résout-il ?

- Fixes #(numéro d'issue)
- Relates to #(numéro d'issue)

## 🔄 Comment Tester

Décrivez les tests que vous avez effectués pour vérifier vos changements.

```bash
# Commandes pour tester
npm test
npm run benchmark
```

### Tests Ajoutés

- [ ] Tests unitaires pour les nouvelles fonctionnalités
- [ ] Tests pour les cas limites
- [ ] Tests de performance/benchmarks
- [ ] Tests d'intégration

## 📊 Impact sur les Performances

Si applicable, ajoutez les résultats de benchmarks :

### Avant
```
Algorithme: XXXms, YYY ops/sec
```

### Après
```
Algorithme: XXXms, YYY ops/sec
```

## 📸 Captures d'Écran

Si applicable, ajoutez des captures d'écran pour illustrer les changements.

## 📋 Checklist

### Code Quality
- [ ] Mon code suit les conventions de style du projet
- [ ] J'ai effectué une auto-révision de mon code
- [ ] J'ai commenté mon code, en particulier dans les zones difficiles à comprendre
- [ ] J'ai apporté les modifications correspondantes à la documentation
- [ ] Mes modifications ne génèrent aucun nouveau warning
- [ ] J'ai ajouté des tests qui prouvent que mon fix est efficace ou que ma fonctionnalité fonctionne
- [ ] Les tests unitaires nouveaux et existants passent localement avec mes modifications

### Documentation
- [ ] README.md mis à jour (si nécessaire)
- [ ] CHANGELOG.md mis à jour
- [ ] Définitions TypeScript mises à jour (si nécessaire)
- [ ] Exemples ajoutés/mis à jour (si nécessaire)
- [ ] JSDoc ajouté/mis à jour pour les nouvelles fonctions

### Testing
- [ ] Tous les tests passent (`npm test`)
- [ ] Les benchmarks passent (`npm run benchmark`)
- [ ] Tests ajoutés pour couvrir les nouveaux cas d'usage
- [ ] Tests ajoutés pour les cas limites

### Breaking Changes
Si cette PR contient des breaking changes :

- [ ] J'ai mis à jour la version majeure dans package.json
- [ ] J'ai documenté les breaking changes dans CHANGELOG.md
- [ ] J'ai mis à jour les exemples pour refléter les changements
- [ ] J'ai mis à jour la documentation de migration

## 🔗 Issues Liées

- Closes #XXX
- Fixes #XXX
- Relates to #XXX

## 👥 Reviewers

@mention des reviewers spécifiques si nécessaire

## 📝 Notes Supplémentaires

Ajoutez toute information supplémentaire qui pourrait être utile aux reviewers.

### Changements de l'API

Si vous modifiez l'API, documentez les changements :

```typescript
// Ancien
function oldFunction(param: string): number;

// Nouveau
function newFunction(param: string, options?: Options): number;
```

### Migration

Si des étapes de migration sont nécessaires :

```javascript
// Avant
const result = oldWay();

// Après
const result = newWay();
```
