import type { ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";
import type { ShoppingCartRepositoryI } from "./ShoppingCartRepositoryI";

export class ShoppingCartRepositoryJson implements ShoppingCartRepositoryI {
  private userUid: string;
  private static shoppingCartProducts: Record<
    string,
    ShoppingCartProductDTO[]
  > = {};
  private userProducts: ShoppingCartProductDTO[] = [];
  constructor(userUid: string) {
    this.userUid = userUid;
    if (
      ShoppingCartRepositoryJson.shoppingCartProducts[userUid] === undefined
    ) {
      ShoppingCartRepositoryJson.shoppingCartProducts[userUid] = [];
    }
    this.userProducts =
      ShoppingCartRepositoryJson.shoppingCartProducts[userUid];
  }
  private setProducts() {
    ShoppingCartRepositoryJson.shoppingCartProducts[this.userUid] =
      this.userProducts;
  }
  addProduct({ amount, productId }: ShoppingCartProductDTO) {
    const product = this.userProducts.find((x) => x.productId === productId);
    if (product) {
      product.amount += amount;
    } else {
      this.userProducts.push({
        amount,
        productId,
      });
    }
    this.setProducts();
  }
  removeProduct(productId: string) {
    this.userProducts = this.userProducts.filter(
      (x) => x.productId !== productId
    );
    this.setProducts;
  }
  getProducts() {
    return this.userProducts;
  }
}
