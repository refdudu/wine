import { BuyHeader } from "./BuyHeader";
import { AddressText, NewAddress } from "./NewAdress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AddressI } from "@/interfaces/Address";
import { MapPin, PencilLine, User } from "@phosphor-icons/react";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ShoppingCartProduct } from "@/components/ShoppingCartProduct";
import { api } from "@/utils/api";
import { useSession } from "@/contexts/SessionContext";
import { Spin } from "@/components/Spin";
import { Loader } from "@/components/Loader";
import { MasterContext } from "@/contexts/MasterContext";
import { useRouter } from "next/router";
import { OnlyAuthContainer } from "@/components/OnlyAuthContainer";

const _address: AddressI = {
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
const __address: AddressI = {
  id: "1",
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
  const { push } = useRouter();
  const { isAuthorized, isLoadingAuthorization } = useSession();

  console.log(
    "🚀 ~ BuyPage ~ isAuthorized, isLoadingAuthorization:",
    isAuthorized,
    isLoadingAuthorization
  );

  return (
    <OnlyAuthContainer>
      <BuyPageContainer />
    </OnlyAuthContainer>
  );
}

function BuyPageContainer() {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [editingAddress, setEditingAddress] = useState<AddressI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  async function getAddresses(isLoading = false) {
    setIsLoading(isLoading);
    try {
      const { data } = await api.get<{ addresses: AddressI[] }>("address");
      const { addresses } = data;
      const favoriteAddress =
        addresses.find((x) => x.isFavorite) || addresses[0];
      console.log("🚀 ~ getAddresses ~ favoriteAddress:", favoriteAddress);
      setSelectedAddressId(favoriteAddress.id || "");
      setAddresses(addresses);

      if (data.addresses.length === 0)
        setEditingAddress({ ..._address, isFavorite: true });
    } catch (e) {
      setEditingAddress({ ..._address, isFavorite: true });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getAddresses(true);
  }, []);

  if (isLoading)
    return (
      <div className="w-full h-64 flex justify-center items-end">
        <Spin />
      </div>
    );
  return (
    <BuyPageContent
      {...{
        addresses,
        setAddresses,
        editingAddress,
        setEditingAddress,
        getAddresses,
        selectedAddressId,
        setSelectedAddressId,
      }}
    />
  );
}

interface BuyPageContentProps {
  addresses: AddressI[];
  setAddresses: Dispatch<SetStateAction<AddressI[]>>;
  editingAddress: AddressI | null;
  setEditingAddress: Dispatch<SetStateAction<AddressI | null>>;
  getAddresses: () => void;
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
}
function BuyPageContent({
  addresses,
  setAddresses,
  editingAddress,
  setEditingAddress,
  getAddresses,
  selectedAddressId,
  setSelectedAddressId,
}: BuyPageContentProps) {
  async function createAddress(address: AddressI) {
    try {
      const { data } = await api.post<{ id: string }>("address", address);
      const { id } = data;
      setAddresses((p) => [...p, { ...address, id }]);
    } catch {}
  }
  async function updateAddress(address: AddressI) {
    try {
      await api.put(`address/${address.id}`, address);
      setAddresses((p) => p.map((x) => (x.id === address.id ? address : x)));
    } catch {}
  }
  async function deleteAddress() {
    if (!editingAddress) return;
    const addressId = editingAddress.id || "";
    try {
      await api.delete(`address/${addressId}`);
      setAddresses((p) => p.filter((x) => x.id !== addressId));
      setEditingAddress(null);
    } catch {}
  }
  async function addAddress(address: AddressI) {
    try {
      if (address.id) {
        await updateAddress(address);
      } else {
        await createAddress(address);
      }
    } catch {}
    setEditingAddress(null);
  }

  return (
    <div className="flex flex-col h-screen">
      <BuyHeader />
      <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
        <main className="max-w-[1120px] flex mx-auto gap-9  flex-col md:flex-row">
          <div className="md:w-4/6">
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
          <div onClick={getAddresses} className="w-2/6  h-full">
            <ShoppingCartItens />
          </div>
        </main>
      </div>
    </div>
  );
}

function ShoppingCartItens() {
  const {
    shoppingCartProducts: products,
    changeProductAmount,
    handleRemoveFromShoppingCart,
  } = useShoppingCart();

  return (
    <>
      <header className="flex h-9">
        <button className="flex-1 bg-custom-violet text-white text-center rounded-tl-md">
          Itens
        </button>
        <button className="flex-1 bg-white text-custom-violet text-center">
          Detalhes
        </button>
      </header>
      <main className="border border-custom-gray-light">
        {products.map((product, index, array) => (
          <ShoppingCartProduct
            array={array}
            changeProductAmount={changeProductAmount}
            handleRemove={handleRemoveFromShoppingCart}
            index={index}
            product={product}
          />
        ))}
      </main>
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
    <div>
      <div className="flex gap-2 text-lg items-center border-b border-b-custom-gray-light text-custom-gray">
        <MapPin />
        <span>Escolha um endereço para entrega</span>
      </div>
      <div className="flex items-stretch flex-wrap gap-4 mt-4">
        {addresses.map((address) => (
          <AddressCard
            selectAddress={() => setSelectedAddressId(address.id || "")}
            isSelected={selectedAddressId === address.id}
            address={address}
            setIsEditing={() => setEditingAddress(address)}
          />
        ))}
        <AddressAddCard setIsEditing={() => setEditingAddress(_address)} />
      </div>
    </div>
  );
}
interface AddressCardProps {
  setIsEditing: () => void;
  address: AddressI;
  isSelected: boolean;
  selectAddress: () => void;
}
function AddressCard({
  setIsEditing,
  address,
  isSelected,
  selectAddress,
}: AddressCardProps) {
  return (
    <div className="max-w-64 w-full border border-custom-gray-light">
      {isSelected && (
        <header className="bg-custom-violet w-full text-white p-2">
          Selecionado
        </header>
      )}
      <div className="p-4">
        <div className="flex items-center text-xl justify-between">
          <div className="flex gap-2 items-center">
            <span>{address.addressIdentify}</span>
            {!isSelected && (
              <button className="text-custom-violet text-sm">Selecionar</button>
            )}
          </div>
          <button onClick={setIsEditing}>
            <PencilLine color="#B6116E" />
          </button>
        </div>
        <div className="flex items-center text-custom-gray-light font-light gap-1">
          <User />
          {address.addressIdentify}
        </div>
        <AddressText address={address} />
      </div>
    </div>
  );
}

interface AddressAddCardProps {
  setIsEditing: () => void;
}
function AddressAddCard({ setIsEditing }: AddressAddCardProps) {
  return (
    <div className="max-w-64 w-full border border-custom-gray-light flex-1 flex items-center justify-center">
      <button
        onClick={setIsEditing}
        className="p-4 border border-custom-violet text-custom-violet bg-white flex items-center justify-center rounded"
      >
        Novo endereço
      </button>
    </div>
  );
}
