# RFC: Brand ID Schema v0.4

- **Status:** draft (Open items resolved 2026‑04‑18)
- **Date:** 2026‑04‑17, revised 2026‑04‑18
- **Supersedes:** v0.3.0 ([`src/brand-id.schema.ts`](../../src/brand-id.schema.ts))
- **Companion docs:** [field-relations.md](./field-relations.md) · [rendering-brief.md](./rendering-brief.md)

This RFC collects the schema changes implied by two parallel passes: the field‑relations analysis (which overlaps are redundant, which names lie) and the rendering brief (which fields don't carry enough structure to visualise honestly). It lays out the changes concretely enough to implement, with Zod snippets and a migration path.

It is deliberately **not** a sketch. Each change lists current shape, new shape, reason, kind (breaking / additive / rename), and migration. If a change needs curation work before it can ship (e.g. a controlled vocabulary), that is called out in the *Open items* section at the end rather than deferred quietly.

---

## Summary

| # | Change | Section | Kind |
|---|--------|---------|------|
| 1 | `core.personalityTraits` + `antiTraits` → `core.traitSpectrum` (controlled, weighted) | Core | **breaking** |
| 2 | `audience.userNeedsPriority` → moved into each `AudienceSegment.needsPriority` | Audience | **breaking** |
| 3 | `voice.constantTraits` + `voice.antiTraits` removed; voice restructured as rules | Voice | **breaking** |
| 4 | `LexiconEntry` gains `contextualMeaning`, `translationNotes`, `kind: domain_term` | Lexicon | additive |
| 5 | `messaging.terminologyRules` removed; entries migrate to lexicon or structureRules | Messaging | **breaking** |
| 6 | `TypographyRule` simplified: `fontFamily: string`, drop fallbacks, drop weight | Visual | **breaking** |
| 7 | New `visual.logoAssets` field | Visual | additive |
| 8 | `toneMatrix` → `toneScenarios` | Profile | rename |
| 9 | `profile.examples` → `profile.illustrations` | Profile | rename |
| 10 | `audit.missingFieldPaths` becomes a derived view | Audit | **breaking** |
| 11 | `profile.customSections` removed | Profile | **breaking** |
| 12 | Schema version bump `0.3.0` → `0.4.0` | Meta | **breaking** |

Six breaking changes, two renames, two additive fields, one derivation. The breaks are content consolidation, not structural upheaval — most v0.3 documents can be migrated with a mechanical script plus light editorial passes.

---

## 1 · Core traits as a controlled weighted spectrum

### Current shape

```ts
// src/brand-id.schema.ts, lines 408–416
export const CoreProfileSchema = z.object({
  brandSummary: NullableStringSchema,
  missionOrPromise: NullableStringSchema,
  brandSelfImage: NullableStringSchema,
  categoryContext: NullableStringSchema,
  personalityTraits: z.array(z.string()),
  antiTraits: z.array(z.string()),
});
```

### Problem

`personalityTraits` and `antiTraits` are free‑string arrays with no relationship to each other. There is no controlled vocabulary (so every brand invents its own synonyms), no notion of intensity (so every trait looks equally strong), and no implied pairing (so any visual that pairs them lies about the data).

### Proposal

```ts
// new — 45 curated pole identifiers, organised as 45 axes.
// Pair semantics live in documentation, not in the enum. The schema only
// constrains which strings are legal identifiers.
export const TraitIdSchema = z.enum([
  // Register
  "formal",          "informal",
  "casual",
  // Temperature & proximity
  "warm",            "cool",
  "intimate",        "distant",
  // Energy, playfulness
  "energetic",       "calm",
  "playful",         "serious",
  // Confidence, daring, modesty
  "confident",       "tentative",
  "daring",          "cautious",
  "modest",          "proud",
  // Complexity, sophistication
  "technical",       "plain",
  "sophisticated",   "simple",
  // Authority posture
  "authoritative",   "collaborative",
  "expert",          "peer",
  "directive",       "suggestive",
  // Emotional stance
  "optimistic",      "realistic",
  "enthusiastic",    "measured",
  // Credibility
  "credible",        "hypey",
  "authentic",       "promotional",
  "grounded",        "aspirational",
  // Precision, rigor
  "precise",         "fluid",
  "rigorous",        "loose",
  // Aesthetic weight
  "bold",            "restrained",
  "loud",            "quiet",
  "dramatic",        "subtle",
  // Orientation in time
  "innovative",      "traditional",
  "modern",          "heritage",
  "forward-looking", "settled",
  // Humor
  "witty",           "earnest",
  "dry",             "sincere",
  "expressive",      "reserved",
  // Care posture
  "nurturing",       "clinical",
  "compassionate",   "detached",
  "reassuring",      "informational",
  // Trust / finance posture
  "transparent",     "opaque",
  "prudent",         "opportunistic",
  "disciplined",     "spontaneous",
  // Luxury / craft posture
  "refined",         "pragmatic",
  "exclusive",       "accessible",
  "timeless",        "trendy",
  "crafted",         "industrial",
  // Entertainment posture
  "thrilling",       "steady",
  "immersive",       "observational",
  // Vision vs. grounding
  "practical",       "visionary",
  "curious",         "resolved",
  // Addressing
  "inclusive",       "selective",
]);
export type TraitId = z.infer<typeof TraitIdSchema>;

// Valid pole pairs — authors may only combine positive/negative poles from
// the canonical list below. Validated at parse time via a refinement.
export const TRAIT_AXES: ReadonlyArray<readonly [TraitId, TraitId]> = [
  ["formal", "informal"],
  ["formal", "casual"],
  ["warm", "cool"],
  ["intimate", "distant"],
  ["energetic", "calm"],
  ["playful", "serious"],
  ["confident", "tentative"],
  ["daring", "cautious"],
  ["modest", "proud"],
  ["technical", "plain"],
  ["sophisticated", "simple"],
  ["authoritative", "collaborative"],
  ["expert", "peer"],
  ["directive", "suggestive"],
  ["optimistic", "realistic"],
  ["enthusiastic", "measured"],
  ["credible", "hypey"],
  ["authentic", "promotional"],
  ["grounded", "aspirational"],
  ["precise", "fluid"],
  ["rigorous", "loose"],
  ["bold", "restrained"],
  ["loud", "quiet"],
  ["dramatic", "subtle"],
  ["innovative", "traditional"],
  ["modern", "heritage"],
  ["forward-looking", "settled"],
  ["witty", "earnest"],
  ["dry", "sincere"],
  ["expressive", "reserved"],
  ["nurturing", "clinical"],
  ["compassionate", "detached"],
  ["reassuring", "informational"],
  ["transparent", "opaque"],
  ["prudent", "opportunistic"],
  ["disciplined", "spontaneous"],
  ["refined", "pragmatic"],
  ["exclusive", "accessible"],
  ["timeless", "trendy"],
  ["crafted", "industrial"],
  ["thrilling", "steady"],
  ["immersive", "observational"],
  ["practical", "visionary"],
  ["curious", "resolved"],
  ["inclusive", "selective"],
] as const;

export const IconRefSchema = z.object({
  set: z.literal("lucide"),   // v0.4 supports Lucide only; expand in a later version
  name: z.string().min(1),    // icon name inside Lucide (e.g. "shield", "sparkles")
});
export type IconRef = z.infer<typeof IconRefSchema>;

export const TraitPairSchema = z
  .object({
    positivePole: TraitIdSchema,
    negativePole: TraitIdSchema,
    weight: z.number().min(-1).max(1),   // −1 = fully negative pole, 0 = neutral, +1 = fully positive
    icon: IconRefSchema.optional(),
    note: z.string().optional(),          // brand-specific nuance the enum can't capture
  })
  .refine(
    (p) =>
      TRAIT_AXES.some(
        ([a, b]) =>
          (p.positivePole === a && p.negativePole === b) ||
          (p.positivePole === b && p.negativePole === a),
      ),
    { message: "positivePole/negativePole must form a canonical axis from TRAIT_AXES" },
  );
export type TraitPair = z.infer<typeof TraitPairSchema>;

export const CoreProfileSchema = z.object({
  brandSummary: NullableStringSchema,
  missionOrPromise: NullableStringSchema,
  brandSelfImage: NullableStringSchema,
  categoryContext: NullableStringSchema,
  traitSpectrum: z.array(TraitPairSchema),
  // NOTE: personalityTraits + antiTraits removed
});
```

### Why

Enables the radar / spider / stacked‑scales visualisations proposed in the rendering brief without inventing data. Lets automation (LLM extractors, linters) reason about traits as identities with shared meaning across brands. Icons become attachable and stable.

### Kind

**Breaking.** No v0.3 document satisfies `traitSpectrum`.

### Migration

A best‑effort converter ships as `scripts/migrate-0.3-to-0.4.mjs`:

1. For each string in `personalityTraits`, attempt exact match against the positive side of `TraitIdSchema`. Unmatched strings go to `core.legacyTraits` (a temporary field kept only for manual triage, removed before release).
2. For each string in `antiTraits`, same but on the negative side.
3. Where a positive and negative match pair up on the same axis, emit a `TraitPair` with `weight: +1` (or `-1`). Where only one pole matches, emit with `weight: 0.5` (or `-0.5`).
4. All unmatched strings and all pairs with `note: "review needed"` land in an annotation for `/profile/core/traitSpectrum` with `status: "needs_review"`.

This means the tool gets you to a runnable v0.4 doc, but editors still need to reconcile the vocabulary.

---

## 2 · User needs move into segments

### Current shape

```ts
// lines 293–307, 418–425
export const AudienceSegmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  knowledgeLevel: KnowledgeLevelSchema.optional(),
  needs: z.array(z.string()).optional(),          // ← free strings, per segment
  markets: z.array(z.string()).optional(),
});

export const UserNeedSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["task", "anxiety", "intent", "job_to_be_done", "other"]),
  priority: z.number().int().positive().optional(),
});

export const AudienceProfileSchema = z.object({
  primarySegments: z.array(AudienceSegmentSchema),
  secondarySegments: z.array(AudienceSegmentSchema),
  literacyOrDomainAssumptions: NullableStringSchema,
  globalAudienceNotes: NullableStringSchema,
  userNeedsPriority: z.array(UserNeedSchema),     // ← global, not per segment
});
```

### Problem

Needs are obviously segment‑specific (enterprise buyers and end users don't share anxieties) but the strong `UserNeed` structure is attached to the root while segments get only a weak `needs: string[]`.

### Proposal

```ts
export const AudienceSegmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  knowledgeLevel: KnowledgeLevelSchema.optional(),
  markets: z.array(z.string()).optional(),
  needsPriority: z.array(UserNeedSchema),   // NEW, replaces the weak `needs: string[]`
});

export const AudienceProfileSchema = z.object({
  primarySegments: z.array(AudienceSegmentSchema),
  secondarySegments: z.array(AudienceSegmentSchema),
  literacyOrDomainAssumptions: NullableStringSchema,
  globalAudienceNotes: NullableStringSchema,
  // userNeedsPriority removed. Aggregate views are a render concern, not a schema one.
});
```

### Why

Enables the persona‑card‑with‑inline‑funnel layout from the rendering brief. Removes the global/per‑segment redundancy. Preserves the `UserNeed` type, which is already good.

### Kind

**Breaking.**

### Migration

1. For each segment, copy its `needs: string[]` into `needsPriority`, each as `{ label, type: "task", priority: 99 }`. The priorities and types will need editorial review — a `needs_review` annotation is written for every migrated segment.
2. For each global `userNeedsPriority` entry, append it to the first primary segment as a *starter* with a review annotation. Editors have to reassign needs to the right segments.
3. Drop `userNeedsPriority` from the document.

Rough migration — the structural change is the point, not preserving ambiguous existing data.

---

## 3 · Voice restructured as a rules framework

### Current shape

```ts
// lines 439–446
export const VoiceProfileSchema = z.object({
  constantTraits: z.array(z.string()),
  antiTraits: z.array(z.string()),
  jargonPolicy: NullableStringSchema,
  claimsPolicy: NullableStringSchema,
  personalityGuardrails: z.array(z.string()),
});
```

### Problem

`constantTraits` / `antiTraits` duplicate `core.personalityTraits` / `antiTraits` with no structural difference — just a different authoring moment. The real voice‑specific signal is the rules (jargon, plain language, claims, guardrails), which today are half‑present and half‑free‑text.

### Proposal

```ts
export const JargonDefaultSchema = z.enum(["avoid", "contextual", "embrace"]);

export const JargonPolicySchema = z.object({
  default: JargonDefaultSchema,
  firstUseDefinitions: z.record(z.string(), z.string()).optional(),
  // keys are lexicon entry terms, values are the preferred first-use definition
  notes: z.string().optional(),
});

export const PlainLanguagePolicySchema = z.object({
  // Flesch-Kincaid grade level (US school grade). Typical targets:
  // 6–8 = mass-audience consumer copy; 9–12 = professional/editorial;
  // 13+ = academic/expert. Measurable by standard tools; for non-English locales
  // use a recognised language-specific analogue (Flesch-Amstad for German, etc.).
  readingLevel: z.number().positive().optional(),
  maxSentenceLength: z.number().int().positive().optional(),
  notes: z.string().optional(),
});

export const VoiceProfileSchema = z.object({
  jargonPolicy: JargonPolicySchema.nullable(),
  plainLanguage: PlainLanguagePolicySchema.nullable(),
  claimsPolicy: NullableStringSchema,
  personalityGuardrails: z.array(z.string()),
  // constantTraits + antiTraits removed. The throughline from identity to voice
  // is now expressed only via core.traitSpectrum.
});
```

### Why

Voice becomes about *how the brand writes*, not *what adjectives the brand would use about itself* (that's core's job). Editors get fewer redundant fields, structured rules let automation check copy (reading level, first‑use definitions).

### Kind

**Breaking.**

### Migration

1. Discard `constantTraits` and `antiTraits`. They overlapped with `core.personalityTraits` anyway.
2. Wrap the existing `jargonPolicy` string as `{ default: "avoid", notes: "<existing text>" }` by default; editor reviews.
3. Leave `plainLanguage` null on migration; editors set it when ready.

---

## 4 · Lexicon gains contextual meaning and translation notes

### Current shape

```ts
// lines 347–360
export const LexiconEntrySchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  kind: LexiconEntryKindSchema,
  canonicalSpelling: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  forbiddenVariants: z.array(z.string()).optional(),
  casingRule: z.string().optional(),
  usage: z.string().optional(),
  contexts: z.array(z.string()).optional(),
  translationPolicy: LexiconTranslationPolicySchema.optional(),
  notes: z.string().optional(),
});
```

### Problem

Today's lexicon captures words the brand *owns* (product names, methods, legal terms). It cannot express words the brand *uses differently than the dictionary* — e.g. "Enterprise" at 3Degrees meaning large corporations specifically, not "a company" generically. This matters most for translators, but also for any agent trying to generate copy correctly.

### Proposal

```ts
// extend the existing kind enum
export const LexiconEntryKindSchema = z.enum([
  "brand", "product", "service", "feature", "method", "program",
  "legal", "industry", "people",
  "domain_term",      // NEW: generic word with brand-specific meaning
  "other",
]);

export const LexiconEntrySchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),        // generic dictionary definition
  contextualMeaning: z.string().optional(),     // NEW: what this brand means by it
  translationNotes: z.record(LocaleCodeSchema, z.string()).optional(),  // NEW
  kind: LexiconEntryKindSchema,
  canonicalSpelling: z.string().optional(),
  aliases: z.array(z.string()).optional(),
  forbiddenVariants: z.array(z.string()).optional(),
  casingRule: z.string().optional(),
  usage: z.string().optional(),
  contexts: z.array(z.string()).optional(),
  translationPolicy: LexiconTranslationPolicySchema.optional(),
  notes: z.string().optional(),
});
```

### Why

Lets the lexicon hold both the generic and brand‑specific meaning of the same word, plus per‑locale translation hints. Enables translator briefs, glossary exports, and renders that can say "this word is special here".

### Kind

Additive (all new fields optional; the new `kind` value is additive).

### Migration

No migration needed. Existing v0.3 entries validate against v0.4 as‑is.

---

## 5 · Remove `terminologyRules`, migrate entries

### Current shape

```ts
// lines 339–345, 454–462
export const TerminologyRuleSchema = z.object({
  preferredTerm: z.string().min(1),
  forbiddenTerms: z.array(z.string()).optional(),
  rationale: z.string().optional(),
  notes: z.string().optional(),
});

// …inside MessagingProfileSchema:
terminologyRules: z.array(TerminologyRuleSchema),
```

### Problem

`terminologyRules` and `lexicon.entries` both encode "prefer X, not Y". `lexicon.entries` is richer (canonical spelling, aliases, casing, translation). `messaging.structureRules` already holds cross‑cutting style rules. `relationship.pronounPolicy` already holds pronoun guidance. So every content type `terminologyRules` was trying to capture has a better home.

### Proposal

```ts
export const MessagingProfileSchema = z.object({
  primaryObjectives: z.array(MessagingObjectiveSchema),
  messageHierarchy: z.array(MessageLayerSchema),
  structureRules: z.array(z.string()),
  // terminologyRules removed
  ctaStyle: NullableStringSchema,
  evidenceAndClaimsRules: z.array(z.string()),
  localizationRules: z.array(z.string()).nullable(),
});
```

### Kind

**Breaking.**

### Migration

The migration script triages each `terminologyRule`:

- If it is a single‑term preference ("3Degrees" not "3 Degrees", "Supplier REach" not "Supplier Reach") → create a matching `lexicon.entries[]` entry.
- If it is a cross‑cutting style rule ("use active voice", "Oxford comma") → append to `messaging.structureRules`.
- If it is a pronoun preference ("we/our not its") → append or merge with `relationship.pronounPolicy`.
- If none of the above fits cleanly → drop to `customSections.legacyTerminology` and write a `needs_review` annotation.

---

## 6 · Typography simplified

### Current shape

```ts
// lines 370–377
export const TypographyRuleSchema = z.object({
  role: z.string().min(1),
  fontFamily: z.array(z.string()).optional(),   // fallback array
  weight: z.string().optional(),                // technical variant
  usage: z.string().optional(),
  note: z.string().optional(),
});
```

### Problem

Fallbacks are an implementation detail of CSS, not brand knowledge. Weights are technical variants of any given family, not brand decisions. The actually brand‑defining fact is: *which font plays which role, and what is it for*.

### Proposal

```ts
export const TypographyRuleSchema = z.object({
  role: z.string().min(1),
  fontFamily: z.string().min(1),   // single family, required
  usage: z.string().min(1),         // required — "what is this for?"
  // weight, note, fallback-array removed
});
```

### Why

Renders become honest: we can specimen the font, not a string like `"Arnhem, Georgia, serif"`. Brand authors get fewer knobs, more clarity.

### Kind

**Breaking.**

### Migration

1. If `fontFamily` is an array, take the first entry.
2. Drop `weight` and `note`. If `note` carried meaningful guidance, append to `usage` or to `customSections.typographyNotes` for manual review.

---

## 7 · New `visual.logoAssets`

### Current shape

No field. `visual.logoRules` exists but only as prose rules, no asset paths.

### Proposal

```ts
export const LogoAssetTypeSchema = z.enum([
  "mark",        // the standalone icon/mark (monogram, emblem)
  "wordmark",    // text-only logotype
  "full",        // mark + wordmark combined
  "secondary",   // any additional approved variant
]);

export const LogoAssetFormatSchema = z.enum(["svg", "png", "webp", "ai", "pdf"]);

export const LogoAssetSchema = z.object({
  type: LogoAssetTypeSchema,
  // Repo-relative path from the YAML document. Example: "assets/brand/3degrees/mark.svg".
  // Absolute URLs are *not* allowed in v0.4: the Brand ID must stay self-contained
  // and offline-usable. See docs/brand-id/assets.md for the repo layout convention.
  path: z.string().min(1).refine((p) => !/^https?:\/\//.test(p), {
    message: "logoAssets.path must be repo-relative; absolute URLs are not allowed in v0.4",
  }),
  format: LogoAssetFormatSchema,
  usage: z.string().optional(),  // "dark backgrounds", "favicon", etc.
  minSize: z.number().optional(),// display minimum in px
  // Intentionally NO colorVariant enum — brands pick their own.
  // Intentionally NO theme:"light"|"dark" — express via multiple assets with usage.
});
export type LogoAsset = z.infer<typeof LogoAssetSchema>;

export const VisualProfileSchema = z.object({
  logoRules: z.array(z.string()),
  logoAssets: z.array(LogoAssetSchema),       // NEW
  colorSystem: z.array(ColorTokenSchema),
  typographySystem: z.array(TypographyRuleSchema),
  imageryOrSymbolRules: z.array(z.string()),
  accessibilityRules: z.array(z.string()),
  coBrandingRules: z.array(z.string()),
});
```

### Why

Brand identity renders need to show an actual logo, not just describe rules about one. Enables the "business card + monogram + full logo" composition from the rendering brief.

### Kind

Additive. Empty array is valid (current behavior).

### Migration

No migration needed. Documents that want logos add them when ready.

### Convention

Logo files live **inside the brand repo** as `assets/brand/<brandSlug>/<asset>`. The schema refuses absolute URLs so that a brand record is always offline‑usable. The convention is documented in `docs/brand-id/assets.md` (new companion doc, created alongside v0.4 implementation).

---

## 8 · `toneMatrix` → `toneScenarios`

### Current shape

```ts
// line 513
toneMatrix: z.array(ToneScenarioSchema),
```

### Problem

It's not a matrix, it's a list of scenarios. The existing element type is literally called `ToneScenario`.

### Proposal

```ts
toneScenarios: z.array(ToneScenarioSchema),
```

Also update `BrandProfileSectionKeySchema` and the renderable section metadata accordingly.

### Kind

**Rename (breaking for field path).**

### Migration

Mechanical: s/toneMatrix/toneScenarios/. Also update any `/profile/toneMatrix/…` annotation paths.

---

## 9 · `profile.examples` → `profile.illustrations`

### Current shape

```ts
// lines 486–491, 517
examples: ExamplesProfileSchema,
```

### Problem

Collides with the repo's top‑level `examples/` directory (sample documents). Editors scanning the spec have read this as "examples of the sample", not "illustrative content inside the sample".

### Proposal

Rename the profile section to `illustrations`. Keep the inner types (`DoDontPair`, `ChannelExample`, `ScenarioExample`) as is.

```ts
illustrations: IllustrationsProfileSchema,

export const IllustrationsProfileSchema = z.object({
  doDontPairs: z.array(DoDontPairSchema),
  channelExamples: z.array(ChannelExampleSchema),
  scenarioExamples: z.array(ScenarioExampleSchema),
});
```

### Kind

**Rename (breaking for field path).**

### Migration

Mechanical: s/profile.examples/profile.illustrations/.

---

## 10 · `audit.missingFieldPaths` as derived view

### Current shape

```ts
// line 560
missingFieldPaths: z.array(BrandFieldPathSchema),
```

### Problem

Editors maintain this by hand, but `annotations[path].status === "needs_review"` already records incompleteness, plus an empty field is detectable statically. Two sources of truth.

### Proposal

Remove from the stored schema. Export a helper:

```ts
// src/brand-id.audit.ts (new file)
import type { BrandIdDocument, BrandFieldPath } from "./brand-id.schema.js";

export function deriveMissingFieldPaths(doc: BrandIdDocument): BrandFieldPath[] {
  const out: BrandFieldPath[] = [];
  for (const [path, ann] of Object.entries(doc.annotations)) {
    if (ann.status === "needs_review") out.push(path as BrandFieldPath);
  }
  // plus: walk the profile tree, any null/empty-array leaf that is not
  // annotated with status === "not_specified" gets added.
  return out;
}
```

### Why

One source of truth. Editors stop drifting between two lists.

### Kind

**Breaking** (field removed from `BrandAuditSchema`).

### Migration

Drop `missingFieldPaths`. Readers that need it call `deriveMissingFieldPaths(doc)`.

---

## 11 · Remove `profile.customSections`

### Current shape

```ts
// lines 531–535
export const BrandProfileSchema = BrandProfileSectionsSchema.extend({
  localeOverrides: z.array(LocaleOverrideSchema),
  customSections: z.record(z.string(), z.unknown()),   // ← unrestricted escape hatch
});
```

### Problem

`customSections` as an open `Record<string, unknown>` undermines the whole point of a Zod‑validated schema: anything that doesn't fit stays as free JSON, creating a permanent drift vector. If a concept is worth keeping, it deserves structure; if it isn't, it shouldn't be in the document.

### Proposal

```ts
export const BrandProfileSchema = BrandProfileSectionsSchema.extend({
  localeOverrides: z.array(LocaleOverrideSchema),
  // customSections removed entirely.
});
```

### Why

Clean cut. Every piece of a v0.4 brand must fit the schema or be in a proper RFC for the next version. Migration from v0.3 may discard content that doesn't fit — that's the point.

### Kind

**Breaking.**

### Migration

The migrator emits a warning for every non‑empty `customSections` key and writes its content to a sibling file `<slug>.brand-id.custom.json` for archival. That file is not schema‑validated and not used by any consumer. Brand authors decide whether to re‑introduce the content via a proper schema extension in a follow‑up release.

---

## 12 · Schema version bump

```ts
export const BrandIdSchemaVersionSchema = z.literal("0.4.0");
```

Any v0.3 document with `schema.version === "0.3.0"` should be rejected by the v0.4 parser. The migration script updates the literal in the YAML meta block.

---

## Fields staying unchanged in v0.4

For completeness — these were reviewed and are **not** changing in v0.4:

- `BrandIdMeta` (all fields). `seedInputs`, `tags`, locale fields all OK.
- `EvidenceItem`. `capturedAt` and `lastVerifiedAt` already present; the rendering brief needs them, not a change.
- `ToneScenario` inner shape (context/userState/toneShift/do/dont/channelBias).
- `MessageLayer`, `DoDontPair`, `ChannelExample`, `ScenarioExample`, `GovernanceOwner`.
- `RelationshipProfile` (all fields).
- `ColorToken` (will be enriched downstream via annotations, not the schema).
- `BrandAnnotations`, `FieldAnnotation`, `Confidence`.

---

## Resolved decisions (formerly "open items")

All five open items from the first draft are now decided. Recorded here for traceability; each is already reflected in the normative sections above.

### Resolved 1 · Trait vocabulary — mid‑size strict enum

45 controlled pole identifiers organised as 45 canonical axes. `TraitId` is a strict Zod enum; `TRAIT_AXES` constrains which pole pairs are legal combinations via a schema refinement. Brand‑specific nuance goes in the optional `TraitPair.note` string — it is *not* a second axis system.

Canonical axes (positive ↔ negative):

1. formal ↔ informal · 2. formal ↔ casual · 3. warm ↔ cool · 4. intimate ↔ distant · 5. energetic ↔ calm · 6. playful ↔ serious · 7. confident ↔ tentative · 8. daring ↔ cautious · 9. modest ↔ proud · 10. technical ↔ plain · 11. sophisticated ↔ simple · 12. authoritative ↔ collaborative · 13. expert ↔ peer · 14. directive ↔ suggestive · 15. optimistic ↔ realistic · 16. enthusiastic ↔ measured · 17. credible ↔ hypey · 18. authentic ↔ promotional · 19. grounded ↔ aspirational · 20. precise ↔ fluid · 21. rigorous ↔ loose · 22. bold ↔ restrained · 23. loud ↔ quiet · 24. dramatic ↔ subtle · 25. innovative ↔ traditional · 26. modern ↔ heritage · 27. forward‑looking ↔ settled · 28. witty ↔ earnest · 29. dry ↔ sincere · 30. expressive ↔ reserved · 31. nurturing ↔ clinical · 32. compassionate ↔ detached · 33. reassuring ↔ informational · 34. transparent ↔ opaque · 35. prudent ↔ opportunistic · 36. disciplined ↔ spontaneous · 37. refined ↔ pragmatic · 38. exclusive ↔ accessible · 39. timeless ↔ trendy · 40. crafted ↔ industrial · 41. thrilling ↔ steady · 42. immersive ↔ observational · 43. practical ↔ visionary · 44. curious ↔ resolved · 45. inclusive ↔ selective.

### Resolved 2 · Icon set — Lucide

`IconRef.set` is a `z.literal("lucide")` in v0.4. A second set (Streamline "Ultimate Regular Free" was the discussed alternative) can be added in v0.5 or later when the install story is solved; the literal becomes a two‑value enum at that point.

### Resolved 3 · Reading‑level scale — Flesch‑Kincaid grade only

`voice.plainLanguage.readingLevel` is a single positive number, interpreted as U.S. school‑grade Flesch‑Kincaid. Non‑English locales use the recognised language analogue (e.g. Flesch‑Amstad for German) but report against the same numeric scale. No ordinal fallback in v0.4 — the simpler single‑number shape wins.

### Resolved 4 · Logo‑asset storage — repo‑relative paths only

`LogoAsset.path` (renamed from `url` to avoid the misleading verb) must be a relative path within the brand repo. Absolute URLs are rejected by schema refinement. Files live at `assets/brand/<brandSlug>/<asset>`. Convention documented in `docs/brand-id/assets.md` (ships with v0.4 implementation).

### Resolved 5 · customSections — removed

See change #11 above. No escape hatch. Content that doesn't fit v0.4 gets archived to a sibling `.custom.json` file by the migrator and is otherwise out of scope.

---

## Rollout

1. **This RFC review** — decide on Open items 1–5.
2. **Implement v0.4** in `src/brand-id.schema.ts`. Bump version literal. Add new types in alphabetical position.
3. **Write migrator** `scripts/migrate-0.3-to-0.4.mjs`. Deterministic per §Migration blocks above, with a test that round‑trips the 3Degrees example.
4. **Migrate `examples/3degrees.brand-id.yaml`**. Hand‑review the result. This becomes the v0.4 reference.
5. **Update smoke test** `scripts/smoke-react-report.mjs` and the React components to match the new structure. Drop references to removed fields.
6. **Tag** `v0.4.0-rc.1`. Collect feedback on the migrated 3Degrees example from one or two real brand authors before finalising.

---

## Non‑goals

Explicitly out of scope for this RFC:

- **Motion / sonic voice.** Acknowledged gaps in the current schema (see field‑relations §4.1–4.2), but solving them is its own RFC.
- **Competitor positioning.** Acknowledged gap, own RFC.
- **Brand archetype (Jungian).** Acknowledged omission; if added later, goes in a new `core.archetype` field, not retrofitted to traits.
- **Any render‑layer change beyond what the schema forces.** The rendering brief stays as a separate document; the schema should not encode rendering decisions.
