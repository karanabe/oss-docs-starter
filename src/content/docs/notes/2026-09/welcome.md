---
title: A place for project notes
description: Why this starter keeps short-lived project context separate from its guides.
slug: notes/welcome
publishedAt: 2026-09-13
tags:
  - project
  - notes
sidebar:
  hidden: true
---

Notes are useful for release updates, design decisions, experiments, and discoveries that readers may want to revisit. They are dated and listed with the newest memo first, while guides and reference pages stay focused on their own jobs.

## Write the next note

Copy this file into the matching `YYYY-MM` directory under `src/content/docs/notes/`. The filename can be short and descriptive; it does not need to contain the date. Update the title, description, publication date, tags, and body, then create the matching Japanese file under `src/content/docs/ja/notes/YYYY-MM/`.

Use `slug` when the public URL should differ from the storage path. Keep the English slug under `notes/` and use the matching `ja/notes/` path for Japanese. Add `updatedAt` when the meaning of a published note changes.
