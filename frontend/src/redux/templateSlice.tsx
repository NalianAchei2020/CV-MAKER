import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllTemplates } from '@/services/templateService';

// ✅ Define Template Interface
interface Template {
  _id: string;
  name: string;
  description: string;
  structure: { html: string };
  cssStyles: string;
  defaultData: Record<string, any>;
}

// ✅ Define Redux State
interface TemplateState {
  templates: Template[];
  loading: boolean;
  error: string | null;
}

// ✅ Initial State
const initialState: TemplateState = {
  templates: [],
  loading: false,
  error: null,
};

// ✅ Async Thunk to Fetch Templates
export const fetchTemplates = createAsyncThunk(
  'templates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getAllTemplates(); // Calls backend API
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error || 'Failed to load templates.'
      );
    }
  }
);

// ✅ Template Slice
const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTemplates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.loading = false;
        state.templates = action.payload; // Store fetched templates
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default templateSlice.reducer;
