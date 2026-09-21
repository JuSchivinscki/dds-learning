import { tutorialChapters } from "./index";

export function getTutorialNavigation(chapterId: string, stepId: string) {
  const steps = tutorialChapters.flatMap((chapter) =>
    chapter.steps.map((step) => ({
      chapterId: chapter.id,
      stepId: step.id,
      title: step.title,
    })),
  );

  const currentIndex = steps.findIndex(
    (step) => step.chapterId === chapterId && step.stepId === stepId,
  );

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  return {
    previous: steps[currentIndex - 1],
    next: steps[currentIndex + 1],
  };
}
