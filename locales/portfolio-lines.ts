// Translatable content for the Portfolio specialty-line cards (EN/ES/ZH).
// Order of `lines` is fixed and matches LINE_META in app/portfolio/page.tsx:
// 0 st, 1 property, 2 financial, 3 marine, 4 aviation.

export interface LineContent {
  label: string;
  headline: string;
  summary: string;
  capacityType: string;
  riskDescription: string;
  coverScope: string[];
  structures: string[];
  markets: string;
}

export interface PortfolioCopy {
  eyebrow: string;
  viewDetail: string;
  collapse: string;
  theRisk: string;
  coverageScope: string;
  structuresLabel: string;
  targetMarkets: string;
  ctaTitlePre: string;
  ctaTitleHighlight: string;
  ctaText: string;
  ctaSubmit: string;
  ctaExplore: string;
  lines: LineContent[];
}

export const portfolioCopy: Record<"en" | "es" | "zh", PortfolioCopy> = {
  en: {
    eyebrow: "REINSURANCE PORTFOLIO",
    viewDetail: "VIEW DETAIL",
    collapse: "COLLAPSE",
    theRisk: "The Risk",
    coverageScope: "Coverage Scope",
    structuresLabel: "Structures",
    targetMarkets: "Target Markets",
    ctaTitlePre: "Submit a risk or explore a ",
    ctaTitleHighlight: "capacity partnership.",
    ctaText:
      "Whether you are a cedant seeking facultative reinsurance support or an institution looking to deploy capacity, we want to hear from you.",
    ctaSubmit: "Submit a Risk",
    ctaExplore: "Explore Partnership",
    lines: [
      {
        label: "SABOTAGE & TERRORISM",
        headline: "Sabotage & Terrorism",
        summary:
          "Facultative reinsurance capacity for deliberate acts of sabotage and terrorism — covering physical damage and business interruption on a risk-by-risk basis.",
        capacityType: "Facultative Reinsurance",
        riskDescription:
          "Sabotage & Terrorism (S&T) covers losses arising from deliberate acts intended to damage, destroy, or disrupt insured property and operations. This includes physical damage to buildings, machinery, and infrastructure, as well as business interruption resulting from an insured event. S&T exposure is typically excluded from standard property policies and requires standalone or wrap-around coverage structures negotiated on a per-risk basis.",
        coverScope: [
          "Physical damage to commercial, industrial, and infrastructure assets",
          "Business interruption and loss of income following an insured event",
          "Denial of access and threat-related business disruption",
          "Political violence including riots, strikes, and civil commotion (RSCC) where applicable",
          "Contingent business interruption for supply chain exposure",
        ],
        structures: [
          "Excess of Loss (per risk, per occurrence)",
          "Proportional / Pro-Rata (quota share and surplus)",
          "Stand-alone S&T facultative placement",
          "S&T wrap on top of existing property programs",
        ],
        markets:
          "Global. Particular focus on high-risk and emerging markets where S&T exposure is material — Middle East, Latin America, South and Southeast Asia, and strategic infrastructure assets worldwide.",
      },
      {
        label: "PROPERTY",
        headline: "Property",
        summary:
          "Reinsurance capacity for commercial and industrial property risks — covering physical damage and business interruption across a broad range of occupancies and perils.",
        capacityType: "Facultative & Treaty Reinsurance",
        riskDescription:
          "Property reinsurance covers physical damage to buildings, contents, and business assets, plus the financial consequences of interruption to operations. Heath underwrites property reinsurance for cedants with large or complex risks that require bespoke facultative support, as well as treaty programs across commercial and industrial portfolios.",
        coverScope: [
          "Material damage (MD) — buildings, plant, machinery, stock, and contents",
          "Business interruption (BI) and extra expense",
          "Natural catastrophe perils: wind, flood, earthquake, hail",
          "Fire, explosion, machinery breakdown, and electronic equipment",
          "Construction and engineering (CAR/EAR) for large-scale projects",
          "Large industrial and manufacturing risks including energy and power generation",
        ],
        structures: [
          "Facultative excess of loss and proportional",
          "Per-risk and per-occurrence excess of loss treaties",
          "Quota share and surplus treaties",
          "Aggregate stop-loss for portfolio protection",
        ],
        markets:
          "Global. Strong focus on cedants in Latin America, the Caribbean, and Southern Europe seeking bespoke capacity for large or complex property risks.",
      },
      {
        label: "FINANCIAL LINES",
        headline: "Financial Lines",
        summary:
          "Reinsurance capacity for directors & officers liability, professional indemnity, cyber, and crime — supporting cedants underwriting complex management and financial risk.",
        capacityType: "Facultative & Treaty Reinsurance",
        riskDescription:
          "Financial Lines reinsurance covers liability exposures arising from management decisions, professional services, and financial crime. As regulatory scrutiny intensifies and cyber incidents multiply, cedants face growing frequency and severity in their financial lines portfolios. Heath provides reinsurance capacity to support these evolving risks with disciplined underwriting and data-driven pricing.",
        coverScope: [
          "Directors & Officers (D&O) — corporate, institutional, and Side A coverage",
          "Errors & Omissions / Professional Indemnity (E&O / PI)",
          "Cyber liability: first-party and third-party (incident response, data breach, ransomware)",
          "Commercial crime and financial institution bonds (FIB)",
          "Employed lawyers and technology professional liability",
          "Employment practices liability (EPL)",
        ],
        structures: [
          "Facultative excess of loss for large or complex placements",
          "Per-claim and per-occurrence excess of loss treaties",
          "Aggregate excess of loss for cyber portfolios",
          "Quota share treaties for growing cedant portfolios",
        ],
        markets:
          "Global with particular expertise in North America, the UK, and Continental Europe. Active capacity for Latin American and emerging-market cedants seeking professional liability and cyber reinsurance support.",
      },
      {
        label: "MARINE",
        headline: "Marine",
        summary:
          "Reinsurance capacity for marine cargo, hull, and offshore energy — supporting cedants across the full spectrum of maritime and logistical risk.",
        capacityType: "Facultative & Treaty Reinsurance",
        riskDescription:
          "Marine reinsurance covers physical damage and liability arising from the movement of goods, the operation of vessels, and offshore energy activities. With global supply chains under increasing pressure from geopolitical disruption, climate events, and infrastructure congestion, marine reinsurance plays a critical role in stabilising cedant portfolios exposed to large individual risks and accumulation scenarios.",
        coverScope: [
          "Cargo: inland transit, ocean cargo, and stock throughput",
          "Hull & Machinery (H&M): commercial vessels, tankers, bulk carriers",
          "Protection & Indemnity (P&I) reinsurance support",
          "Offshore energy: platforms, FPSOs, subsea infrastructure",
          "Ports and terminals: physical damage and liability",
          "Marine liability: ship repairers, stevedores, and terminal operators",
        ],
        structures: [
          "Facultative excess of loss for large single risks (cargo, hull, offshore)",
          "Per-voyage and per-vessel facultative placements",
          "Cargo treaty (per-risk XL and quota share)",
          "Hull treaty excess of loss",
        ],
        markets:
          "Global. Focused on cedants in key maritime hubs — London market, Singapore, Rotterdam, Miami — as well as growing marine books in Latin America and Southeast Asia.",
      },
      {
        label: "AVIATION",
        headline: "Aviation",
        summary:
          "Reinsurance capacity for aviation hull and liability — supporting cedants underwriting commercial airlines, business aviation, airports, and aerospace manufacturers.",
        capacityType: "Facultative & Treaty Reinsurance",
        riskDescription:
          "Aviation reinsurance covers physical damage to aircraft (hull) and third-party liability arising from aviation operations. The aviation market is highly technical, driven by fleet values, route exposure, and tail-risk liability. Heath underwrites aviation reinsurance with a focus on disciplined risk selection, supporting cedants managing complex and high-value aviation portfolios.",
        coverScope: [
          "Airline hull & liability: commercial passenger carriers, freighters, charter",
          "General aviation: business jets, turboprops, helicopters",
          "Aviation products liability: airframe and component manufacturers",
          "Airport operators liability and ground handling",
          "Aerospace: satellites, launch vehicles, and spacecraft",
          "War and terrorism hull and liability coverage",
        ],
        structures: [
          "Facultative excess of loss for individual airline or fleet risks",
          "Proportional facultative for smaller or regional carriers",
          "Per-occurrence and per-aircraft excess of loss treaties",
          "Quota share treaties for general aviation and aerospace portfolios",
        ],
        markets:
          "Global. Active capacity for cedants in North America, Europe, the Middle East, and Latin America. Growing interest in Asian aviation markets and emerging aerospace risks.",
      },
    ],
  },

  es: {
    eyebrow: "PORTAFOLIO DE REASEGURO",
    viewDetail: "VER DETALLE",
    collapse: "OCULTAR",
    theRisk: "El Riesgo",
    coverageScope: "Alcance de Cobertura",
    structuresLabel: "Estructuras",
    targetMarkets: "Mercados Objetivo",
    ctaTitlePre: "Presenta un riesgo o explora una ",
    ctaTitleHighlight: "alianza de capacidad.",
    ctaText:
      "Ya seas una cedente que busca soporte de reaseguro facultativo o una institución que quiere desplegar capacidad, queremos saber de ti.",
    ctaSubmit: "Presentar un Riesgo",
    ctaExplore: "Explorar Alianza",
    lines: [
      {
        label: "SABOTAJE Y TERRORISMO",
        headline: "Sabotaje y Terrorismo",
        summary:
          "Capacidad de reaseguro facultativo para actos deliberados de sabotaje y terrorismo — cubriendo daño físico e interrupción de negocio caso por caso.",
        capacityType: "Reaseguro Facultativo",
        riskDescription:
          "Sabotaje y Terrorismo (S&T) cubre las pérdidas derivadas de actos deliberados destinados a dañar, destruir o interrumpir los bienes y operaciones asegurados. Incluye el daño físico a edificios, maquinaria e infraestructura, así como la interrupción de negocio resultante de un evento asegurado. La exposición a S&T suele excluirse de las pólizas de propiedad estándar y requiere estructuras de cobertura independientes o complementarias negociadas riesgo por riesgo.",
        coverScope: [
          "Daño físico a activos comerciales, industriales y de infraestructura",
          "Interrupción de negocio y pérdida de ingresos tras un evento asegurado",
          "Denegación de acceso e interrupción del negocio por amenazas",
          "Violencia política, incluidos disturbios, huelgas y conmoción civil (RSCC) cuando aplique",
          "Interrupción de negocio contingente por exposición en la cadena de suministro",
        ],
        structures: [
          "Exceso de pérdida (por riesgo, por ocurrencia)",
          "Proporcional / a prorrata (cuota parte y excedente)",
          "Colocación facultativa independiente de S&T",
          "Complemento de S&T sobre programas de propiedad existentes",
        ],
        markets:
          "Global. Enfoque particular en mercados de alto riesgo y emergentes donde la exposición a S&T es material — Medio Oriente, América Latina, Sur y Sudeste Asiático, y activos de infraestructura estratégica en todo el mundo.",
      },
      {
        label: "PROPIEDAD",
        headline: "Propiedad",
        summary:
          "Capacidad de reaseguro para riesgos de propiedad comercial e industrial — cubriendo daño físico e interrupción de negocio en una amplia gama de ocupaciones y peligros.",
        capacityType: "Reaseguro Facultativo y Contractual",
        riskDescription:
          "El reaseguro de propiedad cubre el daño físico a edificios, contenidos y activos del negocio, además de las consecuencias financieras de la interrupción de las operaciones. Heath suscribe reaseguro de propiedad para cedentes con riesgos grandes o complejos que requieren soporte facultativo a medida, así como programas contractuales en carteras comerciales e industriales.",
        coverScope: [
          "Daño material (DM) — edificios, planta, maquinaria, existencias y contenidos",
          "Interrupción de negocio (IN) y gastos extraordinarios",
          "Peligros de catástrofe natural: viento, inundación, terremoto, granizo",
          "Incendio, explosión, rotura de maquinaria y equipos electrónicos",
          "Construcción e ingeniería (CAR/EAR) para proyectos de gran escala",
          "Grandes riesgos industriales y de manufactura, incluida energía y generación eléctrica",
        ],
        structures: [
          "Exceso de pérdida facultativo y proporcional",
          "Tratados de exceso de pérdida por riesgo y por ocurrencia",
          "Tratados de cuota parte y excedente",
          "Stop-loss agregado para protección de cartera",
        ],
        markets:
          "Global. Fuerte enfoque en cedentes de América Latina, el Caribe y el Sur de Europa que buscan capacidad a medida para riesgos de propiedad grandes o complejos.",
      },
      {
        label: "LÍNEAS FINANCIERAS",
        headline: "Líneas Financieras",
        summary:
          "Capacidad de reaseguro para responsabilidad de directores y funcionarios, responsabilidad profesional, cíber y crimen — apoyando a cedentes que suscriben riesgos complejos de gestión y financieros.",
        capacityType: "Reaseguro Facultativo y Contractual",
        riskDescription:
          "El reaseguro de Líneas Financieras cubre exposiciones de responsabilidad derivadas de decisiones de gestión, servicios profesionales y crimen financiero. A medida que se intensifica el escrutinio regulatorio y se multiplican los incidentes cíber, las cedentes enfrentan mayor frecuencia y severidad en sus carteras de líneas financieras. Heath aporta capacidad de reaseguro para apoyar estos riesgos en evolución con suscripción disciplinada y tarificación basada en datos.",
        coverScope: [
          "Directores y Funcionarios (D&O) — corporativa, institucional y cobertura Side A",
          "Errores y Omisiones / Responsabilidad Profesional (E&O / PI)",
          "Responsabilidad cíber: primera y tercera parte (respuesta a incidentes, brecha de datos, ransomware)",
          "Crimen comercial y bonos de instituciones financieras (FIB)",
          "Abogados internos y responsabilidad profesional tecnológica",
          "Responsabilidad por prácticas de empleo (EPL)",
        ],
        structures: [
          "Exceso de pérdida facultativo para colocaciones grandes o complejas",
          "Tratados de exceso de pérdida por reclamación y por ocurrencia",
          "Exceso de pérdida agregado para carteras cíber",
          "Tratados de cuota parte para carteras de cedentes en crecimiento",
        ],
        markets:
          "Global, con experiencia particular en Norteamérica, el Reino Unido y Europa continental. Capacidad activa para cedentes de América Latina y mercados emergentes que buscan soporte de reaseguro en responsabilidad profesional y cíber.",
      },
      {
        label: "MARÍTIMO",
        headline: "Marítimo",
        summary:
          "Capacidad de reaseguro para carga marítima, casco y energía offshore — apoyando a cedentes en todo el espectro del riesgo marítimo y logístico.",
        capacityType: "Reaseguro Facultativo y Contractual",
        riskDescription:
          "El reaseguro marítimo cubre el daño físico y la responsabilidad derivados del movimiento de mercancías, la operación de buques y las actividades de energía offshore. Con cadenas de suministro globales bajo creciente presión por la disrupción geopolítica, los eventos climáticos y la congestión de infraestructura, el reaseguro marítimo cumple un papel crítico para estabilizar las carteras de cedentes expuestas a grandes riesgos individuales y escenarios de acumulación.",
        coverScope: [
          "Carga: tránsito terrestre, carga marítima y throughput de existencias",
          "Casco y Maquinaria (H&M): buques comerciales, tanqueros, graneleros",
          "Soporte de reaseguro de Protección e Indemnización (P&I)",
          "Energía offshore: plataformas, FPSOs, infraestructura submarina",
          "Puertos y terminales: daño físico y responsabilidad",
          "Responsabilidad marítima: reparadores de buques, estibadores y operadores de terminales",
        ],
        structures: [
          "Exceso de pérdida facultativo para grandes riesgos individuales (carga, casco, offshore)",
          "Colocaciones facultativas por viaje y por buque",
          "Tratado de carga (XL por riesgo y cuota parte)",
          "Tratado de casco de exceso de pérdida",
        ],
        markets:
          "Global. Enfocado en cedentes de los principales centros marítimos — el mercado de Londres, Singapur, Róterdam, Miami — así como carteras marítimas en crecimiento en América Latina y el Sudeste Asiático.",
      },
      {
        label: "AVIACIÓN",
        headline: "Aviación",
        summary:
          "Capacidad de reaseguro para casco y responsabilidad de aviación — apoyando a cedentes que suscriben aerolíneas comerciales, aviación de negocios, aeropuertos y fabricantes aeroespaciales.",
        capacityType: "Reaseguro Facultativo y Contractual",
        riskDescription:
          "El reaseguro de aviación cubre el daño físico a las aeronaves (casco) y la responsabilidad frente a terceros derivada de las operaciones de aviación. El mercado de aviación es altamente técnico, impulsado por el valor de las flotas, la exposición de rutas y la responsabilidad de cola. Heath suscribe reaseguro de aviación con foco en una selección de riesgos disciplinada, apoyando a cedentes que gestionan carteras de aviación complejas y de alto valor.",
        coverScope: [
          "Casco y responsabilidad de aerolíneas: transporte de pasajeros, carga, chárter",
          "Aviación general: jets de negocios, turbohélices, helicópteros",
          "Responsabilidad de productos de aviación: fabricantes de fuselajes y componentes",
          "Responsabilidad de operadores de aeropuertos y handling en tierra",
          "Aeroespacial: satélites, vehículos de lanzamiento y naves espaciales",
          "Cobertura de casco y responsabilidad por guerra y terrorismo",
        ],
        structures: [
          "Exceso de pérdida facultativo para riesgos individuales de aerolíneas o flotas",
          "Facultativo proporcional para transportistas más pequeños o regionales",
          "Tratados de exceso de pérdida por ocurrencia y por aeronave",
          "Tratados de cuota parte para carteras de aviación general y aeroespacial",
        ],
        markets:
          "Global. Capacidad activa para cedentes de Norteamérica, Europa, Medio Oriente y América Latina. Creciente interés en los mercados de aviación asiáticos y en riesgos aeroespaciales emergentes.",
      },
    ],
  },

  zh: {
    eyebrow: "再保险组合",
    viewDetail: "查看详情",
    collapse: "收起",
    theRisk: "风险",
    coverageScope: "承保范围",
    structuresLabel: "结构",
    targetMarkets: "目标市场",
    ctaTitlePre: "提交风险，或探索",
    ctaTitleHighlight: "承保能力合作。",
    ctaText:
      "无论您是寻求临分再保险支持的分出公司，还是希望部署承保能力的机构，我们都期待与您联系。",
    ctaSubmit: "提交风险",
    ctaExplore: "探索合作",
    lines: [
      {
        label: "破坏与恐怖主义",
        headline: "破坏与恐怖主义",
        summary:
          "为蓄意的破坏与恐怖主义行为提供临分再保险承保能力——按逐一风险方式承保实物损失与营业中断。",
        capacityType: "临分再保险",
        riskDescription:
          "破坏与恐怖主义（S&T）承保因蓄意损害、摧毁或扰乱被保险财产及运营的行为所产生的损失。涵盖建筑物、机器设备与基础设施的实物损失，以及由承保事件导致的营业中断。S&T 暴露通常被标准财产保单除外，需要按逐一风险协商的独立或附加承保结构。",
        coverScope: [
          "商业、工业及基础设施资产的实物损失",
          "承保事件后的营业中断与收入损失",
          "进入受阻及与威胁相关的业务中断",
          "政治暴力，包括暴乱、罢工与民众骚乱（RSCC，如适用）",
          "供应链暴露的连带营业中断",
        ],
        structures: [
          "超额赔款（逐一风险、逐一事故）",
          "比例分保 / 成数（成数与溢额）",
          "独立的 S&T 临分安排",
          "在现有财产计划之上的 S&T 附加",
        ],
        markets:
          "全球。特别关注 S&T 暴露显著的高风险与新兴市场——中东、拉丁美洲、南亚与东南亚，以及全球战略基础设施资产。",
      },
      {
        label: "财产",
        headline: "财产",
        summary:
          "为商业与工业财产风险提供再保险承保能力——在广泛的占用类型与风险中承保实物损失与营业中断。",
        capacityType: "临分与合约再保险",
        riskDescription:
          "财产再保险承保建筑物、物品与经营资产的实物损失，以及运营中断带来的财务后果。Heath 为拥有大型或复杂风险、需要量身定制临分支持的分出公司承保财产再保险，并为商业与工业组合提供合约计划。",
        coverScope: [
          "实物损失（MD）——建筑、厂房、机器、存货与物品",
          "营业中断（BI）与额外费用",
          "自然巨灾风险：风、洪水、地震、冰雹",
          "火灾、爆炸、机器损坏与电子设备",
          "建筑与工程（CAR/EAR）大型项目",
          "大型工业与制造风险，包括能源与电力生产",
        ],
        structures: [
          "临分超额赔款与比例分保",
          "逐一风险与逐一事故超额赔款合约",
          "成数与溢额合约",
          "用于组合保护的累计止损",
        ],
        markets:
          "全球。重点关注拉丁美洲、加勒比地区与南欧的分出公司，为大型或复杂财产风险寻求量身定制的承保能力。",
      },
      {
        label: "金融险种",
        headline: "金融险种",
        summary:
          "为董事及高管责任、职业责任、网络与犯罪险提供再保险承保能力——支持承保复杂管理与金融风险的分出公司。",
        capacityType: "临分与合约再保险",
        riskDescription:
          "金融险种再保险承保因管理决策、职业服务与金融犯罪所产生的责任暴露。随着监管审查趋严、网络事件增多，分出公司在其金融险种组合中面临日益增加的频率与严重程度。Heath 以严谨的核保与数据驱动的定价，提供再保险承保能力以支持这些不断演变的风险。",
        coverScope: [
          "董事及高管责任（D&O）——企业、机构与 Side A 承保",
          "错误与遗漏 / 职业赔偿（E&O / PI）",
          "网络责任：第一方与第三方（事件响应、数据泄露、勒索软件）",
          "商业犯罪与金融机构债券（FIB）",
          "受雇律师与技术职业责任",
          "雇佣行为责任（EPL）",
        ],
        structures: [
          "针对大型或复杂业务的临分超额赔款",
          "逐一索赔与逐一事故超额赔款合约",
          "针对网络组合的累计超额赔款",
          "针对成长型分出公司组合的成数合约",
        ],
        markets:
          "全球，在北美、英国与欧洲大陆拥有特别专长。为寻求职业责任与网络再保险支持的拉丁美洲及新兴市场分出公司提供活跃的承保能力。",
      },
      {
        label: "水险",
        headline: "水险",
        summary:
          "为海运货物、船壳与海上能源提供再保险承保能力——支持分出公司覆盖海事与物流风险的全谱系。",
        capacityType: "临分与合约再保险",
        riskDescription:
          "水险再保险承保因货物运输、船舶运营与海上能源活动所产生的实物损失与责任。在地缘政治扰动、气候事件与基础设施拥堵使全球供应链承压之际，水险再保险在稳定面临大型单一风险与累积情景的分出公司组合方面发挥着关键作用。",
        coverScope: [
          "货物：内陆运输、海上货物与存货吞吐",
          "船壳与机器（H&M）：商用船舶、油轮、散货船",
          "保赔（P&I）再保险支持",
          "海上能源：平台、FPSO、海底基础设施",
          "港口与码头：实物损失与责任",
          "海事责任：修船方、装卸方与码头运营方",
        ],
        structures: [
          "针对大型单一风险（货物、船壳、海上）的临分超额赔款",
          "逐一航次与逐一船舶的临分安排",
          "货物合约（逐一风险 XL 与成数）",
          "船壳超额赔款合约",
        ],
        markets:
          "全球。聚焦主要海事枢纽的分出公司——伦敦市场、新加坡、鹿特丹、迈阿密——以及拉丁美洲与东南亚不断增长的水险业务。",
      },
      {
        label: "航空",
        headline: "航空",
        summary:
          "为航空机身与责任提供再保险承保能力——支持承保商业航空公司、公务航空、机场与航空航天制造商的分出公司。",
        capacityType: "临分与合约再保险",
        riskDescription:
          "航空再保险承保航空器的实物损失（机身）以及航空运营产生的第三方责任。航空市场高度专业，受机队价值、航线暴露与长尾责任驱动。Heath 以严谨的风险选择承保航空再保险，支持管理复杂且高价值航空组合的分出公司。",
        coverScope: [
          "航空公司机身与责任：商业客运、货运、包机",
          "通用航空：公务机、涡桨机、直升机",
          "航空产品责任：机身与部件制造商",
          "机场运营方责任与地面操作",
          "航空航天：卫星、运载火箭与航天器",
          "战争与恐怖主义机身与责任承保",
        ],
        structures: [
          "针对单一航空公司或机队风险的临分超额赔款",
          "针对小型或区域承运人的比例临分",
          "逐一事故与逐一航空器超额赔款合约",
          "针对通用航空与航空航天组合的成数合约",
        ],
        markets:
          "全球。为北美、欧洲、中东与拉丁美洲的分出公司提供活跃的承保能力。对亚洲航空市场与新兴航空航天风险的兴趣日益增长。",
      },
    ],
  },
};
