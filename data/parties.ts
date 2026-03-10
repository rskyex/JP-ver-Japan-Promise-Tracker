// ============================================================
// parties.ts - 政党データ (seed data)
// ============================================================

import type { Party } from '@/types/domain';

export const parties: Party[] = [
  {
    id: 'ldp',
    name: '自由民主党',
    abbreviation: '自民',
    ideologyLabel: '保守・中道右派',
    colorToken: '#1e40af', // blue-800
  },
  {
    id: 'cdp',
    name: '立憲民主党',
    abbreviation: '立民',
    ideologyLabel: '中道左派・リベラル',
    colorToken: '#1d4ed8', // blue-700
  },
  {
    id: 'komei',
    name: '公明党',
    abbreviation: '公明',
    ideologyLabel: '中道・福祉重視',
    colorToken: '#0369a1', // sky-700
  },
  {
    id: 'ishin',
    name: '日本維新の会',
    abbreviation: '維新',
    ideologyLabel: '改革・地域主義',
    colorToken: '#b45309', // amber-700
  },
  {
    id: 'dpfp',
    name: '国民民主党',
    abbreviation: '国民',
    ideologyLabel: '中道・改革',
    colorToken: '#0891b2', // cyan-600
  },
  {
    id: 'jcp',
    name: '日本共産党',
    abbreviation: '共産',
    ideologyLabel: '左派',
    colorToken: '#dc2626', // red-600
  },
  {
    id: 'reiwa',
    name: 'れいわ新選組',
    abbreviation: 'れいわ',
    ideologyLabel: '左派・社会変革',
    colorToken: '#db2777', // pink-600
  },
  {
    id: 'sdp',
    name: '社会民主党',
    abbreviation: '社民',
    ideologyLabel: '左派・平和主義',
    colorToken: '#7c3aed', // violet-700
  },
];
