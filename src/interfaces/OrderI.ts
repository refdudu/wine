export interface OrderItemDTO {
  productId: string;
  amount: number;
}
export interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  amount: number;
}

export interface OrderI {
  id: string;
  createdAt: Date;
  //   status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  // Futuramente: paymentMethod, trackingNumber, etc.
}
export interface OrderDTO {
  userId: string;
  items: OrderItemDTO[];
  shippingAddressId: string;
}
export interface AddressOrderI {
  state: string;
  city: string;
  phone: string;
  cep: string;
  addressIdentify: string;
  recipientName: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  referencePoint: string;
}
