export const ROLES2 = [
  {
    id:8, title:"DB Engineer", zh:"資料庫工程師", tag:"data",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新相依套件（B4）"]},
      crypto:{lv:2,skills:["理解對稱 vs 非對稱加密，資料傳輸/靜態加密（B6）","實施進階加密與遮罩技術，包含 VPC peering/PrivateLink 的安全連線（I24）"]},
      iam:{lv:1,skills:["了解認證授權機制與基本 RBAC（B8）"]},
      monitor:{lv:2,skills:["了解並實施監控與日誌記錄工具（B11）","開發腳本自動化資安任務，實施自動化監控告警（I21）"]},
      vulnmgmt:{lv:2,skills:["遵循安全資料庫配置最佳實務，應用 DbDat/CIS Benchmark 評估（B26）","識別並修復資料庫系統安全問題，確保安全連線（B27）","依職務執行資安稽核與評估（I10）"]},
      secdev:{lv:2,skills:["將資安最佳實務整合到資料庫設計與開發，確保架構安全（I25）"]},
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","了解組織政策及法規義務（I3）","制定符合法規義務的組織流程（A5）"]},
      ir:{lv:2,skills:["主導事件回應協調與規劃（A8）","進行根因分析，制定補救計畫（A9）"]},
      threat:{lv:3,skills:["主導威脅建模，應用進階技術（A2）"]},
      leadership:{lv:2,skills:["指導初階人員（I9）","擔任資深顧問（A4）","跨部門協作確保整體資安（A11）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:9, title:"IT Project Management", zh:"IT 專案管理", tag:"management",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      secdev:{lv:1,skills:["了解 OWASP Top 10 & CWE Top 25（B3，中階）"]},
      compliance:{lv:3,skills:["遵循組織資安指引（B7）","依職務執行資安稽核（I10）","制定符合法規義務的組織流程（A5）"]},
      cicd:{lv:2,skills:["在 DevOps 文化中嵌入資安實務，自動化整合到 CI/CD（I26）"]},
      ir:{lv:3,skills:["設計並實施針對特定資料庫系統的災難復原計畫（A15）","與外部組織（CERT/政府/供應商）執行協調揭露（A16）","管理 SSL 憑證更新及跨基礎設施（K8s/DB）的版本更新（A17）"]},
      leadership:{lv:3,skills:["培養向高層呈報的簡報能力，與資安專家協作整合最佳實務（B28）","參與聘用流程，確保開發者具備資安意識，持續培訓（B29）","確保專案成員持續接受資安培訓（I27）","擔任資深顧問（A4）"]},
    }
  },
  {
    id:10, title:"Solutions Architecture", zh:"解決方案架構師", tag:"architecture",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","了解資安法規（GDPR 等），進行基本合規檢查（B32）","了解組織政策及法規義務（I3）","制定符合法規義務的組織流程（A5）"]},
      network:{lv:2,skills:["配置防火牆與基本網路安全協定（WPA3、VLAN 隔離）（B30）","使用防毒軟體，配置基本防火牆規則（B31）","實施進階系統強化，包含 SIEM 部署與縱深防禦（I28）"]},
      cicd:{lv:1,skills:["在 DevOps 文化中嵌入資安實務，整合到 CI/CD（B33）"]},
      threat:{lv:2,skills:["使用進階威脅建模工具（STRIDE/Microsoft Threat Modeling Tool）（I29）"]},
      crypto:{lv:2,skills:["應用進階密碼學（AES 加密/RSA 數位簽章）與安全設計原則（I30）"]},
      arch:{lv:3,skills:["跨多作業系統協調安全實施，確保安全更新（I31）","將資料安全/SOC 運營/身分管理/自動回應整合為一致的安全架構（A18）"]},
      vulnmgmt:{lv:2,skills:["實施進階系統強化，SIEM 部署（I28）","依職務執行資安稽核（I10）"]},
      ir:{lv:1,skills:["進行根因分析，制定補救計畫（A9）"]},
      leadership:{lv:2,skills:["跨部門協作確保整體資安（A11）","向利害關係人與高層溝通資安風險（A12）"]},
    }
  },
  {
    id:11, title:"CyberSecurity Operations", zh:"資安維運", tag:"security",
    caps:{
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","制定符合法規義務的組織流程（A5）"]},
      monitor:{lv:3,skills:["了解並實施監控與日誌記錄（B11）","了解 SIEM/SOAR 系統，分析 log 與管理告警（B36）","開發腳本自動化資安任務，實施自動化監控告警（I21）","開發 SIEM 關聯規則/SOAR Playbook，追蹤 APT，向 CISO 提交報告（I33）"]},
      vulnmgmt:{lv:3,skills:["在監督下執行弱點評估與滲透測試（B34）","獨立執行複雜滲透測試，套用 NIST/ISO/OWASP 合規標準（I32）","深化特定資安領域（網路/應用程式/威脅情報）的專業知識（I35）"]},
      ir:{lv:3,skills:["協助資深分析師調查事件，分析威脅情報，使用即時監控工具（B35）","開發並實施主動式資安策略，包含威脅獵捕（Threat Hunting）（I34）","進行根因分析，制定補救計畫（A9）"]},
      threat:{lv:3,skills:["威脅建模（I32）","威脅獵捕，持續改善資安實務（I34）","持續深化知識（A1）"]},
      leadership:{lv:3,skills:["參與內部培訓提升資安最佳實務理解（B37）","文件撰寫、回報、跨部門協作的溝通能力（B38）","指導並帶領初階人員（I9）","擔任資深顧問（A4）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:12, title:"GRC Manager", zh:"GRC 管理者", tag:"governance",
    caps:{
      risk:{lv:3,skills:["理解資安需求與風險管理原則（B1）","系統性風險識別與緩解（B2）","獨立執行詳細風險評估（識別/評估/優先排序），制定緩解策略（I36）","整合 ISO 31000 等風險管理標準，追蹤新興威脅（I39）"]},
      compliance:{lv:3,skills:["遵循組織資安指引（B7）","積極協助合規稽核，依標準記錄流程（B39）","了解常見 IT 控制（存取控制/加密/備份）及合規角色（B40）","與系統管理者協作，記錄合規達成方式（B41）","使用 Excel/SQL 進行資料分析，支援稽核流程（B42）","了解組織政策及法規義務（I3）","確保合規活動與 IT 系統及業務功能整合（I37）","制定符合法規義務的組織流程（A5）"]},
      ir:{lv:1,skills:["進行根因分析，制定補救計畫（A9）"]},
      leadership:{lv:3,skills:["溝通能力：文件撰寫/向高層回報/跨部門協調（B38）","使用 Python/R 等進行進階資料分析，發現合規趨勢（I38）","依職務執行資安稽核（I10）","指導並帶領初階人員（I9）","擔任資深顧問（A4）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:13, title:"Security Administrator", zh:"資安管理員", tag:"security",
    caps:{
      risk:{lv:1,skills:["理解資安需求與風險管理原則（B1）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新套件（B4）"]},
      compliance:{lv:2,skills:["遵循組織資安指引（B7）","了解組織政策及法規義務（I3）","制定符合法規義務的組織流程（A5）"]},
      iam:{lv:2,skills:["了解認證授權機制與基本 RBAC（B8）"]},
      monitor:{lv:2,skills:["了解並實施監控與日誌記錄（B11）","開發腳本自動化資安任務，實施自動化監控告警（I21）"]},
      ir:{lv:3,skills:["參與事件回應初步活動，學習記錄事件（B43）","管理事件回應運作，必要時執行數位鑑識，細化 Playbook（I41）","進行根因分析，制定補救計畫（A9）"]},
      network:{lv:2,skills:["實施安全網路設計與配置，深化防火牆設定與進階網路分段（I40）"]},
      arch:{lv:2,skills:["協助建立並維護完整資安政策與程序（I42）","主導威脅建模（A2）"]},
      threat:{lv:2,skills:["主導威脅建模，應用進階技術（A2）"]},
      leadership:{lv:2,skills:["指導並帶領初階人員（I9，via I41 協作）","擔任資深顧問（A4）","向高層溝通資安風險（A12）"]},
    }
  },
  {
    id:14, title:"IT Services Manager", zh:"IT 服務管理者", tag:"management",
    caps:{
      risk:{lv:2,skills:["理解資安需求與風險管理原則（B1）","系統性風險識別與緩解（B2）","獨立執行詳細風險評估，制定緩解策略（I36）"]},
      supply:{lv:1,skills:["安全使用外部軟體，定期更新套件（B4）"]},
      compliance:{lv:3,skills:["遵循組織資安指引（B7）","記錄程序，確保服務運作符合資安政策（B45）","了解組織政策及法規義務（I3）","了解組織業務持續計畫（BCP）與災難復原（DR）流程（I5）","制定符合法規義務的組織流程（A5）"]},
      iam:{lv:1,skills:["了解並實施 MFA 技術（B10）"]},
      monitor:{lv:1,skills:["了解並實施監控與日誌記錄工具（B11）"]},
      ir:{lv:3,skills:["參與事件管理流程（B46）","回應服務相關資安事件，精確記錄並適當升報（B47）","主導事件回應協調與規劃（A8）","進行根因分析，制定補救計畫（A9）"]},
      cicd:{lv:2,skills:["將資安整合到服務生命週期管理（服務設計到持續改善）（I44）","分析並改善 IT 服務內的資安流程（如變更管理含資安影響評估）（I45）"]},
      arch:{lv:1,skills:["了解 ITIL 等 ITSM 框架（B44）"]},
      leadership:{lv:3,skills:["深化進階 ITSM 流程，聚焦資安（I43）","指導並帶領初階人員（A4）","向高層溝通資安風險（A12）","建立衡量 IT 服務內資安實務效能的指標（A19）"]},
    }
  },
];
