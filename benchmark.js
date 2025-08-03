/**
 * Benchmarks de Performance pour Algorith
 *
 * Ce fichier contient des tests de performance pour tous les algorithmes
 * afin de surveiller les performances et détecter les régressions.
 */

const fs = require('fs');
const path = require('path');
const {
  levenshtein,
  jaroWinkler,
  jaro,
  hamming,
  jaccardSimilarity,
  cosineSimilarity,
  diceCoefficient,
  trigramScore,
  compareAll,
  RandomEngine
} = require('./index');

// Données de test de différentes tailles
const generateTestData = () => {
  const random = new RandomEngine(12345);
  return {
    small: {
      strings: Array.from({length: 100}, () => random.randomString(10)),
      pairs: 100
    },
    medium: {
      strings: Array.from({length: 500}, () => random.randomString(20)),
      pairs: 500
    },
    large: {
      strings: Array.from({length: 1000}, () => random.randomString(50)),
      pairs: 1000
    },
    words: [
      'algorithm', 'similarity', 'distance', 'comparison', 'matching',
      'javascript', 'programming', 'development', 'software', 'computer',
      'function', 'method', 'implementation', 'optimization', 'performance'
    ]
  };
};

// Mesure le temps d'exécution d'une fonction
const benchmark = (name, fn, iterations = 1000) => {
  const start = process.hrtime.bigint();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const end = process.hrtime.bigint();
  const duration = Number(end - start) / 1000000; // Convertir en millisecondes

  return {
    name,
    iterations,
    totalTime: duration,
    avgTime: duration / iterations,
    opsPerSecond: Math.round(iterations / (duration / 1000))
  };
};

// Tests de performance pour les algorithmes de similarité
const runSimilarityBenchmarks = () => {
  console.log('🚀 Benchmarks des Algorithmes de Similarité\n');

  const data = generateTestData();
  const results = [];

  const algorithms = [
    { name: 'Levenshtein', fn: levenshtein },
    { name: 'Jaro-Winkler', fn: jaroWinkler },
    { name: 'Jaro', fn: jaro },
    { name: 'Hamming', fn: hamming },
    { name: 'Jaccard', fn: jaccardSimilarity },
    { name: 'Cosine', fn: cosineSimilarity },
    { name: 'Dice', fn: diceCoefficient },
    { name: 'Trigram', fn: trigramScore }
  ];

  algorithms.forEach(algo => {
    console.log(`📊 Testing ${algo.name}...`);

    const smallResult = benchmark(
      `${algo.name} (small)`,
      () => algo.fn(data.words[0], data.words[1]),
      10000
    );

    const mediumResult = benchmark(
      `${algo.name} (medium)`,
      () => algo.fn(data.small.strings[0], data.small.strings[1]),
      5000
    );

    const largeResult = benchmark(
      `${algo.name} (large)`,
      () => algo.fn(data.medium.strings[0], data.medium.strings[1]),
      1000
    );

    results.push({ algorithm: algo.name, small: smallResult, medium: mediumResult, large: largeResult });

    console.log(`  Small strings: ${smallResult.avgTime.toFixed(3)}ms avg, ${smallResult.opsPerSecond} ops/sec`);
    console.log(`  Medium strings: ${mediumResult.avgTime.toFixed(3)}ms avg, ${mediumResult.opsPerSecond} ops/sec`);
    console.log(`  Large strings: ${largeResult.avgTime.toFixed(3)}ms avg, ${largeResult.opsPerSecond} ops/sec\n`);
  });

  return results;
};

// Tests de performance pour compareAll
const runCompareAllBenchmark = () => {
  console.log('🔄 Benchmark de compareAll\n');

  const data = generateTestData();

  const result = benchmark(
    'compareAll',
    () => compareAll(data.words[0], data.words[1]),
    1000
  );

  console.log(`compareAll: ${result.avgTime.toFixed(3)}ms avg, ${result.opsPerSecond} ops/sec\n`);

  return result;
};

// Tests de performance pour RandomEngine
const runRandomEngineBenchmarks = () => {
  console.log('🎲 Benchmarks de RandomEngine\n');

  const random = new RandomEngine(12345);
  const results = [];

  const randomFunctions = [
    { name: 'uniform()', fn: () => random.uniform() },
    { name: 'int(1, 100)', fn: () => random.int(1, 100) },
    { name: 'bool()', fn: () => random.bool() },
    { name: 'normal(0, 1)', fn: () => random.normal(0, 1) },
    { name: 'exponential(1)', fn: () => random.exponential(1) },
    { name: 'randomString(10)', fn: () => random.randomString(10) },
    { name: 'randomWord(5)', fn: () => random.randomWord(5) },
    { name: 'perlin1D(0.5)', fn: () => random.perlin1D(0.5) },
    { name: 'whiteNoise()', fn: () => random.whiteNoise() }
  ];

  randomFunctions.forEach(func => {
    const result = benchmark(func.name, func.fn, 100000);
    results.push(result);

    console.log(`${func.name}: ${result.avgTime.toFixed(6)}ms avg, ${result.opsPerSecond} ops/sec`);
  });

  console.log('');
  return results;
};

// Tests de stress pour vérifier la stabilité
const runStressTests = () => {
  console.log('💪 Tests de Stress\n');

  const random = new RandomEngine();

  // Test avec de très longues chaînes
  console.log('📏 Test avec chaînes très longues...');
  const longString1 = random.randomString(10000);
  const longString2 = random.randomString(10000);

  const start = Date.now();
  const result = levenshtein(longString1, longString2);
  const duration = Date.now() - start;

  console.log(`Levenshtein sur chaînes de 10k chars: ${duration}ms, résultat: ${result.toFixed(6)}`);

  // Test de stabilité mémoire
  console.log('🧠 Test de stabilité mémoire...');
  const memStart = process.memoryUsage();

  for (let i = 0; i < 10000; i++) {
    jaroWinkler(
      random.randomString(50),
      random.randomString(50)
    );
  }

  const memEnd = process.memoryUsage();
  const memDiff = memEnd.heapUsed - memStart.heapUsed;

  console.log(`Mémoire utilisée: ${(memDiff / 1024 / 1024).toFixed(2)} MB\n`);
};

// Génère un rapport de performance
const generateReport = (similarityResults, compareAllResult, randomResults) => {
  const report = {
    timestamp: new Date().toISOString(),
    environment: {
      node: process.version,
      platform: process.platform,
      arch: process.arch,
      memory: process.memoryUsage()
    },
    similarity: similarityResults,
    compareAll: compareAllResult,
    random: randomResults
  };

  const reportPath = path.join(__dirname, 'benchmark-results.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  console.log(`📊 Rapport sauvegardé dans ${reportPath}`);

  return report;
};

// Affiche un résumé des performances
const displaySummary = (report) => {
  console.log('\n📈 Résumé des Performances\n');

  // Top 3 des algorithmes les plus rapides
  const fastestAlgos = report.similarity
    .map(r => ({ name: r.algorithm, avgTime: r.small.avgTime }))
    .sort((a, b) => a.avgTime - b.avgTime)
    .slice(0, 3);

  console.log('🏆 Top 3 des algorithmes les plus rapides:');
  fastestAlgos.forEach((algo, index) => {
    console.log(`  ${index + 1}. ${algo.name}: ${algo.avgTime.toFixed(3)}ms`);
  });

  // Fonctions Random les plus rapides
  const fastestRandom = report.random
    .sort((a, b) => a.avgTime - b.avgTime)
    .slice(0, 3);

  console.log('\n🎲 Top 3 des fonctions Random les plus rapides:');
  fastestRandom.forEach((func, index) => {
    console.log(`  ${index + 1}. ${func.name}: ${func.avgTime.toFixed(6)}ms`);
  });

  console.log(`\n🔄 compareAll: ${report.compareAll.avgTime.toFixed(3)}ms (toutes les comparaisons)`);
  console.log(`\n💻 Environnement: Node.js ${report.environment.node} sur ${report.environment.platform}`);
};

// Point d'entrée principal
const runAllBenchmarks = () => {
  console.log('🎯 Algorithme Performance Benchmarks\n');
  console.log('=====================================\n');

  const similarityResults = runSimilarityBenchmarks();
  const compareAllResult = runCompareAllBenchmark();
  const randomResults = runRandomEngineBenchmarks();

  runStressTests();

  const report = generateReport(similarityResults, compareAllResult, randomResults);
  displaySummary(report);

  console.log('\n✅ Tous les benchmarks terminés!');
};

// Exécution si le script est appelé directement
if (require.main === module) {
  runAllBenchmarks();
}

module.exports = {
  benchmark,
  runSimilarityBenchmarks,
  runRandomEngineBenchmarks,
  runAllBenchmarks,
  generateTestData
};
