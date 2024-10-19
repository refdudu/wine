import { Input } from "@/components/Input";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import * as Yup from "yup";
import { useState } from "react";
import {
  _creditCard,
  CreditCardI,
  creditCardSchema,
} from "./useBuyPaymentPage";
import { NextPageWithLayout } from "@/pages/_app";
import { Check, CreditCard } from "@phosphor-icons/react";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";

export const CreditCardPage: NextPageWithLayout = () => {
  const { setCreditCards } = useBuyPage();
  const { push } = useRouter();
  const [creditCard, setCreditCard] = useState(_creditCard);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(_object: object) {
    setCreditCard((p) => ({ ...p, ..._object }));
  }

  async function handleAddCreditCard() {
    setIsLoading(true);
    try {
      await creditCardSchema.validate(creditCard, { abortEarly: false });
      setCreditCards((p) => [...p, creditCard]);
      push("/buy/payment");
    } catch (e) {
      console.log(e);
      if (e instanceof Yup.ValidationError) {
        const { inner } = e as Yup.ValidationError;
        const errors: Record<string, string> = {};
        for (const { path, message } of inner) {
          if (path) errors[path] = message;
        }
        setErrors(errors);
      }
    }
    setIsLoading(false);
  }
  return (
    <>
      <BuyDefaultHeader {...{ title: "Cadastrar novo cartão de crédito" }} />
      <main className="flex gap-6 mt-4">
        <div className="flex-col max-w-72 gap-6 flex">
          <CreditCardInfo {...{ creditCard }} />
          <div className="flex flex-col gap-2">
            <span className="text-xs text-custom-gray">
              Deseja tornar esse cartão como o favorito?
            </span>
            <ToggleSwitch
              isChecked={creditCard.isFavorite}
              setIsChecked={(isFavorite) => handleChange({ isFavorite })}
            />
          </div>
        </div>
        <Form {...{ creditCard, errors, handleChange }} />
      </main>
      <footer className="flex py-4 gap-8 justify-end ">
        <Button
          href="payment"
          className="max-w-32 h-10 bg-white border text-custom-gray-light border-custom-gray-light"
        >
          Voltar
        </Button>
        <Button
          isLoading={isLoading}
          icon={<Check />}
          onClick={handleAddCreditCard}
          className="max-w-52 bg-custom-violet text-white"
        >
          Salvar endereço
        </Button>
      </footer>
    </>
  );
};

CreditCardPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

interface FormProps {
  errors: Record<string, string>;
  creditCard: CreditCardI;
  handleChange: (object: object) => void;
}
function Form({ creditCard, errors, handleChange }: FormProps) {
  return (
    <main className="flex-1 flex flex-col gap-5">
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
  );
}

interface CreditCardInfoProps {
  creditCard: CreditCardI;
}
function CreditCardInfo({ creditCard }: CreditCardInfoProps) {
  return (
    <div className="bg-gray-500  rounded px-8 py-4 flex flex-col gap-2 w-72">
      <div>
        <CreditCard size="36" className="text-custom-gray" />
      </div>
      <div className="flex justify-between">
        <CreditCardValue
          label="Número do cartão"
          maxWidth={125}
          value={creditCard.number}
        />
        <CreditCardValue
          label="Vencimento"
          maxWidth={50}
          value={creditCard.expirationDate}
        />
      </div>
      <div className="flex justify-between">
        <CreditCardValue label="Nome" maxWidth={125} value={creditCard.name} />
        <CreditCardValue label="CVV" maxWidth={50} value={creditCard.cvv} />
      </div>
    </div>
  );
}
interface CreditCardValueProps {
  label: string;
  value: string;
  maxWidth: number;
}
function CreditCardValue({ label, maxWidth, value }: CreditCardValueProps) {
  return (
    <div
      className={`flex-1 flex flex-col justify-between text-xs h-10`}
      style={{ maxWidth }}
    >
      <span className={`text-gray-200`}>{label}</span>
      <div className="border-b border-b-white pb-1 text-white">
        <span className="">{value}</span>
      </div>
    </div>
  );
}
