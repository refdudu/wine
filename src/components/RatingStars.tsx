import { Star } from "@phosphor-icons/react";
import React from "react";

interface RatingStarsProps {
  total: number;
  size?: number;
  onRate?: (rating: number) => void; // Callback para quando uma estrela é clicada
  currentRating?: number; // Para modo interativo
  interactive?: boolean;
}

export function RatingStars({ 
  total, 
  size = 16, 
  onRate, 
  currentRating = 0, 
  interactive = false 
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleClick = (rating: number) => {
    if (onRate && interactive) {
      onRate(rating);
    }
  };

  const handleMouseEnter = (rating: number) => {
    if (interactive) {
      setHoverRating(rating);
    }
  };

  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className={`flex gap-1 ${interactive ? 'cursor-pointer' : ''}`}>
      {Array.from({ length: 5 }, (_, i) => i + 1).map((starIndex) => {
        let weight: 'fill' | 'regular' = 'regular';
        if (interactive) {
          if (hoverRating >= starIndex) {
            weight = 'fill';
          } else if (!hoverRating && currentRating >= starIndex) {
            weight = 'fill';
          }
        } else {
          if (total >= starIndex) {
            weight = 'fill';
          }
        }
        return (
          <Star
            key={starIndex}
            size={size}
            weight={weight}
            color="#FBBF24"
            onClick={() => handleClick(starIndex)}
            onMouseEnter={() => handleMouseEnter(starIndex)}
            onMouseLeave={handleMouseLeave}
          />
        );
      })}
    </div>
  );
}
