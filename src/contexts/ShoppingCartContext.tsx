import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { useArrayLocalStorage } from "@/hooks/useLocalStorage";
import { ProductI } from "@/interfaces/ProductI";
import { createContext, useContext, useState } from "react";

interface ShoppingCartContextProps {
  products: ProductI[];
  handleAddInShoppingCart: (product: ProductI) => void;
  handleRemoveFromShoppingCart: (productId: string) => void;
  handleOpenDrawer: () => void;
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
  const [products, setProducts] = useState<ProductI[]>([]);

  function handleAddInShoppingCart(product: ProductI) {
    setProducts((p) => [product, ...p]);
    setProductsId([...productsId, product.id]);
  }
  function handleRemoveFromShoppingCart(productId: string) {
    setProducts((p) => p.filter((x) => x.id !== productId));
    setProductsId(productsId.filter((x) => x !== productId));
  }
  function handleOpenDrawer() {
    setIsVisibleDrawer(true);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        handleAddInShoppingCart,
        handleRemoveFromShoppingCart,
        handleOpenDrawer,
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
