import { NewAddress } from "./NewAdress";
import { Dispatch, SetStateAction } from "react";
import { AddressI } from "@/interfaces/Address";
import { Spin } from "@/components/Spin";
import { useBuyPage } from "./useBuyAddressPage";
import { BuyPageProvider } from "../BuyContext";
import { AllAddress } from "./AllAddress";

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
