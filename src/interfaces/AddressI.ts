import type { Option } from "./OptionI";

export interface AddressI {
  id: string | null;
  state: Option | null;
  city: Option | null;
  phone: string;
  cep: string;
  addressIdentify: string;
  recipientName: string;
  address: string;
  number: string;
  complement: string;
  neighborhood: string;
  referencePoint?: string;
  isFavorite: boolean;
  conciergeAllDay: boolean;
  createdAt?: Date;
}
