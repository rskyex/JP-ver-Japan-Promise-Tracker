# Adapters

このディレクトリは、外部データソースから内部データ型への変換アダプターを格納します。

## 将来追加予定のアダプター

### kokkai-adapter.ts
- **対象**: 国会会議録検索API (https://kokkai.ndl.go.jp/api.html)
- **変換**: API レスポンス → `Action[]`
- **備考**: APIから取得した発言・質問データをActionエンティティに変換する

### shugiin-adapter.ts
- **対象**: 衆議院 議員情報ページ / 名鑑
- **変換**: スクレイピングデータ → `Politician[]`
- **備考**: 議員名・選挙区・当選回数・委員会所属の取得

### sangiin-adapter.ts
- **対象**: 参議院 議員情報ページ / 名鑑
- **変換**: スクレイピングデータ → `Politician[]`

### manifesto-adapter.ts
- **対象**: 各政党のマニフェストページ
- **変換**: 政策文書 → `Promise[]`
- **備考**: テキスト分類後にissueAreaを付与するパイプラインが必要

## 使い方

アダプターは `Repository` インターフェースを実装した `realRepository.ts` から呼び出すことを想定しています。

```typescript
// realRepository.ts (将来実装)
import { fetchKokkaiActions } from './adapters/kokkai-adapter';

export const realRepository: Repository = {
  async getActionsByPoliticianId(politicianId) {
    return fetchKokkaiActions({ speakerName: politicianId });
  },
  // ...
};
```
