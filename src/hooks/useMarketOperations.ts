// src/hooks/useMarketOperations.ts
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/types/database';

export function useMarketOperations(marketId: string) {
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const manageStalls = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('market_stalls')
        .select('*')
        .eq('market_id', marketId);

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const viewBookings = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('stall_bookings')
        .select(`
          *,
          vendor:vendors(name, business_name)
        `)
        .eq('market_id', marketId);

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const managePayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('vendor_payments')
        .select(`
          *,
          vendor:vendors(name, business_name)
        `)
        .eq('market_id', marketId)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMarketSettings = async (settings: Partial<MarketProfile>) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('markets')
        .update(settings)
        .eq('id', marketId);

      if (error) throw error;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    manageStalls,
    viewBookings,
    managePayments,
    updateMarketSettings,
    loading,
    error
  };
}
