import React from 'react';

interface ScoreProps {
  rating: number[];
}

const Score: React.FC<ScoreProps> = ({ rating }) => {
  const averageRating = rating.reduce((sum, r) => sum + r, 0) / rating.length;
  const roundedAverage = Math.round(averageRating);

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < roundedAverage ? 'currentColor' : 'none'}
          stroke={i < roundedAverage ? 'none' : 'currentColor'}
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
