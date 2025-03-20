// src/lib/utils/rate-limit-monitoring.ts
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export interface RateLimitEvent {
  timestamp: number;
  ip: string;
  path: string;
  blocked: boolean;
  userAgent?: string;
  country?: string;
}

// Internal interface for storing metrics
interface StoredMetrics {
  totalHits: number;
  totalBlocked: number;
  uniqueIPs: string[];
  pathCounts: Record<string, number>;
  blockedIPCounts: Record<string, number>;
}

// Public interface for retrieved metrics
export interface RateLimitMetrics {
  totalHits: number;
  totalBlocked: number;
  uniqueIPs: number;
  topPaths: Array<{ path: string; hits: number }>;
  topBlockedIPs: Array<{ ip: string; count: number }>;
}

export class RateLimitMonitor {
  private static readonly EVENT_KEY = 'rate-limit:events:';
  private static readonly METRICS_KEY = 'rate-limit:metrics:';

  static async logEvent(event: RateLimitEvent) {
    try {
      const date = new Date().toISOString().split('T')[0];
      const eventKey = `${this.EVENT_KEY}${date}`;
      
      // Store event
      await redis.lpush(eventKey, JSON.stringify(event));
      // Keep events for 7 days
      await redis.expire(eventKey, 60 * 60 * 24 * 7);

      // Update daily metrics
      const metricsKey = `${this.METRICS_KEY}${date}`;
      const storedMetrics = await redis.get<StoredMetrics>(metricsKey);
      
      const metrics: StoredMetrics = storedMetrics || {
        totalHits: 0,
        totalBlocked: 0,
        uniqueIPs: [],
        pathCounts: {},
        blockedIPCounts: {}
      };

      // Update metrics
      metrics.totalHits++;
      if (event.blocked) {
        metrics.totalBlocked++;
        metrics.blockedIPCounts[event.ip] = (metrics.blockedIPCounts[event.ip] || 0) + 1;
      }
      if (!metrics.uniqueIPs.includes(event.ip)) {
        metrics.uniqueIPs.push(event.ip);
      }
      metrics.pathCounts[event.path] = (metrics.pathCounts[event.path] || 0) + 1;

      // Store updated metrics
      await redis.set(metricsKey, JSON.stringify(metrics));
      await redis.expire(metricsKey, 60 * 60 * 24 * 30); // Keep metrics for 30 days
    } catch (error) {
      console.error('Error logging rate limit event:', error);
    }
  }

  static async getDailyMetrics(date: string): Promise<RateLimitMetrics> {
    try {
      const metricsKey = `${this.METRICS_KEY}${date}`;
      const storedMetrics = await redis.get<StoredMetrics>(metricsKey);
      
      if (!storedMetrics) {
        return {
          totalHits: 0,
          totalBlocked: 0,
          uniqueIPs: 0,
          topPaths: [],
          topBlockedIPs: []
        };
      }

      // Transform stored metrics into public metrics format
      return {
        totalHits: storedMetrics.totalHits,
        totalBlocked: storedMetrics.totalBlocked,
        uniqueIPs: storedMetrics.uniqueIPs.length,
        topPaths: Object.entries(storedMetrics.pathCounts)
          .map(([path, hits]) => ({ path, hits }))
          .sort((a, b) => b.hits - a.hits)
          .slice(0, 10),
        topBlockedIPs: Object.entries(storedMetrics.blockedIPCounts)
          .map(([ip, count]) => ({ ip, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      };
    } catch (error) {
      console.error('Error getting daily metrics:', error);
      return {
        totalHits: 0,
        totalBlocked: 0,
        uniqueIPs: 0,
        topPaths: [],
        topBlockedIPs: []
      };
    }
  }

  static async getRecentEvents(limit: number = 100): Promise<RateLimitEvent[]> {
    try {
      const date = new Date().toISOString().split('T')[0];
      const eventKey = `${this.EVENT_KEY}${date}`;
      const events = await redis.lrange(eventKey, 0, limit - 1);
      return events.map(event => JSON.parse(event));
    } catch (error) {
      console.error('Error getting recent events:', error);
      return [];
    }
  }

  // Helper method to clear metrics (useful for testing)
  static async clearMetrics(date?: string): Promise<boolean> {
    try {
      if (date) {
        const metricsKey = `${this.METRICS_KEY}${date}`;
        const eventKey = `${this.EVENT_KEY}${date}`;
        await Promise.all([
          redis.del(metricsKey),
          redis.del(eventKey)
        ]);
      } else {
        const metricsKeys = await redis.keys(`${this.METRICS_KEY}*`);
        const eventKeys = await redis.keys(`${this.EVENT_KEY}*`);
        if (metricsKeys.length > 0) await redis.del(...metricsKeys);
        if (eventKeys.length > 0) await redis.del(...eventKeys);
      }
      return true;
    } catch (error) {
      console.error('Error clearing metrics:', error);
      return false;
    }
  }
}
