import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import type { ProductI } from "@/interfaces/ProductI";
import type { ShoppingCartProductI } from "@/interfaces/ProductShoppingCartI";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSession } from "./SessionContext";
import { useServices } from "./ServicesContext";
import { formatPrice } from "@/utils/formatPrice";
import { useMediaQuery } from "react-responsive";
import { LayoutProvider } from "@/components/Layout";

interface ShoppingCartContextProps {
  shoppingCartProducts: ShoppingCartProductI[];
  handleAddInShoppingCart: (product: ProductI) => Promise<void>;
  handleRemoveFromShoppingCart: (productId: string) => Promise<void>;
  handleOpenDrawer: () => void;
  handleCloseDrawer: () => void;
  changeProductAmount: (productId: string, amount: number) => Promise<void>;
}
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const { user } = useSession();
  const { productService, shoppingCartService } = useServices();
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [shoppingCartProducts, setShoppingCartProducts] = useState<
    ShoppingCartProductI[]
  >([]);

  async function getProducts() {
    if (!user) {
      setShoppingCartProducts([]);
      return;
    }
    const shoppingCartProductsKeyValue = await shoppingCartService.get();
    if (!shoppingCartProductsKeyValue) return;

    const productIds = shoppingCartProductsKeyValue.map(
      ([productId]) => productId
    );
    const products = await productService.searchProducts(productIds);
    const shoppingCartProducts: ShoppingCartProductI[] = products.map(
      (product) => {
        const keyValue = shoppingCartProductsKeyValue.find(
          ([id]) => id === product.id
        );
        if (keyValue) {
          const amount = keyValue[1];
          return { ...product, amount };
        }
        return { ...product, amount: 1 };
      }
    );
    setShoppingCartProducts(shoppingCartProducts);
  }

  async function handleAddInShoppingCart(product: ProductI) {
    if (!user) return;

    try {
      await shoppingCartService.add(product.id);
      setShoppingCartProducts((p) => {
        const listProduct = p.find((x) => product.id === x.id);
        if (!listProduct) return [{ ...product, amount: 1 }, ...p];
        listProduct.amount += 1;
        return p.map((x) => (x.id === product.id ? listProduct : x));
      });
    } catch {}
  }
  async function handleRemoveFromShoppingCart(productId: string) {
    if (!user) return;

    try {
      await shoppingCartService.remove(productId);
      setShoppingCartProducts((p) => p.filter((x) => x.id !== productId));
      if (shoppingCartProducts.length === 1) setIsVisibleDrawer(false);
    } catch {}
  }
  async function changeProductAmount(productId: string, amount: number) {
    if (!user) return;

    if (amount < 1) {
      return handleRemoveFromShoppingCart(productId);
    }
    try {
      await shoppingCartService.change(productId, amount);
      setShoppingCartProducts((p) =>
        p.map((x) => (x.id === productId ? { ...x, amount } : x))
      );
    } catch {}
  }

  function handleOpenDrawer() {
    // if (products.length > 0)
    setIsVisibleDrawer(true);
  }
  function handleCloseDrawer() {
    setIsVisibleDrawer(false);
  }

  //   useEffect(() => {
  //     if (shoppingCartProducts.length === 1) setIsVisibleDrawer(false);
  //   }, [shoppingCartProducts.length]);

  useEffect(() => {
    shoppingCartService.setUserUid(user?.uid);
    getProducts();
  }, [user]);

  return (
    <ShoppingCartContext.Provider
      value={{
        shoppingCartProducts,
        handleAddInShoppingCart,
        handleRemoveFromShoppingCart,
        handleOpenDrawer,
        handleCloseDrawer,
        changeProductAmount,
      }}
    >
      {children}
      <LayoutProvider>
        <ShoppingCartDrawer
          isVisible={isVisibleDrawer}
          setIsVisible={setIsVisibleDrawer}
        />
      </LayoutProvider>
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => useContext(ShoppingCartContext);
export const useTotalShoppingCartProducts = () => {
  const { shoppingCartProducts } = useShoppingCart();
  function getTotalPrice() {
    return formatPrice(
      shoppingCartProducts
        .map((x) => x.amount * x.price)
        .reduce((pv, cv) => pv + cv, 0)
    );
  }
  return useMemo(getTotalPrice, [shoppingCartProducts]);
};
