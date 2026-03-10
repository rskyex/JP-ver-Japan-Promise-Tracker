// ============================================================
// normalize.ts - データ正規化ユーティリティ
// ============================================================

// 日付フォーマット（日本語表記）
export function formatDateJa(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// 日付の年月表示
export function formatYearMonthJa(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${d.getFullYear()}年${d.getMonth() + 1}月`;
}

// スコアの文字列表示
export function formatScore(score: number): string {
  return `${score}点`;
}

// salience の日本語表示
export function salienceJa(salience: 'high' | 'medium' | 'low'): string {
  switch (salience) {
    case 'high': return '重要度：高';
    case 'medium': return '重要度：中';
    case 'low': return '重要度：低';
  }
}

// chamber の短縮表示
export function chamberShort(chamber: string): string {
  if (chamber === '衆議院') return '衆';
  if (chamber === '参議院') return '参';
  return chamber;
}

// 文字列の省略
export function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen) + '…';
}

// URL の表示用短縮
export function shortenUrl(url: string): string {
  try {
    const u = new URL(url);
    return u.hostname;
  } catch {
    return url;
  }
}
