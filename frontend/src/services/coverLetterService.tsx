import axios from 'axios';
import { BASE_URL } from '@/utils/baseUtils';

export const getAllCoverLetters = async () => {
  const response = await axios.get(`${BASE_URL}/api/cover-letters`);
  return response.data;
};

export const createCoverLetter = async (
  token: string,
  coverLetterData: any
) => {
  const response = await axios.post(
    `${BASE_URL}/api/cover-letters`,
    coverLetterData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const updateCoverLetter = async (
  token: string,
  coverLetterId: string,
  updateData: any
) => {
  const response = await axios.put(
    `${BASE_URL}/api/cover-letters/${coverLetterId}`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
