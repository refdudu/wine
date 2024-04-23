import type { ProductI } from "./ProductI";

export interface ProductShoppingCartI extends ProductI {
	amount: number;
}
