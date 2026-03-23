import { ExternalLink } from 'lucide-react';
import { shortenUrl } from '@/lib/normalize';

interface SourceLinkCardProps {
  label: string;
  url?: string;
  isCurated?: boolean;
  curatedNote?: string;
}

export default function SourceLinkCard({ label, url, isCurated, curatedNote }: SourceLinkCardProps) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{label}</p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-slate-600 truncate block mt-1 transition-colors"
            >
              {shortenUrl(url)}
            </a>
          )}
        </div>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-slate-500 flex-shrink-0 transition-colors"
            aria-label="外部サイトへ"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
      </div>
      {isCurated && (
        <p className="text-[11px] text-slate-400 mt-2 bg-slate-50 rounded-md px-2.5 py-1">
          {curatedNote || '整理要約・デモ参照'}
        </p>
      )}
    </div>
  );
}
