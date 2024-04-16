import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { useArrayLocalStorage } from "@/hooks/useLocalStorage";
import { ProductI } from "@/interfaces/ProductI";
import { ProductShoppingCartI } from "@/interfaces/ProductShoppingCartI";
import { createContext, useContext, useState } from "react";

interface ShoppingCartContextProps {
  products: ProductShoppingCartI[];
  handleAddInShoppingCart: (product: ProductI) => void;
  handleRemoveFromShoppingCart: (productId: string) => void;
  handleOpenDrawer: () => void;
  changeProductAmount: (productId: string, amount: number) => void;
}
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false);
  const [productsId, setProductsId] = useArrayLocalStorage<string>(
    "products",
    []
  );
  const [products, setProducts] = useState<ProductShoppingCartI[]>([]);

  function handleAddInShoppingCart(product: ProductI) {
    setProducts((p) => {
      const listProduct = p.find((x) => product.id === x.id);
      if (!listProduct) return [{ ...product, amount: 1 }, ...p];
      listProduct.amount += 1;
      return p.map((x) => (x.id === product.id ? listProduct : x));
    });
    setProductsId([...productsId, product.id]);
  }
  function handleRemoveFromShoppingCart(productId: string) {
    setProducts((p) => p.filter((x) => x.id !== productId));
    setProductsId(productsId.filter((x) => x !== productId));
    if (products.length === 1) setIsVisibleDrawer(false);
  }
  function changeProductAmount(productId: string, amount: number) {
    if (amount < 1) return;
    setProducts((p) =>
      p.map((x) => (x.id === productId ? { ...x, amount } : x))
    );
  }
  function handleOpenDrawer() {
    if (products.length > 0) setIsVisibleDrawer(true);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        handleAddInShoppingCart,
        handleRemoveFromShoppingCart,
        handleOpenDrawer,
        changeProductAmount,
      }}
    >
      <ShoppingCartDrawer
        isVisible={isVisibleDrawer}
        setIsVisible={setIsVisibleDrawer}
      />
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => useContext(ShoppingCartContext);
