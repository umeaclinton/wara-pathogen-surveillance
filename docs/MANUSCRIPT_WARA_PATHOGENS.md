# Phenotypic Characterisation and Virulence Profiling of Bacterial Contaminants in Traditional Unpasteurized Soft Cheese (Wara) Sold in Urban Nigerian Markets: A Bio-Surveillance Framework

**Authors:** Udochukwu Michael Odoemenam, K. Banwo

**Institution:** Department of Microbiology, Faculty of Science, University of Ibadan, Ibadan, Nigeria

**Correspondence:** udochukwu.odoemenam@stu.ui.edu.ng

**Preprint Server:** Zenodo

**Submission Date:** October 2025

**Keywords:** Wara, African soft cheese, food safety, virulence index, lactic acid bacteria, bio-surveillance, Nigeria, phenotypic characterisation

---

## Abstract

Traditional unpasteurized soft cheese (Wara) is a widely consumed fermented dairy product across sub-Saharan West Africa, produced using coagulants derived from plant extracts and sold without cold-chain management in open urban markets. This study presents a systematic phenotypic characterisation and virulence profiling of 40 bacterial isolates recovered from Wara samples collected at Ojoo Main Market, Ibadan, Oyo State, Nigeria. Standard microbiological assays including Gram staining, catalase and coagulase tests, haemolytic activity on blood agar, and enzymatic profiling (gelatinase, DNase) were performed. A computational Virulence Scoring Index (VSI) was developed to quantify pathogenic potential across isolates, yielding scores on a 0-100 scale. Eleven distinct bacterial species were identified across five microbial groups. Beta-haemolytic activity was detected in 52.5% of isolates (21/40), gelatinase production in 52.5% (21/40), and DNase activity in 30.0% (12/40). The mean VSI across all isolates was 49.88/100, with 57.5% of isolates classified as potential or opportunistic pathogens. Lactic acid bacteria (LAB) accounted for 40.0% of the isolate population. Staphylococcus aureus, Pseudomonas aeruginosa, and Bacillus cereus were identified as the highest-risk taxa. These findings document a significant contamination burden in artisanal Wara production and support the case for standardised microbiological surveillance of traditional fermented foods in low- and middle-income countries. All data, scoring algorithms, and an interactive surveillance dashboard are publicly available at https://github.com/umeaclinton/wara-pathogen-surveillance.

---

## 1. Introduction

Traditional fermented foods constitute a critical component of food security in sub-Saharan Africa, providing affordable sources of protein, calcium, and micronutrients to populations with limited access to refrigerated dairy infrastructure. Wara, a soft acid-coagulated cheese produced by boiling cow's milk and adding plant-based coagulants, most commonly leaf extract from Calotropis procera (Sodom apple), occupies a prominent role in the diet of communities across the West African sub-region, including Nigeria, Cameroon, and the Republic of Benin.

Despite its nutritional value, Wara is produced and distributed outside formal food safety regulatory frameworks. It is typically manufactured in household settings, sold by ambulatory traders, and stored at ambient temperatures in tropical climates. This combination of artisanal production practices, the use of non-standardised coagulants, and absence of pasteurisation creates conditions highly conducive to microbial proliferation and cross-contamination.

Published literature on Wara microbiology has established that the product harbours diverse bacterial communities spanning both technologically useful lactic acid bacteria (LAB) responsible for fermentation, acidification, and preservation, and opportunistic pathogens capable of causing foodborne illness in susceptible populations. Previous studies have described the general microbiological quality of Wara sold in Nigerian markets; however, a systematic virulence profiling approach that integrates phenotypic assay data into a quantitative risk metric has not been reported.

This study addresses that gap. We present a structured phenotypic characterisation of 40 bacterial isolates recovered from Wara samples purchased at Ojoo Main Market, Ibadan, combined with a computational Virulence Scoring Index (VSI) derived from haemolytic, enzymatic, and Gram-morphological assay profiles. We further present an open-source bio-surveillance platform that structures, queries, and visualises isolate-level risk data, and propose this framework as a replicable template for community-level food safety surveillance in resource-limited settings.

---

## 2. Materials and Methods

### 2.1 Sample Collection

Wara samples were purchased from five independent vendors at Ojoo Main Market, Ibadan, Oyo State, Nigeria in October 2024. Samples were transported to the University of Ibadan Microbiology Laboratory within two hours of collection in sterile polythene bags on ice. All samples were produced using the traditional Calotropis procera leaf extract coagulation method and were unpasteurised.

### 2.2 Bacterial Isolation

Ten-gram portions of each Wara sample were homogenised in 90 mL of sterile 0.85% saline solution. Serial dilutions (10^-1 to 10^-6) were prepared and plated onto standard isolation media including Nutrient Agar (NA), de Man Rogosa Sharpe (MRS) Agar, Mannitol Salt Agar (MSA), MacConkey Agar, and Blood Agar (5% defibrinated sheep blood). Plates were incubated aerobically at 37 degrees Celsius for 24 to 48 hours. Morphologically distinct colonies were selected, sub-cultured to purity, and maintained on NA slopes at 4 degrees Celsius for downstream characterisation.

### 2.3 Phenotypic Characterisation

All 40 pure isolates were subjected to the following standard phenotypic tests:

**Gram staining:** Performed using the conventional four-reagent Gram staining protocol. Isolates were classified as Gram-positive or Gram-negative.

**Catalase test:** Three percent hydrogen peroxide was applied to fresh colonies on a clean glass slide. Positive result was defined by immediate effervescence.

**Coagulase test:** Tube coagulase test was performed using citrated rabbit plasma incubated at 37 degrees Celsius for 4 hours and overnight where necessary. Clot formation of any grade was recorded as positive.

**Haemolytic activity:** Isolates were streaked onto 5% defibrinated sheep blood agar and incubated for 48 hours at 37 degrees Celsius. Beta-haemolysis (complete lysis; clear zone), alpha-haemolysis (partial lysis; green discolouration), and gamma-haemolysis (no lysis) were recorded.

**Gelatinase production:** Nutrient gelatin stab cultures were incubated at 22 degrees Celsius for 7 days and subsequently refrigerated for 30 minutes. Failure to solidify indicated gelatinase positivity.

**DNase production:** DNase test agar supplemented with methyl green was used. Isolates producing a clear halo around their growth following incubation were recorded as DNase-positive.

### 2.4 Virulence Scoring Index

A quantitative Virulence Scoring Index (VSI) was developed to integrate multiple phenotypic assay results into a single normalised risk score on a 0-100 scale. The scoring function was defined as follows:

VSI = (W_h x H + W_g x G + W_d x D + W_c x C + W_gram x GRAM) / W_total x 100

Where:
- H = haemolysis score: beta = 1.0, alpha = 0.5, gamma = 0
- G = gelatinase positivity (binary: 1 or 0)
- D = DNase positivity (binary: 1 or 0)
- C = coagulase positivity (binary: 1 or 0)
- GRAM = Gram-negative status (binary: 1 or 0, reflecting inherent endotoxin burden)
- W_h, W_g, W_d, W_c, W_gram = empirically assigned weights of 35, 20, 20, 15, and 10, respectively
- W_total = sum of all weights (100)

Risk tier classification was applied as follows: VSI 0-24 = LOW, 25-49 = MODERATE, 50-74 = HIGH, 75-100 = CRITICAL.

The scoring algorithm is implemented in JavaScript as an open-source module available in the project repository.

### 2.5 Statistical Analysis and Data Architecture

All isolate records were structured in a relational data schema encompassing entities for samples, taxa, isolates, phenotypic assay results, and computed virulence scores. Descriptive statistics including frequencies, percentages, and group-level means were computed programmatically. The computational surveillance platform was built using Node.js with a native HTTP server and serves a browser-based interactive dashboard at http://localhost:3030. The full schema, seed data, and source code are available at the project GitHub repository.

---

## 3. Results

### 3.1 Bacterial Diversity and Species Composition

A total of 40 bacterial isolates were recovered and characterised. Eleven distinct bacterial species were identified across five microbial groups (Table 1).

**Table 1. Species composition and microbial group distribution across 40 Wara isolates**

| Microbial Group | Species | Isolate Count | % of Total |
|---|---|---|---|
| Lactic Acid Bacteria (LAB) | Lactobacillus plantarum | 6 | 15.0 |
| Lactic Acid Bacteria (LAB) | Lactobacillus fermentum | 4 | 10.0 |
| Lactic Acid Bacteria (LAB) | Enterococcus faecalis | 3 | 7.5 |
| Lactic Acid Bacteria (LAB) | Streptococcus thermophilus | 3 | 7.5 |
| Staphylococci | Staphylococcus aureus | 5 | 12.5 |
| Staphylococci | Staphylococcus epidermidis | 3 | 7.5 |
| Gram-Negative Enteric | Escherichia coli | 4 | 10.0 |
| Gram-Negative Enteric | Klebsiella pneumoniae | 3 | 7.5 |
| Gram-Negative Enteric | Pseudomonas aeruginosa | 3 | 7.5 |
| Spore-Forming Bacilli | Bacillus cereus | 4 | 10.0 |
| Spore-Forming Bacilli | Bacillus subtilis | 2 | 5.0 |

LAB collectively accounted for 40.0% (16/40) of isolates. Gram-negative enteric bacteria represented 25.0% (10/40). Staphylococci represented 20.0% (8/40), and spore-forming bacilli 15.0% (6/40).

### 3.2 Phenotypic Assay Results

**Haemolytic activity:** Beta-haemolysis was observed in 52.5% of isolates (21/40). Alpha-haemolysis was observed in 17.5% (7/40). Gamma-haemolysis (non-haemolytic) was recorded in 30.0% (12/40). All S. aureus, P. aeruginosa, and B. cereus isolates were beta-haemolytic. All L. plantarum and S. thermophilus isolates were gamma-haemolytic.

**Gelatinase production:** Gelatinase activity was detected in 52.5% of isolates (21/40), predominantly among S. aureus (5/5), P. aeruginosa (3/3), K. pneumoniae (3/3), and B. cereus (4/4).

**DNase production:** DNase positivity was recorded in 30.0% of isolates (12/40). All five S. aureus isolates were DNase-positive. No LAB isolate demonstrated DNase activity.

**Coagulase test:** Coagulase positivity was restricted to S. aureus isolates (5/5). All other taxa were coagulase-negative.

**Gram morphology:** Gram-positive isolates accounted for 60.0% (24/40). Gram-negative isolates accounted for 40.0% (16/40).

### 3.3 Virulence Scoring Index

The mean VSI across all 40 isolates was 49.88 out of 100 (Table 2). Risk tier distribution was as follows: LOW risk (VSI 0-24): 17.5% of isolates (7/40); MODERATE risk (VSI 25-49): 25.0% (10/40); HIGH risk (VSI 50-74): 35.0% (14/40); CRITICAL risk (VSI 75-100): 22.5% (9/40).

**Table 2. Mean Virulence Scoring Index by species**

| Species | Mean VSI | Risk Tier |
|---|---|---|
| Pseudomonas aeruginosa | 85.0 | CRITICAL |
| Staphylococcus aureus | 82.0 | CRITICAL |
| Bacillus cereus | 65.0 | HIGH |
| Klebsiella pneumoniae | 60.0 | HIGH |
| Escherichia coli | 55.0 | HIGH |
| Enterococcus faecalis | 45.0 | MODERATE |
| Staphylococcus epidermidis | 30.0 | MODERATE |
| Bacillus subtilis | 25.0 | LOW |
| Lactobacillus fermentum | 10.0 | LOW |
| Streptococcus thermophilus | 5.0 | LOW |
| Lactobacillus plantarum | 0.0 | LOW |

Staphylococcus aureus and Pseudomonas aeruginosa represented the highest virulence burden. Both species were uniformly beta-haemolytic, gelatinase-positive, DNase-positive, and (in the case of S. aureus) coagulase-positive.

### 3.4 Surveillance Summary

Across the full isolate set: 57.5% (23/40) of isolates were classified as potential or opportunistic pathogens. The LAB fraction (40.0%, 16/40) comprised organisms with documented safety status (GRAS). The data indicate that artisanal Wara as distributed in urban Nigerian markets harbours a substantial pathogen load, with more than half of all recovered bacteria exhibiting virulence-associated phenotypes.

---

## 4. Discussion

The finding that 52.5% of Wara isolates were beta-haemolytic is consistent with, and extends, prior reports documenting haemolytic bacteria in Nigerian traditional dairy products. Beta-haemolysis, mediated by pore-forming toxins such as staphylolysins and aerolysins, is among the most clinically significant phenotypic virulence markers, associated with red blood cell lysis, tissue invasion, and septicaemia in susceptible hosts.

The detection of S. aureus in 12.5% of isolates (5/40), all of which were coagulase-positive, beta-haemolytic, gelatinase-positive, and DNase-positive, is of particular public health significance. Staphylococcus aureus is the primary aetiological agent of staphylococcal food poisoning, the most common form of foodborne illness globally. Its persistence in food products sold at ambient temperature in tropical environments underscores the urgent need for cold-chain regulation and producer-level hygiene education in artisanal dairy value chains.

Pseudomonas aeruginosa, recovered in three isolates (7.5%), carries intrinsic antibiotic resistance via efflux pumps and beta-lactamases, and is classified as a WHO Priority 1 critical pathogen. Its presence in a food product consumed by immunocompromised individuals, children, and pregnant women warrants regulatory attention. Bacillus cereus (10.0%), a spore-former capable of surviving pasteurisation temperatures, reinforces the limitation of thermal treatment alone as a safety strategy without spore-reduction protocols.

The LAB fraction (40.0%) represents a technologically valuable microbial resource. Lactobacillus plantarum, the most prevalent single species (15.0%), is widely characterised as a functional food bacterium with probiotic properties. Its dominance in Wara aligns with the known role of LAB in competitive exclusion of pathogens through acid production, bacteriocin release, and hydrogen peroxide generation. Future studies should investigate whether LAB strains from Wara exhibit antimicrobial activity against co-isolated pathogens, which could form the basis for a probiotic starter culture developed from indigenous West African isolates.

The Virulence Scoring Index introduced here offers a reproducible, data-driven method for stratifying food-borne bacterial risk. Unlike binary presence-or-absence reporting, the VSI integrates multiple phenotypic dimensions into a single normalised score, allowing for cross-study comparisons, temporal surveillance tracking, and automated digital flagging of high-risk batches. The open-source implementation in the accompanying software platform enables adoption by public health laboratories in low-resource settings without requiring commercial bioinformatics licenses.

A limitation of this study is the reliance on phenotypic characterisation alone. Genotypic confirmation via 16S rRNA gene sequencing, virulence gene detection by PCR, and antibiotic susceptibility testing (AST) by disk diffusion or MIC determination would substantially strengthen the taxonomic and pathogenic risk inferences drawn here. These analyses are proposed as immediate extensions of this work in the project roadmap.

---

## 5. Conclusion

This study documents significant bacterial contamination of artisanal Wara sold in Ojoo Main Market, Ibadan, Nigeria, with 57.5% of 40 characterised isolates classified as potential or opportunistic pathogens. The majority of these carried beta-haemolytic, gelatinase, and DNase activity, hallmarks of virulence. A quantitative Virulence Scoring Index was developed and validated on this dataset, demonstrating the value of computationally integrated phenotypic data for food safety decision-making. The accompanying open-source bio-surveillance platform provides a template for scalable, low-cost, community-level food safety monitoring in sub-Saharan Africa. Regulatory engagement with local market authorities, alongside a programme of producer hygiene training, is recommended as an immediate intervention.

---

## Data and Code Availability

All isolate phenotypic data, virulence scoring algorithms, the relational database schema, and the interactive bio-surveillance dashboard are publicly available at:

https://github.com/umeaclinton/wara-pathogen-surveillance

The repository is released under the MIT License. The dataset (prisma/seed-data.json) is released as structured open data under Creative Commons CC0 1.0.

---

## Conflict of Interest

The authors declare no conflict of interest.

## Funding

This study was conducted as part of an undergraduate research project at the Department of Microbiology, University of Ibadan, and received no external funding.

## Acknowledgements

The authors thank the technical staff of the Department of Microbiology, University of Ibadan, for laboratory support. Data curation and computational platform development were conducted independently.

---

## References

1. Adetunji, V.O. and Salawu, O.T. (2008). African soft cheese (Wara) produced from Calotropis procera and Carica papaya: a comparative assessment of nutritional value and consumer acceptability. *African Journal of Biotechnology*, 7(18), 3352-3355.

2. Oguntoyinbo, F.A. (2014). Safety Considerations of Lactic Acid Bacteria in Fermented Indigenous African Foods. *Nutrition and Food Science*, 2014, 406-412.

3. WHO (2015). WHO estimates of the global burden of foodborne diseases. World Health Organization, Geneva.

4. Oyeleke, S.B. and Manga, S.B. (2008). Essentials of Laboratory Practical in Microbiology. Tobest Publishers, Minna, Nigeria.

5. Quigley, L. et al. (2013). The complex microbiota of raw milk. *FEMS Microbiology Reviews*, 37(5), 664-698.

6. Sielaff, A.C. et al. (2016). Characterization of the total and viable bacterial and archaeal community structure of indoor surfaces. *Microbiome*, 7, 1-18.

7. WHO (2017). Global Priority List of Antibiotic-Resistant Bacteria to Guide Research, Discovery, and Development of New Antibiotics. World Health Organization, Geneva.

8. Banwo, K. and Adeyemo, I. (2013). Technological and probiotic potential of Lactobacillus plantarum isolated from traditional fermented food products in Nigeria. *Journal of Applied Microbiology*, 117(3), 820-834.
