import Link from 'next/link';
import Image from 'next/image';
import type { Politician, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import { scoreBarColor } from '@/lib/labels';
import { chamberShort } from '@/lib/normalize';
import { ArrowUpRight } from 'lucide-react';

interface PoliticianCardProps {
  politician: Politician;
  party: Party | undefined;
  score: ScoreResult | undefined;
}

export default function PoliticianCard({ politician, party, score }: PoliticianCardProps) {
  const barColor = score ? scoreBarColor(score.overallScore) : 'bg-slate-300';

  return (
    <Link
      href={`/politicians/${politician.id}`}
      className="group block bg-white rounded-xl border border-slate-200/80 hover:shadow-md hover:border-slate-300 transition-all duration-200"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3.5 mb-4">
          <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
            <Image
              src={politician.profileImage || '/placeholder-profile.png'}
              alt={politician.nameJa}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{politician.nameJa}</h3>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors flex-shrink-0" />
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">{politician.nameKana}</p>
          </div>
        </div>

        {/* Metadata row */}
        <div className="flex items-center gap-1.5 mb-3">
          {party && (
            <span
              className="text-[10px] font-semibold px-2 py-0.5 rounded-md text-white"
              style={{ backgroundColor: party.colorToken }}
            >
              {party.abbreviation}
            </span>
          )}
          <span className="text-[10px] text-slate-500 bg-slate-100 rounded-md px-1.5 py-0.5 font-medium">
            {chamberShort(politician.chamber)}
          </span>
          <span className="text-[10px] text-slate-400">{politician.termsServed}期</span>
          <span className="text-[10px] text-slate-400 truncate">{politician.district}</span>
        </div>

        {/* Issue tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {politician.issueTags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] bg-slate-50 text-slate-500 border border-slate-200 rounded-md px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        {/* Score */}
        {score && (
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-slate-400 font-medium">総合整合スコア</span>
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                {score.overallScore}
                <span className="text-[10px] font-normal text-slate-400 ml-0.5">/100</span>
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2.5">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${score.overallScore}%` }}
              />
            </div>
            <AlignmentBadge label={score.alignmentLabel} />
          </div>
        )}
      </div>
    </Link>
  );
}
