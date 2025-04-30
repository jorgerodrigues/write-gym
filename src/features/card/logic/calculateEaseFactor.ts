import {
  EASE_BONUS,
  EASE_PENALTY,
  MINIMUM_EASE_FACTOR,
} from "@/constants/cards";

export const calculateNewEaseFactor = (
  currentEaseFactor: number,
  rating: number
): number => {
  let newEaseFactor = currentEaseFactor;

  // Adjust based on rating
  if (rating >= 3) {
    // For ratings 3-5, increase ease factor
    newEaseFactor += (rating - 3) * EASE_BONUS;
  } else {
    // For ratings 1-2, decrease ease factor
    newEaseFactor -= EASE_PENALTY;
  }

  // Ensure ease factor doesn't go below minimum
  return Math.max(newEaseFactor, MINIMUM_EASE_FACTOR);
};
