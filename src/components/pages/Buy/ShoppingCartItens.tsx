import { ShoppingCartProduct } from "@/components/ShoppingCartProduct";
import {
  useShoppingCart,
  useTotalShoppingCartProducts,
} from "@/contexts/ShoppingCartContext";
import classNames from "classnames";

interface ShoppingCartItensHeaderProps {
  isMobile?: boolean;
}
export function ShoppingCartItensHeader({
  isMobile,
}: ShoppingCartItensHeaderProps) {
  const mobileL = isMobile ? "rounded-bl-md" : "";
  const mobileR = isMobile ? "rounded-br-md border-custom-violet border" : "";

  return (
    <header className="flex h-9">
      <button
        className={`flex-1 bg-custom-violet text-white text-center rounded-tl-md ${mobileL}`}
      >
        Itens
      </button>
      <button
        className={`flex-1 bg-white text-custom-violet  text-center rounded-tr-md ${mobileR}`}
      >
        Detalhes
      </button>
    </header>
  );
}

export function ShoppingCartItensFooter() {
  const total = useTotalShoppingCartProducts();
  return (
    <footer className="flex justify-between items-center bg-custom-background-light p-4">
      <span className="text-lg text-custom-text">Total</span>
      <span className="text-2xl text-custom-violet">{total}</span>
    </footer>
  );
}
export function ShoppingCartItens() {
  const {
    shoppingCartProducts: products,
    changeProductAmount,
    handleRemoveFromShoppingCart,
  } = useShoppingCart();

  return (
    <main className="max-h-[500px] lg:max-h-96 overflow-auto ">
      {products.map((product, index, array) => (
        <ShoppingCartProduct
          key={product.id}
          array={array}
          changeProductAmount={changeProductAmount}
          handleRemove={handleRemoveFromShoppingCart}
          index={index}
          product={product}
        />
      ))}
    </main>
  );
}