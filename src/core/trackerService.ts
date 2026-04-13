import { loadData, saveData, TrackerData } from '../storage/store';
import * as tracker from './tracker';

const data: TrackerData = loadData();

function isSameDay(d1: string | null, d2: string): boolean {
  if (!d1) return false;
  return new Date(d1).toDateString() === new Date(d2).toDateString();
}

export function startTracking(): void {
  tracker.startSession();
}

export function stopTracking(): void {
  const duration = tracker.stopSession();
  const today = new Date().toDateString();

  if (!isSameDay(data.lastDate, today)) {
    data.today = 0;
    data.lastDate = today;
  }

  data.today += duration;
  data.total += duration;

  saveData(data);
}

export function getStats() {
  const current = tracker.getCurrentDuration();

  return {
    today: data.today + current,
    total: data.total + current,
  };
}
