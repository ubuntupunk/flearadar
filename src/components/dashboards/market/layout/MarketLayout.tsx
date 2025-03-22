// src/components/dashboards/market/layout/MarketLayout.tsx
import { StallGrid } from './StallGrid';
import { StallCard } from './StallCard';
import type { Stall } from '@/types/market';

interface MarketLayoutProps {
  marketId: string;
  stalls: Stall[];
  selectedStall: string | null;
  onStallSelect: (stallId: string) => void;
  onStallUpdate: (stall: Stall) => void;
  isEditing: boolean;
}

export function MarketLayout({ 
  marketId,
  stalls, 
  selectedStall, 
  onStallSelect, 
  onStallUpdate,
  isEditing 
}: MarketLayoutProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="font-semibold">Market Layout</h3>
        {isEditing && (
          <div className="space-x-2">
            <button
              onClick={() => {/* Add column handler */}}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
            >
              Add Column
            </button>
            <button
              onClick={() => {/* Add row handler */}}
              className="px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded"
            >
              Add Row
            </button>
          </div>
        )}
      </div>
      <StallGrid
        stalls={stalls}
        selectedStall={selectedStall}
        onStallSelect={onStallSelect}
        isEditing={isEditing}
      />
    </div>
  );
}