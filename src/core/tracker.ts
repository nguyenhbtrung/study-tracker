let startTime: number | null = null;

export function startSession(): void {
  if (!startTime) {
    startTime = Date.now();
  }
}

export function stopSession(): number {
  if (!startTime) return 0;

  const duration = Date.now() - startTime;
  startTime = null;

  return duration;
}

export function getCurrentDuration(): number {
  if (!startTime) return 0;
  return Date.now() - startTime;
}
