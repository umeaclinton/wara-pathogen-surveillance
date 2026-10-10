/**
 * ==============================================================================
 * BIO-SURVEILLANCE INGESTION AUDIT AND VALIDATION
 * Author: Michael (Lead Software Engineer & Microbiologist)
 * Reference: University of Ibadan Thesis (Dec 2024), Dr. K. Banwo Lab
 * Runtime: Node.js (Standard Library)
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');

const SEED_FILE = path.join(__dirname, 'seed-data.json');

function verifyAndAnalyzeData() {
  console.log('Loading seed dataset from:', SEED_FILE);

  if (!fs.existsSync(SEED_FILE)) {
    console.error('Error: seed-data.json not found');
    process.exit(1);
  }

  const raw = fs.readFileSync(SEED_FILE, 'utf-8');
  const data = JSON.parse(raw);

  const { sample, taxa, isolates } = data;

  console.log('\n------------------------------------------------------');
  console.log('BIO-SURVEILLANCE INGESTION AUDIT AND VALIDATION REPORT');
  console.log('------------------------------------------------------');

  console.log(`Sampling Origin:      ${sample.foodProduct} (${sample.marketOrigin}, ${sample.city})`);
  console.log(`Cataloged Taxa:       ${taxa.length} Species`);
  console.log(`Total Isolates:       ${isolates.length} / 40 Strains`);

  if (isolates.length !== 40) {
    throw new Error(`Integrity Violation: Expected 40 isolates, found ${isolates.length}`);
  }

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

    groupCounts[taxon.microbialGroup] = (groupCounts[taxon.microbialGroup] || 0) + 1;
    riskCounts[taxon.riskClassification] = (riskCounts[taxon.riskClassification] || 0) + 1;

    if (iso.virulence.hemolysis === 'BETA') betaCount++;
    if (iso.virulence.hemolysis === 'ALPHA') alphaCount++;
    if (iso.virulence.hemolysis === 'GAMMA') gammaCount++;
    if (iso.virulence.gelatinase) gelatinaseCount++;
    if (iso.virulence.dnase) dnaseCount++;
    totalVirulence += iso.virulence.virulenceScore;

    if (iso.morphology.greenMetallicSheenEMB) greenSheenEMBCount++;
  }

  const meanVirulence = (totalVirulence / isolates.length).toFixed(1);

  console.log('\n[1] Taxonomic Distribution:');
  for (const [group, count] of Object.entries(groupCounts)) {
    const pct = ((count / isolates.length) * 100).toFixed(1);
    console.log(`  - ${group.padEnd(35)}: ${count} isolates (${pct}%)`);
  }

  console.log('\n[2] Clinical Risk Classification:');
  for (const [risk, count] of Object.entries(riskCounts)) {
    const pct = ((count / isolates.length) * 100).toFixed(1);
    console.log(`  - ${risk.padEnd(35)}: ${count} isolates (${pct}%)`);
  }

  console.log('\n[3] In Vitro Virulence Markers:');
  console.log(`  - Beta-Hemolysis (Complete RBC Lysis):  ${betaCount} / 40 (${((betaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`  - Alpha-Hemolysis (Partial Lysis):      ${alphaCount} / 40 (${((alphaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`  - Gamma-Hemolysis (No Lysis):           ${gammaCount} / 40 (${((gammaCount / 40) * 100).toFixed(1)}%)`);
  console.log(`  - Gelatinase Liquefaction:              ${gelatinaseCount} / 40 (${((gelatinaseCount / 40) * 100).toFixed(1)}%)`);
  console.log(`  - DNase Degradation Positive:           ${dnaseCount} / 40 (${((dnaseCount / 40) * 100).toFixed(1)}%)`);
  console.log(`  - Green Sheen on EMB (E. coli Marker):  ${greenSheenEMBCount} isolates`);
  console.log(`  - Mean Computed Virulence Index:        ${meanVirulence} / 100`);

  console.log('\n------------------------------------------------------');
  console.log('STATUS: All 40 isolates verified with referential integrity');
  console.log('------------------------------------------------------\n');
}

verifyAndAnalyzeData();
