export interface PaymentResult {
  success: boolean;
  transactionId: string;
  message: string;
}

export interface PaymentRequest {
  vehicleId: string;
  amount: number;
  paymentMethod: 'upi' | 'card';
  paymentDetails: UpiPaymentDetails | CardPaymentDetails;
}

export interface UpiPaymentDetails {
  upiId: string;
}

export interface CardPaymentDetails {
  cardNumber: string;
  cardholderName: string;
  expiryDate: string;
  cvv: string;
}

export interface PaymentSummary {
  vehicleId: string;
  vehicleName: string;
  amount: number;
  paymentMethod: string;
  transactionId: string;
  status: 'pending' | 'success' | 'failed';
  timestamp: Date;
}
