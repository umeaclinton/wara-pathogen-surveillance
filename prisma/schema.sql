-- ==============================================================================
-- BIO-SURVEILLANCE & PATHOGEN RISK REGISTRY (WARA DAIRY SAFETY STUDY)
-- Author: Michael (Lead Software Engineer & Microbiologist)
-- Reference: University of Ibadan Thesis (Dec 2024), Dr. K. Banwo Lab
-- Standard: PostgreSQL 15+ / ANSI SQL with Domain Constraints & Referential Integrity
-- ==============================================================================

-- Drop tables in reverse dependency order if regenerating schema
DROP TABLE IF EXISTS isolate_virulence_factors CASCADE;
DROP TABLE IF EXISTS isolate_sugar_fermentations CASCADE;
DROP TABLE IF EXISTS isolate_biochemical_profiles CASCADE;
DROP TABLE IF EXISTS isolate_morphologies CASCADE;
DROP TABLE IF EXISTS isolates CASCADE;
DROP TABLE IF EXISTS microbial_taxa CASCADE;
DROP TABLE IF EXISTS surveillance_samples CASCADE;

-- Custom Enums for Domain Integrity
DROP TYPE IF EXISTS gram_stain_type CASCADE;
DROP TYPE IF EXISTS cellular_morphology_type CASCADE;
DROP TYPE IF EXISTS hemolysis_type CASCADE;
DROP TYPE IF EXISTS risk_classification_type CASCADE;
DROP TYPE IF EXISTS colony_margin_type CASCADE;
DROP TYPE IF EXISTS colony_elevation_type CASCADE;
DROP TYPE IF EXISTS colony_size_type CASCADE;

CREATE TYPE gram_stain_type AS ENUM ('GRAM_POSITIVE', 'GRAM_NEGATIVE');
CREATE TYPE cellular_morphology_type AS ENUM ('ROD', 'COCCI');
CREATE TYPE hemolysis_type AS ENUM ('ALPHA', 'BETA', 'GAMMA');
CREATE TYPE risk_classification_type AS ENUM ('BENEFICIAL_FERMENTER', 'POTENTIAL_PATHOGEN', 'OPPORTUNISTIC_PATHOGEN');
CREATE TYPE colony_margin_type AS ENUM ('ENTIRE', 'UNDULATE', 'LOBATE', 'SWARMING');
CREATE TYPE colony_elevation_type AS ENUM ('FLAT', 'CONVEX', 'RAISED', 'SPREADING');
CREATE TYPE colony_size_type AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- ------------------------------------------------------------------------------
-- 1. SURVEILLANCE SAMPLES (Sampling Context & Origin)
-- ------------------------------------------------------------------------------
CREATE TABLE surveillance_samples (
    id VARCHAR(32) PRIMARY KEY,
    food_product VARCHAR(100) NOT NULL DEFAULT 'Wara (African Soft Cheese)',
    coagulant VARCHAR(100) NOT NULL DEFAULT 'Calotropis procera (Sodom apple) leaf extract',
    market_origin VARCHAR(100) NOT NULL DEFAULT 'Ojoo Main Market',
    city VARCHAR(64) NOT NULL DEFAULT 'Ibadan',
    state VARCHAR(64) NOT NULL DEFAULT 'Oyo State',
    country VARCHAR(64) NOT NULL DEFAULT 'Nigeria',
    pasteurized BOOLEAN NOT NULL DEFAULT FALSE,
    collection_date DATE NOT NULL DEFAULT '2024-10-15',
    storage_temp_celsius NUMERIC(4, 1) DEFAULT 4.0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE surveillance_samples IS 'Captures the epidemiological field collection metadata for dairy samples.';

-- ------------------------------------------------------------------------------
-- 2. MICROBIAL TAXONOMY (Taxonomic Classification & Pathogenicity Baseline)
-- ------------------------------------------------------------------------------
CREATE TABLE microbial_taxa (
    id VARCHAR(64) PRIMARY KEY,
    scientific_name VARCHAR(120) NOT NULL UNIQUE,
    genus VARCHAR(60) NOT NULL,
    species VARCHAR(60) NOT NULL,
    microbial_group VARCHAR(80) NOT NULL,
    risk_classification risk_classification_type NOT NULL,
    primary_health_implication TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

COMMENT ON TABLE microbial_taxa IS 'Standardized reference taxonomy for confirmed bacterial species.';

-- ------------------------------------------------------------------------------
-- 3. BACTERIAL ISOLATES (Core Entity for Recovered Strains)
-- ------------------------------------------------------------------------------
CREATE TABLE isolates (
    isolate_code VARCHAR(16) PRIMARY KEY, -- e.g. 'OW01', 'OW08'
    sample_id VARCHAR(32) NOT NULL REFERENCES surveillance_samples(id) ON DELETE RESTRICT,
    taxon_id VARCHAR(64) NOT NULL REFERENCES microbial_taxa(id) ON DELETE RESTRICT,
    gram_stain gram_stain_type NOT NULL,
    cellular_morphology cellular_morphology_type NOT NULL,
    isolation_dilution VARCHAR(16) DEFAULT '10^-4 to 10^-6',
    isolation_media VARCHAR(120) NOT NULL DEFAULT 'Nutrient Agar / EMB / MRS Agar',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_isolates_taxon ON isolates(taxon_id);
CREATE INDEX idx_isolates_sample ON isolates(sample_id);
COMMENT ON TABLE isolates IS 'Individual pure-culture bacterial isolates recovered from samples.';

-- ------------------------------------------------------------------------------
-- 4. MORPHOLOGICAL PHENOTYPES (Colonial Traits)
-- ------------------------------------------------------------------------------
CREATE TABLE isolate_morphologies (
    isolate_code VARCHAR(16) PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
    colony_margin colony_margin_type NOT NULL,
    colony_size colony_size_type NOT NULL,
    colony_elevation colony_elevation_type NOT NULL,
    surface_texture VARCHAR(40) NOT NULL, -- 'Glossy', 'Dull', 'Rough'
    pigmentation VARCHAR(60) NOT NULL,    -- 'White', 'Golden/yellow', 'Green Sheen'
    green_metallic_sheen_emb BOOLEAN NOT NULL DEFAULT FALSE,
    swarming_motility BOOLEAN NOT NULL DEFAULT FALSE
);

COMMENT ON TABLE isolate_morphologies IS 'Phenotypic and macroscopic cultural characteristics on selective/differential media.';

-- ------------------------------------------------------------------------------
-- 5. BIOCHEMICAL PROFILES (Enzymatic & Metabolic Assays)
-- ------------------------------------------------------------------------------
CREATE TABLE isolate_biochemical_profiles (
    isolate_code VARCHAR(16) PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
    oxidase BOOLEAN NOT NULL,
    catalase BOOLEAN NOT NULL,
    citrate_utilization BOOLEAN NOT NULL,
    indole_production BOOLEAN NOT NULL,
    methyl_red BOOLEAN NOT NULL,
    voges_proskauer BOOLEAN NOT NULL
);

COMMENT ON TABLE isolate_biochemical_profiles IS 'Standard diagnostic biochemical assay profiles (IMViC, catalase, oxidase).';

-- ------------------------------------------------------------------------------
-- 6. SUGAR FERMENTATION PROFILES (Phenol Red Broth Carbohydrate Panel)
-- ------------------------------------------------------------------------------
CREATE TABLE isolate_sugar_fermentations (
    isolate_code VARCHAR(16) PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
    glucose BOOLEAN NOT NULL,
    maltose BOOLEAN NOT NULL,
    sucrose BOOLEAN NOT NULL,
    lactose BOOLEAN NOT NULL,
    fructose BOOLEAN NOT NULL,
    galactose BOOLEAN NOT NULL,
    mannitol BOOLEAN NOT NULL,
    sorbitol BOOLEAN NOT NULL,
    fermentation_summary VARCHAR(100) -- e.g. 'Active Acid Producer', 'Oxidative / Non-Fermenter'
);

COMMENT ON TABLE isolate_sugar_fermentations IS '8-carbohydrate metabolic fermentation panel.';

-- ------------------------------------------------------------------------------
-- 7. VIRULENCE FACTORS & SAFETY ASSESSMENT
-- ------------------------------------------------------------------------------
CREATE TABLE isolate_virulence_factors (
    isolate_code VARCHAR(16) PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
    gelatinase BOOLEAN NOT NULL,
    dnase BOOLEAN NOT NULL,
    hemolysis hemolysis_type NOT NULL,
    virulence_score INTEGER GENERATED ALWAYS AS (
        (CASE WHEN gelatinase THEN 25 ELSE 0 END) +
        (CASE WHEN dnase THEN 25 ELSE 0 END) +
        (CASE WHEN hemolysis = 'BETA' THEN 50 WHEN hemolysis = 'ALPHA' THEN 20 ELSE 0 END)
    ) STORED
);

CREATE INDEX idx_virulence_score ON isolate_virulence_factors(virulence_score);
CREATE INDEX idx_virulence_hemolysis ON isolate_virulence_factors(hemolysis);
COMMENT ON TABLE isolate_virulence_factors IS 'In vitro virulence phenotypes with automated computed risk index (0-100).';

-- ==============================================================================
-- ANALYTICAL VIEW: UNIFIED BIO-SURVEILLANCE REGISTRY
-- Combines all modular tables into a clean, query-ready view for REST APIs
-- ==============================================================================
CREATE OR REPLACE VIEW view_surveillance_registry AS
SELECT 
    i.isolate_code,
    s.market_origin,
    s.city,
    t.scientific_name,
    t.microbial_group,
    t.risk_classification,
    i.gram_stain,
    i.cellular_morphology,
    m.colony_size,
    m.colony_margin,
    m.pigmentation,
    m.green_metallic_sheen_emb,
    b.catalase,
    b.oxidase,
    b.indole_production,
    b.citrate_utilization,
    b.methyl_red,
    b.voges_proskauer,
    sf.glucose AS ferments_glucose,
    sf.lactose AS ferments_lactose,
    sf.sucrose AS ferments_sucrose,
    v.gelatinase,
    v.dnase,
    v.hemolysis,
    v.virulence_score
FROM isolates i
JOIN surveillance_samples s ON i.sample_id = s.id
JOIN microbial_taxa t ON i.taxon_id = t.id
JOIN isolate_morphologies m ON i.isolate_code = m.isolate_code
JOIN isolate_biochemical_profiles b ON i.isolate_code = b.isolate_code
JOIN isolate_sugar_fermentations sf ON i.isolate_code = sf.isolate_code
JOIN isolate_virulence_factors v ON i.isolate_code = v.isolate_code;
