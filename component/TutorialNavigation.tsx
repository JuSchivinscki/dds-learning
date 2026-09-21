import { DDSButton, DDSLink } from "@dds/react";
import Link from "next/link";

interface TutorialNavigationProps {
  previous?: {
    chapterId: string;
    stepId: string;
    title: string;
  };

  next?: {
    chapterId: string;
    stepId: string;
    title: string;
  };
}

const TutorialNavigation = ({ previous, next }: TutorialNavigationProps) => {
  return (
    <nav
      className="tutorial-navigation"
      aria-label="Tutorial navigation"
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "32px",
      }}
    >
      {previous ? (
        <DDSLink
          href={`/tutorial/${previous.chapterId}/${previous.stepId}`}
          style={{
            color: "var(--dds-color-blue-70)",
            textDecoration: "none",
          }}
        >
          ← {previous.title}
        </DDSLink>
      ) : (
        <div />
      )}

      {next ? (
        <DDSLink
          href={`/tutorial/${next.chapterId}/${next.stepId}`}
          style={{
            color: "var(--dds-color-blue-70)",
            textDecoration: "none",
          }}
        >
          {next.title} →
        </DDSLink>
      ) : (
        <div />
      )}
    </nav>
  );
};

export default TutorialNavigation;
