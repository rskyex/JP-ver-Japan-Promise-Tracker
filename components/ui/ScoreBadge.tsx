import { scoreBarColor, alignmentLabelColor } from '@/lib/labels';
import type { AlignmentLabel } from '@/types/domain';

interface ScoreBadgeProps {
  score: number;
  label?: AlignmentLabel;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, label, size = 'md' }: ScoreBadgeProps) {
  const barColor = scoreBarColor(score);
  const fontSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className="inline-flex flex-col gap-1.5">
      <div className="flex items-baseline gap-1.5">
        <span className={`font-bold text-slate-900 tracking-tight ${fontSizes[size]}`}>{score}</span>
        <span className="text-xs text-slate-400 font-medium">/ 100</span>
      </div>
      <div className="w-28 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
      {label && <AlignmentBadge label={label} />}
    </div>
  );
}

export function AlignmentBadge({ label }: { label: AlignmentLabel }) {
  const colors = alignmentLabelColor(label);
  return (
    <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-md ${colors.bg} ${colors.text}`}>
      {label}
    </span>
  );
}
