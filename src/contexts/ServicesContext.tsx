import { AddressServiceI, ApiAddressService } from "@/services/AddressService";
import {
  type ProductServiceI,
  ApiProductService,
} from "@/services/ProductsService";
import {
  ApiShoppingCartService,
  ShoppingCartServiceI,
} from "@/services/ShoppingCartService";
import { createContext, useContext } from "react";

interface ServicesContextProps {
  productService: ProductServiceI;
  shoppingCartService: ShoppingCartServiceI;
  addressService: AddressServiceI;
}
const ServicesContext = createContext({} as ServicesContextProps);

interface ServicesProviderProps {
  children: React.ReactNode;
}

const productService = new ApiProductService();
const shoppingCartService = new ApiShoppingCartService();
const addressService = new ApiAddressService();
export function ServicesProvider({ children }: ServicesProviderProps) {
  return (
    <ServicesContext.Provider
      value={{ productService, shoppingCartService, addressService }}
    >
      {children}
    </ServicesContext.Provider>
  );
}

export const useServices = () => useContext(ServicesContext);
