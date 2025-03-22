// types/payments.ts
export type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'partial';
export interface VendorPayment {
  id: string;
  vendorId: string;
  vendorName: string;
  marketId: string;
  stallNumber: string; // Changed from stall_number to follow camelCase
  amountDue: number;   // Changed from amount_due to follow camelCase
  amountPaid: number;
  balance: number;
  status: PaymentStatus;
  dueDate: string;
  paymentDate?: string;
  paymentMethod?: string;
  currency: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaymentUpdateData {
  status?: PaymentStatus;
  amountPaid?: number;
  paymentMethod?: string;
  notes?: string;
}
export interface PaymentsViewProps {
  payments: VendorPayment[];
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: (paymentId: string, data: PaymentUpdateData) => Promise<void>;
  onError: (error: Error) => void;
  onRetry?: () => Promise<void>;
  onSuccess?: () => void;
}

export interface PaymentStats {
  total: number;
  paid: number;
  pending: number;
  overdue: number;
  partial: number;
}
