import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '@/utils/baseUtils';

// ✅ Fetch all user CVs
export const fetchUserCVs = createAsyncThunk(
  'cvs/fetchUserCVs',
  async (token) => {
    const response = await axios.get(`${BASE_URL}/api/cvs/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

// ✅ Save a new CV
export const saveCV = createAsyncThunk(
  'cvs/saveCV',
  async ({ token, cvData }) => {
    const response = await axios.post(`${BASE_URL}/api/cvs`, cvData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

// ✅ Delete a CV
export const deleteCV = createAsyncThunk(
  'cvs/deleteCV',
  async ({ token, cvId }) => {
    await axios.delete(`${BASE_URL}/api/cvs/${cvId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return cvId;
  }
);

// ✅ CV Slice
const cvSlice = createSlice({
  name: 'cvs',
  initialState: { cvs: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCVs.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserCVs.fulfilled, (state, action) => {
        state.loading = false;
        state.cvs = action.payload;
      })
      .addCase(fetchUserCVs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(saveCV.fulfilled, (state, action) => {
        state.cvs.push(action.payload);
      })
      .addCase(deleteCV.fulfilled, (state, action) => {
        state.cvs = state.cvs.filter((cv) => cv._id !== action.payload);
      });
  },
});

export default cvSlice.reducer;
