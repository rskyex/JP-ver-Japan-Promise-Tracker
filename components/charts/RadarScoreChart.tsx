'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import type { IssueArea } from '@/types/domain';

interface RadarScoreChartProps {
  issueAreaScores: Partial<Record<IssueArea, number>>;
}

export default function RadarScoreChart({ issueAreaScores }: RadarScoreChartProps) {
  const data = Object.entries(issueAreaScores).map(([area, score]) => ({
    subject: area,
    score: score ?? 0,
    fullMark: 100,
  }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        データが不足しています
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart data={data}>
        <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
        <PolarAngleAxis
          dataKey="subject"
          tick={{ fontSize: 10, fill: '#94a3b8' }}
        />
        <Radar
          name="整合スコア"
          dataKey="score"
          stroke="#1e3a8a"
          fill="#1e3a8a"
          fillOpacity={0.12}
          strokeWidth={2}
        />
        <Tooltip
          formatter={(value) => [`${value}点`, '整合スコア']}
          contentStyle={{
            fontSize: 12,
            borderRadius: 8,
            border: '1px solid #e2e8f0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            padding: '8px 12px',
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
