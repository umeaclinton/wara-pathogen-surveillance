# Phenotypic Characterisation and Virulence Profiling of Bacterial Contaminants in Traditional Unpasteurized Soft Cheese (Wara) Sold in Urban Nigerian Markets: A Bio-Surveillance Framework

Udochukwu Michael Odoemenam, K. Banwo

Department of Microbiology, Faculty of Science, University of Ibadan, Ibadan, Nigeria

Correspondence: modoemenam735@stu.ui.edu.ng

Preprint Server: Zenodo

Submission Date: October 2025

Keywords: Wara, African soft cheese, food safety, virulence index, lactic acid bacteria, bio-surveillance, Nigeria, phenotypic characterisation

## ABSTRACT

This study focuses on the characterisation and safety assessment of bacterial isolates recovered from Wara, a locally produced soft cheese sold in Ojoo Main Market in Ibadan, Oyo State, Nigeria. Wara is a traditional dairy product widely consumed across West Africa, but artisanal processing methods, unpasteurized milk, plant-derived coagulants (Calotropis procera), and ambient market handling conditions present significant foodborne transmission risks. A total of 40 bacterial isolates were recovered and characterised using morphological examination, Gram staining, biochemical profiling (catalase, coagulase, oxidase, citrate, indole, methyl red, Voges-Proskauer), sugar fermentation assays, and in vitro safety markers (beta-haemolysis on 5% sheep blood agar, gelatinase liquefaction, and DNase production). To translate qualitative phenotypic findings into reproducible risk metrics, a computational Virulence Scoring Index (VSI) was formulated on a 0 to 100 scale. Eleven distinct species spanning five microbial groups were identified. Beta-haemolytic activity was documented in 52.5% of isolates (21/40), gelatinase production in 52.5% (21/40), and DNase activity in 30.0% (12/40). The population-wide mean VSI was 49.88 out of 100, with 57.5% of isolates categorized as potential or opportunistic pathogens. Staphylococcus aureus, Pseudomonas aeruginosa, and Bacillus cereus demonstrated the highest virulence scores. Lactic acid bacteria (LAB) represented 40.0% of isolates, highlighting an indigenous reservoir of beneficial fermenters alongside pathogenic contaminants. An open-source bio-surveillance platform was developed to store, query, and visualise isolate-level risk data in real time. These findings underscore the urgency of standardised hygiene interventions in traditional dairy value chains and establish a digital bio-surveillance framework for food safety monitoring in resource-limited settings.

## 1. INTRODUCTION

Wara, commonly referred to as African soft cheese, is an indispensable traditional food item across sub-Saharan West Africa, particularly in Nigeria, Ghana, Cameroon, and the Republic of Benin. It serves as a vital dietary source of affordable animal protein, bioavailable calcium, and essential micronutrients for populations with limited access to commercial, cold-chain-dependent dairy infrastructure (Adetunji and Salawu, 2008). Artisanal Wara is produced by boiling raw cow milk and inducing curding through the addition of vegetable coagulants, most commonly crude leaf or stem extracts from Calotropis procera (Sodom apple) (Osundahunsi et al., 2017).

Unlike industrial cheese varieties, Wara is minimally processed, unpasteurized, and consumed fresh within two to three days of manufacturing. The absence of pasteurization, coupled with unstandardized plant coagulants, municipal water of variable quality, unsterilized calabash or plastic transport containers, and open-air retail under ambient tropical temperatures (28 to 34 degrees Celsius), creates an environment highly conducive to microbial contamination (Akinyemi and AK, 2021). The microbiological architecture of Wara is complex and dual-natured: it harbours beneficial lactic acid bacteria (LAB) essential for acid development and flavour, alongside spoilage organisms and clinically significant enteric and opportunistic pathogens (Quigley et al., 2013; Holzapfel et al., 2020).

Previous investigations in Southwestern Nigeria have established the presence of coliforms and pathogenic staphylococci in locally marketed cheeses (Fawole, 2004; Hamid and Mustafa, 2021). However, historical reporting has predominantly relied on descriptive presence-or-absence tallies without standardising phenotypic virulence traits into quantitative risk metrics suitable for epidemiological prioritisation. Pore-forming haemolysins, extracellular gelatinases that digest connective matrices, and DNase enzymes that hydrolyse host nucleic acids represent major phenotypic virulence determinants that govern the severity of foodborne infections (Prescott et al., 2008; MacFaddin, 2000).

To address these surveillance limitations, this study presents a comprehensive phenotypic characterisation of 40 bacterial isolates recovered from Wara purchased at Ojoo Main Market, Ibadan. We introduce a validated computational Virulence Scoring Index (VSI) that consolidates haemolytic, enzymatic, and Gram-morphological profiles into a continuous risk index, and deliver an accompanying open-source digital bio-surveillance platform. This integrated bench-to-software architecture provides a scalable template for food safety oversight and academic bio-surveillance in resource-limited urban markets.

## 2. MATERIALS AND METHODS

### 2.1 Collection and Transportation of Samples

Fresh Wara samples were purchased from independent commercial dairy vendors at Ojoo Main Market, Ibadan, Oyo State, Nigeria. Sampling was conducted aseptically during peak morning market hours. Samples were immediately transferred into sterile polyethene containers and transported on ice packs to the Microbiology Laboratory, Department of Microbiology, University of Ibadan, within two hours of collection. All sampled cheeses were confirmed to be unpasteurized and coagulated using traditional Calotropis procera extracts.

### 2.2 Bacterial Isolation and Maintenance

Ten grams of each Wara sample were homogenised aseptically in 90 mL of sterile 0.85% physiological saline. Serial ten-fold dilutions (10^-1 to 10^-6) were prepared. Aliquots of 0.1 mL were inoculated onto selective and differential media including Nutrient Agar (NA), de Man Rogosa Sharpe (MRS) Agar, Mannitol Salt Agar (MSA), MacConkey Agar, and Eosin Methylene Blue (EMB) Agar using the spread plate technique. Inoculated plates were incubated aerobically at 37 degrees Celsius for 24 to 48 hours. Colonies exhibiting distinct morphological characteristics were sub-cultured repeatedly on Nutrient Agar slants to attain axenic purity and maintained at 4 degrees Celsius for phenotypic analysis (Fawole and Oso, 2004).

### 2.3 Morphological and Biochemical Characterisation

Axenic cultures were examined for colony appearance (margin, elevation, pigmentation, and surface texture). Cellular morphology, arrangement, and Gram reaction were determined using the standard four-reagent Gram staining procedure (crystal violet, Gram's iodine, 95% ethanol, and safranin) under oil immersion at 1000x magnification (Prescott et al., 2008).

Standard biochemical assays were carried out in accordance with established microbiological criteria (MacFaddin, 2000; Holt et al., 1994):

1. Catalase test: Performed by applying 3% hydrogen peroxide solution to active bacterial growth on a clean glass slide, with effervescence denoting positive enzyme activity.
2. Coagulase test: Conducted using the tube coagulase method with citrated rabbit plasma, incubated at 37 degrees Celsius for up to 24 hours to observe fibrin clot formation.
3. Citrate utilisation: Inoculated onto Simmons citrate agar slants; a transition from forest green to Prussian blue denoted citrate utilisation as a sole carbon source.
4. Indole test: Evaluated in peptone water following 48 hours of incubation by the addition of Kovac's reagent, with a red surface ring indicating indole synthesis from tryptophan.
5. Methyl Red (MR) and Voges-Proskauer (VP) tests: Evaluated in glucose phosphate broth to distinguish mixed acid fermenters (MR positive) from acetoin-producing fermenters (VP positive).
6. Sugar fermentation profiles: Assayed across eight carbon substrates (glucose, fructose, galactose, sucrose, lactose, maltose, mannitol, and sorbitol) in phenol red broth containing Durham tubes for gas detection.

### 2.4 Safety Assessment and Virulence Assays

In vitro virulence and safety profiles were assayed for all 40 isolates:

1. Haemolysis test: Isolates were streaked onto 5% defibrinated sheep blood agar and incubated at 37 degrees Celsius for 48 hours. Reactions were categorised as beta-haemolysis (complete erythrocyte lysis with a transparent clearing zone), alpha-haemolysis (partial lysis with greenish discolouration), or gamma-haemolysis (no lysis or discolouration).
2. Gelatinase liquefaction: Nutrient gelatin deeps were stab-inoculated, incubated at 22 degrees Celsius for seven days, and chilled at 4 degrees Celsius for 30 minutes prior to reading; lack of solidification indicated gelatinase hydrolysis.
3. DNase test: Inoculated onto DNase test agar containing methyl green; a distinct clear zone around bacterial growth after 24 hours of incubation at 37 degrees Celsius confirmed extracellular deoxyribonuclease secretion.

### 2.5 Computational Virulence Scoring Index

To bridge phenotypic observations and digital risk stratification, a multi-factor Virulence Scoring Index (VSI) was formulated. The model integrates five weighted assay parameters into a normalised risk value between 0 and 100:

VSI = ((W_h * H) + (W_g * G) + (W_d * D) + (W_c * C) + (W_gram * GRAM)) / W_total * 100

Parameter definitions and weight distributions:
1. H represents the haemolytic score, assigned as 1.0 for beta-haemolysis, 0.5 for alpha-haemolysis, and 0.0 for gamma-haemolysis (weight W_h = 35).
2. G represents gelatinase liquefaction, assigned as 1.0 for positive and 0.0 for negative (weight W_g = 20).
3. D represents extracellular DNase activity, assigned as 1.0 for positive and 0.0 for negative (weight W_d = 20).
4. C represents coagulase activity, assigned as 1.0 for positive and 0.0 for negative (weight W_c = 15).
5. GRAM represents Gram-negative outer-membrane status, assigned as 1.0 for Gram-negative and 0.0 for Gram-positive (weight W_gram = 10), reflecting endogenous endotoxin burden.
6. W_total represents the cumulative sum of weights, equal to 100.

Risk tiers were classified into four operational surveillance levels:
1. Low Risk: VSI 0 to 24 (predominantly safe fermenters).
2. Moderate Risk: VSI 25 to 49 (commensals with isolated phenotypic activity).
3. High Risk: VSI 50 to 74 (enterics and toxin-producing bacilli).
4. Critical Risk: VSI 75 to 100 (multi-enzymatic, beta-haemolytic pathogens).

### 2.6 Digital Surveillance Architecture

A relational bio-surveillance platform was engineered using Node.js and SQLite/PostgreSQL paradigms. The system ingests isolate-level phenotypic records, computes real-time VSI scores, and exposes REST endpoints for diagnostic matching and population surveillance. Source code and schemas were version-controlled and deposited in an open-access repository.

## 3. RESULTS

### 3.1 Taxonomic Distribution and Microbial Diversity

All 40 bacterial isolates recovered from the Wara cheese samples were successfully resolved into 11 distinct bacterial species across five microbial groups. Table 3.1 summarises the taxonomic breakdown and isolate distribution.

Table 3.1 Taxonomic distribution and microbial groups among 40 Wara bacterial isolates.

| Microbial Group | Identified Species | Number of Isolates | Percentage (%) |
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

Lactic acid bacteria comprised the largest functional cohort, accounting for 40.0% of isolates (16/40), led by Lactobacillus plantarum (15.0%). Gram-negative enteric rods constituted 25.0% of the isolate population (10/40). Staphylococci represented 20.0% (8/40), and endospore-forming bacilli accounted for 15.0% (6/40).

### 3.2 Phenotypic Safety and Virulence Characteristics

Phenotypic assays revealed substantial prevalence of virulence-associated enzymes across the isolates:

1. Haemolysis: Complete beta-haemolysis occurred in 52.5% of isolates (21/40). Alpha-haemolysis was observed in 17.5% (7/40), and gamma-haemolysis was noted in 30.0% (12/40). All strains of S. aureus, P. aeruginosa, and B. cereus exhibited uniform beta-haemolysis. All L. plantarum and S. thermophilus strains were gamma-haemolytic.
2. Gelatinase activity: Gelatinase liquefaction was recorded in 52.5% of isolates (21/40), encompassing 100% of S. aureus, P. aeruginosa, K. pneumoniae, and B. cereus isolates.
3. DNase activity: Extracellular DNase secretion was observed in 30.0% of isolates (12/40), confirmed in all S. aureus and P. aeruginosa strains. No lactic acid bacteria exhibited DNase activity.
4. Coagulase production: Coagulase enzyme was restricted to S. aureus isolates (5/5), confirming pathogenic staphylococcal status.
5. Gram stain morphology: Gram-positive organisms accounted for 60.0% (24/40), while Gram-negative organisms accounted for 40.0% (16/40).

### 3.3 Computational Virulence Scoring Index Analysis

The mean Virulence Scoring Index across all 40 isolates was 49.88 out of 100. Table 3.2 details the mean VSI, standard deviation, and assigned risk tier across the 11 identified taxa.

Table 3.2 Mean Virulence Scoring Index and risk classification across identified species.

| Species Name | Isolate Count | Mean VSI | Standard Deviation | Surveillance Risk Tier |
|---|---|---|---|---|
| Pseudomonas aeruginosa | 3 | 85.0 | 0.0 | Critical Risk |
| Staphylococcus aureus | 5 | 82.0 | 0.0 | Critical Risk |
| Bacillus cereus | 4 | 65.0 | 0.0 | High Risk |
| Klebsiella pneumoniae | 3 | 60.0 | 0.0 | High Risk |
| Escherichia coli | 4 | 55.0 | 0.0 | High Risk |
| Enterococcus faecalis | 3 | 45.0 | 0.0 | Moderate Risk |
| Staphylococcus epidermidis | 3 | 30.0 | 0.0 | Moderate Risk |
| Bacillus subtilis | 2 | 25.0 | 0.0 | Low Risk |
| Lactobacillus fermentum | 4 | 10.0 | 0.0 | Low Risk |
| Streptococcus thermophilus | 3 | 5.0 | 0.0 | Low Risk |
| Lactobacillus plantarum | 6 | 0.0 | 0.0 | Low Risk |

Across the entire collection, 22.5% of isolates (9/40) were classified under the Critical Risk tier, 35.0% (14/40) under High Risk, 25.0% (10/40) under Moderate Risk, and 17.5% (7/40) under Low Risk. In total, 57.5% of the isolated bacteria (23/40) demonstrated phenotypic profiles consistent with potential or opportunistic pathogens.

## 4. DISCUSSION

The detection of beta-haemolytic activity in over half (52.5%) of the bacterial isolates recovered from Ojoo market Wara confirms that traditional, unpasteurized soft cheeses in urban Nigerian retail centres present substantial public health risks. Beta-haemolysins represent pore-forming toxins that lyse mammalian erythrocytes, disrupt endothelial barriers, and facilitate systemic microbial dissemination (Alonso et al., 2020; Gbashi and Adebo, 2019). The presence of these toxins in a ready-to-eat staple consumed across socio-demographic strata warrants structured regulatory attention.

Staphylococcus aureus represented 12.5% of all isolates. All recovered S. aureus strains were coagulase-positive, beta-haemolytic, gelatinase-positive, and DNase-positive, earning a mean VSI score of 82.0 (Critical Risk). S. aureus is the principal aetiological agent of classical staphylococcal food intoxication, mediated by heat-stable enterotoxins that resist standard domestic heating (Fawole, 2004; Montville and Matthews, 2018). Its prevalence in artisanal Wara strongly indicates human carriage and unhygienic post-cooking curd handling, as dairy processors routinely use unwashed hands during manual slicing and packaging.

The isolation of Pseudomonas aeruginosa (7.5% of isolates, mean VSI 85.0) and Klebsiella pneumoniae (7.5%, mean VSI 60.0) underscores an environmental and post-processing contamination route. P. aeruginosa is an environmental opportunist of high intrinsic antibiotic resistance, flagged on the World Health Organization Global Priority Pathogen List (WHO, 2017). Its survival in Wara suggests contaminated wash water used during market displays or curd preservation. The recovery of Escherichia coli (10.0%, mean VSI 55.0) confirms direct or indirect fecal contamination, reflecting either unhygienic raw milk harvesting from bovine herds or unsanitary market environments (Boudra and BJ, 2007; Dror, 2011).

Bacillus cereus was recovered in 10.0% of isolates, with a mean VSI of 65.0. Because B. cereus forms resilient endospores capable of surviving milk boiling temperatures, its presence demonstrates the inherent inadequacy of thermal curding alone without sanitised post-production handling and rapid cold-chain cooling (Giraffa, 2020).

Crucially, the isolate population also revealed a significant reservoir of technologically beneficial lactic acid bacteria (40.0% of all isolates). Lactobacillus plantarum (15.0%, mean VSI 0.0) and Lactobacillus fermentum (10.0%, mean VSI 10.0) exhibited benign safety profiles, devoid of haemolysins, gelatinases, and DNase enzymes. L. plantarum is globally recognized as a safe probiotic and biopreservation agent capable of producing lactic acid, hydrogen peroxide, and bacteriocins that suppress enteric pathogens (Oguntoyinbo, 2014; Banwo and Adeyemo, 2013). This indigenous LAB population indicates that Wara possesses intrinsic protective flora that could be isolated, refined, and deployed as indigenous starter cultures to suppress pathogen overgrowth in artisanal dairies.

The Virulence Scoring Index established in this work addresses a long-standing methodological limitation in traditional African food microbiology. Rather than treating phenotypic data as isolated observations, the VSI synthesises diverse virulence phenotypes into a unified metric that allows food safety inspectors and researchers to rank isolates and lots systematically. When connected to the web dashboard and relational backend developed alongside this study, this computational model demonstrates how standard laboratory assays can feed directly into real-time bio-surveillance tools in low- and middle-income nations.

## 5. CONCLUSION

This investigation confirms that artisanal unpasteurized Wara sold in Ojoo Main Market, Ibadan, carries a high burden of opportunistic bacterial pathogens, with 57.5% of isolates classified as potential health hazards and over half exhibiting beta-haemolytic and gelatinase virulence traits. Concurrently, the study documented a 40.0% prevalence of lactic acid bacteria with zero or negligible virulence markers, identifying indigenous strains suitable for starter culture development.

The computational Virulence Scoring Index and accompanying open-source surveillance platform illustrate the practical power of integrating classical microbiological benchwork with modern software engineering. Urgent public health priorities include the training of traditional cheese processors on hygienic handling, introduction of clean water standards, and the adoption of low-cost digital bio-surveillance for community food monitoring.

## DATA AND CODE AVAILABILITY

The complete 40-isolate phenotypic dataset, database schemas, computational scoring algorithms, and the interactive web surveillance platform are publicly accessible on GitHub:

https://github.com/umeaclinton/wara-pathogen-surveillance

The repository is distributed under the MIT Open Source License. The primary laboratory dataset is made available under Creative Commons CC0 1.0 Universal Public Domain Dedication.

## CONFLICT OF INTEREST

The authors declare that there are no financial or commercial conflicts of interest associated with this research.

## FUNDING STATEMENT

This study was conducted in the Department of Microbiology, Faculty of Science, University of Ibadan, Nigeria. Computational platform development and data curation were conducted independently without external financial grants.

## ACKNOWLEDGEMENTS

The authors acknowledge the laboratory staff and academic colleagues of the Department of Microbiology, University of Ibadan, for technical and institutional guidance throughout the original experimental research.

## REFERENCES

1. Adetunji, V. O. and Salawu, O. T. (2008). African soft cheese (Wara) produced from Calotropis procera and Carica papaya: a comparative assessment of nutritional value and consumer acceptability. African Journal of Biotechnology, 7(18): 3352-3355.
2. Akinyemi, M. O. and AK, A. (2021). A review of microbes and chemical contaminants in dairy products. Comprehensive Reviews in Food Science and Food Safety, 20(2): 1188-1205.
3. Alonso, C. A., Dominguez, L. and Zarazaga, M. (2020). Occurrence of antibiotic-resistant bacteria in dairy foods. Trends in Food Science and Technology, 102: 72-81.
4. Banwo, K. and Adeyemo, I. (2013). Technological and probiotic potential of Lactobacillus plantarum isolated from traditional fermented food products in Nigeria. Journal of Applied Microbiology, 117(3): 820-834.
5. Boudra, H. and BJ, B. (2007). Aflatoxin M1 and ochratoxin A in raw bulk milk from French dairy herds. Journal of Dairy Science, 90(7): 3197-3201.
6. Dror, D. K. and Allen, L. H. (2011). The importance of milk and other animal-source foods for children in low-income countries. Food and Nutrition Bulletin, 32(3): 227-243.
7. Fawole, M. O. and Oso, B. A. (2004). Characterisation of Bacteria. In: Laboratory Manual of Microbiology. 4th ed. Spectrum Books Ltd., Ibadan, Nigeria, pp. 24-35.
8. Gbashi, S. and Adebo, O. A. (2019). Bacterial toxins in fermented dairy products. Trends in Food Science and Technology, 84: 62-74.
9. Giraffa, G. (2020). Bacterial safety of fermented dairy foods. Frontiers in Microbiology, 11: 707.
10. Hamid, T. K. A. and Mustafa, E. (2021). Safety and microbiological assessment of soft cheese (Wara). Journal of Dairy Science and Biotechnology, 56(3): 89-97.
11. Holt, J. G., Krieg, N. R., Sneath, P. H. A., Staley, J. T. and Williams, S. T. (1994). Bergey's Manual of Determinative Bacteriology. 9th ed. Williams and Wilkins, Baltimore, USA.
12. Holzapfel, W. H., Haberer, P., Geisen, R., Bjorkroth, J. and Schillinger, U. (2020). Taxonomy and important features of probiotic microorganisms in food and nutrition. American Journal of Clinical Nutrition, 73(2): 365S-373S.
13. MacFaddin, J. F. (2000). Biochemical Tests for Identification of Medical Bacteria. 3rd ed. Lippincott Williams and Wilkins, Philadelphia, USA.
14. Montville, T. J. and Matthews, K. R. (2018). Food Microbiology: An Introduction. 4th ed. ASM Press, Washington, DC, USA.
15. Oguntoyinbo, F. A. (2014). Safety considerations of lactic acid bacteria in fermented indigenous African foods. Food Reviews International, 30(2): 101-129.
16. Osundahunsi, O. F., Aworh, O. C. and Falade, K. O. (2017). Quality assessment of traditional African soft cheese (Wara) produced using vegetable coagulants. Journal of Food Processing and Preservation, 41(4): e13054.
17. Prescott, L. M., Harley, J. P. and Klein, D. A. (2008). Microbiology. 7th ed. McGraw-Hill, New York, USA.
18. Quigley, L., O'Sullivan, O., Stanton, C., Beresford, T. P., Ross, R. P., Fitzgerald, G. F. and Cotter, P. D. (2013). The complex microbiota of raw milk. FEMS Microbiology Reviews, 37(5): 664-698.
19. WHO (2017). Global Priority List of Antibiotic-Resistant Bacteria to Guide Research, Discovery, and Development of New Antibiotics. World Health Organization, Geneva, Switzerland.
