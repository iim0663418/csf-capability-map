export const ROLES = [
  {
    id:1, title:"Web Developers", zh:"Web 開發者", tag:"engineering",
    caps:{
      risk:{lv:2,skills:["理解資安需求與風險管理原則（B1）","系統性風險識別與緩解——安全軟體開發（B2）"]},
      secdev:{lv:3,skills:["了解 OWASP Top 10 & CWE Top 25（B3）","實作輸入驗證與注入防禦，防 XSS/SQL Injection（B5）","遵循組織資安指引，整合到開發流程（B7）"]},
      crypto:{lv:3,skills:["理解對稱 vs 非對稱加密，資料傳輸/靜態加密（B6）","深化密碼學：數位簽章、雜湊（I8）","進階密碼學 RSA/ECC，符合 ISO 27001/NIST（A6）"]},
      iam:{lv:1,skills:["了解 SSH/SSL/OpenID/OAuth/SSO 與基本 RBAC（B8）"]},
      threat:{lv:3,skills:["在開發生命週期應用威脅建模，監控新興威脅（I1）","主導威脅建模，應用進階技術預防新興威脅（A2）"]},
      vulnmgmt:{lv:3,skills:["了解 SAST/DAST 及 Web 應用程式掃描基本原理（B9）","在開發生命週期全程實施掃描與測試（I6）","強化開發基礎設施，定期弱點評估（I7）"]},
      cicd:{lv:2,skills:["實施 CI/CD 流程（I4）","自動化任務確保程式碼品質與威脅偵測（A3）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新第三方函式庫（B4）"]},
      compliance:{lv:2,skills:["了解組織政策及資安/隱私法規義務（I3）"]},
      leadership:{lv:2,skills:["指導並帶領初階人員（I9）","擔任資深顧問，跨專案資安決策（A4）"]},
    }
  },
  {
    id:2, title:"Software Developers", zh:"軟體開發者", tag:"engineering",
    caps:{
      risk:{lv:2,skills:["理解資安需求與風險管理原則（B1）","系統性風險識別與緩解（B2）"]},
      secdev:{lv:3,skills:["了解 OWASP Top 10 & CWE Top 25（B3）","實作輸入驗證與注入防禦（B5）","遵循組織資安指引（B7）"]},
      crypto:{lv:3,skills:["理解加密基礎（B6）","深化密碼學實務（I8）","進階密碼學/ISO 27001（A6）"]},
      iam:{lv:1,skills:["了解認證授權機制與基本 RBAC（B8）"]},
      threat:{lv:3,skills:["在開發生命週期應用威脅建模（I1）","主導威脅建模（A2）"]},
      vulnmgmt:{lv:3,skills:["了解 SAST/DAST 基本原理（B9）","全程掃描與測試（I6）","強化開發基礎設施（I7）"]},
      cicd:{lv:2,skills:["實施 CI/CD 流程（I4）","自動化確保程式碼品質（A3）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新套件（B4）"]},
      compliance:{lv:2,skills:["了解組織政策及法規義務（I3）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","擔任資深顧問（A4）"]},
    }
  },
  {
    id:3, title:"Platform Engineers", zh:"平台工程師", tag:"engineering",
    caps:{
      risk:{lv:2,skills:["理解資安需求與風險管理原則（B1）","系統性風險識別與緩解（B2）"]},
      iam:{lv:2,skills:["了解認證授權機制與基本 RBAC（B8）","實施 MFA 技術（B10）","定期審查強化系統配置，聚焦 RBAC 與網路強化（I13）"]},
      monitor:{lv:2,skills:["了解並實施監控與日誌記錄工具（B11）"]},
      vulnmgmt:{lv:2,skills:["協助修補管理、系統更新（B12）","依職務執行資安稽核與評估（I10）"]},
      cicd:{lv:3,skills:["建立 DevSecOps 基礎知識（B13）","將安全編碼、威脅建模嵌入 SDLC（I12）","定義並推動跨系統的安全架構設計（A7）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新套件（B4）"]},
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","了解組織政策及法規義務（I3）"]},
      ir:{lv:2,skills:["積極參與事件回應、根因分析（I11）","主導事件回應協調與規劃（A8）","制定補救計畫（A9）"]},
      arch:{lv:3,skills:["定義並推動跨系統的安全架構設計（A7）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","跨部門協作確保整體資安（A11）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:4, title:"Systems Architecture", zh:"系統架構師", tag:"architecture",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      iam:{lv:2,skills:["了解認證授權機制與基本 RBAC（B8）","實作存取控制政策與安全的認證授權機制（B15）"]},
      vulnmgmt:{lv:2,skills:["了解 SAST/DAST 基本原理（B9）","依職務執行資安稽核（I10）"]},
      arch:{lv:3,skills:["記錄系統架構並整合基本資安考量（B14）","協助將資安需求整合到系統設計（B16）","設計並落實安全系統架構、風險評估與威脅建模（I14）","定義並實施企業級安全架構與策略（A13）"]},
      threat:{lv:3,skills:["安全風險評估與威脅建模（I14）","主導威脅建模，預防新興威脅（A2）"]},
      compliance:{lv:3,skills:["了解組織政策及法規義務（I3）","協助制定資安政策、標準與規範（I15）","制定符合法規義務的組織流程（A5）"]},
      ir:{lv:2,skills:["積極參與事件回應（I11）","主導複雜事件回應與復原（A13）"]},
      leadership:{lv:3,skills:["指導初階人員（I9）","擔任資深顧問（A4）","向利害關係人與高層溝通資安風險（A12）"]},
    }
  },
  {
    id:5, title:"DevOps Engineer", zh:"DevOps 工程師", tag:"engineering",
    caps:{
      risk:{lv:2,skills:["理解資安需求與風險管理原則（B1）","了解 OWASP Top 10 & CWE Top 25（B3）"]},
      iam:{lv:2,skills:["實施 MFA 技術（B10）","實作存取控制政策與安全認證授權機制（B15）"]},
      monitor:{lv:2,skills:["實施監控與日誌記錄（B11）","監控系統資安事件，記錄並回報（B18）"]},
      vulnmgmt:{lv:3,skills:["了解 SAST/DAST 基本原理（B9）","在開發生命週期全程掃描與測試（I6）","依職務執行資安稽核（I10）"]},
      cicd:{lv:3,skills:["確保程式碼倉庫與建置環境安全（B17）","實施 CI/CD 流程（I4）","強化 IaC 範本安全（OpenTofu/Terraform/CloudFormation）（I17）","實施安全雲端基礎設施管理政策（I18）"]},
      supply:{lv:2,skills:["安全使用外部軟體，定期更新套件（B4）","確保程式碼倉庫安全（B17）"]},
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","了解組織政策及法規義務（I3）","制定符合法規義務的組織流程（A5）"]},
      ir:{lv:3,skills:["積極參與事件回應，根因分析（I11）","對資安事件進行根因分析並實施補救（I16）","主導事件回應協調與規劃（A8）","制定補救計畫（A9）"]},
      threat:{lv:3,skills:["主導威脅建模，預防新興威脅（A2）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","跨部門協作確保整體資安（A11）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:6, title:"Network Engineer", zh:"網路工程師", tag:"infrastructure",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      iam:{lv:2,skills:["使用安全令牌與 MFA 管理網路設備存取，維護 ACL（B20）"]},
      monitor:{lv:3,skills:["監控系統資安事件，記錄並回報（B18）","使用 Wireshark/Nagios/SolarWinds 監控流量（B22）","開發腳本自動化資安任務，實施自動化監控告警（I21）"]},
      vulnmgmt:{lv:2,skills:["安全使用外部軟體（B4）","依職務執行資安稽核（I10）"]},
      network:{lv:3,skills:["實作並管理防火牆規則、IPS 與 VPN（B19）","了解 TCP/IP、DNS、路由等協定，雲端網路任務（B21）","實施並管理進階防火牆、IDS/IPS 與 VPN（I19）","設計安全網路架構，將資安整合到網路規劃（I20）"]},
      arch:{lv:2,skills:["記錄系統架構並整合資安考量（B14）","設計安全網路架構（I20）"]},
      compliance:{lv:1,skills:["了解組織政策及法規義務（I3）"]},
      ir:{lv:2,skills:["積極參與事件回應，根因分析（I11）","制定補救計畫（A9）"]},
      threat:{lv:2,skills:["主導威脅建模（A2）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","擔任資深顧問（A4）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:7, title:"AI Engineer", zh:"AI 工程師", tag:"engineering",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新套件（B4）"]},
      monitor:{lv:1,skills:["監控系統資安事件，記錄並回報（B18）"]},
      ai:{lv:3,skills:["設計並實施安全資料管線（完整性/機密性/安全傳輸）（B23）","負責任地處理敏感資料：匿名化、加密、遵循法規（B24）","實施基本安全措施保護 AI/ML 模型，防篡改（B25）","對 AI/ML 工作流實施進階加密、遮罩與匿名化（I22）","保護模型免受對抗性攻擊與資料投毒，定期審查部署環境（I23）"]},
      cicd:{lv:2,skills:["實施 CI/CD 流程（I4）"]},
      ir:{lv:2,skills:["積極參與事件回應，根因分析（I11）"]},
      threat:{lv:3,skills:["主導威脅建模（A2）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","倡導前瞻性資安方案（A10）","向高層溝通 AI 資安風險（A12）"]},
    }
  },
];
