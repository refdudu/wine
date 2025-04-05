import { useServices } from "@/contexts/ServicesContext";
import type { CreditCardI } from "@/interfaces/CreditCardI";
import { useEffect, useState } from "react";

export enum PaymentMethodE {
  CreditCard = "credit-card",
  Pix = "pix",
}

export const useBuyPaymentPage = () => {
  const { creditCardService } = useServices();
  const [creditCards, setCreditCards] = useState<CreditCardI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreditCardId, setSelectedCreditCardId] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    PaymentMethodE.CreditCard
  );

  async function addCreditCard(creditCard: CreditCardI) {
    try {
      const creditCards = await creditCardService.createCreditCard(creditCard);
      const favoriteCreditCard =
        creditCards.find((x) => x.isFavorite) || creditCards[0];
      if (favoriteCreditCard)
        setSelectedCreditCardId(favoriteCreditCard.id || "");
    
      setCreditCards(creditCards);
    } catch {}
  }
  async function deleteCreditCard(creditCardId: string) {
    try {
      const creditCards = await creditCardService.deleteCreditCard(
        creditCardId
      );
      setCreditCards(creditCards);
    } catch {}
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function getCreditCards() {
      setIsLoading(creditCards.length === 0);
      try {
        const creditCards = await creditCardService.getCreditCard();

        const favoriteCreditCard =
          creditCards.find((x) => x.isFavorite) || creditCards[0];
        if (favoriteCreditCard)
          setSelectedCreditCardId(favoriteCreditCard.id || "");

        setCreditCards(creditCards);
      } catch (e) {}
      setIsLoading(false);
    }

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
