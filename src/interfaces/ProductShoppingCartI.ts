import type { ProductI } from "./ProductI";

export interface ShoppingCartProductI extends ProductI {
  amount: number;
}
export interface ShoppingCartProductDTO {
  amount: number;
  productId: string;
}
