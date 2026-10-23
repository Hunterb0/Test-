# Cursor Agent Coach

Agent SDK project that coaches you on getting more out of Cursor agents
(prompting, context, rules/skills, Cloud Agents, environments, workflows).

## Quick start

```bash
cd cursor-coach
npx @grok/agent-sdk@0.2.28 login   # once, if needed
npx @grok/agent-sdk@0.2.28 serve --dir . --mode single --dev
# open http://127.0.0.1:3000/playground
```

Try: **“Teach me how to get the most out of Cursor agents.”**

Or paste a draft kickoff and ask it to review the prompt.

## Layout

- `cursor-coach/bot/instructions.md` — coach persona
- `cursor-coach/bot/tools/` — `get_lesson`, `review_prompt`, `save_progress`
- `cursor-coach/bot/skills/` — playbooks for prompting, cloud, rules, envs
- `cursor-coach/evals/` — smoke evals

## Check

```bash
cd cursor-coach
npx @grok/agent-sdk@0.2.28 validate --dir .
npm run check
npx @grok/agent-sdk@0.2.28 tool call get_lesson --dir . --input '{"lessonId":"orientation"}'
```
