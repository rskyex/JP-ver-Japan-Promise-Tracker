// ============================================================
// filters.ts - Filter types for politicians list
// ============================================================

import type { Chamber, GovernmentStatus, IssueArea, AlignmentLabel } from './domain';

export interface PoliticianFilters {
  query: string; // 名前・かな・選挙区・政党
  partyIds: string[];
  chamber: Chamber | '';
  issueAreas: IssueArea[];
  alignmentBands: AlignmentLabel[];
  minTermsServed: number; // デフォルト 2
  governmentStatus: GovernmentStatus | '';
  isCurrentOnly: boolean;
}

export const DEFAULT_FILTERS: PoliticianFilters = {
  query: '',
  partyIds: [],
  chamber: '',
  issueAreas: [],
  alignmentBands: [],
  minTermsServed: 2, // 初期は2期以上ON
  governmentStatus: '',
  isCurrentOnly: true,
};
