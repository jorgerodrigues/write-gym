import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { calculateNextDueDate } from "../calculateNextDueDate";

describe("calculateNextDueDate", () => {
  // Store the real Date implementation
  let mockCurrentDate: Date;

  // Set up a fake Date constructor to mock current date
  beforeEach(() => {
    mockCurrentDate = new Date(2023, 0, 15); // January 15, 2023
    vi.useFakeTimers();
    vi.setSystemTime(mockCurrentDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should add the interval days to the current due date", () => {
    const currentDueDate = new Date(2023, 0, 15); // January 15, 2023
    const interval = 7; // 7 days
    const expected = new Date(2023, 0, 22); // January 22, 2023
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should use current date if currentDueDate is in the past", () => {
    const currentDueDate = new Date(2023, 0, 10); // January 10, 2023 (past)
    const interval = 5; // 5 days
    const expected = new Date(2023, 0, 20); // January 20, 2023 (mockCurrentDate + interval)
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should use currentDueDate if it is in the future", () => {
    const currentDueDate = new Date(2023, 0, 20); // January 20, 2023 (future)
    const interval = 10; // 10 days
    const expected = new Date(2023, 0, 30); // January 30, 2023
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should reset time part to midnight", () => {
    const currentDueDate = new Date(2023, 0, 15, 14, 30, 45); // Jan 15, 2023, 14:30:45
    const interval = 3;
    const expected = new Date(2023, 0, 18); // Jan 18, 2023
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(0);
    expect(result.getMilliseconds()).toBe(0);
    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should handle zero interval", () => {
    const currentDueDate = new Date(2023, 0, 15);
    const interval = 0;
    const expected = new Date(2023, 0, 15);
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should handle negative interval", () => {
    const currentDueDate = new Date(2023, 0, 15);
    const interval = -5; // Negative interval (edge case)
    const expected = new Date(2023, 0, 10);
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should handle month/year transitions", () => {
    const currentDueDate = new Date(2023, 0, 30); // January 30, 2023
    const interval = 3; // 3 days
    const expected = new Date(2023, 1, 2); // February 2, 2023
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });

  it("should handle leap years correctly", () => {
    const currentDueDate = new Date(2024, 1, 28); // February 28, 2024 (leap year)
    const interval = 1; // 1 day
    const expected = new Date(2024, 1, 29); // February 29, 2024
    expected.setHours(0, 0, 0, 0);

    const result = calculateNextDueDate(currentDueDate, interval);

    expect(result.getTime()).toBe(expected.getTime());
  });
});
