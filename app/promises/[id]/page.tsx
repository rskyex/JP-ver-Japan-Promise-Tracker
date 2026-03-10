import { notFound } from 'next/navigation';
import Link from 'next/link';
import { demoRepository } from '@/lib/repositories/demoRepository';
import { getRelevantShocks } from '@/lib/shocks';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import { AlignmentBadge } from '@/components/ui/ScoreBadge';
import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import EvidenceCard from '@/components/ui/EvidenceCard';
import ShockContextBanner from '@/components/ui/ShockContextBanner';
import SourceLinkCard from '@/components/ui/SourceLinkCard';
import { salienceJa, formatDateJa } from '@/lib/normalize';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const promises = await demoRepository.getAllPromises();
  return promises.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const promise = await demoRepository.getPromiseById(id);
  if (!promise) return { title: '公約が見つかりません' };
  return {
    title: `${promise.title} | Japan Promise Tracker`,
    description: promise.summaryJa,
  };
}

export default async function PromiseDetailPage({ params }: PageProps) {
  const { id } = await params;

  const promise = await demoRepository.getPromiseById(id);
  if (!promise) notFound();

  const [politician, matches, relatedActions, shocks] = await Promise.all([
    demoRepository.getPoliticianById(promise.politicianId),
    demoRepository.getMatchesByPromiseId(id),
    demoRepository.getActionsByPromiseId(id),
    demoRepository.getAllShocks(),
  ]);

  const relevantShocks = getRelevantShocks(shocks, [promise.issueArea]);
  const actionMap = Object.fromEntries(relatedActions.map((a) => [a.id, a]));

  // Primary match (highest weight)
  const primaryMatch = [...matches].sort((a, b) => b.scoreWeight - a.scoreWeight)[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back links */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Link href="/politicians" className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          議員一覧
        </Link>
        {politician && (
          <Link href={`/politicians/${politician.id}`} className="text-sm text-blue-700 hover:underline inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {politician.nameJa}の詳細
          </Link>
        )}
      </div>

      <DisclaimerBanner />

      {/* Promise header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
            {promise.issueArea}
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5">
            {salienceJa(promise.salience)}
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5">
            {promise.electionYear}年選挙
          </span>
          <span className="text-xs bg-slate-100 text-slate-600 rounded px-2 py-0.5">
            {promise.promiseType}
          </span>
          {promise.isCuratedDemoText && (
            <span className="text-xs bg-amber-50 text-amber-700 border border-amber-100 rounded px-2 py-0.5">
              デモ要約
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">{promise.title}</h1>

        {politician && (
          <p className="text-sm text-slate-500 mb-4">
            議員：
            <Link href={`/politicians/${politician.id}`} className="text-blue-700 hover:underline">
              {politician.nameJa}
            </Link>
          </p>
        )}

        {/* Alignment badge */}
        {primaryMatch && (
          <div className="flex flex-wrap gap-2 mb-4">
            <AlignmentBadge label={primaryMatch.relation} />
            <ConfidenceBadge label={primaryMatch.confidence} />
          </div>
        )}

        {/* Original text */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">元の公約文</h3>
          <div className="bg-slate-50 rounded-lg p-4 border-l-4 border-slate-300">
            <p className="text-xs text-amber-700 mb-2">
              ※ 整理要約・デモ要約（逐語引用ではありません）
            </p>
            <p className="text-sm text-slate-800 leading-relaxed">{promise.rawTextJa}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-slate-700 mb-2">日本語要約</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{promise.summaryJa}</p>
        </div>

        {/* Rationale */}
        {primaryMatch && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">整合判定理由</h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-slate-700 leading-relaxed">{primaryMatch.rationaleJa}</p>
            </div>
          </div>
        )}

        {/* Source */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 mb-2">出典</h3>
          <SourceLinkCard
            label={promise.sourceLabel}
            url={promise.sourceUrl}
            isCurated={promise.isCuratedDemoText}
            curatedNote="整理要約・デモ参照（原文は原典でご確認ください）"
          />
        </div>
      </div>

      {/* Shock context */}
      {relevantShocks.length > 0 && (
        <ShockContextBanner shocks={relevantShocks} />
      )}

      {/* Related actions / evidence */}
      {matches.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">関連する国会行動</h2>
          <p className="text-xs text-slate-500 mb-4">
            ※ 以下はデモ用整理要約です。原文は国会会議録等でご確認ください。
          </p>
          <div className="space-y-4">
            {matches.map((match) => {
              const action = actionMap[match.actionId];
              if (!action) return null;
              return <EvidenceCard key={match.id} match={match} action={action} />;
            })}
          </div>
        </section>
      )}

      {/* All related actions (even without match) */}
      {relatedActions.length > matches.length && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-slate-900 mb-4">関連行動（詳細）</h2>
          <div className="space-y-3">
            {relatedActions.map((action) => (
              <div key={action.id} className="bg-white rounded border border-slate-200 p-3">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <span className="text-xs font-medium text-slate-500">{action.actionType}</span>
                  <span className="text-xs text-slate-400">{formatDateJa(action.date)}</span>
                </div>
                <p className="text-sm font-semibold text-slate-800 mb-1">{action.title}</p>
                <p className="text-xs text-slate-600">{action.summaryJa}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
