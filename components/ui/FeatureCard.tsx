import type { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-slate-200/80 p-6 hover:shadow-md hover:border-slate-300 transition-all duration-200">
      <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white mb-4 group-hover:bg-slate-800 transition-colors">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{description}</p>
    </div>
  );
}
