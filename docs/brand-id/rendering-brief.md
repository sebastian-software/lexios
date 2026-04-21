# Rendering Brief — Visual Decisions per Brand ID Field

Status: draft (2026‑04‑17). This is the result of a section‑by‑section selection pass through every visually relevant block of the Brand ID, using the 3Degrees example as reference data. Each choice is paired with any schema implication it triggered.

Read alongside [field-relations.md](./field-relations.md).

---

## Decisions at a glance

| # | Block | JSON pointer | Chosen visual | Schema impact |
|---|-------|--------------|---------------|---------------|
| 1 | Brand name | `/meta/brandName` | **Business card + monogram icon + full logo** | 🛑 Missing: no logo asset field today |
| 2 | Summary / mission | `/profile/core/{brandSummary,missionOrPromise}` | **Pull quote** (Serif + left rail) | — |
| 3 | Personality / anti‑traits | `/profile/core/{personalityTraits,antiTraits}` | **Weighted spectrum** (paired poles, icons) | 🔧 Replace with controlled `traitSpectrum` |
| 4 | Audience segments | `/profile/audience/primarySegments[]` | **Persona cards** with inline priority funnel of needs | 🔧 Move `userNeedsPriority` into segments |
| — | ~~User needs priority~~ | ~~`/profile/audience/userNeedsPriority`~~ | *dropped, integrated into segment* | 🔧 Remove or derive |
| 5 | Relationship | `/profile/relationship/*` | **Stacked scales** (one per enum) | — |
| 6 | Voice | `/profile/voice/*` | **Rules framework + guardrails checklist** | 🔧 Remove `constantTraits`/`antiTraits`; structure as rules |
| 7 | Lexicon | `/profile/lexicon/entries[]` | **Dictionary entry** with contextual meaning + translation notes | 🔧 Add `contextualMeaning`, `translationNotes`, kind `domain_term` |
| 8 | Tone scenarios | `/profile/toneMatrix[]` | **Scenario cards** (one per context) | — (rename `toneMatrix` → `toneScenarios` still recommended) |
| 9 | Message hierarchy | `/profile/messaging/messageHierarchy[]` | **Type scale** (large serif → small) | — |
| — | ~~Terminology rules~~ | ~~`/profile/messaging/terminologyRules`~~ | *dropped, migrated* | 🔧 Remove entirely |
| 10 | Color system | `/profile/visual/colorSystem[]` | **Swatch cards** (name + hex) | — |
| 11 | Typography system | `/profile/visual/typographySystem[]` | **Slim specimen per role** (font in its own face + usage) | 🔧 Simplify: drop fallback array, drop weight |
| 12 | Do / don't | `/profile/examples/doDontPairs[]` | **Split cards** (green/red halves) | — |
| 13 | Evidence | `/evidence[]` | **Source cards** with captured + last verified dates | — |
| 14 | Annotations | `/annotations` | **Schema heatmap** (grid, tinted by confidence) | — |
| 15 | Audit | `/audit/*` | **Gauges + issue stack** | — |

Legend: 🔧 schema change proposed · 🛑 field missing, needs to be added.

---

## Schema proposals for v0.4 (consolidated)

Every visual choice above either fits today's schema or triggered a concrete proposal. Grouped by section.

### 3.1 Core — replace free‑string traits with a controlled spectrum

**Problem.** Today's `personalityTraits` and `antiTraits` are independent arrays of free strings. There is no implied pairing, no intensity, no controlled vocabulary — which means any visualisation either misleads (implying pairs that don't exist) or stays text‑only (tag pills).

**Proposal.**

```ts
// new
type TraitPair = {
  positivePole: TraitId   // enum — controlled vocab
  negativePole: TraitId   // enum — controlled vocab
  weight: number          // -1..1  (−1 = fully negative pole, +1 = fully positive)
  icon?: IconRef          // optional, from a controlled icon set (Lucide, Streamline)
  note?: string           // brand‑specific nuance
}

core.traitSpectrum: TraitPair[]
// personalityTraits + antiTraits removed
```

The enum `TraitId` is curated across the ecosystem (example pairs: `credible ↔ hypey`, `warm ↔ cool`, `playful ↔ serious`, `technical ↔ plain`, `formal ↔ casual`). Brands pick the pairs that are meaningful to them. Weights let a radar/spider plot render itself.

Icons are opt‑in, referenced by stable id. Free‑text `note` captures anything the vocabulary can't express — for traceability, not for rendering.

### 3.2 Audience — needs move into segments

**Problem.** `userNeedsPriority` lives at the audience root, but needs are obviously per‑segment in reality (enterprise buyers have different anxieties than end users).

**Proposal.**

```ts
AudienceSegment {
  name, description, knowledgeLevel, markets,
  needsPriority: Array<{
    label: string
    type: NeedType  // existing enum
    priority: number
  }>
}

// removed:
audience.userNeedsPriority
```

A derived, aggregated top‑needs view can be computed on demand (not a pinned field).

### 3.3 Voice — drop trait lists, become a rules framework

**Problem.** Voice traits duplicate core traits without saying anything structural about *how* the brand writes. Real voice guidance is procedural.

**Proposal.**

```ts
// removed:
voice.constantTraits
voice.antiTraits

// kept / restructured:
voice.jargonPolicy: {
  default: "avoid" | "contextual" | "embrace"
  firstUseDefinitions?: Record<TermId, string>  // uses lexicon ids
}
voice.plainLanguage: {
  targetReadingLevel?: number   // e.g. 8 for "8th grade", Flesch‑Kincaid
  maxSentenceLength?: number
  policy?: string
}
voice.claimsPolicy?: string
voice.personalityGuardrails: string[]
```

### 3.4 Lexicon — contextual meaning + translation notes

**Problem.** Today's lexicon captures words the brand *owns* (product names, methods). It can't express words the brand *interprets differently* than the dictionary — e.g. 3Degrees' "Enterprise" meaning large corporations, not "a company". This matters most for translators.

**Proposal.**

```ts
LexiconEntry {
  term
  definition                     // generic/dictionary definition (unchanged)
  contextualMeaning?: string     // NEW: what this term means inside this brand
  translationNotes?: Record<LocaleCode, string>   // NEW: e.g. "de-DE": "Konzerne, nicht Unternehmen"
  kind: "brand" | "product" | "service" | ... | "domain_term"   // extended enum
  // existing: aliases, forbiddenVariants, casingRule, usage, translationPolicy, …
}
```

### 3.5 Messaging — remove `terminologyRules`, migrate entries

**Problem.** `terminologyRules` and `lexicon.entries` overlap; `structureRules` already exists for true style rules.

**Proposal.**

```ts
// removed:
messaging.terminologyRules
```

Migration paths:
- Single‑term preferences (e.g. "we/our not its", "3Degrees not 3 Degrees") → `lexicon.entries` with appropriate `kind`.
- Cross‑cutting style rules (e.g. "use active voice", "Oxford comma") → `messaging.structureRules` (already exists).
- Pronoun preference → `relationship.pronounPolicy` (already exists).

### 3.6 Visual — typography simplified; logo assets added

**Problem.** `TypographyRule` today carries `fontFamily` as a fallback *array*, plus `weight` and `note`. Fallbacks are an implementation detail, not brand knowledge. Weights are technical. The valuable information is role → one font → what it's for.

**Problem 2.** No way to store a brand's actual logo files. `logoRules` has prose rules but no asset path.

**Proposal.**

```ts
TypographyRule {
  role: string
  fontFamily: string    // single family, no fallback array
  usage: string
  // weight, note removed
}

// NEW:
visual.logoAssets: Array<{
  type: "mark" | "wordmark" | "full" | "secondary"
  url: string
  format: "svg" | "png" | "webp" | "ai" | "pdf"
  usage?: string
  minSize?: number      // in px or mm, optional
}>
```

### 3.7 Naming rename (carried over from v0.4 wishlist)

- `toneMatrix` → `toneScenarios` (still: it's a list, not a matrix).
- `profile.examples` → `profile.illustrations` or `patterns` (to avoid collision with the `examples/` dir).

---

## Visual principles these choices reveal

Reading the selections as a whole, a clear aesthetic emerges:

- **Editorial, not dashboard.** The strong picks — pull quote, type scale, dictionary entry, specimen — are the moves of a well‑set document, not of a data UI. Scanbar, aber durch Typografie, nicht durch Dichte.
- **Small, strong visual payloads.** Two chart‑like elements (schema heatmap, audit gauges) carry the *state* of the document. Everything else renders the *content* in its most natural form.
- **Content first, rule second.** Rules (guardrails, tone scenarios) are present but always anchored in examples or context. Never a naked rule list.
- **Comparison beats enumeration.** Split cards, pairs, stacked scales — every place where a dimension has two poles, we show both sides, not just one.

---

## Open items (not yet decided)

1. **Controlled `TraitId` enum** — actual vocabulary needs curation. Start from 15–25 pairs drawn from existing brand guidelines research in `docs/brand-id/coverage/`.
2. **Icon set** — pick one (Lucide looks strongest for MIT‑licensed simplicity; Streamline Free is broader but noisier). Needs a small mapping `TraitId → IconRef`.
3. **Reading‑level scale** — `targetReadingLevel` wants a defined scale. Flesch‑Kincaid grade is the obvious default, but a simpler 1–5 ordinal ("plain / clear / standard / technical / expert") might be more useful for brand teams.
4. **Logo‑asset storage** — how to host the binary? Git LFS? Relative paths assuming a CDN? Out of scope for schema, needs docs.

---

## What to do with this brief

Next step is **not** to build ten variants again. Next step is:

1. Pick 2–3 of the visual primitives above (e.g. weighted spectrum, schema heatmap, persona card) and prototype them in isolation against the 3Degrees data — are they as scanbar in practice as they were in the exploration sheet?
2. Based on those prototypes, propose the schema amendments as a real v0.4 RFC in `docs/brand-id/`.
3. Build one full report that composes the chosen visuals end to end. Not ten skins — one intentional document.
