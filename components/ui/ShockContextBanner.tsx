import type { Shock } from '@/types/domain';
import { shockSeverityJa } from '@/lib/shocks';
import { formatDateJa } from '@/lib/normalize';
import { AlertTriangle } from 'lucide-react';

interface ShockContextBannerProps {
  shocks: Shock[];
}

const SHOCK_CATEGORY_ICONS: Record<string, string> = {
  '戦争・安全保障危機': '🛡',
  '金融危機': '📉',
  'インフレ': '💹',
  'パンデミック': '🦠',
  '自然災害': '🌊',
  'エネルギー危機': '⚡',
  '政治危機': '🏛',
};

export default function ShockContextBanner({ shocks }: ShockContextBannerProps) {
  if (shocks.length === 0) return null;

  return (
    <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-5 mb-8">
      <h4 className="text-sm font-semibold text-amber-800 mb-2 flex items-center gap-2">
        <AlertTriangle className="w-4 h-4" />
        外部ショック文脈
      </h4>
      <p className="text-xs text-amber-700/80 mb-4">
        以下の危機・外部ショックが関連する政策分野に影響を与えた可能性があります。
        ショックは自動的に公約のずれを免責するものではありません。
      </p>
      <div className="space-y-3">
        {shocks.map((shock) => (
          <div key={shock.id} className="bg-white rounded-xl border border-amber-100 p-4">
            <div className="flex items-start gap-3">
              <span className="text-base flex-shrink-0 mt-0.5">
                {SHOCK_CATEGORY_ICONS[shock.category] || '⚠'}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <h5 className="text-sm font-semibold text-slate-800">{shock.title}</h5>
                  <span className="text-[10px] text-amber-700 bg-amber-100/60 rounded-md px-2 py-0.5 font-medium">
                    {shockSeverityJa(shock.severity)}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mb-1.5">
                  {formatDateJa(shock.startDate)}
                  {shock.endDate ? ` 〜 ${formatDateJa(shock.endDate)}` : ' 〜 現在'}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">{shock.explanationJa}</p>
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {shock.affectedIssueAreas.map((area) => (
                    <span key={area} className="text-[10px] bg-slate-50 text-slate-500 border border-slate-200 rounded-md px-2 py-0.5">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
