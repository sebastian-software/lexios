# GOV.UK — Brand ID notes

Companion to [`examples/govuk.brand-id.yaml`](../../../examples/govuk.brand-id.yaml). Documents how each section was sourced and where the record is confident vs. reconstructed.

## Why GOV.UK

GOV.UK is the closest thing the public sector has to a reference brand. Every major design system citation (USWDS, Canada.ca, Singapore GovTech, Australia.gov.au) traces back to it. For Lexios this brand stress‑tests:

- A voice that is **deliberately personality‑free** (the trait spectrum leans low on warmth, playfulness, expressiveness — that's the point).
- A **rules‑heavy voice** profile with concrete numeric targets (reading age 9, 25‑word sentence limit, 5‑sentence paragraph limit).
- A **dense visual system** with real hex values and WCAG requirements built in.
- A small but **critical lexicon** — the `GOV.UK` casing rule alone is a poster child for why canonical spelling belongs in the schema.

## Licence

Content is available under the [Open Government Licence v3.0](https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/). Crown copyright artwork (the crown in the wordmark) is **not** OGL and is handled as a separate asset‑licensing concern.

## Source → field mapping

| Field | Source | Confidence |
|-------|--------|------------|
| `core.brandSummary`, `missionOrPromise`, `brandSelfImage` | Synthesised from GDS service‑manual introductions. | Medium |
| `core.categoryContext` | Editorial knowledge. | Medium |
| `core.traitSpectrum` | Derived from "Writing for GOV.UK" — plain, credible, neutral‑formal, directive. Weights are interpretations. | High on traits, medium on weights |
| `audience.*` | The GOV.UK style guide does not publish audience segmentation; reconstructed from GDS research publications and service manuals. | Medium |
| `relationship.*` | Directly quoted from "Writing for GOV.UK" (address form, register adaptation, role, humor). | High |
| `voice.jargonPolicy` | Directly quoted. | High |
| `voice.plainLanguage.readingLevel` | "Write for a 9 year old reading age" (explicit). | Very high |
| `voice.plainLanguage.maxSentenceLength` | "Check sentences longer than 25 words" (explicit). | Very high |
| `voice.personalityGuardrails` | Twelve guardrails, each quoted or paraphrased from the writing guide. | Very high |
| `lexicon.entries` — GOV.UK | Casing rule explicit in the style guide. | Very high |
| `lexicon.entries` — plain‑word replacements (buy/help/use) | Explicit. | Very high |
| `lexicon.entries` — "government", "service" contextual meanings | Editorial interpretation for translator briefs. | Medium |
| `toneScenarios` | No published tone matrix. Four scenarios reconstructed from patterns observable on GOV.UK and in the writing guide. | Medium |
| `visual.colorSystem` | Directly quoted from the Design System colour page. | Very high |
| `visual.typographySystem` | "GDS Transport" referenced; full family/usage is not openly published. Simplified to single family per v0.4 shape. | Medium |
| `visual.accessibilityRules` | Quoted from the Design System. | Very high |
| `governance.*` | GDS ownership explicit on the style guide page. | High |

## Known gaps / `needs_review` annotations

Set via `annotations[path].status = "needs_review"` or marked in the `notes` field of annotations:

- `/profile/audience` — reconstructed, not sourced from GDS's own audience document.
- `/profile/toneScenarios` — reconstructed, not sourced from a published tone matrix.
- `/profile/visual/typographySystem` — simplified; full role‑to‑family mapping is not publicly documented.

## What's intentionally absent

- **Logo assets.** Crown copyright is not OGL. The record describes the rules (no alteration, clear space per Design System) but `logoAssets` stays empty until asset licensing is explicitly cleared.
- **Motion / sonic voice.** GOV.UK has usability guidance for motion; not captured in v0.4 schema (would need an RFC).

## If you update this record

Run the validator first:

```bash
node -e "import('./dist/brand-id.yaml.js').then(async m => { \
  const fs = await import('fs'); \
  m.parseBrandIdYaml(fs.readFileSync('examples/govuk.brand-id.yaml','utf8')); \
  console.log('ok'); \
})"
```

If you change a field, consider updating its `annotations[path].status` and `confidence.rationale` to reflect why.
