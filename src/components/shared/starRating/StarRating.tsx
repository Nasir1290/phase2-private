import React from "react";

interface StarRatingProps {
  ratingValue: number; // Rating value as a number (e.g., 4.5)
  totalRatings: number; // Total number of ratings (e.g., 100)
}

const StarRating: React.FC<StarRatingProps> = ({ ratingValue }) => {
  const totalStars = 5;

  // Function to render stars dynamically
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      if (i <= Math.floor(ratingValue)) {
        // Full star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#FACC15" // Yellow color for full stars
            className="w-5 h-5"
          >
            <path d="M12 .587l3.668 7.435 8.207 1.193-5.938 5.798 1.4 8.17L12 18.897l-7.337 3.854 1.4-8.17-5.938-5.798 8.207-1.193z" />
          </svg>
        );
      } else if (i === Math.ceil(ratingValue) && ratingValue % 1 !== 0) {
        // Half star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <defs>
              <linearGradient id={`halfStar${i}`}>
                <stop offset="50%" stopColor="#FACC15" /> {/* Yellow half */}
                <stop offset="50%" stopColor="#d1d5db" /> {/* Gray half */}
              </linearGradient>
            </defs>
            <path
              d="M12 .587l3.668 7.435 8.207 1.193-5.938 5.798 1.4 8.17L12 18.897l-7.337 3.854 1.4-8.17-5.938-5.798 8.207-1.193z"
              fill={`url(#halfStar${i})`}
            />
          </svg>
        );
      } else {
        // Empty star
        stars.push(
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#d1d5db" // Gray color for empty stars
            className="w-3 h-3"
          >
            <path d="M12 .587l3.668 7.435 8.207 1.193-5.938 5.798 1.4 8.17L12 18.897l-7.337 3.854 1.4-8.17-5.938-5.798 8.207-1.193z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <div className="flex items-center gap-4 text-base font-semibold">
      {/* Render Stars */}
      <div className="flex">{renderStars()}</div>
    </div>
  );
};

export default StarRating;
