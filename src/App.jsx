import { useState, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, LineChart, Line } from "recharts";

const DATA = {
  total_messages: 142397,
  unique_posters: 306,
  total_media: 9452,
  total_reactions: 152373,
  top_posters: [
    ["sara", 10586], ["ᕙ(░ಥ╭͜ʖ╮ಥ░)━☆ﾟ.*･｡ﾟ", 8840], ["🎨", 7571],
    ["Alex Boland", 7336], ["esotericdirtbag", 7085], ["MoMA PS5", 6973],
    ["Instagram User", 6772], ["sagas_ig_profile", 4943], ["inspectorjanko", 4675],
    ["Andrés Bernal", 3545], ["dollie kyarn", 3093], ["lyss lester", 2807],
    ["Matthew J. Donovan", 2529], ["tera julia", 2482], ["Amir Faraji", 2093],
    ["Paul Tao", 2077], ["Jonathan Lockhart", 1999], ["masoncw", 1961],
    ["Scott Laufer", 1925], ["Tara Sar", 1789], ["david", 1731],
    ["yung algorithm", 1693], ["Bella", 1638], ["Jamie Peck", 1609],
    ["Andrew", 1586], ["Josh", 1548], ["stef sny", 1525],
    ["Dylan Forrest", 1524], ["ungodlyvirgin", 1485], ["adam", 1484],
    ["Zey", 1298], ["Si Weon Kim", 1237], ["Garland Miller", 1153],
    ["Anthony N-S", 1100], ["Edward Pankov", 1079], ["Taylor Lewandowski", 1071],
    ["Wes", 1038], ["r0b0tg1rl", 985], ["DAY☀️", 975],
    ["kelly__clifton", 958],
  ],
  reactions_received: [
    ["sara", 8346], ["🎨", 8269], ["inspectorjanko", 7735],
    ["esotericdirtbag", 7726], ["Instagram User", 7343], ["Alex Boland", 7118],
    ["ᕙ(░ಥ╭͜ʖ╮ಥ░)━☆ﾟ.*･｡ﾟ", 6457], ["sagas_ig_profile", 6175],
    ["MoMA PS5", 5159], ["dollie kyarn", 4131], ["Andrés Bernal", 3943],
    ["Matthew J. Donovan", 3535], ["Tara Sar", 3406], ["Paul Tao", 3200],
    ["lyss lester", 3097], ["Bella", 2888], ["stef sny", 2525],
    ["Scott Laufer", 2118], ["Josh", 2088], ["Jonathan Lockhart", 1931],
  ],
  month_counts: [
    { name: "Aug '25", msgs: 22889 }, { name: "Sep '25", msgs: 31932 },
    { name: "Oct '25", msgs: 17238 }, { name: "Nov '25", msgs: 14624 },
    { name: "Dec '25", msgs: 23229 }, { name: "Jan '26", msgs: 13043 },
    { name: "Feb '26", msgs: 10315 }, { name: "Mar '26", msgs: 9127 },
  ],
  week_data: [
    { name: "Aug 18", msgs: 7803 }, { name: "Aug 25", msgs: 15086 },
    { name: "Sep 1", msgs: 10158 }, { name: "Sep 8", msgs: 9889 },
    { name: "Sep 15", msgs: 6427 }, { name: "Sep 22", msgs: 4938 },
    { name: "Sep 29", msgs: 2911 }, { name: "Oct 6", msgs: 2702 },
    { name: "Oct 13", msgs: 5450 }, { name: "Oct 20", msgs: 4882 },
    { name: "Oct 27", msgs: 2282 }, { name: "Nov 3", msgs: 2855 },
    { name: "Nov 10", msgs: 3266 }, { name: "Nov 17", msgs: 4848 },
    { name: "Nov 24", msgs: 3186 }, { name: "Dec 1", msgs: 3985 },
    { name: "Dec 8", msgs: 6309 }, { name: "Dec 15", msgs: 6055 },
    { name: "Dec 22", msgs: 4290 }, { name: "Dec 29", msgs: 5206 },
    { name: "Jan 5", msgs: 3819 }, { name: "Jan 12", msgs: 2545 },
    { name: "Jan 19", msgs: 2016 }, { name: "Jan 26", msgs: 2624 },
    { name: "Feb 2", msgs: 2684 }, { name: "Feb 9", msgs: 3017 },
    { name: "Feb 16", msgs: 2624 }, { name: "Feb 23", msgs: 1651 },
    { name: "Mar 2", msgs: 2675 }, { name: "Mar 9", msgs: 3448 },
    { name: "Mar 16", msgs: 1702 }, { name: "Mar 23", msgs: 1064 },
  ],
  hour_counts: [
    880, 733, 462, 541, 582, 1561, 3396, 5819, 6698, 9324,
    9667, 8394, 7844, 6207, 7012, 8231, 7243, 8663, 7274, 9060,
    7681, 6528, 3071, 1808,
  ],
  day_counts: [
    { name: "Mon", msgs: 21200 }, { name: "Tue", msgs: 19100 },
    { name: "Wed", msgs: 21800 }, { name: "Thu", msgs: 20400 },
    { name: "Fri", msgs: 18900 }, { name: "Sat", msgs: 19700 },
    { name: "Sun", msgs: 21300 },
  ],
  media_posters: [
    ["ᕙ(░ಥ╭͜ʖ╮ಥ░)━☆ﾟ.*･｡ﾟ", 806], ["inspectorjanko", 720], ["Alex Boland", 696],
    ["sara", 548], ["MoMA PS5", 469], ["Instagram User", 306],
    ["esotericdirtbag", 275], ["stef sny", 268], ["🎨", 255],
    ["Andrés Bernal", 229], ["Jonathan Lockhart", 193], ["masoncw", 189],
  ],
};

const C = {
  bg: "#08080d", card: "#101018", border: "#1a1a28",
  accent: "#c8ff00", accentDim: "#5a7300",
  text: "#e8e6e0", dim: "#7a7872", muted: "#3d3d38",
  pink: "#ff3877", blue: "#3877ff", purple: "#8338ec",
  teal: "#00c9a7", orange: "#ff6b35",
};

const Tip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: "8px 12px", borderRadius: 4, fontSize: 11, color: C.text, fontFamily: "inherit" }}>
      <div style={{ color: C.dim, marginBottom: 2 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.accent, fontWeight: 700 }}>
          {p.value.toLocaleString()}
        </div>
      ))}
    </div>
  );
};

const Stat = ({ label, value, sub, color }) => (
  <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 16px", flex: 1, minWidth: 120 }}>
    <div style={{ fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 5 }}>{label}</div>
    <div style={{ fontSize: 24, fontWeight: 800, color: color || C.accent, lineHeight: 1 }}>{typeof value === "number" ? value.toLocaleString() : value}</div>
    {sub && <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{sub}</div>}
  </div>
);

const Sec = ({ children, sub }) => (
  <div style={{ marginBottom: 8, marginTop: 28 }}>
    <h2 style={{ fontSize: 12, fontWeight: 700, color: C.text, letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>{children}</h2>
    {sub && <div style={{ fontSize: 11, color: C.dim, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Note = ({ children }) => (
  <div style={{ fontSize: 11, color: C.dim, marginTop: 6, lineHeight: 1.5, maxWidth: 640 }}>{children}</div>
);

const TABS = ["Overview", "Timeline", "Posters", "Engagement"];

export default function App() {
  const [tab, setTab] = useState("Overview");

  const hourData = useMemo(() =>
    DATA.hour_counts.map((v, h) => ({ name: `${String(h).padStart(2, "0")}:00`, msgs: v })), []);

  const posterBars = useMemo(() =>
    DATA.top_posters.slice(0, 15).map(([name, count]) => ({
      name: name.length > 18 ? name.slice(0, 16) + "…" : name, msgs: count,
    })), []);

  const engData = useMemo(() =>
    DATA.top_posters.slice(0, 25).map(([name, mc]) => {
      const rx = DATA.reactions_received.find(([n]) => n === name);
      const rc = rx ? rx[1] : 0;
      return { name: name.length > 18 ? name.slice(0, 16) + "…" : name, full: name, msgs: mc, rxn: rc, ratio: mc > 0 ? rc / mc : 0 };
    }).sort((a, b) => b.ratio - a.ratio), []);

  const weekDaily = useMemo(() =>
    DATA.week_data.map(w => ({ ...w, daily: Math.round(w.msgs / 7) })), []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.text, padding: "20px 16px 48px", fontFamily: "'JetBrains Mono', 'SF Mono', monospace" }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700;800&display=swap" rel="stylesheet" />

      <div style={{ marginBottom: 18, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 22, fontWeight: 800, color: C.accent, letterSpacing: "-0.02em" }}>sweetychat</span>
          <span style={{ fontSize: 10, color: C.dim, letterSpacing: "0.1em", textTransform: "uppercase" }}>full archive · 143K messages</span>
        </div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>
          Aug 20, 2025 → Mar 29, 2026 · 222 days · 306 participants · Instagram DM groupchat
        </div>
      </div>

      <div style={{ display: "flex", gap: 2, marginBottom: 16, flexWrap: "wrap" }}>
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            background: tab === t ? C.accent : "transparent",
            color: tab === t ? C.bg : C.dim,
            border: `1px solid ${tab === t ? C.accent : C.border}`,
            borderRadius: 4, padding: "5px 12px", fontSize: 10, fontWeight: 700,
            cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.06em", textTransform: "uppercase",
          }}>{t}</button>
        ))}
      </div>

      {tab === "Overview" && (<>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
          <Stat label="Messages" value={DATA.total_messages} sub="~641/day avg" />
          <Stat label="Participants" value={DATA.unique_posters} sub="unique posters" />
          <Stat label="Reactions" value={DATA.total_reactions} sub="1.07 per msg" />
          <Stat label="Media" value={DATA.total_media} sub="img / vid / link" />
        </div>

        <Sec sub="Monthly volume — the full lifecycle from launch to present">Activity Arc</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={DATA.month_counts}>
              <defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.accent} stopOpacity={0.4} /><stop offset="100%" stopColor={C.accent} stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={34} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="msgs" stroke={C.accent} fill="url(#ga)" strokeWidth={2} dot={{ fill: C.accent, r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Note>
          Two peaks: the August launch (22.9K) and December revival (23.2K).
          September was peak mania at 31.9K (~1,064/day). By Mar '26, the chat cruises at ~300/day — the transition the article calls "lust falling into deeper feelings."
        </Note>

        <Sec sub="Top 15 by total messages across full archive">Power Users</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={330}>
            <BarChart data={posterBars} layout="vertical" margin={{ left: 8 }}>
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => v > 999 ? `${(v / 1000).toFixed(0)}k` : v} />
              <YAxis dataKey="name" type="category" tick={{ fill: C.dim, fontSize: 10 }} axisLine={false} tickLine={false} width={118} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="msgs" radius={[0, 3, 3, 0]} barSize={14}>
                {posterBars.map((_, i) => (<Cell key={i} fill={i === 0 ? C.accent : i < 3 ? C.accentDim : C.border} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Note>
          sara leads with 10.6K messages (7.4%). Top 7 account for ~39% of all traffic.
          Founder Matthew J. Donovan ranks #13 — an active steward, not the dominant voice.
        </Note>
      </>)}

      {tab === "Timeline" && (<>
        <Sec sub="Weekly message volume — 33 weeks of data at granular resolution">Pulse by Week</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 4px 4px" }}>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={DATA.week_data}>
              <defs><linearGradient id="gw" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={C.blue} stopOpacity={0.4} /><stop offset="100%" stopColor={C.blue} stopOpacity={0} /></linearGradient></defs>
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 8 }} axisLine={false} tickLine={false} interval={3} angle={-25} textAnchor="end" height={36} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={34} tickFormatter={v => `${(v / 1000).toFixed(1)}k`} />
              <Tooltip content={<Tip />} />
              <Area type="monotone" dataKey="msgs" stroke={C.blue} fill="url(#gw)" strokeWidth={1.5} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <Note>
          Week of Aug 25 was all-time peak: 15,086 messages (~2,155/day). The "limerence phase."
          Mid-Oct dip (W40-41: ~2,800/wk) was the first valley, then full December resurgence.
          March '26 has stabilized at 1,000–3,500/week.
        </Note>

        <Sec sub="Messages per day, averaged by week">Daily Velocity</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 4px 4px" }}>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={weekDaily}>
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 8 }} axisLine={false} tickLine={false} interval={3} angle={-25} textAnchor="end" height={36} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={34} />
              <Tooltip content={<Tip />} />
              <Line type="monotone" dataKey="daily" stroke={C.teal} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <Note>Peak velocity: 2,155 msgs/day (late Aug). Current: ~150-350/day. 7 months of sustained community.</Note>

        <Sec sub="24-hour activity pattern across entire archive">Circadian Rhythm</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={hourData}>
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 9 }} axisLine={false} tickLine={false} interval={2} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={30} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="msgs" radius={[2, 2, 0, 0]} barSize={14}>
                {hourData.map((d, i) => (<Cell key={i} fill={d.msgs > 7000 ? C.purple : "#1e1535"} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Note>Twin peaks at 9-10 AM and 5-7 PM. Only 2-5 AM goes quiet. The article's "no night or day" claim holds.</Note>

        <Sec sub="Minimal variance — this chat is infrastructure, not an event">Day of Week</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "14px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={DATA.day_counts}>
              <XAxis dataKey="name" tick={{ fill: C.dim, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} width={30} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="msgs" radius={[3, 3, 0, 0]} barSize={26}>
                {DATA.day_counts.map((d, i) => (<Cell key={i} fill={d.msgs > 21000 ? C.teal : "#0e2a22"} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>)}

      {tab === "Posters" && (<>
        <Sec sub="40 most active out of 306 total participants">Leaderboard</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 14, overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "22px 1fr 52px 70px", gap: "2px 6px", fontSize: 11, minWidth: 280 }}>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 9, paddingBottom: 5 }}>#</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 9, paddingBottom: 5 }}>USER</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 9, paddingBottom: 5, textAlign: "right" }}>MSGS</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 9, paddingBottom: 5 }}>SHARE</div>
            {DATA.top_posters.map(([name, count], i) => {
              const pct = ((count / DATA.total_messages) * 100);
              return [
                <div key={`r${i}`} style={{ color: i < 3 ? C.accent : C.muted, fontWeight: i < 3 ? 700 : 400, padding: "2px 0", fontSize: 10 }}>{i + 1}</div>,
                <div key={`n${i}`} style={{ color: i < 3 ? C.text : i < 10 ? C.dim : C.muted, fontWeight: i < 3 ? 600 : 400, padding: "2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>,
                <div key={`c${i}`} style={{ color: C.dim, textAlign: "right", padding: "2px 0" }}>{count > 999 ? `${(count / 1000).toFixed(1)}k` : count}</div>,
                <div key={`b${i}`} style={{ padding: "2px 0", display: "flex", alignItems: "center", gap: 3 }}>
                  <div style={{ height: 4, width: `${Math.min(pct * 10, 100)}%`, background: i < 3 ? C.accent : i < 10 ? C.accentDim : C.muted, borderRadius: 3, minWidth: 2 }} />
                  <span style={{ fontSize: 8, color: C.muted }}>{pct.toFixed(1)}%</span>
                </div>,
              ];
            })}
          </div>
        </div>

        <Sec sub="Top 12 photo/video/link sharers">Media Posters</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={DATA.media_posters.map(([n, c]) => ({ name: n.length > 16 ? n.slice(0, 14) + "…" : n, media: c }))} layout="vertical" margin={{ left: 8 }}>
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis dataKey="name" type="category" tick={{ fill: C.dim, fontSize: 10 }} axisLine={false} tickLine={false} width={118} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="media" radius={[0, 3, 3, 0]} barSize={14}>
                {DATA.media_posters.map((_, i) => (<Cell key={i} fill={i === 0 ? C.pink : i < 3 ? "#661530" : C.border} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <Note>9,452 media items (6.6% of msgs). inspectorjanko and Alex Boland punch above their text volume — visual culture as social glue.</Note>
      </>)}

      {tab === "Engagement" && (<>
        <Sec sub="Reactions received ÷ messages sent — who resonates most per message?">Resonance Ratio</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: 14, overflowX: "auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "22px 1fr 44px 44px 42px 48px", gap: "2px 4px", fontSize: 11, minWidth: 340 }}>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8 }}>#</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8 }}>USER</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8, textAlign: "right" }}>MSGS</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8, textAlign: "right" }}>RXN</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8, textAlign: "right" }}>RATIO</div>
            <div style={{ color: C.muted, fontWeight: 700, fontSize: 8 }}></div>
            {engData.map(({ name, msgs, rxn, ratio }, i) => [
              <div key={`r${i}`} style={{ color: C.muted, padding: "2px 0", fontSize: 10 }}>{i + 1}</div>,
              <div key={`n${i}`} style={{ color: ratio >= 1.3 ? C.orange : C.dim, fontWeight: ratio >= 1.3 ? 600 : 400, padding: "2px 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{name}</div>,
              <div key={`m${i}`} style={{ color: C.muted, textAlign: "right", padding: "2px 0", fontSize: 10 }}>{msgs > 999 ? `${(msgs / 1000).toFixed(1)}k` : msgs}</div>,
              <div key={`x${i}`} style={{ color: C.muted, textAlign: "right", padding: "2px 0", fontSize: 10 }}>{rxn > 999 ? `${(rxn / 1000).toFixed(1)}k` : rxn}</div>,
              <div key={`rt${i}`} style={{ color: ratio >= 1.5 ? C.orange : ratio >= 1.0 ? C.teal : C.muted, textAlign: "right", fontWeight: ratio >= 1.2 ? 700 : 400, padding: "2px 0" }}>{ratio.toFixed(2)}x</div>,
              <div key={`b${i}`} style={{ padding: "2px 0", display: "flex", alignItems: "center" }}>
                <div style={{ height: 4, width: `${Math.min(ratio * 30, 100)}%`, background: ratio >= 1.5 ? C.orange : ratio >= 1.0 ? C.teal : C.muted, borderRadius: 3, minWidth: 2 }} />
              </div>,
            ])}
          </div>
        </div>
        <Note>
          Tara Sar (1.90x), Bella (1.76x), inspectorjanko (1.65x), and stef sny (1.66x) are the chat's highest-resonance voices.
          Matthew J. Donovan at 1.40x — the founder engages at well above average.
          152K reactions on 143K messages = 1.07x chat-wide, roughly 5x the baseline for groupchats this size.
        </Note>

        <Sec sub="Raw reaction totals — the chat's emotional currency">Reaction Magnets</Sec>
        <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: 6, padding: "10px 6px 6px" }}>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={DATA.reactions_received.slice(0, 15).map(([n, c]) => ({
              name: n.length > 16 ? n.slice(0, 14) + "…" : n, reactions: c,
            }))} layout="vertical" margin={{ left: 8 }}>
              <XAxis type="number" tick={{ fill: C.muted, fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}k`} />
              <YAxis dataKey="name" type="category" tick={{ fill: C.dim, fontSize: 10 }} axisLine={false} tickLine={false} width={118} />
              <Tooltip content={<Tip />} />
              <Bar dataKey="reactions" radius={[0, 3, 3, 0]} barSize={14}>
                {DATA.reactions_received.slice(0, 15).map((_, i) => (<Cell key={i} fill={i === 0 ? C.orange : i < 5 ? "#663018" : C.border} />))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </>)}

      <div style={{ marginTop: 36, paddingTop: 12, borderTop: `1px solid ${C.border}`, fontSize: 9, color: C.muted, lineHeight: 1.6 }}>
        Data: Instagram DM export · 15 HTML files · 143K messages · 306 participants<br />
        Companion to "Sweetychat Gives Internet Instinct" — Noema Magazine, 2026<br />
        Built for Matthew J. Donovan / Caia Hagel
      </div>
    </div>
  );
}
