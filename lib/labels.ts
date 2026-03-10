// ============================================================
// labels.ts - ラベル・色・表示用ユーティリティ
// ============================================================

import type { AlignmentLabel, ConfidenceLabel } from '@/types/domain';

export const ALIGNMENT_LABELS: AlignmentLabel[] = [
  '強く整合',
  '概ね整合',
  '一部整合',
  '証拠が混在',
  '弱い整合',
  '矛盾する証拠あり',
  '証拠不十分',
];

export const CONFIDENCE_LABELS: ConfidenceLabel[] = ['高', '中', '低'];

// 整合ラベルのスコア変換マップ（0–100）
export const ALIGNMENT_SCORE_MAP: Record<AlignmentLabel, number> = {
  '強く整合': 90,
  '概ね整合': 70,
  '一部整合': 55,
  '証拠が混在': 45,
  '弱い整合': 35,
  '矛盾する証拠あり': 20,
  '証拠不十分': 30,
};

// スコアから整合ラベルへの変換
export function scoreToAlignmentLabel(score: number): AlignmentLabel {
  if (score >= 85) return '強く整合';
  if (score >= 65) return '概ね整合';
  if (score >= 50) return '一部整合';
  if (score >= 40) return '証拠が混在';
  if (score >= 30) return '弱い整合';
  if (score >= 15) return '矛盾する証拠あり';
  return '証拠不十分';
}

// 整合ラベルのTailwind色クラス
export function alignmentLabelColor(label: AlignmentLabel): {
  bg: string;
  text: string;
  border: string;
} {
  switch (label) {
    case '強く整合':
      return { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-300' };
    case '概ね整合':
      return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' };
    case '一部整合':
      return { bg: 'bg-lime-100', text: 'text-lime-800', border: 'border-lime-300' };
    case '証拠が混在':
      return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' };
    case '弱い整合':
      return { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' };
    case '矛盾する証拠あり':
      return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' };
    case '証拠不十分':
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-300' };
  }
}

// 信頼度ラベルの色
export function confidenceLabelColor(label: ConfidenceLabel): {
  bg: string;
  text: string;
} {
  switch (label) {
    case '高':
      return { bg: 'bg-blue-100', text: 'text-blue-800' };
    case '中':
      return { bg: 'bg-indigo-100', text: 'text-indigo-700' };
    case '低':
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-600' };
  }
}

// スコアのカラーバー色（Tailwind）
export function scoreBarColor(score: number): string {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 65) return 'bg-green-500';
  if (score >= 50) return 'bg-yellow-500';
  if (score >= 35) return 'bg-orange-500';
  return 'bg-red-500';
}

// 信頼度スコアへの変換
export function confidenceToScore(label: ConfidenceLabel): number {
  switch (label) {
    case '高': return 1.0;
    case '中': return 0.7;
    case '低': return 0.4;
  }
}
