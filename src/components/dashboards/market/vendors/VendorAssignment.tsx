// src/components/dashboards/market/vendors/VendorAssignment.tsx
import { VendorList } from './VendorList';
import { MarketLayout } from '../layout/MarketLayout';
import { useState } from 'react';
import type { Vendor, Stall } from '@/types/market';

interface VendorAssignmentProps {
  marketId: string;
}

export function VendorAssignment({ marketId }: VendorAssignmentProps) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [stalls, setStalls] = useState<Stall[]>([]);
  const [selectedStall, setSelectedStall] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleStallAssignment = (vendorId: string) => {
    if (selectedStall) {
      setStalls(current =>
        current.map(stall =>
          stall.id === selectedStall
            ? { ...stall, vendor_id: vendorId, status: 'occupied' }
            : stall
        )
      );
    }
  };

  const handleStallRemoval = (vendorId: string) => {
    setStalls(current =>
      current.map(stall =>
        stall.vendor_id === vendorId
          ? { ...stall, vendor_id: undefined, status: 'available' }
          : stall
      )
    );
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <MarketLayout
          marketId={marketId}
          stalls={stalls}
          selectedStall={selectedStall}
          onStallSelect={setSelectedStall}
          onStallUpdate={(stall) => {
            setStalls(current =>
              current.map(s => s.id === stall.id ? stall : s)
            );
          }}
          isEditing={isEditing}
        />
      </div>
      <div>
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {isEditing ? 'Save Layout' : 'Edit Layout'}
          </button>
        </div>
        <VendorList
          vendors={vendors}
          onAssignStall={handleStallAssignment}
          onRemoveFromStall={handleStallRemoval}
        />
      </div>
    </div>
  );
}