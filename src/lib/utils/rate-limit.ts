// src/lib/utils/rate-limit.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import { RateLimitMonitor } from './rate-limit-monitoring';

const redis = Redis.fromEnv();

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

interface RateLimitInfo {
  current: number;
  remaining: number;
  reset: number;
  limit: number;
}

interface RateLimitAnalytics {
  path: string;
  hits: number;
  blocked: number;
  timestamp: number;
}

export const defaultRateLimits: Record<string, RateLimitConfig> = {
  default: { maxRequests: 5, windowMs: 60000 }, // 5 requests per minute
  auth: { maxRequests: 3, windowMs: 60000 }, // 3 auth requests per minute
  api: { maxRequests: 10, windowMs: 60000 }, // 10 API requests per minute
}

// Helper to generate Redis keys
const getKeys = (ip: string, path: string) => ({
  limit: `rate-limit:${ip}:${path}`,
  analytics: `analytics:${path}:${new Date().toISOString().split('T')[0]}`,
})

// Helper to update analytics
async function updateAnalytics(path: string, wasBlocked: boolean) {
  try {
    const { analytics: key } = getKeys('analytics', path);
    const analytics = await redis.get<RateLimitAnalytics>(key) || {
      path,
      hits: 0,
      blocked: 0,
      timestamp: Date.now(),
    };

    if (wasBlocked) {
      analytics.blocked++;
    } else {
      analytics.hits++;
    }

    await redis.set(key, analytics, { ex: 86400 }); // Store for 24 hours
  } catch (error) {
    console.error('Analytics update error:', error);
  }
}

export async function rateLimit(
  request: NextRequest,
  config: RateLimitConfig = defaultRateLimits.default
): Promise<NextResponse | null> {
  try {
    const ip = request.headers.get("x-forwarded-for") ?? "127.0.0.1";
    const path = request.nextUrl.pathname;
    const { limit: key } = getKeys(ip, path);

    const current = (await redis.get<number>(key)) || 0;
    const remaining = Math.max(0, config.maxRequests - (current + 1));
    const reset = Date.now() + config.windowMs;

    // Log the rate limit event
    await RateLimitMonitor.logEvent({
      timestamp: Date.now(),
      ip,
      path,
      blocked: current >= config.maxRequests,
      userAgent: request.headers.get('user-agent') || undefined,
      country: request.headers.get('x-vercel-ip-country') || undefined
    });

    const rateLimitInfo: RateLimitInfo = {
      current,
      remaining,
      reset,
      limit: config.maxRequests,
    };

    if (current >= config.maxRequests) {
      await updateAnalytics(path, true);
      return NextResponse.json(
        { error: "Too many requests", rateLimitInfo },
        { 
          status: 429,
          headers: {
            'Retry-After': `${config.windowMs / 1000}`,
            'X-RateLimit-Limit': `${config.maxRequests}`,
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': `${reset}`,
          }
        }
      );
    }

    await redis.setex(key, config.windowMs / 1000, current + 1);
    await updateAnalytics(path, false);

    // Create response with rate limit headers
    const response = NextResponse.next();
    response.headers.set('X-RateLimit-Limit', `${config.maxRequests}`);
    response.headers.set('X-RateLimit-Remaining', `${remaining}`);
    response.headers.set('X-RateLimit-Reset', `${reset}`);

    return response;
  } catch (error) {
    console.error('Rate limit error:', error);
    return NextResponse.next();
  }
}

// Analytics helpers
export async function getRateLimitAnalytics(path?: string, date?: string): Promise<RateLimitAnalytics[]> {
  try {
    const searchDate = date || new Date().toISOString().split('T')[0];
    const pattern = path 
      ? `analytics:${path}:${searchDate}`
      : `analytics:*:${searchDate}`;
    
    const keys = await redis.keys(pattern);
    const analytics = await Promise.all(
      keys.map(key => redis.get<RateLimitAnalytics>(key))
    );

    return analytics.filter(Boolean) as RateLimitAnalytics[];
  } catch (error) {
    console.error('Analytics fetch error:', error);
    return [];
  }
}

// Helper to get rate limit status for an IP
export async function getRateLimitStatus(ip: string, path: string): Promise<RateLimitInfo | null> {
  try {
    const { limit: key } = getKeys(ip, path);
    const config = getRateLimitConfig({ nextUrl: { pathname: path }} as NextRequest);
    const current = (await redis.get<number>(key)) || 0;

    return {
      current,
      remaining: Math.max(0, config.maxRequests - current),
      reset: Date.now() + config.windowMs,
      limit: config.maxRequests,
    };
  } catch (error) {
    console.error('Rate limit status error:', error);
    return null;
  }
}

// Helper to clear rate limits for testing/emergency
export async function clearRateLimits(pattern: string = 'rate-limit:*'): Promise<boolean> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
    return true;
  } catch (error) {
    console.error('Clear rate limits error:', error);
    return false;
  }
}

// Helper to get appropriate rate limit config based on request path
export function getRateLimitConfig(request: NextRequest): RateLimitConfig {
  const path = request.nextUrl.pathname;
  
  if (path.startsWith('/api/auth')) {
    return defaultRateLimits.auth;
  }
  
  if (path.startsWith('/api')) {
    return defaultRateLimits.api;
  }
  
  return defaultRateLimits.default;
}

// Middleware helper
export async function rateLimitMiddleware(request: NextRequest) {
  const config = getRateLimitConfig(request);
  return rateLimit(request, config);
}
