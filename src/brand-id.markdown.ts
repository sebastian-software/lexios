import { stringify as stringifyYaml } from "yaml";

import { BrandIdDraftSchema, type BrandIdDraft } from "./brand-id.schema.js";

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

function humanizeKey(key: string): string {
  return key
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatInlineValue(value: unknown): string {
  if (value === null || value === undefined) {
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

function renderArrayField(name: string, value: unknown[], indent = 0): string[] {
  const prefix = " ".repeat(indent);

  if (value.length === 0) {
    return [`${prefix}- \`${name}\`: []`];
  }

  if (value.every((item) => typeof item === "string" || typeof item === "number" || typeof item === "boolean")) {
    return [`${prefix}- \`${name}\`:`, ...value.map((item) => `${prefix}  - ${String(item)}`)];
  }

  return [`${prefix}- \`${name}\`:`, ...renderYamlBlock(value, indent + 2)];
}

function renderObjectField(name: string, value: Record<string, unknown>, indent = 0): string[] {
  const prefix = " ".repeat(indent);
  const entries = Object.entries(value);

  if (entries.length === 0) {
    return [`${prefix}- \`${name}\`: {}`];
  }

  const lines: string[] = [`${prefix}- \`${name}\`:`];

  for (const [childName, childValue] of entries) {
    lines.push(...renderField(childName, childValue, indent + 2));
  }

  return lines;
}

function renderField(name: string, value: unknown, indent = 0): string[] {
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
    `schema: ${draft.meta.schema.id}@${draft.meta.schema.version}`,
    `updatedAt: ${draft.meta.updatedAt}`,
    "",
    "## Meta",
    ...renderField("brandSlug", draft.meta.brandSlug),
    ...renderField("legalEntityName", draft.meta.legalEntityName ?? null),
    ...renderField("canonicalDomain", draft.meta.canonicalDomain ?? null),
    ...renderField("status", draft.meta.status),
    ...renderField("primaryLocale", draft.meta.primaryLocale ?? null),
    ...renderField("supportedLocales", draft.meta.supportedLocales),
    ...renderField("seedInputs", draft.meta.seedInputs),
    ...renderField("tags", draft.meta.tags),
  ];

  for (const sectionName of PROFILE_SECTION_ORDER) {
    lines.push("", `## Profile.${sectionName}`, ...renderField(sectionName, draft.profile[sectionName]));
  }

  lines.push(
    "",
    "## Profile.localeOverrides",
    ...renderField("localeOverrides", draft.profile.localeOverrides),
    "",
    "## Profile.customSections",
    ...renderField("customSections", draft.profile.customSections),
    "",
    "## Evidence",
    ...renderField("evidence", draft.evidence),
    "",
    "## Annotations",
    ...renderField("annotations", draft.annotations),
    "",
    "## Audit",
    ...renderField("audit", draft.audit),
  );

  return `${lines.join("\n")}\n`;
}
