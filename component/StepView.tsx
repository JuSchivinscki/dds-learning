import { TutorialStep } from "@/types/tutorial";
import { DDSLabel, DDSProgressBar } from "@dds/react";

import CodeBlock from "./CodeBlock";

interface StepViewProps {
  step: TutorialStep;
  currentStep: number;
  totalSteps: number;
}

const StepView = ({ step, currentStep, totalSteps }: StepViewProps) => {
  const progress = Math.round((currentStep / totalSteps) * 100);

  return (
    <article className="tutorial-step">
      <div
        className="dds__gap--xs"
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DDSLabel style={{ color: "var(--dds-color-gray-90)" }}>
            Step {currentStep} of {totalSteps}
          </DDSLabel>

          <DDSLabel style={{ color: "var(--dds-color-gray-90)" }}>
            {progress}%
          </DDSLabel>
        </div>

        <DDSProgressBar
          value={progress}
          max={100}
          aria-label={`Tutorial progress: step ${currentStep} of ${totalSteps}`}
        />
      </div>

      {/* Step title */}
      <h2 className="dds__heading--2">{step.title}</h2>

      {/* Step content */}
      {step.blocks.map((block, index) => {
        if (block.type === "text") {
          return (
            <p key={index} className="dds__body-copy">
              {block.content}
            </p>
          );
        }

        if (block.type === "code") {
          return (
            <CodeBlock
              key={index}
              language={block.language}
              content={block.content}
            />
          );
        }

        if (block.type === "table") {
          return (
            <div key={index} className="tutorial-step__table-wrapper">
              <table className="tutorial-step__table">
                <thead>
                  <tr>
                    {block.headers.map((header, i) => (
                      <th key={i}>{header}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {block.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        return null;
      })}

      {/* Expected result */}
      {step.expectedResult && (
        <div
          className="tutorial-step__expected-result"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <strong>Expected result</strong>

          <p className="dds__body-copy" style={{ margin: 0 }}>
            {step.expectedResult}
          </p>
        </div>
      )}
    </article>
  );
};

export default StepView;
