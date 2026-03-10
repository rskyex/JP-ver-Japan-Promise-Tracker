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
import type { Party } from '@/types/domain';

interface PartyDistributionChartProps {
  partyScores: Record<string, number>;
  parties: Party[];
}

export default function PartyDistributionChart({
  partyScores,
  parties,
}: PartyDistributionChartProps) {
  const partyMap = Object.fromEntries(parties.map((p) => [p.id, p]));

  const data = Object.entries(partyScores)
    .map(([partyId, score]) => ({
      name: partyMap[partyId]?.abbreviation || partyId,
      score,
      color: partyMap[partyId]?.colorToken || '#64748b',
    }))
    .sort((a, b) => b.score - a.score);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-slate-400 text-sm">
        データがありません
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="name" tick={{ fontSize: 12 }} />
        <YAxis domain={[0, 100]} tick={{ fontSize: 11 }} />
        <Tooltip
          formatter={(value) => [`${value}点`, '平均整合スコア']}
          contentStyle={{ fontSize: 12 }}
        />
        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
