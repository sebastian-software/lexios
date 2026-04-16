# Brand ID Example: GOV.UK

Stand: 2026-04-10

- `brand_id_version`: `0`
- `brand_name`: `GOV.UK`

Source basis:

- `V1` Writing for GOV.UK
- `V2` GOV.UK Design System: Colour
- `V3` GOV.UK Design System: Typeface

Method note:

- Fields marked `inference:` summarize repeated patterns from the selected GOV.UK public guidance.
- Visual ownership details beyond the published guides remain `not_specified`.

## core

- `brand_summary`: Government information and services designed to help people complete tasks clearly and confidently.
- `mission_or_promise`: Publish only what people need so they can complete their task.
- `brand_self_image`: `inference:` A serious, dependable public-service interface that respects users' time.
- `category_context`: UK public-service content and service delivery across broad, mixed-literacy audiences.
- `personality_traits`:
  - specific
  - informative
  - clear
  - brisk
  - serious
  - human
- `anti_traits`:
  - pompous
  - emotive
  - buzzword-heavy
  - vague
  - redundant

## audience

- `primary_segments`:
  - Anyone living in the UK.
  - British citizens living abroad.
  - People abroad who want to do business in or travel to the UK.
- `secondary_segments`:
  - Specialist audiences who still prefer plain English for speed and clarity.
- `literacy_or_domain_assumptions`: Use common words and plain English even for specialist content.
- `global_audience_notes`: The audience is broad and public-facing; content must work for mixed literacy and assistive-technology use.
- `user_needs_priority`:
  - find the right page
  - understand whether it is relevant
  - complete the task with minimal reading overhead
  - trust the content enough to act on it

## relationship

- `address_form.linguistic_form`: `you`
- `address_form.notes`: Direct address is preferred where possible.
- `register.default_level`: `neutral`
- `register.adaptation_policy`: Stay serious and human; avoid pomp, spin, and unnecessary emotion even when the subject is complex.
- `role`: `authority`
- `stance`: Provide direct task support in a public-service context.
- `authority_level`: `service_oriented`
- `customer_view`: `inference:` The public is diverse, busy, often stressed, and should not be forced to decode government language.
- `pronoun_policy`: Use `you`; use gender-neutral references such as `they`, `their`, and `them`.
- `humor_distance`: `none`

## voice

- `constant_traits`:
  - clear_and_concise
  - specific
  - informative
  - brisk_but_not_terse
  - serious_but_not_pompous
  - emotionless_but_human
- `anti_traits`:
  - formal_for_its_own_sake
  - jargon-heavy
  - caveat-led
  - question-led_headings
  - faq_dumping
- `jargon_policy`: Use plain English; explain unusual terms and avoid formal or long words when short ones will do.
- `claims_policy`: Prefer concrete task guidance over spin, adjectives, or vague institutional language.
- `personality_guardrails`:
  - write for the web, not for print habits
  - front-load the important information
  - do not waste the reader's time

## tone_matrix

- `context`: general_task_content
  - `user_state`: trying to complete a task quickly
  - `tone_shift`: direct and economical
  - `do`:
    - lead with the user need
    - use the inverted pyramid
    - keep paragraphs short
  - `dont`:
    - repeat the summary in the first paragraph
    - bury the action behind caveats

- `context`: specialist_or_technical_content
  - `user_state`: domain-aware but still time-constrained
  - `tone_shift`: still plain, still public-facing
  - `do`:
    - keep specialist information in plain English
    - use audience vocabulary where it helps search and comprehension
  - `dont`:
    - assume specialists prefer dense prose
    - hide behind legalistic wording

- `context`: titles_and_summaries
  - `user_state`: scanning search results or page tabs
  - `tone_shift`: informative and search-oriented
  - `do`:
    - make titles unique and descriptive
    - keep summaries active and clear
  - `dont`:
    - use redundant introductions
    - use unclear or duplicate titles

- `context`: stressful_or_low-attention_use
  - `user_state`: mobile, distracted, or under pressure
  - `tone_shift`: even more concise and practical
  - `do`:
    - use common words
    - reduce reading load
  - `dont`:
    - rely on long sentences
    - add decorative explanation before the action

## messaging

- `primary_objectives`:
  - meet_user_need
  - reduce_reader_effort
  - improve_findability
  - support_task_completion
- `message_hierarchy`:
  - say what the page is for
  - say who it is for
  - say what the person can do next
  - move detail lower on the page
- `structure_rules`:
  - use active voice
  - front-load key information
  - avoid long sentences
  - keep paragraphs to five sentences or fewer
  - avoid FAQs
  - use descriptive subheadings
- `terminology_rules`:
  - use the words people search for
  - prefer short, common words over formal alternatives
  - avoid government buzzwords and jargon
- `cta_style`: direct task language in the second person
- `evidence_and_claims_rules`:
  - unique titles matter operationally and legally
  - content quality should be checked with search, feedback, and analytics data after publication
- `localization_rules`:
  - use date ranges that screen readers can handle well
  - keep summaries accessible to assistive technology
  - left-align body text for left-to-right languages

## visual

- `logo_rules`: `not_specified` in the selected source set
- `color_system`:
  - always use the GOV.UK color palette
  - use functional colors via the design-system token function instead of copying hex values into ad hoc meaning
  - maintain WCAG 2.2 AA contrast for text and interactive elements
- `typography_system`:
  - use `GDS Transport` on `service.gov.uk`
  - use an alternative such as Helvetica or Arial on other public subdomains
  - use the published type scale rather than inventing new text styles
- `imagery_or_symbol_rules`: `not_specified`
- `accessibility_rules`:
  - keep body copy left-aligned for left-to-right reading
  - do not justify body text
  - preserve readable scaling and responsive typography
- `co_branding_rules`: `not_specified`

## governance

- `applies_to`:
  - GOV.UK pages
  - titles
  - summaries
  - body copy
  - design-system color usage
  - service typography
- `source_of_truth`:
  - GOV.UK content design guidance
  - GOV.UK Design System styles
- `precedence_rules`:
  - follow GDS style guide and writing guidance when writing for GOV.UK
  - follow design-system conventions rather than inventing local color or type semantics
- `owners`: `not_specified`
- `approval_rules`: `not_specified`
- `review_cycle`: continuous review after publication using content performance and feedback
- `exceptions_policy`: `not_specified`

## examples

- `do_dont_pairs`:
  - Do use plain English for specialists; do not assume complexity requires dense language.
  - Do make the title descriptive and unique; do not use a vague title that users cannot distinguish in search or tabs.
  - Do front-load the action; do not begin with a generic introduction.
- `channel_examples`:
  - Search-facing summary: short, descriptive, active.
  - Task page body copy: direct and structured for scanning.
  - Design-system usage: tokenized color and governed typography.
- `scenario_examples`:
  - A tax or service task page should explain the action first and legal detail second.
  - A specialist guidance page should still use common words and explicit structure.
