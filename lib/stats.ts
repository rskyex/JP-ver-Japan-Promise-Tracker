// ============================================================
// stats.ts - サイト全体統計データ
// ============================================================

import type { ScoreResult } from '@/types/scoring';
import type { AlignmentLabel } from '@/types/domain';

export interface SiteStats {
  totalPoliticians: number;
  totalPromises: number;
  totalActions: number;
  totalEvidence: number;
  alignmentDistribution: Record<AlignmentLabel, number>;
  avgOverallScore: number;
}

export function calcSiteStats(
  politicianCount: number,
  promiseCount: number,
  actionCount: number,
  matchCount: number,
  scores: ScoreResult[]
): SiteStats {
  const distribution: Record<AlignmentLabel, number> = {
    '強く整合': 0,
    '概ね整合': 0,
    '一部整合': 0,
    '証拠が混在': 0,
    '弱い整合': 0,
    '矛盾する証拠あり': 0,
    '証拠不十分': 0,
  };

  let totalScore = 0;
  for (const score of scores) {
    distribution[score.alignmentLabel] = (distribution[score.alignmentLabel] || 0) + 1;
    totalScore += score.overallScore;
  }

  return {
    totalPoliticians: politicianCount,
    totalPromises: promiseCount,
    totalActions: actionCount,
    totalEvidence: matchCount,
    alignmentDistribution: distribution,
    avgOverallScore: scores.length > 0 ? Math.round(totalScore / scores.length) : 0,
  };
}

export function calcPartyAverageScores(
  scores: ScoreResult[],
  politicianPartyMap: Record<string, string>
): Record<string, number> {
  const partyTotals: Record<string, { sum: number; count: number }> = {};

  for (const score of scores) {
    const partyId = politicianPartyMap[score.politicianId];
    if (!partyId) continue;
    if (!partyTotals[partyId]) partyTotals[partyId] = { sum: 0, count: 0 };
    partyTotals[partyId].sum += score.overallScore;
    partyTotals[partyId].count += 1;
  }

  const result: Record<string, number> = {};
  for (const [partyId, data] of Object.entries(partyTotals)) {
    result[partyId] = Math.round(data.sum / data.count);
  }
  return result;
}
