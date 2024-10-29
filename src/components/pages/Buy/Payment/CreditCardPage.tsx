import { Input } from "@/components/Input";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import * as Yup from "yup";
import { useState } from "react";
import { baseCreditCard } from "./useBuyPaymentPage";
import { NextPageWithLayout } from "@/pages/_app";
import { Check, CreditCard, Star } from "@phosphor-icons/react";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { Button } from "@/components/Button";
import { useRouter } from "next/router";
import { CreditCardI } from "@/interfaces/CreditCardI";
import { creditCardSchema } from "@/validation/credit-card";
import { GetFieldsErrors } from "@/utils/errors/GetFieldsErrors";

export const CreditCardPage: NextPageWithLayout = () => {
  const { addCreditCard } = useBuyPage();
  const { push } = useRouter();
  const [creditCard, setCreditCard] = useState(baseCreditCard);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(_object: object) {
    setCreditCard((p) => ({ ...p, ..._object }));
  }

  async function handleAddCreditCard() {
    setIsLoading(true);
    try {
      await creditCardSchema.validate(creditCard, { abortEarly: false });
      await addCreditCard(creditCard);
      push("/buy/payment");
    } catch (e) {
      if (e instanceof Yup.ValidationError) setErrors(GetFieldsErrors(e));
    }
    setIsLoading(false);
  }
  return (
    <>
      <BuyDefaultHeader {...{ title: "Cadastrar novo cartão de crédito" }} />
      <main className="flex flex-col-reverse lg:flex-row gap-6 mt-4 lg:h-96">
        <div className="flex-col max-w-72 gap-6 flex">
          <div className="hidden lg:block">
            <CreditCardInfo {...{ creditCard }} />
          </div>
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
      <footer className="flex flex-col lg:flex-row gap-4 lg:gap-8 justify-end mt-4 pt-4 border-t border-t-custom-line">
        <Button href="payment" className="lg:max-w-32 h-10" styleType="default">
          Voltar
        </Button>
        <Button
          isLoading={isLoading}
          icon={<Check />}
          onClick={handleAddCreditCard}
          className="lg:max-w-52 h-10"
          styleType="primary-full"
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
    <div
      className="rounded px-8 py-4 flex flex-col gap-2 w-72 text-left"
      style={{
        backgroundImage:
          "url(https://img.wine.com.br/fenix/image/card_bg_black.png)",
      }}
    >
      <div className="flex items-center justify-between">
        <CreditCard size="36" className="text-custom-gray-light" />
        {creditCard.isFavorite && (
          <Star size="24" weight="fill" className="text-yellow-400" />
        )}
      </div>
      <div className="flex justify-between">
        <CreditCardValue
          label="Número do cartão"
          maxWidth={135}
          value={creditCard.number}
        />
        <CreditCardValue
          label="Vencimento"
          maxWidth={50}
          value={creditCard.expirationDate}
        />
      </div>
      <div className="flex justify-between">
        <CreditCardValue label="Nome" maxWidth={135} value={creditCard.name} />
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
      className={`flex-1 flex flex-col justify-between text-xs min-h-10`}
      style={{ maxWidth }}
    >
      <span className={`text-gray-200`}>{label}</span>
      <div className="border-b border-b-white pb-1 text-white">
        <span className="">{value}</span>
      </div>
    </div>
  );
}
