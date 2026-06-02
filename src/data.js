export const DOMAINS = [
  { id: "risk",       label: "風險管理",     en: "Risk Management",       tag: "RSK" },
  { id: "secdev",     label: "安全開發",     en: "Secure Development",    tag: "DEV" },
  { id: "crypto",     label: "密碼學",       en: "Cryptography",          tag: "CRY" },
  { id: "iam",        label: "身分存取",     en: "IAM & Access Control",  tag: "IAM" },
  { id: "threat",     label: "威脅建模",     en: "Threat Modeling",       tag: "THR" },
  { id: "vulnmgmt",   label: "弱點管理",     en: "Vulnerability Mgmt",    tag: "VUL" },
  { id: "cicd",       label: "CI/CD 安全",  en: "Pipeline / DevSecOps",  tag: "CI" },
  { id: "monitor",    label: "監控日誌",     en: "Monitoring & Logging",  tag: "MON" },
  { id: "ir",         label: "事件回應",     en: "Incident Response",     tag: "IR" },
  { id: "compliance", label: "法規合規",     en: "Compliance & Policy",   tag: "GRC" },
  { id: "network",    label: "網路安全",     en: "Network Security",      tag: "NET" },
  { id: "supply",     label: "供應鏈安全",   en: "Supply Chain",          tag: "SCM" },
  { id: "arch",       label: "安全架構",     en: "Security Architecture", tag: "ARC" },
  { id: "ai",         label: "AI 資安",      en: "AI/ML Security",        tag: "AI" },
  { id: "leadership", label: "溝通領導",     en: "Leadership & Comms",    tag: "LDR" },
];

export const TAG_LABELS = {
  engineering: "工程開發", architecture: "架構設計", infrastructure: "基礎設施",
  data: "資料管理", management: "服務管理", governance: "治理合規", security: "資安專業",
};

export const LV_LABELS = ["", "僅基礎", "基礎＋中階", "全三層次"];
