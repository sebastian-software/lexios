# brandMD Comparison

Date: 2026-04-14
Primary source: https://www.brandmd.dev/
Page reviewed: https://www.brandmd.dev/landing

## Observed brandMD offer

The landing page positions brandMD as a "brand skill compiler" for AI.

Core claims from the page:

- input can be a brand PDF or a website URL
- output is a machine-readable `SKILL.md`
- the extraction covers voice, tone, colors, typography, components, icons, and layout rules
- it also advertises `tokens.json` export
- it is optimized for Claude but framed as usable with any markdown-reading LLM
- it offers a free preview with 3 extracted sections
- full extraction is priced at `$9.99 / brand`
- it claims local-first processing, client-side export, and no server-side storage of uploaded brand files

Additional details explicitly mentioned:

- "completeness scoring + gap detection"
- "asset management + font bundling"
- "6 ready-to-use prompt examples"
- exported zip includes strategy docs, voice docs, design files, bundled assets, and use-case examples

## Overlap with Brand ID / brandix

Strong overlap:

- both are trying to turn brand material into machine-readable structure for AI use
- both treat verbal and visual identity as one system instead of splitting copy and design
- both care about voice, tone, messaging rules, visual tokens, and examples
- both assume downstream use with LLMs rather than a human-only PDF brand book
- both treat source material as incomplete and needing structured extraction

Moderate overlap:

- brandMD's "strategy docs" overlaps with our `core`, `audience`, and `messaging` sections
- brandMD's prompt examples overlaps with our `examples`
- brandMD's completeness scoring overlaps with our `generation.completeness`, open questions, and missing field tracking

## Meaningful differences

### 1. Product framing

brandMD is presented as an extraction-and-export product.

Our current direction is a canonical data model first:

- `BrandIdDraft` as the source object
- field-level provenance
- field-level confidence
- explicit draft vs reviewed lifecycle

That is a deeper system-of-record posture than a compiled `SKILL.md` export.

### 2. Output format

brandMD centers the deliverable on:

- `SKILL.md`
- `tokens.json`
- bundled assets and examples

We currently center the deliverable on:

- a normalized TypeScript domain model
- later-compatible JSON/YAML serialization
- possible downstream exports to prompts, skills, or design tokens

This means brandMD is currently closer to a packaged end-user artifact. We are currently closer to a schema layer.

### 3. Relationship modeling

Our model makes several concepts explicit that brandMD's landing page does not foreground:

- `relationship`
- `addressForm`
- `register`
- `authorityLevel`
- `customerView`
- `localeOverrides`
- `governance`

Those are important if the goal is not just "make AI sound on-brand", but "capture how the brand sees people and when rules change by context or locale."

### 4. Evidence and auditability

Our model stores:

- `sources`
- `confidence`
- `inferenceType`
- `missingFieldPaths`
- review metadata

brandMD mentions extraction quality and completeness, but the landing page does not describe field-level provenance or auditability as a first-class user-facing concept.

### 5. Source basis

brandMD foregrounds PDF upload first, then website URL as an option.

Our current working assumption is website-first seeding, then enrichment from discovered material. That is a different operational pipeline.

### 6. Brand governance depth

brandMD's offer is strongest on immediate AI usability:

- copy tone
- design tokens
- components
- prompt-ready docs

Our model currently goes further into governance and rule conflict handling:

- precedence rules
- ownership
- approval rules
- exceptions policy

That matters if the object is meant to become a durable customer master record rather than just an AI companion file.

### 7. Design system granularity

brandMD explicitly markets extraction of:

- components
- icons
- layout rules
- spacing rules
- bundled assets and fonts

Our current schema covers visual identity well at the brand-guide level, but not yet at the design-system export level.

Current weak spots in our model:

- no dedicated `components` section
- no dedicated `layoutRules` section
- no explicit spacing/grid token structure
- no asset registry for logos, fonts, icons, or downloadable source files

So on the design implementation side, brandMD's marketed artifact is currently more concrete than ours.

For v0 this is acceptable and likely desirable:

- spacing and grid are not core to the intended `Brand ID` scope
- design-system implementation detail is downstream from the brand object
- logo usage, color rules, typography guidance, and co-branding are the more relevant visual layer for now

## What brandMD appears to do better right now

- clearer end-user story
- clearer single artifact story: "upload, extract, download"
- immediate compatibility with Claude workflows
- concrete output packaging
- concrete pricing and onboarding

This is a product advantage, even if the underlying model may be shallower.

## What brandix can do differently

If we keep going with the current model, the strongest differentiation is probably not "another SKILL.md generator".

The stronger position would be:

- canonical brand knowledge object
- evidence-backed draft generation
- editable human review layer
- multiple exports from one source object

Possible exports later:

- `SKILL.md`
- `tokens.json`
- design-system rules
- copywriting prompt context
- website brand summary
- CMS-usable brand settings

## Product implication

A pragmatic reading is:

- brandMD validates the demand
- but it also narrows the obvious positioning trap

If we copy the surface too directly, we risk becoming "brandMD with different wording."

If we build from the current schema direction, we can instead position `Brand ID` as:

- the canonical brand object
- from which `SKILL.md` is just one export target

## Recommended next move

Turn this into an explicit architecture decision:

1. Keep `BrandIdDraft` as the source of truth.
2. Define export targets separately.
3. Add one first export adapter:
   - `BrandIdDraft -> SKILL.md`
4. Add one second export adapter:
   - `BrandIdDraft -> tokens.json`
5. Keep v0 deliberately narrow:
   - prioritize self-image, audience, relationship, voice, tone, messaging, logo, colors, typography, governance
   - treat deep design-system structure as out of scope unless later customer demand proves otherwise

That keeps the domain model defensible while still meeting the market where brandMD is proving demand.
