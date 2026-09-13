---
title: Check Windows examples separately
description: Track the decision to verify platform-specific command behavior.
slug: notes/windows-examples
publishedAt: 2026-05-14
tags:
  - windows
  - compatibility
sidebar:
  hidden: true
---

Shell syntax, paths, and environment variables can differ on Windows. Examples that claim Windows support should be checked in the documented shell instead of inferred from a Unix command.

## Evidence to keep

Record the shell and version used for the check when the distinction matters.
