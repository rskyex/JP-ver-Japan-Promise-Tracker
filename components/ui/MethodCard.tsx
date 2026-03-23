interface MethodCardProps {
  letter: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function MethodCard({ letter, title, subtitle, children }: MethodCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-5">
        <div className="flex-shrink-0 w-11 h-11 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-base">
          {letter}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400 mt-0.5">{subtitle}</p>}
          <div className="mt-4 text-sm text-slate-600 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
