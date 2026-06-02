import { useState, useMemo } from "react";
import { DOMAINS, TAG_LABELS, LV_LABELS } from "./data";
import { ROLES as ROLES1 } from "./roles1";
import { ROLES2 } from "./roles2";

const ROLES = [...ROLES1, ...ROLES2];
const CATS = ["all","engineering","architecture","infrastructure","data","management","governance","security"];

const TAG_COLORS = {
  engineering:   { bg:"bg-emerald-900/40", text:"text-emerald-300", border:"border-emerald-700" },
  architecture:  { bg:"bg-violet-900/40",  text:"text-violet-300",  border:"border-violet-700" },
  infrastructure:{ bg:"bg-sky-900/40",     text:"text-sky-300",     border:"border-sky-700" },
  data:          { bg:"bg-amber-900/40",   text:"text-amber-300",   border:"border-amber-700" },
  management:    { bg:"bg-rose-900/40",    text:"text-rose-300",    border:"border-rose-700" },
  governance:    { bg:"bg-orange-900/40",  text:"text-orange-300",  border:"border-orange-700" },
  security:      { bg:"bg-red-900/40",     text:"text-red-300",     border:"border-red-700" },
};

const LV_COLORS = ["","bg-emerald-600","bg-sky-500","bg-violet-500"];

function Bar({ lv }) {
  return (
    <div className="flex gap-0.5 mt-1">
      {[1,2,3].map(i => (
        <div key={i} className={`h-1.5 flex-1 rounded-sm ${i <= lv ? LV_COLORS[lv] : "bg-gray-800"}`} />
      ))}
    </div>
  );
}

function SkillDetail({ domain, cap }) {
  return (
    <div className="rounded-lg border border-gray-700 bg-gray-800/60 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{domain.icon}</span>
        <div>
          <h3 className="text-sm font-bold text-white">{domain.label} <span className="text-gray-500 font-normal text-xs">/ {domain.en}</span></h3>
          <p className="text-xs text-gray-500">覆蓋層次：{LV_LABELS[cap.lv]}</p>
        </div>
      </div>
      <div className="space-y-2">
        {cap.skills.map((s, i) => (
          <div key={i} className="flex gap-2 text-sm text-gray-300 leading-relaxed border-b border-gray-700/50 pb-2 last:border-0 last:pb-0">
            <span className="text-xs text-gray-600 shrink-0 mt-0.5 w-5 text-right">{i+1}.</span>
            <span>{s}</span>
          </div>
        ))}
      </div>
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
    <div className="min-h-screen font-sans text-gray-200">
      {/* Header */}
      <div className="border-b border-gray-800 px-5 py-4">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-500 uppercase tracking-widest font-mono">Linux Foundation × OpenSSF · Global Cybersecurity Skills Framework</p>
          <h1 className="text-lg font-bold text-white mt-0.5">各職務資安能力地圖</h1>
          <p className="text-xs text-gray-500 mt-1">14 職務族群 × 15 能力領域　選擇職務 → 點擊能力領域查看技能細節</p>
          <div className="flex gap-3 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-emerald-600 inline-block"/>基礎</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-sky-500 inline-block"/>基礎+中階</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-violet-500 inline-block"/>全層次</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 py-5 flex gap-5">
        {/* Sidebar */}
        <div className="w-52 shrink-0">
          <div className="flex flex-wrap gap-1 mb-3">
            {CATS.map(c => (
              <button key={c} onClick={() => { setCatF(c); setSelId(null); setSelDom(null); }}
                className={`text-xs px-2 py-0.5 rounded border transition-all ${catF === c ? "bg-gray-700 text-white border-gray-600" : "border-gray-800 text-gray-500 hover:text-gray-300"}`}>
                {c === "all" ? "全部" : TAG_LABELS[c]}
              </button>
            ))}
          </div>
          {filtered.map(r => {
            const tc = TAG_COLORS[r.tag];
            return (
              <button key={r.id} onClick={() => { setSelId(r.id); setSelDom(null); }}
                className={`w-full text-left px-3 py-2 mb-1 rounded border transition-all ${selId === r.id ? `${tc.bg} ${tc.border} ${tc.text}` : "border-transparent text-gray-400 hover:bg-gray-800/40 hover:text-gray-200"}`}>
                <div className="text-xs font-semibold leading-tight">{r.zh}</div>
                <div className="flex items-center justify-between mt-0.5">
                  <span className="text-xs text-gray-600">{r.title}</span>
                  <span className="text-xs text-gray-700">{Object.keys(r.caps).length}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Content */}
        {!role ? (
          <div className="flex-1 flex items-center justify-center text-gray-700">
            <div className="text-center"><div className="text-3xl mb-2">⟵</div><p className="text-sm">選擇職務族群</p></div>
          </div>
        ) : (
          <div className="flex-1 min-w-0">
            {/* Role header */}
            <div className={`rounded-lg border p-4 mb-4 ${TAG_COLORS[role.tag].bg} ${TAG_COLORS[role.tag].border}`}>
              <h2 className={`text-lg font-bold ${TAG_COLORS[role.tag].text}`}>{role.zh}</h2>
              <p className="text-sm text-gray-400">{role.title}</p>
              <p className="text-xs text-gray-500 mt-1">{Object.keys(role.caps).length} 個資安能力領域 · {TAG_LABELS[role.tag]}</p>
            </div>

            {/* Domain grid */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {DOMAINS.map(d => {
                const cap = role.caps[d.id];
                if (!cap) return (
                  <div key={d.id} className="rounded border border-gray-900 bg-gray-900/20 px-3 py-2 opacity-20">
                    <div className="flex items-center gap-1.5"><span className="text-sm">{d.icon}</span><span className="text-xs text-gray-600">{d.label}</span></div>
                  </div>
                );
                return (
                  <button key={d.id} onClick={() => setSelDom(selDom === d.id ? null : d.id)}
                    className={`text-left rounded border px-3 py-2 transition-all ${selDom === d.id ? "bg-gray-700 border-gray-500 text-white" : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-800"}`}>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{d.icon}</span>
                      <span className="text-xs font-semibold">{d.label}</span>
                    </div>
                    <Bar lv={cap.lv} />
                    <div className="text-xs text-gray-600 mt-1">{cap.skills.length} 項技能</div>
                  </button>
                );
              })}
            </div>

            {/* Skill detail */}
            {selDom && role.caps[selDom] && (
              <SkillDetail domain={DOMAINS.find(x => x.id === selDom)} cap={role.caps[selDom]} />
            )}

            {/* Uncovered */}
            <div className="pt-3 border-t border-gray-800">
              <p className="text-xs text-gray-600 mb-2">此職務未涵蓋的能力領域：</p>
              <div className="flex flex-wrap gap-1.5">
                {DOMAINS.filter(d => !role.caps[d.id]).map(d => (
                  <span key={d.id} className="text-xs px-2 py-0.5 rounded border border-gray-800 text-gray-700">{d.icon} {d.label}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-5 py-4 mt-8">
        <div className="max-w-5xl mx-auto text-xs text-gray-600 space-y-1">
          <p>資料來源：Linux Foundation × OpenSSF《<a href="https://cybersecurityframework.io" target="_blank" rel="noopener" className="underline text-gray-500 hover:text-gray-300">Global Cybersecurity Skills Framework</a>》（2025-05-14）</p>
          <p>原始資料：<a href="https://github.com/ossf/global-cybersecurity-skills-framework" target="_blank" rel="noopener" className="underline text-gray-500 hover:text-gray-300">ossf/global-cybersecurity-skills-framework</a></p>
          <p className="text-gray-700">本視覺化僅供參考，資料著作權歸 OpenSSF / Linux Foundation 所有。</p>
        </div>
      </footer>
    </div>
  );
}
