// src/components/dashboards/market/types/payments.ts
export interface VendorPayment {
  payment_id: string;
  vendor_id: string;
  vendor_name: string;
  amount: number;
  due_date: string;
  status: 'paid' | 'pending' | 'overdue';
}

export interface PaymentsViewProps {
  payments: VendorPayment[];
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
}
