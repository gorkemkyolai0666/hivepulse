const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4020/api';

interface RequestOptions {
  method?: string;
  body?: unknown;
  token?: string | null;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, token } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'İstek başarısız' }));
    throw new ApiError(response.status, error.message || 'İstek başarısız');
  }

  return response.json();
}

function listRequest(endpoint: string, token: string, params?: Record<string, string | number | undefined>) {
  const query = new URLSearchParams();
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) query.set(key, String(value));
    });
  }
  const qs = query.toString();
  return request(`${endpoint}${qs ? `?${qs}` : ''}`, { token });
}

export const api = {
  auth: {
    register: (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      apiaryName: string;
      phone?: string;
      city?: string;
      state?: string;
    }) => request('/auth/register', { method: 'POST', body: data }),

    login: (data: { email: string; password: string }) =>
      request('/auth/login', { method: 'POST', body: data }),

    me: (token: string) => request('/auth/me', { token }),
  },

  dashboard: {
    stats: (token: string) => request('/dashboard/stats', { token }),
  },

  hives: {
    list: (token: string, params?: { page?: number; status?: string; location?: string }) =>
      listRequest('/hives', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/hives', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/hives/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/hives/${id}`, { method: 'DELETE', token }),
  },

  harvests: {
    list: (token: string, params?: { page?: number; status?: string }) =>
      listRequest('/harvests', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/harvests', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/harvests/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/harvests/${id}`, { method: 'DELETE', token }),
  },

  inspections: {
    list: (token: string, params?: { page?: number; status?: string }) =>
      listRequest('/inspections', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/inspections', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/inspections/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/inspections/${id}`, { method: 'DELETE', token }),
  },

  treatments: {
    list: (token: string, params?: { page?: number; status?: string }) =>
      listRequest('/treatments', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/treatments', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/treatments/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/treatments/${id}`, { method: 'DELETE', token }),
  },

  honeyVarieties: {
    list: (token: string, params?: { page?: number; status?: string }) =>
      listRequest('/honey-varieties', token, params),
    create: (token: string, data: Record<string, unknown>) =>
      request('/honey-varieties', { method: 'POST', body: data, token }),
    update: (token: string, id: string, data: Record<string, unknown>) =>
      request(`/honey-varieties/${id}`, { method: 'PATCH', body: data, token }),
    delete: (token: string, id: string) =>
      request(`/honey-varieties/${id}`, { method: 'DELETE', token }),
  },

  apiary: {
    get: (token: string) => request('/apiary', { token }),
    update: (token: string, data: Record<string, unknown>) =>
      request('/apiary', { method: 'PATCH', body: data, token }),
  },
};

export { ApiError };
