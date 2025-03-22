// src/components/dashboards/market/modals/PricingSettings.tsx
import { useState, useCallback } from 'react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Toast } from '@/components/shared/Toast';
import { Dialog } from '@/components/ui/Dialog';

interface PricingData {
  daily_rate: number;
  weekly_rate: number;
  monthly_rate: number;
  security_deposit: number;
}

interface ValidationErrors {
  [key: string]: string;
}

interface PricingSettingsProps {
  marketId: string;
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}

// Currency formatter for ZAR
const formatZAR = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

// Threshold for significant changes (20%)
const SIGNIFICANT_CHANGE_THRESHOLD = 0.20;

const formatInputValue = (value: number): string => {
  return value.toString(); // Keep raw number for input
};

const formatDisplayValue = (value: number): string => {
  return formatZAR.format(value);
};

// Check if change is significant
const isSignificantChange = (oldValue: number, newValue: number): boolean => {
  if (oldValue === 0) return newValue > 100; // Consider any change from 0 to >100 significant
  const changePercentage = Math.abs((newValue - oldValue) / oldValue);
  return changePercentage > SIGNIFICANT_CHANGE_THRESHOLD;
};

// Validation rules
const validatePricing = (data: PricingData): ValidationErrors => {
  const errors: ValidationErrors = {};

  if (data.daily_rate < 0) {
    errors.daily_rate = 'Daily rate cannot be negative';
  }
  if (data.weekly_rate < 0) {
    errors.weekly_rate = 'Weekly rate cannot be negative';
  }
  if (data.monthly_rate < 0) {
    errors.monthly_rate = 'Monthly rate cannot be negative';
  }
  if (data.security_deposit < 0) {
    errors.security_deposit = 'Security deposit cannot be negative';
  }

  // Logical validations
  if (data.daily_rate * 7 <= data.weekly_rate) {
    errors.weekly_rate = 'Weekly rate should offer a discount compared to daily rate';
  }
  if (data.weekly_rate * 4 <= data.monthly_rate) {
    errors.monthly_rate = 'Monthly rate should offer a discount compared to weekly rate';
  }

  return errors;
};

// API function
async function savePricingSettings(marketId: string, pricing: PricingData): Promise<void> {
  const response = await fetch(`/api/markets/${marketId}/pricing`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pricing),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to save pricing settings');
  }

  return response.json();
}

export function PricingSettings({ marketId, onError, onRetry }: PricingSettingsProps) {
  const [pricing, setPricing] = useState<PricingData>({
    daily_rate: 0,
    weekly_rate: 0,
    monthly_rate: 0,
    security_deposit: 0
  });
  const [originalPricing, setOriginalPricing] = useState<PricingData>({
    daily_rate: 0,
    weekly_rate: 0,
    monthly_rate: 0,
    security_deposit: 0
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);
  const [pendingChanges, setPendingChanges] = useState<PricingData | null>(null);
  
  // Load initial pricing
  const loadPricing = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/markets/${marketId}/pricing`);
      if (!response.ok) throw new Error('Failed to load pricing settings');
      const data = await response.json();
      setPricing(data);
      setOriginalPricing(data);
    } catch (error) {
      onError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [marketId, onError]);

  const handleSave = async (confirmedChanges?: PricingData) => {
    const dataToSave = confirmedChanges || pricing;
    
    // Check for significant changes if not already confirmed
    if (!confirmedChanges) {
      const hasSignificantChanges = Object.keys(pricing).some(key => {
        const field = key as keyof PricingData;
        return isSignificantChange(originalPricing[field], pricing[field]);
      });

      if (hasSignificantChanges) {
        setPendingChanges(pricing);
        setShowConfirmDialog(true);
        return;
      }
    }

    // Clear previous errors and success message
    setErrors({});
    setSuccessMessage('');

    // Validate form
    const validationErrors = validatePricing(pricing);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSaving(true);
    try {
      await savePricingSettings(marketId, pricing);
      setSuccessMessage('Pricing settings updated successfully');
      setOriginalPricing(dataToSave); // Update original values after successful save
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      onError(error as Error);
    } finally {
      setSaving(false);
      setShowConfirmDialog(false);
      setPendingChanges(null);
    }
  };

  const handleInputChange = (field: keyof PricingData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setPricing((prev: PricingData) => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

 return (
   <div className="space-y-4">
     {loading ? (
       <div className="text-center py-6">
         <LoadingSpinner size="large" />
         <p className="mt-4 text-gray-600">Loading pricing settings...</p>
         {onRetry && (
           <button
             onClick={onRetry}
             className="mt-2 text-blue-500 hover:text-blue-600"
           >
             Retry Loading Settings
           </button>
         )}
       </div>
     ) : (
       <>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           {/* Daily Rate Input */}
           <div>
             <label htmlFor="daily_rate" className="block text-sm font-medium text-gray-700">
               Daily Rate
             </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 sm:text-sm">R</span>
               </div>
               <input
                 type="number"
                 id="daily_rate"
                 min="0"
                 step="0.01"
                 value={formatInputValue(pricing.daily_rate)}
                 onChange={handleInputChange('daily_rate')}
                 className={`block w-full pl-7 pr-3 py-2 rounded-md 
                   ${errors.daily_rate 
                     ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                   }`}
                 disabled={saving}
               />
             </div>
             <p className="mt-1 text-sm text-gray-500">
               {formatDisplayValue(pricing.daily_rate)}
             </p>
             {errors.daily_rate && (
               <p className="mt-1 text-sm text-red-600">{errors.daily_rate}</p>
             )}
           </div>
 
           {/* Weekly Rate Input */}
           <div>
             <label htmlFor="weekly_rate" className="block text-sm font-medium text-gray-700">
               Weekly Rate
             </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 sm:text-sm">R</span>
               </div>
               <input
                 type="number"
                 id="weekly_rate"
                 min="0"
                 step="0.01"
                 value={formatInputValue(pricing.weekly_rate)}
                 onChange={handleInputChange('weekly_rate')}
                 className={`block w-full pl-7 pr-3 py-2 rounded-md 
                   ${errors.weekly_rate 
                     ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                   }`}
                 disabled={saving}
               />
             </div>
             <p className="mt-1 text-sm text-gray-500">
               {formatDisplayValue(pricing.weekly_rate)}
             </p>
             {errors.weekly_rate && (
               <p className="mt-1 text-sm text-red-600">{errors.weekly_rate}</p>
             )}
           </div>
 
           {/* Monthly Rate Input */}
           <div>
             <label htmlFor="monthly_rate" className="block text-sm font-medium text-gray-700">
               Monthly Rate
             </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 sm:text-sm">R</span>
               </div>
               <input
                 type="number"
                 id="monthly_rate"
                 min="0"
                 step="0.01"
                 value={formatInputValue(pricing.monthly_rate)}
                 onChange={handleInputChange('monthly_rate')}
                 className={`block w-full pl-7 pr-3 py-2 rounded-md 
                   ${errors.monthly_rate 
                     ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                   }`}
                 disabled={saving}
               />
             </div>
             <p className="mt-1 text-sm text-gray-500">
               {formatDisplayValue(pricing.monthly_rate)}
             </p>
             {errors.monthly_rate && (
               <p className="mt-1 text-sm text-red-600">{errors.monthly_rate}</p>
             )}
           </div>
 
           {/* Security Deposit Input */}
           <div>
             <label htmlFor="security_deposit" className="block text-sm font-medium text-gray-700">
               Security Deposit
             </label>
             <div className="mt-1 relative rounded-md shadow-sm">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <span className="text-gray-500 sm:text-sm">R</span>
               </div>
               <input
                 type="number"
                 id="security_deposit"
                 min="0"
                 step="0.01"
                 value={formatInputValue(pricing.security_deposit)}
                 onChange={handleInputChange('security_deposit')}
                 className={`block w-full pl-7 pr-3 py-2 rounded-md 
                   ${errors.security_deposit 
                     ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                     : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                   }`}
                 disabled={saving}
               />
             </div>
             <p className="mt-1 text-sm text-gray-500">
               {formatDisplayValue(pricing.security_deposit)}
             </p>
             {errors.security_deposit && (
               <p className="mt-1 text-sm text-red-600">{errors.security_deposit}</p>
             )}
           </div>
         </div>
 
         <div className="flex justify-end space-x-3 pt-4">
           <button
             type="button"
             onClick={() => {
               setPricing({
                 daily_rate: 0,
                 weekly_rate: 0,
                 monthly_rate: 0,
                 security_deposit: 0
               });
               setErrors({});
             }}
             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
               border-gray-300 rounded-md shadow-sm hover:bg-gray-50 
               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
               disabled:opacity-50 disabled:cursor-not-allowed"
             disabled={saving}
           >
             Reset
           </button>
           <button
             onClick={() => handleSave()}
             disabled={saving || Object.keys(errors).length > 0}
             className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 
               border border-transparent rounded-md shadow-sm 
               hover:bg-blue-700 focus:outline-none focus:ring-2 
               focus:ring-offset-2 focus:ring-blue-500
               ${(saving || Object.keys(errors).length > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
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
 
     {/* Confirmation Dialog */}
     <Dialog
       isOpen={showConfirmDialog}
       onClose={() => {
         setShowConfirmDialog(false);
         setPendingChanges(null);
       }}
     >
       <div className="p-6">
         <h3 className="text-lg font-medium text-gray-900 mb-4">
           Confirm Significant Price Changes
         </h3>
         <div className="space-y-4">
           {pendingChanges && Object.keys(pendingChanges).map(key => {
             const field = key as keyof PricingData;
             if (isSignificantChange(originalPricing[field], pendingChanges[field])) {
               return (
                 <div key={field} className="flex justify-between">
                   <span className="capitalize">{field.replace('_', ' ')}:</span>
                   <div className="text-right">
                     <div className="text-gray-500 line-through">
                       {formatDisplayValue(originalPricing[field])}
                     </div>
                     <div className="text-black font-medium">
                       {formatDisplayValue(pendingChanges[field])}
                     </div>
                   </div>
                 </div>
               );
             }
             return null;
           })}
           <p className="text-sm text-gray-500 mt-4">
             These changes represent significant price adjustments. Are you sure you want to proceed?
           </p>
         </div>
         <div className="mt-6 flex justify-end space-x-3">
           <button
             type="button"
             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border 
               border-gray-300 rounded-md shadow-sm hover:bg-gray-50"
             onClick={() => {
               setShowConfirmDialog(false);
               setPendingChanges(null);
             }}
           >
             Cancel
           </button>
           <button
             type="button"
             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 
               border border-transparent rounded-md shadow-sm hover:bg-blue-700"
             onClick={() => pendingChanges && handleSave(pendingChanges)}
           >
             Confirm Changes
           </button>
         </div>
       </div>
     </Dialog>
 
     {/* Success Toast */}
     {successMessage && (
       <Toast
         type="success"
         message={successMessage}
         onClose={() => setSuccessMessage('')}
       />
     )}
   </div>
 );
}