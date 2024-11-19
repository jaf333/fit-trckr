// web/src/pages/dashboard/Dashboard.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store';
import { fetchDashboardData } from '@/features/dashboard/dashboardSlice';
import { ActivitySummary } from '@/features/dashboard/components/ActivitySummary';
import { ProgressChart } from '@/features/dashboard/components/ProgressChart';
import { RecentWorkouts } from '@/features/dashboard/components/RecentWorkouts';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activitySummary, progressData, recentWorkouts, loading, error } = useAppSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!activitySummary) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

      <div className="space-y-8">
        <ActivitySummary data={activitySummary} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ProgressChart data={progressData} />
          <RecentWorkouts workouts={recentWorkouts} />
        </div>
      </div>
    </div>
  );
};
