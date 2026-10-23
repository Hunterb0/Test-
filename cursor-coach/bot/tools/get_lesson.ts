import { prompt } from "@grok/agent-sdk";
import { defineTool } from "@grok/agent-sdk/tools";
import * as z from "zod/v4";
import {
  LESSON_ORDER,
  LESSONS,
  isLessonId,
  type LessonId,
} from "../lib/lessons.js";

export default defineTool({
  description: prompt`
    Fetch one curriculum lesson by id, or the next unfinished lesson.
    Use this before teaching a topic so the reply follows the curriculum.
  `,
  effect: "read",
  inputSchema: z.object({
    lessonId: z
      .enum([
        "orientation",
        "prompting",
        "context",
        "rules-skills",
        "cloud-agents",
        "environments",
        "workflows",
        "review-loop",
        "next",
      ])
      .describe(
        "Lesson id, or `next` for the first unfinished lesson (uses saved progress when present).",
      ),
  }),
  async execute({ lessonId }, ctx) {
    let id: LessonId;
    if (lessonId === "next") {
      const raw = await ctx.host.kv.get(`progress:${ctx.session.id}`);
      const completed =
        raw &&
        typeof raw === "object" &&
        !Array.isArray(raw) &&
        Array.isArray(raw.completed)
          ? raw.completed.filter((item): item is string => typeof item === "string")
          : [];
      id =
        LESSON_ORDER.find((candidate) => !completed.includes(candidate)) ??
        "review-loop";
    } else if (isLessonId(lessonId)) {
      id = lessonId;
    } else {
      return { error: "unknown_lesson", lessonId };
    }

    const lesson = LESSONS[id];
    return {
      catalog: LESSON_ORDER,
      lesson,
    };
  },
});
