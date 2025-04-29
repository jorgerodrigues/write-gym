export const calculateNextDueDate = (
  currentDueDate: Date,
  interval: number
): Date => {
  const nextDueDate = new Date(currentDueDate);
  nextDueDate.setDate(nextDueDate.getDate() + interval);
  nextDueDate.setHours(0, 0, 0, 0);
  return nextDueDate;
};
