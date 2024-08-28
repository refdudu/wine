import "rc-drawer/assets/index.css";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { Drawer } from "../Drawer";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { BackIcon } from "@/utils/icons";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "../Button";
import { useSession } from "@/contexts/SessionContext";
import { ShoppingCartProduct } from "../ShoppingCartProduct";
import Link from "next/link";

interface ShoppingCartDrawerProps {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
}

export function ShoppingCartDrawer({
  isVisible,
  setIsVisible,
}: ShoppingCartDrawerProps) {
  return (
    <Drawer width={500} open={isVisible} onClose={() => setIsVisible(false)}>
      <ShoppingCartDrawerContent />
    </Drawer>
  );
}

export function ShoppingCartDrawerContent() {
  const { user } = useSession();
  const { shoppingCartProducts: products } = useShoppingCart();

  return (
    <div className="flex flex-col h-full bg-custom-background">
      <Header />
      <main className="h-full p-4 overflow-auto">
        <Main />
      </main>
      {user && products.length > 0 && <Footer />}
    </div>
  );
}
function Header() {
  const { shoppingCartProducts: products, handleCloseDrawer } =
    useShoppingCart();
  return (
    <header className="bg-white w-full h-24 flex items-center">
      <button
        type="button"
        onClick={handleCloseDrawer}
        className="flex items-center gap-4 p-4"
      >
        <Image alt="Voltar" src={BackIcon} width={20} height={20} />
        <span>Winebox ({products.length})</span>
      </button>
    </header>
  );
}
function Main() {
  const { user } = useSession();
  const {
    shoppingCartProducts: products,
    changeProductAmount,
    handleRemoveFromShoppingCart,
  } = useShoppingCart();

  if (!user)
    return (
      <span className="text-lg">
        Para adicionar itens ao carrinho você deve estar conectado
      </span>
    );

  if (products.length === 0)
    return (
      <span className="text-lg">
        Você ainda não adicionou nenhum produto ao seu carrinho
      </span>
    );

  return (
    <>
      {products.map((product, index, array) => (
        <ShoppingCartProduct
          array={array}
          changeProductAmount={changeProductAmount}
          handleRemove={handleRemoveFromShoppingCart}
          index={index}
          product={product}
        />
      ))}
    </>
  );
}
function Footer() {
  const { shoppingCartProducts: products } = useShoppingCart();
  const totalProductsPrice = useMemo(
    () =>
      formatPrice(
        products.map((x) => x.amount * x.price).reduce((pv, cv) => pv + cv, 0)
      ),
    [products]
  );
  return (
    <header className="w-full flex items-center p-4 bg-white flex-col gap-4 ">
      <div className="flex items-center justify-between w-full">
        <span className="text-custom-gray text-2xl font-bold">Total</span>
        <span className="text-custom-tannat text-3xl">
          {totalProductsPrice}
        </span>
      </div>
      <Button
        href="/buy"
        className="w-full bg-custom-green text-white"
      >Finalizar</Button>
    </header>
  );
}
