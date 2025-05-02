export type APIReturnType<T> = {
  data: T;
  error?: Error | string | null;
};
