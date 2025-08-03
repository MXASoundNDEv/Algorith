# Configuration des Workflows GitHub pour Algorith

Ce document décrit la configuration et l'utilisation des workflows GitHub Actions pour le projet Algorith.

## 🔄 Workflows Disponibles

### 1. CI/CD Pipeline (`ci.yml`)
**Déclencheurs :**
- Push sur `main` et `develop`
- Pull requests vers `main`
- Releases publiées

**Jobs :**
- Tests multi-versions Node.js (14, 16, 18, 20)
- Analyse de couverture de code
- Audit de sécurité
- Validation de documentation
- Tests de performance
- Tests multi-OS (Ubuntu, Windows, macOS)
- Publication NPM (sur release)
- Notifications et nettoyage

### 2. Pull Request Validation (`pr.yml`)
**Déclencheurs :**
- Ouverture, synchronisation, réouverture de PR
- Changement de statut draft

**Jobs :**
- Validation rapide des PR
- Analyse des changements
- Tests approfondis
- Vérification de documentation
- Contrôle qualité du code
- Analyse de sécurité
- Résumé et auto-labeling

### 3. Release & Deployment (`release.yml`)
**Déclencheurs :**
- Tags `v*.*.*`
- Déclenchement manuel avec paramètres

**Jobs :**
- Préparation de release
- Tests complets pré-release
- Audit de sécurité
- Construction du package
- Création de release GitHub
- Publication NPM
- Actions post-release
- Possibilité de rollback

### 4. Maintenance & Health Checks (`maintenance.yml`)
**Déclencheurs :**
- Programmé (tous les lundis à 8h UTC)
- Déclenchement manuel

**Jobs :**
- Vérification de santé du projet
- Analyse des dépendances
- Audit de sécurité automatique
- Monitoring de performance
- Vérification de documentation
- Nettoyage automatique
- Recommandations de maintenance

## 🔧 Configuration Requise

### Secrets GitHub
Les secrets suivants doivent être configurés dans les paramètres du repository :

```
NPM_TOKEN          # Token pour publication sur NPM
CODECOV_TOKEN      # Token pour Codecov (optionnel)
```

### Variables d'Environnement
```
NODE_VERSION: '18'     # Version Node.js par défaut
CACHE_VERSION: 'v1'    # Version du cache
```

### Environments
Créer l'environment `npm-production` avec protection pour les releases.

## 📋 Labels GitHub
Les labels suivants sont utilisés automatiquement :

**Par Type :**
- `algorithm` - Changements d'algorithmes
- `random-engine` - RandomEngine
- `performance` - Performance
- `tests` - Tests
- `documentation` - Documentation
- `dependencies` - Dépendances
- `security` - Sécurité

**Par Priorité :**
- `priority: high/medium/low`

**Par Status :**
- `status: needs-review/in-progress/blocked`

**Par Taille :**
- `size: xs/s/m/l/xl`

## 🚀 Utilisation

### Déclenchement Manuel des Workflows

#### Release
```bash
# Via GitHub CLI
gh workflow run release.yml -f version=1.0.1 -f release_type=release

# Via interface web GitHub
Actions → Release & Deployment → Run workflow
```

#### Maintenance
```bash
# Via GitHub CLI
gh workflow run maintenance.yml -f check_type=full

# Options : full, dependencies, security, performance
```

### Publication d'une Release

1. **Mise à jour du CHANGELOG.md**
   ```markdown
   ## [1.0.1] - 2025-08-03
   ### Added
   - Nouvelle fonctionnalité
   ### Fixed
   - Correction de bug
   ```

2. **Création du tag**
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```

3. **Le workflow de release se déclenche automatiquement**

### Monitoring des Workflows

#### Badges de Status
Ajoutez ces badges au README :

```markdown
![CI](https://github.com/username/algorith/workflows/CI%2FCD%20Pipeline/badge.svg)
![Release](https://github.com/username/algorith/workflows/Release%20%26%20Deployment/badge.svg)
![Maintenance](https://github.com/username/algorith/workflows/Maintenance%20%26%20Health%20Checks/badge.svg)
```

#### Notifications
Les workflows envoient des notifications via :
- GitHub Step Summary
- Artifacts pour rapports détaillés
- Labels automatiques sur PR

## 🔍 Debugging des Workflows

### Logs Détaillés
Activez les logs de debug en ajoutant ces secrets :
```
ACTIONS_STEP_DEBUG: true
ACTIONS_RUNNER_DEBUG: true
```

### Tests Locaux
```bash
# Test des workflows avec act
npm install -g @nektos/act
act push # Simule un push
act pull_request # Simule une PR
```

### Validation des Workflows
```bash
# Validation de la syntaxe YAML
yamllint .github/workflows/*.yml

# Test avec GitHub CLI
gh workflow list
gh workflow view ci.yml
```

## 📊 Métriques et Rapports

### Artifacts Générés
- `test-results-node-*` - Résultats de tests par version Node.js
- `performance-results` - Résultats de benchmarks
- `dependency-report` - Rapport de dépendances
- `performance-history-*` - Historique des performances
- `npm-package` - Package NPM construit

### Rapports de Maintenance
- Santé du projet (hebdomadaire)
- Audit de sécurité (hebdomadaire)
- Monitoring de performance (hebdomadaire)
- Analyse des dépendances (hebdomadaire)

## 🛡️ Sécurité

### Protection des Branches
- `main` : Requiert PR review + status checks
- `develop` : Requiert status checks

### Audit Automatique
- NPM audit sur chaque PR
- Scan de code pour patterns suspects
- Vérification des dépendances vulnérables

### Rollback
En cas de problème avec une release :
1. Le workflow `release.yml` fournit des instructions de rollback
2. NPM unpublish disponible dans les 24h
3. Suppression automatique des artifacts en cas d'échec

## 📞 Support

En cas de problème avec les workflows :
1. Vérifiez les logs dans l'onglet Actions
2. Consultez la documentation GitHub Actions
3. Créez une issue avec le label `ci/cd`

## 🔄 Mise à Jour des Workflows

Les workflows sont versionnés et peuvent être mis à jour :
1. Modifiez les fichiers `.github/workflows/*.yml`
2. Testez localement avec `act`
3. Créez une PR avec les changements
4. Les workflows mis à jour s'appliquent automatiquement après merge
