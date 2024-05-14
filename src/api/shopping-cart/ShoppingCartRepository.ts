import {
  ProductShoppingCartDTO,
  ProductShoppingCartI,
} from "@/interfaces/ProductShoppingCartI";

export interface ShoppingCartRepositoryI {
  addProduct: ({ amount, productId }: ProductShoppingCartDTO) => void;
  removeProduct: (productId: string) => void;
  getProducts: () => ProductShoppingCartDTO[];
}
export class ShoppingCartRepositoryJson implements ShoppingCartRepositoryI {
  private userUid: string;
  private static shoppingCartProducts: Record<
    string,
    ProductShoppingCartDTO[]
  > = {};
  private userProducts: ProductShoppingCartDTO[] = [];
  constructor(userUid: string) {
    this.userUid = userUid;
    if (
      ShoppingCartRepositoryJson.shoppingCartProducts[userUid] === undefined
    ) {
      ShoppingCartRepositoryJson.shoppingCartProducts[userUid] = [];
    }
  }
  addProduct({ amount, productId }: ProductShoppingCartDTO) {
    const product = ShoppingCartRepositoryJson.shoppingCartProducts[
      this.userUid
    ].find((x) => x.productId === productId);
    if (product) {
      product.amount += amount;
    } else {
      ShoppingCartRepositoryJson.shoppingCartProducts[this.userUid].push({
        amount,
        productId,
      });
    }
  }
  removeProduct(productId: string) {
    ShoppingCartRepositoryJson.shoppingCartProducts[this.userUid] =
      ShoppingCartRepositoryJson.shoppingCartProducts[this.userUid].filter(
        (x) => x.productId !== productId
      );
  }
  getProducts() {
    return ShoppingCartRepositoryJson.shoppingCartProducts[this.userUid];
  }
}
