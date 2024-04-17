import { ShoppingCartDrawer } from "@/components/ShoppingCartDrawer";
import { useArrayLocalStorage } from "@/hooks/useLocalStorage";
import { ProductI } from "@/interfaces/ProductI";
import { ProductShoppingCartI } from "@/interfaces/ProductShoppingCartI";
import { api } from "@/utils/api";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [productsStorage, setProductsStorage] = useArrayLocalStorage<{
    productId: string;
    amount: number;
  }>("products", []);
  const [products, setProducts] = useState<ProductShoppingCartI[]>([]);

  function handleAddInShoppingCart(product: ProductI) {
    setProducts((p) => {
      const listProduct = p.find((x) => product.id === x.id);
      if (!listProduct) return [{ ...product, amount: 1 }, ...p];
      listProduct.amount += 1;
      return p.map((x) => (x.id === product.id ? listProduct : x));
    });
    const storageProduct = productsStorage.find(
      (x) => x.productId === product.id
    );
    if (storageProduct) {
      setProductsStorage(
        productsStorage.map((x) =>
          x.productId === product.id ? { ...x, amount: x.amount + 1 } : x
        )
      );
    } else {
      setProductsStorage([
        ...productsStorage,
        { productId: product.id, amount: 1 },
      ]);
    }
  }
  function handleRemoveFromShoppingCart(productId: string) {
    setProducts((p) => p.filter((x) => x.id !== productId));
    setProductsStorage(
      productsStorage.filter((x) => x.productId !== productId)
    );
    if (products.length === 1) setIsVisibleDrawer(false);
  }
  function changeProductAmount(productId: string, amount: number) {
    if (amount < 1) return;
    setProducts((p) =>
      p.map((x) => (x.id === productId ? { ...x, amount } : x))
    );
    setProductsStorage(
      productsStorage.map((x) =>
        x.productId === productId ? { ...x, amount } : x
      )
    );
  }
  function handleOpenDrawer() {
    if (products.length > 0) setIsVisibleDrawer(true);
  }
  async function getProducts() {
    console.log("🚀 ~ getProducts ~ products:", products);

    if (products.length > 0) return;
    try {
      const { data } = await api.get<ProductI[]>("products/search", {
        params: {
          ids: productsStorage.map((x) => x.productId).join(","),
        },
      });

      setProducts(
        data.map((x) => {
          const product = productsStorage.find((y) => y.productId === x.id);
          if (product)
            return {
              ...x,
              amount: product.amount,
            };
          return { ...x, amount: 1 };
        })
      );
    } catch {}
  }
  useEffect(() => {
    console.log(productsStorage);
    getProducts();
  }, [productsStorage]);

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
