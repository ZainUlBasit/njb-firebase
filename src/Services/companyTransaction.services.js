import { db } from "../config/firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const companyTransactionCollectionRef = collection(db, "company-transactions");
class CompanyTransactionDataServices {
  addTransaction = (newTransaction) => {
    return addDoc(companyTransactionCollectionRef, newTransaction);
  };

  getAllTransactions = () => {
    return getDocs(companyTransactionCollectionRef);
  };
}

export default new CompanyTransactionDataServices();
