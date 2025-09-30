const API_BASE_URL = 'https://stellar-api-kg7g.onrender.com/api';

interface User {
  id: number;
  email: string;
  role: string;
  credits: number;
  created_at: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface Form {
  id: number;
  title: string;
  schema_json: string;
  created_at: string;
  updated_at: string;
}

// ---------------- Auth Endpoints ----------------

export const register = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Registration failed');
  return data;
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Login failed');
  return data;
};

export const getMe = async (token: string): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch user');
  return data;
};

export const googleLogin = async (token: string): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Google login failed');
  return data;
};

// ---------------- Forms Endpoints ----------------

export const getForms = async (token: string): Promise<Form[]> => {
  const response = await fetch(`${API_BASE_URL}/forms`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to fetch forms');
  return data;
};

export const createForm = async (
  token: string,
  title: string,
  schema_json: string,
): Promise<Form> => {
  const response = await fetch(`${API_BASE_URL}/forms`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, schema_json }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to create form');
  return data;
};

export const updateForm = async (
  token: string,
  id: number,
  title: string,
  schema_json: string,
): Promise<Form> => {
  const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, schema_json }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to update form');
  return data;
};

export const deleteForm = async (
  token: string,
  id: number,
): Promise<{ message: string }> => {
  const response = await fetch(`${API_BASE_URL}/forms/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to delete form');
  return data;
};
