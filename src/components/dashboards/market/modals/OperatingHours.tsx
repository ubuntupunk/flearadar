// src/components/dashboards/market/modals/OperatingHours.tsx
import { useState } from 'react';

interface OperatingHoursProps {
  marketId: string;
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}

export function OperatingHours({ marketId, onError }: OperatingHoursProps) {
  const [hours, setHours] = useState({
    monday: { open: '09:00', close: '17:00' },
    tuesday: { open: '09:00', close: '17:00' },
    wednesday: { open: '09:00', close: '17:00' },
    thursday: { open: '09:00', close: '17:00' },
    friday: { open: '09:00', close: '17:00' },
    saturday: { open: '09:00', close: '17:00' },
    sunday: { open: '09:00', close: '17:00' }
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Implement save logic
    } catch (error) {
      onError(error as Error);
    } finally {
      setSaving(false);
    }
  };

    return (
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-6">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-gray-600">Loading operating hours...</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 text-blue-500 hover:text-blue-600"
              >
                Retry Loading Hours
              </button>
            )}
          </div>
        ) : (
          <>
            {Object.entries(hours).map(([day, times]) => (
              <div key={day} className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 capitalize">
                    {day}
                  </label>
                  <div className="flex space-x-2 mt-1">
                    <input
                      type="time"
                      value={times.open}
                      onChange={(e) => setHours(prev => ({
                        ...prev,
                        [day]: { ...prev[day], open: e.target.value }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm 
                        focus:border-blue-500 focus:ring-blue-500 
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={saving}
                    />
                    <span className="text-gray-500 self-center">to</span>
                    <input
                      type="time"
                      value={times.close}
                      onChange={(e) => setHours(prev => ({
                        ...prev,
                        [day]: { ...prev[day], close: e.target.value }
                      }))}
                      className="block w-full rounded-md border-gray-300 shadow-sm 
                        focus:border-blue-500 focus:ring-blue-500
                        disabled:bg-gray-100 disabled:cursor-not-allowed"
                      disabled={saving}
                    />
                  </div>
                </div>
              </div>
            ))}
            
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setHours({
                  monday: { open: '09:00', close: '17:00' },
                  tuesday: { open: '09:00', close: '17:00' },
                  wednesday: { open: '09:00', close: '17:00' },
                  thursday: { open: '09:00', close: '17:00' },
                  friday: { open: '09:00', close: '17:00' },
                  saturday: { open: '09:00', close: '17:00' },
                  sunday: { open: '09:00', close: '17:00' }
                })}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
                  border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                  disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={saving}
              >
                Reset to Default
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 
                  border border-transparent rounded-md shadow-sm 
                  hover:bg-blue-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-blue-500
                  ${saving ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {saving ? (
                  <span className="flex items-center">
                    <LoadingSpinner size="small" />
                    <span className="ml-2">Saving...</span>
                  </span>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </>
        )}
      </div>
    );
  