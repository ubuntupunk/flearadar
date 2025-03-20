'use client';

import { useEffect, useState } from 'react';
import { Card, LineChart, BarChart } from '@/components/ui';
import {Metric, RecentEvent} from '@/types/rate-limit';

interface Metric {
  totalHits: number;
  totalBlocked: number;
  uniqueIPs: number;
  topPaths: { path: string; count: number }[];
  totalHitsOverTime: {timestamp: string; count: number}[];
}

interface RecentEvent {
  timestamp: string;
  ip: string;
  path: string;
  blocked: boolean;
}

export default function RateLimitDashboard() {
  const [metrics, setMetrics] = useState<Metric | null>(null);
  const [recentEvents, setRecentEvents] = useState<RecentEvent[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch('/api/admin/rate-limits/metrics');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMetrics(data.metrics);
        setRecentEvents(data.recentEvents);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!metrics) return <div>No data available.</div>;

  const lineChartData = metrics.totalHitsOverTime.map(item => ({
    x: new Date(item.timestamp),
    y: item.count
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Rate Limit Monitoring</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card title="Total Hits" value={metrics.totalHits} />
        <Card title="Total Blocked" value={metrics.totalBlocked} />
        <Card title="Unique IPs" value={metrics.uniqueIPs} />
        <Card title="Block Rate" value={`${((metrics.totalBlocked / metrics.totalHits) * 100).toFixed(2)}%`} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Total Hits Over Time</h2>
          <LineChart data={lineChartData} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Top Blocked Paths</h2>
          <BarChart data={metrics.topPaths} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Events</h2>
          <div className="space-y-2">
            {recentEvents.map((event, i) => (
              <div key={i} className="p-2 bg-gray-50 rounded">
                <p>{new Date(event.timestamp).toLocaleString()}</p>
                <p>IP: {event.ip}</p>
                <p>Path: {event.path}</p>
                <p>Status: {event.blocked ? 'Blocked' : 'Allowed'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
