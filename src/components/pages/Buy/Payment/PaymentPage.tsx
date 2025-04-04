import { ArrowRight, CreditCard, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import { RadioInput } from "@/components/RadioInput";
import { Button } from "@/components/Button";
import type { NextPageWithLayout } from "@/pages/_app";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { CreditCardComponent } from "./CreditCardComponents";
import { PaymentMethodE } from "./useBuyPaymentPage";
import type { CreditCardI } from "@/interfaces/CreditCardI";

const paymentMethods = [
  {
    label: "Cartão de crédito",
    value: PaymentMethodE.CreditCard,
    icon: CreditCard,
  },
  {
    label: "Pix",
    value: PaymentMethodE.Pix,
    icon: PixLogo,
  },
];

export const PaymentPage: NextPageWithLayout = () => {
  const { selectedPaymentMethod, setSelectedPaymentMethod, creditCards } =
    useBuyPage();

  return (
    <>
      <BuyDefaultHeader
        {...{
          icon: CreditCard,
          title: "Escolha sua forma de pagamento",
        }}
      />
      <main className="mt-4 lg:h-96 flex gap-8 flex-col lg:flex-row">
        <div className="flex flex-col gap-2 border-custom-line border lg:max-w-72 w-full uppercase">
          {paymentMethods.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="border-custom-line text-custom-gray border-b p-2 w-full"
            >
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
      <Footer {...{ selectedPaymentMethod, creditCards }} />
    </>
  );
};

PaymentPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

interface FooterProps {
  selectedPaymentMethod: string;
  creditCards: CreditCardI[];
}
function Footer({ selectedPaymentMethod, creditCards }: FooterProps) {
  const showContinueButton =
    (selectedPaymentMethod === "credit-card" && creditCards.length > 0) ||
    selectedPaymentMethod === "pix";
  return (
    <footer className="flex lg:justify-between flex-col lg:flex-row gap-4 w-full mt-4 pt-4 border-t border-t-custom-line ">
      <Button href="address" className="lg:max-w-48 h-10" styleType="default">
        Voltar
      </Button>
      <div className="flex gap-4 flex-1 justify-end flex-col lg:flex-row">
        {selectedPaymentMethod === "credit-card" && creditCards.length > 0 && (
          <Button
            href="credit-card"
            styleType="primary-outline"
            className="h-10 lg:max-w-32 px-2"
          >
            Novo cartão
          </Button>
        )}
        {showContinueButton && (
          <Button
            href="checkout"
            icon={<ArrowRight />}
            className="lg:max-w-64 h-10"
            styleType="success"
          >
            Continuar
          </Button>
        )}
      </div>
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
