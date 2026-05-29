export type DailyStatistics = {
  date: string;
  minutes: number;
  sessions: number;
  focusScore: number;
};

export type ContributionData = {
  date: string;
  minutes: number;
};

export type TrendData = {
  date: string;
  minutes: number;
  sessions: number;
  focusScore: number;
};

export type ProductivityData = {
  hour: number;
  minutes: number;
};

export type SessionItem = {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  durationMinutes: number;
};

export type StatisticsResponse = {
  contributionData: ContributionData[];
  trendData: TrendData[];
  productivityData: ProductivityData[];
  sessionsByDate: Record<string, SessionItem[]>;
  daily: DailyStatistics[];
};
