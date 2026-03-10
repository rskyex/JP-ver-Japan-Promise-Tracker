import type { Shock } from '@/types/domain';
import { shockCategoryIcon, shockSeverityJa } from '@/lib/shocks';
import { formatDateJa } from '@/lib/normalize';

interface ShockContextBannerProps {
  shocks: Shock[];
}

export default function ShockContextBanner({ shocks }: ShockContextBannerProps) {
  if (shocks.length === 0) return null;

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
      <h4 className="text-sm font-semibold text-orange-800 mb-2 flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
        外部ショック文脈
      </h4>
      <p className="text-xs text-orange-700 mb-3">
        以下の危機・外部ショックが関連する政策分野に影響を与えた可能性があります。
        ただし、ショックは自動的に公約のずれを免責するものではありません。
      </p>
      <div className="space-y-3">
        {shocks.map((shock) => (
          <div key={shock.id} className="bg-white rounded border border-orange-100 p-3">
            <div className="flex items-start gap-2">
              <span className="text-lg flex-shrink-0">{shockCategoryIcon(shock.category)}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h5 className="text-sm font-semibold text-slate-800">{shock.title}</h5>
                  <span className="text-xs text-orange-700 bg-orange-100 rounded px-1.5 py-0.5">
                    {shockSeverityJa(shock.severity)}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mb-1">
                  {formatDateJa(shock.startDate)}
                  {shock.endDate ? ` 〜 ${formatDateJa(shock.endDate)}` : ' 〜 現在'}
                </p>
                <p className="text-xs text-slate-700 leading-relaxed">{shock.explanationJa}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {shock.affectedIssueAreas.map((area) => (
                    <span key={area} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 rounded px-1.5 py-0.5">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-orange-600 mt-3 italic">
        ※ このサイトは、外部ショックがあれば公約との差異を自動的に免責するものではありません。
        説明の質・代替案の有無・一時的か恒久的かを含めて評価しています。
      </p>
    </div>
  );
}
