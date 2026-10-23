---
description: use for Cloud Agent environments, builds, secrets, network, and verify loops
---

# Environments

An agent that cannot run your tests cannot finish the job.

## Setup levers

- Agent-led environment setup
- Saved snapshot of a working machine
- `.cursor/environment.json` for install/start config

Builds warm the snapshot so new agents start ready.

## Secrets

- Prefer Cloud Agents Secrets UI over committing `.env`
- New secrets need a new agent run to inject

## Verify loop

Document the commands the agent must run after changes, for example:

```bash
npm test
npm run lint
```

If those fail in the agent VM, fix the environment before blaming the model.
