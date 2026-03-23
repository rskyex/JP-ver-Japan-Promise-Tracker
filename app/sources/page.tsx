import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import { ExternalLink, CheckCircle2, ArrowRight, Info, Database, BookOpen, Globe } from 'lucide-react';

export const metadata = {
  title: '出典 | Japan Promise Tracker',
  description: 'データソース・一次資料・参照方法の説明',
};

const primarySources = [
  {
    label: '国会会議録検索システム（国立国会図書館）',
    url: 'https://kokkai.ndl.go.jp/',
    description: '国会での発言・質疑・委員会活動の一次資料。本サイトの行動データの主要な参照元。',
    category: 'government',
  },
  {
    label: '衆議院ウェブサイト（議員情報）',
    url: 'https://www.shugiin.go.jp/internet/itdb_iinkai.nsf/html/iinkai/iinkaiona.htm',
    description: '衆議院議員の基本情報・委員会所属・法案提出状況。',
    category: 'government',
  },
  {
    label: '参議院ウェブサイト（議員情報）',
    url: 'https://www.sangiin.go.jp/japanese/joho1/kousei/giin/current/giin.htm',
    description: '参議院議員の基本情報・委員会所属・質問主意書。',
    category: 'government',
  },
  {
    label: '自由民主党 政策・マニフェスト',
    url: 'https://www.jimin.jp/policy/',
    description: '与党・自由民主党の政策パンフレット・マニフェスト。',
    category: 'party',
  },
  {
    label: '立憲民主党 政策',
    url: 'https://cdp-japan.jp/policy',
    description: '立憲民主党の政策・マニフェスト。',
    category: 'party',
  },
  {
    label: '公明党 マニフェスト・政策',
    url: 'https://www.komei.or.jp/policy/',
    description: '公明党の政策パンフレット・マニフェスト。',
    category: 'party',
  },
  {
    label: '日本維新の会 政策',
    url: 'https://o-ishin.jp/policy/',
    description: '日本維新の会の政策・マニフェスト。',
    category: 'party',
  },
  {
    label: '国民民主党 政策',
    url: 'https://new-kokumin.jp/policy',
    description: '国民民主党の政策・マニフェスト。',
    category: 'party',
  },
  {
    label: '日本共産党 政策',
    url: 'https://www.jcp.or.jp/jcp/Kihon-Seisaku/',
    description: '日本共産党の政策・綱領。',
    category: 'party',
  },
  {
    label: '社会民主党 政策',
    url: 'https://sdp.or.jp/policy/',
    description: '社会民主党の政策・マニフェスト。',
    category: 'party',
  },
];

const supplementalSources = [
  {
    label: '首相官邸（内閣方針・閣議決定）',
    url: 'https://www.kantei.go.jp/',
    description: '閣議決定・内閣方針・所信表明演説の資料。',
  },
  {
    label: '内閣府（各政策資料）',
    url: 'https://www.cao.go.jp/',
    description: '各省庁横断の政策方針・審議会資料。',
  },
  {
    label: '経済産業省（エネルギー・経済政策）',
    url: 'https://www.meti.go.jp/',
    description: 'エネルギー政策・産業政策の一次資料。',
  },
  {
    label: 'こども家庭庁',
    url: 'https://www.cfa.go.jp/',
    description: '少子化対策・子育て政策の一次資料。',
  },
];

function SourceCard({ label, url, description }: { label: string; url: string; description: string }) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 p-5 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-slate-900 group-hover:text-slate-600 transition-colors block mb-1.5"
          >
            {label}
          </a>
          <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
          <p className="text-[10px] text-slate-400 mt-2 truncate">{url}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-300 group-hover:text-slate-500 flex-shrink-0 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function SourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 py-12">
      <SectionHeading
        title="出典・データソース"
        subtitle="参照しているデータソースと、原典確認の方法について説明します。"
      />

      <DisclaimerBanner />

      {/* Important Note */}
      <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 mb-12">
        <div className="flex items-start gap-3">
          <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
          <div className="space-y-2 text-sm text-slate-500">
            <p>
              このサイトに表示されるデータは、<span className="font-medium text-slate-700">研究・透明性プロトタイプ用のデモデータ</span>です。
              発言の抜粋は「整理要約」であり、逐語引用ではありません。
            </p>
            <p>
              原典の確認には、以下に記載する一次資料を直接ご参照ください。
            </p>
          </div>
        </div>
      </div>

      {/* Primary Sources - Government */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-6">
          <Database className="w-4 h-4 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">公的一次資料</h2>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {primarySources.filter((s) => s.category === 'government').map((source) => (
            <SourceCard key={source.label} {...source} />
          ))}
        </div>
      </section>

      {/* Primary Sources - Party */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-6">
          <BookOpen className="w-4 h-4 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">政党マニフェスト</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {primarySources.filter((s) => s.category === 'party').map((source) => (
            <SourceCard key={source.label} {...source} />
          ))}
        </div>
      </section>

      {/* Supplemental Sources */}
      <section className="mb-12">
        <div className="flex items-center gap-2.5 mb-6">
          <Globe className="w-4 h-4 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">補助的資料</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {supplementalSources.map((source) => (
            <SourceCard key={source.label} {...source} />
          ))}
        </div>
      </section>

      {/* How to verify */}
      <section className="mb-12">
        <SectionHeading title="原典の確認方法" />
        <div className="bg-white rounded-xl border border-slate-200/80 divide-y divide-slate-100">
          {[
            {
              title: '国会発言の確認',
              text: '国会会議録検索システムで、議員名・キーワード・日付で検索できます。委員会名・会期を絞り込むと効果的です。',
              url: 'https://kokkai.ndl.go.jp/',
            },
            {
              title: '選挙公約の確認',
              text: '各政党のウェブサイト・マニフェスト、選挙公報（都道府県選挙管理委員会が公開）、議員の公式サイトで確認できます。',
            },
            {
              title: '議員情報の確認',
              text: '衆議院・参議院の公式ウェブサイトに議員名鑑があり、当選回数・委員会所属・役職等を確認できます。',
            },
          ].map(({ title, text, url }) => (
            <div key={title} className="p-6">
              <h3 className="text-sm font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {url ? (
                  <>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors">
                      国会会議録検索システム
                    </a>
                    で、{text.split('で、')[1]}
                  </>
                ) : (
                  text
                )}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Future data sources */}
      <section className="mb-12">
        <SectionHeading
          title="将来接続予定のデータソース"
          subtitle="実データへの移行時に接続を想定しているAPIや資料です。"
        />
        <div className="bg-slate-900 rounded-2xl p-8">
          <div className="space-y-3">
            {[
              '国会会議録検索API（国立国会図書館）— 発言・質問データの自動取得',
              '衆議院議員名鑑API — 議員情報・委員会所属の全件取得',
              '参議院議員名鑑 — 同上',
              '政党マニフェストページ（スクレイピング）— 公約テキストの取得',
              '法案提出・賛否データ — 立法活動の記録',
              '選挙公報データ — 候補者公約の一次資料',
            ].map((text) => (
              <div key={text} className="flex gap-3">
                <ArrowRight className="w-4 h-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparency note */}
      <section className="mb-8">
        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-slate-900 mb-4">透明性に関する説明</h2>
          <div className="space-y-2">
            {[
              '発言の抜粋は「整理要約」「デモ要約」と明記します',
              '逐語引用は行いません（デモ段階では捏造になりうるため）',
              'データソースのラベルと参照URLを必ず示します',
              'スコアの計算式と重みづけを方法論ページで公開します',
              '評価の限界・不確実性を正直に示します',
            ].map((text) => (
              <div key={text} className="flex gap-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-500">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
