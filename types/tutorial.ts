export type TutorialBlock =
  | { type: "text"; content: string }
  | { type: "code"; language: string; content: string; label?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

export interface TutorialStep {
  id: string;
  title: string;
  blocks: TutorialBlock[];
  expectedResult?: string;
  checkpointFile?: string;
}

export interface TutorialChapter {
  id: string;
  title: string;
  intro: string;
  steps: TutorialStep[];
}
