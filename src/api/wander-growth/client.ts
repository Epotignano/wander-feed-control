import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiError, WanderGrowthConfig, ApiResponse } from './types';

export class WanderGrowthClient {
  private client: AxiosInstance;
  private config: WanderGrowthConfig;

  constructor(config: WanderGrowthConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout || 30000,
      headers: {
        'Authorization': `Bearer ${config.apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      this.handleError
    );
  }

  private handleError(error: AxiosError): never {
    const apiError: ApiError = {
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      status: error.response?.status || 500,
      details: error.response?.data as Record<string, unknown>,
    };

    throw apiError;
  }

  public async get<T>(path: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await this.client.get(path, { params });
    return response.data;
  }

  public async post<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.post(path, data);
    return response.data;
  }

  public async put<T>(path: string, data?: unknown): Promise<ApiResponse<T>> {
    const response = await this.client.put(path, data);
    return response.data;
  }

  public async delete<T>(path: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete(path);
    return response.data;
  }
} 