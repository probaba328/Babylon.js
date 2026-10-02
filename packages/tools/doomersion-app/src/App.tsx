import { useRef, useState, useCallback, useEffect } from "react";
import { useFeed } from "./hooks/useFeed";
import { useProgress } from "./hooks/useProgress";
import { FeedCard } from "./components/FeedCard";
import { ProgressHUD } from "./components/ProgressHUD";
import { SavedPanel } from "./components/SavedPanel";

export default function App() {
  const { items, currentIndex, goNext, goPrev } = useFeed();
  const { progress, markSeen, toggleSaved, isSaved } = useProgress();
  const [showSaved, setShowSaved] = useState(false);

  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isDragging = useRef(false);
  const lastSwipeTime = useRef(0);

  useEffect(() => {
    const item = items[currentIndex];
    if (item) markSeen(item.id);
  }, [currentIndex, items, markSeen]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const now = Date.now();
      if (now - lastSwipeTime.current < 400) return;

      const dy = touchStartY.current - e.changedTouches[0].clientY;
      const dx = touchStartX.current - e.changedTouches[0].clientX;

      if (Math.abs(dy) < Math.abs(dx)) return;
      if (Math.abs(dy) < 40) return;

      lastSwipeTime.current = now;
      if (dy > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      const now = Date.now();
      if (now - lastSwipeTime.current < 600) return;
      if (Math.abs(e.deltaY) < 30) return;
      lastSwipeTime.current = now;
      if (e.deltaY > 0) goNext();
      else goPrev();
    },
    [goNext, goPrev]
  );

  const currentItem = items[currentIndex];

  return (
    <div
      className="app"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      <ProgressHUD
        progress={progress}
        current={currentIndex}
        total={items.length}
        onSavedClick={() => setShowSaved(true)}
      />

      <div className="feed">
        {currentItem && (
          <FeedCard
            key={currentItem.id}
            content={currentItem}
            isActive={true}
            onSave={() => toggleSaved(currentItem.id)}
            isSaved={isSaved(currentItem.id)}
          />
        )}
      </div>

      <div className="swipe-hints">
        {currentIndex > 0 && (
          <button className="swipe-hint-btn up-btn" onClick={goPrev} aria-label="Önceki">
            ↑
          </button>
        )}
        {currentIndex < items.length - 1 && (
          <button className="swipe-hint-btn down-btn" onClick={goNext} aria-label="Sonraki">
            ↓
          </button>
        )}
      </div>

      {showSaved && (
        <SavedPanel
          items={items}
          savedIds={progress.saved}
          onClose={() => setShowSaved(false)}
          onRemove={(id) => toggleSaved(id)}
        />
      )}
    </div>
  );
}
