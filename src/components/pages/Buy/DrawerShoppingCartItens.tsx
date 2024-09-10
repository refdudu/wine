import Drawer from "rc-drawer";
import { Dispatch, SetStateAction } from "react";
import {
  ShoppingCartItens,
  ShoppingCartItensFooter,
  ShoppingCartItensHeader,
} from "./ShoppingCartItens";

interface ShoppingCartItensDrawerProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingCartItensDrawer({
  isVisible,
  setIsVisible,
}: ShoppingCartItensDrawerProps) {
  return (
    <Drawer width="90%" open={isVisible} onClose={() => setIsVisible(false)}>
      <ShoppingCartItensDrawerContent />
    </Drawer>
  );
}

function ShoppingCartItensDrawerContent() {
  return (
    <div >
      <div className="p-2">
        <ShoppingCartItensHeader />
      </div>
      <ShoppingCartItens />
      <ShoppingCartItensFooter />
    </div>
  );
}
