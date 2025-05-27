import type { AddressI } from './AddressI';

export interface OrderItemI {
  productId: string;
  productName: string; 
  quantity: number;
  pricePerItem: number;
  productImage?: string;
}

export interface OrderI {
  id: string;
  userId: string;
  createdAt: string; // ISO date string
  items: OrderItemI[];
  totalAmount: number;
  shippingAddress: AddressI;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  // Futuramente: paymentMethod, trackingNumber, etc.
}
