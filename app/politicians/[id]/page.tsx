import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { demoRepository } from '@/lib/repositories/demoRepository';
import { getRelevantShocks } from '@/lib/shocks';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import ScoreBadge, { AlignmentBadge } from '@/components/ui/ScoreBadge';
import ConfidenceBadge from '@/components/ui/ConfidenceBadge';
import ShockContextBanner from '@/components/ui/ShockContextBanner';
import EvidenceCard from '@/components/ui/EvidenceCard';
import PromiseCard from '@/components/promises/PromiseCard';
import Timeline from '@/components/ui/Timeline';
import RadarScoreChart from '@/components/charts/RadarScoreChart';
import ActionBreakdownChart from '@/components/charts/ActionBreakdownChart';
import { chamberShort } from '@/lib/normalize';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const politicians = await demoRepository.getAllPoliticians();
  return politicians.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const politician = await demoRepository.getPoliticianById(id);
  if (!politician) return { title: '議員が見つかりません' };
  return {
    title: `${politician.nameJa} | Japan Promise Tracker`,
    description: `${politician.nameJa}（${politician.partyId}）の公約整合スコア・詳細`,
  };
}

export default async function PoliticianDetailPage({ params }: PageProps) {
  const { id } = await params;

  const [politician, party, score, promises, actions, matches, shocks] = await Promise.all([
    demoRepository.getPoliticianById(id),
    demoRepository.getPartyById('').then(() => null), // placeholder
    demoRepository.getScoreByPoliticianId(id),
    demoRepository.getPromisesByPoliticianId(id),
    demoRepository.getActionsByPoliticianId(id),
    demoRepository.getMatchesByPoliticianId(id),
    demoRepository.getAllShocks(),
  ]);

  if (!politician) notFound();

  // Get party
  const partyData = await demoRepository.getPartyById(politician.partyId);

  // Get relevant shocks
  const relevantShocks = getRelevantShocks(shocks, politician.issueTags);

  // Build match-action map
  const actionMap = Object.fromEntries(actions.map((a) => [a.id, a]));

  // Build timeline events
  const timelineEvents: Parameters<typeof Timeline>[0]['events'] = [
    ...promises.map((p) => ({
      type: 'promise' as const,
      item: p,
      date: `${p.electionYear}-01-01`,
    })),
    ...actions.map((a) => ({
      type: 'action' as const,
      item: a,
      date: a.date,
    })),
    ...relevantShocks.map((s) => ({
      type: 'shock' as const,
      item: s,
      date: s.startDate,
    })),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Back link */}
      <Link href="/politicians" className="text-sm text-blue-700 hover:underline mb-6 inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        議員一覧へ戻る
      </Link>

      <DisclaimerBanner />

      {/* Politician header */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Photo */}
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex-shrink-0 border-2 border-slate-200">
            <Image
              src={politician.profileImage || '/placeholder-profile.png'}
              alt={politician.nameJa}
              fill
              className="object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 mb-2">
              <h1 className="text-2xl font-bold text-slate-900">{politician.nameJa}</h1>
              {partyData && (
                <span
                  className="text-sm font-medium px-3 py-1 rounded text-white"
                  style={{ backgroundColor: partyData.colorToken }}
                >
                  {partyData.name}
                </span>
              )}
              <span className="text-sm bg-slate-100 text-slate-700 rounded px-2 py-1">
                {chamberShort(politician.chamber)}
              </span>
            </div>
            <p className="text-sm text-slate-500 mb-2">{politician.nameKana} / {politician.nameRomaji}</p>
            <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-3">
              <span>選挙区：{politician.district}</span>
              <span>当選：{politician.termsServed}期</span>
              <span>
                {politician.governmentStatus === '与党' ? (
                  <span className="text-blue-700 font-medium">与党</span>
                ) : (
                  <span className="text-rose-700 font-medium">野党</span>
                )}
              </span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{politician.bio}</p>

            {/* Issue tags */}
            <div className="flex flex-wrap gap-1 mt-3">
              {politician.issueTags.map((tag) => (
                <span key={tag} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>

            {/* Leadership roles */}
            {politician.leadershipRoles.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1">
                {politician.leadershipRoles.map((role) => (
                  <span key={role} className="text-xs bg-amber-50 text-amber-700 border border-amber-100 rounded px-2 py-0.5">
                    {role}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Score Card */}
          {score && (
            <div className="bg-slate-50 rounded-lg p-5 border border-slate-200 min-w-[200px]">
              <h3 className="text-sm font-semibold text-slate-700 mb-3">スコアカード</h3>
              <div className="mb-3">
                <ScoreBadge score={score.overallScore} label={score.alignmentLabel} size="lg" />
              </div>
              <ConfidenceBadge label={score.confidenceLabel} />

              <div className="mt-4 space-y-2 border-t border-slate-200 pt-3">
                <p className="text-xs font-medium text-slate-600">サブスコア</p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">公約追随度</span>
                  <span className="font-medium text-slate-900">{score.subScores.mandateFidelity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-600">制度的実行可能性</span>
                  <span className="font-medium text-slate-900">{score.subScores.institutionalFeasibility}</span>
                </div>
                {score.hasShockContext && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-600">適応的正当化</span>
                    <span className="font-medium text-slate-900">{score.subScores.adaptiveJustification}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-3">
                ※ 参考指標。断定的評価ではありません。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Shock Context */}
      {relevantShocks.length > 0 && (
        <ShockContextBanner shocks={relevantShocks} />
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Radar chart */}
        {score && Object.keys(score.issueAreaScores).length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">政策分野別スコア</h3>
            <p className="text-xs text-slate-500 mb-3">※ デモ用参考指標</p>
            <RadarScoreChart issueAreaScores={score.issueAreaScores} />
          </div>
        )}

        {/* Action breakdown */}
        {actions.length > 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-800 mb-1">行動種別の内訳</h3>
            <p className="text-xs text-slate-500 mb-3">※ デモデータ（{actions.length}件）</p>
            <ActionBreakdownChart actions={actions} />
          </div>
        )}
      </div>

      {/* Promises section */}
      {promises.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">主要公約一覧</h2>
          <div className="space-y-4">
            {promises.map((promise) => {
              const pMatches = matches.filter((m) => m.promiseId === promise.id);
              const pActions = pMatches
                .map((m) => actionMap[m.actionId])
                .filter(Boolean);
              return (
                <PromiseCard
                  key={promise.id}
                  promise={promise}
                  matches={pMatches}
                  relatedActions={pActions}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Evidence section */}
      {matches.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-1">エビデンス一覧</h2>
          <p className="text-sm text-slate-500 mb-4">
            ※ 以下はデモ用の整理要約です。逐語引用ではありません。
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

      {/* Timeline */}
      {timelineEvents.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold text-slate-900 mb-4">時系列タイムライン</h2>
          <Timeline events={timelineEvents} />
        </section>
      )}
    </div>
  );
}
