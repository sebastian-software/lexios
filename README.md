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

- `core`: brand summary, mission or promise, self-image, category context, and a controlled weighted `traitSpectrum` of personality axes.
- `audience`: primary and secondary audience segments, each with its own prioritised needs, plus domain knowledge and global audience notes.
- `relationship`: how the brand sees the customer, whether it leads as expert, peer, coach, guide, or authority, and how direct or formal it should be.
- `voice`: jargon policy, plain-language reading level, claims policy, and personality guardrails. Voice is about *how* the brand writes; identity traits live in `core`.
- `lexicon`: company-specific words, products, features, canonical spellings, definitions, contextual meanings for generic terms the brand interprets, and per-locale translation notes.
- `toneScenarios`: how tone changes by situation — sales, onboarding, support, legal, social, partner, or crisis contexts.
- `messaging`: message hierarchy, structure rules, CTA style, evidence rules, and localization notes.
- `visual`: logo rules and logo assets, color system, typography guidance, imagery rules, accessibility, and co-branding rules.
- `governance`: source of truth, ownership, approval rules, precedence rules, review cycles, and exception handling.
- `illustrations`: do/don't pairs, channel examples, and scenario examples.

The goal is not to replace a brand guide. The goal is to make the important parts of a brand guide usable by software.

## The Important Distinction

Lexios separates brand knowledge from audit metadata.

The brand itself stays readable:

```yaml
profile:
  core:
    brandSummary: Climate solutions company helping organizations achieve renewable energy and decarbonization goals.
    missionOrPromise: Make it possible for businesses and their customers to take urgent action on climate change.
    traitSpectrum:
      - positivePole: credible
        negativePole: hypey
        weight: 0.9
      - positivePole: authentic
        negativePole: promotional
        weight: 0.7
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
    version: 0.4.0
  brandName: Example Brand

profile:
  core: {}
  audience: {}
  relationship: {}
  voice: {}
  lexicon:
    entries: []
    generalRules: []
  toneScenarios: []
  messaging: {}
  visual: {}
  governance: {}
  illustrations: {}

evidence: []
annotations: {}
audit: {}
```

The top-level sections have clear jobs:

- `meta`: identity, schema version, locales, seed inputs, and document status.
- `profile`: the actual brand model, with plain values.
- `evidence`: the source inventory, such as websites, PDFs, brand guides, interviews, and manual notes.
- `annotations`: path-level confidence, status, basis, and source references.
- `audit`: discovery state, completeness, open questions, assumptions, and warnings. Completeness of individual fields is derived from annotations and empty leaves via `deriveMissingFieldPaths(doc)` rather than hand-maintained.

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
- `src/brand-id.audit.ts`: derived audit helpers such as `deriveMissingFieldPaths`.
- `src/brand-id.ts`: stable schema facade.
- `src/index.ts`: package entrypoint.
- `src/react/`: headless React renderer for the Brand Report.
- `examples/`: canonical example Brand IDs and rendered exports.
- `docs/brand-id/`: research corpus, RFCs (see `rfc-0.4.md`), field-relation notes, asset conventions, and earlier taxonomy work.

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

## React Brand Report

Lexios also ships a headless React renderer for turning a Brand ID into semantic report HTML.
The renderer validates the same `BrandIdDraft` shape and leaves styling to the host app.

```tsx
import { BrandReport } from "lexios/react";
import { parseBrandIdYaml } from "lexios/yaml";

const document = parseBrandIdYaml(yamlSource);

export function App() {
  return <BrandReport document={document} />;
}
```

The local demo renders three reference brands as neutral editorial reports — switchable via a top tab bar (`?brand=govuk`, `?brand=mailchimp`, `?brand=gitlab`):

```bash
npm run demo:brand-report:build
npm exec vite -- --host 127.0.0.1 examples/react-brand-report
```

The three reference records live in [`examples/`](examples/) with per-brand source-to-field notes in [`docs/brand-id/examples/`](docs/brand-id/examples/):

- [`govuk.brand-id.yaml`](examples/govuk.brand-id.yaml) — UK government, Open Government Licence v3.0. Rules-heavy voice, 9-year-old reading age, full Design System palette.
- [`mailchimp.brand-id.yaml`](examples/mailchimp.brand-id.yaml) — consumer SaaS, CC BY-NC 4.0. Warm and plainspoken, canonical Content Style Guide.
- [`gitlab.brand-id.yaml`](examples/gitlab.brand-id.yaml) — DevSecOps platform, CC BY-SA 4.0. Three-pillar voice framework, CREDIT values, Pajamas Design System.

A second demo at `examples/react-brand-report-explorations/` shows multiple visual alternatives per field — a reference sheet used while designing the canonical renderer. Same brand switcher.

## Current Status

Lexios is an early schema and research workspace. It is not a deployed product yet.

Schema `v0.4.0-rc.1` is the current working version. It supersedes v0.3 with breaking changes around `core.traitSpectrum`, per-segment user needs, a rules-based voice profile, simplified typography, removed `customSections`, and renamed `toneScenarios` / `illustrations` sections. See [`docs/brand-id/rfc-0.4.md`](docs/brand-id/rfc-0.4.md) for the full rationale.

The current focus is to make the Brand ID model small enough to use, rich enough to represent real brand guides, and structured enough to support content generation, content review, and brand-aware automation later.
