import type { Content } from "../types";
import { PhraseCard } from "./cards/PhraseCard";
import { WordCard } from "./cards/WordCard";
import { QuizCard } from "./cards/QuizCard";
import { DialogueCard } from "./cards/DialogueCard";

interface Props {
  content: Content;
  isActive: boolean;
  onSave: () => void;
  isSaved: boolean;
}

export function FeedCard({ content, isActive, onSave, isSaved }: Props) {
  if (!isActive) return null;

  const cardProps = { content: content as never, onSave, isSaved };

  switch (content.type) {
    case "phrase":
      return <PhraseCard {...cardProps} content={content} />;
    case "word":
      return <WordCard {...cardProps} content={content} />;
    case "quiz":
      return <QuizCard {...cardProps} content={content} />;
    case "dialogue":
      return <DialogueCard {...cardProps} content={content} />;
  }
}
