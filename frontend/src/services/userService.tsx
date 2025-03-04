import axios from 'axios';
import { BASE_URL } from '@/utils/baseUtils';

export const getAllUsers = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createUser = async (
  token: string,
  userData: { name: string; email: string; password: string; role: string }
) => {
  const response = await axios.post(`${BASE_URL}/api/users`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateUser = async (
  token: string,
  userId: string,
  updateData: { name?: string; role?: string }
) => {
  const response = await axios.put(
    `${BASE_URL}/api/users/${userId}`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteUser = async (token: string, userId: string) => {
  const response = await axios.delete(`${BASE_URL}/api/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
