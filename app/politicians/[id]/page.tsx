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
import { ChevronLeft, MapPin, Award, Briefcase } from 'lucide-react';

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
    demoRepository.getPartyById('').then(() => null),
    demoRepository.getScoreByPoliticianId(id),
    demoRepository.getPromisesByPoliticianId(id),
    demoRepository.getActionsByPoliticianId(id),
    demoRepository.getMatchesByPoliticianId(id),
    demoRepository.getAllShocks(),
  ]);

  if (!politician) notFound();

  const partyData = await demoRepository.getPartyById(politician.partyId);
  const relevantShocks = getRelevantShocks(shocks, politician.issueTags);
  const actionMap = Object.fromEntries(actions.map((a) => [a.id, a]));

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
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
      {/* Back link */}
      <Link href="/politicians" className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-8 transition-colors">
        <ChevronLeft className="w-4 h-4" />
        議員一覧へ戻る
      </Link>

      <DisclaimerBanner />

      {/* Politician header */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-6 md:p-8 mb-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Photo + Basic info */}
          <div className="flex items-start gap-5 flex-1">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
              <Image
                src={politician.profileImage || '/placeholder-profile.png'}
                alt={politician.nameJa}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-start gap-2.5 mb-1.5">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{politician.nameJa}</h1>
                {partyData && (
                  <span
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg text-white"
                    style={{ backgroundColor: partyData.colorToken }}
                  >
                    {partyData.name}
                  </span>
                )}
                <span className="text-[11px] font-medium bg-slate-100 text-slate-600 rounded-lg px-2.5 py-1">
                  {chamberShort(politician.chamber)}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-3">{politician.nameKana} / {politician.nameRomaji}</p>

              <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {politician.district}
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5" />
                  {politician.termsServed}期
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" />
                  {politician.governmentStatus === '与党' ? (
                    <span className="font-medium text-slate-700">与党</span>
                  ) : (
                    <span className="font-medium text-slate-700">野党</span>
                  )}
                </span>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">{politician.bio}</p>

              {/* Issue tags */}
              <div className="flex flex-wrap gap-1.5">
                {politician.issueTags.map((tag) => (
                  <span key={tag} className="text-[10px] font-medium bg-slate-50 text-slate-500 border border-slate-200 rounded-md px-2.5 py-1">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Leadership roles */}
              {politician.leadershipRoles.length > 0 && (
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {politician.leadershipRoles.map((role) => (
                    <span key={role} className="text-[10px] font-medium bg-amber-50/50 text-amber-700 border border-amber-200/60 rounded-md px-2.5 py-1">
                      {role}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Score Card */}
          {score && (
            <div className="bg-slate-50/80 rounded-xl p-6 border border-slate-200/60 min-w-[220px]">
              <h3 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-4">スコアカード</h3>
              <div className="mb-4">
                <ScoreBadge score={score.overallScore} label={score.alignmentLabel} size="lg" />
              </div>
              <ConfidenceBadge label={score.confidenceLabel} />

              <div className="mt-5 space-y-2.5 border-t border-slate-200/60 pt-4">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">サブスコア</p>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">公約追随度</span>
                  <span className="font-semibold text-slate-900">{score.subScores.mandateFidelity}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">制度的実行可能性</span>
                  <span className="font-semibold text-slate-900">{score.subScores.institutionalFeasibility}</span>
                </div>
                {score.hasShockContext && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">適応的正当化</span>
                    <span className="font-semibold text-slate-900">{score.subScores.adaptiveJustification}</span>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-slate-400 mt-4 leading-relaxed">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {score && Object.keys(score.issueAreaScores).length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/80 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">政策分野別スコア</h3>
            <p className="text-xs text-slate-400 mb-4">デモ用参考指標</p>
            <RadarScoreChart issueAreaScores={score.issueAreaScores} />
          </div>
        )}

        {actions.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/80 p-6">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">行動種別の内訳</h3>
            <p className="text-xs text-slate-400 mb-4">デモデータ（{actions.length}件）</p>
            <ActionBreakdownChart actions={actions} />
          </div>
        )}
      </div>

      {/* Promises section */}
      {promises.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">主要公約一覧</h2>
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
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-1.5">エビデンス一覧</h2>
          <p className="text-xs text-slate-400 mb-6">
            以下はデモ用の整理要約です。逐語引用ではありません。
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
        <section className="mb-12">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight mb-6">時系列タイムライン</h2>
          <Timeline events={timelineEvents} />
        </section>
      )}
    </div>
  );
}
