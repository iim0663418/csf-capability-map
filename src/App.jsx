import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

// 60-30-10: surface(60%) / accent-ink(30%) / highlight(10%)
const TAG_ACCENTS = {
  engineering: "#065F46", architecture: "#4C1D95", infrastructure: "#0C4A6E",
  data: "#78350F", management: "#881337", governance: "#9A3412", security: "#7F1D1D",
};

function Bar({ lv }) {
  const w = [0, 33, 66, 100][lv];
  return (
    <div className="h-1 w-full bg-stone-200 rounded-full mt-2 overflow-hidden">
      <div className="h-full rounded-full transition-all duration-500 bg-[var(--color-accent)]" style={{ width: `${w}%` }} />
    </div>
  );
}

function SkillPanel({ domain, cap }) {
  return (
    <section className="mt-8 pl-1 border-l-2 border-stone-300">
      <div className="pl-5">
        <h3 className="text-sm font-bold text-stone-900">
          {domain.icon} {domain.label}
          <span className="font-normal text-stone-400 ml-2 text-xs">{domain.en}</span>
        </h3>
        <p className="text-xs text-stone-400 mt-0.5">覆蓋：{LV_LABELS[cap.lv]}</p>
        <ol className="mt-3 space-y-2">
          {cap.skills.map((s, i) => (
            <li key={i} className="text-sm text-stone-700 leading-relaxed pl-4 relative before:content-[attr(data-n)] before:absolute before:left-0 before:text-xs before:text-stone-300 before:font-mono before:top-0.5" data-n={`${i + 1}`}>
              {s}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function App() {
  const [selId, setSelId] = useState(null);
  const [selDom, setSelDom] = useState(null);
  const [catF, setCatF] = useState("all");

  const role = useMemo(() => ROLES.find(r => r.id === selId), [selId]);
  const filtered = useMemo(() => catF === "all" ? ROLES : ROLES.filter(r => r.tag === catF), [catF]);

  return (
    <div className="min-h-screen font-sans">
      {/* Header — 非對稱留白，標題靠左 */}
      <header className="pt-12 pb-8 px-8 md:px-16 max-w-6xl">
        <p className="text-[10px] font-mono text-stone-400 tracking-wider uppercase">
          OpenSSF · Global Cybersecurity Skills Framework
        </p>
        <h1 className="text-2xl font-bold text-stone-900 mt-2 tracking-tight">
          資安能力地圖
        </h1>
        <p className="text-sm text-stone-400 mt-1 max-w-md">
          14 個職務族群的資安能力覆蓋範圍。選擇職務，點擊領域查看技能。
        </p>
      </header>

      <main className="px-8 md:px-16 pb-16 max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Sidebar — 窄，有呼吸感 */}
        <aside className="md:w-48 flex-shrink-0">
          <div className="flex flex-wrap gap-1.5 mb-5">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className={`text-xs px-2 py-0.5 rounded transition-colors ${catF === c ? "bg-stone-900 text-white" : "text-stone-400 hover:text-stone-700"}`}>
                {c === "all" ? "全部" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          <nav className="space-y-0.5">
            {filtered.map(r => (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className={`w-full text-left px-2 py-1.5 rounded transition-colors ${selId === r.id ? "bg-stone-100" : "hover:bg-stone-50"}`}>
                <div className="text-xs font-semibold text-stone-800 leading-tight">{r.zh}</div>
                <div className="text-[10px] text-stone-400 font-mono">{r.title}</div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content — 單一焦點 */}
        {!role ? (
          <div className="flex-1 flex items-start pt-16 md:pl-8">
            <p className="text-sm text-stone-300">← 選擇職務</p>
          </div>
        ) : (
          <div className="flex-1 md:pl-8 md:border-l border-stone-200">
            {/* Role title */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-stone-900">{role.zh}</h2>
              <p className="text-xs font-mono text-stone-400 mt-0.5">{role.title}</p>
              <p className="text-xs mt-1" style={{ color: TAG_ACCENTS[role.tag] }}>
                {TAG_LABELS[role.tag]} · {Object.keys(role.caps).length} 個領域
              </p>
            </div>

            {/* Domain grid — 斑馬紋式列表 而非對稱卡片 */}
            <div className="space-y-px">
              {DOMAINS.map(d => {
                const cap = role.caps[d.id];
                if (!cap) return null;
                const active = selDom === d.id;
                return (
                  <button key={d.id} onClick={() => setSelDom(active ? null : d.id)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded transition-colors ${active ? "bg-stone-100" : "hover:bg-stone-50"}`}>
                    <span className="text-base w-6 text-center flex-shrink-0">{d.icon}</span>
                    <span className="text-sm text-stone-800 flex-1">{d.label}</span>
                    <span className="text-[10px] font-mono text-stone-300 flex-shrink-0">{cap.skills.length}</span>
                    <div className="w-16 flex-shrink-0"><Bar lv={cap.lv} /></div>
                  </button>
                );
              })}
            </div>

            {/* Skill detail */}
            {selDom && role.caps[selDom] && (
              <SkillPanel domain={DOMAINS.find(x => x.id === selDom)} cap={role.caps[selDom]} />
            )}

            {/* Uncovered — 低調 */}
            {DOMAINS.filter(d => !role.caps[d.id]).length > 0 && (
              <p className="mt-10 text-xs text-stone-300">
                未涵蓋：{DOMAINS.filter(d => !role.caps[d.id]).map(d => d.label).join("、")}
              </p>
            )}
          </div>
        )}
      </main>

      <footer className="px-8 md:px-16 pb-8 pt-12 border-t border-stone-200 mt-16 text-xs text-stone-400 space-y-1">
        <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" className="underline hover:text-stone-600">Global Cybersecurity Skills Framework</a>》（2025-05-14 發布）</p>
        <p>原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" className="underline hover:text-stone-600">github.com/ossf/global-cybersecurity-skills-framework</a></p>
        <p className="text-stone-300">本視覺化僅供參考，資料著作權歸 OpenSSF / Linux Foundation 所有。</p>
      </footer>
    </div>
  );
}
