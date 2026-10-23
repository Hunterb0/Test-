import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";

type Finding = {
  severity: "high" | "medium" | "low";
  issue: string;
  fix: string;
};

function analyze(draft: string): Finding[] {
  const findings: Finding[] = [];
  const trimmed = draft.trim();
  const lower = trimmed.toLowerCase();

  if (trimmed.length < 40) {
    findings.push({
      severity: "high",
      issue: "Prompt is too short to specify a finishable job.",
      fix: "State the outcome, any constraints, and how to verify success.",
    });
  }

  const vague =
    /\b(improve|clean up|fix|look into|optimize|refactor)\b/i.test(trimmed) &&
    !/\b(test|verify|assert|screenshot|pr|pull request|file|path)\b/i.test(
      trimmed,
    );
  if (vague) {
    findings.push({
      severity: "high",
      issue: "Goal sounds open-ended without a done condition.",
      fix: "Replace vague verbs with a concrete deliverable and acceptance check.",
    });
  }

  if (!/\b(test|verify|check|assert|lint|build|screenshot|demo)\b/i.test(lower)) {
    findings.push({
      severity: "medium",
      issue: "No verification step.",
      fix: "Tell the agent which tests, commands, or demos prove the change works.",
    });
  }

  if (!/\b(do not|don't|avoid|only|must not|leave)\b/i.test(lower)) {
    findings.push({
      severity: "low",
      issue: "No explicit non-goals or boundaries.",
      fix: "Name files or areas to leave alone so the agent stays scoped.",
    });
  }

  if (trimmed.length > 1200) {
    findings.push({
      severity: "medium",
      issue: "Prompt is long; agents can lose the main job in the noise.",
      fix: "Keep the kickoff short; put durable guidance in rules or skills instead.",
    });
  }

  if (findings.length === 0) {
    findings.push({
      severity: "low",
      issue: "No major structural gaps detected by the checklist.",
      fix: "Still confirm outcome, constraints, and verify steps are explicit.",
    });
  }

  return findings;
}

function rewriteHint(draft: string, findings: Finding[]): string {
  const needsVerify = findings.some((f) =>
    f.issue.toLowerCase().includes("verification"),
  );
  const needsScope = findings.some((f) =>
    f.issue.toLowerCase().includes("non-goals"),
  );

  const parts = [
    "Outcome: <what should be true when done>",
    `Task: ${draft.trim().slice(0, 200)}${draft.trim().length > 200 ? "…" : ""}`,
  ];
  if (needsScope) {
    parts.push("Do not change: <paths or behaviors to leave alone>");
  }
  if (needsVerify) {
    parts.push("Verify: <commands / tests / demo artifact>");
  }
  return parts.join("\n");
}

export default defineTool({
  description: prompt`
    Score a draft Cursor agent prompt against a finishable-task checklist.
    Call this when the user pastes a prompt they want improved.
  `,
  effect: "read",
  inputSchema: z.object({
    draft: z.string().min(1).max(8000).describe("The user's draft agent prompt."),
  }),
  async execute({ draft }) {
    const findings = analyze(draft);
    const high = findings.filter((f) => f.severity === "high").length;
    const score = Math.max(1, 10 - high * 3 - (findings.length - high));
    return {
      score,
      findings,
      rewriteTemplate: rewriteHint(draft, findings),
    };
  },
});
