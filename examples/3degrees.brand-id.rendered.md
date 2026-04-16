# Brand ID: 3Degrees

Stand: 2026-04-15

## Meta
- `schema`:
  - `id`: brand-id
  - `version`: 0.1.0
- `brandSlug`: 3degrees
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

## Discovery
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

## Core
- `core`:
  - `brandSummary`: Climate solutions company helping organizations around the world achieve renewable energy and decarbonization goals.
    - _status=confirmed | inference=paraphrased | confidence=high:0.95_
    - sources: D1
  - `missionOrPromise`: Make it possible for businesses and their customers to take urgent action on climate change.
  - `brandSelfImage`: Trusted climate-first partner that turns ambition into credible, high-impact action.
    - _status=confirmed | inference=synthesized | confidence=high:0.93_
    - sources: D1
  - `categoryContext`: Global decarbonization, renewable energy, and climate strategy implementation for organizations at different stages of climate maturity.
    - _status=confirmed | inference=synthesized | confidence=high:0.90_
    - sources: D1
  - `personalityTraits`:
    ```yaml
    - credible
    - creative
    - insightful
    - authentic
    - thoughtful
    - determined
    - effective
    ```
  - `antiTraits`:
    ```yaml
    - hype-driven
    - overly technical
    - vague
    - impersonal
    - alarmist
    ```
    - _status=inferred | inference=synthesized | confidence=medium:0.74_
    - sources: D1

## Audience
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
    - _status=inferred | inference=synthesized | confidence=high:0.80_
    - sources: D1
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
    - _status=inferred | inference=synthesized | confidence=medium:0.68_
    - sources: D1
  - `literacyOrDomainAssumptions`: Readers may not share deep regulatory or technical fluency, so the brand should distill complexity into meaningful action.
    - _status=confirmed | inference=paraphrased | confidence=high:0.90_
    - sources: D1
  - `globalAudienceNotes`: The guide repeatedly frames 3Degrees as a global partner and references worldwide policy and market variation.
    - _status=confirmed | inference=paraphrased | confidence=high:0.82_
    - sources: D1
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
    - _status=inferred | inference=synthesized | confidence=medium:0.72_
    - sources: D1

## Relationship
- `relationship`:
  - `addressForm`:
    - `linguisticForm`: `not_specified`
      - _status=not_specified | inference=missing | confidence=low:0.15_
    - `normalizedForm`: `not_specified`
      - _status=not_specified | inference=missing | confidence=low:0.15_
    - `notes`: The guide explicitly defines first-person brand reference but does not set a direct second-person customer address rule.
      - _status=confirmed | inference=paraphrased | confidence=high:0.92_
      - sources: D1
  - `register`:
    - `defaultLevel`: neutral
      - _status=confirmed | inference=synthesized | confidence=high:0.87_
      - sources: D1
    - `adaptationPolicy`: Aim for approachable, polished, and professional communication calibrated around the middle of the formal-informal spectrum.
      - _status=confirmed | inference=paraphrased | confidence=high:0.90_
      - sources: D1
  - `role`: expert_partner
    - _status=confirmed | inference=synthesized | confidence=high:0.88_
    - sources: D1
  - `stance`: Educate, engage, and empower organizations to take credible climate action.
    - _status=confirmed | inference=paraphrased | confidence=high:0.88_
    - sources: D1
  - `authorityLevel`: expert_led
    - _status=inferred | inference=synthesized | confidence=medium:0.78_
    - sources: D1
  - `customerView`: Clients are serious actors navigating a complex climate landscape and need a trusted long-term partner rather than a slogan-driven vendor.
    - _status=inferred | inference=synthesized | confidence=high:0.80_
    - sources: D1
  - `pronounPolicy`: Refer to 3Degrees in first person using we and our, not third person.
    - _status=confirmed | inference=paraphrased | confidence=high:0.97_
    - sources: D1
  - `humorDistance`: subtle
    - _status=confirmed | inference=paraphrased | confidence=medium:0.76_
    - sources: D1

## Voice
- `voice`:
  - `constantTraits`:
    ```yaml
    - smart
    - authentic
    - genuine
    - trusted thought partner
    - honest
    - confident
    - warm
    - business casual
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.96_
    - sources: D1
  - `antiTraits`:
    ```yaml
    - buzzwordy
    - hyped
    - overly technical
    - stiffly formal
    - detached
    - negative for its own sake
    ```
    - _status=inferred | inference=synthesized | confidence=high:0.82_
    - sources: D1
  - `jargonPolicy`: 3Degrees handles technical and regulatory subject matter, but should avoid being overly technical and instead distill complexity into meaningful insights for client action.
    - _status=confirmed | inference=paraphrased | confidence=high:0.94_
    - sources: D1
  - `claimsPolicy`: Express confidence and pride in the quality of the work, but avoid buzzwords and hype. The novelty of the work should stand on its own.
    - _status=confirmed | inference=paraphrased | confidence=high:0.96_
    - sources: D1
  - `personalityGuardrails`:
    ```yaml
    - Deliver facts clearly.
    - Stay rooted in values.
    - Inspire action without overstatement.
    - Focus on climate-positive progress and action.
    - Use humor only where appropriate.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.90_
    - sources: D1

## Tone Matrix
- `toneMatrix`:
  ```yaml
  - context:
      value: sales
      status: inferred
      confidence:
        score: 0.7
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 7-8, 34-35
      inferenceType: synthesized
    userState:
      value: Evaluating a credible climate partner.
      status: inferred
      confidence:
        score: 0.74
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 7-8
      inferenceType: synthesized
    toneShift:
      value: Polished, professional, and approachable.
      status: confirmed
      confidence:
        score: 0.88
        label: high
      sources:
        - evidenceId: D1
          locator: p. 35
      inferenceType: paraphrased
    do:
      value:
        - Sound confident and warm.
        - Communicate with substance.
        - Make expertise feel usable.
      status: confirmed
      confidence:
        score: 0.84
        label: high
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: synthesized
    dont:
      value:
        - Sound stiffly formal.
        - Drift into startup hype.
        - Overwhelm with jargon.
      status: inferred
      confidence:
        score: 0.8
        label: high
      sources:
        - evidenceId: D1
          locator: pp. 34-35
      inferenceType: synthesized
    channelBias:
      value:
        - website
        - sales
      status: inferred
      confidence:
        score: 0.55
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 7-8, 34-35
      inferenceType: derived
  - context:
      value: support
      status: inferred
      confidence:
        score: 0.62
        label: medium
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: derived
    userState:
      value: Facing complexity, risk, or technical ambiguity.
      status: inferred
      confidence:
        score: 0.78
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 8, 34
      inferenceType: synthesized
    toneShift:
      value: Clearer, more direct, and more explanatory than usual.
      status: inferred
      confidence:
        score: 0.76
        label: medium
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: synthesized
    do:
      value:
        - Simplify without dumbing down.
        - Use active voice.
        - Turn complexity into actionable insight.
      status: confirmed
      confidence:
        score: 0.9
        label: high
      sources:
        - evidenceId: D1
          locator: pp. 34-35
      inferenceType: synthesized
    dont:
      value:
        - Hide behind technical language.
        - Sound evasive or abstract.
      status: inferred
      confidence:
        score: 0.74
        label: medium
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: synthesized
  - context:
      value: social
      status: inferred
      confidence:
        score: 0.58
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 9, 34
      inferenceType: derived
    userState:
      value: Wants urgency without despair.
      status: inferred
      confidence:
        score: 0.68
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 3-5, 34
      inferenceType: synthesized
    toneShift:
      value: Optimistic and human.
      status: confirmed
      confidence:
        score: 0.85
        label: high
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: paraphrased
    do:
      value:
        - Emphasize progress and action.
        - Keep urgency real.
        - Let conviction show.
      status: confirmed
      confidence:
        score: 0.85
        label: high
      sources:
        - evidenceId: D1
          locator: p. 34
      inferenceType: synthesized
    dont:
      value:
        - Center doom.
        - Flatten the message into neutral corporate prose.
      status: inferred
      confidence:
        score: 0.66
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 3-5, 34
      inferenceType: synthesized
    channelBias:
      value:
        - social
      status: inferred
      confidence:
        score: 0.55
        label: medium
      sources:
        - evidenceId: D1
          locator: p. 9
      inferenceType: derived
  - context:
      value: other
      status: inferred
      confidence:
        score: 0.55
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 9, 39
      inferenceType: derived
    userState:
      value: Reading employer-brand or identity-centered communications.
      status: inferred
      confidence:
        score: 0.73
        label: medium
      sources:
        - evidenceId: D1
          locator: pp. 9, 39
      inferenceType: synthesized
    toneShift:
      value: Respectful, authentic, and perspective-centered.
      status: confirmed
      confidence:
        score: 0.88
        label: high
      sources:
        - evidenceId: D1
          locator: pp. 9, 39
      inferenceType: synthesized
    do:
      value:
        - Reflect company values explicitly.
        - Use inclusive language.
        - Center how people identify themselves.
      status: confirmed
      confidence:
        score: 0.86
        label: high
      sources:
        - evidenceId: D1
          locator: pp. 9, 39
      inferenceType: synthesized
    dont:
      value:
        - Use internal shorthand externally.
        - Default to dominant-group framing.
      status: confirmed
      confidence:
        score: 0.82
        label: high
      sources:
        - evidenceId: D1
          locator: pp. 9, 39
      inferenceType: synthesized
    channelBias:
      value:
        - social
        - website
      status: inferred
      confidence:
        score: 0.43
        label: low
      sources:
        - evidenceId: D1
          locator: p. 9
      inferenceType: derived
  ```

## Messaging
- `messaging`:
  - `primaryObjectives`:
    ```yaml
    - educate
    - guide
    - build_trust
    - activate
    - differentiate
    ```
    - _status=inferred | inference=synthesized | confidence=medium:0.79_
    - sources: D1
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
    - _status=confirmed | inference=synthesized | confidence=high:0.86_
    - sources: D1
  - `structureRules`:
    ```yaml
    - Use active voice whenever possible.
    - Follow AP Style as a baseline.
    - Minimize unnecessary capitalization.
    - Minimize unnecessary punctuation.
    - Use the Oxford comma.
    - Keep bullets internally consistent.
    - Left-justify text.
    - Prefer links over footnotes.
    - Use one space after a sentence.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.98_
    - sources: D1
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
    - _status=confirmed | inference=synthesized | confidence=high:0.94_
    - sources: D1
  - `ctaStyle`: Confident and action-oriented, but grounded in credibility rather than pressure or theatrics.
    - _status=inferred | inference=synthesized | confidence=medium:0.68_
    - sources: D1
  - `evidenceAndClaimsRules`:
    ```yaml
    - Facts should be clear.
    - Stories should support action.
    - Climate claims should feel credible and high impact, not inflated.
    - Risk mitigation and market knowledge are legitimate proof points.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.84_
    - sources: D1
  - `localizationRules`: `not_specified`
    - _status=not_specified | inference=missing | confidence=low:0.20_

## Visual
- `visual`:
  - `logoRules`:
    ```yaml
    - Use the full-color logo whenever possible.
    - Use full-color or grayscale primarily on white, sand, or very light backgrounds.
    - Use the reversed logo on busy visuals, bright colors, or photography.
    - Maintain clear space equal to at least the height of the e in Degrees.
    - Do not use the logo in body copy.
    - Minimum size is 1.5in wide in print and 75px wide on web.
    - Do not add effects, recolor, stretch, rotate, rearrange, or place the logo on a busy image.
    - When using the brand symbol lockup, position the wordmark at 45deg from the corner of the symbol.
    - Follow separate B Corp logo rules when using the B Corp mark.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.98_
    - sources: D1
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
    - _status=confirmed | inference=synthesized | confidence=high:0.96_
    - sources: D1
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
    - _status=confirmed | inference=synthesized | confidence=high:0.96_
    - sources: D1
  - `imageryOrSymbolRules`:
    ```yaml
    - Photography should feel calm, confident, and relatable.
    - Subject matter should show subtle coexistence of humankind, nature, and business.
    - Compositions may use motion, off-center framing, depth of field, and environmental context.
    - Lighting should tend toward warm natural light, especially sunrise, sunset, or other atmospheric light.
    - Color opportunities should echo brand colors like goldenrod, navy, teals, and sand.
    - Iconography should support clarity and consistency rather than decorative excess.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.90_
    - sources: D1
  - `accessibilityRules`:
    ```yaml
    - The web palette is a reduced subset chosen for accessible application.
    - Dark navy overlays can improve legibility over photography.
    - Prefer background and contrast pairings that preserve readability.
    ```
    - _status=confirmed | inference=synthesized | confidence=medium:0.78_
    - sources: D1
  - `coBrandingRules`:
    ```yaml
    - B Corp logo usage must follow B Corp brand guidelines.
    - Employer-brand materials should stay recognizably within the 3Degrees master brand.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.82_
    - sources: D1

## Governance
- `governance`:
  - `appliesTo`:
    ```yaml
    - website
    - docs
    - email
    - social
    - press
    - partner
    - print
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.80_
    - sources: D1
  - `sourceOfTruth`:
    ```yaml
    - 3Degrees Brand Guidelines 2025
    - 3Degrees Marketing Team
    - B Corp Brand Guidelines for B Corp mark usage
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.95_
    - sources: D1
  - `precedenceRules`:
    ```yaml
    - Employer-brand expression may vary slightly in voice, writing style, and language for internal audiences while staying aligned to the master brand.
    - B Corp logo usage follows B Corp brand rules.
    - Legal documents may use the full legal company name where normal brand communication uses 3Degrees.
    ```
    - _status=confirmed | inference=synthesized | confidence=high:0.88_
    - sources: D1
  - `owners`:
    ```yaml
    - teamOrRole: 3Degrees Marketing Team
      contact: marketing_team@3degrees.com
      responsibilities:
        - Develop and manage the company brand.
        - Answer questions about the brand guidelines.
    ```
    - _status=confirmed | inference=paraphrased | confidence=high:0.97_
    - sources: D1
  - `approvalRules`: `not_specified`
    - _status=not_specified | inference=missing | confidence=low:0.18_
  - `reviewCycle`: Inclusive language guidance is planned for annual review; overall brand review cadence is not otherwise specified.
    - _status=mixed | inference=synthesized | confidence=medium:0.62_
    - sources: D1
  - `exceptionsPolicy`: Internal employer-brand shorthand and legal naming rules are explicit exceptions to the default external brand usage.
    - _status=confirmed | inference=synthesized | confidence=high:0.84_
    - sources: D1

## Examples
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
    - _status=confirmed | inference=synthesized | confidence=high:0.82_
    - sources: D1
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
    - _status=confirmed | inference=synthesized | confidence=high:0.80_
    - sources: D1
  - `scenarioExamples`:
    ```yaml
    - scenario: Decarbonization solutions page
      summary: Lead with credible action and expertise, not novelty claims.
    - scenario: Recruiting message
      summary: Use Work that matters while still sounding recognizably like the 3Degrees master brand.
    - scenario: Identity or community impact communication
      summary: Center lived experience, use specific terminology, and treat guidance as a living document.
    ```
    - _status=inferred | inference=synthesized | confidence=medium:0.70_
    - sources: D1

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
  ```

## Generation
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
- `assumptions`:
  - Business casual is normalized in the schema as a neutral register with warmth.
  - Expert partner is the closest normalized relationship role for a strategy-to-implementation climate advisor.
  - The uploaded PDF is treated as the current authoritative public-facing brand source for this example.
- `missingFieldPaths`:
  - profile.relationship.addressForm.linguisticForm
  - profile.relationship.addressForm.normalizedForm
  - profile.messaging.localizationRules
  - profile.governance.approvalRules
- `warnings`:
  - This draft is based primarily on one uploaded PDF rather than a broader website-plus-corpus research pass.
  - Tone matrix entries for support, social, and employer-brand contexts are partially inferred from general guidance rather than explicit scenario tables.
- `generatedAt`: `not_specified`
- `lastHumanReviewAt`: `not_specified`
