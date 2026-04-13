import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export interface TrackerData {
  total: number;
  today: number;
  lastDate: string | null;
}

const filePath = path.join(app.getPath('userData'), 'data.json');

export function loadData(): TrackerData {
  if (!fs.existsSync(filePath)) {
    return { total: 0, today: 0, lastDate: null };
  }

  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  } catch {
    return { total: 0, today: 0, lastDate: null };
  }
}

export function saveData(data: TrackerData): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
