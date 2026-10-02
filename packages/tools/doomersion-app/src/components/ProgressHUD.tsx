import type { Progress } from "../types";

interface Props {
  progress: Progress;
  current: number;
  total: number;
  onSavedClick: () => void;
}

export function ProgressHUD({ progress, current, total, onSavedClick }: Props) {
  return (
    <div className="progress-hud">
      <div className="hud-left">
        <span className="hud-logo">🌍</span>
        <span className="hud-count">{progress.totalSeen} kelime</span>
      </div>

      <div className="hud-center">
        <div className="hud-dots">
          {Array.from({ length: Math.min(total, 7) }).map((_, i) => {
            const idx = Math.max(0, Math.min(current - 3, total - 7)) + i;
            return (
              <span
                key={idx}
                className={`hud-dot ${idx === current ? "active" : idx < current ? "done" : ""}`}
              />
            );
          })}
        </div>
        <span className="hud-pos">{current + 1}/{total}</span>
      </div>

      <div className="hud-right">
        <button className="hud-saved-btn" onClick={onSavedClick}>
          🔖 {progress.saved.length}
        </button>
        <div className="hud-streak">
          🔥 {progress.streak}
        </div>
      </div>
    </div>
  );
}
