// src/hooks/useBookmarks.ts
import { useCallback, useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/lib/types/database';
import type { Bookmark } from '@/lib/types/database';

export function useBookmarks(userId: string) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClientComponentClient<Database>();

  const fetchBookmarks = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          *,
          listings(id, data, slug),
          content(id, title, body, type)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (e) {
      setError(e as Error);
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  const addBookmark = useCallback(async (bookmark: Omit<Bookmark, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .insert(bookmark)
        .select()
        .single();

      if (error) throw error;
      setBookmarks(prev => [data, ...prev]);
      return data;
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [supabase]);

  const removeBookmark = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
    } catch (e) {
      setError(e as Error);
      throw e;
    }
  }, [supabase]);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    removeBookmark,
    refreshBookmarks: fetchBookmarks
  };
}
