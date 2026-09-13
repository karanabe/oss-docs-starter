---
title: Clarify configuration ownership
description: Record which files own project metadata, colors, and layout rules.
slug: notes/config-ownership
publishedAt: 2026-08-12
tags:
  - configuration
  - maintenance
sidebar:
  hidden: true
---

Project metadata belongs in `astro.config.mjs`, the accent starts in `theme.css`, and shared presentation belongs in `site.css`. Keeping those boundaries visible makes later changes easier to review.

## Follow-up

Update the configuration reference when ownership moves between files.
