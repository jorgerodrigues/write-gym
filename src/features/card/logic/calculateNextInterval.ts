import { Card } from "../types";

export const calculateNextInterval = (card: Card) => {
  const { interval, repetitions } = card;

  if (repetitions === 0) {
    return 1;
  }

  if (repetitions === 1) {
    return 6;
  }

  const nextInterval = interval * 2;
  return nextInterval;
};
