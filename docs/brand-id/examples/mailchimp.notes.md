# Mailchimp — Brand ID notes

Companion to [`examples/mailchimp.brand-id.yaml`](../../../examples/mailchimp.brand-id.yaml).

## Why Mailchimp

The Mailchimp Content Style Guide is the most cited consumer‑SaaS voice document on the open web — it effectively *taught* a generation of product teams how to write tone‑of‑voice guidance. For Lexios this brand stress‑tests:

- A **content‑first brand** with an extremely explicit voice and almost no formal visual documentation on the style‑guide surface.
- A **warm, informal register** ("contractions give an informal, friendly tone") as a contrast to GOV.UK's neutral‑formal.
- A **highly specific lexicon** driven by self‑reference rules ("we" not "it", never capitalise "c" in "Mailchimp", never personify Freddie, never use "chimp" alone).
- **Inclusive language at scale** — the "Writing about people" page is a canonical reference.

## Licence

Mailchimp Content Style Guide is licensed under [Creative Commons Attribution‑NonCommercial 4.0 International (CC BY‑NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/). This record:

- Attributes Mailchimp as the source (see `evidence[]` and `seedInputs`).
- Transforms the prose guide into structured data — arguably transformative, but the record is kept **non‑commercial** to match the source licence.

If Lexios ever becomes a commercial product, the Mailchimp record may need to be re‑expressed from a different source or removed. The annotation on `/profile/visual` already notes this.

## Source → field mapping

| Field | Source | Confidence |
|-------|--------|------------|
| `core.traitSpectrum` | Voice and Tone page — plainspoken, genuine, translator, dry. Mapped to canonical axes with interpretive weights. | High on traits, medium on weights |
| `audience.*` | Reconstructed from Mailchimp's public positioning. Style guide itself does not publish segments. | Medium |
| `relationship.*` | Quoted from Writing about Mailchimp ("we not it") and Voice and Tone (tone shifts with reader's state of mind). | Very high |
| `voice.jargonPolicy`, `plainLanguage`, `claimsPolicy` | Quoted or paraphrased from Voice and Tone. Numeric reading level intentionally omitted — the style guide evaluates clarity qualitatively. | High |
| `voice.personalityGuardrails` | Twelve‑plus guardrails, mostly from Writing about people and Voice and Tone. | Very high |
| `lexicon.entries` — Mailchimp, Freddie, chimp, email, website, internet, online | All directly quoted from the style guide. | Very high |
| `messaging.structureRules` | Quoted from Grammar and Mechanics. | Very high |
| `illustrations.doDontPairs` | Derived from style guide examples and Writing about people preferred/forbidden pairs. | High |
| `visual.colorSystem` | **Reconstructed** from publicly known Mailchimp brand colours (Cavendish Yellow, Peppercorn, Coconut). Not sourced from an open spec on styleguide.mailchimp.com. | Medium (flagged) |
| `visual.typographySystem` | **Reconstructed** (Cooper Light display, Helvetica Neue body). Similar caveat. | Medium (flagged) |
| `governance.*` | Inferred from attribution on the style guide ("Content team"). | Medium |

## Known gaps / `needs_review` annotations

- `/profile/visual` — whole section is reconstructive. The Mailchimp Content Style Guide is content‑focused; visual brand lives elsewhere and isn't published under the same open licence. Replace with a primary source if/when one becomes available.
- `/profile/audience` — not sourced from a published Mailchimp document.
- `/profile/toneScenarios` — Mailchimp's tone philosophy is famous but the page does not publish a scenario matrix. Reconstructed from the style guide's own examples.

## What's intentionally absent

- **Logo assets.** Mailchimp wordmark and Freddie are Intuit trademarks. `logoAssets` stays empty.
- **Freddie personification.** Even though Freddie is the mascot, the record enforces the style guide's own rule: Freddie never speaks.

## Commercial‑use warning

If you consume this record commercially, you must either:

1. Obtain permission for commercial use of the Mailchimp Content Style Guide source material, or
2. Replace the Mailchimp record with a different brand or a cleaned‑room reconstruction from different sources.

CC BY‑NC 4.0 is not compatible with commercial redistribution.
