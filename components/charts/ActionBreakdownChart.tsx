'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { Action } from '@/types/domain';

interface ActionBreakdownChartProps {
  actions: Action[];
}

export default function ActionBreakdownChart({ actions }: ActionBreakdownChartProps) {
  const counts: Record<string, number> = {};
  for (const action of actions) {
    counts[action.actionType] = (counts[action.actionType] || 0) + 1;
  }

  const data = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([type, count]) => ({ type, count }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        行動データがありません
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis type="number" tick={{ fontSize: 11 }} />
        <YAxis
          type="category"
          dataKey="type"
          tick={{ fontSize: 11 }}
          width={90}
        />
        <Tooltip
          formatter={(value) => [`${value}件`, '件数']}
          contentStyle={{ fontSize: 12 }}
        />
        <Bar dataKey="count" fill="#1e40af" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
