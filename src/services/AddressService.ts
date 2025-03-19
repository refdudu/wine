import type { AddressI } from "@/interfaces/Address";
import { api } from "@/utils/api";

export interface AddressServiceI {
  getAddresses: () => Promise<AddressI[]>;
  createAddress: (address: AddressI) => Promise<AddressI[]>;
  deleteAddress: (addressId: string) => Promise<AddressI[]>;
  updateAddress: (address: AddressI) => Promise<AddressI[]>;
}
export class ApiAddressService implements AddressServiceI {
  public async getAddresses(): Promise<AddressI[]> {
    const { data } = await api.get<{ addresses: AddressI[] }>("address");
    return data.addresses;
  }
  public async createAddress(address: AddressI): Promise<AddressI[]> {
    const { data } = await api.post<{ addresses: AddressI[] }>(
      "address",
      address
    );
    return data.addresses;
  }
  public async deleteAddress(addressId: string): Promise<AddressI[]> {
    const { data } = await api.delete<{ addresses: AddressI[] }>(
      `address/${addressId}`
    );
    return data.addresses;
  }
  public async updateAddress(address: AddressI): Promise<AddressI[]> {
    address.createdAt = undefined;
    const { data } = await api.put<{ addresses: AddressI[] }>(
      `address/${address.id}`,
      address
    );
    return data.addresses;
  }
}
