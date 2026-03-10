import { confidenceLabelColor } from '@/lib/labels';
import type { ConfidenceLabel } from '@/types/domain';

interface ConfidenceBadgeProps {
  label: ConfidenceLabel;
}

export default function ConfidenceBadge({ label }: ConfidenceBadgeProps) {
  const colors = confidenceLabelColor(label);
  return (
    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${colors.bg} ${colors.text}`}>
      信頼度：{label}
    </span>
  );
}
