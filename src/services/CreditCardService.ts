import { CreditCardI } from "@/interfaces/CreditCardI";
import { api } from "@/utils/api";

export interface CreditCardServiceI {
    getCreditCard: () => Promise<CreditCardI[]>;
    createCreditCard: (creditCard: CreditCardI) => Promise<CreditCardI[]>;
    deleteCreditCard: (creditCardId: string) => Promise<CreditCardI[]>;
}
export class ApiCreditCardService implements CreditCardServiceI {
  public async getCreditCard(): Promise<CreditCardI[]> {
    const { data } = await api.get<{ creditCards: CreditCardI[] }>(
      "credit-card"
    );
    return data.creditCards;
  }
  public async createCreditCard(
    creditCard: CreditCardI
  ): Promise<CreditCardI[]> {
    const { data } = await api.post<{ creditCards: CreditCardI[] }>(
      "credit-card",
      creditCard
    );
    return data.creditCards;
  }
  public async deleteCreditCard(creditCardId: string): Promise<CreditCardI[]> {
    const { data } = await api.delete<{ creditCards: CreditCardI[] }>(
      `credit-card/${creditCardId}`
    );
    return data.creditCards;
  }
}
