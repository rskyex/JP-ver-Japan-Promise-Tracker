// ============================================================
// matches.ts - 公約と行動のマッチング（整合評価）データ
// 注意: 整合評価はデモ用の分類です。断定的評価ではありません。
// ============================================================

import type { Match } from '@/types/domain';

export const matches: Match[] = [
  // ---- 岸田文雄 ----
  { id: 'm001', promiseId: 'pr001', actionId: 'a001', relation: '概ね整合', confidence: '中', rationaleJa: '新しい資本主義実行計画が閣議決定されたが、成長と分配の好循環の実現度については評価が分かれる。政策の方向性は維持されている。', scoreWeight: 0.7 },
  { id: 'm002', promiseId: 'pr002', actionId: 'a002', relation: '強く整合', confidence: '高', rationaleJa: '防衛費増額・安保3文書の閣議決定という直接的な政策実施があり、公約との整合性が高い。ウクライナ情勢という外部ショックが背景にある点も考慮。', scoreWeight: 0.9 },
  { id: 'm003', promiseId: 'pr003', actionId: 'a003', relation: '概ね整合', confidence: '中', rationaleJa: 'こども家庭庁設置・児童手当拡充など具体的な政策が実施されたが、「異次元」と表現された対策の効果については継続的な評価が必要。', scoreWeight: 0.7 },
  { id: 'm004', promiseId: 'pr004', actionId: 'a004', relation: '証拠が混在', confidence: '中', rationaleJa: 'GX推進法により脱炭素推進と原発活用方針が同時に示された。再エネ拡大は公約と整合するが、原発長期活用は一部の公約解釈とは整合しない面がある。', scoreWeight: 0.5 },
  { id: 'm005', promiseId: 'pr002', actionId: 'a005', relation: '概ね整合', confidence: '中', rationaleJa: '防衛費増税という形での財源確保は、防衛費増額公約の実施を示すが、増税手段について内部や世論の批判もある。', scoreWeight: 0.6 },

  // ---- 高市早苗 ----
  { id: 'm006', promiseId: 'pr005', actionId: 'a006', relation: '強く整合', confidence: '高', rationaleJa: '経済安全保障推進法の成立を直接主導しており、公約との整合性は高い。担当大臣として実質的な政策実現を果たした。', scoreWeight: 0.95 },
  { id: 'm007', promiseId: 'pr006', actionId: 'a007', relation: '概ね整合', confidence: '中', rationaleJa: '積極財政論の立場を予算委員会でも維持しており、一貫性は認められる。ただし与党政府としての財政政策には制約もある。', scoreWeight: 0.7 },
  { id: 'm008', promiseId: 'pr007', actionId: 'a008', relation: '概ね整合', confidence: '中', rationaleJa: '総裁選での憲法改正訴えは公約と整合するが、実際の党・政府の方針との関係では影響は限定的。', scoreWeight: 0.6 },

  // ---- 石破茂 ----
  { id: 'm009', promiseId: 'pr008', actionId: 'a009', relation: '概ね整合', confidence: '低', rationaleJa: '所信表明で地方創生を重点課題としたが、就任直後であり具体的な政策実施の評価はまだ限定的。', scoreWeight: 0.5 },
  { id: 'm010', promiseId: 'pr009', actionId: 'a010', relation: '証拠が混在', confidence: '中', rationaleJa: 'アジア版NATOという大胆な構想が現実の外交制約の中で修正される形となった。外交現実による政策の絞り込みと見られるが、公約からの距離が生じている。', scoreWeight: 0.4 },
  { id: 'm011', promiseId: 'pr010', actionId: 'a011', relation: '概ね整合', confidence: '中', rationaleJa: '政治資金規正法改正の審議に関与し公約の方向性は維持されているが、改正の実効性については評価が分かれる。', scoreWeight: 0.65 },

  // ---- 枝野幸男 ----
  { id: 'm012', promiseId: 'pr011', actionId: 'a012', relation: '強く整合', confidence: '高', rationaleJa: '安保法制廃止・立憲主義回復を繰り返し国会で主張しており、公約との一貫性は高い。', scoreWeight: 0.9 },
  { id: 'm013', promiseId: 'pr012', actionId: 'a014', relation: '概ね整合', confidence: '中', rationaleJa: '物価高騰対策として社会保障充実・消費税軽減を求めた行動は公約と整合するが、野党の立場では実現は限定的。', scoreWeight: 0.65 },
  { id: 'm014', promiseId: 'pr013', actionId: 'a013', relation: '証拠不十分', confidence: '低', rationaleJa: '代表辞任前後でエネルギー政策に関する直接的な国会活動の記録が限定的。', scoreWeight: 0.3 },

  // ---- 泉健太 ----
  { id: 'm015', promiseId: 'pr014', actionId: 'a015', relation: '概ね整合', confidence: '中', rationaleJa: '子育て支援を野党の立場で継続して質疑追及している。与党への転換はないが一貫した主張が見られる。', scoreWeight: 0.7 },
  { id: 'm016', promiseId: 'pr015', actionId: 'a016', relation: '概ね整合', confidence: '中', rationaleJa: 'インフレ状況のもとで消費税時限減税を改めて主張しており、公約との整合性は認められる。', scoreWeight: 0.7 },

  // ---- 玉木雄一郎 ----
  { id: 'm017', promiseId: 'pr016', actionId: 'a017', relation: '強く整合', confidence: '高', rationaleJa: '103万円の壁引き上げを国会質疑・与党交渉の両面で積極的に追求しており、公約との整合性が高い。', scoreWeight: 0.9 },
  { id: 'm018', promiseId: 'pr017', actionId: 'a018', relation: '概ね整合', confidence: '中', rationaleJa: 'トリガー条項凍結解除の実現に向けた取り組みが確認できる。交渉の結果は現在進行中。', scoreWeight: 0.65 },

  // ---- 山口那津男 ----
  { id: 'm019', promiseId: 'pr018', actionId: 'a019', relation: '概ね整合', confidence: '中', rationaleJa: '児童手当拡充について与党内から推進した行動が見られ、公約の方向性と整合する。', scoreWeight: 0.7 },

  // ---- 志位和夫 ----
  { id: 'm020', promiseId: 'pr020', actionId: 'a020', relation: '強く整合', confidence: '高', rationaleJa: '消費税廃止・最低賃金引き上げを国会質疑で一貫して主張しており、公約との整合性は非常に高い。野党の立場では実現は困難だが、姿勢の一貫性は明確。', scoreWeight: 0.9 },

  // ---- 福島みずほ ----
  { id: 'm021', promiseId: 'pr019', actionId: 'a021', relation: '強く整合', confidence: '高', rationaleJa: '護憲・非核三原則法制化を憲法審査会で一貫して主張しており、公約との整合性が高い。', scoreWeight: 0.9 },
];
