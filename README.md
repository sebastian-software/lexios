# Lexios

`Lexios` is a Zod-first workspace for defining, validating, exchanging, and rendering `Brand ID` drafts.

The intended architecture is:

- Zod schema as the canonical definition
- TypeScript types inferred from the schema
- YAML as the exchange format
- Markdown as an agent-facing export

## Project Structure

- `src/brand-id.schema.ts`: canonical `Brand ID` runtime schema and inferred types
- `src/brand-id.ts`: stable facade re-export for the schema module
- `src/brand-id.yaml.ts`: YAML parse/stringify helpers
- `src/brand-id.markdown.ts`: Markdown renderer
- `src/index.ts`: package entrypoint
- `docs/brand-id/`: research corpus, examples, and taxonomy notes

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

## Schema Shape

Lexios keeps brand knowledge and audit metadata separate:

- `profile`: the actual brand object with plain values such as voice, audience, relationship, messaging, logo, colors, and governance.
- `evidence`: source inventory for websites, PDFs, brand guides, interviews, and manual notes.
- `annotations`: path-level evidence and confidence, keyed by JSON Pointer paths such as `/profile/core` or `/profile/core/brandSummary`.
- `audit`: discovery, review state, completeness, open questions, assumptions, warnings, and missing field paths.

## Notes

- The package now treats Markdown as an export format, not as the canonical data source.
- The profile object is intentionally not wrapped in per-field provenance blocks; provenance lives beside it in `annotations`.
- The examples under `docs/brand-id/examples/` are still useful editorial references, but they are not the single source of truth.
- Locale overrides and custom sections remain intentionally flexible, because customer-specific edge cases are expected there.
