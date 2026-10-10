# Wara Pathogen Surveillance System

Computational bio-surveillance platform and pathogen virulence index modeling microbiological safety data from traditional unpasteurized African dairy products (Wara soft cheese) in sub-Saharan urban food supply chains.

## Scientific and Architectural Overview

This platform models empirical phenotypic and biochemical assay records of 40 bacterial isolates recovered from Ojoo Market (Ibadan, Nigeria) into a normalized bio-surveillance engine:
- Epidemiological Context: Traditional soft cheese coagulated using Calotropis procera (Sodom apple) leaf extracts.
- Relational Domain Modeling: Referential integrity enforced across bacterial taxonomy, colonial morphology, 6 IMViC/biochemical assays, 8 carbohydrate fermentations, and in vitro virulence indicators.
- Pathogen Virulence Scoring Index: Computes a composite pathogenicity risk score (0 to 100) derived from beta-hemolytic red blood cell lysis, extracellular gelatinase liquefaction, and DNase degradation.
- Diagnostic Classification: Matches phenotypic reaction vectors to probable microbial taxa using standardized diagnostic keys.

## Relational Database Architecture

The schema partitions the biological domain into normalized entities:
- surveillance_samples: Sampling location, market, and collection metadata.
- microbial_taxa: Standardized genus and species catalog with clinical risk ratings.
- isolates: Core recovered strain entities (OW01 through OW40).
- isolate_morphologies: Colony margin, size, elevation, pigmentation, and EMB markers.
- isolate_biochemical_profiles: Oxidase, catalase, citrate, indole, methyl red, and Voges-Proskauer.
- isolate_sugar_fermentations: 8-carbohydrate metabolic profiling panel.
- isolate_virulence_factors: Gelatinase, DNase, blood agar hemolysis, and computed virulence score.

## Getting Started

### Prerequisites
- Node.js v18 or later

### Installation and Local Execution
```bash
git clone https://github.com/umeaclinton/wara-pathogen-surveillance.git
cd wara-pathogen-surveillance
npm start
```
Open http://localhost:3030 in your browser.

### Test Suite Execution
```bash
npm test
```

## Academic Attribution
- Research Lead: Udochukwu Michael Odoemenam (Department of Microbiology, Faculty of Science, University of Ibadan)
- Supervision: Dr. K. Banwo (Department of Microbiology, University of Ibadan)
- Reference: B.Sc. Research Thesis, December 2024
