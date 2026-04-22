import { StrictMode, type ReactNode } from "react";
import { createRoot } from "react-dom/client";

import govukYaml from "../../govuk.brand-id.yaml?raw";
import mailchimpYaml from "../../mailchimp.brand-id.yaml?raw";
import gitlabYaml from "../../gitlab.brand-id.yaml?raw";
import { parseBrandIdYaml } from "../../../src/brand-id.yaml.js";
import { deriveMissingFieldPaths } from "../../../src/brand-id.audit.js";

import "./styles.css";

type BrandKey = "govuk" | "mailchimp" | "gitlab";
const YAML_BY_BRAND: Record<BrandKey, string> = {
  govuk: govukYaml,
  mailchimp: mailchimpYaml,
  gitlab: gitlabYaml,
};
const BRAND_LABELS: Record<BrandKey, string> = {
  govuk: "GOV.UK",
  mailchimp: "Mailchimp",
  gitlab: "GitLab",
};

function activeBrand(): BrandKey {
  const v = new URLSearchParams(window.location.search).get("brand");
  return v === "govuk" || v === "mailchimp" || v === "gitlab" ? v : "govuk";
}
const BRAND: BrandKey = activeBrand();

const doc = parseBrandIdYaml(YAML_BY_BRAND[BRAND]);
const p = doc.profile;

function setBrand(key: BrandKey) {
  const url = new URL(window.location.href);
  url.searchParams.set("brand", key);
  window.location.href = url.toString();
}

function BrandSwitcher() {
  return (
    <nav
      aria-label="Brand"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.6rem 1rem",
        background: "var(--paper)",
        borderBottom: "1px solid var(--rule)",
        fontSize: "0.82rem",
        fontFamily: "var(--f-ui)",
        marginBottom: "1rem",
      }}
    >
      <span className="mono small muted" style={{ marginRight: "0.25rem" }}>
        Brand
      </span>
      {(Object.keys(BRAND_LABELS) as BrandKey[]).map((key) => {
        const active = key === BRAND;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={active}
            onClick={() => setBrand(key)}
            style={{
              font: "inherit",
              fontSize: "0.82rem",
              padding: "0.25rem 0.7rem",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              background: active ? "var(--ink)" : "var(--panel)",
              color: active ? "var(--paper)" : "var(--ink)",
              cursor: "pointer",
            }}
          >
            {BRAND_LABELS[key]}
          </button>
        );
      })}
    </nav>
  );
}

/* ─────────────────────────────────────── shell primitives ─────── */

function Row({
  kicker,
  title,
  path,
  desc,
  children,
}: {
  kicker: string;
  title: string;
  path?: string;
  desc?: string;
  children: ReactNode;
}) {
  return (
    <section className="row">
      <div className="row__meta">
        <div className="row__kicker">{kicker}</div>
        <h2 className="row__title">{title}</h2>
        {path && <div className="row__path">{path}</div>}
        {desc && <p className="row__desc">{desc}</p>}
      </div>
      <div className="cells">{children}</div>
    </section>
  );
}

function Cell({
  label,
  hint,
  wide,
  children,
}: {
  label: string;
  hint?: string;
  wide?: boolean;
  children: ReactNode;
}) {
  return (
    <div className={`cell ${wide ? "cell--wide" : ""}`}>
      <div className="cell__label">
        <span>{label}</span>
      </div>
      <div className="cell__body">{children}</div>
      {hint && <div className="cell__hint">{hint}</div>}
    </div>
  );
}

/* ─────────────────────────────────────── shared viz helpers ─────── */

function PolarChart({
  items,
  anti,
}: {
  items: string[];
  anti?: string[];
}) {
  const size = 240;
  const cx = size / 2;
  const cy = size / 2;
  const r = 85;
  const total = items.length + (anti?.length ?? 0);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: "100%", height: "auto" }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e4e4e9" strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r={r * 0.55} fill="none" stroke="#eeeef3" strokeDasharray="2 3" />
      <circle cx={cx} cy={cy} r={2} fill="#1a1a1d" />
      {items.map((t, i) => {
        const a = (i / Math.max(1, total)) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return (
          <g key={t}>
            <line x1={cx} y1={cy} x2={x} y2={y} stroke="#1a1a1d" strokeWidth={0.6} />
            <circle cx={x} cy={y} r={3} fill="#1a1a1d" />
            <text
              x={x + Math.cos(a) * 10}
              y={y + Math.sin(a) * 10}
              textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"}
              dominantBaseline="middle"
              style={{ font: "10px/1 system-ui", fill: "#1a1a1d" }}
            >
              {t}
            </text>
          </g>
        );
      })}
      {anti?.map((t, i) => {
        const a = ((i + items.length) / Math.max(1, total)) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        return (
          <g key={`a-${t}`}>
            <line
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="#b03030"
              strokeWidth={0.6}
              strokeDasharray="2 2"
            />
            <circle cx={x} cy={y} r={2.5} fill="#fff" stroke="#b03030" />
            <text
              x={x + Math.cos(a) * 10}
              y={y + Math.sin(a) * 10}
              textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"}
              dominantBaseline="middle"
              style={{
                font: "10px/1 system-ui",
                fill: "#a12525",
                textDecoration: "line-through",
              }}
            >
              {t}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function EnumScale({
  values,
  current,
}: {
  values: string[];
  current: string | null | undefined;
}) {
  const idx = values.indexOf(current ?? "");
  return (
    <div>
      <div style={{ position: "relative", padding: "12px 0 18px" }}>
        <div
          style={{
            position: "relative",
            height: 3,
            background: "#e4e4e9",
            borderRadius: 2,
          }}
        >
          {values.map((_, i) => (
            <span
              key={i}
              style={{
                position: "absolute",
                left: `${(i / (values.length - 1)) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: i === idx ? "#1a1a1d" : "#c1c1ca",
              }}
            />
          ))}
          {idx >= 0 && (
            <span
              style={{
                position: "absolute",
                left: `${(idx / (values.length - 1)) * 100}%`,
                top: "50%",
                transform: "translate(-50%, -50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#1a1a1d",
                border: "3px solid #fff",
                boxShadow: "0 0 0 1px #1a1a1d",
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          font: "10px/1 var(--f-mono)",
          color: "#8a8a92",
        }}
      >
        {values.map((v) => (
          <span
            key={v}
            style={{ color: v === current ? "#1a1a1d" : undefined, fontWeight: v === current ? 600 : 400 }}
          >
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

function Gauge({ value, label }: { value: number; label?: string }) {
  const size = 120;
  const cx = size / 2;
  const cy = size / 2;
  const r = 44;
  const circ = 2 * Math.PI * r;
  return (
    <svg viewBox={`0 0 ${size} ${size}`} style={{ width: 120, height: 120 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eeeef3" strokeWidth={10} />
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="#1a1a1d"
        strokeWidth={10}
        strokeDasharray={`${value * circ} ${circ}`}
        strokeDashoffset={circ * 0.25}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <text
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="central"
        style={{ font: "600 20px system-ui", fill: "#1a1a1d" }}
      >
        {Math.round(value * 100)}%
      </text>
      {label && (
        <text
          x={cx}
          y={cy + 18}
          textAnchor="middle"
          style={{ font: "10px var(--f-mono)", fill: "#8a8a92" }}
        >
          {label}
        </text>
      )}
    </svg>
  );
}

/* ─────────────────────────────────────── the document ─────── */

function App() {
  return (
    <>
      <BrandSwitcher />
      <div className="ex">
        <header className="ex__intro">
          <h1>Brand ID · Visual Explorations</h1>
          <p>
            For every major field in <code>examples/{BRAND}.brand-id.yaml</code>, this sheet shows
            multiple visual translations side by side. Picking a design means picking a visual idea
            per block. Everything below renders the same actual {BRAND_LABELS[BRAND]} data — quick
            and dirty, not polished.
          </p>
        </header>

      {/* ────────── META ────────── */}

      <Row
        kicker="meta"
        title="Brand name"
        path="/meta/brandName"
        desc="A string. Usually the one thing readers want to see first."
      >
        <Cell label="Plain">
          <div style={{ fontSize: "1.1rem", fontWeight: 500 }}>{doc.meta.brandName}</div>
        </Cell>
        <Cell label="Large display">
          <div
            style={{
              fontFamily: "var(--f-serif)",
              fontSize: "2.4rem",
              fontWeight: 500,
              lineHeight: 1,
              letterSpacing: "-0.02em",
            }}
          >
            {doc.meta.brandName}
          </div>
        </Cell>
        <Cell label="Crumb">
          <div style={{ color: "var(--ink-faint)" }}>
            Lexios <span style={{ margin: "0 0.35rem" }}>›</span> Brand ID{" "}
            <span style={{ margin: "0 0.35rem" }}>›</span>
            <span style={{ color: "var(--ink)" }}>{doc.meta.brandName}</span>
          </div>
        </Cell>
        <Cell label="Monogram mark">
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 12,
              background: "#1a1a1d",
              color: "#fff",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--f-serif)",
              fontSize: "2.4rem",
              fontWeight: 500,
            }}
          >
            {doc.meta.brandName.slice(0, 1)}
          </div>
        </Cell>
        <Cell label="Business card">
          <div
            style={{
              border: "1px solid var(--rule)",
              padding: "0.75rem",
              borderRadius: 4,
              fontSize: "0.82rem",
            }}
          >
            <div style={{ fontFamily: "var(--f-serif)", fontSize: "1.2rem", fontWeight: 500 }}>
              {doc.meta.brandName}
            </div>
            <div style={{ color: "var(--ink-soft)" }}>{doc.meta.legalEntityName}</div>
            <div style={{ color: "var(--ink-faint)", fontFamily: "var(--f-mono)" }}>
              {doc.meta.canonicalDomain}
            </div>
          </div>
        </Cell>
      </Row>

      <Row
        kicker="meta"
        title="Document metadata"
        path="/meta (schema, status, dates, locales, tags)"
        desc="A bundle of small descriptive fields. Identity of this record, not of the brand."
      >
        <Cell label="Key–value list">
          <dl className="kv">
            <dt>schema</dt>
            <dd className="mono">
              {doc.meta.schema.id}@{doc.meta.schema.version}
            </dd>
            <dt>status</dt>
            <dd>{doc.meta.status}</dd>
            <dt>updated</dt>
            <dd className="mono">{doc.meta.updatedAt.slice(0, 10)}</dd>
            <dt>locale</dt>
            <dd className="mono">{doc.meta.primaryLocale}</dd>
            <dt>tags</dt>
            <dd>{doc.meta.tags.join(", ")}</dd>
          </dl>
        </Cell>
        <Cell label="Chip strip">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            <span className="pill mono">schema {doc.meta.schema.version}</span>
            <span className="pill">{doc.meta.status}</span>
            <span className="pill mono">{doc.meta.primaryLocale}</span>
            <span className="pill mono">{doc.meta.updatedAt.slice(0, 10)}</span>
            {doc.meta.tags.map((t) => (
              <span className="pill" key={t}>
                #{t}
              </span>
            ))}
          </div>
        </Cell>
        <Cell label="Wiki infobox">
          <table
            style={{
              width: "100%",
              fontSize: "0.78rem",
              borderCollapse: "collapse",
              border: "1px solid var(--rule)",
            }}
          >
            <tbody>
              {[
                ["Legal", doc.meta.legalEntityName ?? "—"],
                ["Domain", doc.meta.canonicalDomain ?? "—"],
                ["Schema", `${doc.meta.schema.id} ${doc.meta.schema.version}`],
                ["Status", doc.meta.status],
                ["Updated", doc.meta.updatedAt.slice(0, 10)],
                ["Locale", doc.meta.primaryLocale],
              ].map(([k, v]) => (
                <tr key={k}>
                  <th
                    scope="row"
                    style={{
                      textAlign: "left",
                      padding: "0.2rem 0.4rem",
                      background: "var(--surface)",
                      fontWeight: 500,
                      borderBottom: "1px solid var(--rule-soft)",
                    }}
                  >
                    {k}
                  </th>
                  <td style={{ padding: "0.2rem 0.4rem", borderBottom: "1px solid var(--rule-soft)" }}>
                    {v}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Timeline strip">
          <svg viewBox="0 0 300 60" style={{ width: "100%", height: 60 }}>
            <line x1="20" y1="30" x2="280" y2="30" className="axis" />
            {[
              { label: "created", date: doc.meta.createdAt, x: 40 },
              { label: "updated", date: doc.meta.updatedAt, x: 200 },
              { label: "reviewed", date: doc.audit.lastHumanReviewAt ?? null, x: 240 },
            ].map((pt) => (
              <g key={pt.label}>
                <circle cx={pt.x} cy={30} r={4} fill={pt.date ? "#1a1a1d" : "none"} stroke="#1a1a1d" />
                <text x={pt.x} y={20} textAnchor="middle" style={{ font: "9px var(--f-mono)" }}>
                  {pt.label}
                </text>
                <text x={pt.x} y={48} textAnchor="middle" style={{ font: "9px var(--f-mono)", fill: "#8a8a92" }}>
                  {pt.date?.slice(0, 10) ?? "—"}
                </text>
              </g>
            ))}
          </svg>
        </Cell>
      </Row>

      {/* ────────── CORE PROSE ────────── */}

      <Row
        kicker="core"
        title="Brand summary / mission"
        path="/profile/core/{brandSummary,missionOrPromise}"
        desc="Two long strings. The most quoted sentences in the whole document."
      >
        <Cell label="Paragraph">
          <p style={{ margin: 0 }}>{p.core.brandSummary}</p>
        </Cell>
        <Cell label="Pull quote">
          <blockquote
            style={{
              margin: 0,
              fontFamily: "var(--f-serif)",
              fontSize: "1.15rem",
              lineHeight: 1.35,
              borderLeft: "2px solid #1a1a1d",
              paddingLeft: "0.85rem",
            }}
          >
            {p.core.brandSummary}
          </blockquote>
        </Cell>
        <Cell label="Manifesto card">
          <div
            style={{
              background: "#1a1a1d",
              color: "#fff",
              padding: "1rem",
              borderRadius: 4,
              fontFamily: "var(--f-serif)",
              fontSize: "1.05rem",
              lineHeight: 1.4,
            }}
          >
            {p.core.missionOrPromise}
          </div>
        </Cell>
        <Cell label="Lead + tag">
          <div>
            <div style={{ fontFamily: "var(--f-serif)", fontSize: "1.15rem", lineHeight: 1.35, marginBottom: "0.5rem" }}>
              {p.core.brandSummary}
            </div>
            <div className="mono small muted">— {p.core.missionOrPromise?.slice(0, 60)}…</div>
          </div>
        </Cell>
        <Cell label="Two-col summary/mission">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem" }}>
            <div>
              <div className="mono small muted" style={{ marginBottom: "0.25rem" }}>
                summary
              </div>
              {p.core.brandSummary}
            </div>
            <div>
              <div className="mono small muted" style={{ marginBottom: "0.25rem" }}>
                mission
              </div>
              {p.core.missionOrPromise}
            </div>
          </div>
        </Cell>
      </Row>

      {/* ────────── PERSONALITY TRAITS ────────── */}

      <Row
        kicker="core"
        title="Trait spectrum"
        path="/profile/core/traitSpectrum[]"
        desc="Array of {positivePole, negativePole, weight, note?, icon?}. The keystone of the whole record."
      >
        <Cell label="Weighted scales">
          <div style={{ display: "grid", gap: "0.35rem" }}>
            {p.core.traitSpectrum.map((pair) => (
              <div key={`${pair.positivePole}-${pair.negativePole}`} style={{ fontSize: "0.8rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                  <span>{pair.positivePole}</span>
                  <span className="muted">{pair.negativePole}</span>
                </div>
                <div style={{ position: "relative", height: 4, background: "var(--rule)", borderRadius: 2 }}>
                  <span className="pin" style={{ left: `${((pair.weight + 1) / 2) * 100}%`, top: "50%" }} />
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Radar (axes = pairs)" hint="Each axis is a TraitPair. Spoke length = weight.">
          <svg viewBox="0 0 240 240" style={{ width: "100%", height: "auto" }}>
            <circle cx={120} cy={120} r={80} fill="none" stroke="var(--rule)" strokeDasharray="2 3" />
            <circle cx={120} cy={120} r={40} fill="none" stroke="var(--rule-soft)" strokeDasharray="2 3" />
            <circle cx={120} cy={120} r={3} fill="var(--ink)" />
            {p.core.traitSpectrum.map((pair, i, arr) => {
              const a = (i / arr.length) * Math.PI * 2 - Math.PI / 2;
              const rOuter = 80;
              const xEnd = 120 + Math.cos(a) * rOuter;
              const yEnd = 120 + Math.sin(a) * rOuter;
              const xPt = 120 + Math.cos(a) * rOuter * Math.max(0, pair.weight);
              const yPt = 120 + Math.sin(a) * rOuter * Math.max(0, pair.weight);
              return (
                <g key={`${pair.positivePole}-${pair.negativePole}`}>
                  <line x1={120} y1={120} x2={xEnd} y2={yEnd} stroke="var(--rule)" strokeWidth={0.5} />
                  <circle cx={xPt} cy={yPt} r={3} fill="var(--ink)" />
                  <text
                    x={120 + Math.cos(a) * (rOuter + 10)}
                    y={120 + Math.sin(a) * (rOuter + 10)}
                    textAnchor={Math.cos(a) > 0.2 ? "start" : Math.cos(a) < -0.2 ? "end" : "middle"}
                    dominantBaseline="middle"
                    style={{ font: "9px var(--f-ui)" }}
                  >
                    {pair.positivePole}
                  </text>
                </g>
              );
            })}
          </svg>
        </Cell>
        <Cell label="Sorted by weight">
          <ol style={{ margin: 0, paddingLeft: "1.6rem", fontSize: "0.82rem" }}>
            {[...p.core.traitSpectrum]
              .sort((a, b) => b.weight - a.weight)
              .map((pair) => (
                <li key={`${pair.positivePole}-${pair.negativePole}`}>
                  <span style={{ fontWeight: 500 }}>{pair.positivePole}</span>
                  <span className="muted"> / {pair.negativePole}</span>
                  <span className="mono small muted"> · {pair.weight.toFixed(2)}</span>
                </li>
              ))}
          </ol>
        </Cell>
        <Cell label="Pole table">
          <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.15rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>+</th>
                <th style={{ textAlign: "left", padding: "0.15rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>−</th>
                <th style={{ textAlign: "right", padding: "0.15rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>w</th>
              </tr>
            </thead>
            <tbody>
              {p.core.traitSpectrum.map((pair) => (
                <tr key={`${pair.positivePole}-${pair.negativePole}`}>
                  <td style={{ padding: "0.15rem 0.3rem", color: "var(--good)" }}>{pair.positivePole}</td>
                  <td style={{ padding: "0.15rem 0.3rem", color: "var(--bad)", textDecoration: "line-through" }}>{pair.negativePole}</td>
                  <td className="mono small" style={{ padding: "0.15rem 0.3rem", textAlign: "right" }}>{pair.weight.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
      </Row>

      {/* ────────── AUDIENCE SEGMENTS ────────── */}

      <Row
        kicker="audience"
        title="Audience segments"
        path="/profile/audience/primarySegments[]"
        desc="Array of {name, description, knowledgeLevel, needs[], markets[]}."
      >
        <Cell label="Table (default)">
          <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Segment", "Know.", "Needs"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "0.15rem 0.35rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.audience.primarySegments.map((s) => (
                <tr key={s.name}>
                  <td style={{ padding: "0.25rem 0.35rem", borderBottom: "1px solid var(--rule-soft)" }}>{s.name}</td>
                  <td style={{ padding: "0.25rem 0.35rem", borderBottom: "1px solid var(--rule-soft)" }}>{s.knowledgeLevel}</td>
                  <td style={{ padding: "0.25rem 0.35rem", borderBottom: "1px solid var(--rule-soft)", color: "var(--ink-soft)" }}>
                    {s.needsPriority[0]?.label ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Persona cards">
          <div style={{ display: "grid", gap: "0.45rem" }}>
            {p.audience.primarySegments.slice(0, 3).map((s) => (
              <div
                key={s.name}
                style={{
                  border: "1px solid var(--rule)",
                  borderRadius: 4,
                  padding: "0.5rem 0.65rem",
                  display: "grid",
                  gridTemplateColumns: "34px 1fr",
                  gap: "0.55rem",
                  alignItems: "start",
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: "var(--surface)",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    fontWeight: 500,
                  }}
                >
                  {s.name.slice(0, 1)}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: "0.85rem" }}>{s.name}</div>
                  <div className="small muted">
                    [{s.knowledgeLevel}] · {s.markets?.join(", ") ?? "—"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Bubble matrix" hint="Y: knowledge level (mixed/practitioner/…). X: marks per segment.">
          <svg viewBox="0 0 300 180" style={{ width: "100%", height: "auto" }}>
            <line x1="30" y1="150" x2="290" y2="150" className="axis" />
            <line x1="30" y1="20" x2="30" y2="150" className="axis" />
            {["general", "aware", "mixed", "practitioner", "expert"].map((lvl, i) => (
              <text key={lvl} x="28" y={150 - i * 30} textAnchor="end" className="axis-label">
                {lvl}
              </text>
            ))}
            {p.audience.primarySegments.map((s, i) => {
              const lvlIdx = ["general", "aware", "mixed", "practitioner", "expert"].indexOf(s.knowledgeLevel ?? "mixed");
              const cx = 60 + i * 60;
              const cy = 150 - (lvlIdx < 0 ? 60 : lvlIdx * 30);
              const rad = 10 + s.needsPriority.length * 3;
              return (
                <g key={s.name}>
                  <circle cx={cx} cy={cy} r={rad} fill="#1a1a1d" fillOpacity={0.15} stroke="#1a1a1d" />
                  <text x={cx} y={cy + rad + 10} textAnchor="middle" className="axis-label">
                    {s.name.split(" ").slice(0, 2).join(" ")}
                  </text>
                </g>
              );
            })}
          </svg>
        </Cell>
        <Cell label="Horizontal stack">
          <div style={{ display: "flex", height: 36, borderRadius: 4, overflow: "hidden", border: "1px solid var(--rule)" }}>
            {p.audience.primarySegments.map((s, i) => (
              <div
                key={s.name}
                style={{
                  flex: s.needsPriority.length || 1,
                  background: `hsl(${220 + i * 30}, 10%, ${80 - i * 6}%)`,
                  color: "#1a1a1d",
                  padding: "0.25rem 0.4rem",
                  fontSize: "0.7rem",
                  display: "grid",
                  alignContent: "center",
                }}
                title={s.name}
              >
                {s.name.split(" ").slice(0, 2).join(" ")}
              </div>
            ))}
          </div>
          <div className="small muted" style={{ marginTop: "0.35rem" }}>
            Width = needsPriority.length
          </div>
        </Cell>
      </Row>

      {/* ────────── USER NEEDS PER SEGMENT ────────── */}

      <Row
        kicker="audience"
        title="User needs per segment"
        path="/profile/audience/primarySegments[]/needsPriority[]"
        desc="Needs are now attached to each segment. Same visuals, but per persona."
      >
        <Cell label="Ordered lists per segment">
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {p.audience.primarySegments.map((s) => (
              <div key={s.name}>
                <div className="mono small muted">{s.name}</div>
                <ol style={{ margin: 0, paddingLeft: "1.4rem", fontSize: "0.82rem" }}>
                  {[...s.needsPriority]
                    .sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99))
                    .map((n) => (
                      <li key={n.label}>
                        <span className="mono small muted" style={{ marginRight: 6 }}>
                          [{n.type}]
                        </span>
                        {n.label}
                      </li>
                    ))}
                </ol>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Priority funnel per segment">
          <div style={{ display: "grid", gap: "0.6rem" }}>
            {p.audience.primarySegments.map((s) => {
              const sorted = [...s.needsPriority].sort((a, b) => (a.priority ?? 99) - (b.priority ?? 99));
              return (
                <div key={s.name}>
                  <div className="mono small muted" style={{ marginBottom: 4 }}>{s.name}</div>
                  {sorted.map((n, i) => {
                    const pct = 100 - (i / Math.max(1, sorted.length)) * 55;
                    return (
                      <div
                        key={n.label}
                        style={{
                          width: `${pct}%`,
                          margin: "0 auto 0.2rem",
                          padding: "0.25rem 0.45rem",
                          background: "var(--surface)",
                          border: "1px solid var(--rule)",
                          borderRadius: 3,
                          fontSize: "0.74rem",
                          textAlign: "center",
                        }}
                      >
                        <span className="mono small muted">{n.priority ?? "—"}</span> · {n.label.slice(0, 42)}
                        {n.label.length > 42 ? "…" : ""}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </Cell>
        <Cell label="Aggregated kanban (all segments)" hint="Rolled up across segments for an overview.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.4rem" }}>
            {(["intent", "task", "anxiety", "job_to_be_done"] as const).map((tp) => {
              const items = p.audience.primarySegments.flatMap((s) =>
                s.needsPriority.filter((n) => n.type === tp).map((n) => ({ ...n, segment: s.name })),
              );
              return (
                <div key={tp}>
                  <div className="mono small muted" style={{ marginBottom: "0.2rem" }}>
                    {tp}
                  </div>
                  <div style={{ display: "grid", gap: "0.2rem" }}>
                    {items.map((n) => (
                      <div
                        key={`${n.segment}-${n.label}`}
                        style={{
                          background: "var(--surface)",
                          border: "1px solid var(--rule)",
                          borderRadius: 3,
                          padding: "0.25rem 0.3rem",
                          fontSize: "0.7rem",
                        }}
                      >
                        {n.label}
                        <div className="small muted">{n.segment}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Cell>
      </Row>

      {/* ────────── RELATIONSHIP ────────── */}

      <Row
        kicker="relationship"
        title="Relationship position"
        path="/profile/relationship/{role,authorityLevel,register,humorDistance,addressForm}"
        desc="A handful of enums that together position the brand relative to the customer."
      >
        <Cell label="Key–value">
          <dl className="kv">
            <dt>role</dt>
            <dd>{p.relationship.role ?? "—"}</dd>
            <dt>authority</dt>
            <dd>{p.relationship.authorityLevel ?? "—"}</dd>
            <dt>register</dt>
            <dd>{p.relationship.register.defaultLevel ?? "—"}</dd>
            <dt>humor</dt>
            <dd>{p.relationship.humorDistance ?? "—"}</dd>
          </dl>
        </Cell>
        <Cell label="Register scale">
          <div className="small muted" style={{ marginBottom: 4 }}>
            register.defaultLevel
          </div>
          <EnumScale values={["formal", "neutral", "informal", "adaptive"]} current={p.relationship.register.defaultLevel} />
        </Cell>
        <Cell label="Authority scale">
          <div className="small muted" style={{ marginBottom: 4 }}>
            authorityLevel
          </div>
          <EnumScale values={["deferential", "balanced", "directive", "expert_led", "peer_led"]} current={p.relationship.authorityLevel} />
        </Cell>
        <Cell label="Humor scale">
          <div className="small muted" style={{ marginBottom: 4 }}>
            humorDistance
          </div>
          <EnumScale values={["absent", "subtle", "frequent", "restricted"]} current={p.relationship.humorDistance} />
        </Cell>
        <Cell label="Compass (2-D)" wide hint="register × authority. Axes map an enum to a numeric position.">
          <svg viewBox="0 0 320 220" style={{ width: "100%", height: "auto" }}>
            <rect x="20" y="20" width="280" height="180" fill="#fafafc" stroke="#e4e4e9" />
            <line x1="160" y1="20" x2="160" y2="200" stroke="#e4e4e9" strokeDasharray="2 3" />
            <line x1="20" y1="110" x2="300" y2="110" stroke="#e4e4e9" strokeDasharray="2 3" />
            <text x="20" y="15" className="axis-label">
              formal
            </text>
            <text x="300" y="15" textAnchor="end" className="axis-label">
              informal
            </text>
            <text x="20" y="213" className="axis-label">
              deferential
            </text>
            <text x="300" y="213" textAnchor="end" className="axis-label">
              directive
            </text>
            {(() => {
              const regIdx = ["formal", "neutral", "informal", "adaptive"].indexOf(p.relationship.register.defaultLevel ?? "neutral");
              const authIdx = ["deferential", "balanced", "directive", "expert_led", "peer_led"].indexOf(p.relationship.authorityLevel ?? "balanced");
              const x = 40 + (regIdx / 3) * 240;
              const y = 30 + (authIdx / 4) * 160;
              return (
                <g>
                  <circle cx={x} cy={y} r={8} fill="#1a1a1d" stroke="#fff" strokeWidth={3} />
                  <text x={x + 14} y={y + 4} style={{ font: "11px system-ui", fontWeight: 500 }}>
                    {doc.meta.brandName}
                  </text>
                </g>
              );
            })()}
          </svg>
        </Cell>
        <Cell label="Role as connector">
          <svg viewBox="0 0 320 90" style={{ width: "100%", height: "auto" }}>
            <rect x="10" y="30" width="80" height="36" rx="4" fill="#1a1a1d" />
            <text x="50" y="54" textAnchor="middle" style={{ font: "600 12px system-ui", fill: "#fff" }}>
              brand
            </text>
            <line x1="90" y1="48" x2="230" y2="48" stroke="#1a1a1d" strokeWidth={1.5} markerEnd="url(#arr)" />
            <defs>
              <marker id="arr" viewBox="0 0 8 8" refX="8" refY="4" markerWidth="8" markerHeight="8" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill="#1a1a1d" />
              </marker>
            </defs>
            <text x="160" y="42" textAnchor="middle" style={{ font: "600 12px system-ui" }}>
              {p.relationship.role ?? "—"}
            </text>
            <rect x="230" y="30" width="80" height="36" rx="4" fill="#fff" stroke="#1a1a1d" />
            <text x="270" y="54" textAnchor="middle" style={{ font: "600 12px system-ui" }}>
              customer
            </text>
          </svg>
        </Cell>
      </Row>

      {/* ────────── VOICE (rules framework) ────────── */}

      <Row
        kicker="voice"
        title="Voice (rules framework)"
        path="/profile/voice/{jargonPolicy,plainLanguage,claimsPolicy,personalityGuardrails}"
        desc="v0.4: Voice is now about *how* the brand writes — jargon default, reading level, guardrails. Traits moved to core.traitSpectrum."
      >
        <Cell label="Key-value">
          <dl className="kv">
            <dt>jargon default</dt>
            <dd>{p.voice.jargonPolicy?.default ?? "—"}</dd>
            <dt>reading level (FK)</dt>
            <dd>{p.voice.plainLanguage?.readingLevel ?? "—"}</dd>
            <dt>max sentence</dt>
            <dd>{p.voice.plainLanguage?.maxSentenceLength ?? "—"}</dd>
            <dt>claims</dt>
            <dd>{p.voice.claimsPolicy ?? "—"}</dd>
          </dl>
        </Cell>
        <Cell label="Reading-level gauge">
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "2.8rem", fontWeight: 500, fontFamily: "var(--f-serif)", lineHeight: 1 }}>
              {p.voice.plainLanguage?.readingLevel ?? "—"}
            </div>
            <div className="mono small muted">Flesch-Kincaid grade</div>
            <div className="small muted" style={{ marginTop: 8 }}>
              Target: {p.voice.plainLanguage?.readingLevel
                ? p.voice.plainLanguage.readingLevel < 9
                  ? "plain / consumer"
                  : p.voice.plainLanguage.readingLevel < 13
                    ? "professional"
                    : "expert"
                : "not specified"}
            </div>
          </div>
        </Cell>
        <Cell label="Guardrails checklist">
          <ul style={{ listStyle: "none", margin: 0, padding: 0, fontSize: "0.82rem" }}>
            {p.voice.personalityGuardrails.map((g) => (
              <li key={g} style={{ padding: "0.2rem 0", display: "grid", gridTemplateColumns: "1rem 1fr", gap: 8 }}>
                <span>✓</span>
                <span>{g}</span>
              </li>
            ))}
          </ul>
        </Cell>
        <Cell label="First-use definitions">
          {p.voice.jargonPolicy?.firstUseDefinitions &&
          Object.keys(p.voice.jargonPolicy.firstUseDefinitions).length > 0 ? (
            <dl className="kv">
              {Object.entries(p.voice.jargonPolicy.firstUseDefinitions).map(([term, def]) => (
                <div key={term} style={{ display: "contents" }}>
                  <dt className="mono">{term}</dt>
                  <dd>{def}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <div className="small muted">None set.</div>
          )}
        </Cell>
      </Row>

      {/* ────────── LEXICON ────────── */}

      <Row
        kicker="lexicon"
        title="Lexicon entries"
        path="/profile/lexicon/entries[]"
        desc="Array of {term, canonicalSpelling, kind, aliases, forbiddenVariants, casingRule, usage, …}."
      >
        <Cell label="Table (default)">
          <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Term", "Kind", "Forbidden"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "0.2rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.lexicon.entries.map((e) => (
                <tr key={e.term}>
                  <td className="mono" style={{ padding: "0.2rem 0.3rem" }}>
                    {e.canonicalSpelling ?? e.term}
                  </td>
                  <td style={{ padding: "0.2rem 0.3rem" }}>{e.kind}</td>
                  <td style={{ padding: "0.2rem 0.3rem", color: "var(--bad)", textDecoration: "line-through" }}>
                    {e.forbiddenVariants?.join(", ") ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Dictionary entry">
          {p.lexicon.entries.map((e) => (
            <div key={e.term} style={{ padding: "0.4rem 0", borderBottom: "1px solid var(--rule-soft)" }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                <span style={{ fontFamily: "var(--f-serif)", fontSize: "1.1rem", fontWeight: 600 }}>
                  {e.canonicalSpelling ?? e.term}
                </span>
                <span className="mono small muted">({e.kind})</span>
              </div>
              <div className="small" style={{ color: "var(--ink-soft)" }}>
                {e.definition}
              </div>
              {e.forbiddenVariants && (
                <div className="small" style={{ color: "var(--bad)" }}>
                  not:{" "}
                  {e.forbiddenVariants.map((v) => (
                    <span key={v} style={{ textDecoration: "line-through", marginRight: 6 }}>
                      {v}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Cell>
        <Cell label="Specimen (canonical form huge)">
          {p.lexicon.entries.map((e) => (
            <div key={e.term} style={{ padding: "0.5rem 0", borderBottom: "1px solid var(--rule-soft)" }}>
              <div style={{ fontFamily: "var(--f-serif)", fontSize: "2rem", fontWeight: 500, lineHeight: 1, letterSpacing: "-0.02em" }}>
                {e.canonicalSpelling ?? e.term}
              </div>
              <div className="small muted">
                {e.casingRule ?? e.usage ?? ""}
              </div>
            </div>
          ))}
        </Cell>
        <Cell label="Diff (right vs. wrong)">
          {p.lexicon.entries.map((e) => (
            <div key={e.term} style={{ padding: "0.3rem 0", borderBottom: "1px solid var(--rule-soft)" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 12px 1fr", gap: 6, alignItems: "baseline", fontSize: "0.85rem" }}>
                <span className="mono" style={{ color: "var(--good)", fontWeight: 600 }}>
                  {e.canonicalSpelling ?? e.term}
                </span>
                <span className="muted">≠</span>
                <span className="mono" style={{ color: "var(--bad)", textDecoration: "line-through" }}>
                  {e.forbiddenVariants?.[0] ?? "—"}
                </span>
              </div>
            </div>
          ))}
        </Cell>
        <Cell label="Grouped by kind">
          {(() => {
            const byKind = p.lexicon.entries.reduce<Record<string, typeof p.lexicon.entries>>((acc, e) => {
              (acc[e.kind] ??= []).push(e);
              return acc;
            }, {});
            return Object.entries(byKind).map(([k, list]) => (
              <div key={k} style={{ padding: "0.3rem 0" }}>
                <div className="mono small muted" style={{ marginBottom: 2 }}>
                  {k}
                </div>
                {list.map((e) => (
                  <span className="pill mono" key={e.term}>
                    {e.canonicalSpelling ?? e.term}
                  </span>
                ))}
              </div>
            ));
          })()}
        </Cell>
      </Row>

      {/* ────────── TONE MATRIX ────────── */}

      <Row
        kicker="toneMatrix"
        title="Tone scenarios"
        path="/profile/toneMatrix[]"
        desc="Array of {context, userState, toneShift, do[], dont[], channelBias[]}."
      >
        <Cell label="Table (default)" wide>
          <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Context", "State", "Shift", "Do/Don't"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "0.2rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500 }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {p.toneScenarios.map((t) => (
                <tr key={t.context}>
                  <td className="mono" style={{ padding: "0.2rem 0.3rem" }}>
                    {t.context}
                  </td>
                  <td style={{ padding: "0.2rem 0.3rem" }}>{t.userState}</td>
                  <td style={{ padding: "0.2rem 0.3rem" }}>{t.toneShift}</td>
                  <td className="mono small" style={{ padding: "0.2rem 0.3rem" }}>
                    <span style={{ color: "var(--good)" }}>+{t.do.length}</span>{" "}
                    <span style={{ color: "var(--bad)" }}>−{t.dont.length}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Context × channel heatmap" wide hint="Rows: context. Cols: channelBias. Cell tint = do vs. don't ratio.">
          {(() => {
            const allChannels = Array.from(
              new Set(p.toneScenarios.flatMap((t) => t.channelBias ?? []))
            );
            return (
              <table style={{ width: "100%", fontSize: "0.74rem", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ padding: "0.2rem" }}></th>
                    {allChannels.map((c) => (
                      <th key={c} className="mono small muted" style={{ padding: "0.2rem", textAlign: "center", fontWeight: 400 }}>
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {p.toneScenarios.map((t) => (
                    <tr key={t.context}>
                      <th className="mono small" style={{ textAlign: "left", padding: "0.2rem 0.35rem", fontWeight: 500 }}>
                        {t.context}
                      </th>
                      {allChannels.map((c) => {
                        const active = t.channelBias?.includes(c);
                        const strength = active ? Math.min(1, (t.do.length + t.dont.length) / 8) : 0;
                        return (
                          <td key={c} style={{ padding: 2 }}>
                            <div
                              style={{
                                height: 22,
                                borderRadius: 2,
                                background: active ? `rgba(26,26,29,${0.15 + strength * 0.7})` : "transparent",
                                border: active ? "none" : "1px dashed var(--rule)",
                                display: "grid",
                                placeItems: "center",
                                fontSize: "0.65rem",
                                color: active && strength > 0.5 ? "#fff" : "var(--ink-soft)",
                                fontFamily: "var(--f-mono)",
                              }}
                            >
                              {active ? `+${t.do.length}/−${t.dont.length}` : ""}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          })()}
        </Cell>
        <Cell label="Scenario cards" wide>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.5rem" }}>
            {p.toneScenarios.map((t) => (
              <div key={t.context} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: "0.5rem 0.6rem" }}>
                <div className="mono small" style={{ color: "var(--ink-soft)", marginBottom: 2 }}>
                  {t.context}
                </div>
                <div style={{ fontWeight: 500, fontSize: "0.88rem" }}>{t.userState}</div>
                <div className="small muted" style={{ marginBottom: 4 }}>
                  → {t.toneShift}
                </div>
                <div className="small" style={{ color: "var(--good)" }}>
                  + {t.do[0]}
                </div>
                <div className="small" style={{ color: "var(--bad)" }}>
                  − {t.dont[0]}
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Do/Don't bar-pair" wide hint="For each scenario: horizontal bars proportional to # of do vs. don't items.">
          <div>
            {p.toneScenarios.map((t) => (
              <div key={t.context} style={{ display: "grid", gridTemplateColumns: "6rem 1fr", gap: 8, padding: "0.25rem 0", alignItems: "center", fontSize: "0.78rem" }}>
                <div className="mono small">{t.context}</div>
                <div style={{ display: "flex", height: 16, borderRadius: 3, overflow: "hidden", border: "1px solid var(--rule)" }}>
                  <div style={{ flex: t.do.length, background: "#c8e4c1", display: "grid", placeItems: "center", fontSize: 10, color: "#1c4a16" }}>
                    +{t.do.length}
                  </div>
                  <div style={{ flex: t.dont.length, background: "#f2c5c5", display: "grid", placeItems: "center", fontSize: 10, color: "#7d1c1c" }}>
                    −{t.dont.length}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Cell>
      </Row>

      {/* ────────── MESSAGING ────────── */}

      <Row
        kicker="messaging"
        title="Message hierarchy"
        path="/profile/messaging/messageHierarchy[]"
        desc="Array of {label, priority, notes}. Ordered."
      >
        <Cell label="Ordered list">
          <ol style={{ margin: 0, paddingLeft: "1.6rem", fontSize: "0.88rem" }}>
            {[...p.messaging.messageHierarchy]
              .sort((a, b) => a.priority - b.priority)
              .map((m) => (
                <li key={m.label} style={{ margin: "0.2rem 0" }}>
                  {m.label}
                </li>
              ))}
          </ol>
        </Cell>
        <Cell label="Inverted pyramid" hint="Width ∝ priority (inverse).">
          {(() => {
            const sorted = [...p.messaging.messageHierarchy].sort((a, b) => a.priority - b.priority);
            return (
              <div>
                {sorted.map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      width: `${100 - (i * 55) / sorted.length}%`,
                      margin: "0 auto 0.3rem",
                      padding: "0.45rem 0.55rem",
                      background: "var(--surface)",
                      borderRadius: 3,
                      textAlign: "center",
                      fontSize: `${1 - i * 0.05}rem`,
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            );
          })()}
        </Cell>
        <Cell label="Proportional stack">
          {(() => {
            const sorted = [...p.messaging.messageHierarchy].sort((a, b) => a.priority - b.priority);
            return (
              <div style={{ display: "flex", flexDirection: "column", height: 180, borderRadius: 4, overflow: "hidden", border: "1px solid var(--rule)" }}>
                {sorted.map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      flex: sorted.length - i,
                      background: `rgba(26,26,29,${0.85 - i * 0.12})`,
                      color: "#fff",
                      padding: "0.3rem 0.5rem",
                      fontSize: "0.78rem",
                      display: "grid",
                      alignContent: "center",
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            );
          })()}
        </Cell>
        <Cell label="Type scale">
          {(() => {
            const sorted = [...p.messaging.messageHierarchy].sort((a, b) => a.priority - b.priority);
            const sizes = [2.2, 1.5, 1.2, 1, 0.9, 0.85];
            return (
              <div>
                {sorted.map((m, i) => (
                  <div
                    key={m.label}
                    style={{
                      fontFamily: "var(--f-serif)",
                      fontSize: `${sizes[i] ?? 0.85}rem`,
                      fontWeight: i === 0 ? 500 : 400,
                      lineHeight: 1.1,
                      letterSpacing: "-0.015em",
                      padding: "0.25rem 0",
                      borderBottom: "1px solid var(--rule-soft)",
                    }}
                  >
                    {m.label}
                  </div>
                ))}
              </div>
            );
          })()}
        </Cell>
      </Row>

      {/* ────────── COLOR SYSTEM ────────── */}
      {/* terminologyRules section removed in v0.4: entries migrated to
          lexicon, structureRules, or relationship.pronounPolicy. */}


      <Row
        kicker="visual"
        title="Color system"
        path="/profile/visual/colorSystem[]"
        desc="Array of {name, value, usage, note}. This is where data is most visual by nature."
      >
        <Cell label="Table rows">
          <table style={{ width: "100%", fontSize: "0.78rem", borderCollapse: "collapse" }}>
            <tbody>
              {p.visual.colorSystem.map((c) => (
                <tr key={c.name}>
                  <td style={{ padding: "0.15rem 0.3rem" }}>
                    <span style={{ display: "inline-block", width: 14, height: 14, borderRadius: 2, background: c.value, verticalAlign: "middle", marginRight: 6, border: "1px solid rgba(0,0,0,0.1)" }} />
                    {c.name}
                  </td>
                  <td className="mono small" style={{ padding: "0.15rem 0.3rem" }}>{c.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Proportional palette strip" hint="Equal stops. Could be weighted by usage.">
          <div style={{ display: "flex", height: 60, borderRadius: 4, overflow: "hidden" }}>
            {p.visual.colorSystem.map((c) => (
              <div key={c.name} title={`${c.name} — ${c.value}`} style={{ flex: 1, background: c.value ?? "#ccc", display: "grid", alignContent: "end", padding: "0.3rem 0.4rem" }}>
                <div className="mono" style={{ fontSize: "0.6rem", color: isLight(c.value) ? "#000" : "#fff" }}>
                  {c.value}
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Swatch cards">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0.4rem" }}>
            {p.visual.colorSystem.slice(0, 6).map((c) => (
              <div key={c.name} style={{ border: "1px solid var(--rule)", borderRadius: 4, overflow: "hidden" }}>
                <div style={{ background: c.value, height: 54 }} />
                <div style={{ padding: "0.3rem 0.4rem" }}>
                  <div style={{ fontSize: "0.8rem", fontWeight: 500 }}>{c.name}</div>
                  <div className="mono small muted">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Hue ring" wide hint="Colors sorted by hue, reveals palette harmony.">
          <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            {[...p.visual.colorSystem]
              .sort((a, b) => hueOf(a.value) - hueOf(b.value))
              .map((c) => (
                <div key={c.name} style={{ width: 40, height: 40, background: c.value, borderRadius: 2, position: "relative" }} title={`${c.name} ${c.value}`}>
                  <div style={{ position: "absolute", bottom: -16, left: 0, fontSize: 9, fontFamily: "var(--f-mono)", color: "var(--ink-faint)" }}>
                    {Math.round(hueOf(c.value))}°
                  </div>
                </div>
              ))}
          </div>
        </Cell>
        <Cell label="Contrast grid" wide hint="Every pair. Green = WCAG AA pass, red = fail.">
          <table style={{ borderCollapse: "collapse", fontSize: "0.7rem" }}>
            <tbody>
              {p.visual.colorSystem.slice(0, 5).map((bg) => (
                <tr key={`bg-${bg.name}`}>
                  {p.visual.colorSystem.slice(0, 5).map((fg) => {
                    const ratio = contrast(bg.value, fg.value);
                    const pass = ratio >= 4.5;
                    return (
                      <td key={`fg-${fg.name}`} style={{ background: bg.value ?? "#ccc", padding: "4px 6px", border: "1px solid #fff" }}>
                        <span style={{ color: fg.value ?? "#000", fontFamily: "var(--f-mono)" }}>Aa</span>
                        <span style={{ marginLeft: 4, fontSize: 8, color: pass ? "var(--good)" : "var(--bad)", fontWeight: 600 }}>
                          {ratio.toFixed(1)}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
      </Row>

      {/* ────────── TYPOGRAPHY ────────── */}

      <Row
        kicker="visual"
        title="Typography system"
        path="/profile/visual/typographySystem[]"
        desc="Array of {role, fontFamily, usage}. v0.4: single family string, no fallback array, no weight."
      >
        <Cell label="Table">
          <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
            <tbody>
              {p.visual.typographySystem.map((t) => (
                <tr key={t.role}>
                  <td style={{ padding: "0.2rem 0.3rem", fontWeight: 500 }}>{t.role}</td>
                  <td style={{ padding: "0.2rem 0.3rem" }}>{t.fontFamily}</td>
                  <td className="small muted" style={{ padding: "0.2rem 0.3rem" }}>{t.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Specimen per role">
          {p.visual.typographySystem.map((t) => {
            const size = t.role.toLowerCase().includes("headline") ? "1.8rem" : "1rem";
            return (
              <div key={t.role} style={{ padding: "0.35rem 0", borderBottom: "1px solid var(--rule-soft)" }}>
                <div className="mono small muted">
                  {t.role} · {t.fontFamily}
                </div>
                <div
                  style={{
                    fontFamily: `${t.fontFamily}, var(--f-ui)`,
                    fontSize: size,
                    lineHeight: 1.2,
                  }}
                >
                  {t.role.toLowerCase().includes("headline")
                    ? "Climate ambition becomes credible action."
                    : "The quick brown fox jumps over the lazy dog. 0123456789"}
                </div>
              </div>
            );
          })}
        </Cell>
        <Cell label="Role-name specimen" hint="Font name rendered in its own family.">
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {p.visual.typographySystem.map((t) => (
              <div key={t.role}>
                <div
                  style={{
                    fontFamily: `${t.fontFamily}, var(--f-ui)`,
                    fontSize: "1.4rem",
                    lineHeight: 1.1,
                  }}
                >
                  {t.fontFamily}
                </div>
                <div className="small muted">
                  {t.role} · {t.usage}
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Pairing demo">
          {(() => {
            const headline = p.visual.typographySystem.find((t) => t.role.toLowerCase().includes("head"));
            const body = p.visual.typographySystem.find((t) => t.role.toLowerCase().includes("body"));
            return (
              <div>
                <div
                  style={{
                    fontFamily: `${headline?.fontFamily ?? "inherit"}, var(--f-serif)`,
                    fontSize: "1.4rem",
                    fontWeight: 500,
                    lineHeight: 1.1,
                    marginBottom: 8,
                  }}
                >
                  {p.core.brandSummary?.slice(0, 60)}…
                </div>
                <div
                  style={{
                    fontFamily: `${body?.fontFamily ?? "inherit"}, var(--f-ui)`,
                    fontSize: "0.88rem",
                    lineHeight: 1.5,
                    color: "var(--ink-soft)",
                  }}
                >
                  Aliquam et turpis finibus, iaculis erat id, bibendum ligula. Sapien ut nibh vestibulum ornare.
                </div>
              </div>
            );
          })()}
        </Cell>
      </Row>

      {/* ────────── EXAMPLES: DO/DON'T ────────── */}

      <Row
        kicker="examples"
        title="Do / don't pairs"
        path="/profile/examples/doDontPairs[]"
        desc="Array of {do, dont, rationale}. The most teachable artefact in the whole schema."
      >
        <Cell label="Table">
          <table style={{ width: "100%", fontSize: "0.8rem", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.2rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500, color: "var(--good)" }}>
                  Do
                </th>
                <th style={{ textAlign: "left", padding: "0.2rem 0.3rem", borderBottom: "1px solid var(--rule)", fontWeight: 500, color: "var(--bad)" }}>
                  Don&apos;t
                </th>
              </tr>
            </thead>
            <tbody>
              {p.illustrations.doDontPairs.map((d, i) => (
                <tr key={i}>
                  <td style={{ padding: "0.25rem 0.3rem", verticalAlign: "top" }}>{d.do}</td>
                  <td style={{ padding: "0.25rem 0.3rem", color: "var(--ink-soft)", verticalAlign: "top" }}>{d.dont}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Cell>
        <Cell label="Split cards" wide>
          <div style={{ display: "grid", gap: "0.45rem" }}>
            {p.illustrations.doDontPairs.slice(0, 4).map((d, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, borderRadius: 4, overflow: "hidden", fontSize: "0.82rem" }}>
                <div style={{ background: "#f0f7ef", padding: "0.5rem 0.65rem" }}>
                  <div className="small" style={{ color: "var(--good)", fontWeight: 600, marginBottom: 2 }}>
                    ✓ DO
                  </div>
                  {d.do}
                </div>
                <div style={{ background: "#fff5f5", padding: "0.5rem 0.65rem" }}>
                  <div className="small" style={{ color: "var(--bad)", fontWeight: 600, marginBottom: 2 }}>
                    ✗ DON&apos;T
                  </div>
                  {d.dont}
                </div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Chat bubbles" wide>
          <div style={{ display: "grid", gap: "0.55rem" }}>
            {p.illustrations.doDontPairs.slice(0, 3).map((d, i) => (
              <div key={i}>
                <div
                  style={{
                    alignSelf: "start",
                    background: "#e9f3e6",
                    border: "1px solid #c5e3c0",
                    borderRadius: "10px 10px 10px 2px",
                    padding: "0.4rem 0.6rem",
                    marginBottom: 3,
                    maxWidth: "85%",
                    fontSize: "0.82rem",
                  }}
                >
                  {d.do}
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    background: "#fbe9e9",
                    border: "1px solid #f2c5c5",
                    borderRadius: "10px 10px 2px 10px",
                    padding: "0.4rem 0.6rem",
                    maxWidth: "85%",
                    marginLeft: "auto",
                    fontSize: "0.82rem",
                    textDecoration: "line-through",
                    color: "#7d1c1c",
                  }}
                >
                  {d.dont}
                </div>
              </div>
            ))}
          </div>
        </Cell>
      </Row>

      {/* ────────── EVIDENCE ────────── */}

      <Row
        kicker="evidence"
        title="Evidence sources"
        path="/evidence[]"
        desc="Array of {id, kind, title, officiality, publisher, …}. Citations for the rest of the doc."
      >
        <Cell label="Numbered list">
          <ol style={{ margin: 0, paddingLeft: "1.6rem", fontSize: "0.82rem" }}>
            {doc.evidence.map((e) => (
              <li key={e.id}>
                <span className="mono small muted">[{e.id}]</span> {e.title}{" "}
                <span className="small muted">({e.kind}, {e.officiality})</span>
              </li>
            ))}
          </ol>
        </Cell>
        <Cell label="Source cards">
          <div style={{ display: "grid", gap: "0.4rem" }}>
            {doc.evidence.map((e) => (
              <div key={e.id} style={{ border: "1px solid var(--rule)", borderRadius: 4, padding: "0.4rem 0.55rem", fontSize: "0.82rem" }}>
                <div className="mono small" style={{ color: "var(--ink-soft)" }}>
                  {e.id} · {e.kind} · {e.officiality}
                </div>
                <div style={{ fontWeight: 500 }}>{e.title}</div>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Officiality split">
          {["official", "semi_official", "third_party"].map((off) => {
            const list = doc.evidence.filter((e) => e.officiality === off);
            if (list.length === 0) return null;
            return (
              <div key={off} style={{ marginBottom: 8 }}>
                <div className="mono small muted">{off} ({list.length})</div>
                {list.map((e) => (
                  <div key={e.id} style={{ fontSize: "0.8rem" }}>
                    <span className="mono small muted">[{e.id}]</span> {e.title}
                  </div>
                ))}
              </div>
            );
          })}
        </Cell>
        <Cell label="Citation graph" wide hint="Which sections cite which source (bipartite)?">
          {(() => {
            const sources = doc.evidence.map((e) => e.id);
            const paths = Object.keys(doc.annotations);
            const rowH = 18;
            const height = Math.max(sources.length, paths.length) * rowH + 20;
            return (
              <svg viewBox={`0 0 400 ${height}`} style={{ width: "100%", height: "auto" }}>
                {sources.map((id, i) => (
                  <g key={id}>
                    <circle cx="60" cy={20 + i * rowH} r="5" fill="#1a1a1d" />
                    <text x="50" y={24 + i * rowH} textAnchor="end" className="axis-label">
                      {id}
                    </text>
                  </g>
                ))}
                {paths.map((path, j) => {
                  const ann = doc.annotations[path];
                  return (
                    <g key={path}>
                      <circle cx="340" cy={20 + j * rowH} r="4" fill="none" stroke="#1a1a1d" />
                      <text x="350" y={24 + j * rowH} className="axis-label">
                        {path.replace("/profile/", "…/")}
                      </text>
                      {ann?.sources.map((s) => {
                        const i = sources.indexOf(s.evidenceId);
                        if (i < 0) return null;
                        return (
                          <line
                            key={`${path}-${s.evidenceId}`}
                            x1={60}
                            y1={20 + i * rowH}
                            x2={340}
                            y2={20 + j * rowH}
                            stroke="#1a1a1d"
                            strokeOpacity={0.2}
                          />
                        );
                      })}
                    </g>
                  );
                })}
              </svg>
            );
          })()}
        </Cell>
      </Row>

      {/* ────────── ANNOTATIONS ────────── */}

      <Row
        kicker="annotations"
        title="Annotations"
        path="/annotations (keyed by JSON Pointer path)"
        desc="Per-field metadata: status, confidence, basis, sources. Not content — metadata about content."
      >
        <Cell label="Flat path list">
          <div style={{ display: "grid", gap: 2, fontSize: "0.78rem" }}>
            {Object.entries(doc.annotations).map(([path, ann]) => (
              <div key={path} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 6, alignItems: "baseline" }}>
                <span className="mono" style={{ color: "var(--ink-soft)" }}>
                  {path}
                </span>
                <span className="pill small">{ann.status}</span>
                <span className="mono small">{Math.round(ann.confidence.score * 100)}%</span>
              </div>
            ))}
          </div>
        </Cell>
        <Cell label="Confidence histogram">
          <svg viewBox="0 0 280 120" style={{ width: "100%", height: "auto" }}>
            {Object.entries(doc.annotations).map(([path, ann], i) => (
              <g key={path}>
                <rect
                  x={10 + i * 24}
                  y={100 - ann.confidence.score * 80}
                  width={18}
                  height={ann.confidence.score * 80}
                  fill={
                    ann.confidence.label === "high" ? "#4d7c5a" : ann.confidence.label === "medium" ? "#c89b2e" : "#b03030"
                  }
                />
                <text x={19 + i * 24} y={113} textAnchor="middle" className="axis-label">
                  {path.replace("/profile/", "").slice(0, 6)}
                </text>
                <text x={19 + i * 24} y={96 - ann.confidence.score * 80} textAnchor="middle" style={{ font: "9px var(--f-mono)", fill: "#1a1a1d" }}>
                  {Math.round(ann.confidence.score * 100)}
                </text>
              </g>
            ))}
          </svg>
        </Cell>
        <Cell label="Status donut">
          {(() => {
            const counts: Record<string, number> = {};
            Object.values(doc.annotations).forEach((a) => {
              counts[a.status] = (counts[a.status] ?? 0) + 1;
            });
            const total = Object.values(counts).reduce((s, n) => s + n, 0);
            let cursor = 0;
            const R = 40;
            const C = 2 * Math.PI * R;
            const palette: Record<string, string> = {
              approved: "#4d7c5a",
              mixed: "#c89b2e",
              needs_review: "#b75d00",
              draft: "#6a6a73",
              published: "#2a5bd7",
            };
            return (
              <svg viewBox="0 0 120 140" style={{ width: 160, height: 180 }}>
                <circle cx="60" cy="60" r={R} fill="none" stroke="#eeeef3" strokeWidth="16" />
                {Object.entries(counts).map(([status, n]) => {
                  const len = (n / total) * C;
                  const el = (
                    <circle
                      key={status}
                      cx="60"
                      cy="60"
                      r={R}
                      fill="none"
                      stroke={palette[status] ?? "#999"}
                      strokeWidth="16"
                      strokeDasharray={`${len} ${C}`}
                      strokeDashoffset={-cursor}
                      transform="rotate(-90 60 60)"
                    />
                  );
                  cursor += len;
                  return el;
                })}
                {Object.entries(counts).map(([status, n], i) => (
                  <g key={`l-${status}`} transform={`translate(6 ${115 + i * 0})`}>
                    <rect x={i * 40} y="0" width="8" height="8" fill={palette[status] ?? "#999"} />
                    <text x={i * 40 + 12} y="8" className="axis-label">
                      {status} {n}
                    </text>
                  </g>
                ))}
              </svg>
            );
          })()}
        </Cell>
        <Cell label="Schema heatmap" wide hint="Section tree colored by confidence.">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 6 }}>
            {Object.entries(doc.annotations).map(([path, ann]) => (
              <div
                key={path}
                style={{
                  padding: "0.4rem 0.5rem",
                  background: `rgba(${ann.confidence.label === "high" ? "77,124,90" : ann.confidence.label === "medium" ? "200,155,46" : "176,48,48"}, ${0.15 + ann.confidence.score * 0.55})`,
                  borderRadius: 3,
                  fontSize: "0.78rem",
                }}
              >
                <div className="mono small">{path.replace("/profile/", "")}</div>
                <div style={{ fontWeight: 500 }}>
                  {ann.confidence.label} · {Math.round(ann.confidence.score * 100)}%
                </div>
                <div className="small muted">{ann.status}</div>
              </div>
            ))}
          </div>
        </Cell>
      </Row>

      {/* ────────── AUDIT ────────── */}

      <Row
        kicker="audit"
        title="Audit dashboard"
        path="/audit/{overallConfidence,completeness,openQuestions,warnings}"
        desc="Document-level state. The one place where scanbarkeit really matters: can we ship this record?"
      >
        <Cell label="Key–value">
          <dl className="kv">
            <dt>review</dt>
            <dd>{doc.audit.reviewStatus}</dd>
            <dt>confidence</dt>
            <dd>
              {doc.audit.overallConfidence.label} · {Math.round(doc.audit.overallConfidence.score * 100)}%
            </dd>
            <dt>completeness</dt>
            <dd>{Math.round(doc.audit.completeness * 100)}%</dd>
            <dt>open qs</dt>
            <dd>{doc.audit.openQuestions.length}</dd>
            <dt>warnings</dt>
            <dd>{doc.audit.warnings.length}</dd>
          </dl>
        </Cell>
        <Cell label="Two gauges">
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <div style={{ textAlign: "center" }}>
              <Gauge value={doc.audit.overallConfidence.score} />
              <div className="mono small muted">confidence</div>
            </div>
            <div style={{ textAlign: "center" }}>
              <Gauge value={doc.audit.completeness} />
              <div className="mono small muted">completeness</div>
            </div>
          </div>
        </Cell>
        <Cell label="Progress bars">
          <div style={{ display: "grid", gap: 10 }}>
            <div>
              <div className="small" style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span>confidence</span>
                <span className="mono">{Math.round(doc.audit.overallConfidence.score * 100)}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${doc.audit.overallConfidence.score * 100}%` }} />
              </div>
            </div>
            <div>
              <div className="small" style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span>completeness</span>
                <span className="mono">{Math.round(doc.audit.completeness * 100)}%</span>
              </div>
              <div className="bar-track">
                <div className="bar-fill" style={{ width: `${doc.audit.completeness * 100}%` }} />
              </div>
            </div>
          </div>
        </Cell>
        <Cell label="Issue stack" wide hint="Open questions + warnings + missing paths as a queue.">
          <div style={{ display: "grid", gap: "0.4rem", fontSize: "0.82rem" }}>
            {doc.audit.warnings.map((w) => (
              <div key={w} style={{ padding: "0.35rem 0.55rem", background: "#fbe9e9", borderLeft: "2px solid var(--bad)" }}>
                <span className="mono small" style={{ color: "var(--bad)" }}>
                  warning
                </span>{" "}
                {w}
              </div>
            ))}
            {doc.audit.openQuestions.slice(0, 5).map((q) => (
              <div key={q} style={{ padding: "0.35rem 0.55rem", background: "#fff7e6", borderLeft: "2px solid var(--warn)" }}>
                <span className="mono small" style={{ color: "var(--warn)" }}>
                  open
                </span>{" "}
                {q}
              </div>
            ))}
            {deriveMissingFieldPaths(doc).slice(0, 5).map((pth) => (
              <div key={pth} style={{ padding: "0.35rem 0.55rem", background: "var(--surface)", borderLeft: "2px solid var(--ink-faint)" }}>
                <span className="mono small muted">missing</span>{" "}
                <span className="mono">{pth}</span>
              </div>
            ))}
          </div>
        </Cell>
      </Row>

        <footer style={{ margin: "3rem 0 0", paddingTop: "1rem", borderTop: "1px solid var(--rule)", fontSize: "0.78rem", color: "var(--ink-faint)" }}>
          Quick-and-dirty exploration of visual alternatives per Brand ID field. Pick visuals per row,
          then we design a real variant around them.
        </footer>
      </div>
    </>
  );
}

/* ─────────────────────────────────────── tiny utilities ─────── */

function isLight(hex: string | undefined): boolean {
  if (!hex) return true;
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq > 160;
}

function hueOf(hex: string | undefined): number {
  if (!hex) return 0;
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let hue = 0;
  if (d === 0) hue = 0;
  else if (max === r) hue = ((g - b) / d) % 6;
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  hue = hue * 60;
  if (hue < 0) hue += 360;
  return hue;
}

function luminance(hex: string | undefined): number {
  if (!hex) return 1;
  const h = hex.replace("#", "");
  const rgb = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = rgb.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * (lin[0] ?? 0) + 0.7152 * (lin[1] ?? 0) + 0.0722 * (lin[2] ?? 0);
}

function contrast(a: string | undefined, b: string | undefined): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
