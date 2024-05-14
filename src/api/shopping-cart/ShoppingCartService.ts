import {
  ProductShoppingCartDTO as ProductShoppingCartDTO,
  ProductShoppingCartI,
} from "@/interfaces/ProductShoppingCartI";
import { ProductRepositoryI } from "../product/ProductRepository";
import { ShoppingCartRepositoryI } from "./ShoppingCartRepository";

export class ShoppingCartService {
  constructor(
    private shoppingCartRepository: ShoppingCartRepositoryI,
    private productsRepository: ProductRepositoryI
  ) {}
  addProduct({ amount, productId }: ProductShoppingCartDTO) {}
  removeProduct(productId: string) {}
  getProducts() {
    const shoppingCartProducts = this.shoppingCartRepository.getProducts();
    const products = this.productsRepository.search(
      shoppingCartProducts.map((x) => x.productId)
    );
    const productInCart: ProductShoppingCartI[] = products.map((product) => {
      const productInCart = shoppingCartProducts.find(
        (x) => x.productId === product.id
      );
      return {
        ...product,
        amount: productInCart?.amount || 0,
      };
    });
    return productInCart;
  }
}
