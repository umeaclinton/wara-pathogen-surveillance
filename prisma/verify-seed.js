/**
 * ==============================================================================
 * WARA PATHOGEN SURVEILLANCE: INGESTION ENGINE & DATA INTEGRITY VERIFIER
 * Author: Michael (CTO & Lead Engineer)
 * Reference: University of Ibadan Thesis (Dec 2024), Dr. K. Banwo Lab
 * Runtime: Node.js (Built-in fs/path, zero external dependencies)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, 'seed-data.json');

function verifyAndAnalyzeData() {
  console.log('🚀 Loading seed dataset from:', SEED_FILE);

  if (!fs.existsSync(SEED_FILE)) {
    console.error('❌ seed-data.json not found!');
    process.exit(1);
  }

  const raw = fs.readFileSync(SEED_FILE, 'utf-8');
  const data = JSON.parse(raw);

  const { sample, taxa, isolates } = data;

  console.log('\n======================================================');
  console.log('🔬 BIO-SURVEILLANCE INGESTION AUDIT & VALIDATION REPORT');
  console.log('======================================================');

  // 1. Core Counts
  console.log(`📍 Surveillance Origin:   ${sample.foodProduct} (${sample.marketOrigin}, ${sample.city})`);
  console.log(`🧬 Cataloged Taxa:         ${taxa.length} Distinct Bacterial Species`);
  console.log(`📊 Ingested Isolates:       ${isolates.length} / 40 Strains`);

  if (isolates.length !== 40) {
    throw new Error(`Integrity Violation: Expected 40 isolates, found ${isolates.length}`);
  }

  // 2. Microbial Group Distribution
  const taxaMap = new Map(taxa.map(t => [t.id, t]));
  const groupCounts = {};
  const riskCounts = {};
  let betaCount = 0;
  let alphaCount = 0;
  let gammaCount = 0;
  let gelatinaseCount = 0;
  let dnaseCount = 0;
  let totalVirulence = 0;
  let greenSheenEMBCount = 0;

  for (const iso of isolates) {
    const taxon = taxaMap.get(iso.taxonId);
    if (!taxon) {
      throw new Error(`Referential Integrity Violation: Isolate ${iso.isolateCode} references unknown taxon ${iso.taxonId}`);
    }

    // Microbial Group
    groupCounts[taxon.microbialGroup] = (groupCounts[taxon.microbialGroup] || 0) + 1;

    // Risk Classification
    riskCounts[taxon.riskClassification] = (riskCounts[taxon.riskClassification] || 0) + 1;

    // Virulence Assays
    if (iso.virulence.hemolysis === 'BETA') betaCount++;
    if (iso.virulence.hemolysis === 'ALPHA') alphaCount++;
    if (iso.virulence.hemolysis === 'GAMMA') gammaCount++;
    if (iso.virulence.gelatinase) gelatinaseCount++;
    if (iso.virulence.dnase) dnaseCount++;
    totalVirulence += iso.virulence.virulenceScore;

    // EMB Marker
    if (iso.morphology.greenMetallicSheenEMB) greenSheenEMBCount++;
  }

  const meanVirulence = (totalVirulence / isolates.length).toFixed(1);

  console.log('\n[1] Taxonomic & Risk Distribution:');
  for (const [group, count] of Object.entries(groupCounts)) {
    const pct = ((count / isolates.length) * 100).toFixed(1);
    console.log(`   • ${group.padEnd(35)}: ${count} isolates (${pct}%)`);
  }

  console.log('\n[2] Clinical Risk Classification:');
  for (const [risk, count] of Object.entries(riskCounts)) {
    const pct = ((count / isolates.length) * 100).toFixed(1);
    console.log(`   • ${risk.padEnd(35)}: ${count} isolates (${pct}%)`);
  }

  console.log('\n[3] In Vitro Virulence & Pathogenicity Indicators:');
  console.log(`   • Beta-Hemolysis (Complete RBC Lysis):  ${betaCount} / 40 (${((betaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`   • Alpha-Hemolysis (Partial Lysis):      ${alphaCount} / 40 (${((alphaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`   • Gamma-Hemolysis (No Lysis):           ${gammaCount} / 40 (${((gammaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`   • Gelatinase Proteolytic Liquefaction:  ${gelatinaseCount} / 40 (${((gelatinaseCount / 40) * 100).toFixed(1)}%)`);
  console.log(`   • DNase Degradation Positive:           ${dnaseCount} / 40 (${((dnaseCount / 40) * 100).toFixed(1)}%)`);
  console.log(`   • Green Sheen on EMB (E. coli Marker):  ${greenSheenEMBCount} isolates`);
  console.log(`   • Mean Computed Virulence Index:        ${meanVirulence} / 100`);

  console.log('\n======================================================');
  console.log('✅ ALL 40 ISOLATES VERIFIED WITH 100% REFERENTIAL INTEGRITY');
  console.log('======================================================\n');
}

verifyAndAnalyzeData();
