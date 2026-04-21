# Field Relations — How the Brand ID Sections Fit Together

Status: proposal (2026‑04‑17). Purpose: clarify how the ten profile sections (`core`, `audience`, `relationship`, `voice`, `lexicon`, `toneMatrix`, `messaging`, `visual`, `governance`, `examples`) relate to each other, where the model currently overlaps or under‑specifies, and which naming / documentation changes would make the schema easier to author and consume.

This document does **not** change the schema. It is the basis for future schema RFCs (`v0.4`+) and a working guide for editors filling out a Brand ID today.

---

## 1. A quick mental model

The Brand ID answers four separate questions, in four layers:

| Layer | Question | Sections |
|-------|----------|----------|
| **Identity** | *Who* is the brand? | `core` |
| **Situation** | *To whom* and *in what posture*? | `audience`, `relationship` |
| **Expression** | *How* does the brand sound, look, and name things? | `voice`, `lexicon`, `toneMatrix`, `messaging`, `visual` |
| **Operation** | *Who owns it* and *where does proof live*? | `governance`, `examples`, plus top‑level `evidence`, `annotations`, `audit` |

Sections inside the same layer rarely conflict. Problems arise where two layers look similar — e.g. `core.personalityTraits` (Identity) vs. `voice.constantTraits` (Expression) — but describe *different* things. The next section makes those differences explicit.

---

## 2. Overlaps & how to resolve them

Four pairs in the current schema look like duplicates. They are not — but the spec does not say so anywhere. Each needs an authoring rule.

### 2.1 `core.personalityTraits` / `antiTraits` ↔ `voice.constantTraits` / `antiTraits`

**Symptom.** In `examples/3degrees.brand-id.yaml`, `core.personalityTraits` = `[credible, creative, insightful, authentic, thoughtful, determined, effective]` and `voice.constantTraits` = `[smart, authentic, genuine, trusted thought partner, honest, confident, warm, business casual]`. They overlap in spirit, diverge in phrasing. A reader would reasonably ask which one is the truth.

**Proposed rule.**

- `core.personalityTraits` is the brand's **self‑description as an entity** — who it is even when silent. Traits belong here if they would still be true if the brand never wrote a sentence. Example: *determined*, *effective*, *credible*.
- `voice.constantTraits` is the **surface the brand shows in language** — traits that any one piece of copy should be able to demonstrate. Example: *warm*, *confident*, *business casual*, *trusted thought partner*.
- The two lists may share vocabulary (e.g. *authentic* in both) but should not be assumed to be the same list. Editors should be able to answer: "could I drop this trait from voice and still recognise the brand in ten seconds of copy?" If no, it belongs in voice.

The same partition applies to `antiTraits`.

### 2.2 `lexicon.entries` ↔ `messaging.terminologyRules`

**Symptom.** Both encode "prefer X, avoid Y". `lexicon.entries` is richer: it has `aliases`, `forbiddenVariants`, `casingRule`, `translationPolicy`, `kind`. `messaging.terminologyRules` is a flat `{ preferredTerm, forbiddenTerms, rationale, notes }`.

**Proposed rule.**

- `lexicon.entries` is the **registry of words the brand owns or depends on**: product names, method names, industry jargon the brand uses, legal phrasings. Each entry has an identity (`term`, `canonicalSpelling`, `kind`).
- `messaging.terminologyRules` is the **editorial word‑choice policy** that does *not* warrant a lexicon entry — e.g. "use *we/our*, not *its*", "avoid *leverage* as a verb". These are style rules, not vocabulary entries.

For anything that is a noun phrase the brand genuinely owns (product, service, method, feature, legal phrase) — it belongs in `lexicon`. `terminologyRules` is reserved for stylistic preferences that apply across all copy.

**Future option (`v0.4`).** Let `messaging.terminologyRules[].preferredTerm` optionally reference a `lexicon.entries[].term` by id, to avoid duplicating the canonical form. Out of scope here.

### 2.3 `examples.doDontPairs` ↔ `toneMatrix[].do` / `dont`

**Symptom.** Both carry do/don't guidance.

**Proposed rule.**

- `toneMatrix[].do` / `dont` is **context‑bound**: it applies only when the `context` (e.g. `sales`, `onboarding`, `crisis`) and `userState` match. Example: *"In sales: do sound confident and warm; don't drift into startup hype."*
- `examples.doDontPairs` is **context‑free**: general editorial examples that hold across channels. Example: *"Do write `help us reduce emissions`; don't write `decarbonise your value chain`."*

A pair belongs in `toneMatrix` iff it only makes sense given a specific context.

### 2.4 `audit.missingFieldPaths` ↔ `annotations[path].status === "needs_review"`

**Symptom.** Two orthogonal ways to say "this field is incomplete".

**Proposed rule.**

- `annotations` is the **per‑field authoritative record**: confidence, basis, sources, status.
- `audit.missingFieldPaths` is a **derived index**: a materialised view of paths where either no content exists or the annotation status says `needs_review`. Editors should not write this field by hand; tools should regenerate it from annotations and content.

Implementation note: a small helper (`deriveMissingFieldPaths(document)`) in `src/brand-id.*` could collapse this from two sources of truth to one. Tracked separately.

---

## 3. Naming frictions

Small, but each one trips up new authors.

### 3.1 `toneMatrix` → `toneScenarios`

It is not a matrix (rows × columns). It is a list of scenarios, each with a context, state, and do/don't. The metaphor suggests a 2‑D decision surface that doesn't exist. `toneScenarios` is the honest name and still plural‑array‑obvious to a developer.

### 3.2 `profile.examples` → `illustrations` or `patterns`

The repository already has an `examples/` directory (sample Brand IDs). Calling a profile section `examples` collides conceptually — an editor opening `examples.doDontPairs` may assume this is *about* the sample brand, not *inside* it. `illustrations` or `patterns` disambiguates.

### 3.3 `core`, `voice`, `relationship`, `messaging` are fine — but the boundary needs a glossary

Keep the names; add a one‑page glossary ("Core ≠ Voice ≠ Relationship ≠ Messaging") that authors read once and return to when they're unsure where a statement goes. Include two or three real examples per pairing.

### 3.4 `audit` vs. `annotations`

Both are "review metadata". They do not overlap in scope but they do overlap in the editor's intuition.

- `annotations` is **per‑field** (keyed by JSON Pointer). It says: *how confident are we about this specific node?*
- `audit` is **per‑document**. It says: *overall, where are we? what's open? when was this last human‑reviewed?*

A doc page with one diagram separating the two would remove most of the confusion.

---

## 4. Things the schema does not capture yet

These are notable gaps that came up while reviewing the `3degrees` example and thinking about rendering native apps on top of the data. None are urgent; they are candidates for a `v0.4` discussion.

### 4.1 Motion / animation voice

Brands have motion‑language opinions (fast cuts vs. slow reveals, ease curves, whether to animate charts). For any native‑app‑style rendering this is load‑bearing. Today: not capturable. Suggested shape: a small `visual.motionRules: string[]` plus structured tokens (`durationScale`, `easingDefault`).

### 4.2 Sonic / audio voice

Jingles, audio logos, voice‑over guidance. Missing entirely. Many B2B brands skip this; others (financial services, broadcast) treat it as primary.

### 4.3 Plain‑language / reading‑level policy

`voice.jargonPolicy` is a single free‑text string. For brands with regulatory or accessibility commitments, a structured field is worth having: *target Flesch‑Kincaid grade*, *max sentence length*, *permitted jargon density*, *when to define a term on first use*.

### 4.4 Naming methodology

`lexicon.entries` captures *existing* product and method names. It does not capture *how* the brand names new things ("we combine a verb and a geographic referent", "we avoid animal names after 2019"). A small `lexicon.namingConventions: string[]` would do.

### 4.5 Competitor / positioning context

`core.categoryContext` is free text. No structured notion of who the brand compares itself to, what it does differently, or which category labels it rejects. Not trivial to model — but worth thinking about.

### 4.6 Archetype (Jungian) — deliberate omission?

Commonly used in brand workshops (*Hero*, *Sage*, *Caregiver*, …). Currently absent. If the omission is intentional (too reductive, too subjective), that deserves one sentence in the docs so the question doesn't come up repeatedly.

---

## 5. Documentation that should exist

The schema has good reference docs (every field has a Zod description). What's missing is *how to use it*.

1. **"How do these sections fit together?"** — this document, in the repository, linked from the schema file's top comment.
2. **"What goes in which field?"** — a short editor's guide with: one paragraph per section, a good example, a common mistake, and a cross‑reference to neighbouring sections.
3. **"When do I update content vs. just set an annotation?"** — workflow guide. Rule of thumb: update content when the statement is wrong; set or update an annotation when the statement is right but you want to record how sure we are, or flag it for review.
4. **Section relationship diagram** — a single page showing the four‑layer model above, with arrows for the four overlaps and the four naming frictions. One image, no paragraphs.

The first three can be plain Markdown in `docs/brand-id/`. The diagram can be an SVG checked into `docs/brand-id/assets/` and referenced from this file.

---

## 6. Nothing changes today

The Brand ID schema stays as it is. This document:

- gives editors a decision rule for each known overlap,
- names the renaming we would propose in `v0.4`,
- lists the four gaps worth debating,
- points to four doc pages that should exist.

No migration. No code change. No YAML rewrites.
