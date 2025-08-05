# 📋 Guide des Conventions de Pull Request

## 🎯 Format des Titres de PR

Tous les titres de Pull Request doivent suivre le format des **Conventional Commits** :

```
type(scope): description
```

### 🔧 Types Valides

| Type       | Description                                  | Exemple                                          |
| ---------- | -------------------------------------------- | ------------------------------------------------ |
| `feat`     | Nouvelle fonctionnalité                      | `feat(autocomplete): add Trie-based engine`      |
| `fix`      | Correction de bug                            | `fix(levenshtein): correct distance calculation` |
| `docs`     | Documentation uniquement                     | `docs(readme): update API examples`              |
| `style`    | Formatage, style (pas de changement logique) | `style(algorithms): fix indentation`             |
| `refactor` | Refactoring sans changement fonctionnel      | `refactor(random): simplify seed generation`     |
| `test`     | Ajout ou modification de tests               | `test(similarity): add edge cases`               |
| `chore`    | Tâches de maintenance                        | `chore(deps): update dependencies`               |

### 🎯 Scopes Recommandés

| Scope          | Description                    |
| -------------- | ------------------------------ |
| `autocomplete` | Moteur d'autocomplétion        |
| `similarity`   | Algorithmes de similarité      |
| `random`       | Moteur de génération aléatoire |
| `levenshtein`  | Algorithme Levenshtein         |
| `jaro`         | Algorithmes Jaro/Jaro-Winkler  |
| `hamming`      | Distance de Hamming            |
| `jaccard`      | Similarité de Jaccard          |
| `cosine`       | Similarité cosinus             |
| `dice`         | Coefficient de Dice            |
| `soundex`      | Algorithme Soundex             |
| `trigram`      | Score de trigrammes            |
| `readme`       | Documentation README           |
| `examples`     | Fichier EXAMPLES.md            |
| `types`        | Définitions TypeScript         |
| `tests`        | Tests globaux                  |
| `benchmark`    | Benchmarks de performance      |
| `ci`           | Intégration continue           |
| `deps`         | Dépendances                    |

## ✅ Exemples de Titres Valides

```bash
# Nouvelles fonctionnalités
feat(autocomplete): add multilingual dictionary support
feat(similarity): implement new fuzzy matching algorithm
feat(random): add exponential distribution

# Corrections de bugs
fix(levenshtein): handle empty string edge case
fix(jaro): correct prefix scaling calculation
fix(random): ensure deterministic seed behavior

# Documentation
docs(readme): add performance benchmarks section
docs(examples): update autocomplete usage examples
docs(api): clarify method return types

# Tests
test(autocomplete): add performance tests for large dictionaries
test(similarity): cover unicode character handling
test(integration): add end-to-end workflow tests

# Refactoring
refactor(algorithms): extract common utility functions
refactor(types): improve TypeScript definitions clarity
refactor(exports): standardize module exports

# Maintenance
chore(deps): update mocha to latest version
chore(ci): improve GitHub Actions performance
chore(lint): fix ESLint configuration
```

## ❌ Exemples de Titres Invalides

```bash
# Trop vague
❌ Update code
❌ Fix bug
❌ Add feature

# Format incorrect
❌ Add: new autocomplete feature
❌ FIX(similarity) - correct calculation
❌ feat/autocomplete: new engine

# Casse incorrecte
❌ FEAT(autocomplete): Add new engine
❌ Feat(Autocomplete): Add New Engine
❌ feat(autocomplete): Add new engine  # description doit être en minuscules

# Types invalides
❌ add(autocomplete): new feature     # utiliser 'feat'
❌ update(docs): readme changes       # utiliser 'docs'
❌ bugfix(random): seed issue         # utiliser 'fix'
```

## 🔍 Validation Automatique

Un workflow GitHub Actions valide automatiquement le format des titres de PR. Si le titre ne respecte pas les conventions :

1. ❌ La validation échoue
2. 📋 Un résumé détaillé explique le problème
3. 💡 Des exemples corrects sont suggérés
4. 🏷️ Des labels appropriés sont recommandés

## 🛠️ Outils de Validation

### Script Local
```bash
# Valider un titre localement
./scripts/validate-pr-title.sh "feat(autocomplete): add new engine"
```

### Avant de Créer une PR
```bash
# Utiliser le script de création automatique
./scripts/create-pr-autocomplete.sh
```

## 📋 Checklist pour les PR

Avant de soumettre votre Pull Request :

- [ ] Le titre respecte le format `type(scope): description`
- [ ] Le type est l'un des types valides
- [ ] Le scope correspond au composant modifié
- [ ] La description est concise et en minuscules
- [ ] La description commence par un verbe à l'infinitif
- [ ] Tous les tests passent
- [ ] La documentation est mise à jour si nécessaire
- [ ] Le CHANGELOG.md est mis à jour pour les changements significatifs

## 🎯 Bonnes Pratiques

### Description
- Utiliser l'infinitif : "add", "fix", "update", pas "adds", "fixed", "updated"
- Être concis mais descriptif
- Éviter les points à la fin
- Maximum 50 caractères

### Scope
- Utiliser des noms courts et clairs
- Préférer les noms de composants aux noms de fichiers
- Rester cohérent avec les scopes existants

### Type
- `feat` pour toute nouvelle fonctionnalité visible par l'utilisateur
- `fix` pour toute correction de comportement incorrect
- `docs` uniquement pour les changements de documentation
- `refactor` pour les changements qui n'affectent pas le comportement

## 🚀 Automatisation

Le repository inclut des outils pour faciliter le respect des conventions :

1. **Script de validation** : `scripts/validate-pr-title.sh`
2. **Script de création PR** : `scripts/create-pr-autocomplete.sh`
3. **Workflow de validation** : `.github/workflows/pr-validation.yml`
4. **Template de PR** : `.github/PULL_REQUEST_TEMPLATE.md`

Ces outils garantissent une cohérence dans tout le projet et facilitent la maintenance du changelog automatique.
