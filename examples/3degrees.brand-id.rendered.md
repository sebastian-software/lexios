# Brand ID: 3Degrees

schema: brand-id@0.3.0
updatedAt: 2026-04-15

## Meta
- `brandSlug`: 3degrees
- `legalEntityName`: 3Degrees Group, Inc.
- `canonicalDomain`: 3degrees.com
- `status`: draft
- `primaryLocale`: en-US
- `supportedLocales`:
  - en-US
- `seedInputs`:
  ```yaml
  - kind: pdf
    label: 3Degrees Brand Guidelines 2025
    notes: User-provided brand guide PDF used as the primary source for this draft.
  - kind: website
    label: 3Degrees homepage
    url: https://www.3degrees.com
    notes: Canonical brand domain referenced in the guide.
  ```
- `tags`:
  - climate
  - b2b
  - sustainability
  - example

## Profile.core
- `core`:
  - `brandSummary`: Climate solutions company helping organizations around the world achieve renewable energy and decarbonization goals.
  - `missionOrPromise`: Make it possible for businesses and their customers to take urgent action on climate change.
  - `brandSelfImage`: Trusted climate-first partner that turns ambition into credible, high-impact action.
  - `categoryContext`: Global decarbonization, renewable energy, and climate strategy implementation for organizations at different stages of climate maturity.
  - `personalityTraits`:
    - credible
    - creative
    - insightful
    - authentic
    - thoughtful
    - determined
    - effective
  - `antiTraits`:
    - hype-driven
    - overly technical
    - vague
    - impersonal
    - alarmist

## Profile.audience
- `audience`:
  - `primarySegments`:
    ```yaml
    - name: Global organizations pursuing climate and decarbonization goals
      description: Enterprise and other business organizations seeking renewable energy and broader decarbonization outcomes.
      knowledgeLevel: mixed
      needs:
        - credible climate action planning
        - implementation support
        - market-aware guidance
      markets:
        - global
    - name: Climate program decision-makers
      description: Buyers and internal leads who need strategy-to-implementation support and risk mitigation.
      knowledgeLevel: practitioner
      needs:
        - clarity on standards and regulation
        - confidence in implementation options
        - measurable impact
    ```
  - `secondarySegments`:
    ```yaml
    - name: Businesses' end customers
      description: Customers participating in climate action programs connected to 3Degrees' client offerings.
      knowledgeLevel: general
    - name: Prospective and current employees
      description: Talent audiences reached through employer-brand communications.
      knowledgeLevel: mixed
    - name: Partners and communities
      description: Stakeholders connected to just transition and broader social mission work.
      knowledgeLevel: mixed
    ```
  - `literacyOrDomainAssumptions`: Readers may not share deep regulatory or technical fluency, so the brand should distill complexity into meaningful action.
  - `globalAudienceNotes`: The guide repeatedly frames 3Degrees as a global partner and references worldwide policy and market variation.
  - `userNeedsPriority`:
    ```yaml
    - label: Understand what action is credible and high impact
      type: intent
      priority: 1
    - label: Reduce complexity and uncertainty
      type: anxiety
      priority: 2
    - label: Trust the expertise behind recommendations
      type: intent
      priority: 3
    - label: Feel progress and urgency without being overwhelmed
      type: anxiety
      priority: 4
    ```

## Profile.relationship
- `relationship`:
  - `addressForm`:
    - `linguisticForm`: `not_specified`
    - `normalizedForm`: `not_specified`
    - `notes`: The guide explicitly defines first-person brand reference but does not set a direct second-person customer address rule.
  - `register`:
    - `defaultLevel`: neutral
    - `adaptationPolicy`: Aim for approachable, polished, and professional communication calibrated around the middle of the formal-informal spectrum.
  - `role`: expert_partner
  - `stance`: Educate, engage, and empower organizations to take credible climate action.
  - `authorityLevel`: expert_led
  - `customerView`: Clients are serious actors navigating a complex climate landscape and need a trusted long-term partner rather than a slogan-driven vendor.
  - `pronounPolicy`: Refer to 3Degrees in first person using we and our, not third person.
  - `humorDistance`: subtle

## Profile.voice
- `voice`:
  - `constantTraits`:
    - smart
    - authentic
    - genuine
    - trusted thought partner
    - honest
    - confident
    - warm
    - business casual
  - `antiTraits`:
    - buzzwordy
    - hyped
    - overly technical
    - stiffly formal
    - detached
    - negative for its own sake
  - `jargonPolicy`: 3Degrees handles technical and regulatory subject matter, but should avoid being overly technical and instead distill complexity into meaningful insights for client action.
  - `claimsPolicy`: Express confidence and pride in the quality of the work, but avoid buzzwords and hype. The novelty of the work should stand on its own.
  - `personalityGuardrails`:
    - Deliver facts clearly.
    - Stay rooted in values.
    - Inspire action without overstatement.
    - Focus on climate-positive progress and action.
    - Use humor only where appropriate.

## Profile.lexicon
- `lexicon`:
  - `entries`:
    ```yaml
    - term: Supplier REach
      definition: Company-specific product or program name that should retain its canonical spelling in content.
      kind: product
      canonicalSpelling: Supplier REach
      forbiddenVariants:
        - Supplier Reach
        - Supplier reach
      casingRule: Use uppercase R and E in REach.
      usage: Treat as a named offering or product term, not as a generic phrase.
      contexts:
        - product copy
        - website
        - sales
      translationPolicy: do_not_translate
      notes: User-provided terminology example; definition and exact business scope should be verified with 3Degrees.
    ```
  - `generalRules`:
    - Preserve canonical spelling for named products, programs, and proprietary concepts.
    - Explain company-specific terms when the audience may not already know them.
    - Flag non-canonical casing or spacing during automated brand review.

## Profile.toneMatrix
- `toneMatrix`:
  ```yaml
  - context: sales
    userState: Evaluating a credible climate partner.
    toneShift: Polished, professional, and approachable.
    do:
      - Sound confident and warm.
      - Communicate with substance.
      - Make expertise feel usable.
    dont:
      - Sound stiffly formal.
      - Drift into startup hype.
      - Overwhelm with jargon.
    channelBias:
      - website
      - sales
  - context: support
    userState: Facing complexity, risk, or technical ambiguity.
    toneShift: Clearer, more direct, and more explanatory than usual.
    do:
      - Simplify without dumbing down.
      - Use active voice.
      - Turn complexity into actionable insight.
    dont:
      - Hide behind technical language.
      - Sound evasive or abstract.
  - context: social
    userState: Wants urgency without despair.
    toneShift: Optimistic and human.
    do:
      - Emphasize progress and action.
      - Keep urgency real.
      - Let conviction show.
    dont:
      - Center doom.
      - Flatten the message into neutral corporate prose.
    channelBias:
      - social
  - context: other
    userState: Reading employer-brand or identity-centered communications.
    toneShift: Respectful, authentic, and perspective-centered.
    do:
      - Reflect company values explicitly.
      - Use inclusive language.
      - Center how people identify themselves.
    dont:
      - Use internal shorthand externally.
      - Default to dominant-group framing.
    channelBias:
      - social
      - website
  ```

## Profile.messaging
- `messaging`:
  - `primaryObjectives`:
    - educate
    - guide
    - build_trust
    - activate
    - differentiate
  - `messageHierarchy`:
    ```yaml
    - label: Climate ambition should become credible action.
      priority: 1
    - label: 3Degrees brings deep market expertise and practical implementation ability.
      priority: 2
    - label: Clients can act with confidence because the guidance is current, risk-aware, and global.
      priority: 3
    - label: Innovation matters, but only in service of meaningful impact.
      priority: 4
    ```
  - `structureRules`:
    - Use active voice whenever possible.
    - Follow AP Style as a baseline.
    - Minimize unnecessary capitalization.
    - Minimize unnecessary punctuation.
    - Use the Oxford comma.
    - Keep bullets internally consistent.
    - Left-justify text.
    - Prefer links over footnotes.
    - Use one space after a sentence.
  - `terminologyRules`:
    ```yaml
    - preferredTerm: 3Degrees
      rationale: Use 3Degrees in internal and external-facing communications except in legal documents.
    - preferredTerm: 3Degrees.com
      forbiddenTerms:
        - 3Degreesinc.com
      rationale: Customer-facing URL should omit inc even though the domain redirects.
    - preferredTerm: we / our
      forbiddenTerms:
        - its
      rationale: Refer to the brand in first person rather than detached third person.
    - preferredTerm: net zero emissions
      rationale: Do not capitalize for emphasis when the phrase is not a proper noun.
    - preferredTerm: power purchase agreement
      rationale: Do not capitalize a commonly abbreviated phrase unless it is a proper noun.
    ```
  - `ctaStyle`: Confident and action-oriented, but grounded in credibility rather than pressure or theatrics.
  - `evidenceAndClaimsRules`:
    - Facts should be clear.
    - Stories should support action.
    - Climate claims should feel credible and high impact, not inflated.
    - Risk mitigation and market knowledge are legitimate proof points.
  - `localizationRules`: `not_specified`

## Profile.visual
- `visual`:
  - `logoRules`:
    - Use the full-color logo whenever possible.
    - Use full-color or grayscale primarily on white, sand, or very light backgrounds.
    - Use the reversed logo on busy visuals, bright colors, or photography.
    - Maintain clear space equal to at least the height of the e in Degrees.
    - Do not use the logo in body copy.
    - Minimum size is 1.5in wide in print and 75px wide on web.
    - Do not add effects, recolor, stretch, rotate, rearrange, or place the logo on a busy image.
    - When using the brand symbol lockup, position the wordmark at 45deg from the corner of the symbol.
    - Follow separate B Corp logo rules when using the B Corp mark.
  - `colorSystem`:
    ```yaml
    - name: Dark Navy
      value: "#08394B"
      usage: Backgrounds, headlines, body text, overlays, primary grounding color.
    - name: Goldenrod
      value: "#FCB414"
      usage: Primary button accent, optimistic highlight, decorative elements.
    - name: Light Teal
      value: "#62BBBB"
      usage: Backgrounds and lighter visual support.
    - name: Dark Teal
      value: "#0D7A83"
      usage: Secondary and tertiary buttons over sand and white backgrounds.
    - name: Sand
      value: "#F5F4EC"
      usage: Background use only.
    - name: Dark Sand
      value: "#EEEDE7"
      usage: Background use only.
    ```
  - `typographySystem`:
    ```yaml
    - role: Headline
      fontFamily:
        - Arnhem
      usage: Impactful headlines in sentence case.
    - role: Body
      fontFamily:
        - Montserrat
      weight: Regular
      usage: Body copy.
    - role: Subhead / Labels
      fontFamily:
        - Montserrat
      weight: Semibold
      usage: All caps subheadlines, labels, and descriptor text.
    - role: Google Suite fallback
      fontFamily:
        - Lora
      usage: Replacement for Arnhem and Montserrat in Google Suite.
    - role: Microsoft Office fallback serif
      fontFamily:
        - Georgia
      usage: Replacement for Arnhem in Microsoft Office.
    - role: Microsoft Office fallback sans
      fontFamily:
        - Arial
      usage: Replacement for Montserrat in Microsoft Office.
    ```
  - `imageryOrSymbolRules`:
    - Photography should feel calm, confident, and relatable.
    - Subject matter should show subtle coexistence of humankind, nature, and business.
    - Compositions may use motion, off-center framing, depth of field, and environmental context.
    - Lighting should tend toward warm natural light, especially sunrise, sunset, or other atmospheric light.
    - Color opportunities should echo brand colors like goldenrod, navy, teals, and sand.
    - Iconography should support clarity and consistency rather than decorative excess.
  - `accessibilityRules`:
    - The web palette is a reduced subset chosen for accessible application.
    - Dark navy overlays can improve legibility over photography.
    - Prefer background and contrast pairings that preserve readability.
  - `coBrandingRules`:
    - B Corp logo usage must follow B Corp brand guidelines.
    - Employer-brand materials should stay recognizably within the 3Degrees master brand.

## Profile.governance
- `governance`:
  - `appliesTo`:
    - website
    - docs
    - email
    - social
    - press
    - partner
    - print
  - `sourceOfTruth`:
    - 3Degrees Brand Guidelines 2025
    - 3Degrees Marketing Team
    - B Corp Brand Guidelines for B Corp mark usage
  - `precedenceRules`:
    - Employer-brand expression may vary slightly in voice, writing style, and language for internal audiences while staying aligned to the master brand.
    - B Corp logo usage follows B Corp brand rules.
    - Legal documents may use the full legal company name where normal brand communication uses 3Degrees.
  - `owners`:
    ```yaml
    - teamOrRole: 3Degrees Marketing Team
      contact: marketing_team@3degrees.com
      responsibilities:
        - Develop and manage the company brand.
        - Answer questions about the brand guidelines.
    ```
  - `approvalRules`: `not_specified`
  - `reviewCycle`: Inclusive language guidance is planned for annual review; overall brand review cadence is not otherwise specified.
  - `exceptionsPolicy`: Internal employer-brand shorthand and legal naming rules are explicit exceptions to the default external brand usage.

## Profile.examples
- `examples`:
  - `doDontPairs`:
    ```yaml
    - do: Sound like a trusted thought partner with substance.
      dont: Sound like climate-tech hype.
    - do: Simplify complex climate and regulatory topics into clear action.
      dont: Hide behind jargon.
    - do: Refer to the brand as we and our.
      dont: Describe 3Degrees externally in detached third-person copy.
    - do: Use 3D and 3D'ers only internally.
      dont: Use internal shorthand in external-facing communications.
    - do: Center how people identify themselves.
      dont: Impose umbrella terminology when specificity matters.
    ```
  - `channelExamples`:
    ```yaml
    - channel: website
      example: We help global organizations transform climate ambition into action.
      rationale: Positioning language combines expertise, action, and credibility without hype.
    - channel: docs
      example: The active voice is more powerful, direct and clear.
      rationale: Communication standards favor directness and clarity.
    - channel: social
      example: Work that matters.
      rationale: Employer-brand materials may use this tagline while staying within the master brand.
    ```
  - `scenarioExamples`:
    ```yaml
    - scenario: Decarbonization solutions page
      summary: Lead with credible action and expertise, not novelty claims.
    - scenario: Recruiting message
      summary: Use Work that matters while still sounding recognizably like the 3Degrees master brand.
    - scenario: Identity or community impact communication
      summary: Center lived experience, use specific terminology, and treat guidance as a living document.
    ```

## Profile.localeOverrides
- `localeOverrides`: []

## Profile.customSections
- `customSections`: {}

## Evidence
- `evidence`:
  ```yaml
  - id: D1
    kind: pdf
    title: 3Degrees Brand Guidelines 2025
    officiality: official
    access: uploaded_file
    publisher: 3Degrees
    language: en-US
    summary: Internal-style brand guide covering brand foundation, visuals, communications standards, inclusive language, and brand governance cues.
    capturedAt: 2026-04-15
    lastVerifiedAt: 2026-04-15
    tags:
      - brand-guide
      - communication
      - visual-identity
  - id: D2
    kind: manual_note
    title: User-provided 3Degrees terminology note
    officiality: semi_official
    access: manual_entry
    publisher: User
    language: en-US
    summary: User noted Supplier REach as an example of company-specific terminology with non-standard casing.
    capturedAt: 2026-04-16
    tags:
      - lexicon
      - terminology
      - manual-note
  ```

## Annotations
- `annotations`:
  - `/profile/core`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.91
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 3, 7
      - evidenceId: D1
        locator: p. 4
      - evidenceId: D1
        locator: pp. 7-8
      - evidenceId: D1
        locator: pp. 3, 7-8
      - evidenceId: D1
        locator: p. 7
      - evidenceId: D1
        locator: pp. 34-39
      ```
    - `notes`: Covers the core brand foundation and positioning fields.
  - `/profile/audience`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.78
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 3, 7-8
      - evidenceId: D1
        locator: pp. 4-5, 9
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: pp. 3-8, 34
      ```
    - `notes`: Audience model is synthesized from brand foundation and communication guidance.
  - `/profile/relationship/addressForm`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.41
      - `label`: low
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: p. 35
      ```
    - `notes`: Direct second-person address is not specified; first-person brand reference is specified.
  - `/profile/relationship/register`:
    - `status`: confirmed
    - `confidence`:
      - `score`: 0.89
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 34-35
      - evidenceId: D1
        locator: p. 35
      ```
    - `notes`: Register normalized from business-casual communication guidance.
  - `/profile/relationship`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.84
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 7-8, 34
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: p. 35
      ```
    - `notes`: Relationship stance and customer model are synthesized from positioning and voice guidance.
  - `/profile/voice`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.92
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: pp. 34-35
      ```
    - `notes`: Voice guidance is strongly supported by the communications standards section.
  - `/profile/lexicon`:
    - `status`: needs_review
    - `confidence`:
      - `score`: 0.45
      - `label`: medium
    - `basis`: manual
    - `sources`:
      ```yaml
      - evidenceId: D2
      ```
    - `notes`: Supplier REach was added as a manual terminology example and should be verified against official product materials.
  - `/profile/toneMatrix/0`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.75
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 7-8, 34-35
      - evidenceId: D1
        locator: pp. 7-8
      - evidenceId: D1
        locator: p. 35
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: pp. 34-35
      ```
    - `notes`: Aggregated annotation for /profile/toneMatrix/0.
  - `/profile/toneMatrix/1`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.76
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: pp. 8, 34
      - evidenceId: D1
        locator: pp. 34-35
      ```
    - `notes`: Aggregated annotation for /profile/toneMatrix/1.
  - `/profile/toneMatrix/2`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.69
      - `label`: medium
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 9, 34
      - evidenceId: D1
        locator: pp. 3-5, 34
      - evidenceId: D1
        locator: p. 34
      - evidenceId: D1
        locator: p. 9
      ```
    - `notes`: Aggregated annotation for /profile/toneMatrix/2.
  - `/profile/toneMatrix/3`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.71
      - `label`: medium
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 9, 39
      - evidenceId: D1
        locator: p. 9
      ```
    - `notes`: Aggregated annotation for /profile/toneMatrix/3.
  - `/profile/messaging`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.85
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 7-8, 34
      - evidenceId: D1
        locator: pp. 7-8
      - evidenceId: D1
        locator: pp. 35-38
      ```
    - `notes`: Messaging rules consolidate AP style, terminology, claims, and CTA guidance.
  - `/profile/messaging/localizationRules`:
    - `status`: not_specified
    - `confidence`:
      - `score`: 0.2
      - `label`: low
    - `basis`: missing
    - `sources`: []
  - `/profile/visual`:
    - `status`: confirmed
    - `confidence`:
      - `score`: 0.9
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 11-14
      - evidenceId: D1
        locator: pp. 15-16
      - evidenceId: D1
        locator: pp. 17-18
      - evidenceId: D1
        locator: pp. 19-31
      - evidenceId: D1
        locator: p. 16
      - evidenceId: D1
        locator: pp. 6, 9, 14
      ```
    - `notes`: Visual identity is well-covered for logo, colors, typography, imagery, and co-branding.
  - `/profile/governance`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.84
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: p. 1
      - evidenceId: D1
        locator: pp. 1, 6
      - evidenceId: D1
        locator: pp. 6, 9, 38
      - evidenceId: D1
        locator: p. 39
      - evidenceId: D1
        locator: pp. 9, 38
      ```
    - `notes`: Governance is inferred from ownership, legal naming, employer-brand, and B Corp usage rules.
  - `/profile/governance/approvalRules`:
    - `status`: not_specified
    - `confidence`:
      - `score`: 0.18
      - `label`: low
    - `basis`: missing
    - `sources`: []
  - `/profile/examples`:
    - `status`: mixed
    - `confidence`:
      - `score`: 0.77
      - `label`: high
    - `basis`: synthesized
    - `sources`:
      ```yaml
      - evidenceId: D1
        locator: pp. 9, 34-39
      - evidenceId: D1
        locator: pp. 7, 9, 35
      - evidenceId: D1
        locator: pp. 5, 9, 39
      ```
    - `notes`: Examples are synthesized from explicit writing and usage guidance.

## Audit
- `audit`:
  - `discovery`:
    - `website`:
      - `seedUrl`: https://www.3degrees.com
      - `canonicalDomain`: 3degrees.com
      - `detectedLocales`:
        - en-US
      - `detectedMarkets`:
        - global
      - `detectedChannels`:
        - website
        - docs
        - social
        - partner
        - print
      - `pageSignals`: []
    - `materials`:
      ```yaml
      - label: 3Degrees Brand Guidelines 2025
        type: brand_guide
        officiality: official
        relevance: Rich primary source spanning brand foundation, visual identity, and communication standards.
        notes: Uploaded PDF reviewed locally on 2026-04-15.
      ```
    - `unresolvedQuestions`:
      - The guide does not explicitly set a customer-facing second-person address policy.
      - Localization and translation rules are not explicitly documented.
      - Approval workflow beyond the marketing team ownership model is not specified.
    - `excludedMaterials`: []
  - `reviewStatus`: needs_review
  - `overallConfidence`:
    - `score`: 0.84
    - `label`: high
    - `rationale`: Single source, but unusually rich and internally consistent across strategy, voice, and visual guidance.
  - `completeness`: 0.86
  - `openQuestions`:
    - What direct second-person policy should be used in customer-facing copy?
    - Are there localization or translation-specific rules outside this guide?
    - What is the formal approval path for exceptions or major brand changes?
    - What is the exact definition and official scope of Supplier REach?
  - `assumptions`:
    - Business casual is normalized in the schema as a neutral register with warmth.
    - Expert partner is the closest normalized relationship role for a strategy-to-implementation climate advisor.
    - The uploaded PDF is treated as the current authoritative public-facing brand source for this example.
    - Supplier REach is treated as a product or program term based on user-provided context, not the reviewed PDF.
  - `missingFieldPaths`:
    - /profile/relationship/addressForm/linguisticForm
    - /profile/relationship/addressForm/normalizedForm
    - /profile/messaging/localizationRules
    - /profile/governance/approvalRules
  - `warnings`:
    - This draft is based primarily on one uploaded PDF rather than a broader website-plus-corpus research pass.
    - Tone matrix entries for support, social, and employer-brand contexts are partially inferred from general guidance rather than explicit scenario tables.
