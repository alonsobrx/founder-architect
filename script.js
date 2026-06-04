/* ============================================================
   THE PEOPLE'S BRIEF — Brasidas Strategies
   script.js: Language toggle (EN/ES), accessibility tools,
   sidebar scroll-spy, progress bar, dark mode
   ============================================================ */

'use strict';

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const CONTENT = {
  en: {
    doc_type: 'INTELLIGENCE REPORT — PUBLIC INTEREST',
    site_title: 'THE PEOPLE\'S BRIEF',
    site_subtitle: 'Understanding and Evaluating Large-Scale Economic Incentive Proposals',
    prepared_by_label: 'PREPARED BY',
    author_role: 'Founder, Brasidas Strategies',
    ayala_label: 'WITH ASSISTANCE OF',
    dateline: 'June 2026 · Open Source · Public Interest &amp; Educational Use',
    sidebar_heading: 'CONTENTS',
    classification: 'OPEN SOURCE<br>PUBLIC INTEREST',
    nav_letter: 'LETTER',
    nav_exec: 'EXEC SUMMARY',
    nav_s1: '§1 EVIDENCE',
    nav_s2: '§2 PROPOSAL',
    nav_s3: '§3 MATH',
    nav_s4: '§4 PLAYBOOK',
    nav_s5: '§5 QUESTIONS',
    nav_s6: '§6 WHY',
    nav_s7: '§7 STATEMENT',
    nav_final: 'FINAL WORD',
    nav_letter_long: 'Letter to the Reader',
    nav_exec_long: 'Executive Summary',
    nav_s1_long: 'The Evidence',
    nav_s2_long: 'The Proposal',
    nav_s3_long: 'The Math',
    nav_s4_long: 'Extraction Playbook',
    nav_s5_long: '21 Questions',
    nav_s6_long: 'Why It Persists',
    nav_s7_long: 'Public Statement',
    nav_final_long: 'Final Word',
    letter_label: 'A LETTER TO THE READER',
    letter_p1: 'I am not a lobbyist. I am not a consultant. I am not paid by any company, any economic development corporation, or any government agency. I am a service-connected disabled veteran who served thirteen years in the United States Army as a Staff Sergeant. I am a lifelong resident of the Rio Grande Valley. I built a neurointelligence system called Ayala™ with my own savings — $396,000 invested over more than a decade — to help veterans, the blind, the disabled, and their families navigate systems that were designed to exhaust them.',
    letter_p2: 'Along the way, I discovered that the same analytical tools I built to fight the VA could be applied to another kind of extraction: the economic development deals that have been devastating communities like mine for decades.',
    letter_p3: 'This document is the product of that work. It is not written to tell you what to think. It is written to give you the tools to think for yourself. Every claim is sourced. Every calculation is shown. Every concept is explained. If you read nothing else, read the Executive Summary. If you want to understand the math, read Section 3. If you want to know what questions to ask your elected officials, read Section 5. If you want to understand why this keeps happening, read Section 6.',
    letter_p4: 'I offer this freely to anyone who wants it. Reproduce it. Share it. Use it at public hearings. Use it to question your representatives. Use it to educate your neighbors. Knowledge is the only antidote to extraction.',
    letter_sig: '— Arnoldo Alonso',
    exec_label: 'EXECUTIVE SUMMARY',
    exec_finding_head: 'The Central Finding',
    exec_finding_body: 'For over forty years, communities across the United States have been offered the same deal: give a large corporation a massive tax break, and it will bring jobs and prosperity. The academic evidence demonstrates that this model does not work. In the overwhelming majority of cases, the promised jobs fail to materialize at the promised scale and wages, the public cost far exceeds any plausible fiscal return, and the primary beneficiaries are corporate shareholders — not the community.',
    exec_situation_head: 'The Current Situation',
    exec_situation_body: 'A company is seeking a 95% property tax abatement from Cameron County, Texas, to build a large manufacturing facility. The company projects "up to 10,000 jobs" and an average wage near $90,000. The Commissioners Court vote is scheduled for June 16, 2026.',
    exec_provides_head: 'What This Document Provides',
    exec_item1: '<strong>The Scientific Evidence</strong> — forty years of peer-reviewed research on business tax incentives',
    exec_item2: '<strong>The Mathematical Analysis</strong> — step-by-step deconstruction of the company\'s claims',
    exec_item3: '<strong>The Historical Record</strong> — comparable deals and what actually happened',
    exec_item4: '<strong>The Red Flags Checklist</strong> — eight-point framework for evaluating any incentive proposal',
    exec_item5: '<strong>The Questions to Ask</strong> — 21 specific questions demanding public answers',
    exec_item6: '<strong>The Deeper Pattern</strong> — why this model persists despite documented failure',
    recommendation_label: 'RECOMMENDATION',
    recommendation_body: 'Do not approve the incentive package as currently presented. Demand verifiable, independent evidence supporting every projection. Require binding, enforceable commitments with automatic penalties for non-performance. If the company cannot meet these conditions, it has no business asking for public funds.',
    s1_label: 'THE EVIDENCE — WHAT SCIENCE TELLS US',
    s1_experts_head: '1.1 The Experts Have Spoken',
    s1_intro: 'The question of whether business tax incentives work has been studied for decades by the most respected economists in the world. Their findings are published in peer-reviewed journals. They have no financial stake in any particular incentive deal.',
    scholar1_name: 'Dr. Timothy Bartik — W.E. Upjohn Institute (2019)',
    scholar1_p1: 'At least 90% of large incentive packages are unnecessary. The company would have chosen a similar location without the subsidy.',
    scholar1_p2: 'Average public cost per job created: $100,000 to $200,000 — far exceeding any tax revenue the community will ever recover.',
    scholar1_p3: 'Most jobs go to people who don\'t live in the community. They commute in, spend their money elsewhere.',
    scholar2_name: 'Dr. Neumark &amp; Dr. Kolko — Journal of Urban Economics (2010)',
    scholar2_quote: '"The enterprise zone programs we study tend to have little or no positive effect on the economic outcomes of zone residents."',
    scholar3_name: 'Busso, Gregory &amp; Kline — American Economic Review (2013)',
    scholar3_quote: '"We find no detectable effect on employment or wages" for zone residents. The primary beneficiaries were property owners — landlords, developers, and speculators.',
    scholar4_name: 'Dr. Slattery &amp; Dr. Zidar — Journal of Economic Perspectives (2020)',
    scholar4_quote: '"We do not find strong evidence that firm-specific tax incentives increase broader economic growth."',
    scholar5_name: 'Dr. Chirinko &amp; Dr. Wilson — Journal of Public Economics (2008)',
    scholar5_body: 'State investment tax credits are a "zero-sum game" — they simply move economic activity from one state to another without creating any net new growth.',
    s1_prosperity_head: '1.2 What Creates Real Prosperity?',
    s1_prosperity_intro: 'A 2019 study by the Political Economy Research Institute, University of Massachusetts Amherst:',
    table_col_investment: 'Investment Type',
    table_col_jobs: 'Jobs Created per $1 Billion',
    invest_education: 'Education',
    invest_transit: 'Mass Transit',
    invest_healthcare: 'Healthcare',
    invest_energy: 'Clean Energy',
    invest_defense: 'Defense Manufacturing',
    s1_history_head: '1.3 The Historical Record',
    hist_col1: 'Company / Location', hist_col2: 'Year', hist_col3: 'Subsidy', hist_col4: 'Jobs Promised', hist_col5: 'Outcome',
    foxconn_outcome: '768 jobs delivered. Deal renegotiated 2021. $10B investment never made.',
    nissan_promised: 'Thousands', nissan_outcome: 'Wages $10–$15/hr with heavy temp staffing. No economic transformation.',
    boeing_promised: 'Thousands', boeing_outcome: 'Jobs delivered at ~$230,000 per position in public subsidy.',
    amazon_outcome: 'Public opposition killed the deal. Company expanded elsewhere without the subsidy.',
    tesla_outcome: 'Below-target delivery. Wages mixed.',
    s2_label: 'THE CURRENT PROPOSAL',
    s2_company_head: '2.1 The Company',
    s2_company_body: 'Saronic Technologies — a defense startup designing autonomous vessels for maritime military applications. Founded 2022, Austin TX. Raised $2.525 billion in venture capital. Valued at $7.5 billion (Series D, March 2026). Verified employees as of late 2024: <strong>271</strong> (Exa Intelligence).',
    audit_label: 'AUDIT NOTE',
    s2_employee_correction: 'An earlier draft cited ~1,300 employees. The verified figure from Exa Intelligence (late 2024) is 271. 2026 headcount may be higher but has not been publicly disclosed. All calculations use the verified 271 baseline.',
    s2_contract_correction: 'An earlier draft stated "no publicly disclosed Navy contracts." This was incorrect. Saronic holds a $392M Other Transaction Authority (OTA) contract over 6 years (2025–2031) for Corsair-class autonomous surface vessels — $65.3M/year. Source: HyperSinc. This contract is public and verified.',
    s2_proposal_head: '2.2 The Proposal',
    s2_proposal_body: '95% property tax abatement on $2.7B taxable value, 19 years (2029–2048). "Up to 10,000 jobs" at average $90,000. Minimum wage $25/hour ($52,000/year). 835 acres at Port of Brownsville. Vote tabled June 3, 2026. Next vote: June 16, 2026.',
    s2_abatement_correction: 'An earlier estimate cited "over $100 million" — that was the county\'s preliminary annual figure. The verified 19-year total: $2.7B × 1.75% × 95% × 19 years = <strong>$852,862,500</strong>. Nearly $853 million in forgone public revenue.',
    s2_changes_head: '2.3 What Changes Everything',
    s2_change1: 'The company already operates a shipyard in Franklin, Louisiana — acquired facility (Gulf Craft, early 2025), $500M+ deployed, first vessel launched May 2026. Port Alpha is expansion, not survival.',
    s2_change2: 'The CEO\'s background is private equity — Vista Equity Partners, H.I.G. Capital, Blackstone Real Estate. Training in extracting value for investors, not building sustainable manufacturing operations.',
    s2_change3: 'Saronic is one of <strong>seven competitors</strong> for the Navy MUSV contract — including Huntington Ingalls Industries (the largest Navy shipbuilder in the US) and Leidos ($14B defense contractor).',
    s2_change4: 'gCaptain, authoritative maritime industry publication: "The speed everyone is applauding was already sitting in that boatshed before Saronic\'s logo went on the door." The Franklin timeline does not predict the Port Alpha timeline.',
    s3_label: 'THE MATH — STEP BY STEP',
    s3_intro: 'Every calculation is shown. Every assumption is stated. Every source is cited.',
    s3_payroll_head: '3.1 The Payroll Problem',
    finding_label: 'FINDING',
    s3_payroll_finding: 'The company needs over $2 billion in annual revenue to sustain the promised payroll. It has not demonstrated a single dollar of that revenue is secured. The entire projection depends on future government contracts that do not yet exist, in a competition it is not guaranteed to win.',
    s3_workforce_head: '3.2 The Workforce That Cannot Be Hired',
    s3_workforce_finding: 'No American shipyard has ever expanded its workforce by a factor of 10 in a decade. The company has not disclosed any training program, educational partnership, or plan to recruit workers from outside the region.',
    s3_wage_head: '3.3 The Average Wage Illusion',
    s3_wage_body: 'An average is not the typical wage. Example: 100 executives at $500,000 + 9,900 workers at $52,000 = average of $56,480. Nine of ten workers earn the floor. The company\'s reported average shifted 19% — from $75,500 to $90,000 — between initial press coverage and the formal presentation, with no explanation. No wage distribution has been disclosed.',
    s3_subsidy_head: '3.4 The True Subsidy',
    s3_subsidy_result: 'This deal is 11× above the fiscal soundness threshold at best. 34× above in the pessimistic scenario.',
    s3_water_head: '3.5 The Hidden Water Cost',
    s3_water_body: 'A major shipyard consumes millions of gallons of water per day. Brownsville PUB CEO stated publicly: "large industrial users seeking guaranteed water capacity may need agreements that help fund new water sources." Independent estimates: $150M–$400M in required water infrastructure — entirely separate from the tax abatement. No disclosure from the company.',
    s3_parlay_head: '3.6 The Five-Leg Parlay',
    s3_parlay_intro: 'For Port Alpha to deliver all promised value, five independent conditions must be simultaneously true:',
    parlay_col_condition: 'Condition', parlay_col_prob: 'Est. Probability',
    cond1: 'Navy autonomous vessel contracts scale from $65M/yr to $2B+/yr',
    cond2: 'Saronic wins large MUSV share vs. 6 competitors including HII and Leidos',
    cond3: '10,000 jobs materialize at a true $90,000 average wage',
    cond4: 'Majority of jobs filled by Cameron County residents',
    cond5: 'No clawback failure or renegotiation over 19 years',
    s3_parlay_finding: 'Cameron County is being asked to commit $853 million — nearly one billion dollars of public revenue — on a deal with a 0.4% probability of full success. Even if individual probabilities are doubled, the joint probability remains under 7%.',
    s4_label: 'THE EXTRACTION PLAYBOOK',
    s4_intro: 'The incentive negotiation process follows a predictable, well-documented pattern. Understanding this pattern is essential to resisting it.',
    s4_step1: '<strong>The company identifies multiple potential sites.</strong>',
    s4_step2: '<strong>The company creates competition among them.</strong> Each jurisdiction is told — explicitly or implicitly — that it is competing against other sites with generous offers. This creates anxiety among local officials who fear losing the project.',
    s4_step3: '<strong>The company extracts maximum concessions.</strong> Jurisdictions, driven by fear of losing out, increase their offers. The "winning" bid far exceeds what was actually necessary to attract the investment.',
    s4_step4: '<strong>The company selects the location it preferred all along.</strong> Bartik\'s research: true in at least 90% of cases. The subsidy did not change the decision; it simply enriched the company at public expense.',
    s4_step5: '<strong>The promised benefits fail to materialize.</strong> Headline job numbers are for a distant final phase. The binding Phase 1 commitment is a fraction. Even that is often not met.',
    s4_louisiana: '<strong>The Louisiana Factor:</strong> The company already owns an operating shipyard in Louisiana. Cameron County is not competing with Louisiana — the company is expanding from an existing base. The company needs Port Alpha to justify its $7.5B valuation to investors. That gives Cameron County leverage — not to offer more, but to demand better terms.',
    s5_label: '21 QUESTIONS YOUR ELECTED OFFICIALS MUST ASK',
    s5_intro: 'The following questions should be asked publicly, under oath, with answers recorded and made available to the public before any vote is taken.',
    s5_revenue_head: 'Revenue &amp; Contracts',
    q1: 'Does the company have existing Navy procurement contracts? Provide contract numbers, award dates, values, and durations.',
    q2: 'Does the company have letters of intent or MOUs with the Department of Defense or any prime defense contractor?',
    q3: 'Does the company have commercial vessel orders? From whom, at what volume, at what price?',
    q4: 'How much annual revenue does the company currently generate? Provide audited financial statements.',
    q5: 'How does the company plan to generate $2.25B–$2.70B in annual revenue to sustain the proposed payroll?',
    s5_jobs_head: 'Jobs &amp; Wages',
    q6: 'What is the specific, binding Phase 1 job target, and by what year must it be achieved?',
    q7: 'What is the full projected wage distribution, by $10,000 bands?',
    q8: 'How many of the "up to 10,000 jobs" will be direct hires versus temp agency employees?',
    q9: 'Will production workers receive health insurance, retirement benefits, and paid leave?',
    q10: 'Why did the average wage change from $75,500 to $90,000 between initial reports and the formal presentation?',
    s5_workforce_head: 'Workforce &amp; Training',
    q11: 'What is the plan to recruit 973 new workers per year from a market producing only 1,600 qualified graduates annually?',
    q12: 'What partnerships exist with local school districts, community colleges, or workforce development boards?',
    q13: 'What percentage of the projected workforce is expected to be Cameron County residents?',
    s5_water_head: 'Water &amp; Infrastructure',
    q14: 'What is the projected daily water consumption at full buildout?',
    q15: 'What is the source of this water?',
    q16: 'What infrastructure upgrades are required, and at what cost?',
    q17: 'What share of these costs will the company pay?',
    q18: 'What is the contingency plan if the region enters mandatory water rationing?',
    s5_finance_head: 'Finances &amp; Governance',
    q19: 'Provide copies of any pitch deck or financial model used to justify the $7.5B valuation.',
    q20: 'What is the plan to achieve profitability, and in what year does the company project becoming cash-flow positive?',
    q21: 'What automatic, non-negotiable clawback penalties will the company accept for failure to meet Phase 1 commitments?',
    s6_label: 'WHY THIS KEEPS HAPPENING',
    s6_intro: 'If the incentive model is a documented failure, why does it persist? The answer lies not in economics but in the dynamics of power, psychology, and politics.',
    s6_concentrated_head: 'Concentrated Benefits, Diffuse Costs',
    s6_concentrated_body: 'A $100 million tax break is concentrated in a single, highly motivated recipient. The cost is spread across thousands of taxpayers, each paying a little more, none feeling enough pain to organize against it. The system is structurally rigged in favor of the concentrated interest.',
    s6_ribbon_head: 'The Symbolism of the Ribbon-Cutting',
    s6_ribbon_body: 'A politician at a new factory makes the evening news. A politician maintaining a water treatment plant does not. The incentive model rewards symbolic action over substantive governance.',
    s6_industry_head: 'The Industry That Profits',
    s6_industry_body: 'An entire industry of site-selection consultants, bond lawyers, and economic development professionals makes its living from incentive deals. They provide the "analysis" that justifies the deals, creating a closed loop of self-serving logic.',
    s6_shorterm_head: 'Short-Term Thinking',
    s6_shortterm_body: 'Elected officials operate on election cycles. The costs of an incentive deal take years or decades to materialize. The political credit from announcing a deal is immediate. The structure of political time is perfectly aligned with making bad long-term decisions.',
    solution_label: 'THE ANTIDOTE',
    s6_antidote: 'Information. When communities understand the playbook, they can refuse to play their assigned role. When elected officials know the data, they can demand better terms. When citizens are equipped with the evidence, they can hold their representatives accountable. This document is a contribution to that effort.',
    s7_label: 'A SUGGESTED PUBLIC STATEMENT',
    s7_intro: 'Any jurisdiction facing a high-pressure incentive negotiation may wish to communicate the following:',
    s7_statement: '"We have reviewed the proposal. We have reviewed the scientific evidence. We have reviewed the historical record. We are not going to participate in an auction that pits communities against each other for the benefit of private investors. We are prepared to negotiate a fair, transparent, and enforceable agreement. If the company can meet these conditions — verifiable contracts, binding job commitments with automatic clawbacks, a full wage distribution, and an independent cost-benefit analysis — we welcome further discussion. If the company prefers to expand without these conditions, we wish them well. Our obligation is to the people we serve, not to the investors of any private firm."',
    final_label: 'A FINAL WORD',
    final_p1: 'The company asking for your money has raised $2.5 billion from investors. It is valued at $7.5 billion. It already owns an operating shipyard in another state. It is run by a private equity professional whose career has been spent extracting value for investors.',
    final_p2: 'I am a disabled veteran. I built the analytical system that produced this research with $396,000 of my own money over more than a decade. I have no financial interest in the outcome of this vote.',
    final_p3: 'You do not need their money. They need your land, your port, your workforce, and your tax base. The question is not whether you can afford to say no. The question is whether you can afford to say yes on the terms they have offered.',
    final_statement: 'The evidence is in. The math is done. The decision is yours.',
    footer_org: 'Founder, Brasidas Strategies',
    footer_ayala_label: 'Prepared with assistance of',
    footer_investment: 'Total investment in Ayala™ since 2014: $396,000',
    footer_classification: 'Open Source — Public Interest &amp; Educational Use',
    footer_reproduce: 'This document may be freely reproduced, distributed, and adapted.',
    footer_date: 'June 2026',
    footer_sources_label: 'Key sources:',
    table1_caption: 'Jobs Created per $1 Billion Invested',
  },

  es: {
    doc_type: 'INFORME DE INTELIGENCIA — INTERÉS PÚBLICO',
    site_title: 'EL RESUMEN DEL PUEBLO',
    site_subtitle: 'Entendiendo y Evaluando Propuestas de Incentivos Económicos a Gran Escala',
    prepared_by_label: 'PREPARADO POR',
    author_role: 'Fundador, Brasidas Strategies',
    ayala_label: 'CON ASISTENCIA DE',
    dateline: 'Junio 2026 · Fuente Abierta · Interés Público y Uso Educativo',
    sidebar_heading: 'CONTENIDO',
    classification: 'FUENTE ABIERTA<br>INTERÉS PÚBLICO',
    nav_letter: 'CARTA',
    nav_exec: 'RESUMEN EJEC.',
    nav_s1: '§1 EVIDENCIA',
    nav_s2: '§2 PROPUESTA',
    nav_s3: '§3 MATEMÁTICAS',
    nav_s4: '§4 MANUAL',
    nav_s5: '§5 PREGUNTAS',
    nav_s6: '§6 POR QUÉ',
    nav_s7: '§7 DECLARACIÓN',
    nav_final: 'PALABRA FINAL',
    nav_letter_long: 'Carta al Lector',
    nav_exec_long: 'Resumen Ejecutivo',
    nav_s1_long: 'La Evidencia',
    nav_s2_long: 'La Propuesta',
    nav_s3_long: 'Las Matemáticas',
    nav_s4_long: 'Manual de Extracción',
    nav_s5_long: '21 Preguntas',
    nav_s6_long: 'Por Qué Persiste',
    nav_s7_long: 'Declaración Pública',
    nav_final_long: 'Palabra Final',
    letter_label: 'UNA CARTA AL LECTOR',
    letter_p1: 'No soy un cabildero. No soy un consultor. Ninguna empresa, corporación de desarrollo económico ni agencia gubernamental me paga. Soy un veterano discapacitado con servicio militar de trece años en el Ejército de los Estados Unidos como Sargento de Estado Mayor. Soy residente de toda la vida del Valle del Río Grande. Construí un sistema de neurointeligencia llamado Ayala™ con mis propios ahorros — $396,000 invertidos durante más de una década — para ayudar a los veteranos, los ciegos, los discapacitados y sus familias a navegar sistemas diseñados para agotarlos.',
    letter_p2: 'En el camino, descubrí que las mismas herramientas analíticas que construí para luchar contra el VA podían aplicarse a otro tipo de extracción: los acuerdos de desarrollo económico que han devastado comunidades como la mía durante décadas.',
    letter_p3: 'Este documento es el producto de ese trabajo. No está escrito para decirte qué pensar. Está escrito para darte las herramientas para pensar por ti mismo. Cada afirmación está documentada. Cada cálculo está mostrado. Cada concepto está explicado. Si no lees nada más, lee el Resumen Ejecutivo. Si quieres entender las matemáticas, lee la Sección 3. Si quieres saber qué preguntas hacerles a tus funcionarios electos, lee la Sección 5.',
    letter_p4: 'Lo ofrezco libremente a cualquiera que lo quiera. Reprodúcelo. Compártelo. Úsalo en audiencias públicas. Úsalo para cuestionar a tus representantes. Úsalo para educar a tus vecinos. El conocimiento es el único antídoto para la extracción.',
    letter_sig: '— Arnoldo Alonso',
    exec_label: 'RESUMEN EJECUTIVO',
    exec_finding_head: 'El Hallazgo Central',
    exec_finding_body: 'Durante más de cuarenta años, comunidades en todo Estados Unidos han recibido la misma oferta: dale a una gran corporación una exención fiscal masiva y traerá empleos y prosperidad. La evidencia académica demuestra que este modelo no funciona. En la gran mayoría de los casos, los empleos prometidos no se materializan a la escala y los salarios prometidos, el costo público supera con creces cualquier retorno fiscal plausible, y los principales beneficiarios son los accionistas corporativos — no la comunidad.',
    exec_situation_head: 'La Situación Actual',
    exec_situation_body: 'Una empresa está solicitando una exención del impuesto predial del 95% del Condado de Cameron, Texas, para construir una gran instalación manufacturera. La empresa proyecta "hasta 10,000 empleos" y un salario promedio cercano a $90,000. La votación de la Corte de Comisionados está programada para el 16 de junio de 2026.',
    exec_provides_head: 'Qué Proporciona Este Documento',
    exec_item1: '<strong>La Evidencia Científica</strong> — cuarenta años de investigación revisada por pares sobre incentivos fiscales empresariales',
    exec_item2: '<strong>El Análisis Matemático</strong> — deconstrucción paso a paso de las afirmaciones de la empresa',
    exec_item3: '<strong>El Registro Histórico</strong> — acuerdos comparables y lo que realmente ocurrió',
    exec_item4: '<strong>La Lista de Señales de Alerta</strong> — marco de ocho puntos para evaluar cualquier propuesta de incentivos',
    exec_item5: '<strong>Las Preguntas a Hacer</strong> — 21 preguntas específicas que exigen respuestas públicas',
    exec_item6: '<strong>El Patrón Profundo</strong> — por qué este modelo persiste a pesar del fracaso documentado',
    recommendation_label: 'RECOMENDACIÓN',
    recommendation_body: 'No aprobar el paquete de incentivos tal como se presenta actualmente. Exigir evidencia verificable e independiente que respalde cada proyección. Requerir compromisos vinculantes y ejecutables con penalidades automáticas por incumplimiento. Si la empresa no puede cumplir estas condiciones, no tiene derecho a solicitar fondos públicos.',
    s1_label: 'LA EVIDENCIA — LO QUE NOS DICE LA CIENCIA',
    s1_experts_head: '1.1 Los Expertos Han Hablado',
    s1_intro: 'La pregunta de si los incentivos fiscales empresariales funcionan ha sido estudiada durante décadas por los economistas más respetados del mundo. Sus hallazgos se publican en revistas revisadas por pares. No tienen interés financiero en ningún acuerdo de incentivos particular.',
    scholar1_name: 'Dr. Timothy Bartik — Instituto W.E. Upjohn (2019)',
    scholar1_p1: 'Al menos el 90% de los grandes paquetes de incentivos son innecesarios. La empresa habría elegido una ubicación similar sin el subsidio.',
    scholar1_p2: 'Costo público promedio por empleo creado: $100,000 a $200,000 — muy por encima de cualquier ingreso fiscal que la comunidad pueda recuperar.',
    scholar1_p3: 'La mayoría de los empleos van a personas que no viven en la comunidad. Llegan en carro, gastan su dinero en otro lugar.',
    scholar2_name: 'Dr. Neumark y Dr. Kolko — Journal of Urban Economics (2010)',
    scholar2_quote: '"Los programas de zonas empresariales que estudiamos tienden a tener poco o ningún efecto positivo en los resultados económicos de los residentes de la zona."',
    scholar3_name: 'Busso, Gregory y Kline — American Economic Review (2013)',
    scholar3_quote: '"No encontramos ningún efecto detectable en el empleo o los salarios" de los residentes de la zona. Los principales beneficiarios fueron los propietarios — arrendadores, promotores y especuladores.',
    scholar4_name: 'Dra. Slattery y Dr. Zidar — Journal of Economic Perspectives (2020)',
    scholar4_quote: '"No encontramos evidencia sólida de que los incentivos fiscales específicos para empresas aumenten el crecimiento económico más amplio."',
    scholar5_name: 'Dr. Chirinko y Dr. Wilson — Journal of Public Economics (2008)',
    scholar5_body: 'Los créditos fiscales estatales de inversión son un "juego de suma cero" — simplemente mueven la actividad económica de un estado a otro sin crear ningún crecimiento neto nuevo.',
    s1_prosperity_head: '1.2 ¿Qué Crea Prosperidad Real?',
    s1_prosperity_intro: 'Un estudio de 2019 del Instituto de Investigación de Economía Política, Universidad de Massachusetts Amherst:',
    table_col_investment: 'Tipo de Inversión',
    table_col_jobs: 'Empleos Creados por $1 Mil Millones',
    invest_education: 'Educación',
    invest_transit: 'Transporte Público',
    invest_healthcare: 'Salud',
    invest_energy: 'Energía Limpia',
    invest_defense: 'Manufactura de Defensa',
    s1_history_head: '1.3 El Registro Histórico',
    hist_col1: 'Empresa / Lugar', hist_col2: 'Año', hist_col3: 'Subsidio', hist_col4: 'Empleos Prometidos', hist_col5: 'Resultado',
    foxconn_outcome: '768 empleos entregados. Acuerdo renegociado en 2021. Inversión de $10B nunca realizada.',
    nissan_promised: 'Miles', nissan_outcome: 'Salarios de $10–$15/hora con mucho personal temporal. Sin transformación económica.',
    boeing_promised: 'Miles', boeing_outcome: 'Empleos entregados a ~$230,000 por puesto en subsidio público.',
    amazon_outcome: 'La oposición pública canceló el acuerdo. La empresa se expandió en otro lugar sin el subsidio.',
    tesla_outcome: 'Entrega por debajo del objetivo. Salarios mixtos.',
    s2_label: 'LA PROPUESTA ACTUAL',
    s2_company_head: '2.1 La Empresa',
    s2_company_body: 'Saronic Technologies — una startup de defensa que diseña embarcaciones autónomas para aplicaciones militares marítimas. Fundada en 2022, Austin TX. Recaudó $2.525 mil millones en capital de riesgo. Valorada en $7.5 mil millones (Serie D, marzo de 2026). Empleados verificados a finales de 2024: <strong>271</strong> (Exa Intelligence).',
    audit_label: 'NOTA DE AUDITORÍA',
    s2_employee_correction: 'Un borrador anterior citaba ~1,300 empleados. La cifra verificada de Exa Intelligence (finales de 2024) es 271. El recuento de 2026 puede ser mayor pero no ha sido divulgado públicamente. Todos los cálculos utilizan la base verificada de 271.',
    s2_contract_correction: 'Un borrador anterior afirmaba "sin contratos navales divulgados públicamente." Esto era incorrecto. Saronic tiene un contrato de Autoridad de Transacción Alternativa (OTA) de $392M durante 6 años (2025–2031) para embarcaciones autónomas de superficie clase Corsair — $65.3M/año. Fuente: HyperSinc. Este contrato es público y verificado.',
    s2_proposal_head: '2.2 La Propuesta',
    s2_proposal_body: 'Exención del impuesto predial del 95% sobre $2.7 mil millones en valor imponible, 19 años (2029–2048). "Hasta 10,000 empleos" con salario promedio de $90,000. Salario mínimo de $25/hora ($52,000/año). 835 acres en el Puerto de Brownsville. Voto aplazado el 3 de junio de 2026. Próxima votación: 16 de junio de 2026.',
    s2_abatement_correction: 'Una estimación anterior citaba "más de $100 millones" — esa era la cifra anual preliminar del condado. El total verificado a 19 años: $2.7B × 1.75% × 95% × 19 años = <strong>$852,862,500</strong>. Casi $853 millones en ingresos públicos perdidos.',
    s2_changes_head: '2.3 Lo Que Todo Lo Cambia',
    s2_change1: 'La empresa ya opera un astillero en Franklin, Louisiana — instalación adquirida (Gulf Craft, principios de 2025), $500M+ desplegados, primera embarcación lanzada en mayo de 2026. Port Alpha es expansión, no supervivencia.',
    s2_change2: 'El trasfondo del CEO es capital privado — Vista Equity Partners, H.I.G. Capital, Blackstone Real Estate. Entrenamiento en extraer valor para inversores, no en construir operaciones manufactureras sostenibles.',
    s2_change3: 'Saronic es uno de <strong>siete competidores</strong> por el contrato MUSV de la Marina — incluyendo Huntington Ingalls Industries (el mayor constructor naval de la Marina en EE.UU.) y Leidos (contratista de defensa de $14B).',
    s2_change4: 'gCaptain, publicación autorizada de la industria marítima: "La velocidad que todos aplauden ya estaba sentada en ese cobertizo antes de que el logo de Saronic llegara a la puerta." El cronograma de Franklin no predice el cronograma de Port Alpha.',
    s3_label: 'LAS MATEMÁTICAS — PASO A PASO',
    s3_intro: 'Cada cálculo está mostrado. Cada suposición está declarada. Cada fuente está citada.',
    s3_payroll_head: '3.1 El Problema de la Nómina',
    finding_label: 'HALLAZGO',
    s3_payroll_finding: 'La empresa necesita más de $2 mil millones en ingresos anuales para sostener la nómina prometida. No ha demostrado que un solo dólar de esos ingresos esté asegurado. Toda la proyección depende de contratos gubernamentales futuros que aún no existen, en una competencia que no está garantizada ganar.',
    s3_workforce_head: '3.2 La Fuerza Laboral Que No Puede Contratarse',
    s3_workforce_finding: 'Ningún astillero estadounidense ha expandido jamás su fuerza laboral en un factor de 10 en una década. La empresa no ha revelado ningún programa de capacitación, alianza educativa, ni plan para reclutar trabajadores de fuera de la región.',
    s3_wage_head: '3.3 La Ilusión del Salario Promedio',
    s3_wage_body: 'Un promedio no es el salario típico. Ejemplo: 100 ejecutivos a $500,000 + 9,900 trabajadores a $52,000 = promedio de $56,480. Nueve de cada diez trabajadores ganan el piso. El promedio reportado de la empresa cambió un 19% — de $75,500 a $90,000 — entre la cobertura de prensa inicial y la presentación formal, sin explicación. No se ha divulgado ninguna distribución salarial.',
    s3_subsidy_head: '3.4 El Verdadero Subsidio',
    s3_subsidy_result: 'Este acuerdo supera en 11 veces el umbral de solidez fiscal en el mejor de los casos. 34 veces en el escenario pesimista.',
    s3_water_head: '3.5 El Costo Oculto del Agua',
    s3_water_body: 'Un astillero importante consume millones de galones de agua al día. La directora ejecutiva del PUB de Brownsville declaró públicamente: "los grandes usuarios industriales que buscan capacidad de agua garantizada pueden necesitar acuerdos que ayuden a financiar nuevas fuentes de agua." Estimaciones independientes: $150M–$400M en infraestructura de agua requerida — completamente separado de la exención fiscal. Sin divulgación de la empresa.',
    s3_parlay_head: '3.6 La Apuesta de Cinco Condiciones',
    s3_parlay_intro: 'Para que Port Alpha entregue todo el valor prometido, cinco condiciones independientes deben ser simultáneamente verdaderas:',
    parlay_col_condition: 'Condición', parlay_col_prob: 'Prob. Est.',
    cond1: 'Los contratos de embarcaciones autónomas de la Marina escalan de $65M/año a $2B+/año',
    cond2: 'Saronic gana gran parte del MUSV vs. 6 competidores incluyendo HII y Leidos',
    cond3: '10,000 empleos se materializan con un verdadero salario promedio de $90,000',
    cond4: 'La mayoría de los empleos son ocupados por residentes del Condado de Cameron',
    cond5: 'Sin incumplimiento de recuperación ni renegociación durante 19 años',
    s3_parlay_finding: 'Se le pide al Condado de Cameron que comprometa $853 millones — casi mil millones de dólares de ingresos públicos — en un acuerdo con una probabilidad del 0.4% de éxito total. Incluso si las probabilidades individuales se duplican, la probabilidad conjunta sigue siendo inferior al 7%.',
    s4_label: 'EL MANUAL DE EXTRACCIÓN',
    s4_intro: 'El proceso de negociación de incentivos sigue un patrón predecible y bien documentado. Comprender este patrón es esencial para resistirlo.',
    s4_step1: '<strong>La empresa identifica múltiples sitios potenciales.</strong>',
    s4_step2: '<strong>La empresa crea competencia entre ellos.</strong> A cada jurisdicción se le dice — explícita o implícitamente — que compite contra otros sitios con ofertas generosas. Esto crea ansiedad entre los funcionarios locales que temen perder el proyecto.',
    s4_step3: '<strong>La empresa extrae concesiones máximas.</strong> Las jurisdicciones, impulsadas por el miedo a perder, aumentan sus ofertas. La oferta "ganadora" supera con creces lo que realmente era necesario para atraer la inversión.',
    s4_step4: '<strong>La empresa selecciona el lugar que prefería desde el principio.</strong> Investigación de Bartik: verdadero en al menos el 90% de los casos. El subsidio no cambió la decisión; simplemente enriqueció a la empresa a expensas del público.',
    s4_step5: '<strong>Los beneficios prometidos no se materializan.</strong> Los números de empleo titulares son para una fase final lejana. El compromiso vinculante de la Fase 1 es una fracción. Incluso eso a menudo no se cumple.',
    s4_louisiana: '<strong>El Factor Louisiana:</strong> La empresa ya posee un astillero operativo en Louisiana. El Condado de Cameron no compite con Louisiana — la empresa está expandiéndose desde una base existente. La empresa necesita Port Alpha para justificar su valoración de $7.5B ante los inversores. Eso le da al Condado de Cameron apalancamiento — no para ofrecer más, sino para exigir mejores términos.',
    s5_label: '21 PREGUNTAS QUE DEBEN HACERSE LOS FUNCIONARIOS ELECTOS',
    s5_intro: 'Las siguientes preguntas deben hacerse públicamente, bajo juramento, con las respuestas registradas y disponibles para el público antes de cualquier votación.',
    s5_revenue_head: 'Ingresos y Contratos',
    q1: '¿Tiene la empresa contratos de adquisición naval existentes? Proporcionar números de contrato, fechas de adjudicación, valores y duraciones.',
    q2: '¿Tiene la empresa cartas de intención o memorandos de entendimiento con el Departamento de Defensa o cualquier contratista principal de defensa?',
    q3: '¿Tiene la empresa pedidos comerciales de embarcaciones? ¿De quién, a qué volumen y a qué precio?',
    q4: '¿Cuántos ingresos anuales genera actualmente la empresa? Proporcionar estados financieros auditados.',
    q5: '¿Cómo planea la empresa generar $2.25B–$2.70B en ingresos anuales para sostener la nómina propuesta?',
    s5_jobs_head: 'Empleos y Salarios',
    q6: '¿Cuál es el objetivo específico y vinculante de empleos de la Fase 1, y para qué año debe lograrse?',
    q7: '¿Cuál es la distribución salarial proyectada completa, por bandas de $10,000?',
    q8: '¿Cuántos de los "hasta 10,000 empleos" serán contrataciones directas versus empleados de agencias temporales?',
    q9: '¿Los trabajadores de producción recibirán seguro médico, beneficios de jubilación y licencia pagada?',
    q10: '¿Por qué el salario promedio cambió de $75,500 a $90,000 entre los informes iniciales y la presentación formal?',
    s5_workforce_head: 'Fuerza Laboral y Capacitación',
    q11: '¿Cuál es el plan para reclutar 973 nuevos trabajadores al año de un mercado que produce solo 1,600 egresados calificados anualmente?',
    q12: '¿Qué alianzas existen con distritos escolares locales, colegios comunitarios o juntas de desarrollo de la fuerza laboral?',
    q13: '¿Qué porcentaje de la fuerza laboral proyectada se espera que sean residentes del Condado de Cameron?',
    s5_water_head: 'Agua e Infraestructura',
    q14: '¿Cuál es el consumo diario proyectado de agua en la operación completa?',
    q15: '¿Cuál es la fuente de esta agua?',
    q16: '¿Qué mejoras de infraestructura se requieren y a qué costo?',
    q17: '¿Qué parte de estos costos pagará la empresa?',
    q18: '¿Cuál es el plan de contingencia si la región entra en racionamiento obligatorio de agua?',
    s5_finance_head: 'Finanzas y Gobernanza',
    q19: 'Proporcionar copias de cualquier presentación para inversionistas o modelo financiero utilizado para justificar la valoración de $7.5B.',
    q20: '¿Cuál es el plan para lograr rentabilidad y en qué año proyecta la empresa tener flujo de caja positivo?',
    q21: '¿Qué penalidades automáticas e innegociables de recuperación aceptará la empresa por incumplimiento de los compromisos de la Fase 1?',
    s6_label: 'POR QUÉ SIGUE OCURRIENDO',
    s6_intro: 'Si el modelo de incentivos es un fracaso documentado, ¿por qué persiste? La respuesta no está en la economía sino en las dinámicas del poder, la psicología y la política.',
    s6_concentrated_head: 'Beneficios Concentrados, Costos Difusos',
    s6_concentrated_body: 'Una exención fiscal de $100 millones está concentrada en un solo receptor altamente motivado. El costo se distribuye entre miles de contribuyentes, cada uno pagando un poco más, ninguno sintiendo suficiente dolor para organizarse en contra. El sistema está estructuralmente amañado a favor del interés concentrado.',
    s6_ribbon_head: 'El Simbolismo del Corte de Cinta',
    s6_ribbon_body: 'Un político en una nueva fábrica sale en el noticiero. Un político manteniendo una planta de tratamiento de agua no. El modelo de incentivos recompensa la acción simbólica sobre la gobernanza sustantiva.',
    s6_industry_head: 'La Industria Que Se Beneficia',
    s6_industry_body: 'Toda una industria de consultores de selección de sitios, abogados de bonos y profesionales de desarrollo económico se gana la vida con acuerdos de incentivos. Proporcionan el "análisis" que justifica los acuerdos, creando un ciclo cerrado de lógica interesada.',
    s6_shorterm_head: 'Pensamiento a Corto Plazo',
    s6_shortterm_body: 'Los funcionarios electos operan en ciclos electorales. Los costos de un acuerdo de incentivos tardan años o décadas en materializarse. El crédito político por anunciar un acuerdo es inmediato. La estructura del tiempo político está perfectamente alineada con tomar malas decisiones a largo plazo.',
    solution_label: 'EL ANTÍDOTO',
    s6_antidote: 'Información. Cuando las comunidades entienden el manual, pueden negarse a desempeñar su papel asignado. Cuando los funcionarios electos conocen los datos, pueden exigir mejores términos. Cuando los ciudadanos están equipados con la evidencia, pueden responsabilizar a sus representantes. Este documento es una contribución a ese esfuerzo.',
    s7_label: 'UNA DECLARACIÓN PÚBLICA SUGERIDA',
    s7_intro: 'Cualquier jurisdicción que enfrente una negociación de incentivos bajo alta presión puede desear comunicar lo siguiente:',
    s7_statement: '"Hemos revisado la propuesta. Hemos revisado la evidencia científica. Hemos revisado el registro histórico. No vamos a participar en una subasta que enfrenta a comunidades entre sí en beneficio de inversores privados. Estamos preparados para negociar un acuerdo justo, transparente y ejecutable. Si la empresa puede cumplir estas condiciones — contratos verificables, compromisos de empleo vinculantes con recuperaciones automáticas, una distribución salarial completa y un análisis independiente de costo-beneficio — damos la bienvenida a más discusión. Si la empresa prefiere expandirse sin estas condiciones, le deseamos lo mejor. Nuestra obligación es con las personas a las que servimos, no con los inversores de ninguna empresa privada."',
    final_label: 'PALABRA FINAL',
    final_p1: 'La empresa que pide tu dinero ha recaudado $2.5 mil millones de inversores. Está valorada en $7.5 mil millones. Ya posee un astillero operativo en otro estado. Está dirigida por un profesional de capital privado cuya carrera ha sido dedicada a extraer valor para los inversores.',
    final_p2: 'Soy un veterano discapacitado. Construí el sistema analítico que produjo esta investigación con $396,000 de mi propio dinero durante más de una década. No tengo ningún interés financiero en el resultado de esta votación.',
    final_p3: 'No necesitas su dinero. Ellos necesitan tu tierra, tu puerto, tu fuerza laboral y tu base tributaria. La pregunta no es si puedes permitirte decir no. La pregunta es si puedes permitirte decir sí bajo los términos que han ofrecido.',
    final_statement: 'La evidencia está en. Las matemáticas están hechas. La decisión es tuya.',
    footer_org: 'Fundador, Brasidas Strategies',
    footer_ayala_label: 'Preparado con asistencia de',
    footer_investment: 'Inversión total en Ayala™ desde 2014: $396,000',
    footer_classification: 'Fuente Abierta — Interés Público y Uso Educativo',
    footer_reproduce: 'Este documento puede reproducirse, distribuirse y adaptarse libremente.',
    footer_date: 'Junio 2026',
    footer_sources_label: 'Fuentes principales:',
    table1_caption: 'Empleos Creados por $1 Mil Millones Invertidos',
  }
};

// ─── STATE ─────────────────────────────────────────────────────────────────────
let currentLang = 'en';
let isDark = false;
let isHighContrast = false;
let baseFontSize = 16;
let isReading = false;

// ─── DOM HELPERS ───────────────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─── LANGUAGE TOGGLE ──────────────────────────────────────────────────────────
function applyLanguage(lang) {
  currentLang = lang;
  const t = CONTENT[lang];
  const htmlEl = document.documentElement;
  htmlEl.lang = lang;

  // Update all [data-i18n] elements
  $$('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  // Update lang toggle button label
  const labelEl = $('#lang-label');
  if (labelEl) {
    labelEl.textContent = lang === 'en' ? 'ES →' : 'EN →';
  }

  // Announce to screen readers
  const live = $('#live-region');
  if (live) {
    live.textContent = lang === 'en'
      ? 'Language switched to English'
      : 'Idioma cambiado al español';
    setTimeout(() => { live.textContent = ''; }, 2000);
  }

  // Update document title
  document.title = lang === 'en'
    ? "The People's Brief — Arnoldo Alonso | Brasidas Strategies"
    : "El Resumen del Pueblo — Arnoldo Alonso | Brasidas Strategies";
}

$('#lang-toggle').addEventListener('click', () => {
  applyLanguage(currentLang === 'en' ? 'es' : 'en');
});

// ─── DARK MODE ─────────────────────────────────────────────────────────────────
const darkBtn = $('#contrast-btn');
// Repurpose: first click = dark, second click = high contrast, third = reset
let modeState = 0; // 0=light, 1=dark, 2=contrast
darkBtn.addEventListener('click', () => {
  modeState = (modeState + 1) % 3;
  document.body.classList.remove('dark-mode', 'high-contrast');
  if (modeState === 1) {
    document.body.classList.add('dark-mode');
    darkBtn.textContent = '◑ LIGHT';
  } else if (modeState === 2) {
    document.body.classList.add('high-contrast');
    darkBtn.textContent = '◑ RESET';
  } else {
    darkBtn.textContent = '◑ CONTRAST';
  }
});

// ─── FONT SIZE ─────────────────────────────────────────────────────────────────
$('#font-up').addEventListener('click', () => {
  baseFontSize = Math.min(baseFontSize + 2, 26);
  document.documentElement.style.setProperty('--base-size', baseFontSize + 'px');
  document.documentElement.style.fontSize = baseFontSize + 'px';
});
$('#font-down').addEventListener('click', () => {
  baseFontSize = Math.max(baseFontSize - 2, 12);
  document.documentElement.style.setProperty('--base-size', baseFontSize + 'px');
  document.documentElement.style.fontSize = baseFontSize + 'px';
});

// ─── TEXT-TO-SPEECH ────────────────────────────────────────────────────────────
const readBtn = $('#read-btn');
readBtn.addEventListener('click', () => {
  if (!window.speechSynthesis) {
    alert('Text-to-speech is not supported in this browser.');
    return;
  }
  if (isReading) {
    window.speechSynthesis.cancel();
    isReading = false;
    readBtn.textContent = '▶ READ';
    return;
  }
  const mainContent = $('#main-content');
  const text = mainContent ? mainContent.innerText : document.body.innerText;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = currentLang === 'es' ? 'es-MX' : 'en-US';
  utterance.rate = 0.9;
  utterance.onend = () => {
    isReading = false;
    readBtn.textContent = '▶ READ';
  };
  utterance.onerror = () => {
    isReading = false;
    readBtn.textContent = '▶ READ';
  };
  window.speechSynthesis.speak(utterance);
  isReading = true;
  readBtn.textContent = '■ STOP';
});

// ─── READING PROGRESS BAR ─────────────────────────────────────────────────────
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  const bar = $('#progress-bar');
  if (bar) bar.style.width = pct + '%';
}

// ─── SIDEBAR SCROLL SPY ────────────────────────────────────────────────────────
const sections = ['letter', 'executive-summary', 'section1', 'section2',
                  'section3', 'section4', 'section5', 'section6', 'section7', 'final-word'];

function updateActiveSidebarLink() {
  let current = sections[0];
  const offset = 100;
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top <= offset) {
      current = id;
    }
  });
  $$('.sidebar-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('data-section') === current);
  });
  // Also update top nav
  $$('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href) {
      item.classList.toggle('active', href === '#' + current);
    }
  });
}

window.addEventListener('scroll', () => {
  updateProgress();
  updateActiveSidebarLink();
}, { passive: true });

// ─── SMOOTH SCROLL FOR NAV LINKS ──────────────────────────────────────────────
$$('.nav-item, .sidebar-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        const utilityHeight = 36;
        const navHeight = 44;
        const offset = utilityHeight + navHeight + 16;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  });
});

// ─── INIT ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage('en');
  updateProgress();
  updateActiveSidebarLink();
});
