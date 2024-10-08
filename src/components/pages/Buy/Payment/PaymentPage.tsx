import { Check, CreditCard, Icon, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider } from "../BuyContext";
import { RadioInput } from "@/components/RadioInput";
import { useState } from "react";
import { Button } from "@/components/Button";

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

export function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("credit-card");

  return (
    <BuyPageProvider>
      <Header />
      <main className="mt-4 h-96 flex gap-8">
        <div className="flex flex-col gap-2 h-full border-custom-gray-light border max-w-60 w-full uppercase">
          {paymentMethods.map(({ icon: Icon, label, value }) => (
            <div className="border-custom-gray-light text-custom-gray border-b p-2 w-full">
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
    </BuyPageProvider>
  );
}

function Header() {
  return (
    <header className="flex items-center justify-between border-b pb-4 border-b-custom-gray-light text-custom-gray">
      <div className="flex gap-2 items-center">
        <CreditCard size={24} />
        <span className="text-xl">Escolha sua forma de pagamento</span>
      </div>
    </header>
  );
}
function Footer() {
  return (
    <footer className="flex justify-between w-full mt-8 border-t pt-4 border-t-custom-gray-light">
      <Button
        href="address"
        className="bg-white border border-custom-gray max-w-48"
      >
        Voltar
      </Button>
      <Button
        href="payment"
        icon={<Check />}
        className="bg-custom-green text-white max-w-64"
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
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <span className="text-lg">
        Você não tem nenhum cartão de crédito cadastrado
      </span>
      <span className="text-sm text-custom-gray">
        Clique no botão abaixo para cadastrar seu cartão.
      </span>
      <Button className="border border-custom-tannat text-custom-tannat max-w-64">
        Cadastrar cartão
      </Button>
    </div>
  );
}
