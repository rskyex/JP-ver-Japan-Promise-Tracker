'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { AlignmentLabel } from '@/types/domain';
import { ALIGNMENT_LABELS } from '@/lib/labels';

const LABEL_COLORS: Record<AlignmentLabel, string> = {
  '強く整合': '#059669',
  '概ね整合': '#22c55e',
  '一部整合': '#84cc16',
  '証拠が混在': '#eab308',
  '弱い整合': '#f97316',
  '矛盾する証拠あり': '#ef4444',
  '証拠不十分': '#94a3b8',
};

interface AlignmentDistributionChartProps {
  distribution: Record<AlignmentLabel, number>;
}

export default function AlignmentDistributionChart({ distribution }: AlignmentDistributionChartProps) {
  const data = ALIGNMENT_LABELS.map((label) => ({
    label: label.length > 8 ? label.slice(0, 6) + '…' : label,
    fullLabel: label,
    count: distribution[label] || 0,
    color: LABEL_COLORS[label],
  })).filter((d) => d.count > 0);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        データがありません
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data} margin={{ top: 8, right: 8, left: -12, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
        <XAxis
          dataKey="label"
          tick={{ fontSize: 10, fill: '#94a3b8' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: '#94a3b8' }}
          allowDecimals={false}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value, _name, props) => [
            `${value}人`,
            (props as { payload?: { fullLabel?: string } }).payload?.fullLabel || '整合分布',
          ]}
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: '8px 12px',
          }}
          cursor={{ fill: 'rgba(0,0,0,0.02)' }}
        />
        <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={48}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
