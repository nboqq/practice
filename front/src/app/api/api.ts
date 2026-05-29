const API_BASE_URL = 'http://localhost:5000/api';

export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  getMe: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

export const cartAPI = {
  addItem: async (token: string, product: any) => {
    const response = await fetch(`${API_BASE_URL}/cart/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(product),
    });
    return response.json();
  },

  getCart: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  removeItem: async (token: string, productId: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/remove`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    return response.json();
  },

  updateQty: async (token: string, productId: number, qty: number) => {
    const response = await fetch(`${API_BASE_URL}/cart/update-qty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId, qty }),
    });
    return response.json();
  },

  clear: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/cart/clear`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },
};

export const balanceAPI = {
  getBalance: async (token: string) => {
    const response = await fetch(`${API_BASE_URL}/balance`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  },

  topup: async (token: string, amount: number) => {
    const response = await fetch(`${API_BASE_URL}/balance/topup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ amount }),
    });
    return response.json();
  },
};
