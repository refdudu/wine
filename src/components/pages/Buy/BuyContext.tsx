import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { BuyHeader } from "./BuyHeader";
import { ShoppingCartItensDrawer } from "./DrawerShoppingCartItens";

import {
  ShoppingCartItens,
  ShoppingCartItensFooter,
  ShoppingCartItensHeader,
} from "./ShoppingCartItens";
import { OnlyAuthContainer } from "@/components/OnlyAuthContainer";
import { useBuyAddressPage } from "./Address/useBuyAddressPage";
import { AddressI } from "@/interfaces/Address";
import { Spin } from "@/components/Spin";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

interface BuyContextData {
  setEditingAddress: Dispatch<SetStateAction<AddressI | null>>;
  addresses: AddressI[];
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
  addAddress: (address: AddressI) => Promise<void>;
  editingAddress: AddressI | null;
  deleteAddress: () => Promise<void>;
}

interface BuyPageProviderProps {
  children: React.ReactNode;
}
export function BuyPageProvider({ children }: BuyPageProviderProps) {
  const [isVisibleShoppingCartItens, setIsVisibleShoppingCartItens] =
    useState(false);

  return (
    <OnlyAuthContainer>
      <ShoppingCartItensDrawer
        isVisible={isVisibleShoppingCartItens}
        setIsVisible={setIsVisibleShoppingCartItens}
      />
      <Content {...{ children, setIsVisibleShoppingCartItens }} />
    </OnlyAuthContainer>
  );
}

const BuyContext = createContext({} as BuyContextData);

interface ContentProps {
  children: React.ReactNode;
  setIsVisibleShoppingCartItens: Dispatch<SetStateAction<boolean>>;
}
function Content({ children, setIsVisibleShoppingCartItens }: ContentProps) {
  const { isLoadingProducts } = useShoppingCart();
  const { isLoading, ...props } = useBuyAddressPage();

  if (isLoading || isLoadingProducts) {
    return (
      <div className="w-full h-64 flex justify-center items-end">
        <Spin />
      </div>
    );
  }

  return (
    <BuyContext.Provider value={props}>
      <div className="flex flex-col h-screen text-custom-text">
        <BuyHeader openDrawer={() => setIsVisibleShoppingCartItens(true)} />
        <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
          <main className="max-w-[1120px] flex mx-auto gap-9 flex-col md:flex-row">
            <div className="w-full lg:w-4/6">{children}</div>
            <div className="w-2/6  h-full shadow  hidden lg:flex flex-col">
              <ShoppingCartItensHeader />
              <div className="border-r border-l border-custom-line">
                <ShoppingCartItens />
              </div>
              <ShoppingCartItensFooter />
            </div>
          </main>
        </div>
      </div>
    </BuyContext.Provider>
  );
}
export const useBuyPage = () => useContext(BuyContext);
