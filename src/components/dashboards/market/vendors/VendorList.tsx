/ src/components/dashboards/market/vendors/VendorList.tsx
import { VendorCard } from './VendorCard';
import type { Vendor } from '@/types/vendor';

interface VendorListProps {
  vendors: Vendor[];
  onAssignStall: (vendorId: string) => void;
  onRemoveFromStall: (vendorId: string) => void;
}

export function VendorList({ vendors, onAssignStall, onRemoveFromStall }: VendorListProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Vendors</h3>
      </div>
      <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
        {vendors.map(vendor => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onAssignStall={onAssignStall}
            onRemoveFromStall={onRemoveFromStall}
          />
        ))}
      </div>
    </div>
  );
}
