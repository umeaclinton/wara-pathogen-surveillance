/**
 * ==============================================================================
 * ENGINE VERIFICATION AND INTEGRATION TEST SUITE
 * Tests: Virulence Scoring, Surveillance Metrics & Diagnostic Classification
 * ==============================================================================
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

const { calculateVirulenceScore, getRiskTier, computeSurveillanceSummary } = require('./virulence');
const { diagnoseUnknownIsolate } = require('./diagnostics');

function runEngineTests() {
  console.log('Running test suite for virulence scoring and diagnostic classification...\n');

  // Test 1: Virulence Score Calculation
  console.log('[Test 1] Virulence Scoring Logic:');
  const criticalProfile = { gelatinase: true, dnase: true, hemolysis: 'BETA' };
  const criticalScore = calculateVirulenceScore(criticalProfile);
  assert.strictEqual(criticalScore, 100, 'Critical virulence should sum to 100');
  assert.strictEqual(getRiskTier(criticalScore), 'CRITICAL_VIRULENCE');
  console.log('   Pass: Complete Beta + DNase + Gelatinase evaluates to 100 (CRITICAL_VIRULENCE)');

  const benignProfile = { gelatinase: false, dnase: false, hemolysis: 'GAMMA' };
  const benignScore = calculateVirulenceScore(benignProfile);
  assert.strictEqual(benignScore, 0, 'Benign profile should evaluate to 0');
  assert.strictEqual(getRiskTier(benignScore), 'NEGLIGIBLE_VIRULENCE');
  console.log('   Pass: Probiotic profile evaluates to 0 (NEGLIGIBLE_VIRULENCE)');

  // Test 2: Cohort Analytics on Thesis Seed Data
  console.log('\n[Test 2] Cohort Analytics on Thesis Seed Data:');
  const seedPath = path.join(__dirname, '..', '..', 'prisma', 'seed-data.json');
  const seedData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
  const summary = computeSurveillanceSummary(seedData.isolates);

  assert.strictEqual(summary.totalIsolates, 40);
  assert.strictEqual(summary.virulenceFactors.betaHemolysis.count, 21);
  assert.strictEqual(summary.virulenceFactors.betaHemolysis.percentage, 52.5);
  console.log(`   Pass: Aggregated 40 isolates: Mean Virulence Index = ${summary.meanVirulenceIndex}/100`);
  console.log(`   Pass: Beta-Hemolytic Prevalence = ${summary.virulenceFactors.betaHemolysis.percentage}%`);

  // Test 3: Diagnostic Classification Engine (E. coli scenario)
  console.log('\n[Test 3] Diagnostic Engine (E. coli Test Vector):');
  const unknownColiform = {
    gramStain: 'GRAM_NEGATIVE',
    cellularShape: 'ROD',
    oxidase: false,
    catalase: true,
    indoleProduction: true,
    greenMetallicSheenEMB: true,
    lactose: true,
  };
  const rankedMatches = diagnoseUnknownIsolate(unknownColiform);
  const topMatch = rankedMatches[0];

  assert.strictEqual(topMatch.scientificName, 'Escherichia coli');
  assert.ok(topMatch.confidencePercentage >= 95);
  console.log(`   Pass: Top Diagnostic Prediction: ${topMatch.scientificName} (${topMatch.confidencePercentage}% confidence)`);

  // Test 4: Diagnostic Classification Engine (S. aureus scenario)
  console.log('\n[Test 4] Diagnostic Classification (Staphylococcus aureus Test Vector):');
  const unknownCocci = {
    gramStain: 'GRAM_POSITIVE',
    cellularShape: 'COCCI',
    catalase: true,
    mannitol: true,
    dnase: true,
  };
  const cocciMatches = diagnoseUnknownIsolate(unknownCocci);
  const topCocciMatch = cocciMatches[0];

  assert.strictEqual(topCocciMatch.scientificName, 'Staphylococcus aureus');
  assert.ok(topCocciMatch.confidencePercentage >= 95);
  console.log(`   Pass: Top Diagnostic Prediction: ${topCocciMatch.scientificName} (${topCocciMatch.confidencePercentage}% confidence)`);

  console.log('\n------------------------------------------------------');
  console.log('Test Summary: 4 passed, 0 failed');
  console.log('------------------------------------------------------\n');
}

runEngineTests();
