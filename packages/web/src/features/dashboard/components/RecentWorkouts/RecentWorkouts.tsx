import React from 'react';
import { Card } from '@/components/ui/Card';
import type { WorkoutSummary } from '@/types/dashboard';

interface Props {
  workouts: WorkoutSummary[];
}

export const RecentWorkouts: React.FC<Props> = ({ workouts }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Workouts</h3>
      <div className="space-y-4">
        {workouts.map((workout, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium text-gray-900">{workout.type}</p>
              <p className="text-sm text-gray-500">{workout.date}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{workout.duration} min</p>
              <p className="text-sm text-gray-500">{workout.caloriesBurned} kcal</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
