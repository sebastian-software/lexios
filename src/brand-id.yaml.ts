import { parse as parseYaml, stringify as stringifyYaml } from "yaml";

import { BrandIdDraftSchema, type BrandIdDraft } from "./brand-id.schema.js";

export function parseBrandIdYaml(input: string): BrandIdDraft {
  return BrandIdDraftSchema.parse(parseYaml(input));
}

export function safeParseBrandIdYaml(input: string) {
  return BrandIdDraftSchema.safeParse(parseYaml(input));
}

export function stringifyBrandIdYaml(input: BrandIdDraft): string {
  return stringifyYaml(BrandIdDraftSchema.parse(input), {
    indent: 2,
    lineWidth: 0,
    minContentWidth: 0,
  });
}
