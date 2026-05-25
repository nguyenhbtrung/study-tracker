export {};

declare global {
  interface Window {
    api: {
      tracker: {
        getStats(): Promise<{
          today: number;
          total: number;
        }>;

        getStatistics(): Promise<{
          contributionData: {
            date: string;
            minutes: number;
          }[];

          trendData: {
            date: string;
            minutes: number;
            sessions: number;
            focusScore: number;
          }[];

          productivityData: {
            hour: number;
            minutes: number;
          }[];

          sessionsByDate: Record<string, any[]>;
        }>;

        start(): void;

        stop(): void;
      };

      window: {
        minimize(): void;

        maximize(): void;

        close(): void;
      };
    };
  }
}
