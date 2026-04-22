# GitLab — Brand ID notes

Companion to [`examples/gitlab.brand-id.yaml`](../../../examples/gitlab.brand-id.yaml).

## Why GitLab

GitLab publishes almost everything about how it operates in a public handbook. That includes values (CREDIT), mission/vision/purpose, and a full brand guideline set (Pajamas Design System). For Lexios this brand stress‑tests:

- A **technical‑professional audience** with higher tolerance for jargon than consumer brands.
- **Three‑pillar voice framework** (Visionary, Empathetic, Intentional) with explicit "We are X, but we are not Y" pairs — an almost perfect fit for `traitSpectrum`.
- A **deep governance section** — handbook supersedes interpretation, merge requests for changes, public review cycle.
- **Rich visual identity** — primary and secondary palettes, gradients, proprietary typography (GitLab Sans / GitLab Mono with Inter fallback).

## Licence

GitLab Handbook content is licensed under [Creative Commons Attribution‑ShareAlike 4.0 International (CC BY‑SA 4.0)](https://creativecommons.org/licenses/by-sa/4.0/). This means:

- Attribution is required (see `evidence[]`).
- Derivative works must share under the same licence. Lexios itself is an Apache 2.0‑ish project (currently `UNLICENSED` in package.json); the brand record is a derivative of CC BY‑SA content, so the record text inherits CC BY‑SA 4.0.

GitLab wordmark and the tanuki are separate trademarks; rule descriptions are public, asset files are not covered by the handbook licence.

## Source → field mapping

| Field | Source | Confidence |
|-------|--------|------------|
| `core.missionOrPromise` | Handbook → Mission page, quoted directly. | Very high |
| `core.brandSummary` | Homepage positioning + Pajamas brand‑voice page. | High |
| `core.categoryContext` | Homepage + known category‑creator positioning. | High |
| `core.traitSpectrum` | Maps the three Pajamas voice pillars (Visionary / Empathetic / Intentional) onto canonical `TraitId` axes. The note on each pair carries the original "We are X, but we are not Y" phrasing from Pajamas. | High on traits, medium on weights |
| `audience.*` | Reconstructed from homepage target‑audience signalling + known category positioning. Not sourced from a published audience document. | Medium |
| `relationship.*` | Distilled from handbook values (Collaboration: "Don't pull rank"; Transparency sections). | High |
| `voice.jargonPolicy` | Pajamas: "Meet readers where they are". Technical language acceptable where appropriate. | High |
| `voice.plainLanguage.readingLevel` | **Interpretation**. Pajamas does not specify a numeric target; 11 reflects the technical‑audience default. Flagged in annotation. | Medium |
| `voice.personalityGuardrails` | Eight guardrails, all from handbook Collaboration section (assume positive intent, blameless, say sorry, 1‑to‑1 negative feedback, don't pull rank, iteration, transparency default, kindness + candor). | Very high |
| `lexicon.entries` | All entries sourced from handbook terminology (GitLab, CREDIT, handbook, all‑remote, iteration, MVC, DevSecOps, platform). | Very high for canonical spellings, medium for contextual meanings |
| `toneScenarios` | Pajamas publishes a three‑pillar framework but no scenario matrix. Five scenarios reconstructed from observable patterns (release posts, incident posts, sales pages, support posts). | Medium |
| `messaging.messageHierarchy` | Homepage copy quoted directly. | Very high |
| `messaging.structureRules` | Pajamas typography and content guidance. | Very high |
| `visual.colorSystem` | Pajamas colour page — full primary + secondary palettes with hex values. | Very high |
| `visual.typographySystem` | Pajamas typography page — families and usage. Schema v0.4 simplifies to one family per role; leading/tracking preserved in the usage text. | High |
| `governance.*` | Handbook‑first principle, Pajamas change process, Chief People Officer as values steward. | High |

## Known gaps / `needs_review` annotations

- `/profile/audience` — informed reconstruction from homepage, not from GitLab's own audience research.
- `/profile/toneScenarios` — scenario matrix is reconstructive.
- `/profile/voice/plainLanguage/readingLevel` — interpretive; Pajamas does not publish a numeric target.
- `/profile/visual/logoAssets` — empty. Tanuki and wordmark files are hosted in the GitLab artwork repo under separate terms; path entries would be added when a consumer wires them up.

## What's intentionally kept

- **Handbook‑first language.** "The handbook is public. If you disagree with the handbook, submit a merge request." This posture shapes `governance.sourceOfTruth` and `precedenceRules`.
- **Iteration as an operating value.** Reflected in `core.traitSpectrum` (innovative ↔ traditional weighted high) and in `personalityGuardrails` ("Iteration over perfection").

## Share‑Alike implication

Because this record uses CC BY‑SA 4.0 handbook content, any downstream derivative must also be shared under CC BY‑SA 4.0. If you fork and extend the GitLab record, keep the licence.
