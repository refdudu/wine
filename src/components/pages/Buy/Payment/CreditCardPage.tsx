import { Input } from "@/components/Input";
import { BuyPageProvider } from "../BuyContext";
import * as Yup from "yup";
import { useState } from "react";
import { _creditCard, creditCardSchema } from "./useBuyPaymentPage";
import { NextPageWithLayout } from "@/pages/_app";

export const CreditCardPage: NextPageWithLayout = () => {
  const [creditCard, setCreditCard] = useState(_creditCard);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(_object: object) {
    setCreditCard((p) => ({ ...p, ..._object }));
  }

  async function handleAddCreditCard() {
    try {
      await creditCardSchema.validate(creditCard, { abortEarly: false });
    } catch (e) {
      const { inner } = e as Yup.ValidationError;
      const errors: Record<string, string> = {};
      for (const { path, message } of inner) {
        if (path) errors[path] = message;
      }
      setErrors(errors);
    }
  }
  return (
    <div className="w-full flex flex-col gap-8">
      <main className="w-full flex flex-col gap-5">
        <Input
          error={errors["name"]}
          value={creditCard.name}
          onChangeText={(name) => handleChange({ name })}
          label="Nome"
        />
        <Input
          error={errors["number"]}
          value={creditCard.number}
          onChangeText={(number) => handleChange({ number })}
          label="Número do cartão"
          mask="9999 9999 9999 9999"
        />
        <Input
          error={errors["expirationDate"]}
          value={creditCard.expirationDate}
          onChangeText={(expirationDate) => handleChange({ expirationDate })}
          label="Validade (MM/AA)"
          mask="99/99"
        />
        <Input
          error={errors["cvv"]}
          value={creditCard.cvv}
          onChangeText={(cvv) => handleChange({ cvv })}
          label="CVV"
          mask="999"
        />
      </main>
    </div>
  );
};

CreditCardPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;
