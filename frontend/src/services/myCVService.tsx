import axios from 'axios';
import { BASE_URL } from '@/utils/baseUtils';

// ✅ Fetch all saved CVs of the logged-in user
export const getUserCVs = async (token: string) => {
  const response = await axios.get(`${BASE_URL}/api/cvs/user`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// ✅ Delete a CV by ID
export const deleteUserCV = async (token: string, cvId: string) => {
  const response = await axios.delete(`${BASE_URL}/api/cvs/${cvId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
