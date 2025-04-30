import { Card } from "../types";

export const calculateNextInterval = (card: Card, rating: number) => {
  const { interval, repetitions } = card;

  if (repetitions === 0) {
    return 1;
  }

  if (rating < 3) {
    return 1;
  }

  if (repetitions === 1) {
    return 6;
  }

  const nextInterval = interval * 2;
  return nextInterval;
};
