import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BASE_URL } from '@/utils/baseUtils';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  exp: number; // Expiration timestamp
}

const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// ✅ Store token and user data in local storage after signup
export const signup = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const response = await API.post<{ token: string; user: User }>(
      '/auth/signup',
      userData
    );

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // ✅ Store user info
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || 'Signup failed. Please try again.';
  }
};

// ✅ Store token and user data in local storage after login
export const login = async (userData: { email: string; password: string }) => {
  try {
    const response = await API.post<{ token: string; user: User }>(
      '/auth/signin',
      userData
    );

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user)); // ✅ Store user info
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || 'Login failed. Please try again.';
  }
};

// ✅ Verify token and return user details from local storage
export const verifyToken = (): User | null => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const decoded: DecodedToken = jwtDecode(token);

    // ✅ Check if token is expired
    if (decoded.exp * 1000 < Date.now()) {
      console.warn('Token expired, logging out user');
      logout();
      return null;
    }

    // ✅ Ensure user data is stored in local storage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      return JSON.parse(storedUser);
    }

    // ✅ If no stored user, return decoded user data
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

// ✅ Logout by removing token and user data from local storage
export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
