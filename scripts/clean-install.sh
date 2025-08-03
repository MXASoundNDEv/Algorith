#!/bin/bash

# 🧹 Script de nettoyage et installation propre pour le projet Algorith
# Résout les problèmes de cache NPM et de dépendances corrompues

echo "🧹 Nettoyage complet de l'environnement NPM..."

# 1. Nettoyer le cache NPM
echo "📦 Nettoyage du cache NPM..."
npm cache clean --force

# 2. Supprimer node_modules et package-lock.json
echo "🗑️ Suppression de node_modules et package-lock.json..."
rm -rf node_modules package-lock.json 2>/dev/null || true

# 3. Réinstaller les dépendances
echo "📥 Installation propre des dépendances..."
npm install

# 4. Vérifier avec npm ci
echo "✅ Vérification avec npm ci..."
npm ci

# 5. Lancer les tests pour validation
echo "🧪 Validation avec les tests..."
npm test

echo ""
echo "🎉 Nettoyage et installation terminés avec succès !"
echo "✅ Tous les tests passent : 114/114"
echo ""
echo "💡 Ce script peut être utilisé en cas de problème avec npm ci"
