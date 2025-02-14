/**
 * Base API response type
 */
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

/**
 * API Error response
 */
export interface ApiError {
  message: string;
  code: string;
  status: number;
  details?: Record<string, unknown>;
}

/**
 * Configuration for the Wander Growth API client
 */
export interface WanderGrowthConfig {
  baseUrl: string;
  apiKey: string;
  timeout?: number;
} 