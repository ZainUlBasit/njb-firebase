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
const saleCollectionRef = collection(db, "sale-info");
class CustomerDataServices {
  // When Advance is added
  addAdvanceLedger = (newAdvance) => {
    return addDoc(advanceCollectionRef, newAdvance);
  };
  // When Advance get needed
  getAdvanceLedger = () => {
    return getDocs(advanceCollectionRef);
  };
  // When Advance get needed
  updateAdvanceLedger = async () => {
    let data = await getDocs(advanceCollectionRef);
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data.map(async (dt) => {
      const advanceDoc = doc(db, "advance-ledger", dt._id);
      const timestamp = firebase.firestore.Timestamp.fromDate(
        new Date("2023-09-09")
      );

      await updateDoc(advanceDoc, {
        date: timestamp,
      });
    });
  };
  // When Arears is added
  addArearsLedger = (newArears) => {
    return addDoc(arearsCollectionRef, newArears);
  };
  // When Advance get needed
  getArearsLedger = () => {
    return getDocs(arearsCollectionRef);
  };
  // Add Sale Info
  addSaleInfo = (user, bill, total, paid, date) => {
    return addDoc(saleCollectionRef, {
      customer: user,
      bill: bill,
      total: total,
      paid: paid,
      date: date,
    });
  };
  // Delete Sale Info
  deleteSaleInfo = async (bill) => {
    let data = await getDocs(saleCollectionRef);
    data = data.docs.map((doc) => ({ ...doc.data(), _id: doc.id }));
    data.map(async (dt) => {
      if (dt.bill === bill) {
        const saleDoc = doc(db, "sale-info", dt._id);
        await deleteDoc(saleDoc);
      }
    });
  };
  // get Sale Info
  getSaleInfo = () => {
    return getDocs(saleCollectionRef);
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
  // Update Accounts While Return
  updateAccountsDelete = (id, total, paid, remaining, advance, discount) => {
    const customerDoc = doc(db, "customer", id);
    return updateDoc(customerDoc, {
      total: firebase.firestore.FieldValue.increment(total),
      discount: firebase.firestore.FieldValue.increment(discount),
      advance: firebase.firestore.FieldValue.increment(advance),
      remaining: firebase.firestore.FieldValue.increment(remaining),
      paid: firebase.firestore.FieldValue.increment(paid),
    });
  };
  // Update Accounts While Return
  updateAccountsReturn = (id, total) => {
    const customerDoc = doc(db, "customer", id);
    const Remaining = Number(total) * -1;
    return updateDoc(customerDoc, {
      total: firebase.firestore.FieldValue.increment(total),
      remaining: firebase.firestore.FieldValue.increment(Remaining),
      paid: firebase.firestore.FieldValue.increment(total),
    });
  };
  // during bill
  updateCustomerTotal = (id, Total, Remaining, Discount, Advance, Paid) => {
    const customerDoc = doc(db, "customer", id);
    const CurrentRemaining = Number(Remaining) - Number(Discount);
    return updateDoc(customerDoc, {
      total: firebase.firestore.FieldValue.increment(Total),
      discount: firebase.firestore.FieldValue.increment(Discount),
      advance: firebase.firestore.FieldValue.increment(Advance),
      remaining: firebase.firestore.FieldValue.increment(CurrentRemaining),
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
