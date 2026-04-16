# Lexios

Lexios is a standard for capturing a brand as structured, machine-readable knowledge.

Most companies have brand information scattered across websites, PDFs, pitch decks, style guides, design files, onboarding docs, and the heads of a few people. That is manageable for humans, but weak input for automated content work. Writing agents, website generators, campaign tools, review workflows, and localization pipelines need a clearer source of truth:

- Who is the brand?
- What does it believe about itself?
- Who are its customers?
- How does it speak to them?
- What should never sound or look off-brand?
- Which rules are explicit, inferred, missing, or still need review?

Lexios turns that into a `Brand ID`: a validated document that describes the brand's voice, relationship model, messaging rules, visual identity, governance, source evidence, and confidence level.

## Why This Exists

On-brand content is not just a writing problem.

A technically correct text can still be wrong for the brand. It may be too formal, too casual, too generic, too salesy, too vague, or simply inconsistent with how the company sees itself and its customers.

Lexios is designed to give content systems the missing brand context. Instead of asking an AI to "sound on brand" from a vague prompt, Lexios provides a structured object that says what "on brand" actually means.

## What Lexios Captures

A Brand ID documents the parts of a brand that usually matter for content production, website work, app copy, campaign writing, automated review, localization, and customer communication:

- `core`: brand summary, mission or promise, self-image, category context, personality, and anti-traits.
- `audience`: primary and secondary audiences, domain knowledge, user needs, and global audience notes.
- `relationship`: how the brand sees the customer, whether it leads as expert, peer, coach, guide, or authority, and how direct or formal it should be.
- `voice`: stable voice traits, jargon policy, claims policy, personality guardrails, and what the brand should avoid sounding like.
- `lexicon`: company-specific words, products, features, abbreviations, canonical spellings, definitions, and usage rules.
- `toneMatrix`: how tone changes by situation, such as sales, onboarding, support, legal, social, partner, or crisis contexts.
- `messaging`: message hierarchy, terminology, writing rules, CTA style, evidence rules, and localization notes.
- `visual`: logo usage, color system, typography guidance, imagery rules, accessibility, and co-branding rules.
- `governance`: source of truth, ownership, approval rules, precedence rules, review cycles, and exception handling.
- `examples`: do/don't pairs, channel examples, and scenario examples.

The goal is not to replace a brand guide. The goal is to make the important parts of a brand guide usable by software.

## The Important Distinction

Lexios separates brand knowledge from audit metadata.

The brand itself stays readable:

```yaml
profile:
  core:
    brandSummary: Climate solutions company helping organizations achieve renewable energy and decarbonization goals.
    missionOrPromise: Make it possible for businesses and their customers to take urgent action on climate change.
    personalityTraits:
      - credible
      - creative
      - authentic
  lexicon:
    entries:
      - term: Supplier REach
        definition: Company-specific product or program name.
        kind: product
        casingRule: Use uppercase R and E in REach.
```

Evidence lives beside it:

```yaml
annotations:
  /profile/core:
    status: mixed
    confidence:
      score: 0.91
      label: high
    basis: synthesized
    sources:
      - evidenceId: D1
        locator: pp. 3, 7
```

This keeps the Brand ID usable for agents and humans while still preserving where each important claim came from.

## Document Shape

Lexios uses a Zod-first schema and stores Brand IDs as YAML.

```yaml
meta:
  schema:
    id: brand-id
    version: 0.3.0
  brandName: Example Brand

profile:
  core: {}
  audience: {}
  relationship: {}
  voice: {}
  lexicon:
    entries: []
    generalRules: []
  toneMatrix: []
  messaging: {}
  visual: {}
  governance: {}
  examples: {}

evidence: []
annotations: {}
audit: {}
```

The top-level sections have clear jobs:

- `meta`: identity, schema version, locales, seed inputs, and document status.
- `profile`: the actual brand model, with plain values.
- `evidence`: the source inventory, such as websites, PDFs, brand guides, interviews, and manual notes.
- `annotations`: path-level confidence, status, basis, and source references.
- `audit`: discovery state, completeness, open questions, assumptions, warnings, and missing fields.

## Intended Use

Lexios is meant to become the brand memory layer for automated content systems.

Useful downstream outputs include:

- source material for original website, app, campaign, and support content
- agent-facing Markdown context
- copywriting prompt context
- automated brand QA and review rules
- localization and translation guidance where needed
- brand review checklists
- customer-facing brand summaries
- future exports such as `SKILL.md`, JSON, or design-token-adjacent artifacts

In this project, YAML is the exchange format and Markdown is an agent-facing export, not the canonical source of truth.

## Project Structure

- `src/brand-id.schema.ts`: canonical Zod schema and inferred TypeScript types.
- `src/brand-id.yaml.ts`: YAML parse/stringify helpers.
- `src/brand-id.markdown.ts`: agent-facing Markdown renderer.
- `src/brand-id.ts`: stable schema facade.
- `src/index.ts`: package entrypoint.
- `examples/`: canonical example Brand IDs and rendered exports.
- `docs/brand-id/`: research corpus, comparison notes, and earlier taxonomy work.

## Install

```bash
npm install
```

## Scripts

```bash
npm run build
npm run typecheck
npm run clean
```

## Usage

```ts
import {
  BrandIdDraftSchema,
  parseBrandIdYaml,
  stringifyBrandIdYaml,
  renderBrandIdMarkdown,
  type BrandIdDraft,
} from "lexios";

const draft: BrandIdDraft = parseBrandIdYaml(yamlSource);
const checked = BrandIdDraftSchema.parse(draft);

const yamlOut = stringifyBrandIdYaml(checked);
const markdownOut = renderBrandIdMarkdown(checked);
```

## Current Status

Lexios is an early schema and research workspace. It is not a deployed product yet.

The current focus is to make the Brand ID model small enough to use, rich enough to represent real brand guides, and structured enough to support content generation, content review, and brand-aware automation later.
