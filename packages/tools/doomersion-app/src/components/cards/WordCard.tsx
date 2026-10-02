import { useState } from "react";
import type { WordContent } from "../../types";
import { useTTS } from "../../hooks/useTTS";

interface Props {
  content: WordContent;
  onSave: () => void;
  isSaved: boolean;
}

export function WordCard({ content, onSave, isSaved }: Props) {
  const [revealed, setRevealed] = useState(false);
  const { speak } = useTTS();

  return (
    <div className="card word-card">
      <div className="card-badge">{content.emoji} {content.context}</div>

      <div className="card-main">
        <p className="card-type-label">Kelime</p>
        <h2 className="card-english word-title">{content.english}</h2>
        <p className="pronunciation">{content.pronunciation}</p>

        <button
          className={`translation-toggle ${revealed ? "revealed" : ""}`}
          onClick={() => setRevealed((r) => !r)}
        >
          {revealed ? (
            <div className="word-revealed">
              <p className="translation-text">{content.turkish}</p>
              <div className="example-block">
                <p className="example-en">"{content.example}"</p>
                <p className="example-tr">{content.exampleTr}</p>
              </div>
            </div>
          ) : (
            <span className="translation-hint">👆 Anlamını gör</span>
          )}
        </button>
      </div>

      <div className="card-actions">
        <button
          className="action-btn tts-btn"
          onClick={() => speak(content.english)}
          aria-label="Telaffuzu dinle"
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
