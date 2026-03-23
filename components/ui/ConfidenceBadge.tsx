import { confidenceLabelColor } from '@/lib/labels';
import type { ConfidenceLabel } from '@/types/domain';

interface ConfidenceBadgeProps {
  label: ConfidenceLabel;
}

export default function ConfidenceBadge({ label }: ConfidenceBadgeProps) {
  const colors = confidenceLabelColor(label);
  return (
    <span className={`inline-block text-[11px] font-medium px-2.5 py-1 rounded-md ${colors.bg} ${colors.text}`}>
      信頼度：{label}
    </span>
  );
}
