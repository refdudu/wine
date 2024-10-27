import { CreditCardI } from "@/interfaces/CreditCardI";
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

export class CreditCardRepositoryFirebase {
  private dbRef: CollectionReference;
  constructor(userUid: string) {
    this.dbRef = collection(
      firebaseFirestore,
      `/users/${userUid}/credit-cards`
    );
  }

  private async getFavoriteCreditCard() {
    const _query = query(this.dbRef, where("isFavorite", "==", true));
    const creditCardRef = await getDocs(_query);

    if (creditCardRef.empty) return null;
    const doc = creditCardRef.docs[0];
    const data = doc.data() as CreditCardI;
    const id = doc.id;
    return { ...data, id };
  }
  private async verifyFavoriteCreditCard(creditCard: CreditCardI) {
    const favoriteCreditCard = await this.getFavoriteCreditCard();

    if (favoriteCreditCard && creditCard.isFavorite) {
      const docRef = doc(this.dbRef, favoriteCreditCard.id || "");
      favoriteCreditCard.isFavorite = false;
      await setDoc(docRef, favoriteCreditCard);
    } else if (!favoriteCreditCard && !creditCard.isFavorite) {
      creditCard.isFavorite = true;
    }
    return creditCard;
  }
  async add(creditCard: CreditCardI): Promise<string> {
    let _creditCard: CreditCardI = {
      ...creditCard,
      id: undefined,
      createdAt: new Date(),
    };

    _creditCard = await this.verifyFavoriteCreditCard(_creditCard);
    const _data = Object.entries(_creditCard).filter(
      ([key, value]) => Boolean(value) || key === "isFavorite"
    );
    const data = Object.fromEntries(_data);
    const creditCardRef = await addDoc(this.dbRef, data);
    return creditCardRef.id;
  }
  async delete(id: string) {
    if (!id) throw new Error("Credit card id is required");
    const creditCardRef = doc(this.dbRef, id);
    await this.hasDoc(creditCardRef);
    return deleteDoc(creditCardRef);
  }
  private async hasDoc(ref: DocumentReference<DocumentData, DocumentData>) {
    const addressDoc = await getDoc(ref);
    const existsAddress = addressDoc.exists();
    if (!existsAddress) throw new Error("CreditCard not found");
  }
  async get() {
    const creditCardRef = await getDocs(this.dbRef);
    return creditCardRef.docs.map((x) => ({
      number: `************${x.data().number.slice(-4)}`,
      name: x.data().name,
      expirationDate: x.data().expirationDate,
      createdAt: x.data().createdAt.toDate(),
      isFavorite: x.data().isFavorite,
      id: x.id,
    })) as CreditCardI[];
  }
  //   async update(id: string, creditCard: CreditCardI) {
  //     if (!id) throw new Error("Credit card id is required");

  //     const creditCardRef = doc(this.dbRef, id);
  //     await this.hasDoc(creditCardRef);

  //     creditCard = await this.verifyFavoriteAddress(creditCard);

  //     const _data = Object.entries(creditCard).filter(
  //       ([key, value]) => Boolean(value) || key === "isFavorite"
  //     ) as [string, any];

  //     const data = Object.fromEntries(_data);
  //     return updateDoc(creditCardRef, data);
  //   }
}
