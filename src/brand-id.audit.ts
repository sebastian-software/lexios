import type { BrandFieldPath, BrandIdDocument } from "./brand-id.schema.js";

/**
 * Derive the list of field paths that need author attention, replacing the
 * hand-maintained `audit.missingFieldPaths` field removed in schema v0.4.
 *
 * A path is reported as missing when either:
 *
 * - an annotation exists at that path with `status: "needs_review"`, OR
 * - a leaf in the profile tree is `null`, `undefined`, or an empty array, and
 *   there is no annotation at that path that explicitly marks it
 *   `status: "not_specified"` (i.e. an intentional blank).
 *
 * The walker only descends into plain objects and arrays; JSON-Pointer paths
 * are constructed per RFC 6901 (so `/` and `~` in keys are escaped).
 */
export function deriveMissingFieldPaths(doc: BrandIdDocument): BrandFieldPath[] {
  const out = new Set<string>();

  for (const [path, annotation] of Object.entries(doc.annotations)) {
    if (annotation.status === "needs_review") {
      out.add(path);
    }
  }

  walk("/profile", doc.profile, doc.annotations, out);

  return [...out].sort() as BrandFieldPath[];
}

function walk(
  path: string,
  value: unknown,
  annotations: BrandIdDocument["annotations"],
  out: Set<string>,
): void {
  if (isEmpty(value)) {
    const ann = annotations[path];
    if (!ann || ann.status !== "not_specified") {
      out.add(path);
    }
    return;
  }

  if (Array.isArray(value)) {
    // An array that is non-empty is itself fine; do not descend per-index for
    // missingness (elements are domain data, not schema completeness).
    return;
  }

  if (isPlainObject(value)) {
    for (const [key, child] of Object.entries(value)) {
      walk(`${path}/${escapePointerToken(key)}`, child, annotations, out);
    }
  }
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function escapePointerToken(token: string): string {
  return token.replace(/~/g, "~0").replace(/\//g, "~1");
}
