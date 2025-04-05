import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import { AddressCard } from "./AddressCard";
import { Button } from "@/components/Button";
import type { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import type { AddressI } from "@/interfaces/Address";
import { BuyDefaultHeader } from "../BuyDefaultHeader";

export const AddressPage: NextPageWithLayout = () => {
  const {
    addresses,
    selectedAddressId,
    setEditingAddress,
    setSelectedAddressId,
  } = useBuyPage();

  const { push } = useRouter();

  function editAddress(address: AddressI) {
    setEditingAddress(address);
    push("/buy/new-address");
  }
  if (addresses.length === 0) return null;
  return (
    <>
      <BuyDefaultHeader
        {...{
          icon: MapPin,
          title: "Escolha um endereço para entrega",
          action: <div />,
        }}
      />
      <main className="mt-4 lg:h-96 overflow-auto flex flex-col lg:grid grid-cols-2 auto-rows-min  gap-4">
        {addresses.map((address) => (
          <AddressCard
            key={address.id}
            selectAddress={() => setSelectedAddressId(address.id || "")}
            isSelected={selectedAddressId === address.id}
            address={address}
            setIsEditing={() => editAddress(address)}
          />
        ))}
      </main>
      <Footer />
    </>
  );
};
AddressPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;

function Footer() {
  return (
    <footer className="flex flex-col lg:flex-row justify-end w-full mt-4 pt-4 border-t border-t-custom-line gap-4">
      <Button
        href="new-address"
        linkShallow
        styleType="primary-outline"
        className="h-10 lg:max-w-32"
      >
        Novo endereço
      </Button>
      <Button
        href="payment"
        linkShallow
        icon={<ArrowRight />}
        styleType="success"
        className="h-10 lg:max-w-64"
      >
        Definir pagamento
      </Button>
    </footer>
  );
}
