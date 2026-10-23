---
description: use when coaching kickoffs, prompt structure, @ mentions, or rewriting vague agent asks
---

# Prompting playbook

## Finishable prompt shape

```text
Outcome: <what is true when done>
Scope: <paths / systems to touch>
Do not: <non-goals>
Verify: <tests, commands, or demo>
```

## Strong vs weak

Weak: "Improve auth."

Strong: "Users can reset password via email link. Change only
`src/auth/**`. Do not touch OAuth. Add a unit test for expired tokens.
Open a PR and attach a screenshot of the reset form."

## Context

- `@file` / `@folder` when you already know the hotspots.
- Skip `@` when discovery is part of the job.
- Attach images for UI. Paste error text instead of paraphrasing.
- New job → new chat when the context ring is crowded.

## Model notes

Faster models for narrow edits; stronger models for multi-file design.
Switch mid-thread when exploration is done and implementation starts.
