import React from 'react';

interface ScoreProps {
  rating: number[];
}

const StarIcon = ({ filled, half = false }: { filled: boolean; half?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1.125em"
    height="1.125em"
    className="text-red-500 dark:text-red-400 transition-colors duration-200"
  >
    {half ? (
      <>
        <defs>
          <linearGradient id="half-star-gradient">
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="50%" stopColor="transparent" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#half-star-gradient)"
          stroke="currentColor"
          strokeWidth="1"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      </>
    ) : (
      <path
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={filled ? '0' : '1.5'}
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    )}
  </svg>
);

export default function Score({ rating }: ScoreProps): React.ReactElement {
  const ratingSum = rating.reduce((sum, r) => sum + r, 0);
  const averageRating = rating.length > 0 ? ratingSum / rating.length : 0;
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  if (rating.length === 0 || ratingSum === 0) {
    return (
      <div className="flex items-center space-x-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={`empty-${i}`} filled={false} />
        ))}
        <span className="text-gray-600 dark:text-gray-400 text-sm ml-1.5 transition-colors duration-200">
          No reviews yet
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-0.5">
      {Array.from({ length: fullStars }, (_, i) => (
        <StarIcon key={`full-${i}`} filled={true} />
      ))}
      {hasHalfStar && <StarIcon key="half" filled={false} half={true} />}
      {Array.from({ length: emptyStars }, (_, i) => (
        <StarIcon key={`empty-${i}`} filled={false} />
      ))}
      <span className="text-gray-600 dark:text-gray-400 text-sm ml-1.5 transition-colors duration-200">
        {averageRating.toFixed(1)} ({rating.length} {rating.length === 1 ? 'review' : 'reviews'})
      </span>
    </div>
  );
}
