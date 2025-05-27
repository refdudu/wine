import {
  createContext,
  type Dispatch,
  type SetStateAction,
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
import type { AddressI } from "@/interfaces/AddressI";
import { Spin } from "@/components/Spin";
import {
  type PaymentMethodE,
  useBuyPaymentPage,
} from "./Payment/useBuyPaymentPage";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import type { CreditCardI } from "@/interfaces/CreditCardI";

interface BuyContextData {
  setEditingAddress: Dispatch<SetStateAction<AddressI | null>>;
  addresses: AddressI[];
  selectedAddressId: string;
  setSelectedAddressId: Dispatch<SetStateAction<string>>;
  addAddress: (address: AddressI) => Promise<void>;
  editingAddress: AddressI | null;
  deleteAddress: () => Promise<void>;

  deleteCreditCard: (addressId: string) => Promise<void>;
  creditCards: CreditCardI[];
  setCreditCards: Dispatch<SetStateAction<CreditCardI[]>>;
  addCreditCard: (creditCard: CreditCardI) => Promise<void>;
  selectedCreditCardId: string;
  setSelectedCreditCardId: Dispatch<SetStateAction<string>>;
  selectedPaymentMethod: PaymentMethodE;
  setSelectedPaymentMethod: Dispatch<SetStateAction<PaymentMethodE>>;
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
  const { isLoading: isLoadingAddresses, ...addressProps } =
    useBuyAddressPage();
  const { isLoading: isLoadingCreditCards, ...paymentProps } =
    useBuyPaymentPage();

  if (isLoadingAddresses || isLoadingProducts || isLoadingCreditCards) {
    return (
      <div className="w-full h-64 flex justify-center items-end">
        <Spin />
      </div>
    );
  }

  return (
    <BuyContext.Provider value={{ ...addressProps, ...paymentProps }}>
      <div className="flex flex-col h-screen text-custom-text">
        <BuyHeader openDrawer={() => setIsVisibleShoppingCartItens(true)} />
        <div className="w-full py-10 mx-auto px-3 overflow-auto h-full">
          <main className="max-w-[1200px] flex mx-auto gap-9 flex-col md:flex-row">
            <div className="w-full lg:w-4/6">{children}</div>
            <div className="w-2/6  h-full shadow  hidden lg:flex flex-col">
              <ShoppingCartItensHeader />
              <div className="border-r border-l border-custom-line max-h-[500px] lg:max-h-96 overflow-auto">
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
