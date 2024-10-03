import { AddressI } from "@/interfaces/Address";
import { api } from "@/utils/api";
import { useEffect, useState } from "react";

export const useBuyPage = () => {
  const [addresses, setAddresses] = useState<AddressI[]>([]);
  const [editingAddress, setEditingAddress] = useState<AddressI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  async function createAddress(address: AddressI) {
    try {
      const { data } = await api.post<{ id: string }>("address", address);
      const { id } = data;
      await getAddresses();
      //   setAddresses((p) => [...p, { ...address, id }]);
    } catch {}
  }
  async function updateAddress(address: AddressI) {
    try {
      delete address.createdAt;

      await api.put(`address/${address.id}`, address);
      await getAddresses();
      // setAddresses((p) => p.map((x) => (x.id === address.id ? address : x)));
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

  async function getAddresses(isLoading = false) {
    setIsLoading(isLoading);
    try {
      const { data } = await api.get<{ addresses: AddressI[] }>("address");
      const { addresses } = data;
      const favoriteAddress =
        addresses.find((x) => x.isFavorite) || addresses[0];

      if (!selectedAddressId) setSelectedAddressId(favoriteAddress.id || "");
      setAddresses(addresses);

      if (data.addresses.length === 0)
        setEditingAddress({ ...baseAddress, isFavorite: true });
    } catch (e) {
      setEditingAddress({ ...baseAddress, isFavorite: true });
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getAddresses(true);
  }, []);

  return {
    isLoading,
    addresses,
    editingAddress,
    setEditingAddress,
    getAddresses,
    selectedAddressId,
    setSelectedAddressId,
    deleteAddress,
    addAddress,
  };
};
export const baseAddress: AddressI = {
  id: null,
  createdAt: new Date(),
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
  createdAt: new Date(),
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
