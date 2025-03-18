// src/lib/utils/time-formats.ts

// Export individual functions first
export const formatRelativeTime = (date: string | null): string => {
  if (!date) return "Never";
  
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "Just now";
  }
  
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  }
  
  return then.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getOnlineStatus = (lastSeen: string | null): string => {
  if (!lastSeen) return "Offline";
  const lastSeenDate = new Date(lastSeen);
  const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
  return lastSeenDate > fiveMinutesAgo ? "Online" : formatRelativeTime(lastSeen);
};

export const formatTime = (date: string | null): string => {
  if (!date) return "";
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatDateTime = (date: string | null): string => {
  if (!date) return "";
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

// Export all functions as a group
export const timeFormats = {
  getOnlineStatus,
  formatRelativeTime,
  formatTime,
  formatDateTime
};

    