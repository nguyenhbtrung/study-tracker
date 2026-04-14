export {};

declare global {
  interface Window {
    api: {
      getStats: () => Promise<{
        today: number;
        total: number;
      }>;
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}
