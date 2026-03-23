'use client';

import type { PoliticianFilters } from '@/types/filters';
import type { Party } from '@/types/domain';
import { ALIGNMENT_LABELS } from '@/lib/labels';
import { ISSUE_AREAS } from '@/components/politicians/constants';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  filters: PoliticianFilters;
  onChange: (filters: PoliticianFilters) => void;
  parties: Party[];
}

function FilterPill({
  label,
  selected,
  onClick,
  style,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-[11px] px-3 py-1.5 rounded-lg font-medium transition-all duration-150 ${
        selected
          ? 'bg-slate-900 text-white shadow-sm'
          : 'bg-white text-slate-500 border border-slate-200 hover:border-slate-300 hover:text-slate-700'
      }`}
      style={selected ? style : undefined}
    >
      {label}
    </button>
  );
}

function FilterSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">{label}</label>
      <div className="flex gap-1.5 flex-wrap">{children}</div>
    </div>
  );
}

export default function FilterBar({ filters, onChange, parties }: FilterBarProps) {
  const update = (key: keyof PoliticianFilters, value: unknown) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-slate-700 flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
          フィルタ
        </h3>
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
          className="text-[10px] text-slate-400 hover:text-slate-600 flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          リセット
        </button>
      </div>

      <FilterSection label="院">
        {['', '衆議院', '参議院'].map((c) => (
          <FilterPill
            key={c}
            label={c || 'すべて'}
            selected={filters.chamber === c}
            onClick={() => update('chamber', c)}
          />
        ))}
      </FilterSection>

      <FilterSection label="与野党">
        {['', '与党', '野党'].map((g) => (
          <FilterPill
            key={g}
            label={g || 'すべて'}
            selected={filters.governmentStatus === g}
            onClick={() => update('governmentStatus', g)}
          />
        ))}
      </FilterSection>

      <FilterSection label="政党">
        {parties.map((party) => {
          const selected = filters.partyIds.includes(party.id);
          return (
            <FilterPill
              key={party.id}
              label={party.abbreviation}
              selected={selected}
              onClick={() => {
                const next = selected
                  ? filters.partyIds.filter((id) => id !== party.id)
                  : [...filters.partyIds, party.id];
                update('partyIds', next);
              }}
              style={selected ? { backgroundColor: party.colorToken } : undefined}
            />
          );
        })}
      </FilterSection>

      <FilterSection label="当選回数">
        {[0, 1, 2, 3].map((n) => (
          <FilterPill
            key={n}
            label={n === 0 ? 'すべて' : `${n}期以上`}
            selected={filters.minTermsServed === n}
            onClick={() => update('minTermsServed', n)}
          />
        ))}
      </FilterSection>

      <FilterSection label="政策分野">
        {ISSUE_AREAS.map((area) => {
          const selected = filters.issueAreas.includes(area);
          return (
            <FilterPill
              key={area}
              label={area}
              selected={selected}
              onClick={() => {
                const next = selected
                  ? filters.issueAreas.filter((a) => a !== area)
                  : [...filters.issueAreas, area];
                update('issueAreas', next);
              }}
            />
          );
        })}
      </FilterSection>

      <FilterSection label="整合ラベル">
        {ALIGNMENT_LABELS.slice(0, 4).map((label) => {
          const selected = filters.alignmentBands.includes(label);
          return (
            <FilterPill
              key={label}
              label={label}
              selected={selected}
              onClick={() => {
                const next = selected
                  ? filters.alignmentBands.filter((l) => l !== label)
                  : [...filters.alignmentBands, label];
                update('alignmentBands', next);
              }}
            />
          );
        })}
      </FilterSection>
    </div>
  );
}
