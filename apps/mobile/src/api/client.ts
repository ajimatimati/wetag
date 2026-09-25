/**
 * weTag Unified API Client
 * Manages service routing, JWT Bearer tokens, and structured error normalization.
 */

const API_CONFIG = {
  IDENTITY_URL: process.env.EXPO_PUBLIC_IDENTITY_URL || 'http://localhost:3001',
  MOVE_URL: process.env.EXPO_PUBLIC_MOVE_URL || 'http://localhost:3002',
  STAY_URL: process.env.EXPO_PUBLIC_STAY_URL || 'http://localhost:3003',
  WALLET_URL: process.env.EXPO_PUBLIC_WALLET_URL || 'http://localhost:3004',
};

export type ServiceName = 'identity' | 'move' | 'stay' | 'wallet';

class ApiClient {
  private token: string | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getToken(): string | null {
    return this.token;
  }

  private getBaseUrl(service: ServiceName): string {
    switch (service) {
      case 'identity':
        return API_CONFIG.IDENTITY_URL;
      case 'move':
        return API_CONFIG.MOVE_URL;
      case 'stay':
        return API_CONFIG.STAY_URL;
      case 'wallet':
        return API_CONFIG.WALLET_URL;
      default:
        throw new Error(`Unknown service: ${service}`);
    }
  }

  async request<T>(
    service: ServiceName,
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const baseUrl = this.getBaseUrl(service);
    const url = `${baseUrl}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status}`);
      }

      return data as T;
    } catch (err: any) {
      console.warn(`[API Error] ${service.toUpperCase()} ${endpoint}:`, err.message);
      throw err;
    }
  }

  get<T>(service: ServiceName, endpoint: string) {
    return this.request<T>(service, endpoint, { method: 'GET' });
  }

  post<T>(service: ServiceName, endpoint: string, body?: any) {
    return this.request<T>(service, endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  put<T>(service: ServiceName, endpoint: string, body?: any) {
    return this.request<T>(service, endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  patch<T>(service: ServiceName, endpoint: string, body?: any) {
    return this.request<T>(service, endpoint, {
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(service: ServiceName, endpoint: string) {
    return this.request<T>(service, endpoint, { method: 'DELETE' });
  }
}

export const api = new ApiClient();
