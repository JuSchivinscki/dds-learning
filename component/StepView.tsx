import { TutorialStep } from "@/types/tutorial";
import CodeBlock from "./CodeBlock";

interface StepViewProps {
  step: TutorialStep;
}

const StepView = ({ step }: StepViewProps) => {
  return (
    <article className="tutorial-step">
      <h2>{step.title}</h2>

      {step.blocks.map((block, index) => {
        if (block.type === "text") {
          return <p key={index}>{block.content}</p>;
        }

        if (block.type === "code") {
          return (
            <CodeBlock
              key={index}
              language={block.language}
              content={block.content}
              label={block.label}
            />
          );
        }

        if (block.type === "table") {
          return (
            <table key={index} className="tutorial-step__table">
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
          );
        }

        return null;
      })}

      {step.expectedResult && (
        <p className="tutorial-step__expected-result">
          <strong>Expected result:</strong> {step.expectedResult}
        </p>
      )}
    </article>
  );
};

export default StepView;
