export type TutorialBlock =
  | {
      type: "text";
      content: string;
    }
  | {
      type: "code";
      language: string;
      file: string;
      scope: "partial" | "full";
      content: string;
    }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
    };

export interface TutorialStep {
  id: string;
  title: string;
  blocks: TutorialBlock[];

  dependsOn?: string[];

  expectedResult?: string;

  finalCode?: {
    file: string;
    content: string;
  };
}

export interface TutorialChapter {
  id: string;
  title: string;
  intro: string;
  steps: TutorialStep[];
}
