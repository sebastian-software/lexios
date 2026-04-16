import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { createElement } from "react";

import { parseBrandIdYaml } from "../dist/brand-id.yaml.js";
import { BrandReport } from "../dist/react/index.js";

const yaml = readFileSync(new URL("../examples/3degrees.brand-id.yaml", import.meta.url), "utf8");
const document = parseBrandIdYaml(yaml);

const fullHtml = renderToStaticMarkup(createElement(BrandReport, { document }));
assert.match(fullHtml, /<article[^>]*data-lexios-report="brand-id"/);
assert.match(fullHtml, /Brand Core/);
assert.match(fullHtml, /Tone Matrix/);
assert.match(fullHtml, /Supplier REach/);
assert.match(fullHtml, /Evidence/);
assert.match(fullHtml, /Audit/);

const hiddenMetaHtml = renderToStaticMarkup(
  createElement(BrandReport, {
    document,
    showEvidence: false,
    showAudit: false,
  }),
);
assert.doesNotMatch(hiddenMetaHtml, /Evidence sources/);
assert.doesNotMatch(hiddenMetaHtml, /Review status/);

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
assert.match(overrideHtml, /data-override="core"/);
assert.match(overrideHtml, /Override core/);

console.log("React brand report smoke test passed.");
