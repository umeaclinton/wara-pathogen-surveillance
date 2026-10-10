# Wara Pathogen Surveillance System (WaraBio-Surveillance)

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-ORM-2D3748)](https://www.prisma.io/)
[![Next.js 14](https://img.shields.io/badge/Next.js-14_App_Router-black)](https://nextjs.org/)

An enterprise-grade computational bio-surveillance platform and pathogen virulence index modeling microbiological safety data from traditional unpasteurized African dairy products (*Wara* soft cheese) in sub-Saharan urban food supply chains.

---

## 🔬 Scientific & Architectural Overview

This platform transforms empirical phenotypic and biochemical assay records of 40 bacterial isolates recovered from Ojoo Market (Ibadan, Nigeria) into a normalized, query-ready bio-surveillance engine:
- **Epidemiological Context:** Traditional soft cheese coagulated using *Calotropis procera* (Sodom apple) leaf extracts.
- **Relational Domain Modeling:** Enforces referential integrity between bacterial taxonomy, colonial morphology, 6 IMViC/biochemical assays, 8 carbohydrate fermentations, and in vitro virulence indicators.
- **Pathogen Virulence Scoring Index:** Computes a composite pathogenicity risk score ($0 - 100$) derived from $\beta$-hemolytic red blood cell lysis, extracellular gelatinase liquefaction, and DNase degradation.
- **Automated Diagnostic Tree:** Matches unknown phenotypic reaction vectors to probable microbial taxa with statistical confidence.

---

## 🗄️ Relational Database Architecture

The data layer is managed with **Prisma ORM** and **PostgreSQL**:
- `surveillance_samples`: Sampling site, coagulant type, and chain-of-custody data.
- `microbial_taxa`: Standardized genus/species reference catalog with clinical risk ratings.
- `isolates`: Core recovered strain entities (`OW01` – `OW40`).
- `isolate_morphologies`: Colony margin, size, elevation, pigmentation, and EMB green sheen.
- `isolate_biochemical_profiles`: Oxidase, catalase, citrate, indole, methyl red, and Voges-Proskauer.
- `isolate_sugar_fermentations`: 8-carbohydrate metabolic profiling panel.
- `isolate_virulence_factors`: Gelatinase, DNase, blood agar hemolysis, and computed virulence score.

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ or v20+
- PostgreSQL or SQLite (for zero-config local prototyping)

### Setup
```bash
# Clone the repository
git clone https://github.com/umeaclinton/wara-pathogen-surveillance.git

# Install dependencies
npm install

# Run database migrations
npx prisma migrate dev --name init

# Seed database with the 40 verified isolates
npm run db:seed

# Start development server
npm run dev
```

---

## 📄 License & Academic Attribution
- **Research Lead:** Udochukwu Michael Odoemenam (B.Sc. Microbiology, University of Ibadan)
- **Supervision:** Dr. K. Banwo (Department of Microbiology, University of Ibadan)
- **Open-Access DOI:** Zenodo Preprint (Pending Assignment)
