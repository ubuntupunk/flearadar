// src/components/Bookmarks.tsx
"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { Bookmark } from '@/lib/types/database';

interface BookmarksProps {
  userId: string;
}

export function Bookmarks({ userId }: BookmarksProps) {
  const { bookmarks, loading, error, removeBookmark } = useBookmarks(userId);

  if (loading) return <div>Loading bookmarks...</div>;
  if (error) return <div>Error loading bookmarks: {error.message}</div>;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Your Bookmarks</h3>
      {bookmarks.length === 0 ? (
        <p className="text-gray-500">No bookmarks yet</p>
      ) : (
        <div className="grid gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark} 
              onRemove={removeBookmark} 
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface BookmarkCardProps {
  bookmark: Bookmark;
  onRemove: (id: string) => Promise<void>;
}

function BookmarkCard({ bookmark, onRemove }: BookmarkCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium">{bookmark.title || 'Untitled Bookmark'}</h4>
          {bookmark.description && (
            <p className="text-sm text-gray-600">{bookmark.description}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            {new Date(bookmark.created_at!).toLocaleDateString()}
          </p>
        </div>
        <button
          onClick={() => onRemove(bookmark.id)}
          className="text-red-600 hover:text-red-800"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
