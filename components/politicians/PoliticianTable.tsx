import Link from 'next/link';
import type { Politician, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import { scoreBarColor } from '@/lib/labels';
import { chamberShort } from '@/lib/normalize';

interface PoliticianTableProps {
  politicians: Politician[];
  parties: Record<string, Party>;
  scores: Record<string, ScoreResult>;
}

export default function PoliticianTable({ politicians, parties, scores }: PoliticianTableProps) {
  if (politicians.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <p className="text-base">該当する議員が見つかりませんでした</p>
        <p className="text-sm mt-2">フィルタ条件を変えてお試しください</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200/80">
      <table className="min-w-full divide-y divide-slate-200 bg-white">
        <thead>
          <tr className="bg-slate-50/80">
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">氏名</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">政党</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">院</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">選挙区</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden lg:table-cell">当選</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider">スコア</th>
            <th className="px-5 py-3.5 text-left text-[11px] font-semibold text-slate-400 uppercase tracking-wider hidden md:table-cell">整合ラベル</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {politicians.map((p) => {
            const party = parties[p.partyId];
            const score = scores[p.id];
            const barColor = score ? scoreBarColor(score.overallScore) : 'bg-slate-200';

            return (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-3.5">
                  <Link href={`/politicians/${p.id}`} className="text-sm font-medium text-slate-900 hover:text-slate-600 transition-colors">
                    {p.nameJa}
                  </Link>
                  <div className="text-[11px] text-slate-400 mt-0.5">{p.nameKana}</div>
                </td>
                <td className="px-5 py-3.5">
                  {party && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-white"
                      style={{ backgroundColor: party.colorToken }}
                    >
                      {party.abbreviation}
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 hidden sm:table-cell">
                  <span className="text-[11px] text-slate-500 bg-slate-100 rounded-md px-1.5 py-0.5 font-medium">
                    {chamberShort(p.chamber)}
                  </span>
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell text-sm text-slate-500">{p.district}</td>
                <td className="px-5 py-3.5 hidden lg:table-cell text-sm text-slate-500">{p.termsServed}期</td>
                <td className="px-5 py-3.5">
                  {score ? (
                    <div>
                      <span className="text-sm font-bold text-slate-900">{score.overallScore}</span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1.5">
                        <div className={`h-full rounded-full transition-all duration-500 ${barColor}`} style={{ width: `${score.overallScore}%` }} />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-300">—</span>
                  )}
                </td>
                <td className="px-5 py-3.5 hidden md:table-cell">
                  {score && <AlignmentBadge label={score.alignmentLabel} />}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
