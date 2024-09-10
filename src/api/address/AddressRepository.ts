import { AddressI } from "@/interfaces/Address";
import { firebaseFirestore } from "@/utils/firebaseClient";
import {
  addDoc,
  setDoc,
  CollectionReference,
  collection,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  DocumentReference,
  DocumentData,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export class AddressRepositoryFirebase {
  private dbRef: CollectionReference;
  constructor(userUid: string) {
    this.dbRef = collection(firebaseFirestore, `/users/${userUid}/addresses`);
  }
  async getFavoriteAddress() {
    const _query = query(this.dbRef, where("isFavorite", "==", true));
    const addressRef = await getDocs(_query);

    if (!addressRef.empty) return addressRef.docs[0].data() as AddressI;
    return null;
  }
  async verifyFavoriteAddress(address: AddressI) {
    const favoriteAddress = await this.getFavoriteAddress();
    console.log(
      "🚀 ~ AddressRepositoryFirebase ~ verifyFavoriteAddress ~ favoriteAddress:",
      favoriteAddress
    );
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

    address = await this.verifyFavoriteAddress(address);

    const _data = Object.entries(address).filter(
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
    return addressRef.docs.map((x) => ({
      ...x.data(),
      id: x.id,
    })) as AddressI[];
  }
}
