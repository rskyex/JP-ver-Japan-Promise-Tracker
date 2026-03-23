import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 bg-slate-900 rounded-md flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">JP</span>
              </div>
              <span className="font-semibold text-slate-900 text-sm">公約トラッカー</span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-sm">
              日本の国会議員の公約と国会行動の整合性を可視化する、研究・透明性プロトタイプです。
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">ページ</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'ホーム' },
                { href: '/politicians', label: '議員一覧' },
                { href: '/methodology', label: '方法論' },
                { href: '/sources', label: '出典' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">免責事項</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              このサイトはデモ・研究用プロトタイプです。スコアや分類は簡略化を含み、議員や政党に対する最終的・断定的評価を示すものではありません。
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-12 pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-slate-400">
          <p>© 2024 Risa Koyanagi. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            シビックテック・政策研究プロトタイプ
            <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  );
}
