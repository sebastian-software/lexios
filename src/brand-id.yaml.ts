import { parse as parseYaml, stringify as stringifyYaml, YAMLParseError } from "yaml";

import { BrandIdDraftSchema, type BrandIdDraft } from "./brand-id.schema.js";

export function parseBrandIdYaml(input: string): BrandIdDraft {
  return BrandIdDraftSchema.parse(parseYaml(input));
}

/** A syntax failure retains YAMLParseError's code, message, pos, and linePos. */
export type BrandIdYamlParseResult =
  | ReturnType<typeof BrandIdDraftSchema.safeParse>
  | { success: false; error: YAMLParseError };

/**
 * Parse user-authored YAML without throwing on YAML syntax or schema errors.
 * On failure, error is a YAMLParseError (syntax) or ZodError (schema).
 * Use parseBrandIdYaml for the throwing alternative.
 */
export function safeParseBrandIdYaml(input: string): BrandIdYamlParseResult {
  let value: unknown;
  try {
    value = parseYaml(input);
  } catch (error) {
    if (error instanceof YAMLParseError) {
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
