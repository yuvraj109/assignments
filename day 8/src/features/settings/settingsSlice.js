
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSettings, updateSettings } from '../../utils/fakeApi';

export const loadSettings = createAsyncThunk('settings/loadSettings', async () => {
  return await fetchSettings();
});

export const saveSettings = createAsyncThunk('settings/saveSettings', async (settingsData) => {
  return await updateSettings(settingsData);
});

const initialState = {
  companyName: 'Omniful Logistics',
  address: '',
  contact: '',
  email: '',
  status: 'idle',
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSettings.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadSettings.fulfilled, (state, action) => {
        state.status = 'succeeded';
        Object.assign(state, action.payload);
      })
      .addCase(loadSettings.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
      });
  },
});

export default settingsSlice.reducer;
