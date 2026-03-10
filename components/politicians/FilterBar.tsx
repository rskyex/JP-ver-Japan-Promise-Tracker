'use client';

import type { PoliticianFilters } from '@/types/filters';
import type { Party } from '@/types/domain';
import { ALIGNMENT_LABELS } from '@/lib/labels';
import { ISSUE_AREAS } from '@/components/politicians/constants';

interface FilterBarProps {
  filters: PoliticianFilters;
  onChange: (filters: PoliticianFilters) => void;
  parties: Party[];
}

export default function FilterBar({ filters, onChange, parties }: FilterBarProps) {
  const update = (key: keyof PoliticianFilters, value: unknown) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm space-y-4">
      <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        フィルタ
      </h3>

      {/* 院 */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">院</label>
        <div className="flex gap-2 flex-wrap">
          {['', '衆議院', '参議院'].map((c) => (
            <button
              key={c}
              onClick={() => update('chamber', c)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                filters.chamber === c
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
              }`}
            >
              {c || 'すべて'}
            </button>
          ))}
        </div>
      </div>

      {/* 与野党 */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">与野党</label>
        <div className="flex gap-2 flex-wrap">
          {['', '与党', '野党'].map((g) => (
            <button
              key={g}
              onClick={() => update('governmentStatus', g)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                filters.governmentStatus === g
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
              }`}
            >
              {g || 'すべて'}
            </button>
          ))}
        </div>
      </div>

      {/* 政党 */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">政党</label>
        <div className="flex flex-wrap gap-1">
          {parties.map((party) => {
            const selected = filters.partyIds.includes(party.id);
            return (
              <button
                key={party.id}
                onClick={() => {
                  const next = selected
                    ? filters.partyIds.filter((id) => id !== party.id)
                    : [...filters.partyIds, party.id];
                  update('partyIds', next);
                }}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selected
                    ? 'text-white border-transparent'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                }`}
                style={selected ? { backgroundColor: party.colorToken, borderColor: party.colorToken } : {}}
              >
                {party.abbreviation}
              </button>
            );
          })}
        </div>
      </div>

      {/* 当選回数 */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">
          当選回数（最低）
        </label>
        <div className="flex gap-2 flex-wrap">
          {[0, 1, 2, 3].map((n) => (
            <button
              key={n}
              onClick={() => update('minTermsServed', n)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                filters.minTermsServed === n
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
              }`}
            >
              {n === 0 ? 'すべて' : `${n}期以上`}
            </button>
          ))}
        </div>
      </div>

      {/* 政策分野 */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">政策分野</label>
        <div className="flex flex-wrap gap-1">
          {ISSUE_AREAS.map((area) => {
            const selected = filters.issueAreas.includes(area);
            return (
              <button
                key={area}
                onClick={() => {
                  const next = selected
                    ? filters.issueAreas.filter((a) => a !== area)
                    : [...filters.issueAreas, area];
                  update('issueAreas', next);
                }}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selected
                    ? 'bg-blue-900 text-white border-blue-900'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
                }`}
              >
                {area}
              </button>
            );
          })}
        </div>
      </div>

      {/* 整合バンド */}
      <div>
        <label className="text-xs font-medium text-slate-600 block mb-1">整合ラベル</label>
        <div className="flex flex-wrap gap-1">
          {ALIGNMENT_LABELS.slice(0, 4).map((label) => {
            const selected = filters.alignmentBands.includes(label);
            return (
              <button
                key={label}
                onClick={() => {
                  const next = selected
                    ? filters.alignmentBands.filter((l) => l !== label)
                    : [...filters.alignmentBands, label];
                  update('alignmentBands', next);
                }}
                className={`text-xs px-2 py-1 rounded border transition-colors ${
                  selected
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white text-slate-600 border-slate-300 hover:border-slate-500'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          onChange({
            query: '',
            partyIds: [],
            chamber: '',
            issueAreas: [],
            alignmentBands: [],
            minTermsServed: 2,
            governmentStatus: '',
            isCurrentOnly: true,
          })
        }
        className="text-xs text-slate-500 hover:text-slate-700 underline"
      >
        フィルタをリセット
      </button>
    </div>
  );
}
