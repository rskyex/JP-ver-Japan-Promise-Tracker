// ============================================================
// scoring.ts - 透明なスコアリングロジック（デモ用）
//
// スコア計算式：
//   総合スコア = (公約追随度 × 0.50) + (制度的実行可能性 × 0.20) + (適応的正当化 × 0.30)
//   ただし、ショック関連なしの場合は適応的正当化を50とし、以下の式：
//   総合スコア = (公約追随度 × 0.65) + (制度的実行可能性 × 0.35)
//
// このスコアは参考的・説明可能な透明性指標です。断定的評価ではありません。
// ============================================================

import type { Politician, Promise as PromiseItem, Action, Match, Shock, IssueArea } from '@/types/domain';
import type { ScoreResult, SubScores } from '@/types/scoring';
import {
  ALIGNMENT_SCORE_MAP,
  scoreToAlignmentLabel,
  confidenceToScore,
} from './labels';

// ---- 公約追随度（Mandate Fidelity）: 0–100 ----
// 公約と行動のマッチングデータをもとに計算
export function calcMandateFidelity(
  promises: PromiseItem[],
  matches: Match[]
): number {
  if (promises.length === 0) return 50; // データ不足時のデフォルト

  let totalWeight = 0;
  let weightedScore = 0;

  for (const promise of promises) {
    const relatedMatches = matches.filter((m) => m.promiseId === promise.id);

    // salienceによる重みづけ
    const salienceWeight = promise.salience === 'high' ? 1.5 : promise.salience === 'medium' ? 1.0 : 0.7;

    if (relatedMatches.length === 0) {
      // 関連する行動なし → 証拠不十分として扱う
      weightedScore += 30 * salienceWeight;
      totalWeight += salienceWeight;
    } else {
      for (const match of relatedMatches) {
        const alignmentScore = ALIGNMENT_SCORE_MAP[match.relation];
        const confidenceMultiplier = confidenceToScore(match.confidence);
        const score = alignmentScore * confidenceMultiplier;
        const weight = salienceWeight * match.scoreWeight;

        weightedScore += score * weight;
        totalWeight += weight;
      }
    }
  }

  return totalWeight === 0 ? 50 : Math.round(weightedScore / totalWeight);
}

// ---- 制度的実行可能性（Institutional Feasibility）: 0–100 ----
// 議員が制度的に実行できる立場にあるかを評価
export function calcInstitutionalFeasibility(
  politician: Politician,
  actions: Action[],
  promises: PromiseItem[]
): number {
  let score = 50; // ベース

  // 与党ボーナス
  if (politician.governmentStatus === '与党') score += 20;
  if (politician.governmentStatus === '野党') score -= 10;

  // 役職ボーナス
  if (politician.leadershipRoles.length > 0) score += 15;

  // 行動の種類の多様性ボーナス
  const actionTypes = new Set(actions.map((a) => a.actionType));
  if (actionTypes.size >= 3) score += 5;
  if (actionTypes.size >= 5) score += 5;

  // 公約に関連する行動の存在
  const relevantActionRate = promises.length > 0
    ? Math.min(actions.length / (promises.length * 2), 1)
    : 0.5;
  score += relevantActionRate * 15;

  return Math.min(100, Math.max(0, Math.round(score)));
}

// ---- 適応的正当化（Adaptive Justification）: 0–100 ----
// ショック・危機文脈でのずれの説明度を評価
export function calcAdaptiveJustification(
  promises: PromiseItem[],
  matches: Match[],
  shocks: Shock[]
): { score: number; hasShockContext: boolean; shockIds: string[] } {
  if (shocks.length === 0) {
    return { score: 50, hasShockContext: false, shockIds: [] };
  }

  // 関連ショックの特定
  const promiseIssues = new Set(promises.map((p) => p.issueArea));
  const relevantShocks = shocks.filter((s) =>
    s.affectedIssueAreas.some((area) => promiseIssues.has(area))
  );

  if (relevantShocks.length === 0) {
    return { score: 50, hasShockContext: false, shockIds: [] };
  }

  // ショック関連の整合マッチングを確認
  const conflictMatches = matches.filter(
    (m) => m.relation === '矛盾する証拠あり' || m.relation === '証拠が混在'
  );

  // 基本スコア（説明なし前提）
  let adjustmentScore = 50;

  // ショックの重大度によるベース調整
  const criticalShocks = relevantShocks.filter((s) => s.severity === 'critical');
  if (criticalShocks.length > 0) adjustmentScore += 10;

  // 矛盾的行動がある場合の減点
  adjustmentScore -= conflictMatches.length * 5;

  // ショック数に応じた加点（多くの危機に直面した場合）
  adjustmentScore += Math.min(relevantShocks.length * 3, 15);

  return {
    score: Math.min(100, Math.max(0, Math.round(adjustmentScore))),
    hasShockContext: true,
    shockIds: relevantShocks.map((s) => s.id),
  };
}

// ---- 政策分野別スコア ----
export function calcIssueAreaScores(
  promises: PromiseItem[],
  matches: Match[]
): Partial<Record<IssueArea, number>> {
  const issueScores: Partial<Record<IssueArea, { total: number; count: number }>> = {};

  for (const promise of promises) {
    const area = promise.issueArea;
    const relatedMatches = matches.filter((m) => m.promiseId === promise.id);

    if (!issueScores[area]) {
      issueScores[area] = { total: 0, count: 0 };
    }

    if (relatedMatches.length > 0) {
      for (const match of relatedMatches) {
        const alignmentScore = ALIGNMENT_SCORE_MAP[match.relation];
        issueScores[area]!.total += alignmentScore;
        issueScores[area]!.count += 1;
      }
    } else {
      issueScores[area]!.total += 30;
      issueScores[area]!.count += 1;
    }
  }

  const result: Partial<Record<IssueArea, number>> = {};
  for (const [area, data] of Object.entries(issueScores)) {
    result[area as IssueArea] = Math.round(data.total / data.count);
  }
  return result;
}

// ---- 総合スコア計算 ----
export function calcOverallScore(
  politician: Politician,
  promises: PromiseItem[],
  actions: Action[],
  matches: Match[],
  shocks: Shock[]
): ScoreResult {
  const mandateFidelity = calcMandateFidelity(promises, matches);
  const institutionalFeasibility = calcInstitutionalFeasibility(politician, actions, promises);
  const { score: adaptiveJustification, hasShockContext, shockIds } =
    calcAdaptiveJustification(promises, matches, shocks);

  const subScores: SubScores = {
    mandateFidelity,
    institutionalFeasibility,
    adaptiveJustification,
  };

  // 総合スコア計算
  // ショックあり: 公約追随度50% + 制度的実行可能性20% + 適応的正当化30%
  // ショックなし: 公約追随度65% + 制度的実行可能性35%
  let overallScore: number;
  if (hasShockContext) {
    overallScore =
      mandateFidelity * 0.5 +
      institutionalFeasibility * 0.2 +
      adaptiveJustification * 0.3;
  } else {
    overallScore =
      mandateFidelity * 0.65 +
      institutionalFeasibility * 0.35;
  }
  overallScore = Math.round(overallScore);

  const issueAreaScores = calcIssueAreaScores(promises, matches) as Record<IssueArea, number>;

  // 信頼度ラベルの計算（データ量・整合性の高さに基づく）
  const matchCount = matches.length;
  const highConfMatches = matches.filter((m) => m.confidence === '高').length;
  const confidenceRatio = matchCount > 0 ? highConfMatches / matchCount : 0;

  let confidenceLabel: '高' | '中' | '低';
  if (matchCount >= 3 && confidenceRatio >= 0.5) {
    confidenceLabel = '高';
  } else if (matchCount >= 2) {
    confidenceLabel = '中';
  } else {
    confidenceLabel = '低';
  }

  return {
    politicianId: politician.id,
    overallScore,
    subScores,
    alignmentLabel: scoreToAlignmentLabel(overallScore),
    confidenceLabel,
    issueAreaScores,
    hasShockContext,
    shockIds,
  };
}
