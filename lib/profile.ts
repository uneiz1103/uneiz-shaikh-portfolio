export const hero = {
  lede: "I build database-backed applications, automation workflows, and LLM-powered systems. Recent work includes a Neo4j movie application, a retrieval-augmented generation pipeline with LangChain, a small Model Context Protocol server, and Python automation used in day-to-day operations.",
  focus: ["Neo4j & graph data", "RAG & LLM applications", "Python automation", "Backend systems"],
};

export const now = {
  updatedAt: "2026-09-30",
  title: "IT Engineer at Sona Phosphates",
  summary:
    "Building Python automation, ETL workflows, SQL, and Power BI reporting for sales, finance, and operational data.",
  focus: [
    "Turning repetitive manual data work into automated workflows.",
    "Modelling connected data with Neo4j and Cypher.",
    "Building retrieval pipelines, LangGraph agents, and MCP tools.",
  ],
  outside:
    "Building a Neo4j movie application, retrieval pipelines with LangChain, and a small MCP server, and writing engineering notes on what I learn.",
};

export const approach = [
  {
    eyebrow: "Data + Automation",
    title: "Workflows that hold up",
    body: "I turn repetitive data work into Python and SQL workflows that run the same way every time. One of them cut a competitor-price run for about 1,000 ASINs from roughly 8 hours to about 2.",
  },
  {
    eyebrow: "Graph + Retrieval",
    title: "Systems shaped by the data",
    body: "I choose the representation that fits the question: a graph in Neo4j when relationships matter, and embeddings with vector search when meaning does.",
  },
];

export const tagline = "Building software and AI systems around data.";

export function getStats() {
  return [
    { value: formatExperience("short"), label: "Professional experience" },
    { value: "40%+", label: "Less manual processing through automation" },
    { value: "8h → 2h", label: "Competitor-price run for ~1,000 ASINs" },
  ];
}

export function getAboutSummary() {
  return `I'm an IT Engineer in Mumbai with ${formatExperience("long")} of professional experience. At work I build Python automation, ETL workflows, and SQL for business data. Outside it, I build software and AI systems: a Neo4j movie application, a RAG pipeline, and a small MCP server.`;
}

export function getAbout() {
  return [
    `I'm an IT Engineer in Mumbai with ${formatExperience("long")} of professional experience, working across Python automation, ETL workflows, SQL, and software systems.`,
    "Alongside my professional work, I build software and AI systems — including a graph-based movie application with PHP and Neo4j, a retrieval-augmented generation pipeline with LangChain and FAISS, and a Model Context Protocol server built with FastMCP.",
    "I'm building toward AI engineering through hands-on work with backend systems, databases, automation, vector search, retrieval, and LLM applications. I focus on understanding how these pieces work together to build practical, reliable software.",
  ];
}

export const journey = [
  "Software engineering",
  "Backend systems",
  "Databases & Neo4j",
  "Automation",
  "Vector search",
  "RAG",
  "LLM applications",
  "AI engineering",
];

export const experience = {
  role: "IT Engineer",
  company: "Sona Phosphates Ltd.",
  start: "Jan 2025",
  startDate: "2025-01-01",
  end: "Present",
  location: "Mumbai, India",
  paragraphs: [
    "Reduced manual processing by more than 40% by building Python automation and ETL workflows for sales, finance, and operational processes.",
    "Cut a competitor Buy Box price check for about 1,000 ASINs from about 8 hours to about 2 by automating it with Python, Selenium, and Pandas, with Excel input and output.",
    "Wrote SQL with CTEs, joins, and window functions for enterprise datasets, and Python checks that flag anomalies during internal data audits.",
    "Built Power BI dashboards and data models for sales, inventory, profitability, and operational KPIs.",
  ],
};

export const education = [
  {
    title: "Bachelor of Engineering, Information Technology",
    place: "Saraswati College of Engineering",
    detail: "2024",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    place: "Google",
    detail: "Certification",
  },
];

export const skillGroups = [
  {
    title: "Software engineering",
    note: "Application code, APIs, and the tools around them.",
    items: ["PHP", "Python", "REST APIs", "Git", "Docker", "Composer"],
  },
  {
    title: "Data systems",
    note: "Graph data, relational SQL, and vector stores.",
    items: ["Neo4j", "Cypher", "MySQL", "SQLite", "SQL", "FAISS", "Chroma"],
  },
  {
    title: "AI engineering",
    note: "Retrieval pipelines, agents, and LLM application code.",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Embeddings",
      "OpenAI API",
      "MCP (FastMCP)",
      "Streamlit",
      "scikit-learn",
    ],
  },
  {
    title: "Automation & reporting",
    note: "Scripts that collect, check, and reshape data.",
    items: ["Selenium", "Pandas", "NumPy", "SQLAlchemy", "ETL", "Excel", "Power BI"],
  },
];

const IST_OFFSET_MS = 330 * 60 * 1000;

/** Completed months since `experience.startDate`, counted in India Standard Time. */
export function experienceMonths(now: Date = new Date()) {
  const [startYear, startMonth] = experience.startDate.split("-").map(Number);
  const local = new Date(now.getTime() + IST_OFFSET_MS);
  const months =
    (local.getUTCFullYear() - startYear) * 12 + local.getUTCMonth() - (startMonth - 1);
  return Math.max(months, 0);
}

export function formatExperience(style: "short" | "long", now: Date = new Date()) {
  const total = experienceMonths(now);
  const years = Math.floor(total / 12);
  const months = total % 12;

  if (style === "short") {
    return [years ? `${years}y` : null, months || !years ? `${months}m` : null]
      .filter(Boolean)
      .join(" ");
  }

  const parts = [
    years ? `${years} ${years === 1 ? "year" : "years"}` : null,
    months || !years ? `${months} ${months === 1 ? "month" : "months"}` : null,
  ].filter(Boolean);
  return parts.join(" and ");
}
