import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import SectionHeading from '@/components/ui/SectionHeading';
import SourceLinkCard from '@/components/ui/SourceLinkCard';

export const metadata = {
  title: '出典 | Japan Promise Tracker',
  description: 'データソース・一次資料・参照方法の説明',
};

const primarySources = [
  {
    label: '国会会議録検索システム（国立国会図書館）',
    url: 'https://kokkai.ndl.go.jp/',
    description: '国会での発言・質疑・委員会活動の一次資料。本サイトの行動データの主要な参照元。',
  },
  {
    label: '衆議院ウェブサイト（議員情報）',
    url: 'https://www.shugiin.go.jp/internet/itdb_iinkai.nsf/html/iinkai/iinkaiona.htm',
    description: '衆議院議員の基本情報・委員会所属・法案提出状況。',
  },
  {
    label: '参議院ウェブサイト（議員情報）',
    url: 'https://www.sangiin.go.jp/japanese/joho1/kousei/giin/current/giin.htm',
    description: '参議院議員の基本情報・委員会所属・質問主意書。',
  },
  {
    label: '自由民主党 政策・マニフェスト',
    url: 'https://www.jimin.jp/policy/',
    description: '与党・自由民主党の政策パンフレット・マニフェスト。',
  },
  {
    label: '立憲民主党 政策',
    url: 'https://cdp-japan.jp/policy',
    description: '立憲民主党の政策・マニフェスト。',
  },
  {
    label: '公明党 マニフェスト・政策',
    url: 'https://www.komei.or.jp/policy/',
    description: '公明党の政策パンフレット・マニフェスト。',
  },
  {
    label: '日本維新の会 政策',
    url: 'https://o-ishin.jp/policy/',
    description: '日本維新の会の政策・マニフェスト。',
  },
  {
    label: '国民民主党 政策',
    url: 'https://new-kokumin.jp/policy',
    description: '国民民主党の政策・マニフェスト。',
  },
  {
    label: '日本共産党 政策',
    url: 'https://www.jcp.or.jp/jcp/Kihon-Seisaku/',
    description: '日本共産党の政策・綱領。',
  },
  {
    label: '社会民主党 政策',
    url: 'https://sdp.or.jp/policy/',
    description: '社会民主党の政策・マニフェスト。',
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

export default function SourcesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeading
        title="出典・データソース"
        subtitle="このサイトで参照しているデータソースと、原典確認の方法について説明します。"
      />

      <DisclaimerBanner />

      {/* Important Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
        <h2 className="text-base font-semibold text-amber-800 mb-3">重要なお知らせ</h2>
        <div className="space-y-2 text-sm text-amber-800">
          <p>
            このサイトに表示されるデータは、<strong>研究・透明性プロトタイプ用のデモデータ</strong>です。
            発言の抜粋は「整理要約」または「デモ要約」であり、逐語引用ではありません。
          </p>
          <p>
            原典の確認には、以下に記載する一次資料（国会会議録・議員公式サイト・政党マニフェスト等）を
            直接ご参照ください。
          </p>
          <p>
            将来的には実データへの接続を想定していますが、現段階ではデモ用に整理・簡略化されたデータを使用しています。
          </p>
        </div>
      </div>

      {/* Primary Sources */}
      <section className="mb-10">
        <SectionHeading
          title="一次資料（参照元）"
          subtitle="本サイトのデータは以下の一次資料を参照・要約して構成されています。"
        />
        <div className="space-y-3">
          {primarySources.map((source) => (
            <div key={source.label} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-700 hover:underline block mb-1"
              >
                {source.label}
              </a>
              <p className="text-xs text-slate-600">{source.description}</p>
              <p className="text-xs text-slate-400 mt-1">{source.url}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supplemental Sources */}
      <section className="mb-10">
        <SectionHeading
          title="補助的資料"
          subtitle="特定の政策分野について、以下の資料も参照しています。"
        />
        <div className="space-y-3">
          {supplementalSources.map((source) => (
            <div key={source.label} className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-blue-700 hover:underline block mb-1"
              >
                {source.label}
              </a>
              <p className="text-xs text-slate-600">{source.description}</p>
              <p className="text-xs text-slate-400 mt-1">{source.url}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How to verify */}
      <section className="mb-10">
        <SectionHeading
          title="原典の確認方法"
        />
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">国会発言の確認</h3>
            <p className="text-sm text-slate-700">
              <a href="https://kokkai.ndl.go.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
                国会会議録検索システム
              </a>
              で、議員名・キーワード・日付で検索できます。委員会名・会期を絞り込むと効果的です。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">選挙公約の確認</h3>
            <p className="text-sm text-slate-700">
              各政党のウェブサイト・マニフェスト、選挙公報（都道府県選挙管理委員会が公開）、
              議員の公式サイトで確認できます。
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800 mb-2">議員情報の確認</h3>
            <p className="text-sm text-slate-700">
              衆議院・参議院の公式ウェブサイトに議員名鑑があり、
              当選回数・委員会所属・役職等を確認できます。
            </p>
          </div>
        </div>
      </section>

      {/* Future data sources */}
      <section className="mb-10">
        <SectionHeading
          title="将来接続予定のデータソース"
          subtitle="実データへの移行時に接続を想定しているAPIや資料です（詳細は lib/ingestion/README.md を参照）。"
        />
        <div className="bg-slate-800 text-white rounded-xl p-6">
          <ul className="space-y-2 text-slate-300 text-sm">
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>国会会議録検索API（国立国会図書館）— 発言・質問データの自動取得</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>衆議院議員名鑑API — 議員情報・委員会所属の全件取得</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>参議院議員名鑑 — 同上</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>政党マニフェストページ（スクレイピング）— 公約テキストの取得</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>法案提出・賛否データ — 立法活動の記録</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-400 font-bold mt-0.5">→</span>
              <span>選挙公報データ — 候補者公約の一次資料</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Transparency note */}
      <section className="mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-base font-semibold text-blue-800 mb-3">透明性に関する説明</h2>
          <div className="space-y-2 text-sm text-blue-800">
            <p>
              本サイトのデータ整理方針は以下の通りです：
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>発言の抜粋は「整理要約」「デモ要約」と明記します</li>
              <li>逐語引用は行いません（デモ段階では捏造になりうるため）</li>
              <li>データソースのラベルと参照URLを必ず示します</li>
              <li>スコアの計算式と重みづけを方法論ページで公開します</li>
              <li>評価の限界・不確実性を正直に示します</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
