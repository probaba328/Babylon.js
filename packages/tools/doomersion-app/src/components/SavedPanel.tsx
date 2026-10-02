import type { Content } from "../types";
import { useTTS } from "../hooks/useTTS";

interface Props {
  items: Content[];
  savedIds: number[];
  onClose: () => void;
  onRemove: (id: number) => void;
}

export function SavedPanel({ items, savedIds, onClose, onRemove }: Props) {
  const { speak } = useTTS();
  const saved = items.filter((c) => savedIds.includes(c.id));

  return (
    <div className="saved-overlay" onClick={onClose}>
      <div className="saved-panel" onClick={(e) => e.stopPropagation()}>
        <div className="saved-header">
          <h3>Kaydedilenler</h3>
          <button className="saved-close" onClick={onClose}>✕</button>
        </div>

        {saved.length === 0 ? (
          <p className="saved-empty">Henüz kaydettiğin içerik yok.<br />➕ butonuna dokun!</p>
        ) : (
          <ul className="saved-list">
            {saved.map((item) => (
              <li key={item.id} className="saved-item">
                <div className="saved-item-content">
                  <span className="saved-emoji">{item.emoji}</span>
                  <div>
                    <p className="saved-en">{item.english}</p>
                    <p className="saved-tr">{item.turkish}</p>
                  </div>
                </div>
                <div className="saved-item-actions">
                  <button onClick={() => speak(item.english)}>🔊</button>
                  <button onClick={() => onRemove(item.id)}>✕</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
