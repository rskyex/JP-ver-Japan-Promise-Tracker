// ============================================================
// demoRepository.ts - ローカルデータを使うデモ用Repository
//
// 将来の実データへの移行方針:
// - 国会会議録検索API: actions の実データ取得
// - 衆議院議員名鑑API: politicians の全件取得
// - 参議院議員名鑑API: 同上
// - 政党政策ページ（スクレイピング）: promises の実データ取得
// 実際の差し替えは realRepository.ts を作成して、
// このファイルを置き換える or DI で切り替えてください。
// ============================================================

import { politicians } from '@/data/politicians';
import { promises as promisesData } from '@/data/promises';
import { actions as actionsData } from '@/data/actions';
import { matches as matchesData } from '@/data/matches';
import { shocks as shocksData } from '@/data/shocks';
import { parties as partiesData } from '@/data/parties';
import { calcOverallScore } from '@/lib/scoring';
import { filterPoliticians } from '@/lib/filtering';
import type { Repository } from './types';
import type { Politician, Promise as PromiseItem, Action, Match, Shock, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import type { PoliticianFilters } from '@/types/filters';

// スコアをキャッシュ（シングルトン）
let _scoreCache: Record<string, ScoreResult> | null = null;

function buildScoreCache(): Record<string, ScoreResult> {
  if (_scoreCache) return _scoreCache;

  _scoreCache = {};
  for (const politician of politicians) {
    const pPromises = promisesData.filter((p) => p.politicianId === politician.id);
    const pActions = actionsData.filter((a) => a.politicianId === politician.id);
    const pMatches = matchesData.filter((m) =>
      pPromises.some((p) => p.id === m.promiseId)
    );
    _scoreCache[politician.id] = calcOverallScore(
      politician,
      pPromises,
      pActions,
      pMatches,
      shocksData
    );
  }
  return _scoreCache;
}

export const demoRepository: Repository = {
  // ---- 議員 ----
  async getAllPoliticians(): Promise<Politician[]> {
    return politicians;
  },

  async getPoliticianById(id: string): Promise<Politician | undefined> {
    return politicians.find((p) => p.id === id);
  },

  async filterPoliticians(filters: PoliticianFilters): Promise<Politician[]> {
    const scores = buildScoreCache();
    return filterPoliticians(politicians, scores, filters);
  },

  // ---- 公約 ----
  async getAllPromises(): Promise<PromiseItem[]> {
    return promisesData;
  },

  async getPromiseById(id: string): Promise<PromiseItem | undefined> {
    return promisesData.find((p) => p.id === id);
  },

  async getPromisesByPoliticianId(politicianId: string): Promise<PromiseItem[]> {
    return promisesData.filter((p) => p.politicianId === politicianId);
  },

  // ---- 行動 ----
  async getAllActions(): Promise<Action[]> {
    return actionsData;
  },

  async getActionsByPoliticianId(politicianId: string): Promise<Action[]> {
    return actionsData.filter((a) => a.politicianId === politicianId);
  },

  async getActionsByPromiseId(promiseId: string): Promise<Action[]> {
    const matches = matchesData.filter((m) => m.promiseId === promiseId);
    const actionIds = new Set(matches.map((m) => m.actionId));
    return actionsData.filter((a) => actionIds.has(a.id));
  },

  // ---- マッチ ----
  async getAllMatches(): Promise<Match[]> {
    return matchesData;
  },

  async getMatchesByPoliticianId(politicianId: string): Promise<Match[]> {
    const pPromises = promisesData.filter((p) => p.politicianId === politicianId);
    const promiseIds = new Set(pPromises.map((p) => p.id));
    return matchesData.filter((m) => promiseIds.has(m.promiseId));
  },

  async getMatchesByPromiseId(promiseId: string): Promise<Match[]> {
    return matchesData.filter((m) => m.promiseId === promiseId);
  },

  // ---- ショック ----
  async getAllShocks(): Promise<Shock[]> {
    return shocksData;
  },

  // ---- 政党 ----
  async getAllParties(): Promise<Party[]> {
    return partiesData;
  },

  async getPartyById(id: string): Promise<Party | undefined> {
    return partiesData.find((p) => p.id === id);
  },

  // ---- スコア ----
  async getScoreByPoliticianId(politicianId: string): Promise<ScoreResult | undefined> {
    const cache = buildScoreCache();
    return cache[politicianId];
  },

  async getAllScores(): Promise<ScoreResult[]> {
    const cache = buildScoreCache();
    return Object.values(cache);
  },
};
