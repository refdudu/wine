import { Dispatch, SetStateAction } from "react";
import { Drawer } from "../Drawer";
import "rc-drawer/assets/index.css";

interface ShoppingCartDrawerContentProps {}
interface ShoppingCartDrawerProps extends ShoppingCartDrawerContentProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingCartDrawer({
  isVisible,
  setIsVisible,
}: ShoppingCartDrawerProps) {
  console.log("🚀 ~ isVisible:", isVisible);
  return (
    <Drawer width={1000} open={isVisible} onClose={() => setIsVisible(false)}>
      <ShoppingCartDrawerContent />
    </Drawer>
  );
}

export function ShoppingCartDrawerContent({}: ShoppingCartDrawerContentProps) {
  return <div />;
}
