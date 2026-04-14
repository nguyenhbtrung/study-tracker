export default function TitleBar() {
  return (
    <div className="titlebar">
      <div className="drag-region">📚 Study Tracker</div>

      <div className="window-controls">
        <button onClick={() => (window as any).api.minimize()}>—</button>
        <button onClick={() => (window as any).api.maximize()}>⬜</button>
        <button onClick={() => (window as any).api.close()}>✕</button>
      </div>
    </div>
  );
}
