// src/app/admin/rate-limits/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Card, LineChart, BarChart } from '@/components/ui'; // Your UI components

export default function RateLimitDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [recentEvents, setRecentEvents] = useState([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      const response = await fetch('/api/admin/rate-limits/metrics');
      const data = await response.json();
      setMetrics(data.metrics);
      setRecentEvents(data.recentEvents);
    };

    fetchMetrics();
    const interval = setInterval(fetchMetrics, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  if (!metrics) return <div>Loading...</div>;

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
