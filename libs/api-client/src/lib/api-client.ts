const API_URL =
  process.env["NEXT_PUBLIC_API_URL"] ?? 'http://localhost:3000/api';

// libs/api-client/src/lib/api-client.ts — substituir a função request inteira
async function request(path: string, options: RequestInit = {}, retry = true): Promise<any> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (res.status === 401 && retry && typeof window !== 'undefined') {
    const refreshed = await tryRefresh();
    if (refreshed) return request(path, options, false); // tenta de novo, uma vez só
  }

  if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function tryRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return false;
  }

  const tokens = await res.json();
  localStorage.setItem('accessToken', tokens.accessToken);
  localStorage.setItem('refreshToken', tokens.refreshToken);
  return true;
}

export const authApi = {
  login: (email: string, password: string) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (email: string, password: string) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  me: () => request('/auth/me'),
};

export const versesApi = {
  getChapter: (bookSlug: string, chapter: number, lang = 'PT') =>
    request(`/verses/${bookSlug}/${chapter}?lang=${lang}`),
};

export const booksApi = {
  getAll: () => request('/books'),

  search: (q: string) =>
    request(`/books/search?q=${encodeURIComponent(q)}`),
};