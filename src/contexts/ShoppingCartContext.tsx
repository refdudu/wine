import { useArrayLocalStorage } from "@/hooks/useLocalStorage";
import { ProductI } from "@/interfaces/ProductI";
import { createContext, useContext, useState } from "react";

interface ShoppingCartContextProps {
  products: ProductI[];
  handleAddInShoppingCart: (product: ProductI) => void;
  handleRemoveFromShoppingCart: (productId: string) => void;
}
const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
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

  return (
    <ShoppingCartContext.Provider
      value={{
        products,
        handleAddInShoppingCart,
        handleRemoveFromShoppingCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export const useShoppingCart = () => useContext(ShoppingCartContext);
