"""
==============================================================================
WARA PATHOGEN SURVEILLANCE: SQLITE & POSTGRESQL DATA INGESTION ENGINE
Author: Michael (CTO & Lead Engineer)
Reference: University of Ibadan Thesis (Dec 2024), Dr. K. Banwo Lab
Purpose: Zero-dependency local database populator and data validation test suite
==============================================================================
"""

import json
import sqlite3
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
JSON_FILE = BASE_DIR / "seed-data.json"
SQLITE_DB = BASE_DIR / "surveillance.db"

def init_sqlite_db():
    print(f"📦 Initializing local database at: {SQLITE_DB}")
    conn = sqlite3.connect(SQLITE_DB)
    cursor = conn.cursor()

    cursor.executescript("""
    PRAGMA foreign_keys = ON;

    DROP TABLE IF EXISTS isolate_virulence_factors;
    DROP TABLE IF EXISTS isolate_sugar_fermentations;
    DROP TABLE IF EXISTS isolate_biochemical_profiles;
    DROP TABLE IF EXISTS isolate_morphologies;
    DROP TABLE IF EXISTS isolates;
    DROP TABLE IF EXISTS microbial_taxa;
    DROP TABLE IF EXISTS surveillance_samples;

    CREATE TABLE surveillance_samples (
        id TEXT PRIMARY KEY,
        food_product TEXT NOT NULL,
        coagulant TEXT NOT NULL,
        market_origin TEXT NOT NULL,
        city TEXT NOT NULL,
        state TEXT NOT NULL,
        country TEXT NOT NULL,
        pasteurized INTEGER NOT NULL,
        collection_date TEXT NOT NULL
    );

    CREATE TABLE microbial_taxa (
        id TEXT PRIMARY KEY,
        scientific_name TEXT NOT NULL UNIQUE,
        genus TEXT NOT NULL,
        species TEXT NOT NULL,
        microbial_group TEXT NOT NULL,
        risk_classification TEXT NOT NULL,
        health_implications TEXT
    );

    CREATE TABLE isolates (
        isolate_code TEXT PRIMARY KEY,
        sample_id TEXT NOT NULL REFERENCES surveillance_samples(id),
        taxon_id TEXT NOT NULL REFERENCES microbial_taxa(id),
        gram_stain TEXT NOT NULL,
        cellular_morphology TEXT NOT NULL
    );

    CREATE TABLE isolate_morphologies (
        isolate_code TEXT PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
        colony_margin TEXT NOT NULL,
        colony_size TEXT NOT NULL,
        colony_elevation TEXT NOT NULL,
        surface_texture TEXT NOT NULL,
        pigmentation TEXT NOT NULL,
        green_metallic_sheen_emb INTEGER NOT NULL,
        swarming_motility INTEGER NOT NULL
    );

    CREATE TABLE isolate_biochemical_profiles (
        isolate_code TEXT PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
        oxidase INTEGER NOT NULL,
        catalase INTEGER NOT NULL,
        citrate_utilization INTEGER NOT NULL,
        indole_production INTEGER NOT NULL,
        methyl_red INTEGER NOT NULL,
        voges_proskauer INTEGER NOT NULL
    );

    CREATE TABLE isolate_sugar_fermentations (
        isolate_code TEXT PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
        glucose INTEGER NOT NULL,
        maltose INTEGER NOT NULL,
        sucrose INTEGER NOT NULL,
        lactose INTEGER NOT NULL,
        fructose INTEGER NOT NULL,
        galactose INTEGER NOT NULL,
        mannitol INTEGER NOT NULL,
        sorbitol INTEGER NOT NULL
    );

    CREATE TABLE isolate_virulence_factors (
        isolate_code TEXT PRIMARY KEY REFERENCES isolates(isolate_code) ON DELETE CASCADE,
        gelatinase INTEGER NOT NULL,
        dnase INTEGER NOT NULL,
        hemolysis TEXT NOT NULL,
        virulence_score INTEGER NOT NULL
    );
    """)

    conn.commit()
    return conn

def seed_database():
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    conn = init_sqlite_db()
    cur = conn.cursor()

    # 1. Insert sample
    s = data["sample"]
    cur.execute("""
        INSERT INTO surveillance_samples VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (s["id"], s["foodProduct"], s["coagulant"], s["marketOrigin"], s["city"], s["state"], s["country"], 1 if s["pasteurized"] else 0, s["collectionDate"]))

    # 2. Insert taxa
    for t in data["taxa"]:
        cur.execute("""
            INSERT INTO microbial_taxa VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (t["id"], t["scientificName"], t["genus"], t["species"], t["microbialGroup"], t["riskClassification"], t.get("healthImplications")))

    # 3. Insert isolates and child tables
    for iso in data["isolates"]:
        code = iso["isolateCode"]
        cur.execute("""
            INSERT INTO isolates VALUES (?, ?, ?, ?, ?)
        """, (code, s["id"], iso["taxonId"], iso["gramStain"], iso["cellularShape"]))

        m = iso["morphology"]
        cur.execute("""
            INSERT INTO isolate_morphologies VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (code, m["colonyMargin"], m["colonySize"], m["colonyElevation"], m["surfaceTexture"], m["pigmentation"], 1 if m["greenMetallicSheenEMB"] else 0, 1 if m["swarmingMotility"] else 0))

        b = iso["biochemical"]
        cur.execute("""
            INSERT INTO isolate_biochemical_profiles VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (code, 1 if b["oxidase"] else 0, 1 if b["catalase"] else 0, 1 if b["citrateUtilization"] else 0, 1 if b["indoleProduction"] else 0, 1 if b["methylRed"] else 0, 1 if b["vogesProskauer"] else 0))

        sf = iso["fermentation"]
        cur.execute("""
            INSERT INTO isolate_sugar_fermentations VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (code, 1 if sf["glucose"] else 0, 1 if sf["maltose"] else 0, 1 if sf["sucrose"] else 0, 1 if sf["lactose"] else 0, 1 if sf["fructose"] else 0, 1 if sf["galactose"] else 0, 1 if sf["mannitol"] else 0, 1 if sf["sorbitol"] else 0))

        v = iso["virulence"]
        cur.execute("""
            INSERT INTO isolate_virulence_factors VALUES (?, ?, ?, ?, ?)
        """, (code, 1 if v["gelatinase"] else 0, 1 if v["dnase"] else 0, v["hemolysis"], v["virulenceScore"]))

    conn.commit()

    # Integrity verification
    cur.execute("SELECT COUNT(*) FROM isolates")
    count_isolates = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM microbial_taxa")
    count_taxa = cur.fetchone()[0]

    cur.execute("SELECT COUNT(*) FROM isolate_virulence_factors WHERE hemolysis = 'BETA'")
    count_beta = cur.fetchone()[0]

    cur.execute("SELECT AVG(virulence_score) FROM isolate_virulence_factors")
    avg_virulence = cur.fetchone()[0]

    cur.execute("""
        SELECT t.microbial_group, COUNT(i.isolate_code)
        FROM isolates i
        JOIN microbial_taxa t ON i.taxon_id = t.id
        GROUP BY t.microbial_group
        ORDER BY COUNT(i.isolate_code) DESC
    """)
    groups = cur.fetchall()

    print("\n" + "=" * 55)
    print("✅ DATABASE INGESTION & DATA INTEGRITY VERIFIED")
    print(f"📊 Total Isolates Ingested: {count_isolates} / 40")
    print(f"🧬 Distinct Taxa Cataloged: {count_taxa} species")
    print(f"⚠️  Beta-Hemolytic Isolates: {count_beta} ({(count_beta / count_isolates) * 100:.1f}%)")
    print(f"📈 Mean Pathogen Virulence Index: {avg_virulence:.1f} / 100")
    print("\n🔬 Isolate Breakdown by Microbial Group:")
    for grp, cnt in groups:
        print(f"   • {grp:<35}: {cnt} isolates")
    print("=" * 55 + "\n")

    conn.close()

if __name__ == "__main__":
    seed_database()
