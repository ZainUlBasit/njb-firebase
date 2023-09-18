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

const customerReturnCollectionRef = collection(db, "customer-returns");
const returnLedgerCollectionRef = collection(db, "customer-returns-ledger");
class CustomerReturnDataServices {
  addReturn = (newReturn) => {
    return addDoc(customerReturnCollectionRef, newReturn);
  };

  addReturnLedger = (newReturnLedger) => {
    return addDoc(returnLedgerCollectionRef, newReturnLedger);
  };

  getAllReturnsLedger = () => {
    return getDocs(returnLedgerCollectionRef);
  };

  getAllReturns = () => {
    return getDocs(customerReturnCollectionRef);
  };
}

export default new CustomerReturnDataServices();
