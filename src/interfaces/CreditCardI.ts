export interface CreditCardI {
  id?: string;
  name: string;
  number: string;
  expirationDate: string;
  cvv: string;
  isFavorite: boolean;
  createdAt?: Date;
}

export interface CreditCardErrors {
  name: string;
  number: string;
  expirationDate: string;
  cvv: string;
}
