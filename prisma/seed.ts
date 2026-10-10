import { PrismaClient, GramStain, CellularShape, HemolysisType, RiskClass, ColonyMargin, ColonySize, ColonyElevation } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

interface SeedTaxon {
  id: string;
  scientificName: string;
  genus: string;
  species: string;
  microbialGroup: string;
  riskClassification: keyof typeof RiskClass;
  healthImplications?: string;
}

interface SeedSample {
  id: string;
  foodProduct: string;
  coagulant: string;
  marketOrigin: string;
  city: string;
  state: string;
  country: string;
  pasteurized: boolean;
  collectionDate: string;
}

interface SeedIsolate {
  isolateCode: string;
  taxonId: string;
  gramStain: keyof typeof GramStain;
  cellularShape: keyof typeof CellularShape;
  morphology: {
    colonyMargin: keyof typeof ColonyMargin;
    colonySize: keyof typeof ColonySize;
    colonyElevation: keyof typeof ColonyElevation;
    surfaceTexture: string;
    pigmentation: string;
    greenMetallicSheenEMB: boolean;
    swarmingMotility: boolean;
  };
  biochemical: {
    oxidase: boolean;
    catalase: boolean;
    citrateUtilization: boolean;
    indoleProduction: boolean;
    methylRed: boolean;
    vogesProskauer: boolean;
  };
  fermentation: {
    glucose: boolean;
    maltose: boolean;
    sucrose: boolean;
    lactose: boolean;
    fructose: boolean;
    galactose: boolean;
    mannitol: boolean;
    sorbitol: boolean;
  };
  virulence: {
    gelatinase: boolean;
    dnase: boolean;
    hemolysis: keyof typeof HemolysisType;
    virulenceScore: number;
  };
}

interface SeedDataPayload {
  sample: SeedSample;
  taxa: SeedTaxon[];
  isolates: SeedIsolate[];
}

async function main() {
  console.log('🚀 Starting Bio-Surveillance Data Ingestion...');

  const dataPath = path.join(__dirname, 'seed-data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const payload: SeedDataPayload = JSON.parse(rawData);

  // 1. Upsert Sample Origin
  console.log(`📦 Upserting Surveillance Sample: ${payload.sample.id}`);
  await prisma.surveillanceSample.upsert({
    where: { id: payload.sample.id },
    update: {},
    create: {
      id: payload.sample.id,
      foodProduct: payload.sample.foodProduct,
      coagulant: payload.sample.coagulant,
      marketOrigin: payload.sample.marketOrigin,
      city: payload.sample.city,
      state: payload.sample.state,
      country: payload.sample.country,
      pasteurized: payload.sample.pasteurized,
      collectionDate: new Date(payload.sample.collectionDate),
    },
  });

  // 2. Upsert Microbial Reference Taxa
  console.log(`🧬 Upserting ${payload.taxa.length} Reference Taxa...`);
  for (const taxon of payload.taxa) {
    await prisma.microbialTaxon.upsert({
      where: { id: taxon.id },
      update: {},
      create: {
        id: taxon.id,
        scientificName: taxon.scientificName,
        genus: taxon.genus,
        species: taxon.species,
        microbialGroup: taxon.microbialGroup,
        riskClassification: RiskClass[taxon.riskClassification],
        healthImplications: taxon.healthImplications,
      },
    });
  }

  // 3. Upsert Isolates & Child Assay Profiles
  console.log(`🔬 Ingesting ${payload.isolates.length} Isolates and Assay Matrices...`);
  for (const iso of payload.isolates) {
    // Upsert core Isolate entity
    await prisma.isolate.upsert({
      where: { isolateCode: iso.isolateCode },
      update: {},
      create: {
        isolateCode: iso.isolateCode,
        sampleId: payload.sample.id,
        taxonId: iso.taxonId,
        gramStain: GramStain[iso.gramStain],
        cellularShape: CellularShape[iso.cellularShape],
      },
    });

    // Upsert Morphology
    await prisma.isolateMorphology.upsert({
      where: { isolateCode: iso.isolateCode },
      update: {},
      create: {
        isolateCode: iso.isolateCode,
        colonyMargin: ColonyMargin[iso.morphology.colonyMargin],
        colonySize: ColonySize[iso.morphology.colonySize],
        colonyElevation: ColonyElevation[iso.morphology.colonyElevation],
        surfaceTexture: iso.morphology.surfaceTexture,
        pigmentation: iso.morphology.pigmentation,
        greenMetallicSheenEMB: iso.morphology.greenMetallicSheenEMB,
        swarmingMotility: iso.morphology.swarmingMotility,
      },
    });

    // Upsert Biochemical Profile
    await prisma.isolateBiochemical.upsert({
      where: { isolateCode: iso.isolateCode },
      update: {},
      create: {
        isolateCode: iso.isolateCode,
        oxidase: iso.biochemical.oxidase,
        catalase: iso.biochemical.catalase,
        citrateUtilization: iso.biochemical.citrateUtilization,
        indoleProduction: iso.biochemical.indoleProduction,
        methylRed: iso.biochemical.methylRed,
        vogesProskauer: iso.biochemical.vogesProskauer,
      },
    });

    // Upsert Sugar Fermentations
    await prisma.isolateFermentation.upsert({
      where: { isolateCode: iso.isolateCode },
      update: {},
      create: {
        isolateCode: iso.isolateCode,
        glucose: iso.fermentation.glucose,
        maltose: iso.fermentation.maltose,
        sucrose: iso.fermentation.sucrose,
        lactose: iso.fermentation.lactose,
        fructose: iso.fermentation.fructose,
        galactose: iso.fermentation.galactose,
        mannitol: iso.fermentation.mannitol,
        sorbitol: iso.fermentation.sorbitol,
      },
    });

    // Upsert Virulence Factors
    await prisma.isolateVirulence.upsert({
      where: { isolateCode: iso.isolateCode },
      update: {},
      create: {
        isolateCode: iso.isolateCode,
        gelatinase: iso.virulence.gelatinase,
        dnase: iso.virulence.dnase,
        hemolysis: HemolysisType[iso.virulence.hemolysis],
        virulenceScore: iso.virulence.virulenceScore,
      },
    });
  }

  // 4. Data Integrity Verification
  const totalIsolates = await prisma.isolate.count();
  const totalTaxa = await prisma.microbialTaxon.count();
  const betaHemolytic = await prisma.isolateVirulence.count({
    where: { hemolysis: 'BETA' },
  });

  console.log('\n==========================================');
  console.log('✅ INGESTION COMPLETED SUCCESSFULLY');
  console.log(`📊 Total Strains Ingested: ${totalIsolates} / 40`);
  console.log(`🧬 Reference Taxa Active: ${totalTaxa}`);
  console.log(`⚠️ Beta-Hemolytic Isolates: ${betaHemolytic} (${((betaHemolytic / totalIsolates) * 100).toFixed(1)}%)`);
  console.log('==========================================\n');
}

main()
  .catch((e) => {
    console.error('❌ Ingestion Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
