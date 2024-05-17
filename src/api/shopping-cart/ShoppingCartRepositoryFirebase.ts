import { ShoppingCartProductDTO } from "@/interfaces/ProductShoppingCartI";
import { ShoppingCartRepositoryI } from "./ShoppingCartRepositoryI";
import { DatabaseReference, push, ref } from "firebase/database";
import { firebaseDatabase } from "@/utils/firebaseClient";

export class ShoppingCartRepositoryFirebase implements ShoppingCartRepositoryI {
  private dbRef: DatabaseReference;
  constructor(userId: number) {
    this.dbRef = ref(firebaseDatabase, "shopping-cart/" + userId);
    // set(, {
    //   username: name,
    //   email: email,
    //   profile_picture: imageUrl,
    // });
  }
  addProduct({ amount, productId }: ShoppingCartProductDTO) {
    const child = push(this.dbRef, {});
  }
  removeProduct(productId: string) {}
  getProducts(): ShoppingCartProductDTO[] {
    return [];
  }
}
