export type ContentType = "phrase" | "word" | "quiz" | "dialogue";

export interface PhraseContent {
  id: number;
  type: "phrase";
  english: string;
  turkish: string;
  context: string;
  emoji: string;
}

export interface WordContent {
  id: number;
  type: "word";
  english: string;
  turkish: string;
  context: string;
  emoji: string;
  pronunciation: string;
  example: string;
  exampleTr: string;
}

export interface QuizContent {
  id: number;
  type: "quiz";
  english: string;
  turkish: string;
  context: string;
  emoji: string;
  question: string;
  isCorrect: boolean;
  explanation: string;
}

export interface DialogueLine {
  speaker: "A" | "B";
  english: string;
  turkish: string;
}

export interface DialogueContent {
  id: number;
  type: "dialogue";
  english: string;
  turkish: string;
  context: string;
  emoji: string;
  lines: DialogueLine[];
}

export type Content =
  | PhraseContent
  | WordContent
  | QuizContent
  | DialogueContent;

export interface Progress {
  seen: number[];
  saved: number[];
  streak: number;
  lastSeenDate: string;
  totalSeen: number;
}
