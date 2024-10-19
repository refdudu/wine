import { Check, CreditCard, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import { RadioInput } from "@/components/RadioInput";
import { useState } from "react";
import { Button } from "@/components/Button";
import { NextPageWithLayout } from "@/pages/_app";
import { BuyDefaultHeader } from "../BuyDefaultHeader";

const paymentMethods = [
  {
    label: "Cartão de crédito",
    value: "credit-card",
    icon: CreditCard,
  },
  {
    label: "Pix",
    value: "pix",
    icon: PixLogo,
  },
];

export const PaymentPage: NextPageWithLayout = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  return (
    <>
      <BuyDefaultHeader
        {...{ icon: CreditCard, title: "Escolha sua forma de pagamento" }}
      />
      <main className="mt-4 min-h-96 flex gap-8">
        <div className="flex flex-col gap-2 border-custom-line border max-w-72 w-full uppercase">
          {paymentMethods.map(({ icon: Icon, label, value }) => (
            <div className="border-custom-line text-custom-gray border-b p-2 w-full">
              <RadioInput
                value={value}
                checked={value === selectedPaymentMethod}
                key={value}
                name="between_the_price"
                onChange={() => setSelectedPaymentMethod(value)}
              >
                <div className="flex justify-between w-full">
                  <span>{label}</span>
                  <Icon size={24} />
                </div>
              </RadioInput>
            </div>
          ))}
        </div>
        <div className="h-full w-full flex justify-center items-center">
          <PaymentMethod paymentMethod={selectedPaymentMethod} />
        </div>
      </main>
      <Footer />
    </>
  );
};

PaymentPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

function Footer() {
  return (
    <footer className="w-full mt-8 border-t pt-4 border-t-custom-line flex justify-between">
      <Button
        href="address"
        className="bg-white border border-custom-gray max-w-48 h-10"
      >
        Voltar
      </Button>
      <Button
        href="payment"
        icon={<Check />}
        className="bg-custom-green text-white max-w-64 h-10"
      >
        Finalizar pedido
      </Button>
    </footer>
  );
}
interface PaymentMethodProps {
  paymentMethod: string;
}
function PaymentMethod({ paymentMethod }: PaymentMethodProps) {
  switch (paymentMethod) {
    case "pix":
      return <Pix />;
    case "credit-card":
      return <CreditCardComponent />;
    default:
      return <></>;
  }
}

function Pix() {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <PixLogo size={64} className="text-teal-500" />
      <span className="text-lg">
        O QR code será gerado ao finalizar a compra.
      </span>
      <span className="text-sm text-custom-gray">
        Também será gerada uma chave Pix que poderá ser utilizada para o
        pagamento.
      </span>
    </div>
  );
}

function CreditCardComponent() {
  const { creditCards } = useBuyPage();
  if (creditCards.length !== 0) {
    return <span>{creditCards[0]?.name}</span>;
  }
  
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="text-lg">
        Você não tem nenhum cartão de crédito cadastrado
      </span>
      <span className="text-sm text-custom-gray">
        Clique no botão abaixo para cadastrar seu cartão.
      </span>
      <Button
        href="credit-card"
        className="border h-10 border-custom-tannat text-custom-tannat max-w-64"
      >
        Cadastrar cartão
      </Button>
    </div>
  );
}
