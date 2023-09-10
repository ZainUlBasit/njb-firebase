import { db } from "../config/firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const bankCollectionRef = collection(db, "bank");
class BankDataServices {
  addBankAccount = (newAccount) => {
    return addDoc(bankCollectionRef, newAccount);
  };

  getBankAccounts = () => {
    return getDocs(bankCollectionRef);
  };

  updateBankAccounts = (id, updatedAccount) => {
    const bankDoc = doc(db, "bank", id);
    return updateDoc(bankDoc, {
      amount: firebase.firestore.FieldValue.increment(updatedAccount),
    });
  };
}
export default new BankDataServices();
