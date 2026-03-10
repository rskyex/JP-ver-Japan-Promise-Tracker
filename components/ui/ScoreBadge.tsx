import { scoreBarColor, alignmentLabelColor } from '@/lib/labels';
import type { AlignmentLabel } from '@/types/domain';

interface ScoreBadgeProps {
  score: number;
  label?: AlignmentLabel;
  size?: 'sm' | 'md' | 'lg';
}

export default function ScoreBadge({ score, label, size = 'md' }: ScoreBadgeProps) {
  const barColor = scoreBarColor(score);
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <div className={`inline-flex flex-col gap-1 ${sizeClasses[size]}`}>
      <div className="flex items-center gap-2">
        <span className="font-bold text-slate-900">{score}</span>
        <span className="text-xs text-slate-500">/ 100</span>
      </div>
      <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
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
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${colors.bg} ${colors.text} ${colors.border}`}>
      {label}
    </span>
  );
}
