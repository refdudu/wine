import { firebaseDatabase } from "@/utils/firebaseClient";
import { DatabaseReference, child, get, ref, set } from "firebase/database";

export interface ShoppingCartServiceI {
  get(): Promise<[string, number][]>;
  change(productId: string, amount: number): Promise<void>;
  remove(productId: string): Promise<void>;
  add(productId: string): Promise<void>;
  setUserUid(uid?: string): void;
}
export class ApiShoppingCartService implements ShoppingCartServiceI {
  private dbRef?: DatabaseReference;

  setUserUid(userUid?: string): void {
    if (!userUid) this.dbRef = undefined;
    this.dbRef = ref(firebaseDatabase, `/users/${userUid}/shopping-cart`);
  }
  async get(): Promise<[string, number][]> {
    if (!this.dbRef) return [];

    const snapshot = await get(child(this.dbRef, "/"));
    if (!snapshot.exists()) return [];

    const shoppingCartProductsValue: Record<string, number> = snapshot.val();
    const shoppingCartProductsKeyValue: [string, number][] = Object.entries(
      shoppingCartProductsValue
    );
    return shoppingCartProductsKeyValue;
  }
  async change(productId: string, amount: number): Promise<void> {
    if (!this.dbRef) return;
    if (amount < 1) {
      return this.remove(productId);
    }
    const productRef = this.getProductRef(productId);
    await set(productRef, amount);
  }
  async remove(productId: string): Promise<void> {
    if (!this.dbRef) return;
    const productRef = this.getProductRef(productId);
    await set(productRef, null);
  }
  private getProductRef(productId: string): DatabaseReference {
    return child(this.dbRef!, `/${productId}`);
  }

  async add(productId: string): Promise<void> {
    if (!this.dbRef) return;
    const productRef = this.getProductRef(productId);
    const snapshot = await get(productRef);
    let amount = 1;
    if (snapshot.exists()) {
      amount = snapshot.val();
      amount += 1;
    }
    await set(productRef, amount);
  }
}
export class MockShoppingCartService implements ShoppingCartServiceI {
  get(): Promise<[string, number][]> {
    throw new Error("Method not implemented.");
  }
  change(productId: string, amount: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  remove(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  add(productId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
  setUserUid(uid?: string): void {
    throw new Error("Method not implemented.");
  }
}
