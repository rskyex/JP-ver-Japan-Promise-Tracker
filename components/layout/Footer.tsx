import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">Japan Promise Tracker</h3>
            <p className="text-sm leading-relaxed">
              日本の国会議員の公約と国会行動の整合性を可視化する、
              研究・透明性プロトタイプです。
            </p>
            <p className="text-xs mt-3 text-slate-500">
              このサイトはデモ・研究用プロトタイプです。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">ページ</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">ホーム</Link></li>
              <li><Link href="/politicians" className="hover:text-white transition-colors">議員一覧</Link></li>
              <li><Link href="/methodology" className="hover:text-white transition-colors">方法論</Link></li>
              <li><Link href="/sources" className="hover:text-white transition-colors">出典</Link></li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white font-semibold mb-3">免責事項</h3>
            <p className="text-xs leading-relaxed text-slate-500">
              このサイトは、政治的透明性と研究プロトタイピングのために、
              整理・要約・分類されたデータを用いるデモです。
              スコアや分類は簡略化を含み、議員や政党に対する
              最終的・断定的評価を示すものではありません。
            </p>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-xs text-slate-600 flex flex-col md:flex-row justify-between gap-2">
          <p>© 2024 Risa Koyanagi. All rights reserved unless otherwise specified.</p>
          <p>Japan Promise Tracker — シビックテック・政策研究プロトタイプ</p>
        </div>
      </div>
    </footer>
  );
}
