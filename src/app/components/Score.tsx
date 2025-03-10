import React from 'react';

interface ScoreProps {
  rating: number[];
}

const Score: React.FC<ScoreProps> = ({ rating }) => {
  const ratingSum = rating.reduce((sum, r) => sum + r, 0);
  const averageRating = rating.length > 0 ? ratingSum / rating.length : 0;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  if (rating.length === 0 || ratingSum === 0) {
    return (
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => (
          <svg
            key={`empty-${i}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            width="1.125em"
            height="1.125em"
            className="text-red-500"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
          </svg>
        ))}
        <span className="text-gray-600 ml-1">0 reviews</span>
      </div>
    );
  }

  return (
    <div className="flex items-center">
      {Array.from({ length: fullStars }, (_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="1.125em"
          height="1.125em"
          className="text-red-500"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          key="half"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="1.125em"
          height="1.125em"
          className="text-red-500"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      )}
      {Array.from({ length: emptyStars }, (_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          width="1.125em"
          height="1.125em"
          className="text-red-500"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
        </svg>
      ))}
      <span className="text-gray-600 ml-1">{averageRating.toFixed(1)} ({rating.length} reviews)</span>
    </div>
  );
};

export default Score;
