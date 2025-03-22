import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { OperatingHoursProps, 
  OperatingHours as Hours, 
  HourType,
  ValidHourString 
} from '../types';
import { onRetry } from '../utils';
import {  getOperatingHours, updateOperatingHours, } from '../services/hours';
import { defaultOperatingHours, isValidHourString } from '../utils/hours';


export function OperatingHours({ marketId, onError }: OperatingHoursProps) {
  const [hours, setHours] = useState<Hours>(defaultOperatingHours);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  
  const updateHour = (
    key: keyof Hours,
    type: HourType,
    value: string
  ) => {
    if (!isValidHourString(value)) return;
    
    setHours(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value as ValidHourString
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateOperatingHours(marketId, hours);
    } catch (error) {
      onError(error as Error);
      if (onRetry) {
        onRetry(
          async () => await updateOperatingHours(marketId, hours),
          3,  // maxAttempts
          1000 // delay in ms between retries
        );
      }
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadHours = async () => {
      setLoading(true);
      try {
        const marketHours = await getOperatingHours(marketId);
        setHours(marketHours);
      } catch (error) {
        onError(error as Error);
        if (onRetry) {
          onRetry(
            async () => {
              const retryData = await getOperatingHours(marketId);
              setHours(retryData);
            },
            3,  // maxAttempts
            1000 // delay in ms between retries
          );
        }
      } finally {
        setLoading(false);
      }
    };
  
    loadHours();
  }, [marketId, onRetry, onError]); // Added dependencies
  
  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-center py-6">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-600">Loading operating hours...</p>
          {onRetry && (
            <button
              onClick={() => 
                onRetry(async () => {
                  const retryData = await getOperatingHours(marketId);
                  setHours(retryData);
                })
              }
              className="mt-2 text-blue-500 hover:text-blue-600"
            >
              Retry Loading Hours
            </button>
          )}
        </div>
      ) : (
        <>
          {Object.entries(hours).map(([key, times]) => (
            <div key={key} className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {key.replace('_', ' ')}
                </label>
                <div className="flex space-x-2 mt-1">
                  <input
                    type="time"
                    value={times.open}
                    onChange={(e) => updateHour(key as keyof Hours, 'open', e.target.value)}
                    className="block w-full rounded-md border-gray-300 shadow-sm 
                      focus:border-blue-500 focus:ring-blue-500 
                      disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={saving}
                  />
                  <span className="text-gray-500 self-center">to</span>
                  <input
                    type="time"
                    value={times.close}
                    onChange={(e) => updateHour(key as keyof Hours, 'close', e.target.value)}
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
              onClick={() => setHours(defaultOperatingHours)}
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
}
