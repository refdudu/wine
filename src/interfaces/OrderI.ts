import type { Option } from "./OptionI";

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
  userUid: string;
  items: OrderItem[];
  totalAmount?: number;
  shippingAddress: AddressOrderI;
  createdAt: Date;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}
export interface OrderDTO {
  userUid: string;
  items: OrderItemDTO[];
  shippingAddressId: string;
}
export interface AddressOrderI {
  state: Option;
  city: Option;
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
