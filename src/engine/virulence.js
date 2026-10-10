/**
 * ==============================================================================
 * BIO-SURVEILLANCE & PATHOGEN VIRULENCE INDEX SCORING ENGINE
 * Author: Michael (CTO & Lead Engineer)
 * Reference: University of Ibadan Thesis (Dec 2024), Dr. K. Banwo Lab
 * ==============================================================================
 */

/**
 * Standard virulence weights based on microbiological pathogenicity standards:
 * - Complete Beta-Hemolysis (Pore-forming cytotoxins / RBC lysis): 50 points
 * - Alpha-Hemolysis (Partial RBC lysis / hydrogen peroxide oxidation): 20 points
 * - Extracellular DNase (Degrades host DNA nets / invasive virulence): 25 points
 * - Gelatinase (Proteolytic connective tissue degradation): 25 points
 * Max composite score = 100 points
 */
const VIRULENCE_WEIGHTS = {
  hemolysis: {
    BETA: 50,
    ALPHA: 20,
    GAMMA: 0,
  },
  dnase: 25,
  gelatinase: 25,
};

/**
 * Calculates the individual Virulence Score (0 - 100) for an isolate.
 * @param {Object} factors - { gelatinase: boolean, dnase: boolean, hemolysis: 'ALPHA'|'BETA'|'GAMMA' }
 * @returns {number} Score from 0 to 100
 */
function calculateVirulenceScore(factors) {
  let score = 0;

  if (factors.gelatinase) score += VIRULENCE_WEIGHTS.gelatinase;
  if (factors.dnase) score += VIRULENCE_WEIGHTS.dnase;

  const hemolysisScore = VIRULENCE_WEIGHTS.hemolysis[factors.hemolysis] || 0;
  score += hemolysisScore;

  return Math.min(score, 100);
}

/**
 * Categorizes a virulence score into qualitative clinical risk tiers.
 * @param {number} score - Virulence score (0 - 100)
 * @returns {string} Risk category
 */
function getRiskTier(score) {
  if (score >= 75) return 'CRITICAL_VIRULENCE';
  if (score >= 50) return 'HIGH_VIRULENCE';
  if (score >= 20) return 'MODERATE_VIRULENCE';
  return 'NEGLIGIBLE_VIRULENCE';
}

/**
 * Computes cohort-wide surveillance metrics across an array of isolates.
 * @param {Array} isolates - Array of isolate objects with virulence profiles
 * @returns {Object} Comprehensive surveillance analytics
 */
function computeSurveillanceSummary(isolates) {
  const total = isolates.length;
  if (total === 0) {
    return { total: 0, meanVirulenceIndex: 0 };
  }

  let betaCount = 0;
  let alphaCount = 0;
  let gammaCount = 0;
  let gelatinaseCount = 0;
  let dnaseCount = 0;
  let totalScore = 0;

  const tierDistribution = {
    CRITICAL_VIRULENCE: 0,
    HIGH_VIRULENCE: 0,
    MODERATE_VIRULENCE: 0,
    NEGLIGIBLE_VIRULENCE: 0,
  };

  const groupCounts = {};

  for (const iso of isolates) {
    const v = iso.virulence;
    const score = v.virulenceScore !== undefined ? v.virulenceScore : calculateVirulenceScore(v);
    totalScore += score;

    if (v.hemolysis === 'BETA') betaCount++;
    else if (v.hemolysis === 'ALPHA') alphaCount++;
    else if (v.hemolysis === 'GAMMA') gammaCount++;

    if (v.gelatinase) gelatinaseCount++;
    if (v.dnase) dnaseCount++;

    const tier = getRiskTier(score);
    tierDistribution[tier]++;

    const taxon = iso.taxon || {};
    const group = taxon.microbialGroup || 'Unclassified';
    groupCounts[group] = (groupCounts[group] || 0) + 1;
  }

  return {
    totalIsolates: total,
    meanVirulenceIndex: Number((totalScore / total).toFixed(2)),
    virulenceFactors: {
      betaHemolysis: { count: betaCount, percentage: Number(((betaCount / total) * 100).toFixed(1)) },
      alphaHemolysis: { count: alphaCount, percentage: Number(((alphaCount / total) * 100).toFixed(1)) },
      gammaHemolysis: { count: gammaCount, percentage: Number(((gammaCount / total) * 100).toFixed(1)) },
      gelatinaseLiquefaction: { count: gelatinaseCount, percentage: Number(((gelatinaseCount / total) * 100).toFixed(1)) },
      dnaseDegradation: { count: dnaseCount, percentage: Number(((dnaseCount / total) * 100).toFixed(1)) },
    },
    tierDistribution,
    groupDistribution: groupCounts,
    pathogenRiskPrevalence: Number((((betaCount + dnaseCount) / (total * 2)) * 100).toFixed(1)),
  };
}

module.exports = {
  calculateVirulenceScore,
  getRiskTier,
  computeSurveillanceSummary,
  VIRULENCE_WEIGHTS,
};
