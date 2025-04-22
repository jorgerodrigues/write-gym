export const parseStringToNumber = (value: string | null): number | null => {
  if (!value) return null;
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
};
