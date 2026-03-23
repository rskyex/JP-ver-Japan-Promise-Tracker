import Link from 'next/link';
import type { Promise as PromiseItem, Match, Action } from '@/types/domain';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import { salienceJa } from '@/lib/normalize';
import { Link2, ChevronRight } from 'lucide-react';

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
  const primaryMatch = matches[0];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] font-medium bg-slate-900 text-white rounded-md px-2.5 py-1">
            {promise.issueArea}
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1">
            {salienceJa(promise.salience)}
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1">
            {promise.electionYear}年選挙
          </span>
        </div>
        {primaryMatch && (
          <div className="flex gap-1.5">
            <AlignmentBadge label={primaryMatch.relation} />
            <ConfidenceBadge label={primaryMatch.confidence} />
          </div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base font-semibold text-slate-900 mb-2">{promise.title}</h3>

      {/* Summary */}
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{promise.summaryJa}</p>

      {/* Evidence count */}
      <div className="text-xs text-slate-400 mb-4">
        関連する国会行動: {relatedActions.length}件
        {promise.isCuratedDemoText && (
          <span className="ml-2 text-slate-400 bg-slate-50 rounded-md px-1.5 py-0.5 text-[10px]">デモ要約</span>
        )}
      </div>

      {/* Rationale */}
      {primaryMatch && (
        <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 leading-relaxed mb-4">
          <span className="text-[11px] font-medium text-slate-400 block mb-1.5 uppercase tracking-wider">判定理由</span>
          {primaryMatch.rationaleJa}
        </div>
      )}

      {/* Source */}
      <div className="text-xs text-slate-400 flex items-center gap-1.5">
        <Link2 className="w-3.5 h-3.5 flex-shrink-0" />
        {promise.sourceLabel}
      </div>

      {/* Detail link */}
      {showDetailLink && (
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            href={`/promises/${promise.id}`}
            className="text-xs text-slate-500 hover:text-slate-900 font-medium inline-flex items-center gap-1 transition-colors"
          >
            詳細を見る
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
