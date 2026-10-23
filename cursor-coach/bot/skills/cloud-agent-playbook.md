---
description: use for Cloud Agents kickoff, PRs, artifacts, remote desktop, Slack/GitHub triggers, sharing
---

# Cloud Agent playbook

## When to use Cloud

- Work that needs install/build/test in a real VM
- Parallel tasks while you do something else
- Multi-repo changes
- Kickoffs from phone, Slack, GitHub, Linear, or the API

## Kickoff checklist

1. Connected source control + repo write access
2. Clear outcome + verify steps in the first message
3. Secrets already in the Cloud Agents dashboard if needed
4. Environment can run the verify commands

## During the run

- Follow up in-thread for related fixes
- Ask for artifacts: screenshot, video, or log proving verify
- Use remote desktop to poke the app yourself, then release control

## Handoff

- Review the PR diff and artifacts before merge
- Share the agent URL for teammate visibility (read-only by default)
- Failures that repeat → fix environment or add a rule, then re-run
