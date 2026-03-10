// ============================================================
// scoring.ts - Scoring result types
// ============================================================

import type { AlignmentLabel, ConfidenceLabel, IssueArea } from './domain';

export interface SubScores {
  mandateFidelity: number; // 公約追随度 (0-100)
  institutionalFeasibility: number; // 制度的実行可能性 (0-100)
  adaptiveJustification: number; // 適応的正当化 (0-100, shock関連時のみ意味あり)
}

export interface ScoreResult {
  politicianId: string;
  overallScore: number; // 総合スコア (0-100)
  subScores: SubScores;
  alignmentLabel: AlignmentLabel;
  confidenceLabel: ConfidenceLabel;
  issueAreaScores: Record<IssueArea, number>; // 政策分野別スコア
  hasShockContext: boolean;
  shockIds: string[];
}

export interface PromiseScore {
  promiseId: string;
  score: number;
  alignmentLabel: AlignmentLabel;
  confidence: ConfidenceLabel;
  relatedActionIds: string[];
  shockAdjusted: boolean;
}
