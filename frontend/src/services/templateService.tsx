import axios from 'axios';
import { BASE_URL } from '@/utils/baseUtils';

export const getAllTemplates = async () => {
  const response = await axios.get(`${BASE_URL}/api/templates`);
  return response.data;
};

export const getTemplateById = async (templateId: string) => {
  const response = await axios.get(`${BASE_URL}/api/templates/${templateId}`);
  return response.data;
};

export const createTemplate = async (token: string, templateData: any) => {
  const response = await axios.post(`${BASE_URL}/api/templates`, templateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateTemplate = async (
  token: string,
  templateId: string,
  updateData: any
) => {
  const response = await axios.put(
    `${BASE_URL}/api/templates/${templateId}`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const deleteTemplate = async (token: string, templateId: string) => {
  const response = await axios.delete(
    `${BASE_URL}/api/templates/${templateId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
export const updateTemplateLive = async (
  token: string,
  templateId: string,
  updateData: any
) => {
  const response = await axios.put(
    `${BASE_URL}/api/templates/${templateId}/live`,
    updateData,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
