import { StrictMode, useMemo, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import govukYaml from "../../govuk.brand-id.yaml?raw";
import mailchimpYaml from "../../mailchimp.brand-id.yaml?raw";
import gitlabYaml from "../../gitlab.brand-id.yaml?raw";
import { parseBrandIdYaml } from "../../../src/brand-id.yaml.js";
import { BrandReport } from "../../../src/react/index.js";

import "./styles.css";

type BrandKey = "govuk" | "mailchimp" | "gitlab";

const BRANDS: { key: BrandKey; label: string; yaml: string }[] = [
  { key: "govuk", label: "GOV.UK", yaml: govukYaml },
  { key: "mailchimp", label: "Mailchimp", yaml: mailchimpYaml },
  { key: "gitlab", label: "GitLab", yaml: gitlabYaml },
];

const DEFAULT_BRAND: BrandKey = "govuk";

function readBrandFromUrl(): BrandKey {
  const params = new URLSearchParams(window.location.search);
  const value = params.get("brand");
  const match = BRANDS.find((b) => b.key === value);
  return match?.key ?? DEFAULT_BRAND;
}

function App() {
  const [brand, setBrand] = useState<BrandKey>(readBrandFromUrl);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("brand") !== brand) {
      params.set("brand", brand);
      const next = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
      window.history.replaceState(null, "", next);
    }
  }, [brand]);

  const doc = useMemo(() => {
    const yaml = BRANDS.find((b) => b.key === brand)?.yaml ?? BRANDS[0]!.yaml;
    return parseBrandIdYaml(yaml);
  }, [brand]);

  return (
    <>
      <nav className="lx-brand-switch" aria-label="Brand">
        <span className="lx-brand-switch__label">Brand</span>
        {BRANDS.map((b) => (
          <button
            key={b.key}
            type="button"
            className={`lx-brand-switch__btn ${b.key === brand ? "is-active" : ""}`}
            aria-pressed={b.key === brand}
            onClick={() => setBrand(b.key)}
          >
            {b.label}
          </button>
        ))}
      </nav>
      <BrandReport document={doc} key={brand} />
    </>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing root element");
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
