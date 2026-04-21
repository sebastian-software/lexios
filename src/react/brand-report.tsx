import type { ComponentType, ReactNode } from "react";

import {
  BrandIdDraftSchema,
  type BrandAudit,
  type BrandChannel,
  type BrandFieldPath,
  type BrandIdDraft,
  type BrandProfileSectionKey,
  type CoreProfile,
  type EvidenceItem,
} from "../brand-id.schema.js";
import { deriveMissingFieldPaths } from "../brand-id.audit.js";

export type BrandReportRenderableSectionKey = BrandProfileSectionKey | "evidence" | "audit";

export type BrandReportModelSection = {
  key: BrandReportRenderableSectionKey;
  title: string;
  eyebrow: string;
  summary?: string | undefined;
};

export type BrandReportModel = {
  document: BrandIdDraft;
  title: string;
  subtitle: string;
  status: string;
  updatedAt: string;
  sections: BrandReportModelSection[];
};

export type BrandReportSectionProps = {
  document: BrandIdDraft;
  model: BrandReportModel;
  section: BrandReportModelSection;
};

export type BrandReportProps = {
  document: BrandIdDraft;
  className?: string;
  sectionOrder?: BrandProfileSectionKey[];
  showEvidence?: boolean;
  showAudit?: boolean;
  renderSection?: Partial<Record<string, ComponentType<BrandReportSectionProps>>>;
};

export const DEFAULT_SECTION_ORDER: BrandProfileSectionKey[] = [
  "core",
  "audience",
  "relationship",
  "voice",
  "lexicon",
  "toneScenarios",
  "messaging",
  "visual",
  "governance",
  "illustrations",
];

export const SECTION_META: Record<BrandReportRenderableSectionKey, { title: string; eyebrow: string }> = {
  core: { title: "Brand Core", eyebrow: "Identity" },
  audience: { title: "Audience Model", eyebrow: "People" },
  relationship: { title: "Relationship", eyebrow: "Stance" },
  voice: { title: "Voice", eyebrow: "Expression" },
  lexicon: { title: "Lexicon", eyebrow: "Language" },
  toneScenarios: { title: "Tone Scenarios", eyebrow: "Situations" },
  messaging: { title: "Messaging System", eyebrow: "Structure" },
  visual: { title: "Visual System", eyebrow: "Look" },
  governance: { title: "Governance", eyebrow: "Control" },
  illustrations: { title: "Illustrations", eyebrow: "Proof" },
  evidence: { title: "Evidence", eyebrow: "Sources" },
  audit: { title: "Audit", eyebrow: "Confidence" },
};

function cx(...parts: Array<string | undefined>): string | undefined {
  const value = parts.filter(Boolean).join(" ");
  return value.length > 0 ? value : undefined;
}

function formatValue(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "Not specified";
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  return String(value);
}

function formatPercent(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function sentenceList(items: string[]): string | undefined {
  if (items.length === 0) {
    return undefined;
  }

  return items.join(", ");
}

function annotationFor(document: BrandIdDraft, path: BrandFieldPath) {
  return document.annotations[path];
}

function sectionSummary(document: BrandIdDraft, key: BrandReportRenderableSectionKey): string | undefined {
  switch (key) {
    case "core":
      return document.profile.core.brandSummary ?? undefined;
    case "audience":
      return sentenceList(document.profile.audience.primarySegments.map((segment) => segment.name));
    case "relationship":
      return document.profile.relationship.stance ?? undefined;
    case "voice":
      return document.profile.voice.claimsPolicy ?? undefined;
    case "messaging":
      return document.profile.messaging.messageHierarchy[0]?.label;
    case "visual":
      return sentenceList(document.profile.visual.colorSystem.slice(0, 4).map((color) => color.name));
    case "governance":
      return sentenceList(document.profile.governance.sourceOfTruth);
    case "evidence":
      return `${document.evidence.length} source${document.evidence.length === 1 ? "" : "s"}`;
    case "audit":
      return `${document.audit.overallConfidence.label} confidence, ${formatPercent(document.audit.completeness)} completeness`;
    default:
      return undefined;
  }
}

export function createBrandReportModel(document: BrandIdDraft): BrandReportModel {
  const parsed = BrandIdDraftSchema.parse(document);
  const sections = DEFAULT_SECTION_ORDER.map((key) => ({
    key,
    ...SECTION_META[key],
    summary: sectionSummary(parsed, key),
  }));

  return {
    document: parsed,
    title: parsed.meta.brandName,
    subtitle: parsed.profile.core.brandSummary ?? "Structured brand identity report",
    status: parsed.meta.status,
    updatedAt: parsed.meta.updatedAt,
    sections,
  };
}

function FieldList({ items, className }: { items: Array<[string, ReactNode]>; className?: string }) {
  const filtered = items.filter(([, value]) => {
    if (Array.isArray(value)) {
      return value.length > 0;
    }

    return value !== null && value !== undefined && value !== "";
  });

  if (filtered.length === 0) {
    return null;
  }

  return (
    <dl className={cx("lx-brand-report__field-list", className)}>
      {filtered.map(([label, value]) => (
        <div className="lx-brand-report__field" key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function TextList({
  items,
  ordered = false,
  className,
}: {
  items?: string[] | null | undefined;
  ordered?: boolean;
  className?: string;
}) {
  if (!items || items.length === 0) {
    return null;
  }

  const Tag = ordered ? "ol" : "ul";

  return (
    <Tag className={cx("lx-brand-report__list", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </Tag>
  );
}

function TagList({ items, className }: { items?: string[] | null | undefined; className?: string }) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <ul className={cx("lx-brand-report__tag-list", className)} aria-label="Tags">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function SectionAnnotation({
  document,
  path,
}: {
  document: BrandIdDraft;
  path: BrandFieldPath;
}) {
  const annotation = annotationFor(document, path);

  if (!annotation) {
    return null;
  }

  return (
    <aside className="lx-brand-report__annotation" aria-label="Section confidence">
      <FieldList
        items={[
          ["Status", annotation.status],
          ["Confidence", `${annotation.confidence.label} (${formatPercent(annotation.confidence.score)})`],
          ["Basis", annotation.basis],
          ["Sources", annotation.sources.map((source) => source.evidenceId).join(", ")],
          ["Notes", annotation.notes],
        ]}
      />
    </aside>
  );
}

export function BrandReportSection({
  section,
  children,
  className,
}: {
  section: BrandReportModelSection;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cx("lx-brand-report__section", className)}
      data-lexios-section={section.key}
      aria-labelledby={`lx-brand-report-section-${section.key}`}
    >
      <header className="lx-brand-report__section-header">
        <p className="lx-brand-report__section-eyebrow">{section.eyebrow}</p>
        <h2 id={`lx-brand-report-section-${section.key}`}>{section.title}</h2>
        {section.summary ? <p className="lx-brand-report__section-summary">{section.summary}</p> : null}
      </header>
      <div className="lx-brand-report__section-body">{children}</div>
    </section>
  );
}

export function BrandReportHeader({ document, model }: { document: BrandIdDraft; model: BrandReportModel }) {
  const { meta, audit } = document;

  return (
    <header className="lx-brand-report__header">
      <p className="lx-brand-report__kicker">Lexios Brand ID</p>
      <h1>{model.title}</h1>
      <p className="lx-brand-report__dek">{model.subtitle}</p>
      <FieldList
        className="lx-brand-report__meta"
        items={[
          ["Schema", `${meta.schema.id}@${meta.schema.version}`],
          ["Status", meta.status],
          ["Updated", meta.updatedAt],
          ["Primary locale", meta.primaryLocale],
          ["Supported locales", meta.supportedLocales.join(", ")],
          ["Completeness", formatPercent(audit.completeness)],
          ["Confidence", audit.overallConfidence.label],
        ]}
      />
      <TagList items={meta.tags} />
    </header>
  );
}

export function CoreSection({ document, section }: BrandReportSectionProps) {
  const core: CoreProfile = document.profile.core;

  return (
    <BrandReportSection section={section}>
      <FieldList
        items={[
          ["Summary", core.brandSummary],
          ["Mission or promise", core.missionOrPromise],
          ["Self-image", core.brandSelfImage],
          ["Category context", core.categoryContext],
        ]}
      />
      {core.traitSpectrum.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Trait spectrum</caption>
          <thead>
            <tr>
              <th scope="col">Positive pole</th>
              <th scope="col">Negative pole</th>
              <th scope="col">Weight</th>
              <th scope="col">Note</th>
            </tr>
          </thead>
          <tbody>
            {core.traitSpectrum.map((pair) => (
              <tr key={`${pair.positivePole}-${pair.negativePole}`}>
                <th scope="row">{pair.positivePole}</th>
                <td>{pair.negativePole}</td>
                <td>{pair.weight.toFixed(2)}</td>
                <td>{pair.note ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <SectionAnnotation document={document} path="/profile/core" />
    </BrandReportSection>
  );
}

export function AudienceSection({ document, section }: BrandReportSectionProps) {
  const audience = document.profile.audience;
  const segments = [...audience.primarySegments, ...audience.secondarySegments];

  return (
    <BrandReportSection section={section}>
      <FieldList
        items={[
          ["Domain assumptions", audience.literacyOrDomainAssumptions],
          ["Global notes", audience.globalAudienceNotes],
        ]}
      />
      {segments.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Audience segments</caption>
          <thead>
            <tr>
              <th scope="col">Segment</th>
              <th scope="col">Knowledge</th>
              <th scope="col">Markets</th>
              <th scope="col">Needs</th>
            </tr>
          </thead>
          <tbody>
            {segments.map((segment) => (
              <tr key={segment.name}>
                <th scope="row">
                  {segment.name}
                  {segment.description ? <span>{segment.description}</span> : null}
                </th>
                <td>{formatValue(segment.knowledgeLevel)}</td>
                <td>{segment.markets?.join(", ") ?? "Not specified"}</td>
                <td>
                  {segment.needsPriority.length > 0 ? (
                    <ol className="lx-brand-report__priority-list" aria-label={`${segment.name} needs`}>
                      {segment.needsPriority
                        .slice()
                        .sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999))
                        .map((need) => (
                          <li key={need.label}>
                            <span>{need.label}</span>
                            <small>{need.type}</small>
                          </li>
                        ))}
                    </ol>
                  ) : (
                    "Not specified"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <SectionAnnotation document={document} path="/profile/audience" />
    </BrandReportSection>
  );
}

export function RelationshipSection({ document, section }: BrandReportSectionProps) {
  const relationship = document.profile.relationship;

  return (
    <BrandReportSection section={section}>
      <FieldList
        items={[
          ["Role", relationship.role],
          ["Stance", relationship.stance],
          ["Authority level", relationship.authorityLevel],
          ["Customer view", relationship.customerView],
          ["Pronoun policy", relationship.pronounPolicy],
          ["Humor distance", relationship.humorDistance],
          ["Address form", relationship.addressForm.linguisticForm],
          ["Address notes", relationship.addressForm.notes],
          ["Register", relationship.register.defaultLevel],
          ["Register adaptation", relationship.register.adaptationPolicy],
        ]}
      />
      <SectionAnnotation document={document} path="/profile/relationship" />
    </BrandReportSection>
  );
}

export function VoiceSection({ document, section }: BrandReportSectionProps) {
  const voice = document.profile.voice;

  const firstUseEntries = voice.jargonPolicy?.firstUseDefinitions
    ? Object.entries(voice.jargonPolicy.firstUseDefinitions)
    : [];

  return (
    <BrandReportSection section={section}>
      <FieldList
        items={[
          ["Jargon default", voice.jargonPolicy?.default],
          ["Jargon notes", voice.jargonPolicy?.notes],
          ["Reading level (FK grade)", voice.plainLanguage?.readingLevel],
          ["Max sentence length", voice.plainLanguage?.maxSentenceLength],
          ["Plain-language notes", voice.plainLanguage?.notes],
          ["Claims policy", voice.claimsPolicy],
        ]}
      />
      {firstUseEntries.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>First-use definitions</caption>
          <thead>
            <tr>
              <th scope="col">Term</th>
              <th scope="col">First-use definition</th>
            </tr>
          </thead>
          <tbody>
            {firstUseEntries.map(([term, definition]) => (
              <tr key={term}>
                <th scope="row">{term}</th>
                <td>{definition}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <TextList items={voice.personalityGuardrails} />
      <SectionAnnotation document={document} path="/profile/voice" />
    </BrandReportSection>
  );
}

export function LexiconSection({ document, section }: BrandReportSectionProps) {
  const lexicon = document.profile.lexicon;

  return (
    <BrandReportSection section={section}>
      <TextList items={lexicon.generalRules} />
      {lexicon.entries.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Lexicon entries</caption>
          <thead>
            <tr>
              <th scope="col">Term</th>
              <th scope="col">Definition</th>
              <th scope="col">Contextual meaning</th>
              <th scope="col">Kind</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {lexicon.entries.map((entry) => (
              <tr key={entry.term}>
                <th scope="row">{entry.canonicalSpelling ?? entry.term}</th>
                <td>{entry.definition}</td>
                <td>{entry.contextualMeaning ?? ""}</td>
                <td>{entry.kind}</td>
                <td>{entry.usage ?? entry.casingRule ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <SectionAnnotation document={document} path="/profile/lexicon" />
    </BrandReportSection>
  );
}

export function ToneScenariosSection({ document, section }: BrandReportSectionProps) {
  const toneScenarios = document.profile.toneScenarios;

  return (
    <BrandReportSection section={section}>
      {toneScenarios.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Tone scenarios</caption>
          <thead>
            <tr>
              <th scope="col">Context</th>
              <th scope="col">User state</th>
              <th scope="col">Tone shift</th>
              <th scope="col">Do</th>
              <th scope="col">Do not</th>
            </tr>
          </thead>
          <tbody>
            {toneScenarios.map((row) => (
              <tr key={`${row.context}-${row.userState}`}>
                <th scope="row">
                  {row.context}
                  {row.channelBias ? <span>{row.channelBias.join(", ")}</span> : null}
                </th>
                <td>{row.userState}</td>
                <td>{row.toneShift}</td>
                <td>
                  <TextList items={row.do} />
                </td>
                <td>
                  <TextList items={row.dont} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </BrandReportSection>
  );
}

export function MessagingSection({ document, section }: BrandReportSectionProps) {
  const messaging = document.profile.messaging;

  return (
    <BrandReportSection section={section}>
      <TagList items={messaging.primaryObjectives} />
      <ol className="lx-brand-report__priority-list" aria-label="Message hierarchy">
        {messaging.messageHierarchy
          .slice()
          .sort((a, b) => a.priority - b.priority)
          .map((layer) => (
            <li key={layer.label}>
              <span>{layer.label}</span>
              {layer.notes ? <small>{layer.notes}</small> : null}
            </li>
          ))}
      </ol>
      <FieldList items={[["CTA style", messaging.ctaStyle]]} />
      <TextList items={messaging.structureRules} />
      <TextList items={messaging.evidenceAndClaimsRules} />
    </BrandReportSection>
  );
}

export function VisualSystemSection({ document, section }: BrandReportSectionProps) {
  const visual = document.profile.visual;

  return (
    <BrandReportSection section={section}>
      <TextList items={visual.logoRules} />
      {visual.logoAssets.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Logo assets</caption>
          <thead>
            <tr>
              <th scope="col">Type</th>
              <th scope="col">Path</th>
              <th scope="col">Format</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {visual.logoAssets.map((asset) => (
              <tr key={asset.path}>
                <th scope="row">{asset.type}</th>
                <td><code>{asset.path}</code></td>
                <td>{asset.format}</td>
                <td>{asset.usage ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {visual.colorSystem.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Color system</caption>
          <thead>
            <tr>
              <th scope="col">Color</th>
              <th scope="col">Value</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {visual.colorSystem.map((color) => (
              <tr key={color.name}>
                <th scope="row">{color.name}</th>
                <td>{color.value ?? "Not specified"}</td>
                <td>{color.usage ?? color.note ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {visual.typographySystem.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Typography system</caption>
          <thead>
            <tr>
              <th scope="col">Role</th>
              <th scope="col">Family</th>
              <th scope="col">Usage</th>
            </tr>
          </thead>
          <tbody>
            {visual.typographySystem.map((typeRule) => (
              <tr key={typeRule.role}>
                <th scope="row">{typeRule.role}</th>
                <td>{typeRule.fontFamily}</td>
                <td>{typeRule.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <TextList items={visual.imageryOrSymbolRules} />
      <TextList items={visual.accessibilityRules} />
      <TextList items={visual.coBrandingRules} />
    </BrandReportSection>
  );
}

export function GovernanceSection({ document, section }: BrandReportSectionProps) {
  const governance = document.profile.governance;

  return (
    <BrandReportSection section={section}>
      <TagList items={governance.appliesTo} />
      <FieldList
        items={[
          ["Source of truth", governance.sourceOfTruth.join(", ")],
          ["Review cycle", governance.reviewCycle],
          ["Exceptions policy", governance.exceptionsPolicy],
        ]}
      />
      <TextList items={governance.precedenceRules} />
      {governance.owners.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Owners</caption>
          <thead>
            <tr>
              <th scope="col">Team or role</th>
              <th scope="col">Contact</th>
              <th scope="col">Responsibilities</th>
            </tr>
          </thead>
          <tbody>
            {governance.owners.map((owner) => (
              <tr key={owner.teamOrRole}>
                <th scope="row">{owner.teamOrRole}</th>
                <td>{owner.contact ?? "Not specified"}</td>
                <td>{owner.responsibilities?.join(", ") ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <TextList items={governance.approvalRules} />
    </BrandReportSection>
  );
}

export function IllustrationsSection({ document, section }: BrandReportSectionProps) {
  const illustrations = document.profile.illustrations;

  return (
    <BrandReportSection section={section}>
      {illustrations.doDontPairs.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Do and do not pairs</caption>
          <thead>
            <tr>
              <th scope="col">Do</th>
              <th scope="col">Do not</th>
              <th scope="col">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {illustrations.doDontPairs.map((pair) => (
              <tr key={`${pair.do}-${pair.dont}`}>
                <td>{pair.do}</td>
                <td>{pair.dont}</td>
                <td>{pair.rationale ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {illustrations.channelExamples.length > 0 ? (
        <table className="lx-brand-report__table">
          <caption>Channel examples</caption>
          <thead>
            <tr>
              <th scope="col">Channel</th>
              <th scope="col">Example</th>
              <th scope="col">Rationale</th>
            </tr>
          </thead>
          <tbody>
            {illustrations.channelExamples.map((example) => (
              <tr key={`${example.channel}-${example.example}`}>
                <th scope="row">{example.channel}</th>
                <td>{example.example}</td>
                <td>{example.rationale ?? "Not specified"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <ol className="lx-brand-report__scenario-list" aria-label="Scenario examples">
        {illustrations.scenarioExamples.map((example) => (
          <li key={example.scenario}>
            <h3>{example.scenario}</h3>
            <p>{example.summary}</p>
            {example.example ? <blockquote>{example.example}</blockquote> : null}
            {example.rationale ? <small>{example.rationale}</small> : null}
          </li>
        ))}
      </ol>
    </BrandReportSection>
  );
}

export function EvidenceSection({ document, section }: BrandReportSectionProps) {
  return (
    <BrandReportSection section={section}>
      <ol className="lx-brand-report__source-list" aria-label="Evidence sources">
        {document.evidence.map((item: EvidenceItem) => (
          <li key={item.id}>
            <h3>{item.title}</h3>
            <FieldList
              items={[
                ["ID", item.id],
                ["Kind", item.kind],
                ["Officiality", item.officiality],
                ["Access", item.access],
                ["Publisher", item.publisher],
                ["Language", item.language],
                ["Captured", item.capturedAt],
                ["Verified", item.lastVerifiedAt],
                ["URL", item.url ? <a href={item.url}>{item.url}</a> : undefined],
                ["Summary", item.summary],
              ]}
            />
            <TagList items={item.tags} />
          </li>
        ))}
      </ol>
    </BrandReportSection>
  );
}

export function AuditSection({ document, section }: BrandReportSectionProps) {
  const audit: BrandAudit = document.audit;

  return (
    <BrandReportSection section={section}>
      <FieldList
        items={[
          ["Review status", audit.reviewStatus],
          ["Overall confidence", `${audit.overallConfidence.label} (${formatPercent(audit.overallConfidence.score)})`],
          ["Completeness", formatPercent(audit.completeness)],
          ["Generated", audit.generatedAt],
          ["Last human review", audit.lastHumanReviewAt],
        ]}
      />
      <TextList items={audit.openQuestions} />
      <TextList items={audit.assumptions} />
      <TextList items={audit.warnings} />
      {(() => {
        const missing = deriveMissingFieldPaths(document);
        return missing.length > 0 ? (
          <ul className="lx-brand-report__path-list" aria-label="Missing field paths">
            {missing.map((path) => (
              <li key={path}>
                <code>{path}</code>
              </li>
            ))}
          </ul>
        ) : null;
      })()}
      {audit.discovery ? (
        <details className="lx-brand-report__details">
          <summary>Discovery</summary>
          <FieldList
            items={[
              ["Website", audit.discovery.website?.seedUrl],
              ["Materials", audit.discovery.materials.map((material) => material.label).join(", ")],
              ["Unresolved questions", audit.discovery.unresolvedQuestions.join(", ")],
              ["Excluded materials", audit.discovery.excludedMaterials.join(", ")],
            ]}
          />
        </details>
      ) : null}
    </BrandReportSection>
  );
}

const SECTION_COMPONENTS: Record<BrandReportRenderableSectionKey, ComponentType<BrandReportSectionProps>> = {
  core: CoreSection,
  audience: AudienceSection,
  relationship: RelationshipSection,
  voice: VoiceSection,
  lexicon: LexiconSection,
  toneScenarios: ToneScenariosSection,
  messaging: MessagingSection,
  visual: VisualSystemSection,
  governance: GovernanceSection,
  illustrations: IllustrationsSection,
  evidence: EvidenceSection,
  audit: AuditSection,
};

export function BrandReport({
  document,
  className,
  sectionOrder = DEFAULT_SECTION_ORDER,
  showEvidence = true,
  showAudit = true,
  renderSection,
}: BrandReportProps) {
  const model = createBrandReportModel(document);
  const sectionKeys: BrandReportRenderableSectionKey[] = [...sectionOrder];

  if (showEvidence) {
    sectionKeys.push("evidence");
  }

  if (showAudit) {
    sectionKeys.push("audit");
  }

  const sections = sectionKeys.map((key) => ({
    key,
    ...SECTION_META[key],
    summary: sectionSummary(model.document, key),
  }));

  return (
    <article className={cx("lx-brand-report", className)} data-lexios-report="brand-id">
      <BrandReportHeader document={model.document} model={model} />
      {sections.map((section) => {
        const SectionComponent = renderSection?.[section.key] ?? SECTION_COMPONENTS[section.key];

        return <SectionComponent document={model.document} model={model} section={section} key={section.key} />;
      })}
    </article>
  );
}

export type { BrandChannel };
