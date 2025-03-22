// src/components/market/VendorCard.tsx
interface VendorCardProps {
  vendor: {
    id: string;
    name: string;
    business_name?: string;
    stall_number?: string;
    product_type?: string;
    status: 'active' | 'pending' | 'inactive';
    avatar_url?: string;
  };
  onAssignStall: (vendorId: string) => void;
  onRemoveFromStall: (vendorId: string) => void;
}

export function VendorCard({ vendor, onAssignStall, onRemoveFromStall }: VendorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 border-2 border-transparent hover:border-blue-500">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {vendor.avatar_url ? (
            <img 
              src={vendor.avatar_url} 
              alt={vendor.name} 
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
              {vendor.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-medium">{vendor.business_name || vendor.name}</h3>
            <p className="text-sm text-gray-600">{vendor.product_type}</p>
          </div>
        </div>
        <span className={`text-xs px-2 py-1 rounded ${
          vendor.status === 'active' ? 'bg-green-100 text-green-800' :
          vendor.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {vendor.status}
        </span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          {vendor.stall_number ? `Stall #${vendor.stall_number}` : 'No stall assigned'}
        </span>
        {vendor.stall_number ? (
          <button
            onClick={() => onRemoveFromStall(vendor.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Remove
          </button>
        ) : (
          <button
            onClick={() => onAssignStall(vendor.id)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Assign Stall
          </button>
        )}
      </div>
    </div>
  );
}


