// src/hooks/useVendorStats.ts
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/types/database';

type VendorStats = Database['public']['Tables']['vendor_stats']['Row'];

export function useVendorStats(vendorId: string) {
  const [stats, setStats] = useState<VendorStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClientComponentClient<Database>();

  const fetchStats = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendor_stats')
        .select('*')
        .eq('vendor_id', vendorId)
        .single();

      if (error) throw error;
      setStats(data);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [vendorId, supabase]);

  useEffect(() => {
    fetchStats();

    // Set up real-time subscription
    const channel = supabase
      .channel(`vendor_stats:${vendorId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'vendor_stats',
          filter: `vendor_id=eq.${vendorId}`,
        },
        (payload) => {
          setStats(payload.new as VendorStats);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [vendorId, supabase, fetchStats]);

  return { stats, loading, error, refreshStats: fetchStats };
}