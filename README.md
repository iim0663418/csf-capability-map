# CSF Capability Map — 資安能力地圖

互動式視覺化工具，呈現 [OpenSSF Global Cybersecurity Skills Framework](https://github.com/ossf/global-cybersecurity-skills-framework) 的 14 個職務族群 × 15 個資安能力領域對應關係。

## 功能

- 依職務類別篩選（工程開發/架構設計/基礎設施/資料管理/服務管理/治理合規/資安專業）
- 點選職務查看能力覆蓋範圍
- 點選能力領域展開技能細節
- 三層次能力等級指示器（基礎/中階/進階）

## 技術

- React 19 + Vite 8
- Tailwind CSS 4
- GitHub Pages (GitHub Actions 自動部署)

## 開發

```bash
npm install
npm run dev
```

## 部署

Push to `main` 即自動部署至 GitHub Pages。
