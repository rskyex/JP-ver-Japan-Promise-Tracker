import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import MethodCard from '@/components/ui/MethodCard';
import SectionHeading from '@/components/ui/SectionHeading';
import { ALIGNMENT_LABELS } from '@/lib/labels';

export const metadata = {
  title: '方法論 | Japan Promise Tracker',
  description: 'スコアリングの方法論・3次元評価・外部ショック補正の説明',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SectionHeading
        title="方法論"
        subtitle="このページでは、Japan Promise Trackerのスコアリング・分類・評価の方法論を公開しています。透明性を最優先とし、研究・教育・シビックテック用途に耐えうる設計を目指しています。"
      />

      <DisclaimerBanner />

      {/* Overview */}
      <section className="mb-10 bg-slate-800 text-white rounded-xl p-6 md:p-8">
        <h2 className="text-xl font-bold mb-4">基本方針</h2>
        <ul className="space-y-2 text-slate-300 text-sm">
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold mt-0.5">✓</span>
            <span>このサイトは「絶対的真実」や「最終的な道徳的審判」を下すものではありません。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold mt-0.5">✓</span>
            <span>整合評価は「強く整合」「概ね整合」「証拠が混在」「矛盾する証拠あり」「証拠不十分」などの慎重な表現で示します。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold mt-0.5">✓</span>
            <span>発言の抜粋は整理要約・デモ要約であり、逐語引用ではありません。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold mt-0.5">✓</span>
            <span>外部ショックは自動的に免責されるものではなく、説明の質・一時性・代替案の有無を考慮します。</span>
          </li>
          <li className="flex gap-2">
            <span className="text-blue-400 font-bold mt-0.5">✓</span>
            <span>スコアは簡略化を含む参考指標です。数字を一人歩きさせないようご注意ください。</span>
          </li>
        </ul>
      </section>

      {/* Three Dimensions */}
      <section className="mb-10">
        <SectionHeading
          title="3つの理論次元"
          subtitle="スコアリングは以下の3次元で構成されます。"
        />

        <div className="space-y-4">
          <MethodCard letter="A" title="公約追随度（Mandate Fidelity）" subtitle="重み: 50〜65%">
            <p>
              選挙後の行動が、選挙時に掲げた公約とどの程度整合しているかを評価します。
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>公約ごとに関連する国会行動（質問・法案・発言等）を特定</li>
              <li>各行動について整合ラベルと信頼度を付与</li>
              <li>公約の重要度（salience）で重みづけ</li>
              <li>加重平均で0〜100のスコアを算出</li>
            </ul>
          </MethodCard>

          <MethodCard letter="B" title="制度的実行可能性（Institutional Feasibility）" subtitle="重み: 20〜35%">
            <p>
              議員が制度上どれだけ実行可能性を持っていたかを評価します。
              野党議員は与党議員と比べて政策を直接実現する手段が限られるため、
              立場に応じた文脈を反映します。
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>与党/野党の立場（与党+20点、野党-10点）</li>
              <li>役職の有無（大臣・党代表等で+15点）</li>
              <li>行動の種類の多様性（複数の行動手段で+5〜10点）</li>
              <li>公約に関連する行動の存在率（比例配分）</li>
            </ul>
          </MethodCard>

          <MethodCard letter="C" title="適応的正当化（Adaptive Justification）" subtitle="重み: 30%（ショック関連時のみ）">
            <p>
              危機・外部ショックのもとで、公約とのずれがあった場合に、
              そのずれが説明されていたか・限定的であったか・代替提案があったか・
              復帰努力があったかを評価します。
            </p>
            <p className="mt-2 text-slate-600">
              <strong>注意：</strong>ショックは自動的に免責されるものではありません。
              説明の質・一時的か恒久的か・代替案の有無も考慮します。
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-slate-600">
              <li>関連ショックが確認された場合に適用</li>
              <li>矛盾的行動の数で減点</li>
              <li>重大な危機（critical）ではやや加算</li>
              <li>ショック関連なしの場合、スコアはデフォルト50（影響最小化）</li>
            </ul>
          </MethodCard>
        </div>
      </section>

      {/* Score Formula */}
      <section className="mb-10">
        <SectionHeading title="スコア計算式" />

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h3 className="text-base font-semibold text-slate-800 mb-4">総合スコア（デモ用計算式）</h3>

          {/* Formula with shock */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mb-4">
            <p className="text-sm font-medium text-blue-800 mb-2">ショック文脈あり（適応的正当化を適用）：</p>
            <div className="font-mono text-sm text-blue-900 bg-white rounded p-3 border border-blue-100">
              総合スコア = (公約追随度 × 0.50) + (制度的実行可能性 × 0.20) + (適応的正当化 × 0.30)
            </div>
          </div>

          {/* Formula without shock */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
            <p className="text-sm font-medium text-slate-700 mb-2">ショック文脈なし：</p>
            <div className="font-mono text-sm text-slate-800 bg-white rounded p-3 border border-slate-200">
              総合スコア = (公約追随度 × 0.65) + (制度的実行可能性 × 0.35)
            </div>
          </div>

          <p className="text-xs text-slate-500 mt-2">
            ※ この計算式はデモ用の簡略化モデルです。実際の政策評価には、より詳細な分析が必要です。
            重みづけの変更やより精緻なモデルへの差し替えは、lib/scoring.ts で行えます。
          </p>
        </div>
      </section>

      {/* Alignment Labels */}
      <section className="mb-10">
        <SectionHeading
          title="整合ラベル体系"
          subtitle="公約と行動の関係は、以下の7段階で分類されます。"
        />

        <div className="space-y-2">
          {ALIGNMENT_LABELS.map((label) => {
            const descriptions: Record<string, string> = {
              '強く整合': '公約の内容に直接対応する行動が複数確認され、整合性が非常に高い。',
              '概ね整合': '公約の方向性と行動が一致しており、主要な部分で整合している。',
              '一部整合': '公約の一部の要素で整合が確認されるが、全体的には限定的。',
              '証拠が混在': '整合する行動と矛盾する行動の両方が確認されており、判断が難しい。',
              '弱い整合': '整合する証拠はあるが、弱く・限定的・間接的である。',
              '矛盾する証拠あり': '公約の内容と実際の行動・立場が相反する証拠が確認されている。',
              '証拠不十分': '関連する行動の記録が少なく、整合度を評価するための根拠が不十分。',
            };
            return (
              <div key={label} className="flex gap-3 items-start bg-white rounded border border-slate-200 p-3">
                <span className="text-sm font-medium text-slate-800 min-w-[120px] flex-shrink-0">{label}</span>
                <span className="text-sm text-slate-600">{descriptions[label]}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Crisis context */}
      <section className="mb-10">
        <SectionHeading
          title="危機・外部ショック補正の考え方"
        />

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
          <h3 className="text-base font-semibold text-orange-800 mb-3">ショックカテゴリ</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
            {['戦争・安全保障危機', '金融危機', 'インフレ', 'パンデミック', '自然災害', 'エネルギー危機', '政治危機'].map((cat) => (
              <span key={cat} className="text-sm bg-white text-orange-700 border border-orange-200 rounded px-2 py-1">
                {cat}
              </span>
            ))}
          </div>

          <h3 className="text-base font-semibold text-orange-800 mb-3">補正の注意事項</h3>
          <ul className="space-y-2 text-sm text-orange-800">
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold mt-0.5">▲</span>
              危機があっただけでは、公約との乖離は自動的に免責されません。
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold mt-0.5">▲</span>
              説明の質（国民・議会への説明があったか）を考慮します。
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold mt-0.5">▲</span>
              一時的な方針転換か、恒久的な方針変更かを区別します。
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold mt-0.5">▲</span>
              代替案・代替提案が提示されたかを確認します。
            </li>
            <li className="flex gap-2">
              <span className="text-orange-500 font-bold mt-0.5">▲</span>
              元の公約方向に戻ろうとした努力があったかを評価します。
            </li>
          </ul>
        </div>
      </section>

      {/* Coding explanation */}
      <section className="mb-10">
        <SectionHeading
          title="コーディング・分類の方法"
        />
        <div className="space-y-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-3">政策分野分類</h3>
            <p className="text-sm text-slate-700 mb-2">
              公約・国会行動を以下の政策分野に分類します（複数分野にまたがる場合は主要分野を選択）：
            </p>
            <div className="flex flex-wrap gap-2">
              {['経済', '税制', '社会保障', '子育て・家族政策', 'エネルギー', '外交', '防衛・安全保障', '憲法', '政治改革', '地方創生'].map((area) => (
                <span key={area} className="text-xs bg-blue-50 text-blue-700 border border-blue-100 rounded px-2 py-0.5">
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-3">サリエンス（重要度）の判定基準</h3>
            <div className="space-y-2 text-sm text-slate-700">
              <div className="flex gap-3">
                <span className="font-medium text-slate-800 min-w-[60px]">高</span>
                <span>選挙の主要訴求点、マニフェストの冒頭に記載、メディア報道が多い、繰り返し言及されている</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-slate-800 min-w-[60px]">中</span>
                <span>政策パンフレットに記載されているが主要公約ではない</span>
              </div>
              <div className="flex gap-3">
                <span className="font-medium text-slate-800 min-w-[60px]">低</span>
                <span>比較的マイナーな政策分野、単発の言及</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Limitations */}
      <section className="mb-10">
        <SectionHeading title="限界・注意事項" />
        <div className="bg-slate-800 text-white rounded-xl p-6">
          <ul className="space-y-3 text-slate-300 text-sm">
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold mt-0.5">!</span>
              このサイトのデータは研究・デモ用の整理要約であり、完全な原典情報ではありません。
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold mt-0.5">!</span>
              スコアは簡略化されたモデルであり、専門的な政策評価の代替ではありません。
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold mt-0.5">!</span>
              デモデータは少数の議員のみカバーしており、代表性には限界があります。
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold mt-0.5">!</span>
              コーダー間の一致度・信頼性テストは現段階では実施されていません（デモ段階のため）。
            </li>
            <li className="flex gap-2">
              <span className="text-yellow-400 font-bold mt-0.5">!</span>
              政治家・政策の評価は文脈に依存します。スコアを単独で使用することは推奨しません。
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
