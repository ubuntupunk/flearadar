// src/hooks/useActivityLog.ts
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/types/database';

type ActivityLog = Database['public']['Tables']['activity_log']['Row'];

export function useActivityLog(userId: string) {
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClientComponentClient<Database>();

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;
      setActivities(data || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  const logActivity = useCallback(async (
    type: Database['public']['Enums']['activity_type'],
    message: string,
    metadata?: Record<string, any>,
    relatedEntityId?: string,
    relatedEntityType?: string
  ) => {
    try {
      const { error } = await supabase
        .from('activity_log')
        .insert({
          user_id: userId,
          type,
          message,
          metadata,
          related_entity_id: relatedEntityId,
          related_entity_type: relatedEntityType
        });

      if (error) throw error;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [userId, supabase]);

  useEffect(() => {
    fetchActivities();

    // Set up real-time subscription
    const channel = supabase
      .channel(`activity_log:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setActivities(current => [payload.new as ActivityLog, ...current]);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, supabase, fetchActivities]);

  return {
    activities,
    loading,
    error,
    logActivity,
    refreshActivities: fetchActivities
  };
}