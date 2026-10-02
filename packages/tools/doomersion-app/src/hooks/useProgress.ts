import { useState, useCallback, useEffect } from "react";
import type { Progress } from "../types";

const STORAGE_KEY = "doomersion_progress";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function loadProgress(): Progress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Progress;
  } catch {
    // ignore
  }
  return { seen: [], saved: [], streak: 0, lastSeenDate: "", totalSeen: 0 };
}

function saveProgress(p: Progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const markSeen = useCallback((id: number) => {
    setProgress((prev) => {
      if (prev.seen.includes(id)) return prev;
      const today = todayStr();
      let streak = prev.streak;
      if (prev.lastSeenDate !== today) {
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .slice(0, 10);
        streak = prev.lastSeenDate === yesterday ? streak + 1 : 1;
      }
      return {
        ...prev,
        seen: [...prev.seen, id],
        totalSeen: prev.totalSeen + 1,
        streak,
        lastSeenDate: today,
      };
    });
  }, []);

  const toggleSaved = useCallback((id: number) => {
    setProgress((prev) => ({
      ...prev,
      saved: prev.saved.includes(id)
        ? prev.saved.filter((s) => s !== id)
        : [...prev.saved, id],
    }));
  }, []);

  const isSaved = useCallback(
    (id: number) => progress.saved.includes(id),
    [progress.saved]
  );

  return { progress, markSeen, toggleSaved, isSaved };
}
