import { ApiResponse } from "@/lib/types";

/**
 * A standard API service with available methods.
 */
export const apiService = {
  get: async <T>(url: string, headers: Record<string, string> = {}): Promise<ApiResponse<T>> => {
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        return {
          data: null,
          error: errorData.message || 'API Error'
        };
      }

      const data = await response.json();
      return { data, error: null };
    } catch (error: any) {
      console.error('GET request failed:', error);
      return {
        data: null,
        error: error.message || 'Unknown error'
      };
    }
  }
};
