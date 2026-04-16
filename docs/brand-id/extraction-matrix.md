# Brand ID Extraction Matrix

Stand: 2026-04-10

Legend:

- `F` = field is explicitly covered in the source
- `P` = field is partially or indirectly covered
- `-` = not meaningfully covered in the source

## Matrix

| ID | core | audience | relationship | voice | tone_matrix | messaging | visual | access_i18n | governance | examples | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M1 | F | F | F | P | P | F | - | P | P | - | Editorial goals define Mailchimp as guide, educator, and respectful expert. |
| M2 | P | F | F | F | F | F | - | - | P | P | Strongest source for stable voice traits and humor boundaries. |
| M3 | - | F | P | P | P | F | - | F | F | F | Translation guidance explicitly handles clarity, formality, and precedence. |
| M4 | P | - | P | - | - | P | F | - | F | P | Asset rules show visual identity plus legal usage constraints. |
| A1 | F | F | F | F | F | F | - | P | P | F | Explicit emotional-state framing and channel-specific tone adaptation. |
| G1 | P | F | F | F | P | F | - | P | P | P | Strong anti-pattern list for keeping tone useful and globally readable. |
| G2 | - | F | F | P | - | F | - | P | - | F | Direct-address and imperative rules make register measurable. |
| G3 | - | F | F | P | - | F | - | F | - | F | Clear evidence that localization is core identity work, not cleanup. |
| V1 | F | F | F | F | P | F | - | P | F | P | Public-service content model centers user need, plain English, and analytics. |
| V2 | - | - | - | - | - | - | F | F | F | P | Functional color model binds aesthetics to accessibility and consistency. |
| V3 | - | - | - | - | - | - | F | F | F | P | Typeface rules depend on domain context and service ownership. |
| I1 | F | P | P | P | - | P | P | P | F | - | Brand principles connect design quality to judgment and client trust. |
| I2 | P | - | - | - | - | - | F | F | F | P | Palette is tightly governed and linked to UI hierarchy. |
| S1 | P | F | F | P | - | F | F | F | F | F | External brand use, attribution, naming, and UI display rules are explicit. |
| O1 | F | F | F | P | - | F | F | P | F | P | Partner-facing guide ties naming, co-branding, logo use, and mission language together. |

## Frequency Summary

Counting both `F` and `P` as present:

| Dimension | Presence in corpus | Reading |
| --- | --- | --- |
| `core` | 10 / 15 | Common |
| `audience` | 11 / 15 | Common |
| `relationship` | 12 / 15 | Common |
| `voice` | 11 / 15 | Common |
| `tone_matrix` | 6 / 15 | Sometimes present, strategically important |
| `messaging` | 11 / 15 | Common |
| `visual` | 7 / 15 | Common when asset/design systems are public |
| `access_i18n` | 13 / 15 | Common |
| `governance` | 12 / 15 | Common |
| `examples` | 11 / 15 | Common in practical guides |

## Synthesis

- The most stable cross-source pattern is not "voice" alone. It is `audience + relationship + messaging + governance`.
- `tone_matrix` is less often named directly, but when absent it is usually implied through error, success, onboarding, or translation guidance.
- `access_i18n` appears often enough to deserve first-class handling inside the spec instead of being left as a footnote.
- Visual systems are inconsistent in public depth, so `Brand ID` should require the section but allow `not_specified` at field level.

## What This Means For Brand ID v0

`Brand ID v0` should treat these as required top-level sections:

- `core`
- `audience`
- `relationship`
- `voice`
- `tone_matrix`
- `messaging`
- `visual`
- `governance`
- `examples`

Field-level optionality should be handled within sections, not by dropping sections entirely.
