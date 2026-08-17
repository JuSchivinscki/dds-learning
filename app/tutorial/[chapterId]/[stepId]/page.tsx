import { notFound } from "next/navigation";
import { getChapter, getStep } from "@/content/tutorial";
import StepView from "@/component/StepView";

interface PageProps {
  params: { chapterId: string; stepId: string };
}

const TutorialStepPage = ({ params }: PageProps) => {
  const chapter = getChapter(params.chapterId);
  const step = getStep(params.chapterId, params.stepId);

  if (!chapter || !step) {
    notFound();
  }

  return <StepView step={step} />;
};

export default TutorialStepPage;
