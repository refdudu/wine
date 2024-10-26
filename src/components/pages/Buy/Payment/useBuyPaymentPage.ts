import { CreditCardI } from "@/interfaces/CreditCardI";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export const useBuyPaymentPage = () => {
  const { push } = useRouter();
  const [creditCards, setCreditCards] = useState<CreditCardI[]>([]);
  const [editingCreditCard, setEditingCreditCard] =
    useState<CreditCardI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCreditCardId, setSelectedCreditCardId] = useState("");

  async function createCreditCard(creditCard: CreditCardI) {
    try {
      const { data } = await api.post<{ creditCards: CreditCardI[] }>(
        "credit-card",
        creditCard
      );
      const { creditCards } = data;
      setCreditCards(creditCards);
    } catch {}
  }
  async function updateCreditCard(creditCard: CreditCardI) {
    try {
      delete creditCard.createdAt;

      await api.put(`credit-card/${creditCard.id}`, creditCard);
      await getCreditCards();
      // setCreditCardes((p) => p.map((x) => (x.id === address.id ? address : x)));
    } catch {}
  }
  async function deleteCreditCard() {
    if (!editingCreditCard) return;
    const creditCardId = editingCreditCard.id || "";
    try {
      await api.delete(`credit-card/${creditCardId}`);
      setCreditCards((p) => p.filter((x) => x.id !== creditCardId));
      setEditingCreditCard(null);
    } catch {}
  }
  async function addCreditCard(address: CreditCardI) {
    try {
      if (address.id) {
        await updateCreditCard(address);
      } else {
        await createCreditCard(address);
      }
    } catch {}
    setEditingCreditCard(null);
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

      //   if (creditCards.length === 0) {
      //     setEditingCreditCard({ ...baseCreditCard, isFavorite: true });
      //     push("/buy/credit-card");
      //   }
    } catch (e) {
      //   setEditingCreditCard({ ...baseCreditCard, isFavorite: true });
      //   push("/buy/credit-card");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getCreditCards();
  }, []);

  return {
    creditCards,
    editingCreditCard,
    setCreditCards,
    addCreditCard,
    deleteCreditCard,
    isLoading,
    selectedCreditCardId,
    setSelectedCreditCardId,
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
