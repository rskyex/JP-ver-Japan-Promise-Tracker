interface StatCardProps {
  label: string;
  value: string | number;
  subLabel?: string;
  icon?: string;
}

export default function StatCard({ label, value, subLabel, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-sm font-medium text-slate-700 mt-1">{label}</div>
      {subLabel && <div className="text-xs text-slate-500 mt-1">{subLabel}</div>}
    </div>
  );
}
