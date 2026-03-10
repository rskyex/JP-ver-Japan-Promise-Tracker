import type { Action, Shock, Promise as PromiseItem } from '@/types/domain';
import { formatDateJa } from '@/lib/normalize';
import { shockCategoryIcon } from '@/lib/shocks';

type TimelineEvent =
  | { type: 'promise'; item: PromiseItem; date: string }
  | { type: 'action'; item: Action; date: string }
  | { type: 'shock'; item: Shock; date: string };

interface TimelineProps {
  events: TimelineEvent[];
}

export default function Timeline({ events }: TimelineProps) {
  const sorted = [...events].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
      <div className="space-y-4">
        {sorted.map((event, idx) => (
          <TimelineItem key={idx} event={event} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  if (event.type === 'promise') {
    return (
      <div className="relative pl-10">
        <div className="absolute left-2 w-5 h-5 rounded-full bg-blue-600 border-2 border-white shadow flex items-center justify-center">
          <span className="text-white text-xs font-bold">公</span>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
          <div className="text-xs text-blue-600 font-medium mb-1">{formatDateJa(event.date)}（選挙公約）</div>
          <div className="text-sm font-semibold text-slate-800">{event.item.title}</div>
          <div className="text-xs text-slate-600 mt-1">{event.item.summaryJa}</div>
        </div>
      </div>
    );
  }

  if (event.type === 'action') {
    return (
      <div className="relative pl-10">
        <div className="absolute left-2 w-5 h-5 rounded-full bg-emerald-600 border-2 border-white shadow flex items-center justify-center">
          <span className="text-white text-xs font-bold">行</span>
        </div>
        <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
          <div className="text-xs text-emerald-600 font-medium mb-1">
            {formatDateJa(event.date)} · {event.item.actionType}
          </div>
          <div className="text-sm font-semibold text-slate-800">{event.item.title}</div>
          <div className="text-xs text-slate-600 mt-1">{event.item.summaryJa}</div>
          {event.item.isCuratedExcerpt && (
            <span className="text-xs text-amber-700 mt-1 inline-block bg-amber-50 rounded px-1">整理要約</span>
          )}
        </div>
      </div>
    );
  }

  if (event.type === 'shock') {
    return (
      <div className="relative pl-10">
        <div className="absolute left-2 w-5 h-5 rounded-full bg-orange-500 border-2 border-white shadow flex items-center justify-center">
          <span className="text-xs">{shockCategoryIcon(event.item.category)}</span>
        </div>
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
          <div className="text-xs text-orange-600 font-medium mb-1">
            {formatDateJa(event.date)} · 外部ショック
          </div>
          <div className="text-sm font-semibold text-slate-800">{event.item.title}</div>
          <div className="text-xs text-slate-600 mt-1">{event.item.explanationJa.slice(0, 100)}...</div>
        </div>
      </div>
    );
  }

  return null;
}
