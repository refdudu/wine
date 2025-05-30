import type { AddressI } from "@/interfaces/AddressI";
import { firebaseFirestore } from "@/utils/firebaseClient";
import {
  addDoc,
  setDoc,
  type CollectionReference,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  type DocumentReference,
  type DocumentData,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { AddressNotFound } from "./AddressNotFound";

export class AddressRepositoryFirebase {
  private readonly dbRef: CollectionReference;
  constructor(userUid: string) {
    this.dbRef = collection(firebaseFirestore, `/users/${userUid}/addresses`);
  }
  private async getFavoriteAddress() {
    const _query = query(this.dbRef, where("isFavorite", "==", true));
    const addressRef = await getDocs(_query);

    if (addressRef.empty) return null;
    const doc = addressRef.docs[0];
    const data = doc.data() as AddressI;
    const id = doc.id;
    return { ...data, id };
  }
  private async verifyFavoriteAddress(address: AddressI) {
    const favoriteAddress = await this.getFavoriteAddress();

    if (favoriteAddress && address.isFavorite) {
      const docRef = doc(this.dbRef, favoriteAddress.id || "");
      favoriteAddress.isFavorite = false;
      await setDoc(docRef, favoriteAddress);
    } else if (!favoriteAddress && !address.isFavorite) {
      address.isFavorite = true;
    }
    return address;
  }
  async add(address: AddressI): Promise<string> {
    let _address: AddressI = {
      ...address,
      id: null,
      createdAt: new Date(),
    };

    _address = await this.verifyFavoriteAddress(_address);
    const _data = Object.entries(_address).filter(
      ([key, value]) => Boolean(value) || key === "isFavorite"
    );
    const data = Object.fromEntries(_data);
    const addressRef = await addDoc(this.dbRef, data);
    return addressRef.id;
  }
  async update(id: string, address: AddressI) {
    if (!id) throw new Error("Address id is required");

    const addressRef = doc(this.dbRef, id);
    await this.hasDoc(addressRef);

    const _address = await this.verifyFavoriteAddress(address);

    const _data = Object.entries(_address).filter(
      ([key, value]) => Boolean(value) || key === "isFavorite"
    );
    const data = Object.fromEntries(_data);
    return updateDoc(addressRef, data);
  }
  async delete(id: string) {
    if (!id) throw new Error("Address id is required");
    const addressRef = doc(this.dbRef, id);
    await this.hasDoc(addressRef);
    return deleteDoc(addressRef);
  }
  private async hasDoc(ref: DocumentReference<DocumentData, DocumentData>) {
    const addressDoc = await getDoc(ref);
    const existsAddress = addressDoc.exists();
    if (!existsAddress) throw new Error("Address not found");
  }
  async get() {
    const addressRef = await getDocs(this.dbRef);
    return addressRef.docs.map(this.mapAddressData) as AddressI[];
  }
  private mapAddressData(addressDoc: DocumentData): AddressI {
    return {
      id: addressDoc.id,
      ...addressDoc.data(),
      createdAt: addressDoc.data().createdAt.toDate(),
    };
  }

  async getById(id: string) {
    const addressRef = doc(this.dbRef, id);
    await this.hasDoc(addressRef);
    const addressDoc = await getDoc(addressRef);
    const data = addressDoc.data();
    if (!data) throw new AddressNotFound();

    return this.mapAddressData(addressDoc);
  }
}
