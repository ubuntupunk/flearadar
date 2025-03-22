// src/components/dashboards/market/modals/PaymentsView.tsx
import { useState } from 'react';
import { PaymentsViewProps } from '../types';

/* interface PaymentsViewProps {
    payments: VendorPayment[];
    onError: (error: Error) => void;
    onRetry?: () => Promise<void>;
  } */
  
  export function PaymentsView({ payments, onError, onRetry }: PaymentsViewProps) {
    const [loading, setLoading] = useState(false);
    
    const handlePaymentUpdate = async (paymentId: string, status: 'paid' | 'pending' | 'overdue') => {
      setLoading(true);
      try {
        // Implement payment update logic
      } catch (error) {
        onError(error as Error);
      } finally {
      setLoading(false);
    }
  };
  
    return (
      <div className="space-y-4">
        {payments.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No pending payments</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 text-blue-500 hover:text-blue-600"
              >
                Retry Loading Payments
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-4">
              <h3 className="font-medium">Total Pending: {payments.length}</h3>
              <p className="text-sm text-gray-600">
                Total Amount: R{payments.reduce((sum, p) => sum + p.amount_due, 0)}
              </p>
            </div>
            {payments.map((payment) => (
              <div
                key={payment.vendor_id}
                className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{payment.vendor_name}</h3>
                    <p className="text-sm text-gray-600">Stall #{payment.stall_number}</p>
                    <p className="text-sm text-gray-500">Due: {new Date(payment.due_date).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">R{payment.amount_due}</p>
                    <select
                      className={`text-sm rounded p-1 mt-1 ${
                        payment.status === 'overdue' ? 'text-red-600 border-red-300' :
                        payment.status === 'paid' ? 'text-green-600 border-green-300' :
                        'text-yellow-600 border-yellow-300'
                      } border`}
                      value={payment.status}
                      onChange={(e) => handlePaymentUpdate(payment.vendor_id, e.target.value as any)}
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    );
  }