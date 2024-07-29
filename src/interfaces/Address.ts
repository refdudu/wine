export interface Address {
  id: number | null;
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
}
export interface Option {
  label: string;
  key: string;
}
