import type { Match, Action } from '@/types/domain';
import { AlignmentBadge } from './ScoreBadge';
import ConfidenceBadge from './ConfidenceBadge';
import { formatDateJa } from '@/lib/normalize';
import { Link2 } from 'lucide-react';

interface EvidenceCardProps {
  match: Match;
  action: Action;
}

export default function EvidenceCard({ match, action }: EvidenceCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-4 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-medium text-slate-500 bg-slate-100 rounded-md px-2.5 py-1">
            {action.actionType}
          </span>
          <span className="text-xs text-slate-400">{formatDateJa(action.date)}</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <AlignmentBadge label={match.relation} />
          <ConfidenceBadge label={match.confidence} />
        </div>
      </div>

      {/* Action title */}
      <h4 className="text-sm font-semibold text-slate-900">{action.title}</h4>

      {/* Excerpt */}
      <div className="bg-slate-50 rounded-lg p-4 border-l-2 border-slate-200">
        <p className="text-[11px] text-slate-400 mb-1.5 font-medium uppercase tracking-wider">整理要約</p>
        <p className="text-sm text-slate-600 leading-relaxed">{action.excerptJa}</p>
      </div>

      {/* Rationale */}
      <div>
        <p className="text-[11px] text-slate-400 mb-1 font-medium uppercase tracking-wider">判定理由</p>
        <p className="text-sm text-slate-600 leading-relaxed">{match.rationaleJa}</p>
      </div>

      {/* Source */}
      {action.sourceLabel && (
        <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 border-t border-slate-100">
          <Link2 className="w-3.5 h-3.5 flex-shrink-0" />
          <span>
            {action.sourceUrl ? (
              <a href={action.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-700 transition-colors">
                {action.sourceLabel}
              </a>
            ) : (
              action.sourceLabel
            )}
          </span>
          {action.isCuratedExcerpt && (
            <span className="text-slate-400 bg-slate-50 rounded-md px-1.5 py-0.5 text-[10px]">整理要約</span>
          )}
        </div>
      )}

      {/* Institution context */}
      {action.institutionContext && (
        <p className="text-xs text-slate-400">
          場：{action.institutionContext}
        </p>
      )}
    </div>
  );
}
