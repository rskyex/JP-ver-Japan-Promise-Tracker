import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: ReactNode;
}

export default function StatCard({ label, value, subLabel, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-900 tracking-tight">{value}</p>
          {subLabel && <p className="text-xs text-slate-400 mt-1.5">{subLabel}</p>}
        </div>
        {icon && (
          <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
