import { parse as parseYaml, stringify as stringifyYaml, YAMLParseError } from "yaml";

import { BrandIdDraftSchema, type BrandIdDraft } from "./brand-id.schema.js";

export function parseBrandIdYaml(input: string): BrandIdDraft {
  return BrandIdDraftSchema.parse(parseYaml(input));
}

/**
 * YAMLParseError retains syntax code/message/pos/linePos; ReferenceError retains
 * the YAML converter's unresolved-alias or alias-expansion-limit diagnostic.
 */
export type BrandIdYamlParseResult =
  | ReturnType<typeof BrandIdDraftSchema.safeParse>
  | { success: false; error: YAMLParseError | ReferenceError };

/**
 * Parse user-authored YAML without throwing on YAML syntax, alias-conversion, or schema errors.
 * On failure, error is YAMLParseError (syntax), ReferenceError (aliases), or ZodError (schema).
 * Use parseBrandIdYaml for the throwing alternative.
 */
export function safeParseBrandIdYaml(input: string): BrandIdYamlParseResult {
  let value: unknown;
  try {
    value = parseYaml(input);
  } catch (error) {
    if (error instanceof YAMLParseError || error instanceof ReferenceError) {
      return { success: false, error };
    }
    throw error;
  }
  return BrandIdDraftSchema.safeParse(value);
}

export function stringifyBrandIdYaml(input: BrandIdDraft): string {
  return stringifyYaml(BrandIdDraftSchema.parse(input), {
    indent: 2,
    lineWidth: 0,
    minContentWidth: 0,
  });
}
