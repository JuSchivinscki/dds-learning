interface CodeBlockProps {
  language: string;
  content: string;
  label?: string;
}

const CodeBlock = ({ language, content, label }: CodeBlockProps) => {
  return (
    <div className="tutorial-code-block">
      {label && <div className="tutorial-code-block__label">{label}</div>}
      <pre className="tutorial-code-block__pre">
        <code className={`language-${language}`}>{content}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
