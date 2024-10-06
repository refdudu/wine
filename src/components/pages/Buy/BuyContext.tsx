import { createContext, useState } from "react";
import { BuyHeader } from "./BuyHeader";
import { ShoppingCartItensDrawer } from "./DrawerShoppingCartItens";

import {
  ShoppingCartItens,
  ShoppingCartItensFooter,
  ShoppingCartItensHeader,
} from "./ShoppingCartItens";
import { OnlyAuthContainer } from "@/components/OnlyAuthContainer";

const BuyContext = createContext({});

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
      <div className="flex flex-col h-screen">
        <BuyHeader openDrawer={() => setIsVisibleShoppingCartItens(true)} />
        <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
          <main className="max-w-[1120px] flex mx-auto gap-9  flex-col md:flex-row">
            <div className="w-full lg:w-4/6">{children}</div>
            <div className="w-2/6  h-full shadow  hidden lg:flex flex-col">
              <ShoppingCartItensHeader />
              <div className="border border-custom-gray-light border-b-transparent">
                <ShoppingCartItens />
              </div>
              <div className="border border-custom-gray-light ">
                <ShoppingCartItensFooter />
              </div>
            </div>
          </main>
        </div>
      </div>
    </OnlyAuthContainer>
  );
}
