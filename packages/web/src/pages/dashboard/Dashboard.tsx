// src/pages/dashboard/Dashboard.tsx
import React from 'react';
import { Card } from '@/components/ui';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white shadow">
          <h2 className="text-lg font-medium text-gray-900">Recent Workouts</h2>
          <p className="mt-1 text-gray-500">Coming soon...</p>
        </Card>
        <Card className="bg-white shadow">
          <h2 className="text-lg font-medium text-gray-900">Progress</h2>
          <p className="mt-1 text-gray-500">Coming soon...</p>
        </Card>
        <Card className="bg-white shadow">
          <h2 className="text-lg font-medium text-gray-900">Goals</h2>
          <p className="mt-1 text-gray-500">Coming soon...</p>
        </Card>
      </div>
    </div>
  );
};
