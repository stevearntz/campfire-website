import { MODULES } from "../../../_data/course";
import { getCurrentLearner } from "../../../_lib/learner";
import {
  getWorksheet,
  getQuizAttempt,
  getModuleJournal,
} from "../../../_lib/db";
import ModuleView from "./ModuleView";

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const courseModule = MODULES.find((m) => m.slug === slug) ?? MODULES[0];

  const { enrollment } = await getCurrentLearner();
  const [worksheet, quizAttempt, journal] = await Promise.all([
    getWorksheet(enrollment.id, courseModule.slug),
    getQuizAttempt(enrollment.id, courseModule.slug),
    getModuleJournal(enrollment.id, courseModule.slug),
  ]);

  return (
    <ModuleView
      module={courseModule}
      initialWorksheet={
        (worksheet?.data as Record<string, unknown> | undefined) ?? {}
      }
      worksheetSubmitted={worksheet?.status === "submitted"}
      initialPicks={(quizAttempt?.answers as Record<number, number>) ?? {}}
      initialJournal={journal}
    />
  );
}
