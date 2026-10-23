import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import { LESSON_ORDER, isLessonId } from "../lib/lessons.js";

type Progress = {
  completed: string[];
  lastLessonId: string;
  updatedAt: string;
};

export default defineTool({
  description: prompt`
    Mark a curriculum lesson complete for this session after the user
    finishes the practice prompt or clearly understands the topic.
  `,
  effect: "idempotent",
  inputSchema: z.object({
    lessonId: z.enum([
      "orientation",
      "prompting",
      "context",
      "rules-skills",
      "cloud-agents",
      "environments",
      "workflows",
      "review-loop",
    ]),
    note: z
      .string()
      .max(280)
      .optional()
      .describe("Optional short note about what clicked for the learner."),
  }),
  async execute({ lessonId, note }, ctx) {
    if (!isLessonId(lessonId)) {
      return { saved: false, error: "unknown_lesson" };
    }

    const key = `progress:${ctx.session.id}`;
    const existingRaw = await ctx.host.kv.get(key);
    const priorCompleted =
      existingRaw &&
      typeof existingRaw === "object" &&
      !Array.isArray(existingRaw) &&
      Array.isArray(existingRaw.completed)
        ? existingRaw.completed.filter(
            (item): item is string => typeof item === "string",
          )
        : [];
    const completed = new Set(priorCompleted);
    completed.add(lessonId);
    const progress: Progress = {
      completed: LESSON_ORDER.filter((id) => completed.has(id)),
      lastLessonId: lessonId,
      updatedAt: new Date().toISOString(),
    };
    await ctx.host.kv.put(key, { ...progress, note: note ?? null });

    const remaining = LESSON_ORDER.filter((id) => !completed.has(id));
    return {
      saved: true,
      progress,
      remaining,
      done: remaining.length === 0,
    };
  },
});
