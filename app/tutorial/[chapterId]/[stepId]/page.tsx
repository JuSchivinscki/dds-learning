import { notFound } from "next/navigation";

import { getChapter, getStep } from "@/content/tutorial";
import { getTutorialNavigation } from "@/content/tutorial/navigation";

import StepView from "@/component/StepView";
import TutorialNavigation from "@/component/TutorialNavigation";

interface PageProps {
  params: Promise<{
    chapterId: string;
    stepId: string;
  }>;
}

const TutorialStepPage = async ({ params }: PageProps) => {
  const { chapterId, stepId } = await params;

  const chapter = getChapter(chapterId);
  const step = getStep(chapterId, stepId);

  if (!chapter || !step) {
    notFound();
  }

  const { previous, next } = getTutorialNavigation(chapterId, stepId);

  const currentStep =
    chapter.steps.findIndex((chapterStep) => chapterStep.id === stepId) + 1;

  const totalSteps = chapter.steps.length;

  return (
    <>
      <StepView step={step} currentStep={currentStep} totalSteps={totalSteps} />

      <TutorialNavigation previous={previous} next={next} />
    </>
  );
};

export default TutorialStepPage;
