import Link from 'next/link';
import { demoRepository } from '@/lib/repositories/demoRepository';
import { calcSiteStats, calcPartyAverageScores } from '@/lib/stats';
import StatCard from '@/components/ui/StatCard';
import FeatureCard from '@/components/ui/FeatureCard';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import PartyDistributionChart from '@/components/charts/PartyDistributionChart';
import AlignmentDistributionChart from '@/components/charts/AlignmentDistributionChart';

export default async function HomePage() {
  const [politicians, promises, actions, matches, scores, parties] = await Promise.all([
    demoRepository.getAllPoliticians(),
    demoRepository.getAllPromises(),
    demoRepository.getAllActions(),
    demoRepository.getAllMatches(),
    demoRepository.getAllScores(),
    demoRepository.getAllParties(),
  ]);

  const stats = calcSiteStats(
    politicians.length,
    promises.length,
    actions.length,
    matches.length,
    scores
  );

  const partyMap = Object.fromEntries(politicians.map((p) => [p.id, p.partyId]));
  const partyScores = calcPartyAverageScores(scores, partyMap);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block bg-blue-800 text-blue-200 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-blue-700">
            シビックテック・政策研究プロトタイプ
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6">
            選挙公約が国会での行動に
            <br className="hidden sm:block" />
            どう反映されたかを追跡する
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            このサイトは、日本の国会議員について、公約・国会行動・外部ショックの文脈を
            対応づけて可視化する、研究・透明性プロトタイプです。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/politicians"
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              議員一覧を見る
            </Link>
            <Link
              href="/methodology"
              className="bg-transparent border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              方法論を見る
            </Link>
          </div>
        </div>
      </section>

      {/* Disclaimer Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <DisclaimerBanner />
      </div>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="対象議員数"
            value={stats.totalPoliticians}
            subLabel="デモデータ"
            icon="👤"
          />
          <StatCard
            label="公約数"
            value={stats.totalPromises}
            subLabel="デモデータ"
            icon="📋"
          />
          <StatCard
            label="紐づいた国会行動数"
            value={stats.totalActions}
            subLabel="デモデータ"
            icon="🏛️"
          />
          <StatCard
            label="証拠項目数"
            value={stats.totalEvidence}
            subLabel="公約×行動マッチ"
            icon="🔍"
          />
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">このサイトでできること</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon="📌"
            title="公約マッピング"
            description="各議員の選挙公約を政策分野・重要度別に整理し、発言や行動との対応を確認できます。"
          />
          <FeatureCard
            icon="🏛️"
            title="国会発言エビデンス"
            description="委員会発言・質問主意書・法案提出など、公約に関連する国会行動をエビデンスとして参照できます。"
          />
          <FeatureCard
            icon="⚡"
            title="外部ショック補正"
            description="戦争・パンデミック・金融危機などの外部要因を文脈として表示し、政策変化の説明可能性を示します。"
          />
          <FeatureCard
            icon="📊"
            title="透明なスコアリング"
            description="スコア計算の式・重みづけを方法論ページで公開。簡略化を含む参考指標として提示します。"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Party Average Scores */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">政党別 平均整合スコア</h3>
            <p className="text-xs text-slate-500 mb-4">
              ※ デモデータに基づく参考指標。議員数が少ないため、単純な比較は困難です。
            </p>
            <PartyDistributionChart partyScores={partyScores} parties={parties} />
          </div>

          {/* Alignment Distribution */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900 mb-1">整合ラベル分布</h3>
            <p className="text-xs text-slate-500 mb-4">
              ※ 議員ごとの総合整合ラベルの分布（デモデータ）。
            </p>
            <AlignmentDistributionChart distribution={stats.alignmentDistribution} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-slate-800 text-white rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold mb-4">このサイトについて</h2>
            <p className="text-slate-300 leading-relaxed mb-4">
              Japan Promise Trackerは、日本政治データをもとにした日本語デモ / 研究プロトタイプです。
              政治的透明性・アカウンタビリティ・シビックテックの研究・ポートフォリオ実証を目的としています。
            </p>
            <p className="text-slate-300 leading-relaxed mb-4">
              このサイトは、公約追随度（Mandate Fidelity）・制度的実行可能性（Institutional Feasibility）・
              適応的正当化（Adaptive Justification）の3軸でスコアを算出し、
              外部ショックの文脈も組み込んだ多面的な評価を提供します。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              スコアや分類は簡略化を含む参考指標です。
              議員・政党に対する最終的・断定的評価を示すものではありません。
              詳細は
              <Link href="/methodology" className="text-blue-400 hover:text-blue-300 underline">
                方法論ページ
              </Link>
              をご覧ください。
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/politicians"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                議員一覧へ
              </Link>
              <Link
                href="/sources"
                className="bg-transparent border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors"
              >
                出典を確認する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-blue-100 p-5 shadow-sm">
            <div className="text-blue-700 font-bold text-sm mb-2">A. 公約追随度</div>
            <p className="text-sm text-slate-700">
              選挙後の行動が、選挙時の公約とどの程度整合しているかを評価します。
              サリエンス（重要度）で重みづけした加重平均で算出。
            </p>
          </div>
          <div className="bg-white rounded-lg border border-emerald-100 p-5 shadow-sm">
            <div className="text-emerald-700 font-bold text-sm mb-2">B. 制度的実行可能性</div>
            <p className="text-sm text-slate-700">
              与野党の立場・役職・委員会関与など、議員が制度上どの程度実行できる立場にあったかを評価します。
            </p>
          </div>
          <div className="bg-white rounded-lg border border-orange-100 p-5 shadow-sm">
            <div className="text-orange-700 font-bold text-sm mb-2">C. 適応的正当化</div>
            <p className="text-sm text-slate-700">
              危機・外部ショック時の方針転換について、説明の質・代替案・回帰努力を評価します。
              自動的な免責ではありません。
            </p>
          </div>
        </div>
        <div className="text-center mt-6">
          <Link
            href="/methodology"
            className="text-sm text-blue-700 hover:text-blue-900 font-medium hover:underline"
          >
            方法論の詳細を見る →
          </Link>
        </div>
      </section>
    </div>
  );
}
