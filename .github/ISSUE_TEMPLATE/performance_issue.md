---
name: 📊 Performance Issue
about: Report a performance problem or regression
title: '[PERFORMANCE] '
labels: ['performance']
assignees: ''
---

## 📊 Description du Problème de Performance

Une description claire et concise du problème de performance observé.

## 🎯 Algorithme ou Fonction Concerné(e)

- [ ] Levenshtein Distance
- [ ] Jaro-Winkler Similarity
- [ ] Jaro Similarity
- [ ] Hamming Distance
- [ ] Jaccard Similarity
- [ ] Cosine Similarity
- [ ] Dice Coefficient
- [ ] Trigram Score
- [ ] Soundex Algorithm
- [ ] RandomEngine
- [ ] compareAll function
- [ ] Autre : _____

## 📈 Métriques de Performance

### Performance Actuelle
```
Temps d'exécution : ___ms
Opérations par seconde : ___
Utilisation mémoire : ___MB
```

### Performance Attendue
```
Temps d'exécution : ___ms
Opérations par seconde : ___
Utilisation mémoire : ___MB
```

## 🔄 Code de Reproduction

```javascript
// Code minimal pour reproduire le problème de performance
const { algorithmName } = require('algorith');

console.time('performance-test');
for (let i = 0; i < 10000; i++) {
  const result = algorithmName('input1', 'input2');
}
console.timeEnd('performance-test');
```

## 📱 Environnement

- **OS** : [ex: Ubuntu 20.04, Windows 10, macOS Big Sur]
- **Node.js** : [ex: v18.17.0]
- **CPU** : [ex: Intel i7-8700K, M1 Pro]
- **RAM** : [ex: 16GB]
- **Version d'Algorith** : [ex: 1.0.0]

## 📊 Données de Test

### Taille des Données
- **Longueur des chaînes** : [ex: 10 caractères, 1000 caractères]
- **Nombre d'itérations** : [ex: 1000, 10000]
- **Type de données** : [ex: texte aléatoire, mots réels, caractères spéciaux]

### Comparaison avec Versions Précédentes
- **Version précédente** : [ex: 0.9.0]
- **Performance précédente** : [ex: 100ms vs 200ms actuel]

## 📈 Profiling et Analyse

### Résultats de Profiling
```
// Collez ici les résultats de profiling si disponibles
```

### Hypothèses sur la Cause
- [ ] Algorithme sous-optimal
- [ ] Fuite mémoire
- [ ] Calculs redondants
- [ ] Mauvaise gestion des cas limites
- [ ] Problème de concurrence
- [ ] Autre : _____

## 💡 Solutions Suggérées

Avez-vous des idées pour améliorer les performances ?

1. [Suggestion 1]
2. [Suggestion 2]
3. [Suggestion 3]

## 🧪 Tests de Performance

### Benchmark Actuel
```bash
npm run benchmark
# Collez les résultats pertinents ici
```

### Comparaison avec Alternatives
Avez-vous comparé avec d'autres bibliothèques ?

| Bibliothèque | Temps | Mémoire | Notes |
| ------------ | ----- | ------- | ----- |
| Algorith     |       |         |       |
| Alternative1 |       |         |       |
| Alternative2 |       |         |       |

## 🎯 Objectifs de Performance

Quels sont vos objectifs de performance ?

- **Temps d'exécution cible** : [ex: < 1ms pour chaînes de 100 caractères]
- **Débit cible** : [ex: > 100,000 ops/sec]
- **Utilisation mémoire cible** : [ex: < 10MB pour 10,000 opérations]

## 📋 Impact

- **Criticité** : [Faible/Moyenne/Élevée]
- **Fréquence d'utilisation** : [Rare/Occasionnelle/Fréquente]
- **Impact sur les utilisateurs** : [Minimal/Modéré/Significatif]

## ✅ Checklist

- [ ] J'ai vérifié que ce problème n'a pas déjà été signalé
- [ ] J'ai fourni des métriques de performance concrètes
- [ ] J'ai inclus un code de reproduction
- [ ] J'ai testé avec la dernière version d'Algorith
- [ ] J'ai exécuté les benchmarks officiels pour comparaison
