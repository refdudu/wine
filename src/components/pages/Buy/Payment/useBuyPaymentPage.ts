import { useState } from "react";
import * as Yup from "yup";

export const useBuyPaymentPage = () => {
  const [creditCards, setCreditCards] = useState<CreditCardI[]>([]);
  const [editingCreditCard, setEditingCreditCard] =
    useState<CreditCardI | null>(null);

  return {
    creditCards,
    editingCreditCard,
    setCreditCards,
  };
};
export interface CreditCardI {
  id?: string;
  name: string;
  number: string;
  expirationDate: string;
  cvv: string;
  isFavorite: boolean;
}
export const _creditCard: CreditCardI = {
  id: undefined,
  name: "",
  number: "",
  expirationDate: "",
  cvv: "",
  isFavorite: false,
};
export const creditCardSchema = Yup.object().shape({
  name: Yup.string().required("O nome é obrigatório"),

  number: Yup.string()
    .matches(
      /^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$/,
      "O número do cartão deve estar no formato 1111 1111 1111 1111"
    )
    .required("O número do cartão é obrigatório"),

  expirationDate: Yup.string()
    .matches(
      /^(0[1-9]|1[0-2])\/\d{2}$/,
      "A validade deve estar no formato MM/AA"
    )
    .required("A data de validade é obrigatória"),

  cvv: Yup.string()
    .matches(/^[0-9]{3}$/, "O CVV deve ter 3 dígitos")
    .required("O CVV é obrigatório"),
});
