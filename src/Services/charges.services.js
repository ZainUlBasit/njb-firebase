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
  where,
} from "firebase/firestore";

const chargesCollectionRef = collection(db, "charges");
class ChargesDataServices {
  addCharges = (newCharges) => {
    return addDoc(chargesCollectionRef, newCharges);
  };

  getCharges = () => {
    return getDocs(chargesCollectionRef);
  };
}
export default new ChargesDataServices();
