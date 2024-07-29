import { BuyHeader } from "./BuyHeader";
import { AddressText, NewAddress } from "./NewAdress";
import { Dispatch, SetStateAction, useState } from "react";
import { Address } from "@/interfaces/Address";
import { MapPin, MarkerCircle, PencilLine, User } from "@phosphor-icons/react";

const _address: Address = {
  id: null,
  address: "",
  addressIdentify: "",
  cep: "",
  city: null,
  complement: "",
  conciergeAllDay: false,
  isFavorite: false,
  neighborhood: "",
  number: "",
  phone: "",
  recipientName: "",
  referencePoint: "",
  state: null,
};
const __address: Address = {
  id: 1,
  addressIdentify: "Casa",
  recipientName: "Renan Fischer",
  phone: "55999029974",
  cep: "98910000",
  address: "Rua Emilio Tesche",
  neighborhood: "Oriental",
  city: {
    key: "4321808",
    label: "Três de Maio",
  },
  state: {
    key: "RS",
    label: "Rio Grande do Sul",
  },
  referencePoint: "",
  number: "782",
  complement: "Casa",
  isFavorite: true,
  conciergeAllDay: true,
};

export function BuyPage() {
  const [editingAddress, setIsEditingAddress] = useState<Address | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([__address]);
  function addAddress(address: Address) {
    console.log(address);
    if (address.id) {
      setAddresses((p) => p.map((x) => (x.id === address.id ? address : x)));
    } else {
      setAddresses((p) => [...p, address]);
    }
    setIsEditingAddress(null);
  }

  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />
      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <main className="max-w-[1120px] flex mx-auto  flex-col md:flex-row">
          <div className="md:w-4/5">
            {editingAddress ? (
              <NewAddress
                handleCancel={() => setIsEditingAddress(null)}
                editingAddress={editingAddress}
                addAddress={addAddress}
              />
            ) : (
              <div>
                <AllAddress
                  addresses={addresses}
                  setEditingAddress={setIsEditingAddress}
                />
              </div>
            )}
          </div>
          {/* <div className="w-1/5">pagamento</div> */}
        </main>
      </div>
    </div>
  );
}

interface AllAddressProps {
  setEditingAddress: Dispatch<SetStateAction<Address | null>>;
  addresses: Address[];
}
function AllAddress({ setEditingAddress, addresses }: AllAddressProps) {
  return (
    <div>
      <div className="flex gap-2 text-lg items-center border-b border-b-custom-gray-light text-custom-gray">
        <MapPin />
        <span>Escolha um endereço para entrega</span>
      </div>
      <div className="flex items-center flex-wrap gap-4 mt-4">
        {addresses.map((address) => (
          <AddressCard
            address={address}
            setIsEditing={() => {
              setEditingAddress(address);
              console.log(address);
            }}
          />
        ))}
      </div>
    </div>
  );
}
interface AddressCardProps {
  setIsEditing: () => void;
  address: Address;
}
function AddressCard({ setIsEditing, address }: AddressCardProps) {
  return (
    <div className="max-w-64 w-full border border-custom-gray-light">
      <header className="bg-custom-violet w-full text-white p-2">
        Selecionado
      </header>
      <div className="p-4">
        <div className="flex items-center text-xl justify-between">
          <span>Renan</span>
          <button onClick={setIsEditing}>
            <PencilLine color="#B6116E" />
          </button>
        </div>
        <div className="flex items-center text-custom-gray-light font-light gap-1">
          <User />
          Renan Fischer
        </div>
        <AddressText address={address} />
      </div>
    </div>
  );
}
