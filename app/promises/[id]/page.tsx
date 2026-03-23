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
import { ChevronLeft } from 'lucide-react';

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
  const primaryMatch = [...matches].sort((a, b) => b.scoreWeight - a.scoreWeight)[0];

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      {/* Back links */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Link href="/politicians" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors">
          <ChevronLeft className="w-4 h-4" />
          議員一覧
        </Link>
        {politician && (
          <Link href={`/politicians/${politician.id}`} className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {politician.nameJa}の詳細
          </Link>
        )}
      </div>

      <DisclaimerBanner />

      {/* Promise header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 mb-8">
        <div className="flex flex-wrap gap-1.5 mb-5">
          <span className="text-[10px] font-medium bg-slate-900 text-white rounded-md px-2.5 py-1">
            {promise.issueArea}
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1">
            {salienceJa(promise.salience)}
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1">
            {promise.electionYear}年選挙
          </span>
          <span className="text-[10px] font-medium bg-slate-100 text-slate-500 rounded-md px-2.5 py-1">
            {promise.promiseType}
          </span>
          {promise.isCuratedDemoText && (
            <span className="text-[10px] font-medium bg-slate-50 text-slate-400 rounded-md px-2.5 py-1">
              デモ要約
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-3">{promise.title}</h1>

        {politician && (
          <p className="text-sm text-slate-500 mb-5">
            議員：
            <Link href={`/politicians/${politician.id}`} className="text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors">
              {politician.nameJa}
            </Link>
          </p>
        )}

        {primaryMatch && (
          <div className="flex flex-wrap gap-1.5 mb-6">
            <AlignmentBadge label={primaryMatch.relation} />
            <ConfidenceBadge label={primaryMatch.confidence} />
          </div>
        )}

        {/* Original text */}
        <div className="mb-6">
          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">元の公約文</h3>
          <div className="bg-slate-50 rounded-xl p-5 border-l-2 border-slate-200">
            <p className="text-[10px] text-slate-400 mb-2">整理要約・デモ要約（逐語引用ではありません）</p>
            <p className="text-sm text-slate-700 leading-relaxed">{promise.rawTextJa}</p>
          </div>
        </div>

        {/* Summary */}
        <div className="mb-6">
          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">日本語要約</h3>
          <p className="text-sm text-slate-600 leading-relaxed">{promise.summaryJa}</p>
        </div>

        {/* Rationale */}
        {primaryMatch && (
          <div className="mb-6">
            <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">整合判定理由</h3>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/60">
              <p className="text-sm text-slate-600 leading-relaxed">{primaryMatch.rationaleJa}</p>
            </div>
          </div>
        )}

        {/* Source */}
        <div>
          <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-3">出典</h3>
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
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">関連する国会行動</h2>
          <p className="text-xs text-slate-400 mb-6">
            以下はデモ用整理要約です。原文は国会会議録等でご確認ください。
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
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">関連行動（詳細）</h2>
          <div className="space-y-3">
            {relatedActions.map((action) => (
              <div key={action.id} className="bg-white rounded-xl border border-slate-200/80 p-4 hover:shadow-md transition-shadow duration-200">
                <div className="flex justify-between items-start gap-2 mb-1.5">
                  <span className="text-[11px] font-medium text-slate-500 bg-slate-100 rounded-md px-2.5 py-1">{action.actionType}</span>
                  <span className="text-xs text-slate-400">{formatDateJa(action.date)}</span>
                </div>
                <p className="text-sm font-semibold text-slate-900 mb-1">{action.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{action.summaryJa}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
