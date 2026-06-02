import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

const TAG_ACCENT = {
  engineering:"var(--green)", architecture:"var(--mauve)", infrastructure:"var(--blue)",
  data:"var(--accent)", management:"var(--red)", governance:"var(--teal)", security:"var(--red)",
};

function Bar({ lv }) {
  return (
    <div className="flex gap-0.5 mt-2">
      {[1,2,3].map(i => (
        <div key={i} className="h-1.5 flex-1 rounded-sm transition-all duration-300"
          style={{ background: i <= lv ? "var(--accent)" : "var(--surface)" }} />
      ))}
    </div>
  );
}

function SkillPanel({ domain, cap }) {
  return (
    <div className="mt-6 rounded-lg p-5" style={{ background: "var(--surface)" }}>
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl">{domain.icon}</span>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: "var(--text)" }}>
            {domain.label} <span className="font-normal" style={{ color: "var(--muted)" }}>/ {domain.en}</span>
          </h3>
          <p className="text-xs" style={{ color: "var(--muted)" }}>覆蓋：{LV_LABELS[cap.lv]}</p>
        </div>
      </div>
      <ol className="space-y-2">
        {cap.skills.map((s, i) => (
          <li key={i} className="text-sm leading-relaxed flex gap-2" style={{ color: "var(--subtext)" }}>
            <span className="font-mono text-xs shrink-0 w-4 text-right" style={{ color: "var(--muted)" }}>{i+1}</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
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
      {/* Hero */}
      <header className="px-6 md:px-12 pt-10 pb-6" style={{ borderBottom: "1px solid var(--surface)" }}>
        <p className="text-xs font-mono uppercase tracking-wider" style={{ color: "var(--muted)" }}>
          OpenSSF · Global Cybersecurity Skills Framework
        </p>
        <h1 className="text-2xl md:text-3xl font-bold mt-2" style={{ color: "var(--text)" }}>
          資安能力地圖
        </h1>
        <p className="text-sm mt-1 max-w-lg" style={{ color: "var(--subtext)" }}>
          14 個職務族群 × 15 個能力領域。選擇職務查看覆蓋範圍，點擊領域展開技能。
        </p>
        <div className="flex gap-4 mt-3 text-xs" style={{ color: "var(--muted)" }}>
          <span className="flex items-center gap-1.5"><span className="w-2 h-1.5 rounded-sm" style={{ background: "var(--accent)" }} />基礎</span>
          <span className="flex items-center gap-1.5"><span className="w-4 h-1.5 rounded-sm" style={{ background: "var(--accent)" }} />基礎+中階</span>
          <span className="flex items-center gap-1.5"><span className="w-6 h-1.5 rounded-sm" style={{ background: "var(--accent)" }} />全層次</span>
        </div>
      </header>

      <main className="px-6 md:px-12 py-6 flex flex-col md:flex-row gap-6 max-w-7xl">
        {/* Sidebar */}
        <aside className="md:w-52 shrink-0">
          <div className="flex flex-wrap gap-1.5 mb-4">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className="text-xs px-2.5 py-1 rounded-md transition-colors"
                style={{ background: catF === c ? "var(--surface-hover)" : "transparent", color: catF === c ? "var(--text)" : "var(--muted)" }}>
                {c === "all" ? "全部" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          <nav className="space-y-0.5">
            {filtered.map(r => (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className="w-full text-left px-3 py-2 rounded-md transition-colors"
                style={{ background: selId === r.id ? "var(--surface)" : "transparent" }}>
                <div className="text-xs font-semibold" style={{ color: selId === r.id ? "var(--text)" : "var(--subtext)" }}>{r.zh}</div>
                <div className="text-xs font-mono" style={{ color: "var(--muted)" }}>{r.title}</div>
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        {!role ? (
          <div className="flex-1 flex items-center justify-center min-h-[50vh]">
            <p className="text-sm" style={{ color: "var(--muted)" }}>← 選擇職務族群</p>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            {/* Role header */}
            <div className="rounded-lg p-5 mb-5" style={{ background: "var(--surface)", borderLeft: `3px solid ${TAG_ACCENT[role.tag]}` }}>
              <h2 className="text-lg font-bold" style={{ color: "var(--text)" }}>{role.zh}</h2>
              <p className="text-sm font-mono mt-0.5" style={{ color: "var(--muted)" }}>{role.title}</p>
              <p className="text-xs mt-1" style={{ color: TAG_ACCENT[role.tag] }}>
                {TAG_LABELS[role.tag]} · {Object.keys(role.caps).length} 個領域
              </p>
            </div>

            {/* Domain grid — CSS Grid cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {DOMAINS.map(d => {
                const cap = role.caps[d.id];
                if (!cap) return (
                  <div key={d.id} className="rounded-md px-3 py-2.5 opacity-25"
                    style={{ background: "var(--surface)" }}>
                    <span className="text-sm">{d.icon}</span>
                    <span className="text-xs ml-1.5" style={{ color: "var(--muted)" }}>{d.label}</span>
                  </div>
                );
                const active = selDom === d.id;
                return (
                  <button key={d.id} onClick={() => setSelDom(active ? null : d.id)}
                    className="text-left rounded-md px-3 py-2.5 transition-colors"
                    style={{ background: active ? "var(--surface-hover)" : "var(--surface)", border: active ? "1px solid var(--accent)" : "1px solid transparent" }}>
                    <div className="flex items-center justify-between">
                      <span><span className="text-sm">{d.icon}</span><span className="text-xs ml-1.5" style={{ color: "var(--text)" }}>{d.label}</span></span>
                      <span className="text-xs font-mono" style={{ color: "var(--muted)" }}>{cap.skills.length}</span>
                    </div>
                    <Bar lv={cap.lv} />
                  </button>
                );
              })}
            </div>

            {/* Skill detail */}
            {selDom && role.caps[selDom] && (
              <SkillPanel domain={DOMAINS.find(x => x.id === selDom)} cap={role.caps[selDom]} />
            )}

            {/* Uncovered */}
            {DOMAINS.filter(d => !role.caps[d.id]).length > 0 && (
              <p className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
                未涵蓋：{DOMAINS.filter(d => !role.caps[d.id]).map(d => d.label).join("、")}
              </p>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-12 py-6 text-xs space-y-1" style={{ color: "var(--muted)", borderTop: "1px solid var(--surface)" }}>
        <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" className="underline" style={{ color: "var(--accent)" }}>Global Cybersecurity Skills Framework</a>》（2025-05-14）</p>
        <p>原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" className="underline" style={{ color: "var(--accent)" }}>ossf/global-cybersecurity-skills-framework</a></p>
        <p style={{ color: "var(--overlay)" }}>本視覺化僅供參考，資料著作權歸 OpenSSF / Linux Foundation 所有。</p>
      </footer>
    </div>
  );
}
