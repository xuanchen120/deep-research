"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircle } from "lucide-react";
import Magicdown from "@/components/Magicdown";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useDeepResearch from "@/hooks/useDeepResearch";
import useAccurateTimer from "@/hooks/useAccurateTimer";
import { useTaskStore } from "@/store/task";

const formSchema = z.object({
  feedback: z.string(),
});

function Feedback() {
  const { t } = useTranslation();
  const taskStore = useTaskStore();
  const { status, deepResearch } = useDeepResearch();
  const {
    formattedTime,
    start: accurateTimerStart,
    stop: accurateTimerStop,
  } = useAccurateTimer();
  const [isThinking, setIsThinking] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      feedback: taskStore.feedback,
    },
  });

  useEffect(() => {
    form.setValue("feedback", taskStore.feedback);
  }, [taskStore.feedback, form]);

  async function handleSubmit(values: z.infer<typeof formSchema>) {
    const { question, questions, setFeedback } = useTaskStore.getState();
    setFeedback(values.feedback);
    const prompt = [
      `Initial Query: ${question}`,
      `Follow-up Questions: ${questions}`,
      `Follow-up Feedback: ${values.feedback}`,
    ].join("\n\n");
    taskStore.setQuery(prompt);
    try {
      accurateTimerStart();
      setIsThinking(true);
      await deepResearch();
      setIsThinking(false);
    } finally {
      accurateTimerStop();
    }
  }

  return (
    <section className="p-4 border rounded-md mt-4">
      <h3 className="font-semibold text-lg border-b mb-2 leading-10">
        {t("research.feedback.title")}
      </h3>
      {taskStore.questions === "" ? (
        <div>{t("research.feedback.emptyTip")}</div>
      ) : (
        <div>
          <article className="prose prose-slate dark:prose-invert mt-6">
            <Magicdown>{taskStore.questions}</Magicdown>
          </article>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <FormField
                control={form.control}
                name="feedback"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-2 font-semibold">
                      {t("research.feedback.feedbackLabel")}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={3}
                        placeholder={t("research.feedback.feedbackPlaceholder")}
                        disabled={isThinking}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="mt-4 w-full"
                type="submit"
                disabled={isThinking}
              >
                {isThinking ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    <span className="mx-1">{status}</span>
                    <small className="font-mono">{formattedTime}</small>
                  </>
                ) : (
                  t("research.common.startResearch")
                )}
              </Button>
            </form>
          </Form>
        </div>
      )}
    </section>
  );
}

export default Feedback;
