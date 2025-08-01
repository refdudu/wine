import type { OrderDTO, OrderItem } from "@/interfaces/OrderI";
import { firebaseFirestore } from "@/utils/firebaseClient";
import {
  addDoc,
  type CollectionReference,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  type DocumentReference,
  type DocumentData,
  serverTimestamp,
} from "firebase/firestore";
import { AddressRepositoryFirebase } from "../address/AddressRepository";
import {
  type ProductRepositoryI,
  ProductRepositoryJson,
} from "../product/ProductRepository";
import { ProductNotFound } from "../product/ProductNotFound";

export class OrderRepositoryFirebase {
  private readonly dbRef: CollectionReference;
  private readonly addressRepository: AddressRepositoryFirebase;
  private readonly productRepository: ProductRepositoryI;
  constructor(userUid: string) {
    this.dbRef = collection(firebaseFirestore, `/users/${userUid}/orders`);
    this.addressRepository = new AddressRepositoryFirebase(userUid);
    this.productRepository = new ProductRepositoryJson();
  }

  async add(order: OrderDTO): Promise<string> {
    const _data = Object.entries(order);
    _data.push(["createdAt", serverTimestamp()]);
    _data.push(["status", "pending"]);

    const address = await this.addressRepository.getById(
      order.shippingAddressId
    );
    _data.push(["shippingAddress", address]);

    const productsId = order.items.map((item) => item.productId);
    const products = this.productRepository.search(productsId);
    const items: OrderItem[] = order.items.map((item) => {
      const product = products.find((product) => product.id === item.productId);
      if (!product) throw new ProductNotFound();
      return {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        amount: item.amount,
      };
    });
    _data.push(["items", items]);

    const orderRef = await addDoc(this.dbRef, Object.fromEntries(_data));
    return orderRef.id;
  }
  async delete(id: string) {
    if (!id) throw new Error("Order id is required");
    const orderRef = doc(this.dbRef, id);
    await this.hasDoc(orderRef);
    return deleteDoc(orderRef);
  }
  private async hasDoc(ref: DocumentReference<DocumentData, DocumentData>) {
    const addressDoc = await getDoc(ref);
    const existsAddress = addressDoc.exists();
    if (!existsAddress) throw new Error("Order not found");
  }
  async get() {
    const orderRef = await getDocs(this.dbRef);
    return orderRef.docs.map((x) => ({
      id: x.id,
      userUid: x.data().userUid,
      items: x.data().items.slice(0, 3),
      totalAmount: x.data().totalAmount,
      shippingAddress: x.data().shippingAddress,
      createdAt: x.data().createdAt.toDate(),
      status: x.data().status || "pending",
    }));
  }
}
