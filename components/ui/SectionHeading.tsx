interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered = false }: SectionHeadingProps) {
  return (
    <div className={`mb-8 ${centered ? 'text-center' : ''}`}>
      <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
      {subtitle && (
        <p className="text-slate-600 mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
