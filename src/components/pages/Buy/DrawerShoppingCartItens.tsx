import { Dispatch, SetStateAction } from "react";
import {
  ShoppingCartItens,
  ShoppingCartItensFooter,
  ShoppingCartItensHeader,
} from "./ShoppingCartItens";
import { ShoppingCartData } from "./BuyHeader";
import { X } from "@phosphor-icons/react";
import { Drawer } from "@/components/Drawer";

interface ShoppingCartItensDrawerProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingCartItensDrawer({
  isVisible,
  setIsVisible,
}: ShoppingCartItensDrawerProps) {
  const onClose = () => setIsVisible(false);
  return (
    <Drawer width="90%" open={isVisible} onClose={onClose}>
      {isVisible && <ShoppingCartItensDrawerContent closeDrawer={onClose} />}
    </Drawer>
  );
}

interface ShoppingCartItensDrawerContentProps {
  closeDrawer: () => void;
}
function ShoppingCartItensDrawerContent({
  closeDrawer,
}: ShoppingCartItensDrawerContentProps) {
  return (
    <div>
      <header className="text-lg p-4 flex justify-between items-center">
        <button onClick={closeDrawer}>
          <X className="text-custom-gray-dark" size={36} />
        </button>
        <ShoppingCartData />
      </header>
      <div className="p-2">
        <ShoppingCartItensHeader isMobile />
      </div>
      <ShoppingCartItens />
    </div>
  );
}
