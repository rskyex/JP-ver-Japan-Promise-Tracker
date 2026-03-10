export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-6">
      <div className="flex items-start gap-3">
        <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <div>
          <p className="text-sm font-medium text-amber-800">デモ・研究プロトタイプについて</p>
          <p className="text-sm text-amber-700 mt-1">
            このサイトは、政治的透明性と研究プロトタイピングのために、整理・要約・分類されたデータを用いるデモです。
            スコアや分類は簡略化を含み、議員や政党に対する最終的・断定的評価を示すものではありません。
            発言の抜粋は「整理要約」または「デモ要約」であり、逐語引用ではありません。
          </p>
        </div>
      </div>
    </div>
  );
}
