import { ProductServiceI, ApiProductService } from "@/services/ProductsService";
import { createContext, useContext } from "react";

interface ServicesContextProps {
	productService: ProductServiceI;
}
const ServicesContext = createContext({} as ServicesContextProps);

interface ServicesProviderProps {
	children: React.ReactNode;
}

const productService = new ApiProductService();
export function ServicesProvider({ children }: ServicesProviderProps) {
	return <ServicesContext.Provider value={{ productService }}>{children}</ServicesContext.Provider>;
}

export const useServices = () => useContext(ServicesContext);
