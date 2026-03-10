import type { Match, Action } from '@/types/domain';
import { AlignmentBadge } from './ScoreBadge';
import ConfidenceBadge from './ConfidenceBadge';
import { formatDateJa } from '@/lib/normalize';

interface EvidenceCardProps {
  match: Match;
  action: Action;
}

export default function EvidenceCard({ match, action }: EvidenceCardProps) {
  return (
    <div className="border border-slate-200 rounded-lg bg-white p-4 space-y-3">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span className="text-xs font-medium text-slate-500 bg-slate-100 rounded px-2 py-0.5 mr-2">
            {action.actionType}
          </span>
          <span className="text-xs text-slate-500">{formatDateJa(action.date)}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          <AlignmentBadge label={match.relation} />
          <ConfidenceBadge label={match.confidence} />
        </div>
      </div>

      {/* Action title */}
      <h4 className="text-sm font-semibold text-slate-800">{action.title}</h4>

      {/* Excerpt */}
      <div className="bg-slate-50 rounded p-3 border-l-2 border-slate-300">
        <p className="text-xs text-slate-500 mb-1">整理要約・デモ要約</p>
        <p className="text-sm text-slate-700 leading-relaxed">{action.excerptJa}</p>
      </div>

      {/* Rationale */}
      <div>
        <p className="text-xs font-medium text-slate-600 mb-1">判定理由</p>
        <p className="text-sm text-slate-700 leading-relaxed">{match.rationaleJa}</p>
      </div>

      {/* Source */}
      {action.sourceLabel && (
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          <span>
            {action.sourceUrl ? (
              <a href={action.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {action.sourceLabel}
              </a>
            ) : (
              action.sourceLabel
            )}
          </span>
          {action.isCuratedExcerpt && (
            <span className="text-amber-700 bg-amber-50 rounded px-1">整理要約</span>
          )}
        </div>
      )}

      {/* Institution context */}
      {action.institutionContext && (
        <p className="text-xs text-slate-500">
          場：{action.institutionContext}
        </p>
      )}
    </div>
  );
}
