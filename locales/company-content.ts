// Translatable content for the Company page (EN/ES/ZH).
// Layout, icons, colors and the SVG background stay in app/company/page.tsx.

export interface TechItem {
  icon: string;
  title: string;
  desc: string;
  tag: string;
  highlight?: boolean;
}
export interface AiWorkflow {
  title: string;
  desc: string;
}
export interface ValueItem {
  num: string;
  title: string;
  desc: string;
  highlight?: boolean;
}
export interface GovBlock {
  title: string;
  items: string[];
}
export interface MissionVision {
  eyebrow: string;
  title: string;
  body: string;
}

export interface CompanyCopy {
  heroEyebrow: string;
  aiNativeMga: string;
  banner: [string, string][];
  purposeEyebrow: string;
  mission: MissionVision;
  vision: MissionVision;
  whoEyebrow: string;
  whoTitlePre: string;
  whoTitleHighlight: string;
  whoParagraphs: string[];
  whoStats: [string, string][];
  techEyebrow: string;
  techTitlePre: string;
  techTitleHighlight: string;
  techTitlePost: string;
  techPillLabel: string;
  techIntro: string;
  techItems: TechItem[];
  whyCardLabel: string;
  whyTitlePre: string;
  whyTitleHighlight: string;
  whyTitlePost: string;
  whyBody: string;
  aiWorkflows: AiWorkflow[];
  pipelineLabel: string;
  pipelineSteps: string[];
  valuesEyebrow: string;
  valuesTitlePre: string;
  valuesTitleHighlight: string;
  values: ValueItem[];
  govEyebrow: string;
  govTitlePre: string;
  govTitleHighlight: string;
  govTitlePost: string;
  govIntro: string;
  govItems: GovBlock[];
  ctaTitlePre: string;
  ctaTitleHighlight: string;
  ctaBody: string;
  ctaButton: string;
}

export const companyCopy: Record<"en" | "es" | "zh", CompanyCopy> = {
  en: {
    heroEyebrow: "About Heath",
    aiNativeMga: "AI-Native MGA",
    banner: [
      ["AI-Native MGA", "Fully digital underwriting operations"],
      ["AI Workflows", "Automated intake to decision pipeline"],
      ["Real-Time Intelligence", "Live portfolio analytics"],
      ["Zero Paper", "100% structured digital submissions"],
    ],
    purposeEyebrow: "Purpose",
    mission: {
      eyebrow: "Mission",
      title: "Expanding access to institutional reinsurance capacity",
      body: "We exist to bridge the gap between complex specialty risks and global reinsurance markets — operating as an AI-native MGA that delivers disciplined, intelligent underwriting creating long-term value for cedants, brokers, and capacity partners.",
    },
    vision: {
      eyebrow: "Vision",
      title: "The leading AI-native MGA for complex specialty risk",
      body: "To become the reference AI-native Managing General Agent for specialty reinsurance — where AI workflows, data-driven risk selection, and transparent governance define the new standard for institutional underwriting globally.",
    },
    whoEyebrow: "Who We Are",
    whoTitlePre: "Independent. Technical. ",
    whoTitleHighlight: "Aligned.",
    whoParagraphs: [
      "Heath was founded on a straightforward belief: that specialty reinsurance deserves the same rigor, transparency, and technological sophistication that institutional investors apply to other asset classes.",
      "We underwrite across five specialty lines — Sabotage & Terrorism, Property, Financial Lines, Marine, and Aviation — applying a consistent framework of technical analysis, data discipline, and portfolio management to each segment.",
      "Our AI-native MGA model is built around long-term capacity partnerships. We do not chase premium volume. We build portfolios that perform across market cycles, supported by AI workflows and governance structures that make our underwriting process auditable, scalable, and repeatable.",
    ],
    whoStats: [
      ["5", "Specialty lines across property, liability, marine, aviation & political risk"],
      ["3", "Languages of operation: English, Spanish, Chinese"],
      ["100%", "AI-powered digital workflow — from intake to decision"],
    ],
    techEyebrow: "Technology",
    techTitlePre: "AI-Native ",
    techTitleHighlight: "infrastructure",
    techTitlePost: "for underwriting at scale",
    techPillLabel: "AI Workflows",
    techIntro: "Heath is built as an AI-native MGA — every step from submission intake to final decision is powered by intelligent AI workflows, structured data, and real-time analytics. No manual bottlenecks. No paper trails. Pure underwriting signal.",
    techItems: [
      { icon: "⚡", title: "Automated Submission Engine", desc: "Incoming submissions are automatically ingested, classified, and routed through a structured AI workflow — reducing processing time and ensuring every risk receives a structured review.", tag: "AI Workflow" },
      { icon: "🗄️", title: "Structured Risk Database", desc: "Every submission, decision, and commitment is stored in a relational database with full audit trail — enabling historical analysis, pattern recognition, and portfolio reporting.", tag: "Supabase / PostgreSQL" },
      { icon: "📊", title: "Real-Time Portfolio Dashboard", desc: "Capacity partners and senior underwriters access a live dashboard showing commitment pipeline, geographic exposure, line-of-business mix, and decision velocity.", tag: "Live Analytics" },
      { icon: "🔐", title: "Secure Cedant Portal", desc: "Cedants and brokers submit risks, track status, and receive structured feedback through an authenticated digital portal — eliminating email-based back-and-forth.", tag: "Authenticated Access" },
      { icon: "🤖", title: "AI-Native Risk Screening", desc: "The core of Heath's AI-native MGA model — AI workflows pre-screen every submission, score risk profile alignment, flag accumulation concerns, and generate structured underwriter briefs automatically.", tag: "AI-Native MGA Core", highlight: true },
      { icon: "🌐", title: "Global Deployment Architecture", desc: "The platform is deployed on edge infrastructure with redundancy across regions — ensuring consistent performance for cedants and partners across time zones and geographies.", tag: "Edge / Vercel" },
    ],
    whyCardLabel: "AI-NATIVE MGA",
    whyTitlePre: "Why ",
    whyTitleHighlight: "AI-Native MGA",
    whyTitlePost: " changes everything",
    whyBody: "Traditional MGAs rely on manual processes, email-based workflows, and spreadsheet-driven decisions. Heath is different — every underwriting function is orchestrated through AI workflows, from first submission touch to final capacity placement.",
    aiWorkflows: [
      { title: "AI Intake Workflow", desc: "Submissions parsed, classified, and routed in seconds — no manual triage required." },
      { title: "AI Underwriting Brief", desc: "Structured risk summaries generated automatically for every inbound risk." },
      { title: "AI Portfolio Monitor", desc: "Continuous accumulation tracking and appetite alignment across all open commitments." },
      { title: "AI Pricing Signals", desc: "Market benchmarking and rate adequacy indicators integrated into the decision flow." },
      { title: "AI Communication Layer", desc: "Automated cedant updates, declination notices, and status notifications." },
      { title: "AI Reporting Engine", desc: "Partner bordereaux and management reports generated on demand, not at month-end." },
    ],
    pipelineLabel: "AI Workflow Pipeline — How a risk moves through Heath's AI-Native MGA",
    pipelineSteps: ["Submission\nReceived", "Automated\nIntake", "AI\nScreening", "Underwriter\nReview", "Capacity\nAlignment", "Decision &\nCommitment", "Portfolio\nReporting"],
    valuesEyebrow: "Operating Principles",
    valuesTitlePre: "How we ",
    valuesTitleHighlight: "work",
    values: [
      { num: "01", title: "Technical Discipline", desc: "Every risk is evaluated on fundamentals — exposure, accumulation, pricing adequacy, and correlation — not market momentum or volume targets." },
      { num: "02", title: "Transparent Governance", desc: "Our underwriting process is fully documented and auditable. Capacity partners see exactly how risks are selected, priced, and managed in portfolio." },
      { num: "03", title: "Long-Term Alignment", desc: "We structure relationships — with cedants, brokers, and capacity providers — around multi-year performance, not transactional premium exchange." },
      { num: "04", title: "AI-Native by Design", desc: "We are not adding AI to a legacy process — we are an AI-native MGA. Our AI workflows are the operating system: every submission, decision, and report flows through intelligent automation.", highlight: true },
    ],
    govEyebrow: "Governance & Partnerships",
    govTitlePre: "Institutional ",
    govTitleHighlight: "standards",
    govTitlePost: ", built in from day one",
    govIntro: "Heath operates with the governance structures and reporting frameworks expected by institutional capacity partners — ensuring alignment at every level of the value chain.",
    govItems: [
      { title: "Underwriting Governance", items: ["Defined authority matrix by line of business and limit size", "Mandatory peer review for risks above defined thresholds", "Quarterly portfolio review with capacity partners", "Full audit trail on every submission and decision", "Appetite statements reviewed and updated annually"] },
      { title: "Capacity Partner Framework", items: ["Real-time dashboard access for authorized partners", "Monthly bordereau and exposure reports", "Defined premium flow and settlement protocols", "Joint portfolio committees for strategic alignment", "Transparent pricing rationale on all bound risks"] },
    ],
    ctaTitlePre: "Ready to explore ",
    ctaTitleHighlight: "partnership opportunities?",
    ctaBody: "Whether you are a cedant seeking reinsurance capacity, a broker looking for a reliable technical underwriter, or an institutional investor exploring AI-native MGA partnerships — we would like to hear from you.",
    ctaButton: "Contact Us",
  },

  es: {
    heroEyebrow: "Acerca de Heath",
    aiNativeMga: "AI-Native MGA",
    banner: [
      ["AI-Native MGA", "Operaciones de suscripción 100% digitales"],
      ["AI Workflows", "Flujo automatizado de la recepción a la decisión"],
      ["Inteligencia en Tiempo Real", "Analítica de cartera en vivo"],
      ["Cero Papel", "Submissions 100% digitales y estructuradas"],
    ],
    purposeEyebrow: "Propósito",
    mission: {
      eyebrow: "Misión",
      title: "Ampliar el acceso a capacidad institucional de reaseguro",
      body: "Existimos para cerrar la brecha entre los riesgos especializados complejos y los mercados globales de reaseguro — operando como una MGA AI-native que entrega una suscripción disciplinada e inteligente, creando valor a largo plazo para cedentes, corredores y socios de capacidad.",
    },
    vision: {
      eyebrow: "Visión",
      title: "La MGA AI-native líder para riesgo especializado complejo",
      body: "Convertirnos en la Agencia General de Suscripción (MGA) AI-native de referencia para el reaseguro especializado — donde los AI workflows, la selección de riesgos basada en datos y la gobernanza transparente definan el nuevo estándar de la suscripción institucional a nivel global.",
    },
    whoEyebrow: "Quiénes Somos",
    whoTitlePre: "Independientes. Técnicos. ",
    whoTitleHighlight: "Alineados.",
    whoParagraphs: [
      "Heath se fundó sobre una creencia clara: que el reaseguro especializado merece el mismo rigor, transparencia y sofisticación tecnológica que los inversionistas institucionales aplican a otras clases de activos.",
      "Suscribimos en cinco líneas especializadas — Sabotaje y Terrorismo, Propiedad, Líneas Financieras, Marítimo y Aviación — aplicando un marco consistente de análisis técnico, disciplina de datos y gestión de cartera a cada segmento.",
      "Nuestro modelo de MGA AI-native se construye en torno a alianzas de capacidad de largo plazo. No perseguimos volumen de prima. Construimos carteras que rinden a lo largo de los ciclos de mercado, apoyadas por AI workflows y estructuras de gobernanza que hacen nuestro proceso de suscripción auditable, escalable y repetible.",
    ],
    whoStats: [
      ["5", "Líneas especializadas en propiedad, responsabilidad, marítimo, aviación y riesgo político"],
      ["3", "Idiomas de operación: inglés, español y chino"],
      ["100%", "Flujo digital impulsado por IA — de la recepción a la decisión"],
    ],
    techEyebrow: "Tecnología",
    techTitlePre: "Infraestructura ",
    techTitleHighlight: "AI-Native",
    techTitlePost: "para suscripción a escala",
    techPillLabel: "AI Workflows",
    techIntro: "Heath está construida como una MGA AI-native — cada paso, desde la recepción de la submission hasta la decisión final, está impulsado por AI workflows inteligentes, datos estructurados y analítica en tiempo real. Sin cuellos de botella manuales. Sin papeleo. Pura señal de suscripción.",
    techItems: [
      { icon: "⚡", title: "Motor Automatizado de Submissions", desc: "Las submissions entrantes se ingieren, clasifican y enrutan automáticamente a través de un AI workflow estructurado — reduciendo el tiempo de procesamiento y asegurando que cada riesgo reciba una revisión estructurada.", tag: "AI Workflow" },
      { icon: "🗄️", title: "Base de Datos de Riesgos Estructurada", desc: "Cada submission, decisión y compromiso se almacena en una base de datos relacional con trazabilidad completa — habilitando análisis histórico, reconocimiento de patrones y reportes de cartera.", tag: "Supabase / PostgreSQL" },
      { icon: "📊", title: "Dashboard de Cartera en Tiempo Real", desc: "Los socios de capacidad y los suscriptores senior acceden a un dashboard en vivo que muestra el pipeline de compromisos, la exposición geográfica, el mix por línea de negocio y la velocidad de decisión.", tag: "Analítica en Vivo" },
      { icon: "🔐", title: "Portal Seguro para Cedentes", desc: "Cedentes y corredores presentan riesgos, dan seguimiento al estado y reciben retroalimentación estructurada a través de un portal digital autenticado — eliminando el ida y vuelta por correo.", tag: "Acceso Autenticado" },
      { icon: "🤖", title: "Screening de Riesgos AI-Native", desc: "El núcleo del modelo de MGA AI-native de Heath — los AI workflows pre-evalúan cada submission, puntúan la alineación del perfil de riesgo, señalan preocupaciones de acumulación y generan briefs estructurados para el suscriptor de forma automática.", tag: "Núcleo MGA AI-Native", highlight: true },
      { icon: "🌐", title: "Arquitectura de Despliegue Global", desc: "La plataforma está desplegada en infraestructura edge con redundancia entre regiones — asegurando un rendimiento consistente para cedentes y socios a través de husos horarios y geografías.", tag: "Edge / Vercel" },
    ],
    whyCardLabel: "AI-NATIVE MGA",
    whyTitlePre: "Por qué la ",
    whyTitleHighlight: "MGA AI-Native",
    whyTitlePost: " lo cambia todo",
    whyBody: "Las MGAs tradicionales dependen de procesos manuales, flujos basados en correo y decisiones impulsadas por hojas de cálculo. Heath es diferente — cada función de suscripción se orquesta a través de AI workflows, desde el primer contacto con la submission hasta la colocación final de capacidad.",
    aiWorkflows: [
      { title: "Flujo de Recepción con IA", desc: "Submissions analizadas, clasificadas y enrutadas en segundos — sin necesidad de triage manual." },
      { title: "Brief de Suscripción con IA", desc: "Resúmenes de riesgo estructurados generados automáticamente para cada riesgo entrante." },
      { title: "Monitor de Cartera con IA", desc: "Seguimiento continuo de acumulación y alineación de apetito en todos los compromisos abiertos." },
      { title: "Señales de Precio con IA", desc: "Benchmarking de mercado e indicadores de adecuación tarifaria integrados en el flujo de decisión." },
      { title: "Capa de Comunicación con IA", desc: "Actualizaciones a cedentes, avisos de declinación y notificaciones de estado automatizados." },
      { title: "Motor de Reportes con IA", desc: "Bordereaux para socios y reportes de gestión generados bajo demanda, no a fin de mes." },
    ],
    pipelineLabel: "Pipeline de AI Workflow — Cómo se mueve un riesgo a través de la MGA AI-Native de Heath",
    pipelineSteps: ["Submission\nRecibida", "Recepción\nAutomatizada", "Screening\ncon IA", "Revisión del\nSuscriptor", "Alineación de\nCapacidad", "Decisión y\nCompromiso", "Reportes de\nCartera"],
    valuesEyebrow: "Principios Operativos",
    valuesTitlePre: "Cómo ",
    valuesTitleHighlight: "trabajamos",
    values: [
      { num: "01", title: "Disciplina Técnica", desc: "Cada riesgo se evalúa por fundamentos — exposición, acumulación, suficiencia de precio y correlación — no por la inercia del mercado ni por objetivos de volumen." },
      { num: "02", title: "Gobernanza Transparente", desc: "Nuestro proceso de suscripción está completamente documentado y es auditable. Los socios de capacidad ven exactamente cómo se seleccionan, tarifican y gestionan los riesgos en cartera." },
      { num: "03", title: "Alineación de Largo Plazo", desc: "Estructuramos las relaciones — con cedentes, corredores y proveedores de capacidad — en torno al desempeño plurianual, no al intercambio transaccional de prima." },
      { num: "04", title: "AI-Native por Diseño", desc: "No estamos añadiendo IA a un proceso heredado — somos una MGA AI-native. Nuestros AI workflows son el sistema operativo: cada submission, decisión y reporte fluye a través de automatización inteligente.", highlight: true },
    ],
    govEyebrow: "Gobernanza y Alianzas",
    govTitlePre: "Estándares ",
    govTitleHighlight: "institucionales",
    govTitlePost: ", incorporados desde el primer día",
    govIntro: "Heath opera con las estructuras de gobernanza y los marcos de reporte que esperan los socios de capacidad institucionales — asegurando alineación en cada nivel de la cadena de valor.",
    govItems: [
      { title: "Gobernanza de Suscripción", items: ["Matriz de autoridad definida por línea de negocio y tamaño de límite", "Revisión por pares obligatoria para riesgos por encima de umbrales definidos", "Revisión trimestral de cartera con socios de capacidad", "Trazabilidad completa en cada submission y decisión", "Declaraciones de apetito revisadas y actualizadas anualmente"] },
      { title: "Marco de Socios de Capacidad", items: ["Acceso a dashboard en tiempo real para socios autorizados", "Reportes mensuales de bordereau y exposición", "Protocolos definidos de flujo de prima y liquidación", "Comités conjuntos de cartera para alineación estratégica", "Racional de precio transparente en todos los riesgos colocados"] },
    ],
    ctaTitlePre: "¿Listo para explorar ",
    ctaTitleHighlight: "oportunidades de alianza?",
    ctaBody: "Ya seas un cedente que busca capacidad de reaseguro, un corredor que busca un suscriptor técnico confiable, o un inversionista institucional explorando alianzas de MGA AI-native — queremos saber de ti.",
    ctaButton: "Contáctanos",
  },

  zh: {
    heroEyebrow: "关于 Heath",
    aiNativeMga: "AI-Native MGA",
    banner: [
      ["AI-Native MGA", "完全数字化的核保运营"],
      ["AI Workflows", "从接收到决策的自动化流程"],
      ["实时智能", "实时组合分析"],
      ["零纸张", "100% 结构化数字提交"],
    ],
    purposeEyebrow: "宗旨",
    mission: {
      eyebrow: "使命",
      title: "扩大对机构级再保险承保能力的获取",
      body: "我们致力于弥合复杂专业风险与全球再保险市场之间的鸿沟——作为一家 AI-native MGA，提供严谨而智能的核保，为分出公司、经纪人与承保能力伙伴创造长期价值。",
    },
    vision: {
      eyebrow: "愿景",
      title: "面向复杂专业风险的领先 AI-native MGA",
      body: "成为专业再保险领域具有标杆意义的 AI-native 总代理（MGA）——让 AI workflows、数据驱动的风险选择与透明治理定义全球机构核保的新标准。",
    },
    whoEyebrow: "关于我们",
    whoTitlePre: "独立。专业。",
    whoTitleHighlight: "一致。",
    whoParagraphs: [
      "Heath 创立于一个朴素的信念：专业再保险理应获得机构投资者对待其他资产类别同样的严谨、透明与技术先进性。",
      "我们在五条专业险种线上承保——破坏与恐怖主义、财产、金融险种、水险与航空——以一致的技术分析、数据纪律与组合管理框架对待每个细分领域。",
      "我们的 AI-native MGA 模式围绕长期承保能力合作构建。我们不追逐保费规模。我们构建能够穿越市场周期的组合，并以 AI workflows 与治理结构支撑，使核保流程可审计、可扩展、可复制。",
    ],
    whoStats: [
      ["5", "覆盖财产、责任、水险、航空与政治风险的专业险种"],
      ["3", "运营语言：英语、西班牙语、中文"],
      ["100%", "由 AI 驱动的数字化流程——从接收到决策"],
    ],
    techEyebrow: "技术",
    techTitlePre: "面向规模化核保的 ",
    techTitleHighlight: "AI-Native",
    techTitlePost: "基础设施",
    techPillLabel: "AI Workflows",
    techIntro: "Heath 作为一家 AI-native MGA 构建——从提交接收到最终决策的每一步，都由智能 AI workflows、结构化数据与实时分析驱动。没有人工瓶颈，没有纸质流程，只有纯粹的核保信号。",
    techItems: [
      { icon: "⚡", title: "自动化提交引擎", desc: "进入的提交被自动接收、分类，并通过结构化 AI workflow 进行路由——缩短处理时间，确保每一项风险都获得结构化审阅。", tag: "AI Workflow" },
      { icon: "🗄️", title: "结构化风险数据库", desc: "每一项提交、决策与承诺都存储在具有完整审计轨迹的关系型数据库中——支持历史分析、模式识别与组合报告。", tag: "Supabase / PostgreSQL" },
      { icon: "📊", title: "实时组合仪表盘", desc: "承保能力伙伴与资深核保人可访问实时仪表盘，查看承诺管道、地域暴露、业务线结构与决策速度。", tag: "实时分析" },
      { icon: "🔐", title: "安全的分出公司门户", desc: "分出公司与经纪人通过经过身份验证的数字门户提交风险、跟踪状态并接收结构化反馈——免除基于邮件的往返沟通。", tag: "身份验证访问" },
      { icon: "🤖", title: "AI-Native 风险初筛", desc: "Heath AI-native MGA 模式的核心——AI workflows 对每一项提交进行预筛，评估风险画像匹配度，标记累积关注点，并自动生成结构化的核保简报。", tag: "AI-Native MGA 核心", highlight: true },
      { icon: "🌐", title: "全球部署架构", desc: "平台部署于具有跨区域冗余的边缘基础设施之上——确保跨时区与地域为分出公司与伙伴提供一致的性能。", tag: "Edge / Vercel" },
    ],
    whyCardLabel: "AI-NATIVE MGA",
    whyTitlePre: "为何 ",
    whyTitleHighlight: "AI-Native MGA",
    whyTitlePost: " 改变一切",
    whyBody: "传统 MGA 依赖人工流程、基于邮件的工作流与电子表格驱动的决策。Heath 与众不同——每一项核保职能都通过 AI workflows 编排，从首次接触提交到最终承保能力配置。",
    aiWorkflows: [
      { title: "AI 接收流程", desc: "提交在数秒内被解析、分类与路由——无需人工分流。" },
      { title: "AI 核保简报", desc: "为每一项进入的风险自动生成结构化风险摘要。" },
      { title: "AI 组合监控", desc: "对所有未结承诺持续跟踪累积并对齐承保偏好。" },
      { title: "AI 定价信号", desc: "将市场基准与费率充足性指标整合进决策流程。" },
      { title: "AI 沟通层", desc: "自动化的分出公司更新、拒保通知与状态提醒。" },
      { title: "AI 报告引擎", desc: "按需生成合作方分保清单与管理报告，而非月末才出。" },
    ],
    pipelineLabel: "AI Workflow 管道——风险如何在 Heath 的 AI-Native MGA 中流转",
    pipelineSteps: ["接收\n提交", "自动\n接收", "AI\n初筛", "核保人\n审阅", "承保能力\n对齐", "决策与\n承诺", "组合\n报告"],
    valuesEyebrow: "运营原则",
    valuesTitlePre: "我们如何",
    valuesTitleHighlight: "工作",
    values: [
      { num: "01", title: "技术纪律", desc: "每一项风险都基于基本面评估——暴露、累积、定价充足性与相关性——而非市场势头或规模目标。" },
      { num: "02", title: "透明治理", desc: "我们的核保流程完整记录且可审计。承保能力伙伴能清楚看到风险如何被选择、定价并在组合中管理。" },
      { num: "03", title: "长期一致", desc: "我们围绕多年期表现来构建与分出公司、经纪人与承保能力提供方的关系，而非交易性的保费交换。" },
      { num: "04", title: "AI-Native 原生设计", desc: "我们不是在为旧有流程叠加 AI——我们本身就是 AI-native MGA。AI workflows 即操作系统：每一项提交、决策与报告都流经智能自动化。", highlight: true },
    ],
    govEyebrow: "治理与合作",
    govTitlePre: "自第一天起即内建的",
    govTitleHighlight: "机构级标准",
    govTitlePost: "",
    govIntro: "Heath 以机构级承保能力伙伴所期望的治理结构与报告框架运营——确保价值链每一层级的一致性。",
    govItems: [
      { title: "核保治理", items: ["按业务线与限额规模界定的授权矩阵", "对超过既定阈值的风险强制同行评审", "与承保能力伙伴进行季度组合审阅", "对每一项提交与决策保留完整审计轨迹", "每年审阅并更新承保偏好声明"] },
      { title: "承保能力伙伴框架", items: ["为授权伙伴提供实时仪表盘访问", "每月分保清单与暴露报告", "界定的保费流转与结算协议", "用于战略一致的联合组合委员会", "对所有已承保风险提供透明的定价依据"] },
    ],
    ctaTitlePre: "准备好探索",
    ctaTitleHighlight: "合作机会了吗？",
    ctaBody: "无论您是寻求再保险承保能力的分出公司、寻找可靠技术核保人的经纪人，还是探索 AI-native MGA 合作的机构投资者——我们都期待与您联系。",
    ctaButton: "联系我们",
  },
};
