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

const customerReturnCollectionRef = collection(
  db,
  "customer-returns"
);
class CustomerReturnDataServices {
  addReturn = (newReturn) => {
    return addDoc(customerReturnCollectionRef, newReturn);
  };

  getAllReturns = () => {
    return getDocs(customerReturnCollectionRef);
  };
}

export default new CustomerReturnDataServices();
