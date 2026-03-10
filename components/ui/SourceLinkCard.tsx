import { shortenUrl } from '@/lib/normalize';

interface SourceLinkCardProps {
  label: string;
  url?: string;
  isCurated?: boolean;
  curatedNote?: string;
}

export default function SourceLinkCard({ label, url, isCurated, curatedNote }: SourceLinkCardProps) {
  return (
    <div className="border border-slate-200 rounded-md p-3 bg-slate-50">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{label}</p>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:underline truncate block"
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
            className="text-xs text-slate-500 hover:text-blue-600 flex-shrink-0"
            aria-label="外部サイトへ"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
      </div>
      {isCurated && (
        <p className="text-xs text-amber-700 mt-1 bg-amber-50 rounded px-2 py-0.5">
          {curatedNote || '整理要約・デモ参照'}
        </p>
      )}
    </div>
  );
}
