import { CreditCardI } from "@/interfaces/CreditCardI";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export enum PaymentMethodE {
  CreditCard = "credit-card",
  Pix = "pix",
}

export const useBuyPaymentPage = () => {
  const { push } = useRouter();
  const [creditCards, setCreditCards] = useState<CreditCardI[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreditCardId, setSelectedCreditCardId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethodE.CreditCard
  );

  async function addCreditCard(creditCard: CreditCardI) {
    try {
      const { data } = await api.post<{ creditCards: CreditCardI[] }>(
        "credit-card",
        creditCard
      );
      const { creditCards } = data;
      setCreditCards(creditCards);
    } catch {}
  }
  async function deleteCreditCard(creditCardId: string) {
    try {
      await api.delete(`credit-card/${creditCardId}`);
      setCreditCards((p) => p.filter((x) => x.id !== creditCardId));
    } catch {}
  }

  async function getCreditCards() {
    setIsLoading(creditCards.length === 0);
    try {
      const { data } = await api.get<{ creditCards: CreditCardI[] }>(
        "credit-card"
      );
      const { creditCards } = data;
      const favoriteCreditCard =
        creditCards.find((x) => x.isFavorite) || creditCards[0];

      if (!selectedCreditCardId)
        setSelectedCreditCardId(favoriteCreditCard.id || "");
      setCreditCards(creditCards);
    } catch (e) {}
    setIsLoading(false);
  }
  useEffect(() => {
    getCreditCards();
  }, []);

  return {
    creditCards,
    setCreditCards,
    addCreditCard,
    deleteCreditCard,
    isLoading,
    selectedCreditCardId,
    setSelectedCreditCardId,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  };
};

export const baseCreditCard: CreditCardI = {
  id: undefined,
  name: "",
  number: "",
  expirationDate: "",
  cvv: "",
  isFavorite: false,
};
