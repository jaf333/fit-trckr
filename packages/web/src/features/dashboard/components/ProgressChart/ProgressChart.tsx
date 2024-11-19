//fit-trckr/packages/web/src/pages/dashboard/Dashboard.tsx

import React from 'react';
import { Card } from '@/components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ProgressData } from '@/types/dashboard';

interface Props {
  data: ProgressData[];
}

export const ProgressChart: React.FC<Props> = ({ data }) => {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Weight Progress</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#8884d8"
              name="Current Weight"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#82ca9d"
              name="Target Weight"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
