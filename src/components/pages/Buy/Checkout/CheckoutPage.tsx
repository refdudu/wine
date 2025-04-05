import { MapPin, PixLogo } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import type { NextPageWithLayout } from "@/pages/_app";
import { BuyDefaultHeader } from "../BuyDefaultHeader";
import { AddressText } from "../Address/NewAddress";
import { Button } from "@/components/Button";
import { PaymentMethodE } from "../Payment/useBuyPaymentPage";
import MasterCardLogo from "../MastercardLogo.png";
import Image from "next/image";
import { useTotalShoppingCartProducts } from "@/contexts/ShoppingCartContext";

export const CheckoutPage: NextPageWithLayout = () => {
  return (
    <>
      <BuyDefaultHeader
        {...{
          title: "Revise e confirme sua compra",
        }}
      />
      <Main />
      <Footer />
    </>
  );
};
function Main() {
  const totalProducts = useTotalShoppingCartProducts();
  const {
    selectedAddressId,
    addresses,
    selectedPaymentMethod,
    creditCards,
    selectedCreditCardId,
  } = useBuyPage();

  const address = addresses.find((x) => x.id === selectedAddressId);

  let paymentMethodInfo = {
    icon: <></>,
    title: "",
  };
  switch (selectedPaymentMethod) {
    case PaymentMethodE.CreditCard:
      {
        // Removed console.log to avoid unintentional logging in production
        const creditCard = creditCards.find(
          (x) => x.id === selectedCreditCardId
        );
        paymentMethodInfo = {
          icon: (
            <Image width={24} src={MasterCardLogo} alt="Bandeira do cartão" />
          ),
          title: `Mastercard ${creditCard?.number}`,
        };
      }
      break;
    case PaymentMethodE.Pix:
      {
        paymentMethodInfo = {
          icon: <PixLogo size={24} className="text-teal-500" />,
          title: "Pix",
        };
      }
      break;
  }
  if (!address) return null;

  return (
    <main className="mt-4 lg:h-96 flex gap-8 flex-col">
      <InformationItem
        action={{ href: "/buy/address", label: "Editar ou escolher outro" }}
        icon={<MapPin className="text-custom-violet" size={24} />}
        info={{
          title: address.addressIdentify,
          subTitle: <AddressText address={address} />,
        }}
        title="Detalhes do envio"
      />
      <InformationItem
        action={{ href: "/buy/payment", label: "Alterar" }}
        icon={paymentMethodInfo.icon}
        info={{
          title: paymentMethodInfo.title,
          subTitle: `Você pagará ${totalProducts}`,
        }}
        title="Detalhes do pagamento"
      />
    </main>
  );
}
function Footer() {
  return (
    <footer className="flex lg:justify-between flex-col lg:flex-row gap-4 w-full mt-4 pt-4 border-t border-t-custom-line ">
      <Button href="payment" className="lg:max-w-48 h-10" styleType="default">
        Voltar
      </Button>
      <Button href="checkout" className="lg:max-w-64 h-10" styleType="success">
        Finalizar compra
      </Button>
    </footer>
  );
}

CheckoutPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

interface InformationItemProps {
  info: {
    title: string;
    subTitle?: React.ReactNode;
  };
  title: string;
  icon: React.ReactNode;
  action: {
    href: string;
    label: string;
  };
}
function InformationItem({ icon, title, action, info }: InformationItemProps) {
  return (
    <div className="w-full flex-col flex gap-2">
      <span className="font-semibold">{title}</span>
      <div className="flex justify-between gap-8 items-center w-full  bg-custom-background-light rounded p-4">
        <div className="flex flex-1 gap-4">
          <div className="h-12 w-12 rounded-full items-center bg-white flex justify-center ">
            {icon}
          </div>
          <div className="flex flex-col flex-1 max-w-80">
            {<span className="text-lg">{info.title}</span>}
            <div className="text-custom-gray-light text-sm">
              {info.subTitle}
            </div>
          </div>
        </div>
        <div>
          <Button href={action.href} className="text-custom-violet">
            {action.label}
          </Button>
        </div>
      </div>
    </div>
  );
}
