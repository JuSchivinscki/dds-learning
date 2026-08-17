import { TutorialChapter } from "@/types/tutorial";
import { transactionsChapter } from "./transactions";
import { monthlySpendingChapter } from "./monthly-spending";
import { dashboardChapter } from "./dashboard";

export const tutorialChapters: TutorialChapter[] = [
  transactionsChapter,
  monthlySpendingChapter,
  dashboardChapter,
];

export function getChapter(chapterId: string) {
  return tutorialChapters.find((c) => c.id === chapterId);
}

export function getStep(chapterId: string, stepId: string) {
  const chapter = getChapter(chapterId);
  return chapter?.steps.find((s) => s.id === stepId);
}
