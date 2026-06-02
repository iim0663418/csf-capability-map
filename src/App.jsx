import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

const TAG_TINT = {
  engineering:"#22d3ee", security:"#2dd4bf", architecture:"#60a5fa",
  infrastructure:"#818cf8", data:"#a78bfa", management:"#fb923c", governance:"#fbbf24",
};

function LvBar({ lv, tint }) {
  const pct = [0, 33, 66, 100][lv];
  return (
    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: tint }} />
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
    <div className="min-h-screen font-sans max-w-6xl mx-auto">
      {/* Header */}
      <header className="px-5 pt-8 pb-5" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="font-mono text-[10px] tracking-wide" style={{ color: "var(--dim)" }}>OpenSSF / Cybersecurity Skills Framework</p>
        <h1 className="text-2xl font-bold mt-2 tracking-tight" style={{ color: "var(--text)" }}>資安能力地圖</h1>
        <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--sub)" }}>
          選擇職務查看資安能力覆蓋。點擊領域展開技能。
        </p>
      </header>

      {/* Body */}
      <div className="flex flex-col md:flex-row px-5 py-5 gap-5">
        {/* Sidebar */}
        <aside className="md:w-52 shrink-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className="text-[11px] px-2 py-0.5 rounded font-mono transition-colors"
                style={{ background: catF === c ? "var(--card-hover)" : "transparent", color: catF === c ? "var(--text)" : "var(--dim)" }}>
                {c === "all" ? "ALL" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 gap-0.5 max-h-64 md:max-h-none overflow-y-auto">
            {filtered.map(r => (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className="text-left px-2.5 py-1.5 rounded transition-colors flex items-center gap-1.5"
                style={{ background: selId === r.id ? "var(--card)" : "transparent" }}>
                <span className="w-0.5 h-3.5 rounded-full shrink-0" style={{ background: TAG_TINT[r.tag] }} />
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate" style={{ color: selId === r.id ? "var(--text)" : "var(--sub)" }}>{r.zh}</div>
                  <div className="text-[10px] font-mono truncate" style={{ color: "var(--dim)" }}>{r.title}</div>
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          {!role ? (
            <p className="text-sm py-12 text-center md:text-left" style={{ color: "var(--dim)" }}>← 選擇職務</p>
          ) : (
            <>
              <div className="mb-4 pl-3" style={{ borderLeft: `3px solid ${TAG_TINT[role.tag]}` }}>
                <h2 className="text-lg font-bold">{role.zh}</h2>
                <p className="text-xs font-mono mt-0.5" style={{ color: "var(--dim)" }}>{role.title} · {TAG_LABELS[role.tag]}</p>
              </div>

              {/* Grid — 永遠 2-3 欄，不掉到 1 欄 */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1.5 mb-4">
                {DOMAINS.filter(d => role.caps[d.id]).map(d => {
                  const cap = role.caps[d.id];
                  const active = selDom === d.id;
                  const tint = TAG_TINT[role.tag];
                  return (
                    <button key={d.id} onClick={() => setSelDom(active ? null : d.id)}
                      className="text-left rounded-md px-2.5 py-2 transition-colors"
                      style={{ background: active ? "var(--card-hover)" : "var(--card)", border: active ? `1px solid ${tint}` : "1px solid var(--border)" }}>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-1 rounded" style={{ background: "var(--border)", color: active ? tint : "var(--dim)" }}>{d.tag}</span>
                        <span className="text-xs font-medium truncate" style={{ color: active ? "var(--text)" : "var(--sub)" }}>{d.label}</span>
                      </div>
                      <LvBar lv={cap.lv} tint={tint} />
                      <div className="text-[10px] font-mono mt-1" style={{ color: "var(--dim)" }}>{cap.skills.length} 項</div>
                    </button>
                  );
                })}
              </div>

              {/* Detail */}
              {selDom && role.caps[selDom] && (() => {
                const d = DOMAINS.find(x => x.id === selDom);
                const cap = role.caps[selDom];
                return (
                  <div className="rounded-md p-4 mb-4" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--border)", color: TAG_TINT[role.tag] }}>{d.tag}</span>
                      <h3 className="text-sm font-bold">{d.label} <span className="font-normal" style={{ color: "var(--dim)" }}>/ {d.en}</span></h3>
                    </div>
                    <p className="text-[10px] font-mono mb-2" style={{ color: "var(--dim)" }}>覆蓋：{LV_LABELS[cap.lv]}</p>
                    {cap.skills.map((s, i) => (
                      <p key={i} className="text-sm leading-relaxed py-1.5" style={{ color: "var(--sub)", borderBottom: i < cap.skills.length - 1 ? "1px solid var(--border)" : "none" }}>{s}</p>
                    ))}
                  </div>
                );
              })()}

              {DOMAINS.filter(d => !role.caps[d.id]).length > 0 && (
                <p className="text-[10px]" style={{ color: "var(--dim)" }}>
                  未涵蓋：{DOMAINS.filter(d => !role.caps[d.id]).map(d => d.label).join("、")}
                </p>
              )}
            </>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="px-5 py-5 text-[10px]" style={{ color: "var(--dim)", borderTop: "1px solid var(--border)" }}>
        <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>Global Cybersecurity Skills Framework</a>》2025-05-14</p>
        <p className="mt-0.5">原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>ossf/global-cybersecurity-skills-framework</a>　著作權歸 OpenSSF / Linux Foundation 所有</p>
      </footer>
    </div>
  );
}
