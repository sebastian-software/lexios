import { stringify as stringifyYaml } from "yaml";

import { BrandIdDraftSchema, type BrandIdDraft, type SourcedValue } from "./brand-id.schema.js";

const PROFILE_SECTION_ORDER = [
  "core",
  "audience",
  "relationship",
  "voice",
  "toneMatrix",
  "messaging",
  "visual",
  "governance",
  "examples",
] as const;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSourcedValue(value: unknown): value is SourcedValue<unknown> {
  return (
    isPlainObject(value) &&
    "value" in value &&
    "status" in value &&
    "confidence" in value &&
    "sources" in value &&
    "inferenceType" in value
  );
}

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatInlineValue(value: unknown): string {
  if (value === null) {
    return "`not_specified`";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  return `\`${JSON.stringify(value)}\``;
}

function renderYamlBlock(value: unknown, indent = 0): string[] {
  const yaml = stringifyYaml(value, { indent: 2, lineWidth: 0, minContentWidth: 0 }).trimEnd();
  const prefix = " ".repeat(indent);

  return [`${prefix}\`\`\`yaml`, ...yaml.split("\n").map((line) => `${prefix}${line}`), `${prefix}\`\`\``];
}

function renderSourcedField(name: string, field: SourcedValue<unknown>, indent = 0): string[] {
  const lines: string[] = [];
  const prefix = " ".repeat(indent);
  const showMetadata =
    field.value === null ||
    field.status !== "confirmed" ||
    field.confidence.label !== "high" ||
    field.inferenceType !== "quoted";

  if (
    field.value === null ||
    typeof field.value === "string" ||
    typeof field.value === "number" ||
    typeof field.value === "boolean"
  ) {
    lines.push(`${prefix}- \`${name}\`: ${formatInlineValue(field.value)}`);
  } else {
    lines.push(`${prefix}- \`${name}\`:`);
    lines.push(...renderYamlBlock(field.value, indent + 2));
  }

  if (showMetadata) {
    lines.push(
      `${prefix}  - _status=${field.status} | inference=${field.inferenceType} | confidence=${field.confidence.label}:${field.confidence.score.toFixed(2)}_`,
    );
  }

  if (showMetadata && field.sources.length > 0) {
    lines.push(`${prefix}  - sources: ${field.sources.map((source) => source.evidenceId).join(", ")}`);
  }

  return lines;
}

function renderArrayField(name: string, value: unknown[], indent = 0): string[] {
  const prefix = " ".repeat(indent);

  if (value.length === 0) {
    return [`${prefix}- \`${name}\`: []`];
  }

  if (value.every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean")) {
    return [
      `${prefix}- \`${name}\`:`,
      ...value.map((item) => `${prefix}  - ${String(item)}`),
    ];
  }

  return [`${prefix}- \`${name}\`:`, ...renderYamlBlock(value, indent + 2)];
}

function renderObjectField(name: string, value: Record<string, unknown>, indent = 0): string[] {
  const prefix = " ".repeat(indent);
  const lines: string[] = [`${prefix}- \`${name}\`:`];

  for (const [childName, childValue] of Object.entries(value)) {
    lines.push(...renderField(childName, childValue, indent + 2));
  }

  return lines;
}

function renderField(name: string, value: unknown, indent = 0): string[] {
  if (isSourcedValue(value)) {
    return renderSourcedField(name, value, indent);
  }

  if (Array.isArray(value)) {
    return renderArrayField(name, value, indent);
  }

  if (isPlainObject(value)) {
    return renderObjectField(name, value, indent);
  }

  return [`${" ".repeat(indent)}- \`${name}\`: ${formatInlineValue(value)}`];
}

export function renderBrandIdMarkdown(input: BrandIdDraft): string {
  const draft = BrandIdDraftSchema.parse(input);

  const lines: string[] = [
    `# Brand ID: ${draft.meta.brandName}`,
    "",
    `Stand: ${draft.meta.updatedAt}`,
    "",
    "## Meta",
    ...renderField("schema", draft.meta.schema),
    ...renderField("brandSlug", draft.meta.brandSlug),
    ...renderField("status", draft.meta.status),
    ...renderField("primaryLocale", draft.meta.primaryLocale ?? null),
    ...renderField("supportedLocales", draft.meta.supportedLocales),
    ...renderField("seedInputs", draft.meta.seedInputs),
    ...renderField("tags", draft.meta.tags),
    "",
    "## Discovery",
    ...renderField("website", draft.discovery.website),
    ...renderField("materials", draft.discovery.materials),
    ...renderField("unresolvedQuestions", draft.discovery.unresolvedQuestions),
    ...renderField("excludedMaterials", draft.discovery.excludedMaterials),
  ];

  for (const sectionName of PROFILE_SECTION_ORDER) {
    lines.push("", `## ${humanizeKey(sectionName)}`);

    if (sectionName === "toneMatrix") {
      lines.push(...renderField(sectionName, draft.profile.toneMatrix));
      continue;
    }

    lines.push(...renderField(sectionName, draft.profile[sectionName]));
  }

  lines.push(
    "",
    "## Evidence",
    ...renderField("evidence", draft.evidence),
    "",
    "## Generation",
    ...renderField("reviewStatus", draft.generation.reviewStatus),
    ...renderField("overallConfidence", draft.generation.overallConfidence),
    ...renderField("completeness", draft.generation.completeness),
    ...renderField("openQuestions", draft.generation.openQuestions),
    ...renderField("assumptions", draft.generation.assumptions),
    ...renderField("missingFieldPaths", draft.generation.missingFieldPaths),
    ...renderField("warnings", draft.generation.warnings),
    ...renderField("generatedAt", draft.generation.generatedAt ?? null),
    ...renderField("lastHumanReviewAt", draft.generation.lastHumanReviewAt ?? null),
  );

  return `${lines.join("\n")}\n`;
}
