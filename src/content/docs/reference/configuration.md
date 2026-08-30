---
title: Template configuration
description: Files and settings intended to be changed when adopting the starter.
publishedAt: 2026-08-30
updatedAt: 2026-08-30
tags:
  - configuration
  - reference
sidebar:
  order: 1
---

The starter keeps project-specific choices in a few visible locations. Change these files instead of overriding generated output or package internals.

## Project settings

| Setting | Location | Effect |
| --- | --- | --- |
| Project title | `astro.config.mjs` | Header, metadata, and browser title |
| Repository URL | `astro.config.mjs` | GitHub and page edit links |
| Site URL | `astro.config.mjs` | Canonical metadata and sitemap URLs |
| Accent hue | `src/styles/theme.css` | Accent palette in light and dark modes |
| Layout rules | `src/styles/site.css` | Typography, spacing, navigation, and landing page |
| Navigation | `astro.config.mjs` | Sidebar groups and labels |
| Page metadata | `src/content.config.ts` | Publication dates, update dates, and tags |

## Locale layout

English is the root locale and Japanese uses the `ja` directory. Every translated pair should have the same path after the locale segment.

```text
/guides/getting-started/     → src/content/docs/guides/getting-started.md
/ja/guides/getting-started/  → src/content/docs/ja/guides/getting-started.md
```

Starlight provides translated interface labels and connects matching pages in the language picker.

## Syntax highlighting

Code blocks use the following Expressive Code configuration:

```js title="astro.config.mjs"
expressiveCode: {
  themes: ['slack-ochin', 'tokyo-night'],
  useStarlightUiThemeColors: true,
  styleOverrides: { borderRadius: '0.75rem' },
}
```

`slack-ochin` is used in light mode and `tokyo-night` in dark mode. Starlight UI colors keep frames and controls visually connected to the surrounding page.

## Page frontmatter

Use a title and a concise search description on every page. Publication dates, update dates, tags, and sidebar order are optional.

```yaml
---
title: Install the CLI
description: Install the CLI on macOS, Linux, or Windows.
publishedAt: 2026-08-20
updatedAt: 2026-08-28
tags:
  - installation
  - cli
sidebar:
  order: 2
---
```

`publishedAt` and `updatedAt` accept ISO dates. The dates and tags are emitted as non-visible page metadata, so they do not add a byline or tag row to regular documentation pages.

The header links to `/tags/`, where readers can search English titles, descriptions, and tags. Japanese content uses localized tags and is queried separately at `/ja/tags/`; the two indexes are never combined. Keep tags short and reuse the same spelling within each language instead of creating near-duplicates.

Use `template: splash` only for wide pages such as the landing page. Regular documentation pages should keep the default layout so both navigation sidebars remain available.
