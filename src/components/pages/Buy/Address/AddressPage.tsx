import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { BuyPageProvider, useBuyPage } from "../BuyContext";
import { AddressCard } from "./AddressCard";
import { Button } from "@/components/Button";
import { NextPageWithLayout } from "@/pages/_app";
import { useRouter } from "next/router";
import { AddressI } from "@/interfaces/Address";
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

  return (
    <>
      <BuyDefaultHeader
        {...{
          icon: MapPin,
          title: "Escolha um endereço para entrega",
          action: (
            <div>
              <Button
                href="new-address"
                styleType="primary-outline"
                className="py-1 px-2"
              >
                Novo endereço
              </Button>
            </div>
          ),
        }}
      />
      <main className="mt-4 h-96 flex flex-col lg:grid grid-cols-2 gap-4">
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
      <footer className="flex justify-end w-full mt-8 border-t pt-4 border-t-line">
        <Button
          href="payment"
          linkShallow
          icon={<ArrowRight />}
          className="bg-custom-green text-white max-w-64 p-2"
        >
          Definir pagamento
        </Button>
      </footer>
    </>
  );
};
AddressPage.getLayout = (page) => <BuyPageProvider>{page}</BuyPageProvider>;
