import { NewAddress } from "./NewAdress";
import { Dispatch, SetStateAction } from "react";
import { AddressI } from "@/interfaces/Address";
import { ArrowRight, MapPin } from "@phosphor-icons/react";
import { Spin } from "@/components/Spin";
import { baseAddress, useBuyPage } from "./useBuyAddressPage";
import { AddressCard } from "./AddressCard";
import { BuyPageProvider } from "../BuyContext";
import { Button } from "@/components/Button";

export function AddressPage() {
  return (
    <BuyPageProvider>
      <BuyPageContainer />
    </BuyPageProvider>
  );
}

export function BuyPageContainer() {
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
  selectedAddressId,
  setSelectedAddressId,
  addAddress,
  deleteAddress,
}: BuyPageContentProps) {
  if (editingAddress) {
    return (
      <NewAddress
        totalAddresses={addresses.length}
        deleteAddress={deleteAddress}
        handleCancel={() => setEditingAddress(null)}
        editingAddress={editingAddress}
        addAddress={addAddress}
      />
    );
  }

  return (
    <AllAddress
      setSelectedAddressId={setSelectedAddressId}
      selectedAddressId={selectedAddressId}
      addresses={addresses}
      setEditingAddress={setEditingAddress}
    />
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
            key={address.id}
            selectAddress={() => setSelectedAddressId(address.id || "")}
            isSelected={selectedAddressId === address.id}
            address={address}
            setIsEditing={() => setEditingAddress(address)}
          />
        ))}
      </div>
      <footer className="flex justify-end w-full mt-8">
        <Button
          icon={<ArrowRight />}
          className="bg-custom-green text-white max-w-64"
        >
          Definir pagamento
        </Button>
      </footer>
    </div>
  );
}
