// ============================================================
// domain.ts - Core domain types for Japan Promise Tracker
// ============================================================

export type Chamber = '衆議院' | '参議院';
export type GovernmentStatus = '与党' | '野党' | '中立';
export type IssueArea =
  | '経済'
  | '税制'
  | '社会保障'
  | '子育て・家族政策'
  | 'エネルギー'
  | '外交'
  | '防衛・安全保障'
  | '憲法'
  | '政治改革'
  | '地方創生'
  | 'その他';

export type ActionType =
  | '質問主意書'
  | '国会質問'
  | '法案提出'
  | '委員会発言'
  | '声明・談話'
  | '賛成票'
  | '反対票'
  | '棄権'
  | '党内活動'
  | 'その他';

export type Stance = '支持' | '反対' | '中立' | '修正支持';
export type PromiseType = '政策公約' | '選挙公約' | 'マニフェスト' | '所信表明';
export type ShockCategory =
  | '戦争・安全保障危機'
  | '金融危機'
  | 'インフレ'
  | 'パンデミック'
  | '自然災害'
  | 'エネルギー危機'
  | '政治危機';

export interface Party {
  id: string;
  name: string;
  abbreviation: string;
  ideologyLabel: string;
  colorToken: string; // Tailwind color class or hex
}

export interface Politician {
  id: string;
  name: string;
  nameJa: string;
  nameKana: string;
  nameRomaji: string;
  partyId: string;
  chamber: Chamber;
  district: string;
  house: Chamber;
  termsServed: number;
  isCurrent: boolean;
  profileImage?: string;
  bio: string;
  issueTags: IssueArea[];
  committeeTags: string[];
  leadershipRoles: string[];
  governmentStatus: GovernmentStatus;
}

export interface Promise {
  id: string;
  politicianId: string;
  electionYear: number;
  title: string;
  rawTextJa: string;
  summaryJa: string;
  issueArea: IssueArea;
  salience: 'high' | 'medium' | 'low'; // 公約の重要度
  promiseType: PromiseType;
  sourceLabel: string;
  sourceUrl?: string;
  isCuratedDemoText: boolean; // デモ用に整理された文章かどうか
}

export interface Action {
  id: string;
  politicianId: string;
  date: string; // ISO 8601 date string
  actionType: ActionType;
  title: string;
  excerptJa: string;
  summaryJa: string;
  issueArea: IssueArea;
  stance?: Stance;
  sourceLabel: string;
  sourceUrl?: string;
  institutionContext?: string; // e.g. "予算委員会"
  isCuratedExcerpt: boolean; // デモ用整理要約かどうか
}

export interface Match {
  id: string;
  promiseId: string;
  actionId: string;
  relation: AlignmentLabel;
  confidence: ConfidenceLabel;
  rationaleJa: string; // 判定理由（日本語）
  scoreWeight: number; // 0.0 to 1.0
}

export interface Shock {
  id: string;
  title: string;
  category: ShockCategory;
  startDate: string; // ISO 8601
  endDate?: string; // null = ongoing
  affectedIssueAreas: IssueArea[];
  severity: 'critical' | 'major' | 'moderate';
  explanationJa: string;
}

// Alignment and confidence label types (also in scoring.ts)
export type AlignmentLabel =
  | '強く整合'
  | '概ね整合'
  | '一部整合'
  | '証拠が混在'
  | '弱い整合'
  | '矛盾する証拠あり'
  | '証拠不十分';

export type ConfidenceLabel = '高' | '中' | '低';
