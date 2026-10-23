import { defineEval, includes } from "@grok/agent-sdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "start-lesson",
      description: "Starting the curriculum loads the orientation lesson.",
      async test(t) {
        await t.send("Teach me how to get the most out of Cursor agents. Start from the beginning.");
        t.succeeded();
        t.calledTool("get_lesson");
        t.check(t.reply, includes(/prompt|outcome|agent|practice/i));
      },
    },
    {
      id: "review-prompt",
      description: "A vague pasted prompt is reviewed with the checklist tool.",
      async test(t) {
        await t.send(
          "Please review this agent prompt and improve it:\n\nImprove the auth.",
        );
        t.succeeded();
        t.calledTool("review_prompt");
        t.check(t.reply, includes(/verify|outcome|test|do not|don't/i));
      },
    },
  ],
});
