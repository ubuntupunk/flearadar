// src/app/api/admin-dash/rate-limits/metrics/route.ts
import { NextResponse } from 'next/server';
import { RateLimitMonitor } from '@/lib/utils/rate-limit-monitoring';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get('date') || new Date().toISOString().split('T')[0];

  const metrics = await RateLimitMonitor.getDailyMetrics(date);
  const recentEvents = await RateLimitMonitor.getRecentEvents(10);

  return NextResponse.json({
    metrics,
    recentEvents
  });
}
