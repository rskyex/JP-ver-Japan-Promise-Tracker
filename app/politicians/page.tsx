import { demoRepository } from '@/lib/repositories/demoRepository';
import DisclaimerBanner from '@/components/ui/DisclaimerBanner';
import PoliticiansClient from './PoliticiansClient';

export const metadata = {
  title: '議員一覧 | Japan Promise Tracker',
  description: '国会議員の公約整合スコア一覧。2期以上の議員を中心に可視化。',
};

export default async function PoliticiansPage() {
  const [politicians, parties, scores] = await Promise.all([
    demoRepository.getAllPoliticians(),
    demoRepository.getAllParties(),
    demoRepository.getAllScores(),
  ]);

  const scoresMap = Object.fromEntries(scores.map((s) => [s.politicianId, s]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">議員一覧</h1>
        <p className="text-slate-600 mt-2">
          国会議員の公約整合スコアを一覧できます。初期設定では2期以上の議員が表示されています。
        </p>
      </div>

      <DisclaimerBanner />

      <PoliticiansClient
        politicians={politicians}
        parties={parties}
        scores={scoresMap}
      />
    </div>
  );
}
