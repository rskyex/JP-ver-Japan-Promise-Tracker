interface MethodCardProps {
  letter: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function MethodCard({ letter, title, subtitle, children }: MethodCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-10 h-10 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
          {letter}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
          <div className="mt-3 text-sm text-slate-700 leading-relaxed space-y-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
