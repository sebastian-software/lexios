# Brand ID — Asset Storage Convention

Companion document to [rfc-0.4.md](./rfc-0.4.md). Describes where binary brand assets (logos today; more in the future) live in a Lexios repository and how `LogoAsset.path` values are resolved.

## Rule

`LogoAsset.path` is a **repo‑relative path** from the Brand ID YAML document to the asset file. Absolute URLs (`http://…`, `https://…`) are rejected by the schema. A Brand ID is always self‑contained and can be consumed offline.

## Directory layout

Assets live under `assets/brand/<brandSlug>/`, alongside the YAML they describe. Given a document at `examples/example.brand-id.yaml` with `meta.brandSlug: "example"`:

```
examples/
├── example.brand-id.yaml
└── assets/
    └── brand/
        └── example/
            ├── mark.svg
            ├── mark-inverted.svg
            ├── wordmark.svg
            ├── wordmark-inverted.svg
            ├── full.svg
            └── full-inverted.svg
```

The YAML references them relatively:

```yaml
profile:
  visual:
    logoAssets:
      - type: mark
        path: assets/brand/example/mark.svg
        format: svg
        usage: Primary mark; works on light surfaces.
      - type: mark
        path: assets/brand/example/mark-inverted.svg
        format: svg
        usage: For dark surfaces and photography overlays.
      - type: full
        path: assets/brand/example/full.svg
        format: svg
        usage: Default header lockup.
```

## Naming

The file name should identify what changes between variants, not what the file is:

- Describe the variant: `mark-inverted.svg`, not `logo-white.svg`.
- Use the asset `type` value as the base: `mark`, `wordmark`, `full`, `secondary`.
- Keep it lowercase, use hyphens, avoid version numbers in file names (versioning is git's job).

## Formats

The schema allows `svg`, `png`, `webp`, `ai`, `pdf`. Recommended rules:

- **SVG is the default** for marks, wordmarks, and full lockups. It scales, it's small, it diffs cleanly in git.
- **PNG or WebP** only when vector is not possible (e.g. raster illustrations inside the mark) or when a pre‑rasterised asset is explicitly required (favicons, specific pixel‑density rasters).
- **AI / PDF** for archival source files only. Do not reference these from `logoAssets` unless a consumer will actually read them; they are not display formats.

One `LogoAsset` entry per file. If a mark exists in SVG and PNG, emit two entries with different `format` values and `usage` descriptions.

## Consumer responsibilities

A tool that reads a Brand ID and wants to render a logo resolves `path` against the directory the YAML was loaded from. For `examples/example.brand-id.yaml` loaded at `/abs/path/to/repo/examples/example.brand-id.yaml`, the consumer resolves `assets/brand/example/mark.svg` to `/abs/path/to/repo/examples/assets/brand/example/mark.svg`.

When the document is bundled (e.g. via Vite's `?raw` import in the demo projects), the consumer has to map the relative path to a bundler‑known URL. The current demos simply name the path — they don't yet import the binary. When real logos are required in a renderer, the recommended approach is a small helper that reads `path` and fetches the file from the same relative base.

## Git hygiene

- Binary files commit cleanly; vector SVG and text‑based formats should be preferred because they diff.
- Do not commit `.ai` files larger than ~500 KB without LFS; if a brand's source files exceed that, treat them as archive storage, not repo assets.
- Keep retired variants in the directory with a `legacy-` prefix rather than deleting them; authors need to see what was retired.

## Future expansion

This document covers logo assets (v0.4). Later schema versions may add other binary assets:

- **Imagery library.** Photos that belong to the brand's identity, probably as its own `visual.imageryLibrary` field with similar rules.
- **Typography files.** Font files bundled with the brand. Non‑trivial because of licensing; likely a separate asset directory (`assets/brand/<slug>/fonts/`) with a license‑clearance annotation.

When those land, they follow the same repo‑relative convention described here. Absolute URLs remain out.
