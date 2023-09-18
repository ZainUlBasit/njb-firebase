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

const customerTransactionCollectionRef = collection(
  db,
  "customer-transactions"
);

class CustomerTransactionDataServices {
  addTransaction = (newTransaction) => {
    return addDoc(customerTransactionCollectionRef, newTransaction);
  };

  getAllTransactions = () => {
    return getDocs(customerTransactionCollectionRef);
  };

  deleteTransaction = (id) => {
    const transactionDoc = doc(db, "customer-transactions", id);
    return deleteDoc(transactionDoc);
  };
}

export default new CustomerTransactionDataServices();
