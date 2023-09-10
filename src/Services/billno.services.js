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

const billnoCollectionRef = collection(db, "billno");
class BillNoDataServices {
  updateBillNo = () => {
    const billnoDoc = doc(db, "billno", "WLU8ZtyI5RgtqEtCyeuz");
    return updateDoc(billnoDoc, {
      billnumber: firebase.firestore.FieldValue.increment(1),
    });
  };

  getBillNumber = () => {
    return getDocs(billnoCollectionRef);
  };
}

export default new BillNoDataServices();
