type ApiRequestParams = Record<string, string | number | boolean | undefined>;

interface ApiErrorData {
  status: number;
  data: unknown;
  message: string;
}

// Create error factory function
export const createApiError = (
  status: number,
  data: unknown,
  customMessage?: string
): ApiErrorData & Error => {
  const message = customMessage || `API request failed with status: ${status}`;
  const error = new Error(message) as ApiErrorData & Error;
  error.status = status;
  error.data = data;
  error.name = "ApiError";
  return error;
};

// Helper to check if an error is an API error
export const isApiError = (error: unknown): error is ApiErrorData & Error => {
  return (
    error instanceof Error &&
    "status" in error &&
    "data" in error &&
    error.name === "ApiError"
  );
};

// Base URL configuration (could also be imported from env config)
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

// Helper to build URLs with path params and query params
export const buildUrl = (
  endpoint: string,
  pathParams?: ApiRequestParams,
  queryParams?: ApiRequestParams
): string => {
  // Replace path parameters like /users/:id with actual values
  let url = pathParams
    ? Object.entries(pathParams).reduce((result, [key, value]) => {
        return result.replace(`:${key}`, String(value));
      }, endpoint)
    : endpoint;

  // Add base URL if the endpoint is not absolute
  if (!url.startsWith("http")) {
    url = `${API_BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
  }

  // Add query parameters
  if (queryParams) {
    const searchParams = new URLSearchParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

// Core fetcher function
export const apiFetcher = async <T>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw createApiError(response.status, data);
    }

    return data as T;
  } catch (error) {
    if (isApiError(error)) {
      throw error;
    }
    throw new Error(
      `API request failed: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};

// HTTP Method helpers grouped in an object (not a class)
export const apiClient = {
  // GET request
  get: <T>(
    endpoint: string,
    pathParams?: ApiRequestParams,
    queryParams?: ApiRequestParams,
    options?: RequestInit
  ): Promise<T> => {
    const url = buildUrl(endpoint, pathParams, queryParams);
    return apiFetcher<T>(url, { method: "GET", ...options });
  },

  // POST request
  post: <T, D = unknown>(
    endpoint: string,
    data?: D,
    pathParams?: ApiRequestParams,
    queryParams?: ApiRequestParams,
    options?: RequestInit
  ): Promise<T> => {
    const url = buildUrl(endpoint, pathParams, queryParams);
    return apiFetcher<T>(url, {
      method: "POST",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // PUT request
  put: <T, D = unknown>(
    endpoint: string,
    data?: D,
    pathParams?: ApiRequestParams,
    queryParams?: ApiRequestParams,
    options?: RequestInit
  ): Promise<T> => {
    const url = buildUrl(endpoint, pathParams, queryParams);
    return apiFetcher<T>(url, {
      method: "PUT",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // PATCH request
  patch: <T, D = unknown>(
    endpoint: string,
    data?: D,
    pathParams?: ApiRequestParams,
    queryParams?: ApiRequestParams,
    options?: RequestInit
  ): Promise<T> => {
    const url = buildUrl(endpoint, pathParams, queryParams);
    return apiFetcher<T>(url, {
      method: "PATCH",
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    });
  },

  // DELETE request
  delete: <T>(
    endpoint: string,
    pathParams?: ApiRequestParams,
    queryParams?: ApiRequestParams,
    options?: RequestInit
  ): Promise<T> => {
    const url = buildUrl(endpoint, pathParams, queryParams);
    return apiFetcher<T>(url, { method: "DELETE", ...options });
  },
};
