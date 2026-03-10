import Link from 'next/link';
import type { Promise as PromiseItem, Match, Action } from '@/types/domain';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import { salienceJa } from '@/lib/normalize';

interface PromiseCardProps {
  promise: PromiseItem;
  matches: Match[];
  relatedActions: Action[];
  showDetailLink?: boolean;
}

export default function PromiseCard({
  promise,
  matches,
  relatedActions,
  showDetailLink = true,
}: PromiseCardProps) {
  // 最もスコアの高いマッチ
  const primaryMatch = matches[0];

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div className="flex flex-wrap gap-1">
          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
            {promise.issueArea}
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5">
            {salienceJa(promise.salience)}
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5">
            {promise.electionYear}年選挙
          </span>
        </div>
        {primaryMatch && (
          <div className="flex gap-1">
            <AlignmentBadge label={primaryMatch.relation} />
            <ConfidenceBadge label={primaryMatch.confidence} />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 mb-2">{promise.title}</h3>

      {/* Summary */}
      <p className="text-sm text-slate-700 leading-relaxed mb-3">{promise.summaryJa}</p>

      {/* Evidence count */}
      <div className="text-xs text-slate-500 mb-3">
        関連する国会行動: {relatedActions.length}件
        {promise.isCuratedDemoText && (
          <span className="ml-2 text-amber-700 bg-amber-50 rounded px-1">デモ要約</span>
        )}
      </div>

      {/* Rationale */}
      {primaryMatch && (
        <div className="bg-slate-50 rounded p-3 text-sm text-slate-700 leading-relaxed mb-3">
          <span className="text-xs font-medium text-slate-500 block mb-1">判定理由（デモ要約）</span>
          {primaryMatch.rationaleJa}
        </div>
      )}

      {/* Source */}
      <div className="text-xs text-slate-500 flex items-center gap-1">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        {promise.sourceLabel}
      </div>

      {/* Detail link */}
      {showDetailLink && (
        <div className="mt-4">
          <Link
            href={`/promises/${promise.id}`}
            className="text-xs text-blue-700 hover:text-blue-900 font-medium hover:underline"
          >
            詳細を見る →
          </Link>
        </div>
      )}
    </div>
  );
}
