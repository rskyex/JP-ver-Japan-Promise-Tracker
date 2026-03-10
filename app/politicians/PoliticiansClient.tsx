'use client';

import { useState, useMemo } from 'react';
import type { Politician, Party } from '@/types/domain';
import type { ScoreResult } from '@/types/scoring';
import type { PoliticianFilters } from '@/types/filters';
import { DEFAULT_FILTERS } from '@/types/filters';
import { filterPoliticians } from '@/lib/filtering';
import PoliticianCard from '@/components/politicians/PoliticianCard';
import PoliticianTable from '@/components/politicians/PoliticianTable';
import FilterBar from '@/components/politicians/FilterBar';
import SearchBox from '@/components/politicians/SearchBox';

interface PoliticiansClientProps {
  politicians: Politician[];
  parties: Party[];
  scores: Record<string, ScoreResult>;
}

export default function PoliticiansClient({ politicians, parties, scores }: PoliticiansClientProps) {
  const [filters, setFilters] = useState<PoliticianFilters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const partyMap = Object.fromEntries(parties.map((p) => [p.id, p]));

  const filtered = useMemo(
    () => filterPoliticians(politicians, scores, filters),
    [politicians, scores, filters]
  );

  return (
    <div>
      {/* Search + View Toggle */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBox
            value={filters.query}
            onChange={(q) => setFilters((f) => ({ ...f, query: q }))}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
              viewMode === 'grid'
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
            }`}
          >
            カード
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors border ${
              viewMode === 'table'
                ? 'bg-blue-900 text-white border-blue-900'
                : 'bg-white text-slate-600 border-slate-300 hover:border-blue-400'
            }`}
          >
            テーブル
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar filters */}
        <aside className="lg:w-64 flex-shrink-0">
          <FilterBar
            filters={filters}
            onChange={setFilters}
            parties={parties}
          />
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">
              {filtered.length}件 / {politicians.length}件中
              {filters.minTermsServed >= 2 && (
                <span className="ml-2 text-xs text-blue-700 bg-blue-50 rounded px-2 py-0.5">
                  2期以上
                </span>
              )}
            </p>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PoliticianCard
                  key={p.id}
                  politician={p}
                  party={partyMap[p.partyId]}
                  score={scores[p.id]}
                />
              ))}
              {filtered.length === 0 && (
                <div className="col-span-full text-center py-16 text-slate-500">
                  <p className="text-lg">該当する議員が見つかりませんでした</p>
                  <p className="text-sm mt-2">フィルタ条件を変えてお試しください</p>
                </div>
              )}
            </div>
          ) : (
            <PoliticianTable
              politicians={filtered}
              parties={partyMap}
              scores={scores}
            />
          )}
        </div>
      </div>
    </div>
  );
}
