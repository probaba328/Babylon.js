import { useState } from "react";
import type { DialogueContent } from "../../types";
import { useTTS } from "../../hooks/useTTS";

interface Props {
  content: DialogueContent;
  onSave: () => void;
  isSaved: boolean;
}

export function DialogueCard({ content, onSave, isSaved }: Props) {
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set());
  const { speak } = useTTS();

  const toggleLine = (i: number) => {
    setRevealedLines((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  };

  return (
    <div className="card dialogue-card">
      <div className="card-badge">{content.emoji} {content.context}</div>

      <div className="card-main">
        <p className="card-type-label">Diyalog</p>

        <div className="dialogue-lines">
          {content.lines.map((line, i) => (
            <div
              key={i}
              className={`dialogue-line speaker-${line.speaker.toLowerCase()}`}
              onClick={() => toggleLine(i)}
            >
              <span className="speaker-label">{line.speaker}</span>
              <div className="line-content">
                <p className="line-english">{line.english}</p>
                {revealedLines.has(i) && (
                  <p className="line-turkish">{line.turkish}</p>
                )}
              </div>
              <button
                className="line-tts"
                onClick={(e) => {
                  e.stopPropagation();
                  speak(line.english);
                }}
                aria-label="Dinle"
              >
                🔊
              </button>
            </div>
          ))}
        </div>

        <p className="dialogue-hint">👆 Satıra dokun → Türkçe çeviri</p>
      </div>

      <div className="card-actions">
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
