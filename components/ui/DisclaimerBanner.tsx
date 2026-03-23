import { Info } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 my-6">
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <span className="font-medium text-slate-600">デモ・研究プロトタイプ</span>
          {' — '}
          スコアや分類は簡略化を含む参考指標です。発言の抜粋は整理要約であり、逐語引用ではありません。
        </p>
      </div>
    </div>
  );
}
