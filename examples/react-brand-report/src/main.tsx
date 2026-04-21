import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import brandYaml from "../../example.brand-id.yaml?raw";
import { parseBrandIdYaml } from "../../../src/brand-id.yaml.js";
import { BrandReport } from "../../../src/react/index.js";

import "./styles.css";

const brandDocument = parseBrandIdYaml(brandYaml);
const root = document.getElementById("root");

if (!root) {
  throw new Error("Missing root element");
}

createRoot(root).render(
  <StrictMode>
    <BrandReport document={brandDocument} />
  </StrictMode>,
);
