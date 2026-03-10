// ============================================================
// types.ts - Repository インターフェース定義
//
// 将来 realRepository に差し替える際は、この型を実装してください。
// ============================================================

import type { Politician, Promise as PromiseItem, Action, Match, Shock, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import type { PoliticianFilters } from '@/types/filters';

export interface Repository {
  // 議員
  getAllPoliticians(): Promise<Politician[]>;
  getPoliticianById(id: string): Promise<Politician | undefined>;
  filterPoliticians(filters: PoliticianFilters): Promise<Politician[]>;

  // 公約
  getAllPromises(): Promise<PromiseItem[]>;
  getPromiseById(id: string): Promise<PromiseItem | undefined>;
  getPromisesByPoliticianId(politicianId: string): Promise<PromiseItem[]>;

  // 行動
  getAllActions(): Promise<Action[]>;
  getActionsByPoliticianId(politicianId: string): Promise<Action[]>;
  getActionsByPromiseId(promiseId: string): Promise<Action[]>;

  // マッチ
  getAllMatches(): Promise<Match[]>;
  getMatchesByPoliticianId(politicianId: string): Promise<Match[]>;
  getMatchesByPromiseId(promiseId: string): Promise<Match[]>;

  // ショック
  getAllShocks(): Promise<Shock[]>;

  // 政党
  getAllParties(): Promise<Party[]>;
  getPartyById(id: string): Promise<Party | undefined>;

  // スコア
  getScoreByPoliticianId(politicianId: string): Promise<ScoreResult | undefined>;
  getAllScores(): Promise<ScoreResult[]>;
}
