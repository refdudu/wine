import { type ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";

export interface ShoppingCartRepositoryI {
  addProduct: ({ amount, productId }: ShoppingCartProductDTO) => void;
  removeProduct: (productId: string) => void;
  getProducts: () => ShoppingCartProductDTO[];
}
