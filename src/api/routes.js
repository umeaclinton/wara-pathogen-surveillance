/**
 * ==============================================================================
 * BIO-SURVEILLANCE REST API ROUTE HANDLERS
 * Author: Michael (CTO & Lead Engineer)
 * Provides unified, clean service handlers for isolates, metrics, and diagnostics
 * ==============================================================================
 */

const fs = require('fs');
const path = require('path');
const { computeSurveillanceSummary, calculateVirulenceScore, getRiskTier } = require('../engine/virulence');
const { diagnoseUnknownIsolate } = require('../engine/diagnostics');

// Load canonical in-memory repository
const seedPath = path.join(__dirname, '..', '..', 'prisma', 'seed-data.json');
const rawData = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));

const taxaMap = new Map(rawData.taxa.map((t) => [t.id, t]));

const hydratedIsolates = rawData.isolates.map((iso) => {
  const taxon = taxaMap.get(iso.taxonId);
  const vScore = iso.virulence.virulenceScore !== undefined ? iso.virulence.virulenceScore : calculateVirulenceScore(iso.virulence);
  return {
    ...iso,
    taxon,
    virulence: {
      ...iso.virulence,
      virulenceScore: vScore,
      riskTier: getRiskTier(vScore),
    },
  };
});

/**
 * Controller: GET /api/isolates
 * Supports filtering by group, risk, hemolysis, and search query
 */
function getIsolatesHandler(query = {}) {
  let results = [...hydratedIsolates];

  if (query.group) {
    results = results.filter((i) => i.taxon?.microbialGroup?.toLowerCase().includes(query.group.toLowerCase()));
  }

  if (query.risk) {
    results = results.filter((i) => i.taxon?.riskClassification === query.risk);
  }

  if (query.hemolysis) {
    results = results.filter((i) => i.virulence?.hemolysis === query.hemolysis.toUpperCase());
  }

  if (query.search) {
    const s = query.search.toLowerCase();
    results = results.filter(
      (i) =>
        i.isolateCode.toLowerCase().includes(s) ||
        i.taxon?.scientificName.toLowerCase().includes(s) ||
        i.taxon?.microbialGroup.toLowerCase().includes(s)
    );
  }

  return {
    total: results.length,
    isolates: results,
  };
}

/**
 * Controller: GET /api/isolates/:code
 */
function getIsolateByCodeHandler(code) {
  const isolate = hydratedIsolates.find((i) => i.isolateCode.toUpperCase() === code.toUpperCase());
  if (!isolate) {
    return { error: `Isolate '${code}' not found`, statusCode: 404 };
  }
  return { isolate };
}

/**
 * Controller: GET /api/surveillance/summary
 */
function getSurveillanceSummaryHandler() {
  const summary = computeSurveillanceSummary(hydratedIsolates);
  return {
    sample: rawData.sample,
    summary,
  };
}

/**
 * Controller: POST /api/diagnose
 */
function diagnoseHandler(input) {
  if (!input || typeof input !== 'object') {
    return { error: 'Payload must be an assay trait object', statusCode: 400 };
  }

  const matches = diagnoseUnknownIsolate(input);
  return {
    inputTraitsEvaluated: Object.keys(input),
    topMatch: matches[0] || null,
    candidateRankings: matches.slice(0, 5),
  };
}

module.exports = {
  getIsolatesHandler,
  getIsolateByCodeHandler,
  getSurveillanceSummaryHandler,
  diagnoseHandler,
  hydratedIsolates,
};
