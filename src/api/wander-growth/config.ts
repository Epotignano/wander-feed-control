import { WanderGrowthConfig } from './types';

export const createConfig = (apiKey: string): WanderGrowthConfig => ({
  baseUrl: process.env.NEXT_PUBLIC_WANDER_GROWTH_API_URL || 'https://api.wandergrowth.com',
  apiKey,
  timeout: 30000,
});

export const getDefaultConfig = (): WanderGrowthConfig => {
  const apiKey = process.env.NEXT_PUBLIC_WANDER_GROWTH_API_KEY;
  
  if (!apiKey) {
    throw new Error('NEXT_PUBLIC_WANDER_GROWTH_API_KEY environment variable is not set');
  }

  return createConfig(apiKey);
}; 