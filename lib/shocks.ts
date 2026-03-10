// ============================================================
// shocks.ts - ショック関連ユーティリティ
// ============================================================

import type { Shock, IssueArea } from '@/types/domain';

// 特定の政策分野に関連するショックを取得
export function getRelevantShocks(shocks: Shock[], issueAreas: IssueArea[]): Shock[] {
  return shocks.filter((shock) =>
    shock.affectedIssueAreas.some((area) => issueAreas.includes(area))
  );
}

// ショックの期間内の日付かどうか
export function isDateInShock(dateStr: string, shock: Shock): boolean {
  const date = new Date(dateStr);
  const start = new Date(shock.startDate);
  const end = shock.endDate ? new Date(shock.endDate) : new Date();
  return date >= start && date <= end;
}

// 特定の日付・分野に関連するショックを取得
export function getShocksForAction(
  shocks: Shock[],
  dateStr: string,
  issueArea: IssueArea
): Shock[] {
  return shocks.filter(
    (shock) =>
      shock.affectedIssueAreas.includes(issueArea) &&
      isDateInShock(dateStr, shock)
  );
}

// ショックカテゴリの日本語アイコン
export function shockCategoryIcon(category: string): string {
  switch (category) {
    case '戦争・安全保障危機': return '⚠️';
    case '金融危機': return '📉';
    case 'インフレ': return '💹';
    case 'パンデミック': return '🦠';
    case '自然災害': return '🌊';
    case 'エネルギー危機': return '⚡';
    case '政治危機': return '🏛️';
    default: return '📌';
  }
}

// ショック重大度の日本語
export function shockSeverityJa(severity: string): string {
  switch (severity) {
    case 'critical': return '非常に重大';
    case 'major': return '重大';
    case 'moderate': return '中程度';
    default: return severity;
  }
}
