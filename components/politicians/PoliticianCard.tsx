import Link from 'next/link';
import Image from 'next/image';
import type { Politician, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import { scoreBarColor } from '@/lib/labels';
import { chamberShort } from '@/lib/normalize';

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
      className="block bg-white rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
            <Image
              src={politician.profileImage || '/placeholder-profile.png'}
              alt={politician.nameJa}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-slate-900 truncate">{politician.nameJa}</h3>
            <p className="text-xs text-slate-500">{politician.nameKana}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {party && (
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded text-white"
                  style={{ backgroundColor: party.colorToken }}
                >
                  {party.abbreviation}
                </span>
              )}
              <span className="text-xs text-slate-600 bg-slate-100 rounded px-1.5 py-0.5">
                {chamberShort(politician.chamber)}
              </span>
              <span className="text-xs text-slate-500">{politician.termsServed}期</span>
            </div>
          </div>
        </div>

        {/* District */}
        <p className="text-xs text-slate-500 mb-3">{politician.district}</p>

        {/* Issue tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {politician.issueTags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-blue-50 text-blue-700 rounded px-2 py-0.5 border border-blue-100">
              {tag}
            </span>
          ))}
        </div>

        {/* Score */}
        {score && (
          <div className="border-t border-slate-100 pt-3">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-slate-500">総合整合スコア</span>
              <span className="text-sm font-bold text-slate-900">{score.overallScore}<span className="text-xs font-normal text-slate-400">/100</span></span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div className={`h-full rounded-full ${barColor}`} style={{ width: `${score.overallScore}%` }} />
            </div>
            <AlignmentBadge label={score.alignmentLabel} />
          </div>
        )}
      </div>
    </Link>
  );
}
