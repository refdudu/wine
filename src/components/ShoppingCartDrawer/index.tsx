import "rc-drawer/assets/index.css";
import { type Dispatch, type SetStateAction, useMemo } from "react";
import { Drawer } from "../Drawer";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { BackIcon, XCircleIcon, XIcon } from "@/utils/icons";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import classNames from "classnames";
import { Counter } from "../Couter";
import { Button } from "../Button";
import { useSession } from "@/contexts/SessionContext";

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
  const { shoppingCartProducts: products, handleCloseDrawer } = useShoppingCart();
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
  const { shoppingCartProducts: products, changeProductAmount, handleRemoveFromShoppingCart } =
    useShoppingCart();

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
        <div
          key={product.id}
          className={`flex gap-4 p-4  border-custom-gray-light ${classNames({
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
                type="button"
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
      <Button className="w-full">Finalizar pedido</Button>
    </header>
  );
}
