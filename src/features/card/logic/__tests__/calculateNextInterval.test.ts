import { describe, it, expect } from "vitest";
import { calculateNextInterval } from "../calculateNextInterval";
import { Card } from "../../types";

describe("calculateNextInterval", () => {
  // Helper function to create a test card
  const createTestCard = (interval: number, repetitions: number): Card => ({
    id: "test-id",
    front: "Test Front",
    back: "Test Back",
    repetitions,
    easeFactor: 2.5,
    interval,
    userId: "test-user-id",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  it("should return 1 for first repetition", () => {
    const card = createTestCard(0, 0);
    const rating = 4; // Good rating
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(1);
  });

  it("should return 1 for any rating below 3", () => {
    const card = createTestCard(5, 2); // Non-zero repetitions
    const rating = 2; // Below threshold
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(1);
  });

  it("should return 6 for second repetition with rating >= 3", () => {
    const card = createTestCard(1, 1);
    const rating = 3; // Threshold rating
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(6);
  });

  it("should double the interval for third+ repetition with rating >= 3", () => {
    const card = createTestCard(6, 2);
    const rating = 4; // Good rating
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(12); // 6 * 2
  });

  it("should double the interval for very high repetition count", () => {
    const card = createTestCard(30, 10);
    const rating = 5; // Excellent rating
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(60); // 30 * 2
  });

  it("should return 1 for a previously successful card with new rating < 3", () => {
    const card = createTestCard(10, 5); // Previously successful card
    const rating = 1; // Poor rating
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(1);
  });

  it("should handle zero interval with non-zero repetitions", () => {
    const card = createTestCard(0, 3);
    const rating = 4;
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(0); // 0 * 2 = 0
  });

  it("should handle negative interval (edge case)", () => {
    const card = createTestCard(-5, 3); // Unrealistic but should be handled
    const rating = 4;
    
    const result = calculateNextInterval(card, rating);
    
    expect(result).toBe(-10); // -5 * 2
  });
});