import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { YAMLParseError } from "yaml";
import { ZodError } from "zod";
import { parseBrandIdYaml, safeParseBrandIdYaml, stringifyBrandIdYaml } from "../dist/brand-id.yaml.js";

test("syntax failures retain YAML diagnostics and the throwing API still throws", () => {
  for (const input of ["meta: [", "meta: 1\nmeta: 2\n"]) {
    const result = safeParseBrandIdYaml(input);
    assert.equal(result.success, false);
    assert.ok(result.error instanceof YAMLParseError);
    assert.ok(result.error.code);
    assert.ok(result.error.message);
    assert.ok(result.error.linePos[0].line >= 1);
    assert.ok(result.error.linePos[0].col >= 1);
    assert.throws(() => parseBrandIdYaml(input), YAMLParseError);
  }
});

test("well-formed schema-invalid YAML returns Zod diagnostics", () => {
  const result = safeParseBrandIdYaml("{}");
  assert.equal(result.success, false);
  assert.ok(result.error instanceof ZodError);
  assert.ok(result.error.issues.length > 0);
  assert.throws(() => parseBrandIdYaml("{}"), ZodError);
});

for (const slug of ["govuk", "mailchimp", "gitlab"]) {
  test(`${slug} parses and survives YAML serialization`, () => {
    const input = readFileSync(new URL(`../examples/${slug}.brand-id.yaml`, import.meta.url), "utf8");
    const result = safeParseBrandIdYaml(input);
    assert.equal(result.success, true);
    assert.deepEqual(result.data, parseBrandIdYaml(input));
    assert.deepEqual(safeParseBrandIdYaml(stringifyBrandIdYaml(result.data)), result);
  });
}
