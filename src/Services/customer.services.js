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

const customerCollectionRef = collection(db, "customer");
const advanceCollectionRef = collection(db, "advance-ledger");
const arearsCollectionRef = collection(db, "arears-ledger");
class CustomerDataServices {
  // When Advance is added
  addAdvanceLedger = (newAdvance) => {
    return addDoc(advanceCollectionRef, newAdvance);
  };
  // When Advance get needed
  getAdvanceLedger = () => {
    return getDocs(advanceCollectionRef);
  };
  // When Arears is added
  addArearsLedger = (newArears) => {
    return addDoc(advanceCollectionRef, newArears);
  };
  // When Advance get needed
  getArearsLedger = () => {
    return getDocs(arearsCollectionRef);
  };
  // When new customer added
  addCustomer = (newCustomer) => {
    return addDoc(customerCollectionRef, newCustomer);
  };
  // Update customer
  updateCustomer = (id, updatedCustomer) => {
    const customerDoc = doc(db, "customer", id);
    return updateDoc(customerDoc, updatedCustomer);
  };
  // during bill
  updateCustomerTotal = (id, Total, Remaining, Discount, Advance, Paid) => {
    const customerDoc = doc(db, "customer", id);
    return updateDoc(customerDoc, {
      total: firebase.firestore.FieldValue.increment(Total),
      discount: firebase.firestore.FieldValue.increment(Discount),
      advance: firebase.firestore.FieldValue.increment(Advance),
      remaining: firebase.firestore.FieldValue.increment(Remaining),
      paid: firebase.firestore.FieldValue.increment(Paid),
    });
  };
  // during cash payment
  updateCustomerCash = (id, cashPayment) => {
    const customerDoc = doc(db, "customer", id);
    const Remaining = Number(cashPayment) * -1;
    return updateDoc(customerDoc, {
      remaining: firebase.firestore.FieldValue.increment(Remaining),
      paid: firebase.firestore.FieldValue.increment(cashPayment),
    });
  };

  updateCustomerAdvance = (id, advanceCash) => {
    const customerDoc = doc(db, "customer", id);
    return updateDoc(customerDoc, {
      advance: firebase.firestore.FieldValue.increment(advanceCash),
    });
  };

  deleteCustomer = (id) => {
    const customerDoc = doc(db, "customer", id);
    return deleteDoc(customerDoc);
  };

  getAllCustomers = () => {
    return getDocs(customerCollectionRef);
  };

  getCustomer = (id) => {
    const customerDoc = doc(db, "customer", id);
    return getDoc(customerDoc);
  };
}

export default new CustomerDataServices();
