---
title: Template configuration
description: Files and settings intended to be changed when adopting the starter.
publishedAt: 2026-08-30
updatedAt: 2026-09-06
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

The in-page table of contents includes H2 through H4 headings in both languages. Set this range with `tableOfContents.minHeadingLevel` and `tableOfContents.maxHeadingLevel` in the Starlight configuration in `astro.config.mjs`. The same headings appear in the mobile table of contents.

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

`description` appears below the page title on pages without a hero. Keep it short enough to introduce the subject before the main content.

`publishedAt` and `updatedAt` accept ISO dates. Regular pages show a small metadata row below the description when dates or tags are provided. The displayed date is `updatedAt`, or `publishedAt` when no update date is set. Dates are formatted in the page's language using UTC to avoid shifting calendar dates between time zones.

Up to three tags appear directly in the row. Four or more tags are collapsed behind a count that readers can open with a pointer or keyboard. Pages without dates or tags omit the row, as do splash pages. Dates and tags are also emitted as HTML metadata.

The header links to `/tags/`, where readers can search English titles, descriptions, and tags. Japanese content uses localized tags and is queried separately at `/ja/tags/`; the two indexes are never combined. Keep tags short and reuse the same spelling within each language instead of creating near-duplicates.

On mobile, the docs and tag links are inside the navigation menu. Pages without a sidebar have a compact menu that also includes theme and language controls.

Use `template: splash` only for wide pages such as the landing page. Regular documentation pages should keep the default layout so both navigation sidebars remain available.

## Typography and content surfaces

`src/styles/site.css` controls the shared appearance for project documentation and explanatory articles. Japanese headings use their own spacing and line height with local system fonts. An optional `<wbr>` in `hero.title` can mark a natural phrase boundary for responsive wrapping.

Both languages share a font stack that tries Inter Variable, Inter, system UI fonts, then Segoe UI Variable and Segoe UI. Japanese body text uses the browser and operating system's fallback. The shared weight rules apply to both languages, with body text at its normal weight and article headings at `650`.

Blockquotes use smaller italic text with a subtle neutral background. Japanese quotes use `--sl-text-sm`. When Source Han Code JP is installed, quotes select its local regular and bold faces for Japanese characters and allow the browser to synthesize italics, because that family's italic faces keep Japanese glyphs upright. Other characters and systems without that font use the shared font stack. This exception is scoped to quotes and does not download fonts.

Code has a separate monospace stack: SFMono-Regular, Consolas, Liberation Mono, Menlo, then `monospace`. Developer tools can therefore show Consolas when the inspected element contains code. The rendered fonts depend on installed fonts, browser settings, and the inspected text. The site does not bundle or download fonts.

Asides share rounded corners and a subtle background. Notes and tips follow the project accent; cautions and dangers retain their warning colors, labels, and icons. Change the accent through `--project-accent-hue` in `src/styles/theme.css`.
