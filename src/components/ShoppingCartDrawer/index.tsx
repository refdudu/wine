import { Dispatch, SetStateAction } from "react";
import { Drawer } from "../Drawer";
import "rc-drawer/assets/index.css";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { XCircleIcon, XIcon } from "@/utils/icons";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import classNames from "classnames";
import { Counter } from "../Couter";
import { Button } from "../Button";

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
    <Drawer width={500} open={isVisible} onClose={() => setIsVisible(false)}>
      <ShoppingCartDrawerContent />
    </Drawer>
  );
}

export function ShoppingCartDrawerContent({}: ShoppingCartDrawerContentProps) {
  const { products, changeProductAmount, handleRemoveFromShoppingCart } =
    useShoppingCart();
//   function handleRemoveProductAmount(productId: string, amount: number) {
//     if (amount === 0) return;
//     changeProductAmount(productId, amount - 1);
//   }
  return (
    <div className="flex flex-col justify-between h-full">
      <main className="h-5/6 p-4 overflow-auto">
        {products.map((product, index, array) => (
          <div
            className={`flex gap-4 p-4  border-custom-gray ${classNames({
              "border-b": index !== array.length - 1,
            })}`}
          >
            <img
              className="w-full max-w-16"
              src={product.image}
              alt={product.name}
            />
            <div className="flex-1 p-4 flex flex-col justify-between gap-4">
              <div className="flex justify-between items-center">
                <span>{product.name}</span>
                <button
                  onClick={() => handleRemoveFromShoppingCart(product.id)}
                >
                  <Image width={20} height={20} src={XCircleIcon} alt="X" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <Counter
                  handleAdd={() =>
                    changeProductAmount(product.id, product.amount + 1)
                  }
                  handleRemove={() =>
                    changeProductAmount(product.id, product.amount - 1)
                  }
                  total={product.amount}
                />
                <span className="text-xl text-custom-violet">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
      <header className="w-full h-1/6 flex items-center p-4">
        <Button className="w-full">Finalizar pedido</Button>
      </header>
    </div>
  );
}
