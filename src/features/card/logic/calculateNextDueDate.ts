export const calculateNextDueDate = (
  currentDueDate: Date,
  interval: number
): Date => {
  let latestDueDate = new Date(currentDueDate);

  if (latestDueDate.getTime() <= new Date().getTime()) {
    latestDueDate = new Date();
  }

  latestDueDate.setDate(latestDueDate.getDate() + interval);
  latestDueDate.setHours(0, 0, 0, 0);
  return latestDueDate;
};
