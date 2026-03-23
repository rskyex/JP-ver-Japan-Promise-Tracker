import Link from 'next/link';
import { demoRepository } from '@/lib/repositories/demoRepository';
import { calcSiteStats, calcPartyAverageScores } from '@/lib/stats';
import StatCard from '@/components/ui/StatCard';
import FeatureCard from '@/components/ui/FeatureCard';
import PartyDistributionChart from '@/components/charts/PartyDistributionChart';
import AlignmentDistributionChart from '@/components/charts/AlignmentDistributionChart';
import {
  Users,
  FileText,
  Building2,
  Search,
  Target,
  BookOpen,
  Zap,
  BarChart3,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Info,
  Shield,
} from 'lucide-react';

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
      <section className="relative overflow-hidden bg-white border-b border-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-50 via-white to-white" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-600 text-[11px] font-semibold px-3.5 py-1.5 rounded-full mb-8 uppercase tracking-wider">
              <Shield className="w-3.5 h-3.5" />
              政策研究プロトタイプ
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-bold text-slate-900 leading-[1.15] tracking-tight mb-6">
              選挙公約と国会行動の
              <br className="hidden sm:block" />
              整合性を可視化する
            </h1>
            <p className="text-lg text-slate-500 max-w-xl leading-relaxed mb-10">
              日本の国会議員について、公約・国会行動・外部ショックの文脈を対応づけて分析する、研究・透明性プロトタイプです。
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/politicians"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors"
              >
                議員一覧を見る
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/methodology"
                className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 px-7 py-3.5 rounded-xl text-sm font-semibold transition-all"
              >
                方法論を見る
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 -mt-1 pt-16 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            label="対象議員数"
            value={stats.totalPoliticians}
            subLabel="デモデータ"
            icon={<Users className="w-5 h-5" />}
          />
          <StatCard
            label="公約数"
            value={stats.totalPromises}
            subLabel="デモデータ"
            icon={<FileText className="w-5 h-5" />}
          />
          <StatCard
            label="国会行動数"
            value={stats.totalActions}
            subLabel="デモデータ"
            icon={<Building2 className="w-5 h-5" />}
          />
          <StatCard
            label="証拠項目数"
            value={stats.totalEvidence}
            subLabel="公約×行動マッチ"
            icon={<Search className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 pb-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">このサイトでできること</h2>
          <p className="text-sm text-slate-500 mt-2">公約追跡の4つの機能</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <FeatureCard
            icon={<Target className="w-5 h-5" />}
            title="公約マッピング"
            description="各議員の選挙公約を政策分野・重要度別に整理し、発言や行動との対応を確認できます。"
          />
          <FeatureCard
            icon={<BookOpen className="w-5 h-5" />}
            title="国会発言エビデンス"
            description="委員会発言・質問主意書・法案提出など、公約に関連する国会行動をエビデンスとして参照できます。"
          />
          <FeatureCard
            icon={<Zap className="w-5 h-5" />}
            title="外部ショック補正"
            description="戦争・パンデミック・金融危機などの外部要因を文脈として表示し、政策変化の説明可能性を示します。"
          />
          <FeatureCard
            icon={<BarChart3 className="w-5 h-5" />}
            title="透明なスコアリング"
            description="スコア計算の式・重みづけを方法論ページで公開。簡略化を含む参考指標として提示します。"
          />
        </div>
      </section>

      {/* Charts Section */}
      <section className="bg-slate-50/50 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">データプレビュー</h2>
            <p className="text-sm text-slate-500 mt-2">デモデータに基づく参考指標</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200/80 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">政党別 平均整合スコア</h3>
              <p className="text-xs text-slate-400 mb-5">
                デモデータに基づく参考指標。議員数が少ないため、単純な比較は困難です。
              </p>
              <PartyDistributionChart partyScores={partyScores} parties={parties} />
            </div>
            <div className="bg-white rounded-xl border border-slate-200/80 p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">整合ラベル分布</h3>
              <p className="text-xs text-slate-400 mb-5">
                議員ごとの総合整合ラベルの分布（デモデータ）。
              </p>
              <AlignmentDistributionChart distribution={stats.alignmentDistribution} />
            </div>
          </div>
        </div>
      </section>

      {/* Methodology preview */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">3つの評価軸</h2>
          <p className="text-sm text-slate-500 mt-2">スコアリングの理論的基盤</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 bg-slate-900 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4">A</div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">公約追随度</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              選挙後の行動が、選挙時の公約とどの程度整合しているかを評価します。サリエンス（重要度）で重みづけした加重平均で算出。
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 bg-emerald-700 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4">B</div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">制度的実行可能性</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              与野党の立場・役職・委員会関与など、議員が制度上どの程度実行できる立場にあったかを評価します。
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow">
            <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center text-white text-sm font-bold mb-4">C</div>
            <h3 className="text-sm font-semibold text-slate-900 mb-2">適応的正当化</h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              危機・外部ショック時の方針転換について、説明の質・代替案・回帰努力を評価します。自動的な免責ではありません。
            </p>
          </div>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/methodology"
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
          >
            方法論の詳細を見る
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* About / Trust Section */}
      <section className="bg-slate-900">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-white tracking-tight mb-4">このサイトについて</h2>
            <p className="text-slate-400 leading-relaxed mb-4 text-sm">
              Japan Promise Trackerは、公約追随度・制度的実行可能性・適応的正当化の3軸でスコアを算出し、外部ショックの文脈も組み込んだ多面的な評価を提供する、研究プロトタイプです。
            </p>
            <div className="space-y-3 mb-8">
              {[
                'スコアは簡略化を含む参考指標です',
                '議員・政党に対する断定的評価ではありません',
                'データソースと計算式を完全に公開しています',
              ].map((text) => (
                <div key={text} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-400">{text}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/politicians"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
              >
                議員一覧へ
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/sources"
                className="inline-flex items-center gap-2 border border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
              >
                出典を確認する
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Compact Disclaimer */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex items-start gap-3 text-xs text-slate-400">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            このサイトは、政治的透明性と研究プロトタイピングのために、整理・要約・分類されたデモデータを用いています。スコアや分類は簡略化を含み、議員や政党に対する最終的・断定的評価を示すものではありません。
          </p>
        </div>
      </section>
    </div>
  );
}
