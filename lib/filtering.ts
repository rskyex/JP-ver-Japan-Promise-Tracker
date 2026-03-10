// ============================================================
// filtering.ts - 議員フィルタリングロジック
// ============================================================

import type { Politician } from '@/types/domain';
import type { PoliticianFilters } from '@/types/filters';
import type { ScoreResult } from '@/types/scoring';

export function filterPoliticians(
  politicians: Politician[],
  scores: Record<string, ScoreResult>,
  filters: PoliticianFilters
): Politician[] {
  return politicians.filter((p) => {
    // 当選回数フィルタ（デフォルト2期以上）
    if (filters.minTermsServed > 0 && p.termsServed < filters.minTermsServed) {
      return false;
    }

    // 現職フィルタ
    if (filters.isCurrentOnly && !p.isCurrent) {
      return false;
    }

    // 政党フィルタ
    if (filters.partyIds.length > 0 && !filters.partyIds.includes(p.partyId)) {
      return false;
    }

    // 院フィルタ
    if (filters.chamber && p.chamber !== filters.chamber) {
      return false;
    }

    // 与野党フィルタ
    if (filters.governmentStatus && p.governmentStatus !== filters.governmentStatus) {
      return false;
    }

    // issue area フィルタ
    if (
      filters.issueAreas.length > 0 &&
      !filters.issueAreas.some((area) => p.issueTags.includes(area))
    ) {
      return false;
    }

    // 整合バンドフィルタ
    if (filters.alignmentBands.length > 0) {
      const score = scores[p.id];
      if (!score || !filters.alignmentBands.includes(score.alignmentLabel)) {
        return false;
      }
    }

    // テキスト検索（名前・かな・ローマ字・選挙区・政党名対応）
    if (filters.query.trim()) {
      const q = filters.query.trim().toLowerCase();
      const searchTargets = [
        p.name,
        p.nameJa,
        p.nameKana,
        p.nameRomaji.toLowerCase(),
        p.district,
        p.partyId,
      ].join(' ').toLowerCase();
      if (!searchTargets.includes(q)) {
        return false;
      }
    }

    return true;
  });
}
