import { db } from "../config/firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const itemCollectionRef = collection(db, "item");

class ItemDataServices {
  addItem = (newItem) => {
    return addDoc(itemCollectionRef, newItem);
  };

  updateItem = (id, updatedItem) => {
    const itemDoc = doc(db, "item", id);
    return updateDoc(itemDoc, updatedItem);
  };

  updateItemQty = (id, updatedItemQty) => {
    const itemDoc = doc(db, "item", id);
    return updateDoc(itemDoc, {
      qty: firebase.firestore.FieldValue.increment(updatedItemQty),
    });
  };

  deleteItem = (id) => {
    const itemDoc = doc(db, "item", id);
    return deleteDoc(itemDoc);
  };

  getAllItems = () => {
    return getDocs(itemCollectionRef);
  };

  getItem = (id) => {
    const itemDoc = doc(db, "item", id);
    return getDoc(itemDoc);
  };
}

export default new ItemDataServices();
