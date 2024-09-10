import { BuyHeader } from "./BuyHeader";
import { NewAddress } from "./NewAdress";
import { Dispatch, SetStateAction, useState } from "react";
import { AddressI } from "@/interfaces/Address";
import { MapPin } from "@phosphor-icons/react";
import { Spin } from "@/components/Spin";
import { OnlyAuthContainer } from "@/components/OnlyAuthContainer";
import { baseAddress, useBuyPage } from "./useBuyPage";
import { AddressCard } from "./AddressCard";
import {
  ShoppingCartItens,
  ShoppingCartItensFooter,
  ShoppingCartItensHeader,
} from "./ShoppingCartItens";
import { ShoppingCartItensDrawer } from "./DrawerShoppingCartItens";

export function BuyPage() {
  return (
    <OnlyAuthContainer>
      <BuyPageContainer />
    </OnlyAuthContainer>
  );
}

function BuyPageContainer() {
  const { isLoading, ...props } = useBuyPage();

  if (isLoading)
    return (
      <div className="w-full h-64 flex justify-center items-end">
        <Spin />
      </div>
    );
  return <BuyPageContent {...props} />;
}

interface BuyPageContentProps {
  addresses: AddressI[];
  editingAddress: AddressI | null;
  setEditingAddress: Dispatch<SetStateAction<AddressI | null>>;
  getAddresses: () => Promise<void>;
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
  deleteAddress: () => Promise<void>;
  addAddress: (address: AddressI) => Promise<void>;
}
function BuyPageContent({
  addresses,
  editingAddress,
  setEditingAddress,
  getAddresses,
  selectedAddressId,
  setSelectedAddressId,
  addAddress,
  deleteAddress,
}: BuyPageContentProps) {
  const [isVisibleShoppingCartItens, setIsVisibleShoppingCartItens] =
    useState(false);
  return (
    <>
      <ShoppingCartItensDrawer
        isVisible={isVisibleShoppingCartItens}
        setIsVisible={setIsVisibleShoppingCartItens}
      />
      <div className="flex flex-col h-screen">
        <BuyHeader />
        <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
          <main className="max-w-[1120px] flex mx-auto gap-9  flex-col md:flex-row">
            <div className="w-full lg:w-4/6">
              {editingAddress ? (
                <NewAddress
                  totalAddresses={addresses.length}
                  deleteAddress={deleteAddress}
                  handleCancel={() => setEditingAddress(null)}
                  editingAddress={editingAddress}
                  addAddress={addAddress}
                />
              ) : (
                <AllAddress
                  setSelectedAddressId={setSelectedAddressId}
                  selectedAddressId={selectedAddressId}
                  addresses={addresses}
                  setEditingAddress={setEditingAddress}
                />
              )}
            </div>
            <div
              onClick={getAddresses}
              className="w-2/6  h-full shadow  hidden lg:flex flex-col"
            >
              <ShoppingCartItensHeader />
              <div className="border border-custom-gray-light">
                <ShoppingCartItens />
              </div>
              <ShoppingCartItensFooter />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

interface AllAddressProps {
  setEditingAddress: Dispatch<SetStateAction<AddressI | null>>;
  addresses: AddressI[];
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
}
function AllAddress({
  setEditingAddress,
  addresses,
  selectedAddressId,
  setSelectedAddressId,
}: AllAddressProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between border-b pb-2 border-b-custom-gray-light text-custom-gray">
        <div className="flex gap-2 items-center">
          <MapPin size={24} />
          <span className="text-xl">Escolha um endereço para entrega</span>
        </div>
        <div>
          <button
            onClick={() => setEditingAddress(baseAddress)}
            className="px-2 py-1 border border-custom-violet text-custom-violet bg-white flex items-center justify-center rounded"
          >
            Novo endereço
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-col lg:grid grid-cols-2 gap-4">
        {addresses.map((address) => (
          <AddressCard
            selectAddress={() => setSelectedAddressId(address.id || "")}
            isSelected={selectedAddressId === address.id}
            address={address}
            setIsEditing={() => setEditingAddress(address)}
          />
        ))}
      </div>
    </div>
  );
}
