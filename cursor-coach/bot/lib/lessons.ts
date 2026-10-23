export type LessonId =
  | "orientation"
  | "prompting"
  | "context"
  | "rules-skills"
  | "cloud-agents"
  | "environments"
  | "workflows"
  | "review-loop";

export type Lesson = {
  id: LessonId;
  title: string;
  goal: string;
  points: string[];
  practice: string;
  next: LessonId | null;
};

export const LESSON_ORDER: LessonId[] = [
  "orientation",
  "prompting",
  "context",
  "rules-skills",
  "cloud-agents",
  "environments",
  "workflows",
  "review-loop",
];

export const LESSONS: Record<LessonId, Lesson> = {
  orientation: {
    id: "orientation",
    title: "What Cursor agents are good at",
    goal: "Know when to use Agent vs asking a one-off question, and where Cloud Agents fit.",
    points: [
      "Agent is for multi-step work: explore, edit, run, verify, open a PR.",
      "Cloud Agents run in isolated VMs so they can build, test, and demo without your laptop staying online.",
      "You can start agents from Desktop, Web (cursor.com/agents), iOS, Slack, GitHub/Bitbucket comments, Linear, or the API.",
      "Parallel agents multiply throughput: different tasks or repos at once.",
      "The biggest lever is a good environment + clear task, not a magic model pick.",
    ],
    practice:
      "Name one task you would give a Cloud Agent this week and one you would keep local. Why?",
    next: "prompting",
  },
  prompting: {
    id: "prompting",
    title: "Prompt so the agent can finish",
    goal: "Write prompts that state outcome, constraints, and how to verify success.",
    points: [
      "Lead with the outcome: what should be true when the agent is done.",
      "Add constraints: files/areas to touch, patterns to match, what not to change.",
      "Say how to verify: tests to run, pages to open, screenshots to capture.",
      "Prefer one clear job per run; split large work into follow-ups or parallel agents.",
      "Vague goals like 'improve the app' waste context. Concrete diffs win.",
    ],
    practice:
      "Rewrite a vague ask ('clean up auth') into a finishable prompt with outcome + verify steps.",
    next: "context",
  },
  context: {
    id: "context",
    title: "Give the right context",
    goal: "Use @ mentions and attachments when you know what matters; let search handle the rest.",
    points: [
      "Use @ for known files, folders, terminals, chats, git diffs, or Browser context.",
      "If you are unsure which files matter, skip @ — Agent will search.",
      "Paste screenshots or mockups for UI work instead of describing pixels.",
      "Watch the context ring: long chats summarize older turns; start a fresh chat for a new job.",
      "Attach only what changes the answer; more context is not always better.",
    ],
    practice:
      "For a bugfix a failing test, list exactly what you would @-mention and why.",
    next: "rules-skills",
  },
  "rules-skills": {
    id: "rules-skills",
    title: "Rules, AGENTS.md, and skills",
    goal: "Encode durable project knowledge so you stop repeating yourself.",
    points: [
      "Project rules live in `.cursor/rules` as `.mdc` with frontmatter; plain `.md` there is ignored.",
      "Use Always Apply sparingly; prefer globs or intelligent apply with a clear description.",
      "AGENTS.md is the simple alternative for short project instructions.",
      "Skills (`/` menu) are procedures for how to work; Custom Modes keep a skill active across a long task.",
      "Add a rule only after the agent repeats a mistake — do not dump a style guide.",
    ],
    practice:
      "Draft one short rule you would add for your main repo (scope + 3 bullets).",
    next: "cloud-agents",
  },
  "cloud-agents": {
    id: "cloud-agents",
    title: "Cloud Agents in practice",
    goal: "Kick off, steer, and hand off Cloud Agent work confidently.",
    points: [
      "Cloud Agents clone your repo, work on a branch, push, and open a PR for review.",
      "Share the agent URL with teammates (read-only unless team follow-ups are enabled).",
      "Artifacts (screenshots, videos, logs) prove the agent verified the change.",
      "Remote desktop lets you test in the agent VM without checking out locally.",
      "MCP connectors give agents databases, tickets, Slack, and other tools your team configures.",
    ],
    practice:
      "Write a Cloud Agent kickoff for a small PR: goal, branch expectations, and demo artifact.",
    next: "environments",
  },
  environments: {
    id: "environments",
    title: "Environments make agents effective",
    goal: "Treat environment setup as the main quality upgrade for Cloud Agents.",
    points: [
      "An agent that cannot install deps, run tests, or reach APIs cannot close the loop.",
      "Configure via agent-led setup, a saved snapshot, or `.cursor/environment.json`.",
      "Builds prepare repos and dependencies so agents start warm.",
      "Put secrets in the Cloud Agents Secrets UI — not only in committed `.env` files.",
      "Network allowlists and private connectivity matter for internal services.",
    ],
    practice:
      "List the commands a Cloud Agent must run to verify a typical change in your repo.",
    next: "workflows",
  },
  workflows: {
    id: "workflows",
    title: "High-leverage workflows",
    goal: "Reuse patterns that consistently produce good PRs.",
    points: [
      "Bugfix: reproduce → root cause → fix → test → short PR summary.",
      "Feature: skinny vertical slice first; defer polish to a follow-up agent.",
      "Review: ask for findings ranked by severity, not a rewrite of the diff.",
      "Slack/GitHub: `@cursor` with a crisp task and links to issue/PR context.",
      "Parallelize independent work; serialize when files conflict.",
    ],
    practice:
      "Pick a workflow above and write the exact kickoff message you would send.",
    next: "review-loop",
  },
  "review-loop": {
    id: "review-loop",
    title: "Review, follow up, improve",
    goal: "Close the loop so each run teaches the next one.",
    points: [
      "Read the PR diff and artifacts before merging; do not rubber-stamp.",
      "Follow up in the same agent thread for related fixes; new thread for a new job.",
      "When the agent fails the same way twice, update a rule or the environment.",
      "Prefer verified green tests and demos over long explanations.",
      "Promote winning prompts into skills or team rules.",
    ],
    practice:
      "Describe how you would turn one past agent failure into a durable rule or env fix.",
    next: null,
  },
};

export function isLessonId(value: string): value is LessonId {
  return value in LESSONS;
}
