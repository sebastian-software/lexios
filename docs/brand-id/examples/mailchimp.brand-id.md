# Brand ID Example: Mailchimp

Stand: 2026-04-10

- `brand_id_version`: `0`
- `brand_name`: `Mailchimp`

Source basis:

- `M1` Writing Goals and Principles
- `M2` Voice and Tone
- `M3` Writing for Translation
- `M4` Brand Assets

Method note:

- Fields marked `inference:` synthesize multiple public Mailchimp sources.
- Missing operational ownership details remain `not_specified`.

## core

- `brand_summary`: Marketing platform that helps businesses communicate more clearly and effectively.
- `mission_or_promise`: Help people understand Mailchimp, use the product well, and get useful work done without confusion.
- `brand_self_image`: Experienced and compassionate business partner.
- `category_context`: SMB-facing marketing software with educational and in-product communication needs.
- `personality_traits`:
  - plainspoken
  - genuine
  - translator-like
  - dry_humored
  - human
- `anti_traits`:
  - patronizing
  - noisy
  - grandiose
  - slangy
  - condescending

## audience

- `primary_segments`:
  - Small businesses and hopeful brands navigating marketing complexity.
  - Users with very different levels of marketing knowledge, from novice to experienced.
- `secondary_segments`:
  - Translators and international readers when content is localized.
- `literacy_or_domain_assumptions`: Assume uneven marketing literacy; demystify B2B language instead of requiring fluency.
- `global_audience_notes`: Mailchimp serves users across many countries and translated languages; content should remain understandable to people with limited English proficiency.
- `user_needs_priority`:
  - Understand what a feature or concept means.
  - Complete the task without friction.
  - Feel respected, not sold to.
  - Learn enough to make a better decision next time.

## relationship

- `address_form.linguistic_form`: `you`
- `address_form.notes`: Translation guidance explicitly notes that some languages may require a formal or informal second-person choice.
- `register.default_level`: `informal`
- `register.adaptation_policy`: Stay informal by default, but favor clarity over cleverness and adapt formality for translation where culture requires it.
- `role`: `expert_partner`
- `stance`: Guide, educate, and encourage without talking down to the reader.
- `authority_level`: `supportive`
- `customer_view`: People are capable and busy; they deserve respect, practical help, and clear explanations.
- `pronoun_policy`: Direct second person for readers; avoid writing from Freddie's perspective.
- `humor_distance`: `context_only`

## voice

- `constant_traits`:
  - plainspoken
  - genuine
  - translator-like
  - subtle_humor
  - compassionate
- `anti_traits`:
  - fluffy
  - overpromising
  - melodramatic
  - exclusive
  - inappropriate
- `jargon_policy`: Prefer plain English and explain complex marketing concepts instead of repeating B2B jargon.
- `claims_policy`: Avoid grandiose claims and dramatic storytelling; speak truth about the product's actual role in users' lives.
- `personality_guardrails`:
  - Use humor only when it comes naturally and does not block comprehension.
  - Prefer subtle wit over loud comedy.
  - Educate without patronizing.

## tone_matrix

- `context`: onboarding_or_learning
  - `user_state`: unsure, early-stage, trying to understand the product
  - `tone_shift`: extra helpful and explanatory
  - `do`:
    - define the concept in plain language
    - use active voice
    - guide step by step without overloading
  - `dont`:
    - assume marketing fluency
    - joke before clarity is established

- `context`: support_or_confusion
  - `user_state`: confused, blocked, or asking for help
  - `tone_shift`: calm, direct, practical
  - `do`:
    - prioritize clarity over entertainment
    - tell the person what happened and what to do next
  - `dont`:
    - force humor
    - use indirect or decorative language

- `context`: success_or_progress
  - `user_state`: relieved, pleased, or proud
  - `tone_shift`: lightly celebratory
  - `do`:
    - allow a small amount of warmth or wit
    - reinforce forward momentum
  - `dont`:
    - over-celebrate
    - sound sarcastic or noisy

- `context`: translated_content
  - `user_state`: global audience, possibly non-native English reader
  - `tone_shift`: simpler and more explicit than default
  - `do`:
    - repeat words where repetition improves clarity
    - choose formal or informal second-person with translator input
    - prefer standard sentence structures
  - `dont`:
    - rely on idioms
    - use shortened words, unnecessary abbreviations, or double negatives

## messaging

- `primary_objectives`:
  - empower
  - respect
  - educate
  - guide
  - speak_truth
- `message_hierarchy`:
  - tell people what they need to know now
  - remove hype and confusion
  - provide optional deeper learning where useful
- `structure_rules`:
  - use active voice
  - prefer positive language
  - use simple, familiar words
  - write briefly without sacrificing clarity
  - repeat terms when repetition helps translation or comprehension
- `terminology_rules`:
  - keep one term stable instead of rotating synonyms
  - avoid slang, idioms, and cliches in localizable copy
  - keep the brand name as `Mailchimp`, one word, big `M`, little `c`
- `cta_style`: clear and low-friction; tell people what happens next without pressure theatrics
- `evidence_and_claims_rules`:
  - avoid over-promising
  - avoid dramatic storytelling
  - focus on realistic strengths
- `localization_rules`:
  - translation-specific rules override general style guidance when they conflict
  - avoid cultural references that will not travel
  - use metric units and explicit currency abbreviations in international content

## visual

- `logo_rules`:
  - combine the company name with the Freddie symbol
  - use the inverse logo on dark backgrounds
  - do not break up the Mailchimp name into new sub-brands
- `color_system`:
  - primary brand color: `Cavendish Yellow`
  - accent color: `Peppercorn`
- `typography_system`: `not_specified` in the selected public source set
- `imagery_or_symbol_rules`:
  - Freddie is part of the brand personality but does not speak
  - do not write copy from Freddie's point of view
  - avoid ape-related wordplay in general communications
- `accessibility_rules`: `not_specified`
- `co_branding_rules`: public asset usage is allowed only within the published brand-asset constraints

## governance

- `applies_to`:
  - marketing copy
  - educational content
  - in-app copy
  - system alerts
  - translated content
  - brand-asset usage
- `source_of_truth`:
  - Mailchimp Content Style Guide
  - Mailchimp Brand Assets
- `precedence_rules`:
  - translation guidance takes precedence when content is being localized
  - asset usage must comply with the published brand-asset rules
- `owners`: `not_specified`
- `approval_rules`: `not_specified`
- `review_cycle`: `not_specified`
- `exceptions_policy`: `not_specified`

## examples

- `do_dont_pairs`:
  - Do explain complex marketing terms in everyday language; do not hide behind B2B shorthand.
  - Do use subtle humor after clarity is secure; do not joke at a confused user.
  - Do keep the brand name stable as `Mailchimp`; do not invent chimp-based brand spin-offs.
- `channel_examples`:
  - Product help: practical, calm, and explicit.
  - Marketing page: warm, human, and lightly witty.
  - Localized content: simpler, more explicit, less idiomatic.
- `scenario_examples`:
  - A success state may add a small moment of personality.
  - A support or error state should drop almost all flourish and focus on next action.
