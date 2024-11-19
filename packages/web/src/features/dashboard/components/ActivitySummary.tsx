//fit-trckr/packages/web/src/features/dashboard/components/ProgressChart.tsx

import React from 'react';
import { Card } from '@/components/ui/Card';
import type { ActivitySummary as ActivitySummaryType } from '@/types/dashboard';

interface Props {
  data: ActivitySummaryType;
}

export const ActivitySummary: React.FC<Props> = ({ data }) => {
  const stats = [
    { label: 'Total Workouts', value: data.totalWorkouts },
    { label: 'Current Streak', value: `${data.currentStreak} days` },
    { label: 'Total Minutes', value: data.totalMinutes },
    { label: 'Calories Burned', value: `${data.caloriesBurned} kcal` },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-6">
          <div className="text-sm font-medium text-gray-500">{stat.label}</div>
          <div className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</div>
        </Card>
      ))}
    </div>
  );
};
