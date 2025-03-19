import { useServices } from "@/contexts/ServicesContext";
import type { AddressI } from "@/interfaces/Address";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const useBuyAddressPage = () => {
  const { replace, push } = useRouter();
  const { addressService } = useServices();
  const [editingAddress, setEditingAddress] = useState<AddressI | null>(null);
  const [addresses, _setAddresses] = useState<AddressI[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAddressId, setSelectedAddressId] = useState("");

  async function createAddress(address: AddressI) {
    try {
      const addresses = await addressService.createAddress(address);
      setAddresses(addresses);
    } catch {}
  }
  async function updateAddress(address: AddressI) {
    try {
      const addresses = await addressService.updateAddress(address);
      setAddresses(addresses);
    } catch {}
  }
  async function deleteAddress() {
      console.log("🚀 ~ deleteAddress ~ editingAddress:", editingAddress)
    if (!editingAddress) return;
    // const addressId = editingAddress.id || "";
    // try {
    //   const addresses = await addressService.deleteAddress(addressId);
    //   setAddresses(addresses);
    //   setEditingAddress(null);
    // } catch {}
  }
  async function addAddress(address: AddressI) {
    try {
      if (address.id) {
        await updateAddress(address);
      } else {
        await createAddress(address);
      }
      push("/buy/address");
    } catch {}
    setEditingAddress(null);
  }

  function setAddresses(addressses: AddressI[]) {
    const favoriteAddress = addresses.find((x) => x.isFavorite) || addresses[0];
    if (!selectedAddressId && favoriteAddress)
      setSelectedAddressId(favoriteAddress.id || "");
    _setAddresses(addressses);
  }

  async function getAddresses() {
    setIsLoading(addresses.length === 0);
    try {
      const addresses = await addressService.getAddresses();

      if (addresses.length === 0) {
        setEditingAddress({ ...baseAddress, isFavorite: true });
        replace("/buy/new-address");
      }

      setAddresses(addresses);
    } catch {
      setEditingAddress({ ...baseAddress, isFavorite: true });
      replace("/buy/new-address");
    }
    setIsLoading(false);
  }
  useEffect(() => {
    getAddresses();
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
// const __address: AddressI = {
//   id: "1",
//   addressIdentify: "Casa",
//   createdAt: new Date(),
//   recipientName: "Renan Fischer",
//   phone: "55999029974",
//   cep: "98910000",
//   address: "Rua Emilio Tesche",
//   neighborhood: "Oriental",
//   city: {
//     key: "4321808",
//     label: "Três de Maio",
//   },
//   state: {
//     key: "RS",
//     label: "Rio Grande do Sul",
//   },
//   referencePoint: "",
//   number: "782",
//   complement: "Casa",
//   isFavorite: true,
//   conciergeAllDay: true,
// };
