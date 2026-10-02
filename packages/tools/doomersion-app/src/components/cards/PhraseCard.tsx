import { useState } from "react";
import type { PhraseContent } from "../../types";
import { useTTS } from "../../hooks/useTTS";

interface Props {
  content: PhraseContent;
  onSave: () => void;
  isSaved: boolean;
}

export function PhraseCard({ content, onSave, isSaved }: Props) {
  const [revealed, setRevealed] = useState(false);
  const { speak } = useTTS();

  return (
    <div className="card phrase-card">
      <div className="card-badge">{content.emoji} {content.context}</div>

      <div className="card-main">
        <p className="card-type-label">Günlük İfade</p>
        <h2 className="card-english">{content.english}</h2>

        <button
          className={`translation-toggle ${revealed ? "revealed" : ""}`}
          onClick={() => setRevealed((r) => !r)}
        >
          {revealed ? (
            <span className="translation-text">{content.turkish}</span>
          ) : (
            <span className="translation-hint">👆 Çeviriyi gör</span>
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
