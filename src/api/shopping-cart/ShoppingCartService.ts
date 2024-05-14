import {
  ShoppingCartProductDTO as ShoppingCartProductDTO,
  ShoppingCartProductI,
} from "@/interfaces/ProductShoppingCartI";
import { ProductRepositoryI } from "../product/ProductRepository";
import { ShoppingCartRepositoryI } from "./ShoppingCartRepository";
import { ProductNotFound } from "../product/ProductNotFound";

export class ShoppingCartService {
  constructor(
    private shoppingCartRepository: ShoppingCartRepositoryI,
    private productsRepository: ProductRepositoryI
  ) {}
  addProduct({ amount, productId }: ShoppingCartProductDTO) {
    const product = this.productsRepository.find(productId);
    if (!product) throw new ProductNotFound();
    this.shoppingCartRepository.addProduct({ amount, productId });
  }
  removeProduct(productId: string) {
    this.shoppingCartRepository.removeProduct(productId);
  }
  getProducts() {
    const shoppingCartProducts = this.shoppingCartRepository.getProducts();
    const products = this.productsRepository.search(
      shoppingCartProducts.map((x) => x.productId)
    );
    const productInCart: ShoppingCartProductI[] = products.map((product) => {
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
