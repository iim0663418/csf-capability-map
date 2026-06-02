import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

function LvBar({ lv }) {
  const pct = [0, 33, 66, 100][lv];
  return (
    <div className="h-1 rounded-full mt-1.5 overflow-hidden" style={{ background: "var(--border)" }}>
      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--accent)" }} />
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
      <header className="px-6 lg:px-16 pt-12 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
        <p className="font-mono text-xs tracking-wide" style={{ color: "var(--dim)" }}>OpenSSF / Cybersecurity Skills Framework</p>
        <h1 className="text-3xl font-bold mt-3 tracking-tight" style={{ color: "var(--text)" }}>資安能力地圖</h1>
        <p className="mt-2 text-sm max-w-md leading-relaxed" style={{ color: "var(--sub)" }}>
          選擇左側職務查看其資安能力覆蓋範圍。點擊領域展開技能清單。
        </p>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="lg:w-56 shrink-0 px-6 lg:px-0 lg:pl-16 py-6" style={{ borderRight: "1px solid var(--border)" }}>
          <div className="flex flex-wrap gap-1 mb-4">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className="text-xs px-2 py-0.5 rounded font-mono transition-colors"
                style={{ background: catF === c ? "var(--card-hover)" : "transparent", color: catF === c ? "var(--text)" : "var(--dim)" }}>
                {c === "all" ? "ALL" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          <div className="space-y-px">
            {filtered.map(r => (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className="w-full text-left px-3 py-2 rounded transition-colors"
                style={{ background: selId === r.id ? "var(--card)" : "transparent" }}>
                <div className="text-sm font-medium" style={{ color: selId === r.id ? "var(--text)" : "var(--sub)" }}>{r.zh}</div>
                <div className="text-xs font-mono" style={{ color: "var(--dim)" }}>{r.title}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0 px-6 lg:px-12 py-8">
          {!role ? (
            <p className="text-sm pt-20" style={{ color: "var(--dim)" }}>選擇職務以檢視能力分佈</p>
          ) : (
            <>
              {/* Role title */}
              <div className="mb-6 pl-4" style={{ borderLeft: "3px solid var(--accent)" }}>
                <h2 className="text-xl font-bold">{role.zh}</h2>
                <p className="text-sm font-mono mt-0.5" style={{ color: "var(--dim)" }}>{role.title} · {TAG_LABELS[role.tag]}</p>
              </div>

              {/* Grid buttons — 只顯示有覆蓋的領域 */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 mb-6">
                {DOMAINS.filter(d => role.caps[d.id]).map(d => {
                  const cap = role.caps[d.id];
                  const active = selDom === d.id;
                  return (
                    <button key={d.id} onClick={() => setSelDom(active ? null : d.id)}
                      className="text-left rounded-lg px-3 py-2.5 transition-colors"
                      style={{ background: active ? "var(--card-hover)" : "var(--card)", border: active ? "1px solid var(--accent)" : "1px solid var(--border)" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono px-1 rounded" style={{ background: "var(--border)", color: "var(--dim)" }}>{d.tag}</span>
                        <span className="text-xs font-medium" style={{ color: active ? "var(--text)" : "var(--sub)" }}>{d.label}</span>
                      </div>
                      <LvBar lv={cap.lv} />
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
                  <div className="rounded-lg p-5 mb-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-mono px-1.5 py-0.5 rounded" style={{ background: "var(--border)", color: "var(--accent)" }}>{d.tag}</span>
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
      <footer className="px-6 lg:px-16 py-6 text-xs" style={{ color: "var(--dim)", borderTop: "1px solid var(--border)" }}>
        <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>Global Cybersecurity Skills Framework</a>》2025-05-14</p>
        <p className="mt-1">原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" style={{ color: "var(--accent)" }}>ossf/global-cybersecurity-skills-framework</a>　著作權歸 OpenSSF / Linux Foundation 所有</p>
      </footer>
    </div>
  );
}
