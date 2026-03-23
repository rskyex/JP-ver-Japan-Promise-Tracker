import type { Action, Shock, Promise as PromiseItem } from '@/types/domain';
import { formatDateJa } from '@/lib/normalize';

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
      <div className="absolute left-[18px] top-0 bottom-0 w-px bg-slate-200" />
      <div className="space-y-5">
        {sorted.map((event, idx) => (
          <TimelineItem key={idx} event={event} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ event }: { event: TimelineEvent }) {
  const config = {
    promise: {
      dotClass: 'bg-slate-900',
      label: '公',
      bgClass: 'bg-slate-50 border-slate-200/80',
      datePrefix: '選挙公約',
      dateColor: 'text-slate-500',
    },
    action: {
      dotClass: 'bg-emerald-600',
      label: '行',
      bgClass: 'bg-emerald-50/50 border-emerald-200/60',
      datePrefix: event.type === 'action' ? event.item.actionType : '',
      dateColor: 'text-emerald-600',
    },
    shock: {
      dotClass: 'bg-amber-500',
      label: '⚡',
      bgClass: 'bg-amber-50/50 border-amber-200/60',
      datePrefix: '外部ショック',
      dateColor: 'text-amber-600',
    },
  }[event.type];

  const item = event.item;

  return (
    <div className="relative pl-12">
      <div className={`absolute left-2 w-[22px] h-[22px] rounded-full ${config.dotClass} border-[3px] border-white shadow-sm flex items-center justify-center`}>
        <span className="text-white text-[9px] font-bold">{config.label}</span>
      </div>
      <div className={`rounded-xl p-4 border ${config.bgClass}`}>
        <div className={`text-xs font-medium mb-1.5 ${config.dateColor}`}>
          {formatDateJa(event.date)} · {config.datePrefix}
        </div>
        <div className="text-sm font-semibold text-slate-800">
          {'title' in item ? item.title : ''}
        </div>
        {'summaryJa' in item && item.summaryJa && (
          <div className="text-xs text-slate-500 mt-1 leading-relaxed">{item.summaryJa}</div>
        )}
        {'explanationJa' in item && (
          <div className="text-xs text-slate-500 mt-1 leading-relaxed">
            {item.explanationJa.slice(0, 100)}...
          </div>
        )}
        {'isCuratedExcerpt' in item && item.isCuratedExcerpt && (
          <span className="text-[10px] text-slate-400 mt-1 inline-block bg-slate-100 rounded-md px-1.5 py-0.5">整理要約</span>
        )}
      </div>
    </div>
  );
}
