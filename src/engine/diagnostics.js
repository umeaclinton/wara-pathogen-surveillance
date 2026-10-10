/**
 * ==============================================================================
 * BIOCHEMICAL DIAGNOSTIC CLASSIFICATION ENGINE
 * Author: Michael (CTO & Lead Engineer)
 * Reference: Bergey's Manual of Determinative Bacteriology & Cheesbrough (2006)
 * ==============================================================================
 */

/**
 * Standard reference phenotypic profiles extracted from the thesis cohort.
 * Used as ground-truth diagnostic signatures.
 */
const REFERENCE_SIGNATURES = [
  {
    taxonId: 'TAX-E-COLI',
    scientificName: 'Escherichia coli',
    microbialGroup: 'Enterobacteriaceae',
    riskClassification: 'POTENTIAL_PATHOGEN',
    traits: {
      gramStain: 'GRAM_NEGATIVE',
      cellularShape: 'ROD',
      oxidase: false,
      catalase: true,
      citrateUtilization: false,
      indoleProduction: true,
      methylRed: true,
      vogesProskauer: false,
      glucose: true,
      lactose: true,
      maltose: true,
      greenMetallicSheenEMB: true,
    },
    weightOverrides: {
      greenMetallicSheenEMB: 3.0, // High-specificity pathognomonic marker on EMB agar
      indoleProduction: 2.0,      // Classical E. coli IMViC (+ -)
      oxidase: 2.0,
    },
  },
  {
    taxonId: 'TAX-SALMONELLA-SPP',
    scientificName: 'Salmonella spp.',
    microbialGroup: 'Enterobacteriaceae',
    riskClassification: 'POTENTIAL_PATHOGEN',
    traits: {
      gramStain: 'GRAM_NEGATIVE',
      cellularShape: 'ROD',
      oxidase: false,
      catalase: true,
      citrateUtilization: true,
      indoleProduction: false,
      methylRed: true,
      vogesProskauer: false,
      glucose: true,
      lactose: false, // Classical non-lactose fermenter
    },
    weightOverrides: {
      lactose: 2.5,
      oxidase: 2.0,
      indoleProduction: 2.0,
    },
  },
  {
    taxonId: 'TAX-P-MIRABILIS',
    scientificName: 'Proteus mirabilis',
    microbialGroup: 'Enterobacteriaceae',
    riskClassification: 'OPPORTUNISTIC_PATHOGEN',
    traits: {
      gramStain: 'GRAM_NEGATIVE',
      cellularShape: 'ROD',
      oxidase: false,
      catalase: true,
      citrateUtilization: false,
      indoleProduction: true,
      methylRed: true,
      vogesProskauer: false,
      swarmingMotility: true, // Pathognomonic swarming trait
    },
    weightOverrides: {
      swarmingMotility: 3.5,
      oxidase: 2.0,
    },
  },
  {
    taxonId: 'TAX-P-AERUGINOSA',
    scientificName: 'Pseudomonas aeruginosa',
    microbialGroup: 'Non-Fermenting Gram-Negative Bacteria',
    riskClassification: 'OPPORTUNISTIC_PATHOGEN',
    traits: {
      gramStain: 'GRAM_NEGATIVE',
      cellularShape: 'ROD',
      oxidase: true,  // Distinctive positive oxidase among Gram-negatives
      catalase: true,
      citrateUtilization: true,
      indoleProduction: false,
      glucose: false, // Non-fermenter (oxidative)
      lactose: false,
    },
    weightOverrides: {
      oxidase: 3.0,
      glucose: 2.0,
    },
  },
  {
    taxonId: 'TAX-S-AUREUS',
    scientificName: 'Staphylococcus aureus',
    microbialGroup: 'Staphylococci',
    riskClassification: 'POTENTIAL_PATHOGEN',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'COCCI',
      oxidase: false,
      catalase: true, // Catalase-positive differentiates from Streptococcus
      mannitol: true, // Ferments mannitol (Mannitol Salt Agar marker)
      dnase: true,    // Virulence hallmark
      vogesProskauer: true,
    },
    weightOverrides: {
      cellularShape: 2.0,
      catalase: 2.5,
      mannitol: 2.5,
    },
  },
  {
    taxonId: 'TAX-B-CEREUS',
    scientificName: 'Bacillus cereus',
    microbialGroup: 'Endospore-Forming Bacilli',
    riskClassification: 'POTENTIAL_PATHOGEN',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'ROD',
      oxidase: true,
      catalase: true,
      citrateUtilization: true,
      gelatinase: true, // Strongly proteolytic
      dnase: true,
      hemolysis: 'BETA',
    },
    weightOverrides: {
      gramStain: 2.5,
      cellularShape: 2.0,
      catalase: 2.0,
    },
  },
  {
    taxonId: 'TAX-B-SUBTILIS',
    scientificName: 'Bacillus subtilis',
    microbialGroup: 'Endospore-Forming Bacilli',
    riskClassification: 'BENEFICIAL_FERMENTER',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'ROD',
      oxidase: true,
      catalase: true,
      citrateUtilization: true,
      gelatinase: true,
      hemolysis: 'BETA',
    },
    weightOverrides: {
      gramStain: 2.5,
      cellularShape: 2.0,
    },
  },
  {
    taxonId: 'TAX-L-PLANTARUM',
    scientificName: 'Lactobacillus plantarum',
    microbialGroup: 'Lactic Acid Bacteria (LAB)',
    riskClassification: 'BENEFICIAL_FERMENTER',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'ROD',
      oxidase: false,
      catalase: false, // Catalase-negative LAB hallmark
      lactose: true,
      glucose: true,
    },
    weightOverrides: {
      catalase: 3.0,
      gramStain: 2.5,
      cellularShape: 2.0,
    },
  },
  {
    taxonId: 'TAX-L-FERMENTUM',
    scientificName: 'Lactobacillus fermentum',
    microbialGroup: 'Lactic Acid Bacteria (LAB)',
    riskClassification: 'BENEFICIAL_FERMENTER',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'ROD',
      oxidase: false,
      catalase: false,
      glucose: true,
    },
    weightOverrides: {
      catalase: 3.0,
      gramStain: 2.5,
    },
  },
  {
    taxonId: 'TAX-E-FAECALIS',
    scientificName: 'Enterococcus faecalis',
    microbialGroup: 'Lactic Acid Bacteria (LAB)',
    riskClassification: 'OPPORTUNISTIC_PATHOGEN',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'COCCI',
      oxidase: false,
      catalase: false,
      lactose: true,
      glucose: true,
    },
    weightOverrides: {
      cellularShape: 2.5,
      catalase: 2.5,
    },
  },
  {
    taxonId: 'TAX-S-THERMOPHILUS',
    scientificName: 'Streptococcus thermophilus',
    microbialGroup: 'Lactic Acid Bacteria (LAB)',
    riskClassification: 'BENEFICIAL_FERMENTER',
    traits: {
      gramStain: 'GRAM_POSITIVE',
      cellularShape: 'COCCI',
      oxidase: false,
      catalase: false,
      lactose: true,
      glucose: true,
    },
    weightOverrides: {
      cellularShape: 2.5,
      catalase: 2.5,
    },
  },
];

/**
 * Evaluates an unknown test input vector and ranks matching candidate species with confidence scores.
 * @param {Object} input - Laboratory assay inputs (Gram, morphology, biochemical, sugar tests)
 * @returns {Array} Ranked candidate species with percentage match and matching traits
 */
function diagnoseUnknownIsolate(input) {
  const results = [];

  for (const ref of REFERENCE_SIGNATURES) {
    let matchedWeight = 0;
    let totalWeight = 0;
    const matchingTraits = [];
    const mismatchingTraits = [];

    // Compare available input traits against reference signature
    for (const [trait, expectedValue] of Object.entries(ref.traits)) {
      if (input[trait] !== undefined && input[trait] !== null) {
        const weight = (ref.weightOverrides && ref.weightOverrides[trait]) || 1.0;
        totalWeight += weight;

        if (input[trait] === expectedValue) {
          matchedWeight += weight;
          matchingTraits.push(trait);
        } else {
          mismatchingTraits.push({ trait, expected: expectedValue, provided: input[trait] });
        }
      }
    }

    if (totalWeight > 0) {
      const confidence = Number(((matchedWeight / totalWeight) * 100).toFixed(1));
      results.push({
        taxonId: ref.taxonId,
        scientificName: ref.scientificName,
        microbialGroup: ref.microbialGroup,
        riskClassification: ref.riskClassification,
        confidencePercentage: confidence,
        matchedWeight: Number(matchedWeight.toFixed(2)),
        totalEvaluatedWeight: Number(totalWeight.toFixed(2)),
        matchingTraits,
        mismatchingTraits,
      });
    }
  }

  // Sort descending by confidence
  results.sort((a, b) => b.confidencePercentage - a.confidencePercentage);
  return results;
}

module.exports = {
  diagnoseUnknownIsolate,
  REFERENCE_SIGNATURES,
};
