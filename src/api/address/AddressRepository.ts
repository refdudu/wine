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
} from "firebase/firestore";

export class AddressRepositoryFirebase {
  private dbRef: CollectionReference;
  constructor(userUid: string) {
    this.dbRef = collection(firebaseFirestore, `/users/${userUid}/addresses`);
  }
  async add(address: AddressI): Promise<string> {
    const _address = {
      ...address,
      id: null,
      createdAt: new Date(),
    };

    const _data = Object.entries(_address).filter(([key, value]) =>
      Boolean(value)
    );
    const data = Object.fromEntries(_data);
    const addressRef = await addDoc(this.dbRef, data);
    return addressRef.id;
  }
  async update(id: string, address: AddressI) {
    if (!id) throw new Error("Address id is required");
    const addressRef = doc(this.dbRef, id);
    await this.hasDoc(addressRef);
    const _data = Object.entries(address).filter(([_, value]) =>
      Boolean(value)
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
    return addressRef.docs.map((x) => ({ ...x.data(), id: x.id }));
  }
}
