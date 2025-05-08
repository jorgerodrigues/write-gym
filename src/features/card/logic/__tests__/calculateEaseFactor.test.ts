import { describe, it, expect } from "vitest";
import { calculateNewEaseFactor } from "../calculateEaseFactor";
import {
  EASE_BONUS,
  EASE_PENALTY,
  MINIMUM_EASE_FACTOR,
} from "@/constants/cards";

describe("calculateNewEaseFactor", () => {
  // Test for rating 1 (difficult)
  it("should decrease the ease factor for rating 1", () => {
    const currentEaseFactor = 2.5;
    const rating = 1;
    const expected = currentEaseFactor - EASE_PENALTY;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Test for rating 2 (hard)
  it("should decrease the ease factor for rating 2", () => {
    const currentEaseFactor = 2.5;
    const rating = 2;
    const expected = currentEaseFactor - EASE_PENALTY;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Test for rating 3 (good)
  it("should not change the ease factor for rating 3", () => {
    const currentEaseFactor = 2.5;
    const rating = 3;
    const expected = currentEaseFactor; // No change for rating 3

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Test for rating 4 (easy)
  it("should increase the ease factor for rating 4", () => {
    const currentEaseFactor = 2.5;
    const rating = 4;
    const expected = currentEaseFactor + EASE_BONUS;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Test for rating 5 (very easy)
  it("should increase the ease factor more for rating 5", () => {
    const currentEaseFactor = 2.5;
    const rating = 5;
    const expected = currentEaseFactor + 2 * EASE_BONUS;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Test for minimum ease factor
  it("should not allow the ease factor to go below the minimum", () => {
    const currentEaseFactor = MINIMUM_EASE_FACTOR + 0.1; // Just above minimum
    const rating = 1;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(MINIMUM_EASE_FACTOR);
  });

  // Edge case: already at minimum
  it("should maintain the minimum ease factor when already at minimum", () => {
    const currentEaseFactor = MINIMUM_EASE_FACTOR;
    const rating = 1;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(MINIMUM_EASE_FACTOR);
  });

  // Edge case: very high rating
  it("should handle a very high rating correctly", () => {
    const currentEaseFactor = 2.5;
    const rating = 10; // Unrealistic but should be handled
    const expected = currentEaseFactor + (10 - 3) * EASE_BONUS;

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });

  // Edge case: very low rating
  it("should handle a very low rating correctly", () => {
    const currentEaseFactor = 2.5;
    const rating = -5; // Unrealistic but should be handled
    const expected = Math.max(
      currentEaseFactor - EASE_PENALTY,
      MINIMUM_EASE_FACTOR
    );

    const result = calculateNewEaseFactor(currentEaseFactor, rating);

    expect(result).toBe(expected);
  });
});
