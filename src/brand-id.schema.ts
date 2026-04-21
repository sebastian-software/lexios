import { z } from "zod";

// ─────────────────────────────────────────────────────────── schema version ──

export const BrandIdSchemaVersionSchema = z.literal("0.4.0");
export type BrandIdSchemaVersion = z.infer<typeof BrandIdSchemaVersionSchema>;

// ───────────────────────────────────────────────────────────────── primitives ──

export const ISODateStringSchema = z.string().min(1);
export type ISODateString = z.infer<typeof ISODateStringSchema>;

export const UrlStringSchema = z.string().url();
export type UrlString = z.infer<typeof UrlStringSchema>;

export const LocaleCodeSchema = z.string().min(1);
export type LocaleCode = z.infer<typeof LocaleCodeSchema>;

const NullableStringSchema = z.string().nullable();

// ───────────────────────────────────────────────────────────── status enums ──

export const DraftStatusSchema = z.enum([
  "seeded",
  "researching",
  "draft",
  "reviewed",
  "approved",
  "published",
  "archived",
]);
export type DraftStatus = z.infer<typeof DraftStatusSchema>;

export const ReviewStatusSchema = z.enum(["not_started", "needs_review", "in_review", "reviewed"]);
export type ReviewStatus = z.infer<typeof ReviewStatusSchema>;

export const ConfidenceLabelSchema = z.enum(["low", "medium", "high"]);
export type ConfidenceLabel = z.infer<typeof ConfidenceLabelSchema>;

export const AnnotationStatusSchema = z.enum([
  "confirmed",
  "inferred",
  "mixed",
  "not_specified",
  "needs_review",
  "rejected",
]);
export type AnnotationStatus = z.infer<typeof AnnotationStatusSchema>;

export const EvidenceBasisSchema = z.enum([
  "quoted",
  "paraphrased",
  "synthesized",
  "derived",
  "assumed",
  "missing",
  "manual",
]);
export type EvidenceBasis = z.infer<typeof EvidenceBasisSchema>;

export const EvidenceKindSchema = z.enum([
  "website",
  "web_page",
  "brand_guide",
  "style_guide",
  "press_kit",
  "pdf",
  "social_profile",
  "video",
  "manual_note",
  "interview",
  "other",
]);
export type EvidenceKind = z.infer<typeof EvidenceKindSchema>;

export const EvidenceOfficialitySchema = z.enum(["official", "semi_official", "third_party"]);
export type EvidenceOfficiality = z.infer<typeof EvidenceOfficialitySchema>;

export const EvidenceAccessSchema = z.enum([
  "public_html",
  "public_pdf",
  "public_asset",
  "uploaded_file",
  "manual_entry",
  "other",
]);
export type EvidenceAccess = z.infer<typeof EvidenceAccessSchema>;

export const DiscoveryMaterialTypeSchema = z.enum([
  "brand_guide",
  "style_guide",
  "logo_pack",
  "press_kit",
  "about_page",
  "product_copy",
  "careers",
  "legal",
  "social_profile",
  "other",
]);
export type DiscoveryMaterialType = z.infer<typeof DiscoveryMaterialTypeSchema>;

export const BrandChannelSchema = z.enum([
  "website",
  "product_ui",
  "docs",
  "email",
  "sales",
  "support",
  "social",
  "ads",
  "press",
  "events",
  "partner",
  "print",
  "video",
  "other",
]);
export type BrandChannel = z.infer<typeof BrandChannelSchema>;

// ─────────────────────────────────────── relationship / tone / messaging enums ──

export const RegisterLevelSchema = z.enum(["formal", "neutral", "informal", "adaptive"]);
export type RegisterLevel = z.infer<typeof RegisterLevelSchema>;

export const AddressFormKindSchema = z.enum([
  "formal_second_person",
  "informal_second_person",
  "mixed",
  "no_direct_address",
  "not_applicable",
]);
export type AddressFormKind = z.infer<typeof AddressFormKindSchema>;

export const AuthorityLevelSchema = z.enum([
  "deferential",
  "balanced",
  "directive",
  "expert_led",
  "peer_led",
]);
export type AuthorityLevel = z.infer<typeof AuthorityLevelSchema>;

export const HumorDistanceSchema = z.enum(["absent", "subtle", "frequent", "restricted"]);
export type HumorDistance = z.infer<typeof HumorDistanceSchema>;

export const RelationshipRoleSchema = z.enum([
  "guide",
  "peer",
  "teacher",
  "authority",
  "host",
  "expert_partner",
  "coach",
  "other",
]);
export type RelationshipRole = z.infer<typeof RelationshipRoleSchema>;

export const ToneContextSchema = z.enum([
  "onboarding",
  "success",
  "error",
  "support",
  "legal",
  "localization",
  "partner",
  "sales",
  "retention",
  "crisis",
  "social",
  "other",
]);
export type ToneContext = z.infer<typeof ToneContextSchema>;

export const MessagingObjectiveSchema = z.enum([
  "educate",
  "reassure",
  "convert",
  "guide",
  "differentiate",
  "build_trust",
  "activate",
  "retain",
  "comply",
  "other",
]);
export type MessagingObjective = z.infer<typeof MessagingObjectiveSchema>;

export const KnowledgeLevelSchema = z.enum(["general", "aware", "practitioner", "expert", "mixed"]);
export type KnowledgeLevel = z.infer<typeof KnowledgeLevelSchema>;

// ────────────────────────────────────────────────────────────────── lexicon ──

export const LexiconEntryKindSchema = z.enum([
  "brand",
  "product",
  "service",
  "feature",
  "method",
  "program",
  "legal",
  "industry",
  "people",
  "domain_term",
  "other",
]);
export type LexiconEntryKind = z.infer<typeof LexiconEntryKindSchema>;

export const LexiconTranslationPolicySchema = z.enum([
  "translate",
  "do_not_translate",
  "transcreate",
  "locale_specific",
  "not_specified",
]);
export type LexiconTranslationPolicy = z.infer<typeof LexiconTranslationPolicySchema>;

// ───────────────────────────────────────────────────────────── trait spectrum ──

// 90 canonical pole identifiers (each pole of each axis). Authors never type
// these freely — only the 45 approved axis pairings below are valid.
export const TraitIdSchema = z.enum([
  // Register
  "formal", "informal", "casual",
  // Temperature & proximity
  "warm", "cool", "intimate", "distant",
  // Energy, playfulness
  "energetic", "calm", "playful", "serious",
  // Confidence, daring, modesty
  "confident", "tentative", "daring", "cautious", "modest", "proud",
  // Complexity, sophistication
  "technical", "plain", "sophisticated", "simple",
  // Authority posture
  "authoritative", "collaborative", "expert", "peer", "directive", "suggestive",
  // Emotional stance
  "optimistic", "realistic", "enthusiastic", "measured",
  // Credibility
  "credible", "hypey", "authentic", "promotional", "grounded", "aspirational",
  // Precision, rigor
  "precise", "fluid", "rigorous", "loose",
  // Aesthetic weight
  "bold", "restrained", "loud", "quiet", "dramatic", "subtle",
  // Orientation in time
  "innovative", "traditional", "modern", "heritage", "forward-looking", "settled",
  // Humor
  "witty", "earnest", "dry", "sincere", "expressive", "reserved",
  // Care posture
  "nurturing", "clinical", "compassionate", "detached", "reassuring", "informational",
  // Trust / finance posture
  "transparent", "opaque", "prudent", "opportunistic", "disciplined", "spontaneous",
  // Luxury / craft posture
  "refined", "pragmatic", "exclusive", "accessible", "timeless", "trendy",
  "crafted", "industrial",
  // Entertainment posture
  "thrilling", "steady", "immersive", "observational",
  // Vision vs. grounding
  "practical", "visionary", "curious", "resolved",
  // Addressing
  "inclusive", "selective",
]);
export type TraitId = z.infer<typeof TraitIdSchema>;

// Canonical axis list: only these pole combinations are allowed.
// Order (positive, negative) is the convention but either side of any pair
// is accepted in authored content.
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

function isCanonicalAxis(a: TraitId, b: TraitId): boolean {
  return TRAIT_AXES.some(
    ([p, n]) => (a === p && b === n) || (a === n && b === p),
  );
}

export const IconRefSchema = z.object({
  // v0.4 supports Lucide only. Expansion to additional sets is a later schema change.
  set: z.literal("lucide"),
  name: z.string().min(1),
});
export type IconRef = z.infer<typeof IconRefSchema>;

export const TraitPairSchema = z
  .object({
    positivePole: TraitIdSchema,
    negativePole: TraitIdSchema,
    // −1 = fully at negative pole, 0 = neutral, +1 = fully at positive pole.
    weight: z.number().min(-1).max(1),
    icon: IconRefSchema.optional(),
    // Brand-specific nuance the enum cannot express. Not a second axis system.
    note: z.string().optional(),
  })
  .refine(
    (p) => p.positivePole !== p.negativePole && isCanonicalAxis(p.positivePole, p.negativePole),
    {
      message:
        "positivePole/negativePole must be distinct and form a canonical axis from TRAIT_AXES.",
    },
  );
export type TraitPair = z.infer<typeof TraitPairSchema>;

// ─────────────────────────────────────────────────────── confidence + annotations ──

export const ConfidenceSchema = z.object({
  score: z.number().min(0).max(1),
  label: ConfidenceLabelSchema,
  rationale: z.string().optional(),
});
export type Confidence = z.infer<typeof ConfidenceSchema>;

export const EvidenceReferenceSchema = z.object({
  evidenceId: z.string().min(1),
  locator: z.string().optional(),
  excerpt: z.string().optional(),
  notes: z.string().optional(),
});
export type EvidenceReference = z.infer<typeof EvidenceReferenceSchema>;

export const BrandFieldPathSchema = z.string().regex(/^\//, "Brand field paths must be JSON Pointer strings.");
export type BrandFieldPath = z.infer<typeof BrandFieldPathSchema>;

export const FieldAnnotationSchema = z.object({
  status: AnnotationStatusSchema,
  confidence: ConfidenceSchema,
  basis: EvidenceBasisSchema,
  sources: z.array(EvidenceReferenceSchema),
  notes: z.string().optional(),
  lastReviewedAt: ISODateStringSchema.nullable().optional(),
});
export type FieldAnnotation = z.infer<typeof FieldAnnotationSchema>;

export const BrandAnnotationsSchema = z.record(BrandFieldPathSchema, FieldAnnotationSchema);
export type BrandAnnotations = z.infer<typeof BrandAnnotationsSchema>;

// ─────────────────────────────────────────────────────────────────── meta ──

export const SeedInputSchema = z.object({
  kind: EvidenceKindSchema,
  label: z.string().min(1),
  url: UrlStringSchema.optional(),
  notes: z.string().optional(),
});
export type SeedInput = z.infer<typeof SeedInputSchema>;

export const BrandIdMetaSchema = z.object({
  schema: z.object({
    id: z.literal("brand-id"),
    version: BrandIdSchemaVersionSchema,
  }),
  brandName: z.string().min(1),
  brandSlug: z.string().min(1),
  legalEntityName: z.string().optional(),
  canonicalDomain: z.string().optional(),
  status: DraftStatusSchema,
  createdAt: ISODateStringSchema,
  updatedAt: ISODateStringSchema,
  primaryLocale: LocaleCodeSchema.optional(),
  supportedLocales: z.array(LocaleCodeSchema),
  seedInputs: z.array(SeedInputSchema),
  tags: z.array(z.string()),
});
export type BrandIdMeta = z.infer<typeof BrandIdMetaSchema>;

// ───────────────────────────────────────────────────────── discovery (unchanged) ──

export const WebsiteDiscoverySchema = z.object({
  seedUrl: UrlStringSchema,
  canonicalDomain: z.string().nullable(),
  detectedLocales: z.array(LocaleCodeSchema),
  detectedMarkets: z.array(z.string()),
  detectedChannels: z.array(BrandChannelSchema),
  pageSignals: z.array(z.string()),
});
export type WebsiteDiscovery = z.infer<typeof WebsiteDiscoverySchema>;

export const DiscoveredMaterialSchema = z.object({
  label: z.string().min(1),
  type: DiscoveryMaterialTypeSchema,
  url: UrlStringSchema.optional(),
  officiality: EvidenceOfficialitySchema,
  relevance: z.string().optional(),
  notes: z.string().optional(),
});
export type DiscoveredMaterial = z.infer<typeof DiscoveredMaterialSchema>;

export const BrandDiscoverySchema = z.object({
  website: WebsiteDiscoverySchema.optional(),
  materials: z.array(DiscoveredMaterialSchema),
  unresolvedQuestions: z.array(z.string()),
  excludedMaterials: z.array(z.string()),
});
export type BrandDiscovery = z.infer<typeof BrandDiscoverySchema>;

// ─────────────────────────────────────────────────────────────── audience ──

export const UserNeedSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["task", "anxiety", "intent", "job_to_be_done", "other"]),
  priority: z.number().int().positive().optional(),
});
export type UserNeed = z.infer<typeof UserNeedSchema>;

// v0.4: needsPriority replaces the weak `needs: string[]`. Prioritised, typed needs
// live inside the segment they belong to — not at the root of the audience profile.
export const AudienceSegmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  knowledgeLevel: KnowledgeLevelSchema.optional(),
  markets: z.array(z.string()).optional(),
  needsPriority: z.array(UserNeedSchema),
});
export type AudienceSegment = z.infer<typeof AudienceSegmentSchema>;

export const AudienceProfileSchema = z.object({
  primarySegments: z.array(AudienceSegmentSchema),
  secondarySegments: z.array(AudienceSegmentSchema),
  literacyOrDomainAssumptions: NullableStringSchema,
  globalAudienceNotes: NullableStringSchema,
});
export type AudienceProfile = z.infer<typeof AudienceProfileSchema>;

// ─────────────────────────────────────────────────────────── relationship ──

export const AddressFormPolicySchema = z.object({
  linguisticForm: NullableStringSchema,
  normalizedForm: AddressFormKindSchema.nullable(),
  notes: NullableStringSchema,
});
export type AddressFormPolicy = z.infer<typeof AddressFormPolicySchema>;

export const RegisterPolicySchema = z.object({
  defaultLevel: RegisterLevelSchema.nullable(),
  adaptationPolicy: NullableStringSchema,
});
export type RegisterPolicy = z.infer<typeof RegisterPolicySchema>;

export const RelationshipProfileSchema = z.object({
  addressForm: AddressFormPolicySchema,
  register: RegisterPolicySchema,
  role: RelationshipRoleSchema.nullable(),
  stance: NullableStringSchema,
  authorityLevel: AuthorityLevelSchema.nullable(),
  customerView: NullableStringSchema,
  pronounPolicy: NullableStringSchema,
  humorDistance: HumorDistanceSchema.nullable(),
});
export type RelationshipProfile = z.infer<typeof RelationshipProfileSchema>;

// ───────────────────────────────────────────────────────────── tone scenarios ──

export const ToneScenarioSchema = z.object({
  context: ToneContextSchema,
  userState: z.string().min(1),
  toneShift: z.string().min(1),
  do: z.array(z.string()),
  dont: z.array(z.string()),
  channelBias: z.array(BrandChannelSchema).optional(),
});
export type ToneScenario = z.infer<typeof ToneScenarioSchema>;

// ────────────────────────────────────────────────────────────── messaging ──

export const MessageLayerSchema = z.object({
  label: z.string().min(1),
  priority: z.number(),
  notes: z.string().optional(),
});
export type MessageLayer = z.infer<typeof MessageLayerSchema>;

// v0.4: terminologyRules removed. Single-term preferences migrate to lexicon;
// cross-cutting style rules to structureRules; pronoun preferences to
// relationship.pronounPolicy.
export const MessagingProfileSchema = z.object({
  primaryObjectives: z.array(MessagingObjectiveSchema),
  messageHierarchy: z.array(MessageLayerSchema),
  structureRules: z.array(z.string()),
  ctaStyle: NullableStringSchema,
  evidenceAndClaimsRules: z.array(z.string()),
  localizationRules: z.array(z.string()).nullable(),
});
export type MessagingProfile = z.infer<typeof MessagingProfileSchema>;

// ───────────────────────────────────────────────────────────────────── core ──

// v0.4: personalityTraits + antiTraits replaced by traitSpectrum (controlled,
// weighted, axis-validated).
export const CoreProfileSchema = z.object({
  brandSummary: NullableStringSchema,
  missionOrPromise: NullableStringSchema,
  brandSelfImage: NullableStringSchema,
  categoryContext: NullableStringSchema,
  traitSpectrum: z.array(TraitPairSchema),
});
export type CoreProfile = z.infer<typeof CoreProfileSchema>;

// ──────────────────────────────────────────────────────────────────── voice ──

export const JargonDefaultSchema = z.enum(["avoid", "contextual", "embrace"]);
export type JargonDefault = z.infer<typeof JargonDefaultSchema>;

export const JargonPolicySchema = z.object({
  default: JargonDefaultSchema,
  // Keys are lexicon entry terms; values are the preferred first-use definition.
  firstUseDefinitions: z.record(z.string(), z.string()).optional(),
  notes: z.string().optional(),
});
export type JargonPolicy = z.infer<typeof JargonPolicySchema>;

export const PlainLanguagePolicySchema = z.object({
  // Flesch-Kincaid grade level (US school grade). For non-English locales use
  // a recognised language analogue (e.g. Flesch-Amstad for German) reported
  // against the same numeric scale. Typical targets: 6–8 consumer copy,
  // 9–12 professional/editorial, 13+ academic.
  readingLevel: z.number().positive().optional(),
  maxSentenceLength: z.number().int().positive().optional(),
  notes: z.string().optional(),
});
export type PlainLanguagePolicy = z.infer<typeof PlainLanguagePolicySchema>;

// v0.4: constantTraits + antiTraits removed. Voice is now strictly about *how
// the brand writes*, not what adjectives it would use about itself (that is
// core's job via traitSpectrum).
export const VoiceProfileSchema = z.object({
  jargonPolicy: JargonPolicySchema.nullable(),
  plainLanguage: PlainLanguagePolicySchema.nullable(),
  claimsPolicy: NullableStringSchema,
  personalityGuardrails: z.array(z.string()),
});
export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;

// ────────────────────────────────────────────────────────────────── lexicon ──

// v0.4: added contextualMeaning (what *this* brand means by a generic word),
// translationNotes (per-locale translator guidance), and kind `domain_term`
// for words the brand interprets but does not own.
export const LexiconEntrySchema = z.object({
  term: z.string().min(1),
  definition: z.string().min(1),
  contextualMeaning: z.string().optional(),
  translationNotes: z.record(LocaleCodeSchema, z.string()).optional(),
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
export type LexiconEntry = z.infer<typeof LexiconEntrySchema>;

export const LexiconProfileSchema = z.object({
  entries: z.array(LexiconEntrySchema),
  generalRules: z.array(z.string()),
});
export type LexiconProfile = z.infer<typeof LexiconProfileSchema>;

// ─────────────────────────────────────────────────────────────────── visual ──

export const ColorTokenSchema = z.object({
  name: z.string().min(1),
  value: z.string().optional(),
  usage: z.string().optional(),
  note: z.string().optional(),
});
export type ColorToken = z.infer<typeof ColorTokenSchema>;

// v0.4: fontFamily is a single family string (no fallback array). Weight and
// note removed; that's implementation detail, not brand knowledge. `usage` is
// now required because a role without a use case is not a brand decision.
export const TypographyRuleSchema = z.object({
  role: z.string().min(1),
  fontFamily: z.string().min(1),
  usage: z.string().min(1),
});
export type TypographyRule = z.infer<typeof TypographyRuleSchema>;

export const LogoAssetTypeSchema = z.enum([
  "mark",       // standalone icon/mark (monogram, emblem)
  "wordmark",   // text-only logotype
  "full",       // mark + wordmark combined
  "secondary",  // additional approved variant
]);
export type LogoAssetType = z.infer<typeof LogoAssetTypeSchema>;

export const LogoAssetFormatSchema = z.enum(["svg", "png", "webp", "ai", "pdf"]);
export type LogoAssetFormat = z.infer<typeof LogoAssetFormatSchema>;

export const LogoAssetSchema = z.object({
  type: LogoAssetTypeSchema,
  // Repo-relative path from the YAML document (e.g. "assets/brand/<slug>/mark.svg").
  // Absolute URLs are rejected so a Brand ID stays self-contained and offline-usable.
  path: z
    .string()
    .min(1)
    .refine((p) => !/^https?:\/\//i.test(p), {
      message: "logoAssets.path must be repo-relative; absolute URLs are not allowed in v0.4.",
    }),
  format: LogoAssetFormatSchema,
  usage: z.string().optional(),
  minSize: z.number().optional(),
});
export type LogoAsset = z.infer<typeof LogoAssetSchema>;

export const VisualProfileSchema = z.object({
  logoRules: z.array(z.string()),
  logoAssets: z.array(LogoAssetSchema),
  colorSystem: z.array(ColorTokenSchema),
  typographySystem: z.array(TypographyRuleSchema),
  imageryOrSymbolRules: z.array(z.string()),
  accessibilityRules: z.array(z.string()),
  coBrandingRules: z.array(z.string()),
});
export type VisualProfile = z.infer<typeof VisualProfileSchema>;

// ─────────────────────────────────────────────────────────────── governance ──

export const GovernanceOwnerSchema = z.object({
  teamOrRole: z.string().min(1),
  contact: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
});
export type GovernanceOwner = z.infer<typeof GovernanceOwnerSchema>;

export const GovernanceProfileSchema = z.object({
  appliesTo: z.array(BrandChannelSchema),
  sourceOfTruth: z.array(z.string()),
  precedenceRules: z.array(z.string()),
  owners: z.array(GovernanceOwnerSchema),
  approvalRules: z.array(z.string()).nullable(),
  reviewCycle: NullableStringSchema,
  exceptionsPolicy: NullableStringSchema,
});
export type GovernanceProfile = z.infer<typeof GovernanceProfileSchema>;

// ──────────────────────────────────────────────────── illustrations (renamed) ──

export const DoDontPairSchema = z.object({
  do: z.string().min(1),
  dont: z.string().min(1),
  rationale: z.string().optional(),
});
export type DoDontPair = z.infer<typeof DoDontPairSchema>;

export const ChannelExampleSchema = z.object({
  channel: BrandChannelSchema,
  example: z.string().min(1),
  rationale: z.string().optional(),
});
export type ChannelExample = z.infer<typeof ChannelExampleSchema>;

export const ScenarioExampleSchema = z.object({
  scenario: z.string().min(1),
  summary: z.string().min(1),
  example: z.string().optional(),
  rationale: z.string().optional(),
});
export type ScenarioExample = z.infer<typeof ScenarioExampleSchema>;

// v0.4: renamed from "examples" to disambiguate from the examples/ directory.
export const IllustrationsProfileSchema = z.object({
  doDontPairs: z.array(DoDontPairSchema),
  channelExamples: z.array(ChannelExampleSchema),
  scenarioExamples: z.array(ScenarioExampleSchema),
});
export type IllustrationsProfile = z.infer<typeof IllustrationsProfileSchema>;

// ───────────────────────────────────────────────────────── profile assembly ──

// v0.4: toneMatrix → toneScenarios (honest name: it's a list, not a matrix).
// v0.4: examples → illustrations (disambiguates from the examples/ directory).
export const BrandProfileSectionKeySchema = z.enum([
  "core",
  "audience",
  "relationship",
  "voice",
  "lexicon",
  "toneScenarios",
  "messaging",
  "visual",
  "governance",
  "illustrations",
]);
export type BrandProfileSectionKey = z.infer<typeof BrandProfileSectionKeySchema>;

export const BrandProfileSectionsSchema = z.object({
  core: CoreProfileSchema,
  audience: AudienceProfileSchema,
  relationship: RelationshipProfileSchema,
  voice: VoiceProfileSchema,
  lexicon: LexiconProfileSchema,
  toneScenarios: z.array(ToneScenarioSchema),
  messaging: MessagingProfileSchema,
  visual: VisualProfileSchema,
  governance: GovernanceProfileSchema,
  illustrations: IllustrationsProfileSchema,
});
export type BrandProfileSections = z.infer<typeof BrandProfileSectionsSchema>;

export const LocaleOverrideSchema = z.object({
  locale: LocaleCodeSchema,
  markets: z.array(z.string()).optional(),
  notes: z.array(z.string()).optional(),
  // Locale overrides stay intentionally flexible because partial nested brand slices
  // are common and should not force a second rigid schema shape.
  overrides: z.record(z.string(), z.unknown()),
});
export type LocaleOverride = z.infer<typeof LocaleOverrideSchema>;

// v0.4: customSections removed. Every piece of a brand record must fit the
// schema or be a proper RFC for the next version.
export const BrandProfileSchema = BrandProfileSectionsSchema.extend({
  localeOverrides: z.array(LocaleOverrideSchema),
});
export type BrandProfile = z.infer<typeof BrandProfileSchema>;

// ───────────────────────────────────────────────────────────── evidence ──

export const EvidenceItemSchema = z.object({
  id: z.string().min(1),
  kind: EvidenceKindSchema,
  title: z.string().min(1),
  url: UrlStringSchema.optional(),
  officiality: EvidenceOfficialitySchema,
  access: EvidenceAccessSchema,
  publisher: z.string().optional(),
  language: LocaleCodeSchema.optional(),
  summary: z.string().optional(),
  capturedAt: ISODateStringSchema.optional(),
  lastVerifiedAt: ISODateStringSchema.optional(),
  tags: z.array(z.string()).optional(),
});
export type EvidenceItem = z.infer<typeof EvidenceItemSchema>;

// ────────────────────────────────────────────────────────────────── audit ──

// v0.4: missingFieldPaths removed. Consumers should call
// deriveMissingFieldPaths(doc) from "./brand-id.audit.ts" instead — incompleteness
// is derived from annotations and empty leaves, not hand-maintained.
export const BrandAuditSchema = z.object({
  discovery: BrandDiscoverySchema.optional(),
  reviewStatus: ReviewStatusSchema,
  overallConfidence: ConfidenceSchema,
  completeness: z.number().min(0).max(1),
  openQuestions: z.array(z.string()),
  assumptions: z.array(z.string()),
  warnings: z.array(z.string()),
  generatedAt: ISODateStringSchema.optional(),
  lastHumanReviewAt: ISODateStringSchema.optional(),
});
export type BrandAudit = z.infer<typeof BrandAuditSchema>;

// ──────────────────────────────────────────────────────────────── document ──

export const BrandIdDocumentSchema = z.object({
  meta: BrandIdMetaSchema,
  profile: BrandProfileSchema,
  evidence: z.array(EvidenceItemSchema),
  annotations: BrandAnnotationsSchema,
  audit: BrandAuditSchema,
});
export type BrandIdDocument = z.infer<typeof BrandIdDocumentSchema>;

export const BrandIdDraftSchema = BrandIdDocumentSchema;
export type BrandIdDraft = BrandIdDocument;
