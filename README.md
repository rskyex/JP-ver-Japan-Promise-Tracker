# Japan Promise Tracker | 国会議員公約トラッカー

> 日本の国会議員の選挙公約と国会行動の整合性を可視化する、
> 研究・透明性・シビックテックプロトタイプ

---

## プロジェクト概要

**Japan Promise Tracker** は、日本の国会議員について、

- 選挙時に掲げた**公約**
- 国会における**発言・質問・提出行動・委員会活動**
- それらの**整合性**
- 戦争・金融危機・パンデミック・自然災害・エネルギー危機などの**外部ショックによる政策転換の説明可能性**

を結びつけて、証拠ベースで可視化する、**研究・デモ・ポートフォリオ用のシビックテック / 政策透明性プロトタイプ**です。

---

## なぜこのサイトを作ったか

民主主義の健全な機能には、市民が政治家の約束と行動を継続的に追跡できる透明性が必要です。
このサイトは、日本の国会議員の公約追随度を構造的・定量的に可視化する試みであり、
政策研究・シビックテック・ポートフォリオデモの文脈で構築されています。

**重要な注意事項：** このサイトは、議員や政党に対する断定的・攻撃的評価を示すものではありません。
スコアや分類は、学術的に慎重で・説明可能な・透明性指標として設計されています。

---

## 使用技術

| 技術 | 用途 |
|------|------|
| **Next.js 16** (App Router) | フルスタックフレームワーク |
| **React 19** | UIライブラリ |
| **TypeScript** | 型安全なコード |
| **Tailwind CSS v4** | スタイリング |
| **Recharts** | グラフ・チャート |
| **lucide-react** | アイコン |
| **ローカル TS ファイル** | シードデータ (デモ) |

---

## 起動方法

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build
npm run start
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

---

## ファイル構成

```
├── app/
│   ├── page.tsx                       # ホームページ
│   ├── politicians/page.tsx            # 議員一覧（サーバー）
│   ├── politicians/PoliticiansClient.tsx # 議員一覧（クライアント: 検索・フィルタ）
│   ├── politicians/[id]/page.tsx       # 議員詳細
│   ├── promises/[id]/page.tsx          # 公約詳細
│   ├── methodology/page.tsx            # 方法論
│   ├── sources/page.tsx                # 出典
│   ├── globals.css                     # グローバルスタイル
│   └── layout.tsx
├── components/
│   ├── ui/          # 汎用UIコンポーネント（バッジ・カード・タイムライン等）
│   ├── charts/      # Rechartsグラフ（レーダー・分布・内訳）
│   ├── layout/      # Navbar, Footer
│   ├── politicians/ # 議員カード・テーブル・検索・フィルタ
│   └── promises/    # 公約カード
├── data/
│   ├── politicians.ts   ← デモシードデータ（実データに置換予定）
│   ├── promises.ts      ← デモシードデータ
│   ├── actions.ts       ← デモシードデータ
│   ├── matches.ts       ← デモシードデータ
│   ├── shocks.ts        ← デモシードデータ
│   └── parties.ts       ← デモシードデータ
├── lib/
│   ├── scoring.ts       # スコアリングロジック
│   ├── filtering.ts     # フィルタリングロジック
│   ├── labels.ts        # ラベル・色定義
│   ├── stats.ts         # サイト統計
│   ├── shocks.ts        # ショック関連ユーティリティ
│   ├── normalize.ts     # データ変換ユーティリティ
│   ├── repositories/
│   │   ├── demoRepository.ts  ← ここを realRepository.ts に置換
│   │   └── types.ts           # Repository インターフェース
│   ├── adapters/README.md     # 外部API接続ガイド
│   └── ingestion/README.md    # データ取り込みガイド
└── types/
    ├── domain.ts    # ドメイン型定義
    ├── scoring.ts   # スコア型定義
    └── filters.ts   # フィルタ型定義
```

---

## デモデータの場所

シードデータは `data/` ディレクトリに格納されています。

- `data/politicians.ts` — 12名の議員デモデータ
- `data/promises.ts` — 20件の公約デモデータ（整理要約）
- `data/actions.ts` — 24件の国会行動デモデータ（整理要約）
- `data/matches.ts` — 21件の公約×行動マッチングデータ
- `data/shocks.ts` — 5件の外部ショックデータ
- `data/parties.ts` — 8政党データ

---

## 将来、実データに置き換える場所

### 1. Repository 層の差し替え

```typescript
// lib/repositories/demoRepository.ts → realRepository.ts に差し替え
// pages では以下のように呼ぶだけ
import { demoRepository } from '@/lib/repositories/demoRepository';
// ↓ 差し替え後
import { realRepository } from '@/lib/repositories/realRepository';
```

### 2. 接続すべき主要データソース

| データソース | 用途 |
|-------------|------|
| 国会会議録検索API (NDL) | `actions` の実データ |
| 衆議院議員名鑑 | `politicians` の全件 |
| 参議院議員名鑑 | 同上 |
| 政党マニフェストページ | `promises` の実データ |
| 法案提出・賛否データ | `actions` への追加 |
| 委員会所属データ | `politicians.committeeTags` |

詳細は `lib/adapters/README.md` と `lib/ingestion/README.md` を参照してください。

---

## 2期以上の全議員に拡張するには

1. **`lib/ingestion/politician-ingestion.ts`** を実装し、衆参両院の議員名鑑APIに接続
2. `termsServed >= 2` のフィルタは `DEFAULT_FILTERS` (types/filters.ts) で制御
3. `demoRepository.ts` → `realRepository.ts` に差し替え
4. GitHub Actions等でデータを定期更新するCronジョブを設定

---

## スコアリングの仕組み

スコアリングの詳細は [方法論ページ](/methodology) および `lib/scoring.ts` を参照してください。

**総合スコア計算式（ショックあり）：**
```
総合スコア = (公約追随度 × 0.50) + (制度的実行可能性 × 0.20) + (適応的正当化 × 0.30)
```

**総合スコア計算式（ショックなし）：**
```
総合スコア = (公約追随度 × 0.65) + (制度的実行可能性 × 0.35)
```

---

## 注意事項

1. **このサイトはデモ・研究プロトタイプです。** 完全な政策評価ツールではありません。
2. **発言の抜粋は「整理要約」「デモ要約」です。** 逐語引用ではありません。
3. **スコアは簡略化を含む参考指標です。** 単独での判断材料として使用しないでください。
4. **実在の議員名を使用していますが、** 断定的・攻撃的評価を示すものではありません。
5. **原典の確認は一次資料（国会会議録等）で行ってください。**
6. **デモデータは少数の議員のみカバー**しており、全体的な代表性はありません。

---

## 著作権表示

```
This project and its design are created by Risa Koyanagi.
All rights reserved unless otherwise specified.
```

Japan Promise Tracker — シビックテック・政策研究プロトタイプ
© 2024–2026 Risa Koyanagi

---

## ライセンス

本プロジェクトのデザイン・コードは Risa Koyanagi によって作成されました。
研究・教育・ポートフォリオ目的での参照は歓迎しますが、
商業利用・再配布については別途ご相談ください。
