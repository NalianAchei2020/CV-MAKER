import { Template } from '@/lib/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from './baseURL';
import { ReduxTemplate } from './types';

interface interfaceState {
  templates: ReduxTemplate[];
  error: string | null;
  loading: boolean;
}

const initialState: interfaceState = {
  templates: [],
  error: null,
  loading: false,
};

export const createTemplate = createAsyncThunk<Template, Template>(
  'templates/postTemplate',
  async (template) => {
    try {
      const response = await axios({
        url: `${baseURL}/api/temps/template`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: template,
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error('Error posting template:', error);
      throw error; // Rethrow the error to be handled in extraReducers
    }
  }
);

// fetch template
export const fetchTemplate = createAsyncThunk(
  'templates/fetchTemplate',
  async () => {
    try {
      const response = await axios({
        url: `${baseURL}/api/temps/templates`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },

        withCredentials: true,
      });
      return response.data.template;
    } catch (error) {
      console.error('Error posting template:', error);
      throw error;
    }
  }
);
const templateSlice = createSlice({
  name: 'template',
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTemplate.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });

    builder
      .addCase(fetchTemplate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.loading = false;
        state.templates.push(action.payload);
      })
      .addCase(fetchTemplate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const templatesReducer = templateSlice.reducer;
