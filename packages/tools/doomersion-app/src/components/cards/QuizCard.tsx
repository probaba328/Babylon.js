import { useState } from "react";
import type { QuizContent } from "../../types";
import { useTTS } from "../../hooks/useTTS";

interface Props {
  content: QuizContent;
  onSave: () => void;
  isSaved: boolean;
}

type Answer = "correct" | "incorrect" | null;

export function QuizCard({ content, onSave, isSaved }: Props) {
  const [answer, setAnswer] = useState<Answer>(null);
  const { speak } = useTTS();

  const handleAnswer = (userSaysCorrect: boolean) => {
    if (answer !== null) return;
    setAnswer(userSaysCorrect === content.isCorrect ? "correct" : "incorrect");
  };

  return (
    <div className="card quiz-card">
      <div className="card-badge">{content.emoji} {content.context}</div>

      <div className="card-main">
        <p className="card-type-label">Doğru mu Yanlış mı?</p>
        <p className="quiz-question">{content.question}</p>
        <blockquote className="quiz-sentence">"{content.english}"</blockquote>

        {answer === null ? (
          <div className="quiz-buttons">
            <button
              className="quiz-btn correct-btn"
              onClick={() => handleAnswer(true)}
            >
              ✅ Doğru
            </button>
            <button
              className="quiz-btn incorrect-btn"
              onClick={() => handleAnswer(false)}
            >
              ❌ Yanlış
            </button>
          </div>
        ) : (
          <div className={`quiz-result ${answer}`}>
            <p className="quiz-result-icon">
              {answer === "correct" ? "🎉 Doğru!" : "😅 Yanlış!"}
            </p>
            <p className="quiz-explanation">{content.explanation}</p>
            <p className="quiz-translation">{content.turkish}</p>
          </div>
        )}
      </div>

      <div className="card-actions">
        <button
          className="action-btn tts-btn"
          onClick={() => speak(content.english)}
          aria-label="Dinle"
        >
          🔊
        </button>
        <button
          className={`action-btn save-btn ${isSaved ? "saved" : ""}`}
          onClick={onSave}
          aria-label="Kaydet"
        >
          {isSaved ? "🔖" : "➕"}
        </button>
      </div>
    </div>
  );
}
