// src/types/rate-limit.ts
export interface Metric {
  totalHits: number;
  totalBlocked: number;
  uniqueIPs: number;
  topPaths: { path: string; count: number }[];
  totalHitsOverTime: { timestamp: string; count: number }[];
}

export interface RecentEvent {
  timestamp: string;
  ip: string;
  path: string;
  blocked: boolean;
}
