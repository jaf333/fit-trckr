//fit-trckr/packages/web/src/features/dashboard/dashboardSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiClient as api } from '../../services/api/client';
import type { DashboardState } from '../../types/dashboard';

const initialState: DashboardState = {
  activitySummary: null,
  progressData: [],
  recentWorkouts: [],
  loading: false,
  error: null,
};

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const [summaryResponse, progressResponse, workoutsResponse] = await Promise.all([
        api.get('/dashboard/summary'),
        api.get('/dashboard/progress'),
        api.get('/dashboard/recent-workouts')
      ]);

      return {
        activitySummary: summaryResponse.data,
        progressData: progressResponse.data,
        recentWorkouts: workoutsResponse.data,
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch dashboard data');
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    resetDashboard: (state) => {
      state.activitySummary = null;
      state.progressData = [];
      state.recentWorkouts = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.activitySummary = action.payload.activitySummary;
        state.progressData = action.payload.progressData;
        state.recentWorkouts = action.payload.recentWorkouts;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
