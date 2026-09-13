---
title: Getting started
description: Adapt the documentation starter to your open-source project.
publishedAt: 2026-08-30
updatedAt: 2026-09-13
tags:
  - setup
  - beginner
sidebar:
  order: 1
---

This starter is intentionally small. Customize the project identity, choose an accent color, and then replace the sample content with the paths your readers need most.

:::note[Before you publish]
The repository URL and project title are placeholders. Update them before deploying the site.
:::

## Install dependencies

The project uses [pnpm](https://pnpm.io/) and requires a current Node.js release supported by Astro.

```sh title="Terminal"
pnpm install
pnpm dev
```

The development server runs in the background. Use `pnpm dev:status`, `pnpm dev:logs`, and `pnpm dev:stop` to inspect or stop it.

## Set the project identity

Open `astro.config.mjs` and update the values in the `project` object:

```js title="astro.config.mjs"
const project = {
  title: 'Acme CLI Docs',
  description: 'Command-line tools for dependable release automation.',
  repository: 'https://github.com/acme/acme-cli',
  site: 'https://docs.acme.example',
  features: {
    notes: true,
  },
};
```

The metadata values drive the browser title, description metadata, canonical URL, sitemap, GitHub link, and edit links. Set `features.notes` to `false` when the project does not need a Notes section.

## Choose the accent color

Edit the single `--project-accent-hue` value near the top of `src/styles/theme.css`.

```css title="src/styles/theme.css"
:root {
  --project-accent-hue: 215; /* blue */
}
```

The light and dark palettes, navigation highlights, links, and landing-page details are derived from this hue.

## Replace the sample content

English is served from the site root. Japanese pages use the same relative path inside `src/content/docs/ja/`:

```text title="Matching translated pages"
src/content/docs/guides/installation.md
src/content/docs/ja/guides/installation.md
```

Use `.md` for ordinary content and `.mdx` when a page needs a Starlight or Astro component. Keep filenames stable so the language switcher can connect translations.

## Build before publishing

```sh title="Terminal"
pnpm build
```

The static output is written to `dist/`. A successful production build also creates the search index for both languages.

:::tip[See the visual system]
Open the [component and code showcase](/guides/showcase/) before replacing it. It demonstrates the typography, spacing, navigation, syntax themes, and common authoring patterns in one page.
:::
