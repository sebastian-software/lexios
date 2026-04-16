# Brand ID v0

Stand: 2026-04-10

## Summary

`Brand ID` is a Markdown-first, schema-ready specification for how a brand defines itself across language, relationship, visuals, and governance.

It is designed to answer one practical question:

How should this brand look, speak, relate, decide, and constrain usage across channels?

The public corpus suggests that a useful brand specification must capture all of the following in one place:

- what the brand believes it is
- who it is for
- how it addresses people
- how tone shifts by situation
- how messages are structured
- how the visual system is governed
- who can approve or override usage

## Design Principles

1. Separate stable `voice` from situational `tone`.
2. Model `relationship` explicitly instead of hiding it inside copy examples.
3. Treat `address_form` and `register` as first-class fields.
4. Keep visual and verbal identity in the same spec.
5. Capture localization and accessibility where the rules actually live.
6. Prefer `not_specified` over invented detail.
7. Allow inferred observations, but label them as inference.

## Top-Level Structure

| Section | Status in v0 | Why it exists |
| --- | --- | --- |
| `core` | Required | Anchors mission, personality, and self-image |
| `audience` | Required | Defines who the brand is actually speaking to |
| `relationship` | Required | Makes stance, distance, authority, and address form explicit |
| `voice` | Required | Captures stable verbal character and anti-traits |
| `tone_matrix` | Required | Captures context-specific shifts without changing voice |
| `messaging` | Required | Encodes structure, claims, terminology, and CTA behavior |
| `visual` | Required | Keeps logo, color, typography, and usage rules attached to the same identity object |
| `governance` | Required | Defines scope, precedence, ownership, and approvals |
| `examples` | Required | Makes the abstract model testable and teachable |

## Canonical Shape

```yaml
brand_id_version: "0"
brand_name: ""
source_basis: []

core:
  brand_summary: ""
  mission_or_promise: ""
  brand_self_image: ""
  category_context: ""
  personality_traits: []
  anti_traits: []

audience:
  primary_segments: []
  secondary_segments: []
  literacy_or_domain_assumptions: ""
  global_audience_notes: ""
  user_needs_priority: []

relationship:
  address_form:
    linguistic_form: ""
    notes: ""
  register:
    default_level: ""
    adaptation_policy: ""
  role: ""
  stance: ""
  authority_level: ""
  customer_view: ""
  pronoun_policy: ""
  humor_distance: ""

voice:
  constant_traits: []
  anti_traits: []
  jargon_policy: ""
  claims_policy: ""
  personality_guardrails: []

tone_matrix:
  - context: ""
    user_state: ""
    tone_shift: ""
    do: []
    dont: []

messaging:
  primary_objectives: []
  message_hierarchy: []
  structure_rules: []
  terminology_rules: []
  cta_style: ""
  evidence_and_claims_rules: []
  localization_rules: []

visual:
  logo_rules: []
  color_system: []
  typography_system: []
  imagery_or_symbol_rules: []
  accessibility_rules: []
  co_branding_rules: []

governance:
  applies_to: []
  source_of_truth: []
  precedence_rules: []
  owners: []
  approval_rules: []
  review_cycle: ""
  exceptions_policy: ""

examples:
  do_dont_pairs: []
  channel_examples: []
  scenario_examples: []
```

## Section Definitions

### `core`

Purpose:

- define what the brand is trying to be
- capture its internal self-image before channel adaptation starts

Recommended fields:

- `brand_summary`: one sentence, external-facing
- `mission_or_promise`: what the brand believes it helps people do
- `brand_self_image`: how the brand implicitly sees its own role
- `category_context`: market or institutional context
- `personality_traits`: stable brand descriptors
- `anti_traits`: what the brand should not feel like

### `audience`

Purpose:

- define who the brand speaks to, not just who buys

Recommended fields:

- `primary_segments`: target audiences with needs and knowledge level
- `secondary_segments`: audiences who matter but are not optimized first
- `literacy_or_domain_assumptions`: how much prior knowledge is assumed
- `global_audience_notes`: multilingual or cross-cultural constraints
- `user_needs_priority`: ranked tasks, anxieties, or intents

### `relationship`

Purpose:

- encode the social contract between brand and audience

Recommended fields:

- `address_form.linguistic_form`: `du`, `sie`, `you`, mixed, or `not_applicable`
- `register.default_level`: suggested enum `formal`, `neutral`, `informal`, `adaptive`
- `register.adaptation_policy`: when the register may shift
- `role`: guide, peer, teacher, authority, host, expert partner
- `stance`: what the brand tries to do for the audience
- `authority_level`: how directive or deferential it is
- `customer_view`: how the brand frames the audience internally
- `pronoun_policy`: second person, first person, singular they, etc.
- `humor_distance`: whether humor is absent, subtle, frequent, or tightly restricted

### `voice`

Purpose:

- store the character that should remain stable even when tone changes

Recommended fields:

- `constant_traits`: 3 to 6 stable traits
- `anti_traits`: traits to avoid
- `jargon_policy`: simplify, explain, or allow domain terms
- `claims_policy`: how careful the brand is with certainty, hype, or proof
- `personality_guardrails`: short operational rules for applying the traits

### `tone_matrix`

Purpose:

- separate situational adaptation from permanent voice

Recommended fields:

- one row per context, not per channel
- each row should include:
  - `context`
  - `user_state`
  - `tone_shift`
  - `do`
  - `dont`

Suggested baseline contexts:

- onboarding or first-use
- success or celebration
- error or blockage
- support or uncertainty
- legal, policy, or compliance
- localized or translated content
- partner or co-brand usage

### `messaging`

Purpose:

- define how messages are built, ordered, and constrained

Recommended fields:

- `primary_objectives`: educate, reassure, convert, guide, etc.
- `message_hierarchy`: what appears first and what stays secondary
- `structure_rules`: front-loading, sentence length, active voice, headings, etc.
- `terminology_rules`: naming rules, glossary stability, forbidden synonyms
- `cta_style`: imperative, descriptive, low-pressure, etc.
- `evidence_and_claims_rules`: what needs proof, what to avoid overstating
- `localization_rules`: translation or internationalization constraints

### `visual`

Purpose:

- keep the visible identity attached to the same operating spec

Recommended fields:

- `logo_rules`: lockups, spacing, minimum size, prohibited transformations
- `color_system`: primary colors, functional colors, pairing rules
- `typography_system`: required fonts, fallbacks, hierarchy, exceptions
- `imagery_or_symbol_rules`: mascots, illustrations, photography, icon behavior
- `accessibility_rules`: contrast, readability, responsive adjustments
- `co_branding_rules`: attribution, partner lockups, prohibited pairings

### `governance`

Purpose:

- define who this specification governs and what overrides what

Recommended fields:

- `applies_to`: product, web, social, docs, support, partner materials, print
- `source_of_truth`: which guides or systems this spec is based on
- `precedence_rules`: what wins when rules conflict
- `owners`: team or role responsible
- `approval_rules`: when review is needed
- `review_cycle`: cadence or trigger
- `exceptions_policy`: how deviations are documented

### `examples`

Purpose:

- make the spec teachable, reviewable, and testable

Recommended fields:

- `do_dont_pairs`: short paraphrased contrasts
- `channel_examples`: snippets by context
- `scenario_examples`: one or two end-to-end applications of the spec

## Normalization Rules

- Use `not_specified` when the source corpus does not provide a defensible answer.
- Use `inference:` when synthesizing more than one source into a single field.
- Prefer short arrays over long prose where the field is likely to become machine-readable later.
- Keep claims concrete. Avoid vague values like `friendly enough` or `modern but timeless`.
- Separate what the brand says about itself from what external users are allowed to say with or about it.

## Suggested Controlled Values

These are not strict schema enums yet, but they reduce drift.

### Register

- `formal`
- `neutral`
- `informal`
- `adaptive`

### Relationship role

- `guide`
- `peer`
- `teacher`
- `expert_partner`
- `authority`
- `host`

### Authority level

- `directive`
- `supportive`
- `consultative`
- `service_oriented`

### Humor distance

- `none`
- `subtle`
- `moderate`
- `high`
- `context_only`

## Validation Heuristics

A `Brand ID` document is good enough for v0 if a reviewer can answer all of these from the file alone:

1. How does the brand address people, and how formal is it?
2. What stays constant in the voice, and what changes by situation?
3. What messaging patterns are mandatory or forbidden?
4. What visual and co-branding rules matter operationally?
5. What happens when translation, accessibility, or legal constraints conflict with tone or style?

## Why This Taxonomy Passed The Research Pass

- It covers the highest-frequency dimensions from the corpus.
- It keeps `relationship` separate from `voice`, which the corpus repeatedly implied but rarely formalized.
- It gives `tone_matrix` its own place, solving the common problem where tone advice gets buried in examples.
- It treats accessibility and localization as operating constraints instead of afterthoughts.
- It supports both human reading and future YAML or JSON projection without redesigning the concepts.
