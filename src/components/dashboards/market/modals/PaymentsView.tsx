// components/dashboards/market/modals/PaymentsView.tsx
import { useState, useMemo } from 'react';
import { Dialog } from '@headlessui/react';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { formatCurrency } from '@/lib/utils/format';
import { PaymentsViewProps, VendorPayment, PaymentStatus } from '../types';

export function PaymentsView({
  payments,
  onError,
  onRetry,
  onUpdate,
  isOpen = true,
  onClose,
}: PaymentsViewProps & { isOpen: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);

  const paymentStats = useMemo(() => {
    return payments.reduce(
      (stats, payment) => ({
        total: stats.total + payment.amountDue,
        pending: stats.pending + (payment.status === 'pending' ? 1 : 0),
        overdue: stats.overdue + (payment.status === 'overdue' ? 1 : 0),
        paid: stats.paid + (payment.status === 'paid' ? 1 : 0),
      }),
      { total: 0, pending: 0, overdue: 0, paid: 0 }
    );
  }, [payments]);

  const handlePaymentUpdate = async (paymentId: string, status: VendorPayment['status']) => {
    setIsLoading(true);
    setSelectedPaymentId(paymentId);
    setError(null);

    try {
      await onUpdate?.(paymentId, { status });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to update payment';
      setError(errorMessage);
      onError(error instanceof Error ? error : new Error(errorMessage));
    } finally {
      setIsLoading(false);
      setSelectedPaymentId(null);
    }
  };

  const getStatusColor = (status: VendorPayment['status']): string => {
    const statusColorClass = {
      paid: 'text-green-600 border-green-300 bg-green-50',
      pending: 'text-yellow-600 border-yellow-300 bg-yellow-50',
      overdue: 'text-red-600 border-red-300 bg-red-50',
      partial: 'text-blue-600 border-blue-300 bg-blue-50',
    };
    const baseClasses = 'text-sm rounded p-1 mt-1 border';
    return `${baseClasses} ${statusColorClass[status] || ''}`;
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="relative bg-white rounded-lg max-w-4xl w-full mx-4 p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium mb-4">Payment Management</Dialog.Title>

          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-xl font-semibold">{formatCurrency(paymentStats.total)}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-semibold text-yellow-600">{paymentStats.pending}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Overdue</p>
                <p className="text-xl font-semibold text-red-600">{paymentStats.overdue}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-500">Paid</p>
                <p className="text-xl font-semibold text-green-600">{paymentStats.paid}</p>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {payments.length === 0 ? (
              <div className="text-center py-6">
                <p className="text-gray-500">No pending payments</p>
                {onRetry && (
                  <button onClick={onRetry} className="mt-2 text-blue-500 hover:text-blue-600">
                    Retry Loading Payments
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto">
                {payments.map((payment: VendorPayment) => (
                  <div
                    key={payment.vendorId}
                    className="bg-white border rounded-lg p-4 hover:bg-gray-50 transition-colors shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{payment.vendorName}</h3>
                        <div className="space-y-1 mt-1">
                          <p className="text-sm text-gray-600">Stall #{payment.stallNumber}</p>
                          <p className="text-sm text-gray-500">
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-2">
                        <p className="font-medium text-lg">{formatCurrency(payment.amountDue)}</p>
                        {onUpdate && (
                          <select
                            className={getStatusColor(payment.status)}
                            value={payment.status}
                            onChange={(e) =>
                              handlePaymentUpdate(payment.vendorId, e.target.value as PaymentStatus)
                            }
                            disabled={isLoading && selectedPaymentId === payment.vendorId}
                          >
                            <option value="paid">Paid</option>
                            <option value="pending">Pending</option>
                            <option value="overdue">Overdue</option>
                            <option value="partial">Partial</option>
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Close
            </button>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <LoadingSpinner size="large" />
            <p className="mt-2 text-gray-600">Updating payment...</p>
          </div>
        </div>
      )}
    </Dialog>
  );
}
