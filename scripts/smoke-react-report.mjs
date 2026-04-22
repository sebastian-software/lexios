import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

import { parseBrandIdYaml } from "../dist/brand-id.yaml.js";
import { BrandReport } from "../dist/react/index.js";

const BRANDS = [
  { slug: "govuk", expectedSubstring: "GOV.UK" },
  { slug: "mailchimp", expectedSubstring: "Mailchimp" },
  { slug: "gitlab", expectedSubstring: "GitLab" },
];

for (const { slug, expectedSubstring } of BRANDS) {
  const yaml = readFileSync(new URL(`../examples/${slug}.brand-id.yaml`, import.meta.url), "utf8");
  const document = parseBrandIdYaml(yaml);

  const fullHtml = renderToStaticMarkup(createElement(BrandReport, { document }));
  assert.match(fullHtml, /<article[^>]*data-lexios-report="brand-id"/, `${slug}: expected article wrapper`);
  assert.match(fullHtml, new RegExp(expectedSubstring), `${slug}: expected brand name to appear`);
  assert.match(fullHtml, /Brand Core/, `${slug}: expected Brand Core section`);
  assert.match(fullHtml, /Tone Scenarios/, `${slug}: expected Tone Scenarios section`);
  assert.match(fullHtml, /Illustrations/, `${slug}: expected Illustrations section`);
  assert.match(fullHtml, /Evidence/, `${slug}: expected Evidence section`);
  assert.match(fullHtml, /Audit/, `${slug}: expected Audit section`);

  const hiddenMetaHtml = renderToStaticMarkup(
    createElement(BrandReport, { document, showEvidence: false, showAudit: false }),
  );
  assert.doesNotMatch(hiddenMetaHtml, /Evidence sources/, `${slug}: evidence should be hidden`);
  assert.doesNotMatch(hiddenMetaHtml, /Review status/, `${slug}: audit should be hidden`);

  const overrideHtml = renderToStaticMarkup(
    createElement(BrandReport, {
      document,
      sectionOrder: ["core"],
      showEvidence: false,
      showAudit: false,
      renderSection: {
        core: () => createElement("section", { "data-override": "core" }, "Override core"),
      },
    }),
  );
  assert.match(overrideHtml, /data-override="core"/, `${slug}: renderSection override missing`);
  assert.match(overrideHtml, /Override core/, `${slug}: override content missing`);
}

console.log(`React brand report smoke test passed for ${BRANDS.length} brands.`);
