import { z } from "zod";

export const BrandIdSchemaVersionSchema = z.literal("0.2.0");
export type BrandIdSchemaVersion = z.infer<typeof BrandIdSchemaVersionSchema>;

export const ISODateStringSchema = z.string().min(1);
export type ISODateString = z.infer<typeof ISODateStringSchema>;

export const UrlStringSchema = z.string().url();
export type UrlString = z.infer<typeof UrlStringSchema>;

export const LocaleCodeSchema = z.string().min(1);
export type LocaleCode = z.infer<typeof LocaleCodeSchema>;

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

const NullableStringSchema = z.string().nullable();

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

export const AudienceSegmentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  knowledgeLevel: KnowledgeLevelSchema.optional(),
  needs: z.array(z.string()).optional(),
  markets: z.array(z.string()).optional(),
});
export type AudienceSegment = z.infer<typeof AudienceSegmentSchema>;

export const UserNeedSchema = z.object({
  label: z.string().min(1),
  type: z.enum(["task", "anxiety", "intent", "job_to_be_done", "other"]),
  priority: z.number().int().positive().optional(),
});
export type UserNeed = z.infer<typeof UserNeedSchema>;

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

export const ToneScenarioSchema = z.object({
  context: ToneContextSchema,
  userState: z.string().min(1),
  toneShift: z.string().min(1),
  do: z.array(z.string()),
  dont: z.array(z.string()),
  channelBias: z.array(BrandChannelSchema).optional(),
});
export type ToneScenario = z.infer<typeof ToneScenarioSchema>;

export const MessageLayerSchema = z.object({
  label: z.string().min(1),
  priority: z.number(),
  notes: z.string().optional(),
});
export type MessageLayer = z.infer<typeof MessageLayerSchema>;

export const TerminologyRuleSchema = z.object({
  preferredTerm: z.string().min(1),
  forbiddenTerms: z.array(z.string()).optional(),
  rationale: z.string().optional(),
  notes: z.string().optional(),
});
export type TerminologyRule = z.infer<typeof TerminologyRuleSchema>;

export const ColorTokenSchema = z.object({
  name: z.string().min(1),
  value: z.string().optional(),
  usage: z.string().optional(),
  note: z.string().optional(),
});
export type ColorToken = z.infer<typeof ColorTokenSchema>;

export const TypographyRuleSchema = z.object({
  role: z.string().min(1),
  fontFamily: z.array(z.string()).optional(),
  weight: z.string().optional(),
  usage: z.string().optional(),
  note: z.string().optional(),
});
export type TypographyRule = z.infer<typeof TypographyRuleSchema>;

export const GovernanceOwnerSchema = z.object({
  teamOrRole: z.string().min(1),
  contact: z.string().optional(),
  responsibilities: z.array(z.string()).optional(),
});
export type GovernanceOwner = z.infer<typeof GovernanceOwnerSchema>;

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

export const CoreProfileSchema = z.object({
  brandSummary: NullableStringSchema,
  missionOrPromise: NullableStringSchema,
  brandSelfImage: NullableStringSchema,
  categoryContext: NullableStringSchema,
  personalityTraits: z.array(z.string()),
  antiTraits: z.array(z.string()),
});
export type CoreProfile = z.infer<typeof CoreProfileSchema>;

export const AudienceProfileSchema = z.object({
  primarySegments: z.array(AudienceSegmentSchema),
  secondarySegments: z.array(AudienceSegmentSchema),
  literacyOrDomainAssumptions: NullableStringSchema,
  globalAudienceNotes: NullableStringSchema,
  userNeedsPriority: z.array(UserNeedSchema),
});
export type AudienceProfile = z.infer<typeof AudienceProfileSchema>;

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

export const VoiceProfileSchema = z.object({
  constantTraits: z.array(z.string()),
  antiTraits: z.array(z.string()),
  jargonPolicy: NullableStringSchema,
  claimsPolicy: NullableStringSchema,
  personalityGuardrails: z.array(z.string()),
});
export type VoiceProfile = z.infer<typeof VoiceProfileSchema>;

export const MessagingProfileSchema = z.object({
  primaryObjectives: z.array(MessagingObjectiveSchema),
  messageHierarchy: z.array(MessageLayerSchema),
  structureRules: z.array(z.string()),
  terminologyRules: z.array(TerminologyRuleSchema),
  ctaStyle: NullableStringSchema,
  evidenceAndClaimsRules: z.array(z.string()),
  localizationRules: z.array(z.string()).nullable(),
});
export type MessagingProfile = z.infer<typeof MessagingProfileSchema>;

export const VisualProfileSchema = z.object({
  logoRules: z.array(z.string()),
  colorSystem: z.array(ColorTokenSchema),
  typographySystem: z.array(TypographyRuleSchema),
  imageryOrSymbolRules: z.array(z.string()),
  accessibilityRules: z.array(z.string()),
  coBrandingRules: z.array(z.string()),
});
export type VisualProfile = z.infer<typeof VisualProfileSchema>;

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

export const ExamplesProfileSchema = z.object({
  doDontPairs: z.array(DoDontPairSchema),
  channelExamples: z.array(ChannelExampleSchema),
  scenarioExamples: z.array(ScenarioExampleSchema),
});
export type ExamplesProfile = z.infer<typeof ExamplesProfileSchema>;

export const BrandProfileSectionKeySchema = z.enum([
  "core",
  "audience",
  "relationship",
  "voice",
  "toneMatrix",
  "messaging",
  "visual",
  "governance",
  "examples",
]);
export type BrandProfileSectionKey = z.infer<typeof BrandProfileSectionKeySchema>;

export const BrandProfileSectionsSchema = z.object({
  core: CoreProfileSchema,
  audience: AudienceProfileSchema,
  relationship: RelationshipProfileSchema,
  voice: VoiceProfileSchema,
  toneMatrix: z.array(ToneScenarioSchema),
  messaging: MessagingProfileSchema,
  visual: VisualProfileSchema,
  governance: GovernanceProfileSchema,
  examples: ExamplesProfileSchema,
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

export const BrandProfileSchema = BrandProfileSectionsSchema.extend({
  localeOverrides: z.array(LocaleOverrideSchema),
  customSections: z.record(z.string(), z.unknown()),
});
export type BrandProfile = z.infer<typeof BrandProfileSchema>;

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

export const BrandAuditSchema = z.object({
  discovery: BrandDiscoverySchema.optional(),
  reviewStatus: ReviewStatusSchema,
  overallConfidence: ConfidenceSchema,
  completeness: z.number().min(0).max(1),
  openQuestions: z.array(z.string()),
  assumptions: z.array(z.string()),
  missingFieldPaths: z.array(BrandFieldPathSchema),
  warnings: z.array(z.string()),
  generatedAt: ISODateStringSchema.optional(),
  lastHumanReviewAt: ISODateStringSchema.optional(),
});
export type BrandAudit = z.infer<typeof BrandAuditSchema>;

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
