import { notFound } from "next/navigation";
import { getChapter, getStep } from "@/content/tutorial";
import StepView from "@/component/StepView";

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

  return <StepView step={step} />;
};

export default TutorialStepPage;
