import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

// 技術深度 → 冷暖光譜
const TAG_TINT = {
  engineering:   "#22d3ee",
  security:      "#2dd4bf",
  architecture:  "#60a5fa",
  infrastructure:"#818cf8",
  data:          "#a78bfa",
  management:    "#fb923c",
  governance:    "#fbbf24",
};

function LvBar({ lv, tint }) {
  const pct = [0, 33, 66, 100][lv];
  return (
    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tint || "var(--accent)" }} />
    </div>
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
      {/* Header */}
      <header className="px-4 md:px-8 lg:px-16 pt-8 md:pt-12 pb-6" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="font-mono text-[10px] md:text-xs tracking-wide" style={{ color: "var(--dim)" }}>OpenSSF / Cybersecurity Skills Framework</p>
        <h1 className="text-2xl md:text-3xl font-bold mt-2 tracking-tight" style={{ color: "var(--text)" }}>資安能力地圖</h1>
        <p className="mt-1 text-xs md:text-sm max-w-md leading-relaxed" style={{ color: "var(--sub)" }}>
          選擇職務查看資安能力覆蓋。點擊領域展開技能。
        </p>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar — 手機：水平捲動；桌面：左側欄 */}
        <aside className="lg:w-56 shrink-0 py-4 lg:py-6 lg:pl-16" style={{ borderBottom: "1px solid var(--border)", borderRight: "none" }}>
          {/* Category filter */}
          <div className="flex gap-1 px-4 lg:px-0 mb-3 overflow-x-auto">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className="text-xs px-2 py-0.5 rounded font-mono transition-colors whitespace-nowrap shrink-0"
                style={{ background: catF === c ? "var(--card-hover)" : "transparent", color: catF === c ? "var(--text)" : "var(--dim)" }}>
                {c === "all" ? "ALL" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          {/* Role list — 手機水平捲動、桌面垂直 */}
          <div className="flex lg:flex-col gap-1 px-4 lg:px-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            {filtered.map(r => (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className="text-left px-3 py-2 rounded transition-colors flex items-center gap-2 shrink-0 lg:w-full"
                style={{ background: selId === r.id ? "var(--card)" : "transparent", minWidth: selId === r.id ? undefined : "auto" }}>
                <span className="w-0.5 h-4 rounded-full shrink-0" style={{ background: TAG_TINT[r.tag] }} />
                <div className="min-w-0">
                  <div className="text-sm font-medium whitespace-nowrap lg:whitespace-normal" style={{ color: selId === r.id ? "var(--text)" : "var(--sub)" }}>{r.zh}</div>
                  <div className="text-xs font-mono whitespace-nowrap lg:whitespace-normal" style={{ color: "var(--dim)" }}>{r.title}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-4 md:px-8 lg:px-12 py-6 lg:py-8 lg:border-l" style={{ borderColor: "var(--border)" }}>
          {!role ? (
            <p className="text-sm py-12 lg:pt-20" style={{ color: "var(--dim)" }}>↑ 選擇職務以檢視能力分佈</p>
          ) : (
            <>
              {/* Role title */}
              <div className="mb-5 pl-3" style={{ borderLeft: `3px solid ${TAG_TINT[role.tag]}` }}>
                <h2 className="text-lg md:text-xl font-bold">{role.zh}</h2>
                <p className="text-xs md:text-sm font-mono mt-0.5" style={{ color: "var(--dim)" }}>{role.title} · {TAG_LABELS[role.tag]}</p>
              </div>

              {/* Capability grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-5">
                {DOMAINS.filter(d => role.caps[d.id]).map(d => {
                  const cap = role.caps[d.id];
                  const active = selDom === d.id;
                  const tint = TAG_TINT[role.tag];
                  return (
                    <button key={d.id} onClick={() => setSelDom(active ? null : d.id)}
                      className="text-left rounded-lg px-3 py-2.5 transition-colors"
                      style={{ background: active ? "var(--card-hover)" : "var(--card)", border: active ? `1px solid ${tint}` : "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-1 rounded" style={{ background: "var(--border)", color: active ? tint : "var(--dim)" }}>{d.tag}</span>
                        <span className="text-xs font-medium" style={{ color: active ? "var(--text)" : "var(--sub)" }}>{d.label}</span>
                      </div>
                      <LvBar lv={cap.lv} tint={tint} />
                      <div className="text-xs font-mono mt-1" style={{ color: "var(--dim)" }}>{cap.skills.length} 項</div>
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              {selDom && role.caps[selDom] && (() => {
                const d = DOMAINS.find(x => x.id === selDom);
                const cap = role.caps[selDom];
                return (
                  <div className="rounded-lg p-4 md:p-5 mb-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--border)", color: TAG_TINT[role.tag] }}>{d.tag}</span>
                      <div>
                        <h3 className="text-sm font-bold">{d.label} <span className="font-normal" style={{ color: "var(--dim)" }}>/ {d.en}</span></h3>
                        <p className="text-xs" style={{ color: "var(--dim)" }}>覆蓋：{LV_LABELS[cap.lv]}</p>
                      </div>
                    </div>
                    {cap.skills.map((s, i) => (
                      <p key={i} className="text-sm leading-relaxed py-1.5" style={{ color: "var(--sub)", borderBottom: i < cap.skills.length - 1 ? "1px solid var(--border)" : "none" }}>{s}</p>
                    ))}
                  </div>
                );
              })()}

              {/* Uncovered */}
              {DOMAINS.filter(d => !role.caps[d.id]).length > 0 && (
                <p className="text-xs" style={{ color: "var(--dim)" }}>
                  未涵蓋：{DOMAINS.filter(d => !role.caps[d.id]).map(d => d.label).join("、")}
                </p>
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="px-4 md:px-8 lg:px-16 py-6 text-xs" style={{ color: "var(--dim)", borderTop: "1px solid var(--border)" }}>
        <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>Global Cybersecurity Skills Framework</a>》2025-05-14</p>
        <p className="mt-1">原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>ossf/global-cybersecurity-skills-framework</a>　著作權歸 OpenSSF / Linux Foundation 所有</p>
      </footer>
    </div>
  );
}
